# PropSpectrum Integration — Design Spec

**Date:** 2026-06-01
**Status:** Awaiting user review

## 1. Goal

Bring the PropSpectrum product pages (delivered as standalone HTML mockups in
`PropSpectrum-main/`) into the Mile High AI Labs website as real, navigable pages,
and wire them to the existing homepage. The result must be:

- **Static & serverless** — pure files served from S3 + CloudFront (no runtime backend, no external runtime JS dependency).
- **Visually one continuous brand** with MHAL — same Deep Authority colors (already shared) **and** the same typography (Instrument Serif + Inter).
- **Every button working** — no dead links, no hotlinked/broken images.
- **Professional / human-built** — no AI-filler, no obviously-generated artifacts (e.g. dev-only CDN warnings, placeholder links).

## 2. Source of truth

Use the **v2** version of every page (newest, fully cross-linked). The canonical
source files live under `PropSpectrum-main/PropSpectrum-main/`:

| Page | Source file | New route |
|---|---|---|
| PropSpectrum home | `propspectrum_homepage/code v2.html` | `/propspectrum` |
| PropAI | `propai_automation_workflow/code v2.html` | `/propspectrum/propai` |
| PropLeads | `propleads_lead_gen_crm/code v2.html` | `/propspectrum/propleads` |
| PropOptics | `propoptics_visual_ai_staging/code v2.html` | `/propspectrum/propoptics` |
| PropOptics portfolio | `propoptics_visual_ai_staging/propoptics_portfolio.html` | `/propspectrum/propoptics/portfolio` |
| PropOptics design studio | `propoptics_visual_ai_staging/design-studio.html` | `/propspectrum/propoptics/design-studio` |
| PropReach | `propreach_marketing_growth/code v2.html` | `/propspectrum/propreach` |

`design-studio.html` is currently orphaned in the source; we will include it and
add a link to it from the PropOptics page (per decision).

Ignore the `code.html` / `code v1.html` older versions and the internal
`Claude Code/PropSpectrum/` working directory (brand white papers, SEO scripts,
`PropSpec V2` duplicate, stitch wireframes) — reference only, not shipped.

## 3. Approach: static passthrough under `public/`

Place the cleaned-up pages as static HTML under `public/propspectrum/` using
folder/`index.html` so Astro copies them verbatim to `dist/` and CloudFront serves
clean URLs:

```
public/propspectrum/index.html                      -> /propspectrum
public/propspectrum/propai/index.html                -> /propspectrum/propai
public/propspectrum/propleads/index.html             -> /propspectrum/propleads
public/propspectrum/propoptics/index.html            -> /propspectrum/propoptics
public/propspectrum/propoptics/portfolio/index.html  -> /propspectrum/propoptics/portfolio
public/propspectrum/propoptics/design-studio/index.html -> /propspectrum/propoptics/design-studio
public/propspectrum/propreach/index.html             -> /propspectrum/propreach
public/images/propspectrum/...                       -> localized images + CSS
```

**Why static passthrough (not .astro rebuild):** the v2 mockups are large, polished,
and fully on-brand. Rebuilding them as Astro components risks visual drift and lost
detail for no functional gain. Keeping them as faithful HTML, edited only where
required, is lower-risk and equally static/serverless. The user also chose to keep
PropSpectrum's own product sub-nav, so reusing the MHAL Astro `Navbar`/`Footer`
components is not required.

## 4. Per-page transformations (applied to every ported page)

1. **Typography → MHAL.** Replace the Google Fonts link (`Plus Jakarta Sans` + `DM Sans`)
   with **Instrument Serif** (headings) + **Inter** (body). Update the inline
   `tailwind`-style `fontFamily` config and the `body { font-family }` rule so
   `font-serif` → Instrument Serif and `font-sans` → Inter. Material Symbols icon
   font stays (it is iconography, not body type).
