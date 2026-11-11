---
name: Island Life Custom Pools
description: "The Thermal Circuit: a deep-lagoon ground with honed-stone plaques and brass fittings, walked room by room (Plunge, Lounge, Table, Fire) to the free quote."
colors:
  lagoon: "#06384a"
  lagoon-deep: "#03242f"
  blue: "#0c75b6"
  sky: "#75b5d2"
  stone: "#e8dcc8"
  stone-light: "#f4eee3"
  brass: "#e0b04a"
  brass-press: "#cf9f3a"
  brass-deep: "#7a5614"
  ink: "#0a2230"
  ink-soft: "#3d5563"
  on-water: "#f4eee3"
  on-water-soft: "#bcd3dc"
  link-on-stone: "#0a6199"
  error: "#a4261c"
typography:
  display:
    fontFamily: "'Marcellus', 'Palatino Linotype', Georgia, serif"
    fontSize: "clamp(2.9rem, 1.6rem + 6vw, 6rem)"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "-0.005em"
  headline:
    fontFamily: "'Marcellus', 'Palatino Linotype', Georgia, serif"
    fontSize: "clamp(2.1rem, 1.4rem + 3vw, 3.75rem)"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "-0.005em"
  title:
    fontFamily: "'Marcellus', 'Palatino Linotype', Georgia, serif"
    fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2rem)"
    fontWeight: 400
    lineHeight: 1.12
    letterSpacing: "-0.005em"
  body:
    fontFamily: "'Figtree Variable', system-ui, sans-serif"
    fontSize: "1.0625rem"
    lineHeight: 1.6
  lead:
    fontFamily: "'Figtree Variable', system-ui, sans-serif"
    fontSize: "clamp(1.125rem, 1.05rem + 0.35vw, 1.3125rem)"
    lineHeight: 1.55
  label:
    fontFamily: "'Figtree Variable', system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.16em"
  btn:
    fontFamily: "'Figtree Variable', system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.02em"
  micro:
    fontFamily: "'Figtree Variable', system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
  caption:
    fontFamily: "'Figtree Variable', system-ui, sans-serif"
    fontSize: "0.875rem"
  small:
    fontFamily: "'Figtree Variable', system-ui, sans-serif"
    fontSize: "0.9375rem"
  large:
    fontFamily: "'Figtree Variable', system-ui, sans-serif"
    fontSize: "1.125rem"
  h4:
    fontFamily: "'Marcellus', 'Palatino Linotype', Georgia, serif"
    fontSize: "1.25rem"
    fontWeight: 400
  h4-lg:
    fontFamily: "'Marcellus', 'Palatino Linotype', Georgia, serif"
    fontSize: "1.375rem"
    fontWeight: 400
  h3-sm:
    fontFamily: "'Marcellus', 'Palatino Linotype', Georgia, serif"
    fontSize: "1.5rem"
    fontWeight: 400
  room:
    fontFamily: "'Marcellus', 'Palatino Linotype', Georgia, serif"
    fontSize: "clamp(2rem, 1.5rem + 2vw, 3.1rem)"
    fontWeight: 400
  feature:
    fontFamily: "'Marcellus', 'Palatino Linotype', Georgia, serif"
    fontSize: "clamp(1.75rem, 1.2rem + 2vw, 2.75rem)"
    fontWeight: 400
  call:
    fontFamily: "'Marcellus', 'Palatino Linotype', Georgia, serif"
    fontSize: "clamp(2rem, 1.4rem + 2.6vw, 3.25rem)"
    fontWeight: 400
