import assert from 'node:assert/strict';
import { readdirSync, readFileSync, existsSync } from 'node:fs';

// Checks the built site (run `npm run build` in site/ first). Expectations come from the page documents in
// content/pages, so it holds whatever an editor does with the sections: every page exists with its title, every
// visible section is on it in order, ids and links resolve, and the quote form matches what /api/quote accepts.
const site = new URL('../site/', import.meta.url);
const read = (path) => readFileSync(new URL(path, site), 'utf8');
const json = (path) => JSON.parse(read(path));
const escapeHtml = (text) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const { contactMethods } = await import(new URL('src/data/quote.ts', site));
const { blockNames, defaultAnchors, overlayBlocks } = await import(new URL('src/lib/blocks.ts', site));
const settings = json('content/settings.json');
const { quote: { interests } } = settings;

// The editor (Tina's block list) and the renderer must offer exactly the same section types.
const lock = json('tina/tina-lock.json');
const pagesCollection = lock.schema.collections.find((collection) => collection.name === 'pages');
const templates = pagesCollection.fields.find((field) => field.name === 'blocks').templates.map((template) => template.name);
assert.deepEqual([...templates].sort(), [...blockNames].sort(), 'Tina section types and the renderer differ (rebuild tina-lock.json: npx tinacms build --local --skip-cloud-checks)');

const pages = readdirSync(new URL('content/pages/', site)).filter((f) => f.endsWith('.json')).map((f) => {
  const slug = f.slice(0, -5);
  return { slug, path: slug === 'home' ? '' : slug, ...json(`content/pages/${f}`) };
});
assert.ok(pages.some((page) => page.slug === 'home'), 'content/pages/home.json (the front page) is missing');
const pageHtml = (path) => read(`dist/client/${path ? `${path}/` : ''}index.html`);
const outputExists = (path) => existsSync(new URL(`dist/client/${path ? `${path}/` : ''}index.html`, site));

for (const page of pages) {
  const html = pageHtml(page.path);
  const where = `/${page.path}`;
  const visible = (page.blocks ?? []).filter((block) => !block.hidden);
  const title = page.seoTitle || settings.name;
  assert.ok(html.includes(`<title>${escapeHtml(title)}</title>`) || html.includes(`<title>${title}</title>`), `Wrong title on ${where}`);
  assert.match(html, /<meta name="description" content="[^"]{10,}"/, `Missing description on ${where}`);
  assert.match(html, /<link rel="canonical"/, `Missing canonical on ${where}`);
  assert.match(html, /<div id="root">/, `Missing #root on ${where}`);
  assert.match(html, /class="skip-link" href="#top"/, `Missing skip link on ${where}`);
  assert.match(html, /<main id="top">/, `Missing main#top on ${where}`);
  const credit = escapeHtml(settings.footer.credit);
  assert.ok(html.includes(`<span class="footer__credit"><a href="${settings.footer.creditHref}">${credit}</a></span>`), `Missing footer credit link on ${where}`);
  assert.ok(!html.includes('footer__wordmark'), `The big footer wordmark should be gone from ${where}`);

  // One h1 for each section that carries the page title.
  const expectedH1 = visible.filter((block) => ['hero', 'pageHero', 'splitHero', 'heading'].includes(block._template)).length;
  assert.equal([...html.matchAll(/<h1\b/g)].length, expectedH1, `${where} should have ${expectedH1} h1`);
  // The header floats over the page only when the first section is a hero.
  const overlay = visible.length > 0 && overlayBlocks.includes(visible[0]._template);
  assert.equal(/class="site-header site-header--solid"/.test(html), !overlay, `Wrong header style on ${where}`);
  // The quote form is on the page exactly when the page has a quote section.
  assert.equal(/<section class="estimate section"/.test(html), visible.some((block) => block._template === 'quoteForm'), `Quote form presence is wrong on ${where}`);

  // Every section with a link name is on the page, in the order it was given.
  let last = -1;
  for (const block of visible) {
    const anchor = block.anchor || defaultAnchors[block._template];
    if (!anchor) continue;
    const at = html.indexOf(`id="${anchor}"`);
    assert.ok(at > -1, `Section "${anchor}" is missing from ${where}`);
    assert.ok(at > last, `Sections are out of order on ${where} at "${anchor}"`);
    last = at;
  }

  // Ids are unique and in-page links resolve; nothing renders as "undefined" or "[object Object]".
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  assert.deepEqual(ids.filter((id, i) => ids.indexOf(id) !== i), [], `Duplicate ids on ${where}`);
  for (const [, href] of html.matchAll(/<a\b[^>]*href="(#[^"]+)"/g)) assert.ok(ids.includes(href.slice(1)), `Dead in-page link ${href} on ${where}`);
  const text = html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, '');
  assert.doesNotMatch(text, /undefined|\[object Object\]|NaN/, `Broken value rendered on ${where}`);
  // Images and videos are not in Git: a local path here would be a broken file on the live site.
  assert.doesNotMatch(html, /(?:src|href|poster|content)="\/(?:images|videos)\/[^"]+/, `${where} uses an image or video that is not on the CDN list (src/lib/assets.ts)`);
  // A forced line break with no space beside it makes screen readers join the two words.
  for (const [heading] of html.matchAll(/<h[1-3]\b[\s\S]*?<\/h[1-3]>/g)) assert.doesNotMatch(heading, /\S<br>/, `Heading runs words together: ${heading.slice(0, 80)}`);
}

