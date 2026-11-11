# Astro website

Use Node 24.19 and npm 11.9. Install with `npm ci`, then run `npm run dev`.
Edit pages in `src/pages` and put public files in `public`.

```sh
cp .env.example .env
npm run check
npm run build
npm start
```

Set SITE_URL to the site's canonical origin before building. Content pages
prerender; the Astro standalone Node server also handles /healthz. /build.json
contains SOURCE_COMMIT from the build, or local for a development build.
The standalone server reads exported runtime variables, not .env. For a custom
local listener, run `HOST=127.0.0.1 PORT=4322 npm start`.

Build the production image with public settings:

```sh
docker build --build-arg SITE_URL=https://example.com \
  --build-arg SOURCE_COMMIT="$(git rev-parse HEAD)" -t astro-site .
docker run --rm -p 127.0.0.1:4321:4321 astro-site
```

In Coolify select Dockerfile, root context, /Dockerfile and exposed port 4321.
Set SITE_URL as a build variable and enable source-commit availability during
build. Map the HTTPS domain to destination port 4321; Coolify handles public TLS.
Keep HOST=0.0.0.0 and PORT=4321 in the container. No persistent volume is needed.

Check the home page, a missing page, /healthz and /build.json after deployment.
Retain the previous working image for rollback. Remove the template's noindex
meta tags and change public/robots.txt when the actual site is ready for indexing.