components:
  button-brass:
    backgroundColor: "{colors.brass}"
    textColor: "{colors.ink}"
    typography: "{typography.btn}"
    rounded: "4px"
    padding: "0.75rem 1.6rem"
    height: "3.25rem"
  button-brass-hover:
    backgroundColor: "{colors.brass-press}"
  button-stone:
    backgroundColor: "{colors.stone-light}"
    textColor: "{colors.ink}"
    typography: "{typography.btn}"
    rounded: "4px"
    padding: "0.75rem 1.6rem"
    height: "3.25rem"
  button-stone-on-stone:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.stone-light}"
    typography: "{typography.btn}"
    rounded: "4px"
    padding: "0.75rem 1.6rem"
    height: "3.25rem"
  button-stone-on-stone-hover:
    backgroundColor: "{colors.lagoon}"
  button-line:
    backgroundColor: "transparent"
    textColor: "{colors.on-water}"
    typography: "{typography.btn}"
    rounded: "4px"
    padding: "0.75rem 1.6rem"
    height: "3.25rem"
  plaque:
    backgroundColor: "{colors.stone}"
    textColor: "{colors.ink}"
    rounded: "4px"
    padding: "clamp(1.5rem, 1rem + 2vw, 2.5rem)"
  medallion:
    backgroundColor: "{colors.brass}"
    textColor: "{colors.ink}"
    rounded: "50%"
    size: "2.75rem"
  medallion-on-stone:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.brass}"
    rounded: "50%"
    size: "2.75rem"
  field-input:
    backgroundColor: "{colors.stone-light}"
    textColor: "{colors.ink}"
    rounded: "4px"
    padding: "0.7rem 0.9rem"
    height: "3rem"
  segment-option:
    backgroundColor: "{colors.stone-light}"
    textColor: "{colors.ink}"
    rounded: "4px"
    padding: "0 1.1rem"
    height: "3rem"
  segment-option-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.stone-light}"
  chip:
    backgroundColor: "{colors.stone-light}"
    textColor: "{colors.link-on-stone}"
    rounded: "4px"
    padding: "0 1rem"
    height: "2.75rem"
  brand-plate:
    backgroundColor: "{colors.stone-light}"
    rounded: "6px"
    padding: "0.3rem 0.65rem"
  site-header-solid:
    backgroundColor: "{colors.lagoon-deep}"
    textColor: "{colors.on-water}"
  menu-panel:
    backgroundColor: "{colors.lagoon-deep}"
    textColor: "{colors.on-water}"
    padding: "1.5rem"
    width: "min(26rem, 100%)"
  mobile-bar:
    backgroundColor: "{colors.lagoon-deep}"
    padding: "0.6rem 0.75rem"
  wayfinder-dot:
    backgroundColor: "{colors.lagoon}"
    rounded: "50%"
    size: "0.9rem"
  wayfinder-dot-current:
    backgroundColor: "{colors.brass}"
---

# Design System: Island Life Custom Pools

## Overview

**Creative North Star: "The Thermal Circuit"**

The page is deep pool water. One lagoon ground (`lagoon`) carries everything, and the interface is set on it the way a thermal spa sets honed stone and brass fittings against its pools: pale travertine plaques with a fine brass rule inset into the face, numbered brass medallions, soft sky-blue light on the pool floor. The interface itself stays lagoon, stone, brass and ink, with only sky and a little blue added for links, progress and focus; photographs and looping video carry the scene's color. Brass is the logo's glow hue deepened until it can hold ink text.

The structure is a circuit, not a stack of cards. The visitor walks four rooms (Plunge, Lounge, Table, Fire) and ends at the free quote, and the system makes the route visible: brass medallions numbered 01 to 05 recur in the hero route strip, the room tags, the wayfinder rail and the build steps, while a thin sky waterline fills across the top of the viewport as the page is read. Type is set in Marcellus, an inscriptional serif at one weight, so headings read as lettering cut into stone; Figtree does all the functional work.

The one visual rejection that is confirmed in the direction contract: no aqua-photo hero over a white card grid. The build answers it with a full-bleed looping flythrough under drifting steam, full-viewport photographic rooms, and a lagoon page whose lightest ground is warm stone, not white.

