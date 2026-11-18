# Repository guidance

This repository is the Island Life Custom Pools website (`site/`; see `README.md`) together with the small Astro/Node setup toolkit it came from (`skills/`, for self-hosted Coolify on Contabo). The toolkit's copyable website lives in `skills/site-bootstrap-adm/assets/site`. `site/` is a customized copy of it, and the two are not kept in sync.

## The website (`site/`)

Changes go through pull requests into `main`. Do not merge or deploy unless asked. Photos and videos are on the Bunny CDN, not in Git: save new files under a new file name, use that path in the content, and say in the pull request which files need uploading. SMTP and Tina settings are Coolify variables; keep private values out of the repository. Only claim what the client's copy, reviews or the existing site already say; do not invent prices, ratings or timelines.

Before opening a pull request, from `site/` run `npm run check` and `npm run build`, then `node ../scripts/test-site.mjs` and `node ../scripts/test-blocks.mjs`. After changing the editor schema in `tina/config.ts`, refresh `tina/tina-lock.json` as `site/README.md` describes.

## The toolkit (`skills/`, `scripts/check.mjs`, `scripts/test-toolkit.mjs`)

Keep the two skills, runnable template, short READMEs, environment example, checks and license. Keep planning and verification records in the project tracker. Do not add source registers, research archives, worked examples, unrelated test demos or a second project planner.

Use compatible Astro and Node adapter versions, one npm lockfile and the standalone production command. Preserve the content and URLs when applying the template to an existing website. Add services only when the website requires them.

Before committing toolkit changes, run:

```sh
node scripts/check.mjs
node scripts/test-toolkit.mjs
```

For Docker or serving changes, also build the image and check the home page, assets, 404, health endpoint and build marker. Keep private values out of client settings and template defaults. Honor the user's authorization for publication and server changes.

## License

The `LICENSE` file (PolyForm Shield 1.0.0) is the only license. There is no commercial license, reseller or other deal, so do not add commercial licensing text or contact details.
