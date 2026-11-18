import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';
import { randomInt } from 'node:crypto';
import { interests, settings } from '../../lib/content';

export const prerender = false;

const json = (status: number, body: object) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });

// reCAPTCHA v3 gives each visit a score from 0 (bot) to 1 (person); anything under this is turned away.
const MIN_SCORE = 0.5;

// 'rejected' only for a token Google says is bad or a low score. If Google cannot be reached, or our own secret is wrong, the
// request goes through (and the log says so): losing a real lead costs more than letting one spam message in.
async function recaptcha(secret: string, token: string): Promise<'ok' | 'rejected'> {
  if (!token) {
    console.error('Quote form: reCAPTCHA token missing');
    return 'rejected';
  }
  try {
    // RECAPTCHA_VERIFY_URL exists only so the checks can be tested without Google.
    const res = await fetch(process.env.RECAPTCHA_VERIFY_URL || 'https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      body: new URLSearchParams({ secret, response: token }),
      signal: AbortSignal.timeout(5000),
    });
    const data = (await res.json()) as { success?: boolean; score?: number; action?: string; 'error-codes'?: string[] };
    const codes = data['error-codes'] ?? [];
    if (!data.success) {
      if (codes.some((c) => c === 'invalid-input-secret' || c === 'missing-input-secret')) {
        console.error('Quote form: RECAPTCHA_SECRET is wrong, so reCAPTCHA is not being checked:', codes.join(','));
        return 'ok';
      }
      console.error('Quote form: reCAPTCHA rejected', codes.join(','));
      return 'rejected';
    }
    if (data.action !== 'quote' || (data.score ?? 0) < MIN_SCORE) {
      console.error('Quote form: reCAPTCHA low score', data.score ?? 'none', data.action ?? 'no action');
      return 'rejected';
    }
    return 'ok';
  } catch {
    console.error('Quote form: reCAPTCHA could not be checked, letting the request through');
    return 'ok';
  }
}

export const POST: APIRoute = async ({ request }) => {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json(400, { error: 'bad_request' });
  }

  // Honeypot: real visitors never see this field. Answer "ok" so bots don't retry.
  if (form.get('website')) return json(200, { ok: true, reference: 'IL-RECEIVED' });

  const v = (key: string) => String(form.get(key) ?? '').trim();
  const q = {
    name: v('name'),
    email: v('email'),
    phone: v('phone'),
    zip: v('zipCode'),
    interest: v('interest'),
    message: v('message'),
  };
  // Same limits as the form: the email and the phone number are both required.
  const valid =
    q.name.length >= 2 && q.name.length <= 120 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(q.email) && q.email.length <= 320 &&
    q.phone.length >= 1 && q.phone.length <= 40 &&
    /^\d{5}(-\d{4})?$/.test(q.zip) &&
    interests.includes(q.interest) &&
    q.message.length <= 2000;
  if (!valid) return json(400, { error: 'invalid' });

  // Checked after the cheap field checks and before anything is sent. Off until both the secret (Coolify) and the site key (Site settings) are set.
  const { RECAPTCHA_SECRET } = process.env;
  if (RECAPTCHA_SECRET && settings.recaptchaSiteKey && (await recaptcha(RECAPTCHA_SECRET, String(form.get('g-recaptcha-response') ?? ''))) === 'rejected') {
    return json(403, { error: 'captcha' });
  }

  const { SMTP_HOST = 'smtp.protonmail.ch', SMTP_PORT = '587', SMTP_USER, SMTP_TOKEN, LEAD_TO } = process.env;
  if (!SMTP_USER || !SMTP_TOKEN || !LEAD_TO) {
    console.error('Quote form: SMTP_USER, SMTP_TOKEN and LEAD_TO must be set');
    return json(503, { error: 'not_configured' });
  }

  // No database: the reference is a short random code shown to the visitor and included in the email subject.
  const reference = `IL-${String(randomInt(0, 100_000)).padStart(5, '0')}`;
  const port = Number(SMTP_PORT);
  try {
    await nodemailer
      .createTransport({
        host: SMTP_HOST,
        port,
        secure: port === 465,
        requireTLS: true,
        auth: { user: SMTP_USER, pass: SMTP_TOKEN },
        connectionTimeout: 10_000,
        greetingTimeout: 10_000,
        socketTimeout: 15_000,
      })
      .sendMail({
        from: { name: 'Island Life website', address: SMTP_USER }, // Proton only sends as the authenticated address
        to: LEAD_TO,
        replyTo: { name: q.name, address: q.email },
        subject: `Quote request ${reference}: ${q.interest}`,
        text: [
          `Reference: ${reference}`,
          `Name: ${q.name}`,
          `Phone: ${q.phone}`,
          `Email: ${q.email}`,
          `Zip: ${q.zip}`,
          `Interested in: ${q.interest}`,
          '',
          q.message || '(no message)',
        ].join('\n'),
      });
  } catch (err) {
    // Log why the mail server said no, never the lead's details: the error code, the SMTP reply code and the server's one-line reply
    // (for example "535 5.7.8 Authentication failed") say what to fix. The message and the visitor's fields stay out of the log.
    const { code, responseCode, command, response } = err as { code?: string; responseCode?: number; command?: string; response?: string };
    console.error('Quote form: send failed', code ?? 'unknown', responseCode ?? '', command ?? '', String(response ?? '').split('\n')[0].slice(0, 200));
    return json(502, { error: 'send_failed' });
  }
  return json(200, { ok: true, reference });
};