// Posts, and the 404 page.
for (const f of readdirSync(new URL('content/posts/', site)).filter((name) => name.endsWith('.json'))) {
  const slug = f.slice(0, -5);
  const post = json(`content/posts/${f}`);
  const html = pageHtml(`blog/${slug}`);
  assert.ok(html.includes(`<title>${escapeHtml(post.seoTitle)}</title>`), `Wrong title on /blog/${slug}`);
  assert.equal([...html.matchAll(/<h1\b/g)].length, 1, `/blog/${slug} needs exactly one h1`);
}
assert.match(read('dist/client/404.html'), /Page not found/);

// Both menus only link to pages that exist, and the current page marks itself.
const navTargets = [...settings.nav, ...settings.footer.nav].map((item) => item.href).filter((href) => href.startsWith('/') && !href.startsWith('/#'));
for (const target of new Set(navTargets)) assert.ok(outputExists(target.slice(1)), `The menu links to ${target}, which is not built`);
const headerTargets = settings.nav.map((item) => item.href);
for (const page of pages.filter((p) => p.path && headerTargets.includes(`/${p.path}`))) {
  assert.ok(pageHtml(page.path).includes(`<a href="/${page.path}" aria-current="page">`), `/${page.path} should mark itself current in the menu`);
}

// The form and the endpoint must agree on field names and choices.
const formPage = pages.find((page) => (page.blocks ?? []).some((block) => block._template === 'quoteForm' && !block.hidden));
const home = pageHtml(formPage.path);
const form = home.match(/<form class="estimate-form"[\s\S]*?<\/form>/)[0];
const formFields = new Set([...form.matchAll(/\bname="([^"]+)"/g)].map((m) => m[1]));
const endpoint = read('src/pages/api/quote.ts');
const endpointFields = new Set([...endpoint.matchAll(/\b(?:v|form\.get)\('([^']+)'\)/g)].map((m) => m[1]));
assert.deepEqual([...formFields].sort(), [...endpointFields].sort(), 'Form fields and /api/quote fields differ');
assert.deepEqual([...form.matchAll(/<option value="([^"]+)">/g)].map((m) => m[1]), [...interests], 'Interest options differ');
assert.deepEqual([...form.matchAll(/name="preferredContact" value="([^"]+)"/g)].map((m) => m[1]), [...contactMethods], 'Contact methods differ');
assert.ok(home.includes(escapeHtml(settings.footer.tagline)), 'settings.json footer text missing from the page');

// The home page's scripts take over from markup that must render in its resting state.
const front = pageHtml('');
assert.match(front, /class="hero__image"[^>]*style="transform: translate3d\(0px, 0%, 0px\) scale\(1\.04\);"/);
assert.match(front, /<div class="testimonial__slides" style="opacity: 1; transform: translate3d\(0px, 0px, 0px\);">/);
assert.equal([...front.matchAll(/class="testimonial-slide"/g)].length, 3);
assert.match(front, /id="mobile-menu"[^>]*aria-hidden="true"[^>]*inert/);

// The gallery's closing section offers the phone number and reaches the home page quote form.
const gallery = pages.find((page) => page.slug === 'gallery');
if (gallery) {
  const html = pageHtml('gallery');
  assert.ok(html.includes(`href="${settings.phoneHref}"`), 'Gallery call to action should offer the phone number');
  assert.match(html, /href="\/#quote"/, 'Gallery call to action should reach the home page quote form');
}

console.log('site checks passed');
