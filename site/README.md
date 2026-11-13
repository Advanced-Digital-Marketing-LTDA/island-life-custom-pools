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
node ../scripts/test-site.mjs   # check the built pages
node ../scripts/test-blocks.mjs # stress the page builder (reversed, hidden and empty sections); builds twice
npm start
```

## Content and structure

The site is a port of the React/Vite design in `Kimi_Agent_Island Life Custom Pools.zip` to Astro: static HTML with small vanilla scripts instead of React islands. All copy and page layout live in `content/` and are edited with TinaCMS; `npm run build` reads the JSON directly (`src/lib/content.ts`), so the production build does not use Tina.

- `content/pages/*.json`: **every page**. The file name is the address (`patios.json` is `/patios`, `home.json` is the front page) and the page is a list of sections ("blocks"). Editors reorder, add, hide and delete sections in Tina; new pages are built from the same sections.
- `content/settings.json`: business name, logo, share image, phone, menu, footer, search/social links and the quote form copy and project choices (shown on every page).
- `content/posts/*.json`: one file per journal article; the file name is the URL (`/blog/<file name>`), newest `date` first. `content/blog.json`: the text shared by every article (back link, contents heading, author box).
- `tina/config.ts`: the editor schema. Every key in these files is a Tina field, so saving in Tina does not drop anything. After changing the schema run `npx tinacms build --local --skip-cloud-checks` to refresh `tina/tina-lock.json` and commit it.
- Photos are chosen in Tina from `public/images/`.

### Sections

Each section type is a component in `src/sections/` that takes its fields as props. `src/lib/blocks.ts` lists the types, `src/components/Blocks.astro` maps them to components and `tina/config.ts` defines their fields; `scripts/test-site.mjs` fails if the editor and the renderer disagree. To add a section type: add the name to `blocks.ts`, the component and its entry in `Blocks.astro`, and a template in `tina/config.ts`.

The page route is `src/pages/[...slug].astro`. The header floats over the page when the first visible section is a hero (`overlayBlocks` in `blocks.ts`) and is solid otherwise; a first section that is not built to open a page gets a spacer below the fixed header. The scripts (hero parallax, reviews slider, process steps, quote form) work for any number of those sections on a page, or none.

Section "link names" (`anchor`) become ids that links can jump to (`#about`). They must be unique on a page, the quote form defaults to `quote` (the header button goes to `/#quote`), and a section's heading id is derived from its link name.

### For whoever edits the site

- **Pages:** open Pages in Tina. "Add File" creates a page; its file name (made from the title) is its address. Never delete the page named `home`: it is the front page and the site will not build without it.
- **Sections:** drag the handle to reorder, the bin to delete, "Hide this section" to keep a section without showing it, and add a section from the list at the bottom. Tina has no "duplicate": add another section of the same type and fill it in. Neighbouring sections of the same background colour will sit directly against each other, so a reordered page can need a different neighbour.
- **Links:** use `#name` for a section on the same page, `/page` for another page and `/#name` for a section on the home page.
- **If a save does not appear on the live site:** the site is rebuilt after every save, and a mistake the build catches stops that build. The live site then keeps showing its previous version, and Tina shows no error. Look at the latest deployment log in Coolify; the message says what to fix. The checks are: an unknown section type, a link name used twice on one page, a page file name that is not lowercase letters, numbers and dashes (or is reserved: `404`, `api`, `healthz`, `build.json`, and the old URLs in `src/lib/redirects.mjs`), and a missing `home` page. Fix it in Tina (or restore the file from Git history) and save again.
- **Not editable in Tina:** the design of each section, the header and footer layout (their text and links are in Site settings), the quote form's field labels, the 404 page and the article layout.

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

Old page URLs (`/custom-pools/`, `/custom-patios/`, `/about-us/`, `/contact/`) redirect to their closest place on the new site (`astro.config.mjs`). Other old URLs return the 404 page.

## Images and videos on the CDN

Images and videos are not in Git (`public/images`, `public/videos` and `public/media` are git-ignored); the site loads them from
Bunny (`https://ilcpmedia.b-cdn.net/public/...`). The content stores a path (`/images/hero-video-poster.webp`) and
`src/lib/assets.ts` lists every file that is on the CDN and swaps its path for the CDN address when the site is built. To add a
photo or video: upload it to the CDN's `public/images` (or `public/videos`) folder, then add its file name to that list.
A path that is not on the list is not served (the file is not in the repository), and `scripts/test-site.mjs` fails on it.
Fonts, the favicon and `robots.txt` stay in `public` and are served by the site.
