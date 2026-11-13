---
target: the gallery page
total_score: 22
max_score: 32
na_heuristics: 7,10
p0_count: 1
p1_count: 2
timestamp: 2026-11-13T17-04-02Z
slug: site-src-pages-gallery-astro
---
Method: dual-agent (A: design-review agent, rerun after the first was interrupted · B: detector + browser-evidence agent)

## Design Health Score

Surface mode: Experience (gallery). Heuristics 7 and 10 scored n/a.

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | No visible current-page state in the nav (aria-current is set but unstyled). The keyboard focus ring on the "Free quote" and closing buttons is navy on navy (1.0:1), so focus is invisible. |
| 2 | Match System / Real World | 2 | "Gallery" and "The complete backyard" read as finished work; the images are AI-generated concept art with no caption saying so. Alt text on 02 says "Geometric" for a freeform pool. |
| 3 | User Control and Freedom | 3 | Fine. The CTA leaves for `/#quote` on another page. |
| 4 | Consistency and Standards | 3 | One action has two names: "Free quote" (header) and "free design consult" (closing CTA). |
| 5 | Error Prevention | 3 | No destructive paths; the misrepresentation risk is scored under 2. |
| 6 | Recognition Rather Than Recall | 3 | On mobile the quote and phone sit behind the hamburger. |
| 7 | Flexibility and Efficiency | n/a | Experience mode: no expert paths needed. |
| 8 | Aesthetic and Minimalist Design | 3 | Restrained, but four text layers per image and a dead zone in the desktop stagger. |
| 9 | Error Recovery | 3 | Lazy images sit in fixed aspect-ratio boxes, so nothing jumps. No failure states designed. |
| 10 | Help and Documentation | n/a | Experience mode. The missing "what is 3D design?" explanation is counted in the issues below. |
| **Total** | | **22/32** | **Acceptable (69%), just under Good** |

## Design Specificity Verdict

**LLM assessment**: Partly generic. The subject is pool-specific (fire bowls, spa spillover, outdoor kitchen), but the idea is a luxury-hospitality editorial template: huge wide display headline, staggered asymmetric image grid, numbered captions, navy and paper. Swap the copy and it fits a resort, a landscaper or patio furniture. The one thing this company can show that competitors cannot, a 3D design before anyone digs, appears only as a clause in a grey paragraph. Nothing on the page looks like design work (no plan, no render stage, no before/after).

**Deterministic scan**: Detector: 1 finding on the built page, `overused-font` (Montserrat, the body face, 26% of text), a true finding at rule level, sitewide rather than gallery-specific. The source `.astro` file scans clean (CSS is not inline). Live overlay injected at 1440 and 390 and reported the same single finding. It agrees with the generic-template read; it did not catch the imagery, CTA or focus problems below. Browser measurements: no horizontal overflow at 390/1024/1440, every tap target 44px or larger, all 59 measured text elements pass AA (lowest 5.0:1, taupe on paper), smallest text 16px, alt text on every image, 0 console errors, 0 failed requests.

## Overall Impression

A confident first viewport (navy, "Life, outside.", the dusk hero) and a clean, accessible build, carrying four images and almost no reasons to act. The biggest opportunity is not visual: the page poses as a portfolio of built projects while the images are AI-generated concepts, and it hides the company's real differentiator, the 3D design process.

## What's Working

- **The hero commits to the artifact.** Image first, dark field, one headline; the photo's blue and amber echo the navy and taupe palette. The interface recedes, as Experience mode asks.
- **The caption system is quiet and consistent.** Number, taupe category line, title, one sentence: four clear chunks that keep the images dominant.
- **The build is sound.** No overflow, 44px+ targets, AA contrast with margin, proper landmarks, descriptive alt text, no console errors.

## Priority Issues

**[P0] The images are AI-generated and the page presents them as a gallery of finished work.**
- *Why it matters:* the Kimi package's own `CREDITS.md` says these five files are "original AI-generated 3D architectural design visualizations ... conceptual visualizations, not photographs of finished Island Life projects." PRODUCT.md forbids generated pool imagery and requires the company's own 3D stills, always captioned as visualizations. The page is called "Gallery", "The complete backyard" frames four different yards as one real project, and no text says they are concepts. The previous gallery page carried "Each image is a render of a planned backyard, not a finished project"; this one dropped it. A buyer weighing a five-figure project will read these as the company's work. Alt text on 02 says "Geometric custom pool" but the image is a freeform pool with a raised spa and a waterfall wall. The same five files also drive the home, `/pools` and blog pages. Rated P0 as a ship-blocker under the project's own rules, not as a usability blocker.
- *Fix:* owner decision. Either swap in the company's own stills still in `public/media/` (`design-night-pool`, `design-grotto-pool`, `design-lounge-fire`, `design-spa-pavilion`), or keep the concept art with an honest caption on every image ("Conceptual 3D visualization, not a completed project"), rename the page framing, and correct the 02 alt text.
- *Suggested command:* `$impeccable clarify`, then `$impeccable document`.

