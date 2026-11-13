import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';

// Stress test for the page builder: builds the site with extra temporary pages that every editor mistake we can
// think of could produce (each section type with no content at all, every page with its sections reversed, every
// page with each section hidden in turn, empty and fully hidden pages) and checks that the build still passes and
// the HTML stays sound. Temporary files are removed afterwards. Set KEEP=1 to keep the build in site/dist-test.
const site = new URL('../site/', import.meta.url);
const pagesDir = new URL('content/pages/', site);
const outDir = 'dist-test';
const { blockNames } = await import(new URL('src/lib/blocks.ts', site));
const temp = [];
const write = (name, doc) => {
  writeFileSync(new URL(`${name}.json`, pagesDir), JSON.stringify(doc, null, 2));
  temp.push(name);
};

try {
  const real = readdirSync(pagesDir).filter((f) => f.endsWith('.json')).map((f) => ({ slug: f.slice(0, -5), ...JSON.parse(readFileSync(new URL(f, pagesDir), 'utf8')) }));
  write('zz-test-bare', { seoTitle: 'Bare', seoDescription: 'Every section with no content', blocks: blockNames.map((_template) => ({ _template })) });
  write('zz-test-empty', { seoTitle: 'Empty', blocks: [] });
  write('zz-test-nothing', {});
  write('zz-test-hidden', { seoTitle: 'Hidden', blocks: real[0].blocks.map((block) => ({ ...block, hidden: true })) });
  for (const page of real) {
    const { slug, ...doc } = page;
    write(`zz-test-${slug}-rev`, { ...doc, blocks: [...doc.blocks].reverse() });
    doc.blocks.forEach((_, i) => write(`zz-test-${slug}-hide-${i}`, { ...doc, blocks: doc.blocks.map((block, j) => (j === i ? { ...block, hidden: true } : block)) }));
  }

  const build = spawnSync('npx', ['astro', 'build', '--outDir', outDir], { cwd: site, encoding: 'utf8', env: { ...process.env, ASTRO_TELEMETRY_DISABLED: '1' } });
  assert.equal(build.status, 0, `Build failed:\n${(build.stdout + build.stderr).slice(-2500)}`);

  for (const name of temp) {
    const html = readFileSync(new URL(`${outDir}/client/${name}/index.html`, site), 'utf8');
    const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
    assert.deepEqual(ids.filter((id, i) => ids.indexOf(id) !== i), [], `Duplicate ids on /${name}`);
    const text = html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, '');
    assert.doesNotMatch(text, /undefined|\[object Object\]|NaN/, `Broken value rendered on /${name}`);
    if (name.endsWith('-rev')) {
      for (const [, href] of html.matchAll(/<a\b[^>]*href="(#[^"]+)"/g)) assert.ok(ids.includes(href.slice(1)), `Dead in-page link ${href} on /${name}`);
    }
  }

  // A mistake that must stop the build: two sections with the same link name, and a page without a front page.
  write('zz-test-dupe', { seoTitle: 'Dupe', blocks: [{ _template: 'overview', anchor: 'same' }, { _template: 'feature', anchor: 'same' }] });
  const dupe = spawnSync('npx', ['astro', 'build', '--outDir', `${outDir}-fail`], { cwd: site, encoding: 'utf8' });
  assert.notEqual(dupe.status, 0, 'A duplicate link name should stop the build');
  assert.match(dupe.stdout + dupe.stderr, /link name "same" is used by more than one section/);

  console.log(`block stress test passed (${temp.length - 1} temporary pages)`);
} finally {
  for (const name of temp) rmSync(new URL(`${name}.json`, pagesDir), { force: true });
  rmSync(new URL(`${outDir}-fail`, site), { recursive: true, force: true });
  if (!process.env.KEEP) rmSync(new URL(outDir, site), { recursive: true, force: true });
}
