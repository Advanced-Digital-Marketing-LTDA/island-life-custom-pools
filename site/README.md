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

- `content/pages/*.json`: **every page**. The file name is the address (`custom-patios.json` is `/custom-patios/`, `home.json` is the front page) and the page is a list of sections ("blocks"). Editors reorder, add, hide and delete sections in Tina; new pages are built from the same sections.
- `content/settings.json`: business name, logo, share image, phone, menu, footer, search/social links and the quote form copy and project choices (shown on every page).
- `content/posts/*.json`: one file per blog article; the file name is the URL (`/blog/<file name>`), newest `date` first. `content/blog.json`: the text shared by every article (back link, contents heading, author box).
- `tina/config.ts`: the editor schema. Every key in these files is a Tina field, so saving in Tina does not drop anything. After changing the schema run `npx tinacms build --local --skip-cloud-checks` to refresh `tina/tina-lock.json` and commit it.
- Photos are chosen in Tina from `public/images/`.

### Sections

Each section type is a component in `src/sections/` that takes its fields as props. `src/lib/blocks.ts` lists the types, `src/components/Blocks.astro` maps them to components and `tina/config.ts` defines their fields; `scripts/test-site.mjs` fails if the editor and the renderer disagree. To add a section type: add the name to `blocks.ts`, the component and its entry in `Blocks.astro`, and a template in `tina/config.ts`.

The page route is `src/pages/[...slug].astro`. The header floats over the page when the first visible section is a hero (`overlayBlocks` in `blocks.ts`) and is solid otherwise; a first section that is not built to open a page gets a spacer below the fixed header. The scripts (hero parallax, reviews slider, process steps, quote form) work for any number of those sections on a page, or none.

A page opening (`pageHero`) can show its photo above the heading on phones and tablets ("photoFirst"; use it on landing pages so the photo is on screen when the page opens), and an overview section can end with a button. The small heading above the title is optional on the overview, reviews and closing call-to-action sections and is left out when empty.

Section "link names" (`anchor`) become ids that links can jump to (`#about`). They must be unique on a page, the quote form defaults to `quote` (the header button goes to `/#quote`), and a section's heading id is derived from its link name.

### For whoever edits the site

- **Pages:** open Pages in Tina. "Add File" creates a page; its file name (made from the title) is its address. Never delete the page named `home`: it is the front page and the site will not build without it.
- **Sections:** drag the handle to reorder, the bin to delete, "Hide this section" to keep a section without showing it, and add a section from the list at the bottom. Tina has no "duplicate": add another section of the same type and fill it in. Neighbouring sections of the same background colour will sit directly against each other, so a reordered page can need a different neighbour.
- **Service areas:** the list lives in Site settings > Footer > Service areas (name, and a page address when the area has its own page; an area without one shows as plain text, and is left out on phones). The same list feeds the "Service areas" section on the home page, the search-engine description and the menu's "Service areas" submenu, so add an area there once. The footer shows only a "Service areas" link to that section. The line under the list is "Line under the service areas".
- **Google Tag Manager:** Site settings > Google Tag Manager ID (for example `GTM-XXXXXXX`). The standard tag is added to every page, including the thank-you page; leave the field empty for no tag. Add tags, triggers and conversion tracking inside Tag Manager, not in the code. The site has no cookie banner, so check consent and the privacy policy before turning on tags that use cookies.
- **Menu:** Site settings > Main menu. A menu item whose link is `/#areas` (the "Service areas" item) automatically gets a submenu of every area that has its own page: a dropdown on wide screens and an expandable group in the phone menu. Nine items do not fit beside the logo below 1140px wide, so up to 1139px the phone menu is used. Keep the menu to about nine items.
- **FAQ:** switch on "Collapsed answers" for a short list of questions that open on click; the answers stay in the page for search engines.
- **Names:** the owner's name is deliberately not published.
- **Links:** use `#name` for a section on the same page, `/page` for another page and `/#name` for a section on the home page.
- **If a save does not appear on the live site:** the site is rebuilt after every save, and a mistake the build catches stops that build. The live site then keeps showing its previous version, and Tina shows no error. Look at the latest deployment log in Coolify; the message says what to fix. The checks are: an unknown section type, a link name used twice on one page, a page file name that is not lowercase letters, numbers and dashes (or is reserved: `404`, `api`, `healthz`, `build.json`, and the old URLs in `src/lib/redirects.mjs`), and a missing `home` page. Fix it in Tina (or restore the file from Git history) and save again.
- **Not editable in Tina:** the design of each section, the header and footer layout (their text and links are in Site settings), the quote form's field labels, the 404 page and the article layout.

