import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const read = path => readFileSync(path, 'utf8').replaceAll('\r\n', '\n');
function markdown(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    if (['node_modules', '__pycache__'].includes(entry.name)) return [];
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return markdown(path);
    return entry.name.endsWith('.md') ? [path] : [];
  });
}
const skills = readdirSync(join(root, 'skills'), { withFileTypes: true }).filter(entry => entry.isDirectory());
assert.equal(skills.length, 2, 'Expected the website and hosting skills');
for (const skill of skills) {
  const dir = join(root, 'skills', skill.name);
  assert.ok(read(join(dir, 'SKILL.md')).startsWith(`---\nname: ${skill.name}\ndescription: Use when `), 'Skill frontmatter must match its directory');
  assert.ok(existsSync(join(dir, 'agents/openai.yaml')), 'Missing skill metadata');
}
for (const path of [join(root, 'README.md'), join(root, 'AGENTS.md'), ...markdown(join(root, 'skills'))]) {
  for (const match of read(path).matchAll(/\[[^[\]\r\n]+\]\(([^()[\]\r\n]+)\)/g)) {
    if (/^(?:https?:|#)/.test(match[1])) continue;
    const target = resolve(dirname(path), match[1].split('#')[0]);
    assert.ok(target.startsWith(root + sep) && existsSync(target), `Broken local link in ${path}: ${match[1]}`);
  }
}
const dir = join(root, 'skills/site-bootstrap-adm/assets/site');
const pkg = JSON.parse(read(join(dir, 'package.json')));
const lock = JSON.parse(read(join(dir, 'package-lock.json')));
assert.deepEqual(lock.packages[''].dependencies, pkg.dependencies, 'Dependency lock differs from package.json');
assert.deepEqual(lock.packages[''].devDependencies, pkg.devDependencies, 'Development dependency lock differs from package.json');
console.log('Two skills, metadata, local links and template lockfile checked.');
