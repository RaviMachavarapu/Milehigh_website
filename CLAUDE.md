# CLAUDE.md — Mile High AI Labs Website

Guidance for Claude Code when working in this repository.

## What this is

The marketing website for **Mile High AI Labs** (`https://www.milehighlabs.ai`).
A static, SEO/AEO-optimized site built with **Astro + Tailwind CSS v4**, deployed
to **AWS serverless static hosting (S3 + CloudFront)**.

- **Brand source of truth (visible content):** `mhal_brand_white_paper v2.md` (referred to as WP).
- **Visual source of truth:** `stitch_milehigh_ai_labs_hub/.../boutique_authority/DESIGN.md`
  (Deep Authority design tokens) + the stitch screen mockups in that folder.
- **Design spec for this build:** `docs/superpowers/specs/2026-05-28-milehighlabs-website-design.md`.
- **Build plan (ordered steps):** `docs/superpowers/specs/2026-05-28-milehighlabs-website-build-plan.md`.

### SEO / AEO / sitemap source files (use ONLY for SEO/AEO/sitemap, applied after the build)

- `about_otherservices.docx.md` → the three pillar sections (Lead Gen & CRM,
  Marketing & Growth, AI Workflows). Also fills AI Workflows content gap. Provides
  sub-services + conversion stats for meta, FAQ (AEO), and JSON-LD `Service`.
- `propspectrum_brand_white_paper_v5.md` → the PropSpectrum suite section. PropSpectrum
  is a SEPARATE app the MHAL site links out to. Mine product one-liners/keywords.
  ⚠️ Confirm link domain: `propspectrum.ai` vs `realpropspectrum.com` (line 445) before linking.

## ⛔ Hard brand rules

- **NEVER use the word "boutique"** anywhere — copy, code, comments, class names,
  file names, or metadata. The brand is NOT boutique-related. The stitch design file
  is internally labeled "Boutique Authority", but our design system is named
  **"Deep Authority"**. Ignore the stitch label.
- **Brand name is exactly "Mile High AI Labs"** — never "MHAL" in client-facing
  copy, never "Mile High" alone, never "AI Labs" alone. ("MHAL" is internal-only.)
- **Do not fabricate stats or real client identities.** Stats use the WP §15
  confirmed values. Sample testimonials are allowed but must read naturally (human,
  not AI-generated) and be replaced with real ones before launch.
- No "unlock the power of AI" filler, no orbs/neon/circuit-board imagery, no emoji spam.

## Company facts

- **Company:** Mile High AI Labs — SMB/medium-business AI solutions (Denver, CO).
- **Address:** 6909 S Holly Cir STE 350, Centennial, CO 80112.
- **Booking / consultation (all CTAs):** `https://cal.com/milehighailabs/15min`
- **Sales email:** `sales@milehighlabs.ai`
- **Socials:** LinkedIn, Facebook, YouTube, Instagram.
- **Sister company:** Apps Consultants (enterprise; appsconsultants.com) — referral peer.
- **Real-estate wing:** PropSpectrum (propspectrum.ai) — PropAI · PropLeads · PropOptics · PropReach.

## Service pillars (client-facing labels)

1. **Lead Gen & CRM** (internal: Lead Generation) — `/services/lead-gen-crm`
2. **Marketing & Growth** (internal: Marketing) — `/services/marketing-growth`
3. **AI Workflows** (internal: AI and Automation) — `/services/ai-workflows`

Differentiator: a canonical delivery process with **Human-in-the-Loop (HITL)** review.
Client-facing process name: **"Our Deployment Lifecycle"** (6 steps: Diagnose, Select,
Configure, **Review/HITL** [always terracotta], Deploy, Maintain). On pillar pages a
condensed 3-step version: Discovery → **Human In The Loop Audit** (terracotta) → Deployment.
HITL homepage anchor headline: *"AI isn't the final word. You are."*

## Design system — "Deep Authority"

| Token | Hex | Role |
|---|---|---|
| Midnight Navy | `#1C2B3A` | Headlines, dark sections, nav |
| Warm White | `#F5F2ED` | Primary surface (use over pure white) |
| Terracotta | `#E8A87C` | Primary CTA + HITL highlight (signature) |
| Deep Forest | `#1A3028` | Secondary accent / data sections |
| Amber Gold | `#C9A84C` | Sparing highlights / trust markers |
| Pure White | `#FFFFFF` | Cards on warm white |

- **Type:** Instrument Serif (headings; **italic** for emotional lines) + Inter (body).
  display-lg 64/42px, headline-lg 40px, headline-md 32px, body-lg 18px, body-md 16px,
  label-md 14px (+0.05em).
- **Shapes:** buttons 8px (no pill primaries), cards 16px, badges pill.
- **Layout:** 1280px container, 64px desktop margin, **120px section gap** (do not compress).
- **Cards:** pure white on warm white, 1px subtle border, hover `0 4px 20px rgba(28,43,58,0.05)`.
- **Nav:** transparent on hero → solid Midnight Navy + backdrop blur on scroll (sticky).
- Light mode default; Midnight Navy full-bleed sections break scroll rhythm.

## Site structure (v1)

