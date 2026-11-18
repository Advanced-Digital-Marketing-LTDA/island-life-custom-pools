# Island Life Custom Pools

The website for [islandlifecustompools.com](https://islandlifecustompools.com): a pool, patio and outdoor kitchen builder in Tomball, Texas, serving the Greater Houston area. The site exists to get a homeowner to request a free quote or call.

It is an Astro site served by the standalone Node adapter, with page content stored as JSON in Git and edited through TinaCMS. It ships as a Docker image that Coolify builds and runs on a Contabo server. Photos and videos live on a Bunny CDN, not in Git. Quote requests are emailed to the business through Proton SMTP.

The site was built from the setup toolkit that is also kept here (see [The toolkit](#the-toolkit)).

## What is in this repository

| Path | What it is |
|---|---|
| [`site/`](site/) | The website: pages, sections, styles, the quote form's server route, the Dockerfile and the Tina editor schema. Start with [`site/README.md`](site/README.md). |
| [`site/PRODUCT.md`](site/PRODUCT.md), [`site/DESIGN.md`](site/DESIGN.md) | Who the site is for and what it must do; the design system (colors, type, buttons, page structure). |
| [`scripts/`](scripts/) | Checks. `test-site.mjs` and `test-blocks.mjs` test the built website; `check.mjs` and `test-toolkit.mjs` test the toolkit. |
| [`skills/`](skills/) | The toolkit the site started from: two agent skills and a copyable template. |
| [`.github/`](.github/) | Pull request automation: toolkit checks, dependency review, code scanning and review workflows. |

## Work on the website

Use Node 24.19 and npm 11.9.

```sh
cd site
npm ci
cp .env.example .env
npm run dev          # http://127.0.0.1:4321
npm run dev:cms      # same, plus the editor at /admin
npm run check        # type check
npm run build
node ../scripts/test-site.mjs     # checks the built pages
node ../scripts/test-blocks.mjs   # stress-tests the page builder; builds twice
```

Page text and layout live in `site/content/*.json` and are edited in Tina (or by editing the JSON); the design of each section is in `site/src/sections/`. [`site/README.md`](site/README.md) explains the content model, the quote form and its email settings, deployment on Coolify, the CDN and what editors can and cannot change.

### How changes ship

Changes go through pull requests into `main`, which is the branch Coolify builds the Docker image from. Saves made in the Tina editor are committed to `main` too. Deploying a merged change is a separate step in Coolify. Before opening a pull request, run the type check, the build and both site test scripts above. CI in this repository runs the toolkit checks, not the site's own test scripts, so those are run by hand.

Photos and videos are not in Git. Upload new files to the CDN under a new file name and put the path in Tina or the JSON; the pull request should say which files need uploading.

## The toolkit

The repository began as Site-Bootstrap-ADM, a small setup toolkit for Astro websites served by standalone Node and self-hosted on Contabo through Coolify. It is kept in `skills/`:

- [website setup](skills/site-bootstrap-adm/SKILL.md): an agent skill for preparing a website, with a runnable template in `skills/site-bootstrap-adm/assets/site` (its [README](skills/site-bootstrap-adm/assets/site/README.md) covers configuration and Docker);
- [Contabo/Coolify hosting](skills/deploy-contabo-coolify/SKILL.md): an agent skill for deploying a site to a selected server and domain.

To start a new site from the template:

```sh
mkdir ../my-website
cp -R skills/site-bootstrap-adm/assets/site/. ../my-website/
cd ../my-website
npm ci
npm run dev
```

Install both folders under `skills/` with your agent's skill installer; replace an old copy rather than merging it. Ask for `$site-bootstrap-adm` to prepare the website, then `$deploy-contabo-coolify` to deploy it. The island-life site in `site/` has diverged from the template: it is a customized copy, not a generated one, so improvements to one are not applied to the other automatically.

Check the toolkit with `node scripts/check.mjs` and `node scripts/test-toolkit.mjs`. The smoke test copies the template, installs dependencies, checks and builds it, then tests the production server.

## License

The code in this repository is licensed under the [PolyForm Shield License 1.0.0](LICENSE). Commercial use is permitted when it complies with that license; for uses it does not permit, see [commercial licensing](COMMERCIAL.md). Third-party components keep their own licenses. The business name, logo and brand colors, copy, photos and videos on the live site belong to Island Life Custom Pools and are not covered by that license.