2. **Self-contained CSS (remove CDN).** Replace the dev-only `cdn.tailwindcss.com`
   `<script>` (which logs a "should not be used in production" warning and is a
   runtime external dependency) with a **precompiled Tailwind v4 stylesheet** at
   `/images/propspectrum/propspectrum.css`. The stylesheet is generated once from
   the PropSpectrum HTML content with a small Tailwind v4 input file that declares
   the custom color tokens (`midnight`, `warm-white`, `terracotta`, `deep-forest`,
   `amber-gold`, `steel-blue`) and the MHAL font families. All pages `<link>` this
   one file. Per-page inline `<style>` blocks (keyframes, badges, faq, mockup cards)
   are preserved.
3. **CTAs → MHAL booking.** Every `calendly.com/propspectrum/audit` (and any other
   booking link) → `https://cal.com/milehighailabs/15min`.
4. **Internal links → clean routes.** Rewrite all `../<product>/code v2.html`,
   `code v2.html`, `propoptics_portfolio.html`, `design-studio.html`, and anchor
   links to the new clean routes in §2. In-page `#anchors` are preserved.
5. **Images localized.** Download all hotlinked `images.unsplash.com` photos and copy
   the existing local PropOptics `images/` and `portfolio-images/` assets into
   `public/images/propspectrum/...`; repoint every `src`/`background` accordingly.
   No runtime hotlinking (required for S3/CloudFront; matches the hero-carousel rule).
6. **Anonymize brokerages.** Replace the named-real-brokerage trust ticker
   (Sotheby's, RE/MAX, Compass, Coldwell, Kentwood, etc.) with neutral trust copy
   (e.g. "Trusted by Denver-metro agents and teams"). **Pricing tiers kept as-is.**
7. **Footer alignment.** Keep PropSpectrum's footer layout but point its booking/email/
   social links at MHAL's (`cal.com/milehighailabs/15min`, `sales@milehighlabs.ai`,
   the MHAL socials) and add a "Mile High AI Labs" link back to `/`.
8. **Back-to-MHAL link** in the PropSpectrum top nav so the two sites feel joined.

## 5. Wiring back into the MHAL site

- **`src/data/site.ts`** — add an `href` to each entry in `propProducts`:
  PropAI→`/propspectrum/propai`, PropLeads→`/propspectrum/propleads`,
  PropOptics→`/propspectrum/propoptics`, PropReach→`/propspectrum/propreach`.
  (Order already matches the homepage cards.)
- **`src/pages/index.astro`** — the 4 cards in "The PropSpectrum Suite" link to
  `p.href` (internal, same-tab) instead of all pointing to external `site.propspectrum`.
  Card label changes "Visit PropSpectrum →" → "Explore {name} →".
- **`src/data/site.ts` navLinks + `Navbar.astro`** — the "PropSpectrum" nav item →
  `/propspectrum` (internal), drop the `external`/`target=_blank` treatment.
- **`site.propspectrum`** value: keep the constant but it is no longer the link target
  for cards/nav (left in place for any external reference / JSON-LD).

## 6. SEO / sitemap

- Astro's `@astrojs/sitemap` only lists built Astro routes, not `public/` static files.
  Add the 7 PropSpectrum URLs via the sitemap integration's `customPages` option in
  `astro.config.mjs` so they appear in `sitemap-index.xml`.
- The source folder's own `robots.txt` / `sitemap.xml` are **not** used; the MHAL
  site's existing `public/robots.txt` already allows everything.
- Keep each page's existing `<title>`/meta; ensure canonical URLs use
  `https://www.milehighlabs.ai/propspectrum/...`.

## 7. Out of scope

- No rebuild of pages as Astro components; no CMS; no backend.
- No change to MHAL service pages or existing homepage sections beyond the PropSpectrum
  card/nav wiring.
- The internal `Claude Code/PropSpectrum/` working directory is not shipped.

## 8. Verification (done before claiming complete)

- `npm run build` succeeds; `dist/propspectrum/...` contains all 7 pages.
- `npm run preview` (or dev) — manually load every route; confirm:
  - fonts render as Instrument Serif + Inter,
  - no `cdn.tailwindcss.com` request and no console CDN warning,
  - every nav link, product cross-link, CTA, and portfolio anchor resolves (no 404),
  - all images load locally (no `images.unsplash.com` requests),
  - the MHAL homepage's 4 cards + nav now route to the internal pages.
- Grep the built output for leftover `calendly.com`, `code v2.html`, `unsplash.com`,
  and named brokerages → expect zero.
