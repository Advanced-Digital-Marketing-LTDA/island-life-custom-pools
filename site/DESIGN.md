# Design

## Direction: a walkthrough of a drawn project
Island Life sells certainty before construction: a 3D model of the yard, then a build the owner keeps the client updated on every week (reviews name this repeatedly). The site therefore behaves like a walkthrough of a project that already exists on paper, not a brochure.

- Large, square-cornered renders, edge to edge where they carry the page (service panels, design film), like sheets in a drawing set.
- Ruled lists instead of cards (process steps, partners, reviews): a heavy top rule, hairlines between rows.
- One button system (see Shape and surfaces). Everything else is deep navy ink, paper, and the client's blues.
- Honest imagery: only the company's own 3D renders, captioned once as visualizations, never presented as finished projects.

Alternatives considered and rejected: a drafting-sheet look (grid ticks, sheet numbers: decoration, and numbers read as template tells) and a warm resort brochure (serif, cream, brass: interchangeable with every premium-consumer site).

## Page structure (home)
Short and quote-first: hero video with the keyword headline and a trust bar; the payment calculator and the quote form side by side; a three-warranty bar; a brief intro with the three services as ruled rows; reviews (verbatim excerpts); and one clean grid of the areas served, the last section before the footer. Heavy text lives on other pages: the story, awards, process and discount note on About; the lenders on Financing; the gallery and the 3D design video on Gallery; the questions on FAQ; costs, comparisons and detailed answers on the service pages. The areas grid is the single place the cities are listed (home only), and the owner's name is not published. Inner pages vary: service pages add overview, process and film; gallery is images only; contact is the form only; the privacy page is text.

## Color
Tokens live in `:root` in `src/styles/index.css`. The brand palette comes from the client:
- Primary Blue `#5CA9CC` (`--brand-aqua`): the reviews band, accents on dark surfaces, hairline tints.
- Brand Yellow `#FBEEBC` (`--brand-sand`): warm bands, text on dark surfaces, the primary button on dark or blue surfaces.
- Dark Blue `#0E73B9` (`--brand-blue`): the primary button on light surfaces, the payment result box, the warranty band.
- Original Logo Blue `#0A72B9` (`--brand-blue-text`): accent words and numbers on light surfaces.
- Deep navy `#00243b` (`--brand-ink`) is not a client color. It stays for body text and dark bands (hero veil, footer, menus, lender panel) because navy text on Dark Blue fails contrast; white on Dark Blue passes.
- Tints (paper, ice, hairlines) are `color-mix()` of the tokens above, so they follow a palette change.
- Primary Blue is never text on a light surface (2.6:1).

## Typography
- Display and UI: Michroma, 400 only (self-hosted). Body paragraphs: Montserrat.
- Heading sizes come from `--fs-h1`, `--fs-h2` and `--fs-h3` in `index.css`; headings use `text-wrap: balance`. Do not hard-code a clamp per section.

## Shape and surfaces
- One button system: 52px tall, 0.35em radius, same type everywhere. Dark Blue with white text on light surfaces (`.button--dark`), Brand Yellow with navy text on dark or blue surfaces (`.button--light`). Secondary actions are underlined text links.
- Form fields are boxed with a 3:1 border so they read as inputs on a phone.

## Motion
Hover and focus transitions only, 150 ms. The hero video autoplays only when allowed (not under reduced motion or data saver), with a visible pause control. The service panel image eases a 2% zoom on hover.

## Rules that keep it from looking generic
- One label per intent: every quote action says "Request a free quote" (compact header and phone bar say "Free quote").
- No eyebrow labels, numbered sections, decorative dots, section pills, or text overlaid on images.
- Client reviews are reproduced verbatim. The home page shows excerpts the client asked to shorten: whole sentences, in order, never reworded. Other pages show the full review.
- No invented facts, metrics, logos, awards, or photography.
