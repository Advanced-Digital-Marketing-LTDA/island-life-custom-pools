# Design

## Direction: a walkthrough of a drawn project
Island Life sells certainty before construction: a 3D model of the yard, then a build the owner keeps the client updated on every week (reviews name this repeatedly). The site therefore behaves like a walkthrough of a project that already exists on paper, not a brochure.

- Large, square-cornered renders, edge to edge where they carry the page (service panels, design film), like sheets in a drawing set.
- Ruled lists instead of cards (process steps, partners, reviews): a heavy top rule, hairlines between rows.
- One action color. Sun yellow is only ever "Request a free quote". Everything else is deep water ink, paper, and logo blue for links and focus.
- Display type is Archivo run wide (signage and drawing-title proportions). Body is Figtree.
- Honest imagery: only the company's own 3D renders, captioned once as visualizations, never presented as finished projects.

Alternatives considered and rejected: a drafting-sheet look (grid ticks, sheet numbers: decoration, and numbers read as template tells) and a warm resort brochure (serif, cream, brass: interchangeable with every premium-consumer site).

## Page structure (home)
Hero video, trust line, services (one large panel plus two), 3D design film (the differentiator, on deep water), process with the first-pool reassurance beside a ruled step list and the weekly-calendar review, reviews, financing, quote form with the military/first-responder/teacher discount note. Each section answers one question a homeowner has, in the order they ask it. Inner pages vary: service pages add overview, process and film; gallery is images only; contact is the form only; the privacy page is text.

## Color
Tokens live in `src/styles/brand.css`.
- Deep water `oklch(0.2 0.045 245)`: dark surfaces, header, footer. The logo blue darkened toward water.
- Ink `oklch(0.2 0.03 245)` and soft ink `oklch(0.42 0.025 245)`: text.
- Paper `oklch(0.985 0.004 230)` and paper tint `oklch(0.955 0.014 230)`: surfaces.
- Logo blue `oklch(0.5 0.13 245)`: links, focus ring on light surfaces, form focus.
- Sun `oklch(0.87 0.16 95)`: the quote action, nav underline, focus ring on dark surfaces.

## Typography
- Display: Archivo Variable at `font-stretch: 114%`, weight 600, tight line height (1.02 to 1.18). Used for h1 to h3, pull quotes, phone number.
- Body and UI: Figtree Variable, 17px base, 1.65 line height, lines capped near 40 to 65 characters.
- Labels are plain sentence case. The only uppercase tracked label is the hero kicker.

## Shape and surfaces
- Controls (buttons, inputs, chips) use a 2px radius. Photos and video are square. No pills, no soft cards, no drop shadows.
- Form fields are boxed with a 3:1 border so they read as inputs on a phone.

## Motion
Hover and focus transitions only, 150 ms. The hero video autoplays only when allowed (not under reduced motion or data saver), with a visible pause control. The service panel image eases a 2% zoom on hover.

## Rules that keep it from looking generic
- One label per intent: every quote action says "Request a free quote" (compact header and phone bar say "Free quote").
- No eyebrow labels, numbered sections, decorative dots, section pills, or text overlaid on images.
- Client reviews are reproduced verbatim. Do not shorten or reword them without owner approval.
- No invented facts, metrics, logos, awards, or photography.
