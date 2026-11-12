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
- `public/media/`: the hero loops (`hero-loop.mp4`, `hero-loop-mobile.mp4`), the design film (`island-life-design.mp4`) and the poster and service stills (webp), all taken from the company’s 3D design video. The hero video has a visible pause control and is replaced by its poster for visitors who prefer reduced motion.
- `DESIGN.md` and `PRODUCT.md`: the design system and product context.

Tina edits these JSON files and commits them to Git. The production build does not use Tina: `npm run build` reads the JSON directly. `TINA_CLIENT_ID` and `TINA_TOKEN` are only for editing through Tina Cloud.

## Quote form

The form posts to `/api/quote` (`quoteFormAction` in `content/settings.json`), a server route in `src/pages/api/quote.ts` that validates the fields and emails the lead through Proton SMTP. Set these as runtime variables in Coolify: `SMTP_USER` (the Proton address that owns the token), `SMTP_TOKEN` (its SMTP token), `LEAD_TO` (where leads go); `SMTP_HOST` and `SMTP_PORT` default to `smtp.protonmail.ch` and `587`. Without them the route returns 503 and the visitor is told to call. A hidden `hp_site_ref` field is the spam trap, and the route sends at most 3 emails per visitor IP and 30 in total per hour (in memory, so a restart resets it) to protect the Proton account. If other projects share that Proton account, create a separate SMTP token for this site so it can be revoked on its own.

## Deploy

Set SITE_URL to https://islandlifecustompools.com as a build variable and enable source-commit availability during build. Build the image from this folder:

```sh
docker build --build-arg SITE_URL=https://islandlifecustompools.com \
  --build-arg SOURCE_COMMIT="$(git rev-parse HEAD)" -t island-life .
docker run --rm -p 127.0.0.1:4321:4321 island-life
```

In Coolify select Dockerfile with base directory `/site`, Dockerfile `/Dockerfile` and exposed port 4321. Keep HOST=0.0.0.0 and PORT=4321 in the container. After deployment check the home page, a missing page, `/healthz` and `/build.json`.

### Caching and compression

The Node server sends `Cache-Control: public, max-age=0` for everything in `public/` (only the hashed `/_astro/` files are cached for a year) and does not compress responses. Both belong to the proxy: in Coolify keep gzip/brotli on, and add a response header for `/media/*` such as `Cache-Control: public, max-age=604800, stale-while-revalidate=86400` (not `immutable`, because those file names are not hashed). After deploy, `curl -sI -H "Accept-Encoding: gzip" https://islandlifecustompools.com/` should show `content-encoding`, and `curl -sI https://islandlifecustompools.com/media/hero-poster.webp` should show the max-age above.

Only the home page is built here. The navigation, footer and service links point at the existing URLs (`/custom-pools/`, `/about-us/`, ...), which return the 404 page until those pages exist or are proxied.
