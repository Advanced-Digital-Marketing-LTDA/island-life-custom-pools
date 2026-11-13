import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';

// Checks the built site (run `npm run build` in site/ first): every page exists with its metadata,
// and the quote form posts exactly the fields, and offers exactly the choices, that /api/quote accepts.
const site = new URL('../site/', import.meta.url);
const read = (path) => readFileSync(new URL(path, site), 'utf8');
const { contactMethods } = await import(new URL('src/data/quote.ts', site));
const content = (name) => JSON.parse(read(`content/${name}.json`));
const { quote: { interests } } = content('settings');

// Every page's title comes from the editable content, so the build must reflect it.
const pages = {
  '': { title: content('home').seoTitle },
  pools: { title: content('pools').seoTitle },
  blog: { title: content('blog').seoTitle },
  ...Object.fromEntries(readdirSync(new URL('content/posts/', site)).filter((f) => f.endsWith('.json')).map((f) => [`blog/${f.slice(0, -5)}`, { title: content(`posts/${f.slice(0, -5)}`).seoTitle }])),
};

for (const [slug, { title }] of Object.entries(pages)) {
  const html = read(`dist/client/${slug ? `${slug}/` : ''}index.html`);
  assert.equal([...html.matchAll(/<h1\b/g)].length, 1, `/${slug} needs exactly one h1`);
  assert.ok(html.includes(`<title>${title.replace('&', '&amp;')}</title>`) || html.includes(`<title>${title}</title>`), `Wrong title on /${slug}`);
  assert.match(html, /<meta name="description" content="[^"]{40,}"/, `Missing description on /${slug}`);
  assert.match(html, /<link rel="canonical"/, `Missing canonical on /${slug}`);
  assert.match(html, /<div id="root">/, `Missing #root on /${slug}`);
  // Pages without a quote section would leave every "Free quote" link dead.
  if (slug !== 'blog') {
    assert.match(html, /<section class="estimate section" id="quote"/, `Missing quote form on /${slug}`);
  }
  for (const [, href] of html.matchAll(/<a\b[^>]*href="(#[^"]+)"/g)) {
    assert.ok(html.includes(`id="${href.slice(1)}"`), `Dead in-page link ${href} on /${slug}`);
  }
}
assert.match(read('dist/client/404.html'), /Page not found/);

// The form and the endpoint must agree on field names and choices.
const home = read('dist/client/index.html');
const form = home.match(/<form class="estimate-form"[\s\S]*?<\/form>/)[0];
const formFields = new Set([...form.matchAll(/\bname="([^"]+)"/g)].map((m) => m[1]));
const endpoint = read('src/pages/api/quote.ts');
const endpointFields = new Set([...endpoint.matchAll(/\b(?:v|form\.get)\('([^']+)'\)/g)].map((m) => m[1]));
assert.deepEqual([...formFields].sort(), [...endpointFields].sort(), 'Form fields and /api/quote fields differ');
assert.deepEqual([...form.matchAll(/<option value="([^"]+)">/g)].map((m) => m[1]), [...interests], 'Interest options differ');
assert.deepEqual([...form.matchAll(/name="preferredContact" value="([^"]+)"/g)].map((m) => m[1]), [...contactMethods], 'Contact methods differ');

// Copy edited in Tina must reach the page: spot-check one value per content file.
const settings = content('settings');
assert.ok(home.includes(settings.footer.tagline), 'settings.json footer text missing from the page');
assert.ok(home.includes(content('home').hero.kicker.replace('&', '&amp;')), 'home.json hero text missing from the page');
assert.ok(read('dist/client/pools/index.html').includes(content('pools').overviewTitle), 'pools.json text missing from /pools');
assert.ok(read('dist/client/blog/index.html').includes(content('blog').label), 'blog.json text missing from /blog');

// Hero and testimonial markup the scripts take over from must render in their resting state.
assert.match(home, /class="hero__image"[^>]*style="transform: translate3d\(0px, 0%, 0px\) scale\(1\.04\);"/);
assert.match(home, /<blockquote style="opacity: 1; transform: translate3d\(0px, 0px, 0px\);">/);
assert.equal([...home.matchAll(/class="process-step is-active"/g)].length, 1);
assert.match(home, /id="mobile-menu"[^>]*aria-hidden="true"[^>]*inert/);

// The pools page marks itself as the current page in the navigation.
assert.match(read('dist/client/pools/index.html'), /<a href="\/pools" aria-current="page">Pools<\/a>/);

console.log('site checks passed');