- `/` — Hero, stat bar (42k / 1.2M+ / 24/7), Our Managed Excellence (3 pillars),
  The PropSpectrum Suite (4 products → propspectrum.ai), **About section** (folded into
  home, not a separate route), HITL navy anchor + 2 inline testimonials, Our Deployment
  Lifecycle timeline, Voice of the Partners (2-up), Strategic Partner · Apps Consultants,
  closing CTA *"Ready to scale your intelligence?"*, footer.
- `/services/lead-gen-crm`, `/services/marketing-growth`, `/services/ai-workflows`.
- **Contact info + consultation (Cal.com) link appear in the top nav AND footer on every page.**
- AI Workflows page: stitch screen failed to download — built to match the sibling pillar
  pattern using WP §06 Pillar 3.
- **Out of scope (v1):** pricing, blog, case studies, separate About/Contact routes, CMS,
  backend forms, PropSpectrum product pages.

## Project structure & key components

```
src/
  data/site.ts            # central site data: company facts, nav, services, products, lifecycle
  lib/jsonld.ts           # JSON-LD builders (organization, faqPage, service, breadcrumb)
  layouts/BaseLayout.astro# wraps every page: <BaseHead> + Navbar + Footer
  components/
    BaseHead.astro        # SEO: title/desc/canonical/OG/Twitter, fonts, JSON-LD
    Navbar.astro          # sticky, transparent→navy on scroll; logo (left) + links + Book CTA + Contact
    Footer.astro          # 4 cols + address + Cal.com + email + socials (every page)
    Button.astro          # variants: primary (terracotta) / secondary (navy outline) / dark
    HITLBadge.astro       # terracotta checkmark "Human-reviewed" — on service cards
    HeroCarousel.astro    # homepage hero right-side image carousel (see below)
    HitlSteps.astro       # condensed 3-step process for pillar pages (middle step terracotta)
    ComparisonTable.astro # last column (Mile High AI Labs) highlighted navy
    TestimonialCard.astro # light (warm white) or dark (navy ghost-layer) variant
    FAQ.astro             # native <details> accordion; pair with faqPage() JSON-LD
  pages/
    index.astro           # home
    services/lead-gen-crm.astro · marketing-growth.astro · ai-workflows.astro
  styles/global.css       # Tailwind v4 @theme tokens + base/components layers
```

### Hero carousel (`HeroCarousel.astro`)

- Replaces the old dashboard graphic on the home hero (right side).
- **Auto-rotates** every 5s (the `DELAY` const), with a terracotta progress bar, pause on
  hover/focus, prev/next arrows (show on hover), and clickable dots.
- **Ken Burns** zoom + crossfade on the active slide; respects `prefers-reduced-motion`
  (no autoplay/zoom). Only the active slide is clickable (inactive = `pointer-events-none`).
- 4 slides, each links to its area: Lead Gen & CRM, AI Workflows & Automation,
  PropSpectrum (real estate, external), Marketing & Social Media.
- Slide copy/links live in the component's `slides` array; images in `public/images/hero/`.

## Assets & images

- **Original brand assets** live in `assets/` (`Milehighai labs logo.png`,
  `appsconsultantslogo.png`). **Web-optimized versions** live in `public/images/`.
- **`scripts/process-logos.mjs`** regenerates the web logos with `sharp`. Re-run it
  (`node scripts/process-logos.mjs`) whenever a source logo changes. It:
  - Keys the **black background out of the Mile High logo** using a steep alpha ramp
    (LOW 38 / HIGH 90) so the white text + terracotta mountain stay **fully opaque and
    do NOT fade/blend** on the navy nav — then trims padding and resizes to 560px wide
    → `public/images/logo-mhal.png`.
  - Resizes the Apps Consultants logo (keep its red brand tile) → `public/images/logo-apps-consultants.png`.
- **Logo placement:** Mile High logo is in the **nav (left) on every page** (h-9 mobile /
  h-11 desktop, links home). Apps Consultants logo sits on a **white rounded card** in the
  home "Strategic Partner" (Deep Forest) section so the red reads cleanly.
- **Hero carousel photos** (`public/images/hero/*.jpg`) are licensed Unsplash photos,
  downloaded locally (no hotlinking) so they deploy to S3/CloudFront. Swap by replacing
  the files at the same paths.
- **Favicon / OG:** `public/favicon.svg` (mountain-peak mark) + `public/og-default.svg`.

## SEO / AEO (brand-new — do NOT reuse the previous site's tags/sitemap)

- Per-page `<SEO>`: unique title/description, canonical absolute URL, OG + Twitter cards.
- JSON-LD: `Organization`, `Service` (per pillar), `FAQPage`, `BreadcrumbList`.
- AEO: concise FAQ section per page, semantic HTML, `/llms.txt`.
- `@astrojs/sitemap` → `sitemap-index.xml`; hand-written `robots.txt`.

## Commands

```bash
npm install
npm run dev      # local dev server → http://localhost:4321
npm run build    # static output → dist/
npm run preview  # preview built site → http://localhost:4321
node scripts/process-logos.mjs   # regenerate web logos from assets/ (after a logo changes)
```

## Deployment

Static `dist/` → S3 + CloudFront. See `DEPLOYMENT.md` for sync guidance. Keep asset
paths root-absolute so they work behind CloudFront.

## Git

Don't commit or push unless explicitly asked.