**Key Characteristics:**
- A single lagoon ground; stone appears as plaques, form fields, the logo plate, and two light sections (Process, Financing).
- Brass is the action fill and the numeral color; text on brass is always ink.
- Flat surfaces with 4px corners; depth from tone, photography and an inset brass rule, never from drop shadows.
- Numbered brass medallions are the wayfinding mark, and the wayfinder rail and waterline trace progress.
- Marcellus at weight 400 for display voice only; Figtree Variable for everything else.
- Slow, scroll-tied motion (steam drift, room parallax, a steps rail that fills) with reduced-motion handling that makes movement instant and pauses video (see Components, Motion and Reduced Motion).

## Colors

A deep-lagoon, travertine and brass palette sampled from the logo (navy `#010031`, blue, sky, glow `#fdeeb4`) and re-seated so that water is the ground, stone is the surface, and brass is the only warm accent. All values live in `src/styles/brand.css`; the frontmatter is normative.

### Primary
- **Polished Brass** (`brass`): the action fill (`.btn-brass`), the medallion disc (`.num`), text selection, the skip link, the focus outline on water, the current wayfinder dot, brass hairlines and gallery-tile borders, trust-line icons, and hover color for links on water. Text on it is `ink`.
- **Pressed Brass** (`brass-press`): hover state of the brass button only.
- **Aged Brass** (`brass-deep`): brass for use on stone. In the build it is used twice and neither is text: the short rule above blockquotes and the Google Guaranteed seal icon. Its role as text on stone is reserved by the token comment, not exercised.

### Secondary
- **Pool Sky** (`sky`): the default link color on water (`a`), the 3px waterline progress bar, the wayfinder rail and dot borders, the uppercase `kind` labels in the Instagram list, and the source hue of the pool-floor glows.
- **Brand Blue** (`blue`): focus outline and focus border on stone and plaques, the filled portion of the build-steps rail, and the second pool-floor glow. It is not used as text on water.

### Neutral
- **Deep Lagoon** (`lagoon`): the page ground (`body`), the theme-color meta, the 84% overlay on the quote photo, and the fill of wayfinder dots.
- **Pool Floor Night** (`lagoon-deep`): the hero ground behind the video, the solid header (at 94%), the menu panel, the mobile bar, the footer, the pause control, and the base color of every scrim over photography.
- **Honed Travertine** (`stone`): the plaque face. Its only two consumers are inside `.plaque`.
- **Pale Travertine** (`stone-light`): every other stone surface: `.on-stone` sections, form fields, chips, segmented options, the logo plate, and the fill of the stone button.
- **Deep Ink** (`ink`): text on stone and on brass; the fill of the ink button, the selected segmented option, and the step medallions.
- **Slate Ink** (`ink-soft`): secondary text on stone (`.muted`, citations) and the border of form fields.
- **Water Light** (`on-water`): primary text on lagoon. Same hex as `stone-light`, kept as its own token.
- **Mist Blue** (`on-water-soft`): secondary text on lagoon (captions, footer meta, trust sub-lines).
- **Stone Link Blue** (`link-on-stone`): links on stone and plaques.
- **Error Red** (`error`): the only feedback hue. Invalid field borders, the inline `.err` message and the failed-send status line, always on stone (6.3:1 on `stone-light`).

Two derived hairlines are also tokens in brand.css: `--rule-water` (sky at 38% over transparent, `color-mix` in oklab) for dividers on lagoon, and `--rule-stone` (ink at 22%) for dividers and chip borders on stone.

### Checked Contrast Pairings
Recomputed from the token hexes on flat surfaces:
- `ink` on `stone` 12.1:1 (14.2:1 on `stone-light`)
- `ink` on `brass` 8.2:1 (6.8:1 on `brass-press`)
- `brass-deep` on `stone` 4.9:1 (5.7:1 on `stone-light`)
- `link-on-stone` on `stone` 4.9:1, the thinnest passing pair in the system
- `ink-soft` on `stone` 5.8:1
- `sky` on `lagoon` 5.6:1 (7.2:1 on `lagoon-deep`)
- `on-water-soft` on `lagoon` 8.1:1; `on-water` on `lagoon` 10.9:1
- `brass` on `lagoon` 6.3:1 (8.1:1 on `lagoon-deep`)

