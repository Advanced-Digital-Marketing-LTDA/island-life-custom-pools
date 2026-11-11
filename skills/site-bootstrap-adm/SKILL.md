---
name: site-bootstrap-adm
description: Use when starting or simplifying an Astro content website that will run as a standalone Node application on self-hosted Coolify.
---

# Set up an Astro website

Use the [website template](assets/site) for a new site. Keep plans and verification results in the project tracker.

1. Read the target repository instructions and confirm its domain and required features. For a new website, copy the template including dotfiles into the target directory. For an existing website, merge it selectively and preserve content, URLs and necessary integrations.
2. Use the template's compatible Astro/Node adapter versions, Node 24.19.0, npm 11.9.0 and one lockfile. Content pages are prerendered; runtime endpoints use the standalone Node server. The production command is `node ./dist/server/entry.mjs`.
3. Copy `.env.example` to `.env`. Set `SITE_URL` before building for canonical URLs. Use runtime `HOST=0.0.0.0` and `PORT=4321` on the server. Add accounts, databases or other services only when the selected features require them.
4. Run `npm ci`, `npm run check`, `npm run build` and `npm start`. Check the home page, public files, a missing route, `/healthz` and `/build.json`. Add tests for actual website behavior and check its important flows in a browser.
5. Use `$deploy-contabo-coolify` for hosting. Keep the placeholder's indexing restrictions until the real website is ready; then remove its noindex meta tags and change `public/robots.txt`. Rebuild when build configuration changes and compare the deployed build marker with the selected Git commit.

Record the tested commit, working commands and remaining hosting checks in the task. Keep credentials out of client configuration and template defaults.
