---
target: the homepage
total_score: 22
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 1
timestamp: 2026-11-11T22-51-21Z
slug: src-pages-index-astro
---
Method: dual-agent (A: design review · B: detector + browser evidence)

## Design Health Score: 22/32 (69%, Acceptable). Heuristics 7 and 10 n/a (Persuade surface).

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Rail only at 64em+; form success is a faint line after reset |
| 2 | Match System / Real World | 3 | Plunge/Lounge vs Pools/Patios vs Custom pools |
| 3 | User Control and Freedom | 3 | Gallery tiles look clickable but are inert |
| 4 | Consistency and Standards | 3 | Numerals mean rooms 01-04 and build steps 01-05; rail 05 is the quote |
| 5 | Error Prevention | 2 | Email AND phone required plus preferred method; interest lacks Fire / not sure |
| 6 | Recognition Rather Than Recall | 3 | Rail dots unlabeled below 100em |
| 7 | Flexibility and Efficiency | n/a | Persuade surface |
| 8 | Aesthetic and Minimalist Design | 2 | Five nav devices; four 100svh rooms carry four sentences; repeated claims |
| 9 | Error Recovery | 3 | Failure message phone number is not a tel: link |
| 10 | Help and Documentation | n/a | Marketing page |

## Design Specificity Verdict
Partly specific. Content and IA are the builder's own (four rooms = real service lines; 3D flythrough hero). The chrome is a generic premium-spa template. Room copy is legacy-generic.
Deterministic scan: CLI 0 findings; overlay 13 desktop / 28 mobile, nearly all false positives (a.brand, body text-shadow, .chip-plain, li padding, hidden mobile wayfinder, dark "glow"). True positive: p.q line-height 1.15 on a 4-5 line display quote. Judgment call: span.kind sky on lagoon (5.56:1, a brand token).

## Priority Issues
- [P1] Quote form works against its goal (Quote.astro): both email and phone required, interest cannot express Fire/not sure, faint success line, no reassurance at the button. -> harden
- [P2] Photography buried, mood contradicts brand: veils on rooms 38% + gradient, proof 76%, quote 84%, four hero scrims. -> bolder, colorize
- [P2] Long and repetitive: four identical 100svh rooms, .room-nav repeats hero route, claims repeated, Paths at ~52% scroll. -> distill, layout
- [P2] Circuit wayfinding is the best idea and least legible: numeral clash, hidden rail labels, no mobile rail, three nav landmarks repeating links. -> clarify
- [P2] Financing/Proof conflate: equipment brands as financing partners, Google Guaranteed as plain plaque, Recent work shows no images. -> layout

## Persona Red Flags
Jordan: Plunge not labeled pools; free design consult undefined. Riley: any 5-digit zip accepted; failure phone not tappable; inert gallery tiles. Casey: fixed bar covers lower form and offers Free quote inside #quote; no trust signal in first screen. Dana (builder-vetting shopper): owner-led Tim never appears; reviews have no source; Recent work shows none.

## Minor Observations
Table room orphan tile; hero trust row three different shapes; all h2s share the display scale; Plan my upgrade does not prefill interest.

## Questions to Consider
Why never pair the 3D model beside the pool it became? Is 3,600px of scroll the circuit or padding? What does this look like at 2pm in July?
