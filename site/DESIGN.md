# Design

## Concept
Drawn before dug. The page is a drawing set: a backyard plan is the hero, the same drawing is cropped into service detail sheets, and a title block carries the trust points. Water is the one bright element; everything else stays quiet.

## Color (src/styles/brand.css, sampled from the logo)
- Ink and deep surfaces: brand navy `#010031`; soft ink `#4a5379`
- Water: brand blue `#0c75b6`, brand sky `#75b5d2`, pale `#d2e8f2`
- Link and hover fill: blue darkened for text `#0a6199`
- Ground: pale water tinted to the brand blue `#f1f7fb`, `#ddeaf3`, `#c9dcea`
- Action: sun `#fcd84a` (the logo's glow hue, deepened) for the quote button; navy pill for call
- Deep surfaces carry text `#e8f1f8` and `#a9bfd6`
- The logo has a white background: header blends it with multiply, footer uses a white plate

## Type
- Display: Bricolage Grotesque Variable (500, tracking -0.02 to -0.03em, opsz 72-96)
- Body: Figtree Variable 400/500; weight 600 only on buttons, labels and wordmark
- Scale: h1 2.5-4.25rem, h2 / featured quote / call number 2-3rem (one shared step), h3 1.4-1.75rem, body 1.0625rem; body measure under 65ch

## Components
- Buttons: 52px tall, 10px radius, 1px hairline. Sun = request quote, ink = call, white = secondary. Section-level repeats are text links.
- Hairlines (1px, 16-40% ink) everywhere. The signature is the dimension line: a 1px ink rule with tick ends above paths, services, reviews and Instagram.
- Panels (plan frame, reel, sheets, form, title block): 12px radius, 1px hairline, soft neutral shadow. Controls 8-10px.

## Motion
One authored moment: the hero plan draws itself, water wipes in, hotspots pop. Water shimmer loops slowly (kept on purpose). Process rail fills on scroll. All of it stops under reduced motion. No pings, no hover scale, no layout animation.

## Spacing
4px grid for all fixed values; fluid section padding uses clamp().

## Icons
One set, 18px, 1.5 stroke, text-role color.
