# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro (static output) served by the Node standalone adapter, with TinaCMS editing JSON content in Git. Custom code, no WordPress/Elementor. Deployed as a Docker image through Coolify on Contabo (see `README.md`).

## Users

Houston-area homeowners (Tomball, Cypress, The Woodlands, Houston) researching a pool builder on a phone or laptop. Two audiences with equal weight: first-pool buyers who need to be walked through the whole process, and backyard upgraders adding a pool, patio cover, outdoor kitchen, or pickleball court to a yard they already use.

## Product Purpose

Island Life Custom Pools designs and builds custom pools, patios, and outdoor kitchens. The site exists to get a homeowner to request a free quote or call. Both count equally as success.

## Positioning

The company models the pool and outdoor space in 3D so the homeowner sees the design before it is built. Owner-led (Tim), Google Guaranteed, with communication clients repeatedly name in reviews.

## Operating Context

Free design consult, then 3D design, excavation, structure, start-up. Hours Mon–Fri 8am–7pm, Sat 8am–12pm, Sunday closed. Phones: (832) 304-4092 and (281) 305-8711, both active. Discount for military, first responders, and teachers. Financing through partners. Hayward equipment page, gallery, blog, financing, about, contact pages exist on the current site.

## Capabilities and Constraints

Quote form fields: name, email, phone, preferred contact method (email or phone), zip code, interest (pool, patio, outdoor kitchen), message. Current site: WordPress + NitroPack, built by Kreative Media. Both phone numbers are active ((832) 304-4092 in the site footer, (281) 305-8711 in Instagram captions and on the patios page). Decided: the site shows (832) 304-4092 everywhere; (281) 305-8711 stays active but is not shown. Quote leads are emailed through Proton Mail SMTP, which the owner already uses in other projects (so the plan supports it). The form posts to `/api/quote` (`src/pages/api/quote.ts`, server-rendered), which validates, rate-limits (3 per IP and 30 total per hour, because the Proton account is shared) and sends. SMTP credentials and the receiving address are Coolify runtime variables (`SMTP_USER`, `SMTP_TOKEN`, `LEAD_TO`), never browser code. A failed send shows the visitor an error with the phone number, so a request is never silently dropped. Not yet done: the Coolify variables are not set, no real send has been tested against Proton, and a dedicated SMTP token for this site is recommended but not created. The site should not launch until a real lead email has arrived. Not yet decided: what the visitor sees after a successful submit beyond "Thanks. We'll reach out by <method>."

## Brand Commitments

Keep: name "Island Life Custom Pools", logo, "Bring Your Vacation Dreams Home!", "Fast Service. Fair Pricing.", "Experience the Island Life", island/vacation voice, existing nav and page structure. The logo file is `public/images/island-life-logo.svg` (white background: the header and footer both blend it with multiply on a light stone plate). Brand colors are sampled from it: navy #010031, blue #0c75b6, sky #75b5d2, glow #fdeeb4. The action color is near-black (dark pills on light, off-white on dark); navy, water blue and sun yellow stay as primitives in `src/styles/brand.css`. The header and footer show the logo on a light plate (multiply blend on the light header).

## Evidence on Hand

Five real client reviews on the homepage (Sam M., Jasmine H., Annette, Dee G., Jeff L.). Google Guaranteed status. A 3D design software video. Eight Instagram posts (patio covers, pickleball, work in progress, night swim, Lake Conroe lakefront, Houston Galleria commercial project). The site imagery is the company’s own project photography, supplied by the owner from its marketing library in November 2026 (file names and camera metadata are not published), plus the hero video. The earlier AI-generated 3D concept images were removed. A photo is only described as what it shows, and 3D design visuals appear only if they are the company’s own and are captioned as visualizations. The set of project photos copied from the old site earlier was removed because their ownership was never confirmed (it remains in git history; `originals/` stays local and untracked). Hayward equipment shots, partner logos, and the Google Guaranteed badge were deliberately left out (third-party assets). Do not fabricate photography, generated pool imagery, ratings, review counts, prices, or timelines.

## Product Principles

- Show real finished work, not stock photography, and show the design process where it explains how the project starts: the homeowner should see their backyard before it exists.
- Phone and quote form get equal prominence everywhere a decision is asked for.
- Serve first-pool buyers and upgraders with the same page, no audience split in the nav.
- Only claim what the current site or its reviews already say.

## Accessibility & Inclusion

WCAG 2.2 AA target; mobile-first (homeowners browse on phones); respect reduced motion.