Unconfirmed: text laid over video or photography (hero, rooms, proof, quote) rides on gradient scrims and has not been measured.

### Literals
None outside `brand.css`. Scrims, the menu backdrop, the headline glow and the steam are `color-mix` blends of tokens (`lagoon-deep`, `on-water`), the stone button hover mixes `stone-light` with white, and the 3D player ground is `lagoon-deep`. Error red is the `error` token.

### Named Rules
**The One Ground Rule.** Page-level surfaces are lagoon water (`lagoon`, `lagoon-deep`, or a photograph under a lagoon-deep scrim) or the single light ground `stone-light`. There is no third ground color.

**The Two Inks Rule.** Text on water is `on-water` or `on-water-soft`; text on stone is `ink`, `ink-soft` or `link-on-stone`. The pairs never cross, and links follow the ground (`sky` on water, `link-on-stone` on stone).

**The Brass Action Rule.** Brass fills mean "begin" (the quote) and "count" (the numerals), and text on brass is ink. On stone surfaces the stone button and the build-step medallions flip to ink fills; the room-tag medallions and the quote form's submit button stay brass on their plaques.

## Typography

**Display Font:** Marcellus (with 'Palatino Linotype', Georgia, serif), via `@fontsource/marcellus`, `--font-display`
**Body Font:** Figtree Variable (with system-ui, sans-serif), via `@fontsource-variable/figtree`, `--font-body`

**Character:** Marcellus is a flared, inscriptional serif that ships in one weight (400), so headings feel carved rather than printed. Figtree is a clean, friendly sans that carries body copy, buttons, forms and labels at weights 400 to 600.

### Hierarchy
- **Display** (Marcellus 400, `clamp(2.9rem, 1.6rem + 6vw, 6rem)`, line-height 1.05, letter-spacing -0.005em): the h1 only; the hero headline at `max-width: 12ch` with a soft dark text glow. Reaches the 6rem cap near 1173px viewport width.
- **Headline** (Marcellus 400, `clamp(2.1rem, 1.4rem + 3vw, 3.75rem)`, 1.05): section h2. Local overrides: room plaque h2 `clamp(2rem, 1.5rem + 2vw, 3.1rem)`; discount and financing h2 `clamp(1.75rem, 1.3rem + 1.6vw, 2.75rem)`.
- **Title** (Marcellus 400, `clamp(1.5rem, 1.25rem + 1vw, 2rem)`, 1.12): h3 for paths and build steps; footer h3 is a fixed 1.25rem.
- **Display voice, not headings** (Marcellus 400): the featured review quote `clamp(1.75rem, 1.2rem + 2vw, 2.75rem)` at 1.15; the call number `clamp(2rem, 1.4rem + 2.6vw, 3.25rem)` at 1.1; the footer tagline 1.375rem; menu links 1.5rem; the Google Guaranteed title 1.5rem.
- **Body** (Figtree 400, 1.0625rem, 1.6, `text-wrap: pretty`): all running text.
- **Lead** (Figtree, `clamp(1.125rem, 1.05rem + 0.35vw, 1.3125rem)`, 1.55, `max-width: 36rem`; 34rem in the hero): the paragraph under a heading.
- **Label** (Figtree 600, 0.8125rem, 1.2, 0.16em, uppercase): the `kind` tags in the Instagram list. Wayfinder labels are the same idea at 0.08em.
- **Scale tokens** (`brand.css`): every other size is a `--text-*` token, documented in the frontmatter: `micro` 0.75rem, `caption` 0.875rem, `small` 0.9375rem, `large` 1.125rem, `h4` 1.25rem, `h4-lg` 1.375rem, `h3-sm` 1.5rem, and the fluid `room`, `feature` and `call`. New sizes are added as tokens first.
- **Button** (Figtree 600, 1rem, 1.2, 0.02em): all `.btn`.

