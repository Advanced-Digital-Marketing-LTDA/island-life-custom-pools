# Site-Bootstrap-ADM

A small setup toolkit for Astro websites, served by standalone Node and self-hosted on Contabo through Coolify.

It provides a copyable website template and two skills: [website setup](skills/site-bootstrap-adm/SKILL.md) and [Contabo/Coolify hosting](skills/deploy-contabo-coolify/SKILL.md).

## Use the template

```sh
mkdir ../my-website
cp -R skills/site-bootstrap-adm/assets/site/. ../my-website/
cd ../my-website
npm ci
npm run dev
```

Use Node 24.19.0 and npm 11.9.0. The copied [README](skills/site-bootstrap-adm/assets/site/README.md) covers configuration, production commands and Docker. Put pages in `src/pages` and public files in `public`. Indexing is disabled until you replace the placeholder content.

For an existing website, merge the template selectively and preserve its content, routes and required configuration. The production command is `node ./dist/server/entry.mjs`.

## Use the skills

Install both folders under `skills/` with your agent's skill installer. When upgrading, replace the old folder rather than merging it. Remove an old `plan-sites-and-apps-adm` installation if it came from this toolkit and you no longer use it.

Ask for `$site-bootstrap-adm` to prepare the website, then `$deploy-contabo-coolify` to deploy it to your selected server and domain. Keep plans and verification results in your project tracker.

## Check the toolkit

```sh
node scripts/check.mjs
node scripts/test-toolkit.mjs
```

The smoke test copies the template, installs dependencies, checks and builds it, then tests the production server. See [LICENSE](LICENSE).

## License

Site-Bootstrap-ADM is licensed under the [PolyForm Shield License 1.0.0](LICENSE).
Commercial use is permitted when it complies with that license. For uses not
permitted by PolyForm Shield, see [commercial licensing](COMMERCIAL.md).
Third-party components keep their own licenses.
