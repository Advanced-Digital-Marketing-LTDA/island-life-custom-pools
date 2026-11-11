# Repository guidance

This repository is a small Astro/Node setup toolkit for self-hosted Coolify on Contabo. The copyable website lives in `skills/site-bootstrap-adm/assets/site`.

Keep the two skills, runnable template, short READMEs, environment example, checks and license. Keep planning and verification records in the project tracker. Do not add source registers, research archives, worked examples, unrelated test demos or a second project planner.

Use compatible Astro and Node adapter versions, one npm lockfile and the standalone production command. Preserve the content and URLs when applying the template to an existing website. Add services only when the website requires them.

Before committing, run:

```sh
node scripts/check.mjs
node scripts/test-toolkit.mjs
```

For Docker or serving changes, also build the image and check the home page, assets, 404, health endpoint and build marker. Keep private values out of client settings and template defaults. Honor the user's authorization for publication and server changes.
