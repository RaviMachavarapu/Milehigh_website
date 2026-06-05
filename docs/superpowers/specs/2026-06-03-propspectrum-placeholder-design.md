# PropSpectrum → "Coming Soon" Placeholder

**Date:** 2026-06-03
**Status:** Approved

## Goal

Ship the Mile High AI Labs main site (home + 3 service pages, already built and
staying as-is) with PropSpectrum reduced to a single branded **"Coming Soon"**
placeholder at `/propspectrum`. No links to any PropSpectrum sub-page. The fully
built PropSpectrum pages are preserved (not deleted) so they can be switched back
on later.

## Scope

In scope: PropSpectrum placeholder + neutralizing every PropSpectrum reference on
the main site.

Out of scope: home + 3 service pages (unchanged), the PropSpectrum build pipeline
scripts (not run; left intact for later re-enable).

## Changes

1. **Placeholder page** — Replace `public/propspectrum/index.html` with a
   self-contained, Deep-Authority-styled "Coming Soon" page: MHAL logo,
   "PropSpectrum is coming soon" headline, one line of copy, a
   "← Back to Mile High AI Labs" link (`/`), and the Cal.com CTA
   (`https://cal.com/milehighailabs/15min`). Inline CSS — no dependency on the
   PropSpectrum Tailwind build.

2. **Preserve real sub-pages** — Move `public/propspectrum/{propai,propleads,
   propoptics,propreach}` to `propspectrum-prebuilt/` at repo root (git-tracked).
   Stops them deploying / being reachable by direct URL without losing them.

3. **Homepage "PropSpectrum Suite" section** (`src/pages/index.astro`) — Keep
   heading + intro. Convert the 4 product cards from `<a>` to non-clickable cards
   (PropAI/PropLeads/PropOptics/PropReach names + taglines retained as a teaser)
   with a small "Coming soon" pill. Keep the single bottom CTA → `/propspectrum`.

4. **Neutralize scattered links:**
   - `src/data/site.ts`: `propspectrum` → `/propspectrum` (internal); drop the
     per-product `href`s from `propProducts`.
   - `src/components/HeroCarousel.astro`: PropSpectrum slide → `/propspectrum`.
   - `src/components/Footer.astro`: PropSpectrum link → `/propspectrum`
     (internal, same tab).

5. **Sitemap** (`astro.config.mjs`) — reduce `customPages` to just
   `https://www.milehighlabs.ai/propspectrum`.

6. **CLAUDE.md** — note PropSpectrum is currently a placeholder + how to re-enable
   (move `propspectrum-prebuilt/*` back into `public/propspectrum/`, restore links
   + sitemap entries).

## Re-enable later

Move `propspectrum-prebuilt/*` back into `public/propspectrum/`, restore the
sub-page links (homepage cards, `site.ts` hrefs), and re-add the 6 sub-routes to
`astro.config.mjs` `customPages`.

## Verification

`npm run build` succeeds; `/propspectrum` renders the placeholder; no main-site
link points to a PropSpectrum sub-page; sitemap lists only `/propspectrum`.
