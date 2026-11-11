import assert from 'node:assert/strict';
import { cpSync, existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn, spawnSync } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const nodeDir = dirname(process.execPath);
const npm = ['../lib/node_modules/npm/bin/npm-cli.js', 'node_modules/npm/bin/npm-cli.js', '../share/nodejs/npm/bin/npm-cli.js']
  .map(path => join(nodeDir, path)).find(existsSync);
assert.ok(npm, 'Install npm alongside Node before running this check');
const site = mkdtempSync(join(tmpdir(), 'site-toolkit-'));
const env = { ...process.env, ASTRO_TELEMETRY_DISABLED: '1', SITE_URL: 'https://example.com', SOURCE_COMMIT: 'a'.repeat(40) };
let server;
let base;
async function waitForServer(attempts = 100) {
  assert.equal(server.exitCode, null, 'production server exited');
  if (base) {
    try {
      const response = await fetch(`${base}/healthz`, { signal: AbortSignal.timeout(1000) });
      if (response.ok && (await response.text()).trim() === 'ok') return;
    } catch {}
  }
  assert.ok(attempts > 1, 'production server did not become ready');
  await delay(100);
  return waitForServer(attempts - 1);
}
try {
  cpSync(join(root, 'skills/site-bootstrap-adm/assets/site'), site, { recursive: true });
  const page = join(site, 'src/pages/index.astro');
  writeFileSync(page, readFileSync(page, 'utf8').replace('Replace this page with your website content.', 'Fresh website content.'));
  for (const args of [['ci', '--ignore-scripts', '--no-audit', '--no-fund'], ['run', 'check'], ['run', 'build']]) {
    const result = spawnSync(process.execPath, [npm, ...args], { cwd: site, env, stdio: 'inherit' });
    assert.equal(result.status, 0, `npm ${args.join(' ')} failed`);
  }
  server = spawn(process.execPath, ['dist/server/entry.mjs'], { cwd: site, env: { ...env, HOST: '127.0.0.1', PORT: '0', ASTRO_NODE_LOGGING: 'enabled' }, stdio: ['ignore', 'pipe', 'inherit'] });
  let output = '';
  server.stdout.on('data', chunk => {
    process.stdout.write(chunk);
    output = (output + chunk).slice(-4096);
    base = /http:\/\/127\.0\.0\.1:\d+/.exec(output)?.[0] ?? base;
  });
  await waitForServer();
  const home = await fetch(base);
  assert.equal(home.status, 200);
  assert.match(home.headers.get('content-type'), /text\/html/);
  const html = await home.text();
  assert.match(html, /Site template/);
  assert.match(html, /Fresh website content\./);
  assert.match(html, /https:\/\/example.com\//);
  assert.equal((await fetch(`${base}/not-a-page`)).status, 404);
  const robots = await fetch(`${base}/robots.txt`);
  assert.equal(robots.status, 200);
  assert.match(await robots.text(), /Disallow: \//);
  const marker = await fetch(`${base}/build.json`);
  assert.equal(marker.status, 200);
  assert.equal((await marker.json()).commit, env.SOURCE_COMMIT);
  const health = await fetch(`${base}/healthz`);
  assert.match(health.headers.get('content-type'), /text\/plain/);
  console.log('Fresh template: install, check, build, standalone server, home, static asset, 404, health and source marker passed.');
} finally {
  if (server?.exitCode === null) {
    server.kill('SIGTERM');
    await new Promise(resolve => server.once('exit', resolve));
  }
  rmSync(site, { recursive: true, force: true });
}