### Named Rules
**The Inscription Rule.** Marcellus is regular weight only, and only for display voice (headings, the featured quote, the phone number, the footer tagline, the menu links). It is never used for buttons, labels or form text, and it is never bolded: no other weight is loaded, so bold would be synthesized.

**The Tabular Numerals Rule.** Phone numbers, opening hours and every medallion numeral use `.tnum` (`font-variant-numeric: tabular-nums`).

## Layout

A single centered column with generous vertical air, broken by full-bleed photographic rooms. There is no spacing token scale; the code uses rem literals (common steps: 0.5, 0.75, 1.25, 1.5, 2, 3 rem) and `clamp()` for fluid padding.

- **Container:** `.wrap` is `min(100% - 2.5rem, 78rem)`, widening its gutters to 3rem a side from 48em (`min(100% - 6rem, 78rem)`).
- **Section rhythm:** `.section` padding-block is `clamp(4.5rem, 3rem + 6vw, 9rem)`. Section heads cap at 48rem with a fluid bottom margin `clamp(2.25rem, 1.5rem + 3vw, 4rem)`.
- **Ground alternation:** page order is Hero, Design (3D), Circuit heading, four Rooms, Paths, Process, Proof, Financing, Recent, Quote, Footer. Lagoon sections carry two soft pool-floor glows (`.tiled::before`); Process and Financing sit on `stone-light`; Rooms, Proof and Quote are photographic.
- **Rooms:** each is `min(100svh, 62rem)` tall with its content vertically centered. From 60em the plaque sits in a 27rem column and alternates sides (Plunge left, Lounge right, Table left, Fire right); the scrim gradient runs from the plaque's side. Below 60em they stack.
- **Splits (from 60em):** design 5fr/7fr, process 5fr/7fr (copy column sticky at `top: 7rem`), quote 5fr/6fr, proof 7fr/4fr, discount/financing 1fr/1fr. Paths split 1fr/1fr from 56em, reviews from 48em, footer 1.2fr/1fr/1fr/1fr from 48em.
- **Breakpoints (em):** 40, 48, 56, 60, 64, 75, 100; one max-width query at 47.99em for the hero. The header changes at 75em (inline nav and actions replace the menu button; the mobile bar is hidden; body bottom padding of 4.75rem is dropped).
- **Fixed layers (z-index):** waterline 60, header 50, mobile bar 45, wayfinder 40.
- **Targets:** buttons 3.25rem minimum height, fields and segmented options 3rem; chips, area tags, the menu button, the pause control, the nav links, the hero route links, text links, the phone numbers and (on touch or narrow screens) the footer links 2.75rem (44px). Anchors scroll with `scroll-padding-top: 5.5rem`.
- **Unconfirmed (needs a render):** the Table room has two gallery photos in the six-column strip, so the second tile occupies two of six columns; how that reads has not been seen.

## Elevation & Depth

Flat and tonal. Depth comes from three things: the lagoon ground stepping from `lagoon` to `lagoon-deep`, pale stone plaques lifting off the water by luminance, and photographs under lagoon-deep scrims. No surface carries a blurred drop shadow. The only blur in the system is a text shadow on the hero headline, set on the headline where it sits over the video.

### Shadow Vocabulary
- **Plaque inset rule** (`box-shadow: inset 0 0 0 5px var(--stone), inset 0 0 0 6px color-mix(in oklab, var(--brass) 85%, transparent)`): a 1px brass line set 5px inside the plaque edge. Declared once, on `.plaque`.
- **Media frame ring** (`box-shadow: 0 0 0 1px var(--brass), 0 0 0 7px var(--lagoon), 0 0 0 8px color-mix(in oklab, var(--brass) 55%, transparent)`): a double brass line around the 3D video player. The portrait video frame (`.vframe`) repeats it with `--lagoon-deep` as the inner gap.
- **Header hairline** (`box-shadow: 0 1px 0 var(--rule-water)`): appears when the header turns solid after 40px of scroll.
- **Headline glow** (`text-shadow: 0 2px 30px color-mix(in oklab, var(--lagoon-deep) 55%, transparent)`): hero h1 only.