**[P1] The decision moment is under-built, and its focus state is invisible.**
- *Why it matters:* the closing CTA and the header "Free quote" are ghost outlines, the weakest elements on the page. Measured: their keyboard focus ring is navy on a navy field (1.0:1), so keyboard users see no ring; the only focus cue is the button's light fill wash sliding in. The CTA has no phone number beside it, although PRODUCT.md asks for phone and form at equal prominence wherever a decision is asked for, and the audience is on phones. On mobile the header holds only a hamburger, so quote and phone are about seven screens away. The button label wraps to two lines at 390px (reviewer observation, not measured).
- *Fix:* make the CTA a solid off-white fill on navy; give `.button--light:focus-visible` an explicit light `outline-color` (it inherits the navy text colour); add a `tel:` link with hours beside it; add a compact quote/phone control to the mobile header; use one label ("Free design consult") everywhere. Consider one or two of the five real homepage reviews directly above the CTA.
- *Suggested command:* `$impeccable layout`, then `$impeccable harden`.

**[P1] The gallery is a dead end with a false affordance.**
- *Why it matters:* images are not links and do not enlarge, yet they zoom on hover. The categories (pools, patios, outdoor kitchens) match real site pages but link nowhere. Nothing shows the 3D process the intro claims. Four stills and no next step cap the page at "admire, then scroll".
- *Fix:* link each caption's category to its page, drop the hover zoom or add a lightbox, and add one plan-to-render pair so the differentiator is visible.
- *Suggested command:* `$impeccable shape`, then `$impeccable delight`.

**[P2] The desktop composition looks accidental.**
- *Why it matters:* at 1440 the hero image renders 1114px wide because `max-height: 58vh` binds; it stops short of the right edge and aligns with neither the intro column nor the shell, and its caption and scroll cue fall below the first viewport. The 02/03 stagger leaves a blank block of about 300px and the two end at different heights. It undercuts the premium opening.
- *Fix:* let the hero image fill the shell width and fit its caption in the first viewport; align 03's top to 02's or give them matching offsets.
- *Suggested command:* `$impeccable layout`.

**[P3] Headings break badly and read wrong to screen readers.**
- *Why it matters:* at 390px the closing heading wraps to "What does / your / island life look / like?" with orphans. Because the forced line break has no space beside it, the accessibility tree reads "One backyard.Every detail." and "What does yourisland life look like?" (the same pattern is on the home page headings).
- *Fix:* add a space before each `<br>` (visually identical), apply `text-wrap: balance`, and trim the mobile clamp.
- *Suggested command:* `$impeccable typeset`.

## Persona Red Flags

**Jordan (first-timer):** cannot tell whether these are built projects, so "Gallery" misleads. "Free design consult" and "Free quote" look like two different offers. "Explore the collection" reads as a product catalogue. The 3D claim has no visual to explain it.

**Casey (distracted, mobile):** the header offers no quote or phone, only the hamburger. The hero image fills the first screen with its caption below it. The only CTA is at the very end, wraps awkwardly and has no phone beside it; the number lives in the footer.

**Riley (stress tester):** clicks an image and nothing happens despite the hover zoom. With images off, alt text states finished features as fact. Alt text and image disagree on 02. Tabbing to "Free quote" or the closing button shows no focus ring. The current-page state in the nav is invisible.

**Houston homeowner (Tomball/Cypress):** looking for "have they built something like my yard?" and finds no local project, review or hours, and nothing separating what is built from what is rendered. Estate-scale scenes may feel out of reach.

## Minor Observations

- The white logo plate on the navy hero reads as a pasted sticker; it is the first thing the eye lands on in the header.
- The hero label, the h1 and the nav item all say "gallery"; the category line repeats the caption and alt text. Cut one layer.
- Footer lists "Journal"; the header nav does not.
- No skip link: the first Tab stops are the logo and six nav links.
- Under reduced motion the 1.025 hover zoom still applies (it snaps instead of easing).
- Images total about 1.4 MB with no srcset; the 2048px hero is served to a 350px-wide phone layout.
- Body face Montserrat is the generic half of an otherwise distinctive Michroma pairing; keep the taupe text no lighter than it is (5.0:1).

## Questions to Consider

- If every image here is a render, why does the page hide the one thing competitors cannot show, the 3D design process, and pose as a photo gallery?
- What would this page look like if it ended with "Here is your yard, drawn before we dig" (plan, render, quote) instead of four mood images?
- Does a five-image page deserve its own nav slot, or should it become a section of the pools and 3D story?