Leftovers from the previous design that no page reads: `content/pages.json` and `public/media/`.

### Landing pages and the phone bar

- **Landing pages:** make a page in Tina (Add File) and build it from the same sections. `content/pages/58k-pool-package.json` (`/58k-pool-package/`) is the $58,000 pool package offer: page opening with the photo first, overview with the included items and a button, a photo band, the calculator beside the quote form, reviews and a closing band. It is in the sitemap but not in the menu or footer. If an offer ends, switch on "Keep out of search results" for the page in Tina, or delete it.
- **Phone bar:** every page except `noindex` pages shows a Call / Free quote bar at the bottom of screens under 1024px (`src/components/MobileBar.astro`). It hides while the page's quote form or the payment calculator is on screen. On the home page it also stays hidden until the visitor scrolls down. Because `noindex` pages (such as the thank-you page) never show it, a landing page should stay indexable if it needs the bar.
- **Fonts:** the brand fonts Michroma and Montserrat are in `public/fonts`. `src/styles/index.css` also defines two stand-in fonts (`Michroma Fallback`, `Montserrat Fallback`: Arial resized to the same widths) so text does not reflow when a font arrives, which was the home page's layout shift. If the fonts change, re-measure those sizes.

## Quote form

The form posts to `/api/quote` (`src/pages/api/quote.ts`; the project choices come from `content/settings.json`), which validates the fields and emails the lead through Proton SMTP. Set these as runtime variables in Coolify: `SMTP_USER` (the Proton address that owns the token), `SMTP_TOKEN` (its SMTP token), `LEAD_TO` (where leads go; several addresses can be separated by commas); `SMTP_HOST` and `SMTP_PORT` default to `smtp.protonmail.ch` and `587`. Without them the route returns 503 and the visitor sees the call-us message. After a successful send the browser goes to `/thank-you/` (`content/pages/thank-you.json`), which thanks the visitor and presents the $58K package as a one-time offer; invalid fields show their own messages and a failed send keeps the visitor on the form with the phone number. The visitor gets a request reference (`IL-00000`, random, also in the email subject). A hidden `website` field is the spam trap, and reCAPTCHA v3 (invisible) scores each submission. reCAPTCHA is on when both the public key (Site settings > reCAPTCHA site key) and the private key (`RECAPTCHA_SECRET`, a Coolify runtime variable) are set, and off when either is missing. Google's script loads the first time someone uses a form, and Google's badge then appears at the bottom right (Google requires either the badge or a notice that its privacy policy and terms apply). The server turns away a missing or bad token, a score under 0.5 or a different action, and lets a request through, with a log line, when Google cannot be reached or `RECAPTCHA_SECRET` is wrong, so a real lead is not lost to a setup mistake. There is no sending limit, so a flood of fake requests would send as many emails; add a limit again if that ever happens. If other projects share that Proton account, create a separate SMTP token for this site so it can be revoked on its own.

If leads do not arrive, open the browser's network tab on a form submit and look at the `/api/quote` status, then the deployment log in Coolify. `503` means `SMTP_USER`, `SMTP_TOKEN` or `LEAD_TO` is missing at runtime; `502` means the send failed, and the log line `Quote form: send failed <code> <SMTP reply code> <command> <the server's reply>` says why (`EAUTH` and a `535` reply: wrong address or token; `EENVELOPE` or a `550`/`553` reply: the sender or recipient was refused, and `SMTP_USER` must be the exact address that owns the token; `ECONNECTION`, `ESOCKET` or `ETIMEDOUT`: the server cannot reach the mail server on that port); `403` means the page is on a domain other than `SITE_URL`, or (if the response is `captcha`) reCAPTCHA turned the request away: the log says `token missing`, `low score` or `rejected`. The log never contains the visitor's details.

## Deploy

Set SITE_URL to https://islandlifecustompools.com as a build variable (the Docker build stops if it is missing or is not an https address, so canonical links can never point at localhost) and enable source-commit availability during build. Build the image from this folder:

```sh
docker build --build-arg SITE_URL=https://islandlifecustompools.com \
  --build-arg SOURCE_COMMIT="$(git rev-parse HEAD)" -t island-life .
