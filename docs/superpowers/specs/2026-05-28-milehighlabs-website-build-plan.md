# Mile High AI Labs Website — Build Plan (ordered steps)

Companion to `2026-05-28-milehighlabs-website-design.md`. This is the step-by-step
list of what to do, in order.

## Content & SEO source-file mapping

| File | Use |
|---|---|
| `mhal_brand_white_paper v2.md` | **Primary** — confirmed visible copy, section order, nav, footer, design system, testimonials. |
| `about_otherservices.docx.md` | **SEO/AEO/sitemap source** for the three pillar sections (Lead Gen & CRM, Marketing & Growth, AI Workflows). Also fills AI Workflows content (undocumented in WP v2). Sub-service detail + conversion stats → meta, FAQ (AEO), JSON-LD `Service`. |
| `propspectrum_brand_white_paper_v5.md` | **SEO/AEO/sitemap source** for the PropSpectrum suite section. PropSpectrum is a SEPARATE app — MHAL site links out to its landing page. Mine product one-liners, descriptions, keywords. ⚠️ Domain: confirm `propspectrum.ai` vs `realpropspectrum.com` before linking. |

`DESIGN.md` = visual tokens only (ignore its "Boutique Authority" label → we call it "Deep Authority").

## Phase 0 — Setup
1. Confirm Node 22 / npm. ✅
2. Scaffold Astro 5 (minimal/empty template) in repo root.
3. Add Tailwind v4 (`@tailwindcss/vite`), `@astrojs/sitemap`.
4. `astro.config.mjs`: `site: 'https://www.milehighlabs.ai'`, static output, sitemap integration.
5. Global CSS: Tailwind import + design tokens (`@theme`), Google Fonts (Instrument Serif + Inter), base styles, card hover, section spacing.

## Phase 1 — Shared layout & components
6. `BaseLayout.astro` + `SEO.astro` (title/description/canonical/OG/Twitter + JSON-LD slot).
7. `Navbar.astro` — sticky, transparent→Midnight Navy + blur on scroll; Services links, "Book a Free Audit" terracotta CTA, contact link. Mobile menu.
8. `Footer.astro` — 4 columns (brand/tagline, services, company, connect) + address + Cal.com + email + socials. On every page.
9. Primitives: `Button`, `Card`, `HITLBadge`, `Section`, `StatBar`, `ProcessTimeline`, `ComparisonTable`, `TestimonialCard`, `FAQ`.

## Phase 2 — Home page (`/`)
10. Hero (display-lg, terracotta "High-Performance" accent, 2 CTAs, dark dashboard mock).
11. Stat bar (42k / 1.2M+ / 24/7).
12. Our Managed Excellence — 3 pillar cards → service pages, HITL badge each.
13. The PropSpectrum Suite — 4 product cards (PropAI/PropLeads/PropOptics/PropReach) → link out to PropSpectrum landing.
14. About section (folded in) — what MHAL is, the studio analogy, Denver grounding.
15. HITL navy anchor — "AI isn't the final word. You are." + 2 inline testimonials (natural-sounding).
16. Our Deployment Lifecycle — 6-step timeline, Review step terracotta.
17. Voice of the Partners — 2-up testimonials (natural-sounding).
18. Strategic Partner · Apps Consultants.
19. Closing CTA — italic "Ready to scale your intelligence?" + 2 CTAs.

## Phase 3 — Service pages
20. `/services/lead-gen-crm` — hero, HITL 3-step, "Not all outreach is created equal." comparison, Day 30 Promise (42% / −18h / Zero-Ghosting / 12.5×), FAQ, closing testimonial "...transformed our lead flow in 3 weeks."
21. `/services/marketing-growth` — hero, Managed Content Engine 4-step, Traditional Agency comparison, Day 30 Outcomes (4.2× / 100% HITL), FAQ, closing testimonial (WP §15).
22. `/services/ai-workflows` — hero, HITL 3-step, comparison, Day 30 outcomes, FAQ, closing testimonial. Content from `about_otherservices` Service 1 (5-min/21× stat, sub-services).

## Phase 4 — SEO / AEO / sitemap (after pages exist)
23. Per-page `<SEO>` titles/descriptions/keywords mined from the source files.
24. JSON-LD: `Organization` (Centennial CO address, sameAs socials), `Service` per pillar, `FAQPage` per page, `BreadcrumbList`.
25. AEO: FAQ sections (Q&A) per page from source-file stats/sub-services; `llms.txt`.
26. `robots.txt` (allow all + sitemap ref + welcome AI crawlers); confirm `@astrojs/sitemap` output.
27. PropSpectrum SEO/AEO/sitemap entries from `propspectrum_v5` (after domain confirmed).
28. OG image + favicon (mountain-peak wordmark mark, no brain/circuit clichés).

## Phase 5 — Deploy prep & verify
29. `DEPLOYMENT.md` — S3 + CloudFront sync steps.
30. `npm run build` → fix errors → verify `dist/` (HTML rendered, sitemap, robots, llms present).
31. Spot-check pages in `npm run preview`.

## Reminders
- NEVER the word "boutique". Brand name exactly "Mile High AI Labs".
- No fabricated stats; sample testimonials must read human.
- Don't commit/push unless asked.
