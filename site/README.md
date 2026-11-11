# Island Life Custom Pools

Astro website for islandlifecustompools.com, served by the standalone Node adapter. Page content lives in `content/*.json` and is edited with TinaCMS.

Use Node 24.19 and npm 11.9.

```sh
npm ci
cp .env.example .env
npm run dev        # site on http://127.0.0.1:4321
npm run dev:cms    # same, plus the editor at /admin
npm run check
npm run build
npm start
```

## Content

- `content/home.json`: every word on the home page.
- `content/settings.json`: logo, phone, hours, navigation, social links and the quote form endpoint.
- `src/styles/brand.css`: brand colors, sampled from the logo (`public/images/island-life-logo.svg` wraps the logo bitmap; a transparent PNG or SVG would let the header and footer drop the blend and the white plate).
- `DESIGN.md` and `PRODUCT.md`: the design system and product context.

Tina edits these JSON files and commits them to Git. The production build does not use Tina: `npm run build` reads the JSON directly. `TINA_CLIENT_ID` and `TINA_TOKEN` are only for editing through Tina Cloud.

## Quote form

Set `Quote form endpoint` in Site settings (`quoteFormAction` in `content/settings.json`). The form sends a multipart POST with `name`, `email`, `phone`, `zip`, `contact_method`, `interest` and `message`. Until an endpoint is set, the form tells the visitor it isn't connected.

## Deploy

Set SITE_URL to https://islandlifecustompools.com as a build variable and enable source-commit availability during build. Build the image from this folder:

```sh
docker build --build-arg SITE_URL=https://islandlifecustompools.com \
  --build-arg SOURCE_COMMIT="$(git rev-parse HEAD)" -t island-life .
docker run --rm -p 127.0.0.1:4321:4321 island-life
```

In Coolify select Dockerfile with base directory `/site`, Dockerfile `/Dockerfile` and exposed port 4321. Keep HOST=0.0.0.0 and PORT=4321 in the container. After deployment check the home page, a missing page, `/healthz` and `/build.json`.

Only the home page is built here. The navigation, footer and service links point at the existing URLs (`/custom-pools/`, `/about-us/`, ...), which return the 404 page until those pages exist or are proxied.
