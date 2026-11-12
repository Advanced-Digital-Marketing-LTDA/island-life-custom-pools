---
target: the homepage
total_score: 23
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 6
timestamp: 2026-11-12T00-12-12Z
slug: src-pages-index-astro
---
Method: dual-agent (A: four isolated design reviewers: rubric, mobile personas, access/edge personas, visual craft · B: detector + overlay completed; measurement and runtime collectors stopped early at the user's request)

## Design Health Score: 23/32 (72%, Good). 7 and 10 n/a. Previous run 22/32.
1 Status 3 (rail keeps "04 Fire" current through Process-Recent) · 2 Match 3 (Plunge/Lounge vs Pools/Patios) · 3 Control 3 · 4 Consistency 3 · 5 Error prevention 3 · 6 Recognition 3 · 8 Minimalist 2 (repetition, six ambient systems) · 9 Recovery 3 (failure phone not a tel: link).

## Priority issues
- [P1] Hero is dark on phones (66% veil on top of three gradients); video unreadable. -> bolder/adapt
- [P1] WebGL sunlight layer: field range 0.35-0.65 vs smoothstep(0.5,0.88) gives ~0.11 peak alpha at 0.5 opacity: effectively invisible (A4 measured; A3 measured it lowering headline contrast at the right end: DISPUTED, unresolved). -> animate
- [P1] "Request a free quote" on phones lands on hours/area chips; form is ~700px below the first screen. -> layout
- [P1] 33 of 82 links point to pages that do not exist (all inner pages 404). -> harden
- [P1] A11y: mobile bar covers focused elements (WCAG 2.4.11) and stays tabbable when hidden; hero pause stops the video but not the WebGL layer or steam (WCAG 2.2.2). -> harden
- [P1] "Free design consult" / "free quote" / "3D design" are three names for one ask; unexplained. Proof is unverifiable (first names only, owner Tim never shown). -> clarify
- [P2] Three screens of teal text before the first photo (Design3D + Paths + circuit head). -> layout
- [P2] Rooms bury photos under strips; twelve identical plaques flatten hierarchy; Recent shows no work; repeated claims; partner chips mix equipment and lender. -> distill
- [P2] Glow accent reads as a stain on stone sections; seams between .tiled glows. -> colorize/polish
- [P2] Quote form: interest has no Fire/not sure; client accepts input the server rejects; fieldset error leaves focus stuck. -> harden/clarify
- [P2] Menu hides Call/Quote below the fold on phones; font swap shifts hero CTAs on slow links (h1 max-width in ch). -> adapt/typeset
- [P2] 9.4 MB walkthrough with no phone version; proof/quote backgrounds lack srcset. -> optimize

## Detector (B1)
Default CLI: 2 advisory design-system-color findings (#000 at global.css:491,494); with --no-config: clean. Overlay: 16 desktop / 31 mobile, nearly all false positives (a.brand, body shadow, hidden wayfinder, chip padding). Judgment calls: p.q line-height 1.15, span.kind sky, waterline gradient, steam spotlight.

## Not verified
Measurement battery and runtime health collectors were stopped before reporting: the sunlight-layer dispute, #quote landing position, wayfinder state and mobile-bar obstruction are reviewer claims, not independently measured.
