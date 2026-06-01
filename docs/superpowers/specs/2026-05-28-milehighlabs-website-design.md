# Mile High AI Labs Website — Design Spec

**Date:** 2026-05-28
**Owner:** Ravi
**Source of truth for content:** `mhal_brand_white_paper v2.md` (WP)
**Source of truth for visuals:** `stitch_milehigh_ai_labs_hub/.../boutique_authority/DESIGN.md` (Deep Authority design system) + stitch screen mockups

## 1. Goal

Build a new, SEO- and AEO-optimized marketing website for Mile High AI Labs at
`https://www.milehighlabs.ai`, faithful to the confirmed "Deep Authority" design
system and the brand white paper. Static output, deployable to AWS serverless
static hosting (S3 + CloudFront). Brand-new SEO/AEO tags and sitemap — none of the
previous site's metadata is reused.

## 2. Stack

- **Astro 5** with `output: 'static'` → builds plain HTML/CSS/JS in `dist/`.
- **Tailwind CSS v4** (via `@tailwindcss/vite`), design tokens wired into the theme.
- **@astrojs/sitemap** for `sitemap-index.xml`.
- React islands only if interactivity demands it (sticky-nav scroll state can be
  done with a tiny inline script; no React needed for v1).
- Google Fonts: Instrument Serif (display, italic for emotional lines) + Inter (body).

Rationale: static HTML is ideal for SEO/AEO (crawlers/answer-engines read content
directly), ships near-zero JS (fast LCP), and deploys to S3 + CloudFront with no
servers — the cheapest "serverless" hosting.

## 3. Design tokens (from DESIGN.md / WP §08)

- Colors: Midnight Navy `#1C2B3A`, Warm White `#F5F2ED`, Terracotta `#E8A87C`,
  Deep Forest `#1A3028`, Amber Gold `#C9A84C`, Pure White `#FFFFFF`.
- Type: Instrument Serif (display/headings), Inter (body/labels). Scale per WP §08.
- Radii: buttons 8px, cards 16px, badges pill. Container max 1280px. Section gap 120px
  desktop. Card hover: `0 4px 20px rgba(28,43,58,0.05)`, 1px subtle border default.
- Light mode default; Midnight Navy full-bleed sections break scroll rhythm.

## 4. Pages & routing

| Route | Content (source) |
|---|---|
| `/` | Hero, stat bar, "Our Managed Excellence" (3 pillars), "The PropSpectrum Suite" (4 products), **About section** (folded in, WP §01/§02), HITL navy anchor "AI isn't the final word. You are." (+2 inline testimonials), "Our Deployment Lifecycle" 6-step timeline (Review highlighted terracotta), "Voice of the Partners" 2-up testimonials, "Strategic Partner · Apps Consultants", closing CTA "Ready to scale your intelligence?" |
| `/services/lead-gen-crm` | Hero, HITL 3-step (Discovery → HITL Audit[terracotta] → Deployment), "Not all outreach is created equal." comparison table, "The Day 30 Promise" (42% / −18h / Zero-Ghosting / 12.5×), closing testimonial "Mile High AI Labs transformed our lead flow in 3 weeks." |
| `/services/marketing-growth` | Hero, "The Managed Content Engine" 4-step (Strategy → Implementation → Review[terracotta] → Analytics), "Traditional Agency vs. Mile High AI Labs" comparison, "Day 30 Outcomes" (4.2× ROI / 100% HITL-reviewed / +metrics), closing testimonial (WP §15). |
| `/services/ai-workflows` | Screen unavailable; built to match sibling pattern from WP §06 Pillar 3: hero, HITL 3-step, comparison ("Manual ops vs. Mile High AI Labs"), Day 30 outcomes (hours reclaimed, response time, reliability), closing testimonial. Honest copy from pillar definition. |

About is a homepage section, not a route. Real-estate visitors routed to
`propspectrum.ai` from the PropSpectrum Suite section.

## 5. Shared components

`Navbar` (transparent on hero → solid Midnight Navy + backdrop blur on scroll, sticky;
links: Services dropdown/anchors + "Book a Free Audit" terracotta CTA + contact),
`Footer` (4 columns per WP §07.10 + address + socials + Cal.com + email),
`Button` (primary terracotta / secondary navy-outline / dark variant),
`Card`, `HITLBadge` (terracotta checkmark — non-optional on service cards),
`StatBar`, `TestimonialCard`, `ProcessTimeline` (Review step terracotta),
`ComparisonTable`, `FAQ`, `BaseHead`/`SEO` (meta + JSON-LD), `Section` wrapper.

## 6. CTAs & contact (every page, nav + footer)

- "Book a Free Audit" / consultation → `https://cal.com/milehighailabs/15min`
- "Contact Strategy Team" / sales → `mailto:sales@milehighlabs.ai`
- Address: 6909 S Holly Cir STE 350, Centennial, CO 80112
- Socials: LinkedIn, Facebook, YouTube (from project records), Instagram (WP footer).

## 7. SEO + AEO (brand-new)

- `<SEO>` per page: unique title/description, canonical absolute URL, OG + Twitter cards.
- JSON-LD: `Organization` (name, url, logo, address, sameAs socials), `Service` per
  pillar, `FAQPage` per page, `BreadcrumbList`.
- AEO: concise FAQ section per page (answer-engine-friendly Q&A), semantic HTML,
  `/llms.txt` summarizing company + services for AI crawlers.
- `@astrojs/sitemap` → `sitemap-index.xml`; hand-written `robots.txt` (allow all,
  reference sitemap, welcome reputable AI crawlers).

## 8. Deployment

Static `dist/` → S3 + CloudFront. Add a short `DEPLOYMENT.md` with build + sync
guidance. Use relative/absolute-from-root asset paths that work behind CloudFront.

## 9. Content / voice rules ("human, not AI-generated")

- Use confirmed WP copy verbatim where given. Specific numbers, named processes.
- Instrument Serif **italic** for emotional lines (hero accent, testimonials, closing CTA).
- Colorado/Denver-grounded voice. Varied section rhythm. No orbs/neon/circuit-board
  imagery, no generic "unlock the power of AI" filler, no emoji spam.
- **Banned word: "boutique."** The brand is NOT boutique-related. Never use
  "boutique", "boutique firm", or "boutique authority" anywhere — copy, code,
  comments, class names, file names, or metadata. The design system is named
  **"Deep Authority"** (the stitch `DESIGN.md` label "Boutique Authority" is the
  generator's internal name only and must be ignored).

## 10. Decisions on unconfirmed content (per user)

- Stats bar uses WP §15 confirmed values: 42k Automation Workflows, 1.2M+ Leads
  Processed, 24/7 Operations Running.
- Testimonials: write natural-sounding sample testimonials (homepage + AI Workflows)
  that read human and credible, to be replaced with real ones before launch. Confirmed
  pillar quotes (Lead Gen, Marketing) used verbatim.

## 11. Out of scope (v1)

Pricing, blog, case studies, separate About/How-It-Works/Contact routes, CMS, backend
forms, PropSpectrum product pages (link out to propspectrum.ai).
