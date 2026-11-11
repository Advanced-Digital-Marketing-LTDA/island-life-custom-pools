import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';
import { home } from '../../lib/content';

export const prerender = false;

const json = (status: number, body: object) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });

// The global cap protects the Proton account other projects share; the per-IP cap stops one visitor using it all.
// shortcut: counters live in memory, reset on restart and are per instance; move to a shared store if the site ever runs more than one.
const WINDOW_MS = 60 * 60_000;
const PER_IP = 3;
const TOTAL = 30;
const hits = new Map<string, number[]>();

function allowed(ip: string) {
  const now = Date.now();
  for (const [k, t] of hits) {
    const recent = t.filter((x) => now - x < WINDOW_MS);
    if (recent.length) hits.set(k, recent);
    else hits.delete(k);
  }
  const mine = hits.get(ip) ?? [];
  const total = [...hits.values()].reduce((n, t) => n + t.length, 0);
  if (mine.length >= PER_IP || total >= TOTAL) return false;
  hits.set(ip, [...mine, now]);
  return true;
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json(400, { error: 'bad_request' });
  }

  // Honeypot: real visitors never see this field. Answer "ok" so bots don't retry.
  if (form.get('company')) return json(200, { ok: true });

  const v = (key: string) => String(form.get(key) ?? '').trim();
  const q = {
    name: v('name'),
    email: v('email'),
    phone: v('phone'),
    zip: v('zip'),
    contact: v('contact_method'),
    interest: v('interest'),
    message: v('message'),
  };
  const valid =
    q.name !== '' && q.name.length <= 100 &&
    q.email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(q.email) &&
    /^[\d\s().+-]{7,20}$/.test(q.phone) &&
    /^\d{5}$/.test(q.zip) &&
    ['Email', 'Phone'].includes(q.contact) &&
    home.quote.interests.includes(q.interest) &&
    q.message.length <= 2000;
  if (!valid) return json(400, { error: 'invalid' });

  // The proxy appends the real client address last; anything before it is client-supplied.
  const ip = request.headers.get('x-forwarded-for')?.split(',').at(-1)?.trim() || clientAddress;
  if (!allowed(ip)) return json(429, { error: 'rate_limited' });

  const { SMTP_HOST = 'smtp.protonmail.ch', SMTP_PORT = '587', SMTP_USER, SMTP_TOKEN, LEAD_TO } = process.env;
  if (!SMTP_USER || !SMTP_TOKEN || !LEAD_TO) {
    console.error('Quote form: SMTP_USER, SMTP_TOKEN and LEAD_TO must be set');
    return json(503, { error: 'not_configured' });
  }

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
        subject: `Quote request: ${q.interest}`,
        text: [
          `Name: ${q.name}`,
          `Phone: ${q.phone}`,
          `Email: ${q.email}`,
          `Zip: ${q.zip}`,
          `Prefers: ${q.contact}`,
          `Interested in: ${q.interest}`,
          '',
          q.message || '(no message)',
        ].join('\n'),
      });
  } catch (err) {
    // Log the code only: the lead's details must not end up in server logs.
    console.error('Quote form: send failed', (err as { code?: string }).code ?? 'unknown');
    return json(502, { error: 'send_failed' });
  }
  return json(200, { ok: true });
};
