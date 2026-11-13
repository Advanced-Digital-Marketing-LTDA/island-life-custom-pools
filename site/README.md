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
node ../scripts/test-site.mjs # check the built Island Life pages and interactions
npm start
```

## Content and structure

The site is a port of the React/Vite design in `Kimi_Agent_Island Life Custom Pools.zip` to Astro: static HTML with small vanilla scripts instead of React islands. All copy lives in `content/` and is edited with TinaCMS; `npm run build` reads the JSON directly (`src/lib/content.ts`), so the production build does not use Tina.

- `content/settings.json`: business name, logo, phone, menu, footer, search/social links and the quote form copy and project choices (shown on every page).
- `content/home.json`: every section of the home page.
- `content/pools.json`: the `/pools` page. `content/blog.json`: the `/blog` page and the shared text on articles (back link, contents heading, author box).
- `content/posts/*.json`: one file per journal article; the file name is the URL (`/blog/<file name>`), newest `date` first.
- `tina/config.ts`: the editor schema. Every key in these files is a Tina field, so saving in Tina does not drop anything. After changing the schema run `npx tinacms build --local --skip-cloud-checks` to refresh `tina/tina-lock.json` and commit it.
- Photos are chosen in Tina from `public/images/`.

Not editable in Tina: the page layouts, field labels and placeholders inside the quote form, the 404 page, and adding a new kind of page (that needs a new `.astro` file).

Code map:

- `src/pages/`: `/` (home), `/pools`, `/blog`, `/blog/[slug]`, `/404`, plus the server routes `api/quote`, `healthz` and `build.json`.
- `src/sections/` and `src/components/`: one `.astro` file per React component of the original, with the behavior in the `<script>` next to the markup (header and menu, hero parallax, testimonial slider, process steps, contents scroll-spy, quote form, Lenis smooth scroll).
- `src/styles/index.css` and `app.css`: the original stylesheets, unchanged. Tailwind runs only for its base reset (`@tailwind base`), because the markup uses its own classes.

Leftovers from the previous design that no page reads: `content/pages.json`, `content/blog/*.md` and `public/media/`.

## Quote form

The form posts to `/api/quote` (`src/pages/api/quote.ts`; the project choices come from `content/settings.json`), which validates the fields and emails the lead through Proton SMTP. Set these as runtime variables in Coolify: `SMTP_USER` (the Proton address that owns the token), `SMTP_TOKEN` (its SMTP token), `LEAD_TO` (where leads go); `SMTP_HOST` and `SMTP_PORT` default to `smtp.protonmail.ch` and `587`. Without them the route returns 503 and the visitor sees the call-us message. The visitor gets a request reference (`IL-00000`, random, also in the email subject). A hidden `website` field is the spam trap, and the route sends at most 3 emails per visitor IP and 30 in total per hour (in memory, so a restart resets it) to protect the Proton account. If other projects share that Proton account, create a separate SMTP token for this site so it can be revoked on its own.

## Deploy

Set SITE_URL to https://islandlifecustompools.com as a build variable and enable source-commit availability during build. Build the image from this folder:

```sh
docker build --build-arg SITE_URL=https://islandlifecustompools.com \
  --build-arg SOURCE_COMMIT="$(git rev-parse HEAD)" -t island-life .
docker run --rm -p 127.0.0.1:4321:4321 island-life
```

In Coolify select Dockerfile with base directory `/site`, Dockerfile `/Dockerfile` and exposed port 4321. Keep HOST=0.0.0.0 and PORT=4321 in the container. After deployment check the home page, a missing page, `/healthz` and `/build.json`.

### Caching and compression

The Node server sends `Cache-Control: public, max-age=0` for everything in `public/` (only the hashed `/_astro/` files are cached for a year) and does not compress responses. Both belong to the proxy: in Coolify keep gzip/brotli on, and add a response header for `/images/*` and `/fonts/*` such as `Cache-Control: public, max-age=604800, stale-while-revalidate=86400` (not `immutable`, because those file names are not hashed). After deploy, `curl -sI -H "Accept-Encoding: gzip" https://islandlifecustompools.com/` should show `content-encoding`, and `curl -sI https://islandlifecustompools.com/images/hero.webp` should show the max-age above.

Old page URLs (`/custom-pools/`, `/about-us/`, `/custom-patios/`, `/outdoor-kitchens/`, `/gallery/`, `/financing/`, `/contact/`) redirect to their closest place on the new site (`astro.config.mjs`). Other old URLs return the 404 page.