### Named Rules
**The No Drop Shadow Rule.** Plaques, buttons, cards and fields cast no shadow. Separation is tone, a brass line, or a scrim.

**The One Plaque Rule.** The inset brass rule is declared once and reached by adding the `.plaque` class. Do not redeclare it per component. (The media frame ring is a separate, outer device for video, not a second plaque.)

## Shapes

Quiet and squared, like cut stone. The corner radius is 4px on every control and panel (buttons, plaques, chips, fields, segmented options, tags, gallery tiles, thumbnails, media frames, wayfinder labels); the logo plate is 6px; medallions, the pause control, the play disc and wayfinder dots are circles (50%); focus outlines carry a 3px radius. There are no radius tokens: 4px is repeated as a literal. Gallery tiles carry a 1px brass border (75%); dividers are 1px `--rule-water` on water and `--rule-stone` on stone. Photos are cropped with `object-fit: cover`; the 3D player is 16:9 and the portrait frame 9:16 (max-height 78svh, media scaled 1.16 from the bottom edge; the reason for that crop is unconfirmed).

## Components

### Buttons
- **Shape:** 4px corners, 3.25rem minimum height, 0.75rem by 1.6rem padding, 1px border, Figtree 600 at 1rem with 0.02em tracking; optional 1.125rem icon.
- **Brass (`.btn-brass`):** `brass` fill, `ink` text. Hover: `brass-press`. The quote action everywhere: header, hero, 3D section, mobile bar, menu, form submit.
- **Stone (`.btn-stone`):** `stone-light` fill, `ink` text; the call action on water. Hover: white. On `.on-stone` sections and inside `.plaque` it flips to an `ink` fill with `stone-light` text (hover `lagoon`), which is why the room links and the discount button are ink, not brass.
- **Line (`.btn-line`):** transparent with a 55% `on-water` border (an `ink`-toned border on stone); hover adds a faint fill. Used for financing and Instagram follow.
- **Equal weight:** call and quote share height; in the hero they share `min-width: 12.5rem`, in the header the same compact size, and in the mobile bar they are two equal grid columns. Widths in the hero and header are otherwise content-driven.
- **Text link (`.textlink`):** 600 weight, no underline, 2.75rem tall, arrow nudges 4px right on hover.
- **Focus:** `3px solid brass` outline, 3px offset, on water; `blue` on stone and plaques.

### Stone Plaque
The system's signature surface. `stone` fill, `ink` text, 4px corners, padding `clamp(1.5rem, 1rem + 2vw, 2.5rem)`, the inset brass rule from Elevation. Holds room descriptions, the two paths, the Google Guaranteed note, each review, and the quote form. Links inside use `link-on-stone`; `.muted` becomes `ink-soft`.

### Brass Medallion
`.num`: a 2.75rem circle, `brass` fill, `ink` Figtree 600 numeral at 0.9375rem, tabular. Always zero-padded and counted from 01. Variants: 2rem at 0.75rem in the hero route; inverted to `ink` fill with `brass` numeral on the build steps (stone ground). Numbers 01 to 04 mark the rooms; the wayfinder adds 05 for the quote.

### Chips and Tags
- **Chip (`.chips a`):** `stone-light` fill, 1px `--rule-stone` border, 4px corners, 2.75rem tall, `link-on-stone` text; hover darkens the border to `ink`. A non-link variant (`.chip-plain`) has no fill.
- **Area tag (`.areas li`):** 1px `--rule-water` outline on water, 4px corners, 2.75rem tall with the link filling the whole tag, on-water text; hover on the link turns it brass.
- **Room link (`.room-nav a`):** outlined in `--rule-water`, brass numeral, brass border and text on hover.

