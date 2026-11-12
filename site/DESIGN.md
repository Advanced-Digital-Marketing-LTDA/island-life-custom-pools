# Design

## Concept
Drawn before dug, brought to life. The company’s real 3D design footage is the visual center: a cinematic full-screen introduction, an editorial design-film chapter, and clearly labeled visualization stills for each service. The interface stays quiet so the work carries the color.

## Color
`src/styles/brand.css` uses OKLCH primitive, semantic, and component tokens.
- Deep surfaces: warm cinematic charcoal derived from `#0a0a0a`.
- Ground: warm off-white derived from `#f5f5f5`; subtle sections use a deeper tint of the same ground.
- Text: near-black on light and off-white on dark; secondary text remains WCAG AA compliant.
- Brand navy, water blue, and sun yellow remain as primitives from the existing logo. Water is reserved for focus and selected states rather than decorative fills.
- Photography and 3D footage supply the dominant color. No gradients other than the hero’s charcoal readability scrim.

## Type
- Display: Newsreader Variable, light weights with tight optical sizing and fluid headlines. Select final words use a true serif italic.
- Body and controls: Figtree Variable, 400–650.
- Hero: 4–9rem, compact line-height, word-by-word masked entrance.
- Section display: 3.25–6.5rem. Body copy stays at least 17px with a readable measure.

## Layout
- Full-viewport media hero with lower-left editorial composition.
- Twelve-column asymmetric desktop compositions, collapsing to a single readable column on mobile.
- Service stories alternate large visualization stills and copy; no nested cards or decorative panel stacks.
- Reviews, process, social posts, and partner lists use rules and whitespace instead of boxes.
- Mobile call and quote actions remain fixed within safe-area padding.

## Components
- Pill buttons: dark on light, off-white on dark, and outlined secondary actions.
- Form fields use editorial underline styling. Radio options are keyboard-operable pills.
- Navigation uses a native popover drawer with Escape, backdrop, and close-button support.
- External social posts open real Instagram URLs. Unconfigured quote submission explicitly directs visitors to call; it never simulates success.

## Media
`public/media/` contains an optimized local MP4 and WebP stills extracted from the Island Life design video already referenced by the project. They depict 3D visualizations, not completed projects, and are labeled accordingly.

## Motion
The hero headline enters word by word over 800ms. Interface transitions stay below 300ms and use transform, opacity, or color. Video pauses for reduced-motion users and when the page is hidden; reduced-motion visitors receive the poster instead of autoplay.