docker run --rm -p 127.0.0.1:3000:3000 island-life
```

In Coolify select the Dockerfile build pack and exposed port 3000 (Coolify's default). The Dockerfile works whether the build starts at the repository root (Dockerfile `/site/Dockerfile`) or in `site/` (base directory `/site`, Dockerfile `/Dockerfile`). Keep HOST=0.0.0.0 and PORT=3000 in the container. After deployment check the home page, a missing page, `/healthz` and `/build.json`.

### Editing on the live site (Tina Cloud)

The editor at `/admin` is built into the image only when both `TINA_CLIENT_ID` and `TINA_TOKEN` are set as **build variables** in Coolify (also set `GITHUB_BRANCH=main`). Without them the site builds and runs with no `/admin`. Create the Tina Cloud project for this repository, add the site's address to its allowed sites, and every save in the editor is committed to `main`, which Coolify redeploys. The editor build uses `--skip-cloud-checks`, so a Tina Cloud problem cannot fail a deploy, but it can leave the editor unable to save. The token is a build argument, so keep the image on your own server. Photos picked in Tina are saved to `public/images`, which is not on the CDN: upload the file to the CDN's `public/images` folder as well.

### Caching and compression

The Node server sends `Cache-Control: public, max-age=0` for everything in `public/` (only the hashed `/_astro/` files are cached for a year) and does not compress responses. Both belong to the proxy: in Coolify keep gzip/brotli on, and add a response header for `/fonts/*` (the only static files the site still serves besides the favicon; images and videos are cached by Bunny) such as `Cache-Control: public, max-age=604800, stale-while-revalidate=86400` (not `immutable`, because those file names are not hashed). After deploy, `curl -sI -H "Accept-Encoding: gzip" https://islandlifecustompools.com/` should show `content-encoding`, and `curl -sI https://islandlifecustompools.com/fonts/michroma-regular.woff2` should show the max-age above.

The old site's pages live at the same addresses on this site, so nothing redirects: `/custom-pools/`, `/custom-patios/`, `/outdoor-kitchens/`, `/financing/`, `/gallery/`, `/about-us/`, `/contact/`, `/hayward-equipment/`, `/thank-you/`, `/gdpr-privacy-policy/`, `/blog/` and the eight `/custom-pool-builders-<city>/` pages. Addresses end in a slash, and so do the canonical links, the sitemap and every internal link; `/custom-pools` without the slash also answers, and its canonical link names the slash form. `/thank-you/` is marked `noindex` and left out of the sitemap (switch on "Keep out of search results" for any other page in Tina to do the same, and note that such pages also lose the phone bar). The `/58k-pool-package/` landing page is not part of the old site; it is indexed and in the sitemap. Old blog post addresses (`/maintaining-pool-water-chemistry/` and so on) are not recreated: posts live under `/blog/`, so those four return the 404 page.

The sitemap keeps the old site's addresses: `/sitemap_index.xml` (also `/sitemap.xml`) lists `/page-sitemap.xml` and `/post-sitemap.xml`, and `robots.txt` points to the index.

## Images and videos on the CDN

Images and videos are not in Git (`public/images`, `public/videos` and `public/media` are git-ignored); the site loads them from
Bunny (`https://ilcpmedia.b-cdn.net/public/...`). The content stores a path (`/images/hero-video-poster-v2.webp`) and
`src/lib/assets.ts` turns every `/images/...` and `/videos/...` path into its CDN address when the site is built. To add a photo
or video, upload it to the CDN's `public/images` (or `public/videos`) folder and use that path in Tina; nothing else is needed.
Fonts and the favicon stay in `public` and are served by the site; `robots.txt` and the sitemaps are generated by pages in `src/pages`.

The home hero video is two small H.264 MP4 files with no sound, `public/videos/island-life-hero-v2.mp4` (1080 px wide, about 3 MB) and `island-life-hero-mobile-v2.mp4` (540 px wide, about 2 MB). The page starts them after it has loaded, and visitors with Data Saver on or reduced motion keep the poster image. When a CDN file is replaced, upload it under a new name (the `-v2` files were made that way) and change the path in Tina: the CDN caches by file name, so a same-name upload can keep serving the old file. Old file names can be deleted from the CDN once nothing uses them.