### Inputs / Fields
- **Style:** `stone-light` fill, 1px `ink-soft` border, 4px corners, 3rem minimum height, `ink` text, labels Figtree 600 at 0.9375rem. Fields sit inside the form plaque.
- **Segmented choice (`.seg`):** radio inputs visually hidden under 3rem option boxes with the same fill and border; checked becomes `ink` fill with `stone-light` text; hover darkens the border.
- **Focus:** `3px solid blue` outline, 1px offset, border turns `blue`.
- **Error:** validation uses `:user-invalid`; the border turns `error` and a hidden `.err` message appears. The status line names the fields to fix ("Please check your name and your zip code.") and uses the same red for failures; a failed or unconfigured send tells the visitor to call.

### Navigation
- **Header:** fixed; transparent over the hero, turning `lagoon-deep` at 94% with a hairline after 40px of scroll. A `stone-light` logo plate (6px corners, logo multiplied onto it) sits left. From 75em: primary links in Figtree 500 at 0.9375rem (`on-water`, 1px brass underline on hover), then a stone call button and brass quote button at 2.875rem tall. Below 75em: an outlined Menu button opens a popover panel sliding in from the right (`lagoon-deep`, up to 26rem wide) with Marcellus 1.5rem links divided by `--rule-water`, opening hours, and the two actions.
- **Hero route (`.hero-route`):** the four rooms as 2rem medallions with names, joined from 48em by 1.5rem brass hairlines; two columns on mobile.
- **Wayfinder:** see below.
- **Mobile bar:** below 75em only; two equal columns (stone Call, brass Free quote) on `lagoon-deep` with a `--rule-water` top border and a safe-area inset. It slides off (translate 110%) while the hero's call/quote pair is in view and slides in once the pair leaves; without JavaScript it stays visible. The body reserves 4.75rem at the bottom.

### Hero (signature)
Full-bleed looping video, `min-height: 100svh`, content bottom-left. Four layered scrim gradients in `lagoon-deep` and `lagoon` (top, a flat 22% veil removed below 48em, bottom, left) sit under a pair of drifting white steam glows. Headline at display scale (max 12ch), lead (34rem), the equal call and quote buttons, the four-room route strip, then a foot row under a `--rule-water` rule: the pause control with the video caption on the left, the trust list on the right (a brass seal icon on the first item only). On mobile the video is positioned at 68% horizontally.

### Rooms (signature)
Full-viewport photographic sections, one per stop: a photo backdrop (`scale: 1.14`) under a 38% lagoon-deep veil and a side-weighted gradient, a stone plaque holding a medallion tag, the service name, copy and an ink button, and either a looping portrait video (Plunge) or a strip of photos in brass-bordered tiles (the first tile wider than the rest). Tiles zoom 5% on hover.

### Wayfinder and Waterline (signature)
- **Waterline:** a fixed 3px `sky` bar across the top whose width tracks page scroll (`--p`), at every viewport width.
- **Rail:** from 64em, a fixed vertical rail at the right edge, vertically centered, that fades in after scrolling 0.6 of a viewport. Five stops (Plunge, Lounge, Table, Fire, Free quote), each a 0.9rem `lagoon` dot with a 1.5px `sky` border on a 1px sky line; a 2px `sky` fill grows down the line with progress through the circuit (`--c`). The current stop's dot fills `brass` and scales 1.25. Labels (`01 Plunge`, uppercase, 0.8125rem 600, on `lagoon-deep` chips) show on hover or focus, and the current label stays visible from 100em. A requestAnimationFrame-throttled scroll listener reads all layout first, then writes `--p` onto the waterline and `--c` onto the rail (not onto `<html>`). Until it shows, the rail is `visibility: hidden`, so it is out of the tab order.

### Build Steps Rail
Five `h3` steps with ink medallions on a stone ground, joined by a 2px vertical rail: `--rule-stone` track with a `blue` fill that scrubs with scroll where the browser supports view timelines (entry 15% to exit 45%).

### Video and Pause Control
Every looping video is muted, `loop`, `playsinline`, has no `autoplay` attribute and no `src` in the markup, and shows its poster until script runs. Script sets the file only when the video is about to play (so reduced motion and Save-Data visitors download nothing until they press play), picks `model-flythrough-sm.mp4` (480x612, cropped to the phone view, 1.4 MB) on portrait phones (found by adding `-sm` to the hero file name; if it fails to load the video falls back to the full file), plays it only while at least 25% is on screen and the visitor has not paused it, and pauses it when it leaves view or when reduced motion is switched on. A 2.75rem round pause control (lagoon-deep at 70%, 55% `on-water` border) sits in the hero foot, or inside the portrait frame's bottom-right corner, swapping a pause and play icon and its aria-label. The 3D walkthrough is poster-first: a 5rem `brass` play disc over a 16:9 brass-ringed frame, replaced on click by a native controls video that carries the same accessible name. The walkthrough file has no audio track (the original held only continuous low noise, no speech), so it needs no captions.

### Motion and Reduced Motion
- **Authored motion:** hero steam drift (`steam`, 38s and 53s, alternating, also on the quote section); room backdrop parallax (`rise`, translate -7% to 7% over the viewport pass); the steps rail fill (`fill`); a 0.5s zoom on gallery tiles; a 0.2s arrow nudge; a 0.3s mobile bar slide; the menu panel slide.
- **Gated by `prefers-reduced-motion`:** smooth scrolling (set to auto), steam, room parallax and the steps fill (all wrapped in `no-preference`, and the latter two also in `@supports (animation-timeline: view())`), video autoplay (starts paused with the poster, and pauses if the preference is switched on while the page is open), and every movement transition (gallery-tile and play-disc scale, arrow nudge, wayfinder fade and label slide, mobile bar slide, menu panel slide), which become instant. With motion off or unsupported, the steps rail renders fully filled.
- **Kept under reduced motion:** the 0.2s color and border transitions on buttons and the header, because they carry state and move nothing.

### Footer
`lagoon-deep` ground, four columns, the logo on the same stone-light plate as the header, a Marcellus 1.375rem tagline, hours as hairline rows, links in `on-water` with a `--rule-water` underline that turns brass on hover.

## Do's and Don'ts

### Do:
- **Do** ground every page-level surface in `lagoon`, `lagoon-deep`, a photograph under a lagoon-deep scrim, or `stone-light`.
- **Do** set text on brass in `ink` (8.2:1) and flip stone-face buttons and step medallions to `ink` fills.
- **Do** give call and quote equal size wherever a decision is asked for: same height, brass for the quote, stone for the call.
- **Do** build raised surfaces by adding `.plaque`, so the inset brass rule stays declared in one place.
- **Do** number stops with brass medallions, zero-padded, in tabular numerals.
- **Do** keep Marcellus at weight 400 for display voice and Figtree for everything functional.
- **Do** give any new looping video a visible 2.75rem pause control and a poster, and play it only while it is on screen.
- **Do** keep every tap target at 2.75rem (44px) or more, and add new type sizes as `--text-*` tokens in `brand.css` first.
- **Do** wrap new scroll-linked or ambient animation in `prefers-reduced-motion: no-preference` (and `@supports (animation-timeline: view())` for view timelines), as `steam`, `rise` and `fill` do.
- **Do** use `sky` for links on water and `link-on-stone` for links on stone; use a `blue` focus ring on stone and a `brass` one on water.
- **Do** tint scrims and overlays with `lagoon-deep` or `lagoon`.

### Don't:
- **Don't** build an aqua-photo hero over a white card grid (the direction contract's confirmed rejection).
- **Don't** add drop shadows to plaques, buttons, cards or fields.
- **Don't** set brass text on stone (1.5:1 to 1.7:1); use `brass-deep` on stone.
- **Don't** set `blue` as text on lagoon (2.5:1); the build never does.
- **Don't** bold Marcellus: only weight 400 is loaded, so any bolder weight is synthesized.
- **Don't** introduce pill or large-radius controls; the system is 4px with circles for medallions and media controls.
- **Don't** add new UI hues beyond brass, sky and a little blue; the photographs and video carry the scene's color. The one feedback hue is the `error` token.
- **Don't** introduce new raw color literals; add a token to `brand.css` first.
