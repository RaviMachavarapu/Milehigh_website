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

- **Type (no italics anywhere):**
  - **H1/H2** — Plus Jakarta Sans, ExtraBold (800). Token `--font-display`; also used for big
    display numbers (stat values). Set on `h1,h2` in `global.css` base layer.
  - **H3/H4** — Inter, Semi-Bold (600). Token `--font-sans`; set on `h3,h4` base layer. Do
    NOT add `font-serif`/`font-display` to an h3/h4 (it would override to the display font).
  - **Body** — Inter, Regular (400).
  - **Buttons / nav / overlays** — Inter, Medium (500); all-caps labels (`.eyebrow`) add
    +0.05em tracking.
  - `--font-serif` is a **legacy alias mapped to the display font** (Plus Jakarta Sans) so
    older `font-serif` utility usages still render as display — it is NOT a serif and NOT
    italic. The emphasis highlight class is `.accent-em` (display ExtraBold, formerly the
    italic `.accent-italic`).
  - Fonts load from Google Fonts in `BaseHead.astro`: `Plus+Jakarta+Sans:wght@700;800` +
    `Inter:wght@400;500;600`.
  - Scale: display-lg 64/42px, headline-lg 40px, headline-md 32px, body-lg 18px,
    body-md 16px, label-md 14px (+0.05em).
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
    HeroMedia.astro       # full-bleed photo hero + navy overlay (home + pillar pages; see below)
    HitlSteps.astro       # condensed 3-step process for pillar pages (middle step terracotta)
    ComparisonTable.astro # last column (Mile High AI Labs) highlighted navy
    TestimonialCard.astro # light (warm white) or dark (navy ghost-layer) variant
    FAQ.astro             # native <details> accordion; pair with faqPage() JSON-LD
    CountUp.astro         # stat number that animates 0→target on scroll-in; preserves
                          #   prefix/suffix (e.g. "42%", "4.2×", "<5 min"); non-numeric
                          #   values (e.g. "24/7") render unchanged. Inline IntersectionObserver JS.
    ImagePlaceholder.astro# dashed placeholder marking where a real image goes (props: label,
                          #   ratio, tone light|dark). Swap the whole tag for <img>/<picture> when ready.
    BackLink.astro        # "← Back" link for interior pages (props: href, label, variant light|dark)
    NewsletterPopup.astro # session-once modal mounted globally in BaseLayout (see SEO/AEO section)
    HeroCarousel.astro    # LEGACY/unused — superseded by HeroMedia.astro; safe to delete
  pages/
    index.astro           # home
    services/lead-gen-crm.astro · marketing-growth.astro · ai-workflows.astro
  styles/global.css       # Tailwind v4 @theme tokens + base/components layers
```

### Hero (`HeroMedia.astro`)

- The current homepage + all three pillar pages use **`HeroMedia.astro`**: a full-bleed
  photographic background with a navy transparency overlay (heavier on the left where the
  headline sits), and the page content passed in via `<slot>`. This replaced the older
  right-side `HeroCarousel.astro` (now unused — safe to delete).
- Props: `images: string[]` (one → static background; many → a horizontal sliding
  carousel behind the fixed slot content), `interval` (ms per slide, default 5500),
  `class`. Multi-image mode clones the first slide at the end for a seamless loop, shows
  clickable dots, pauses on hover, and respects `prefers-reduced-motion` (snaps instead
  of sliding). The slide JS lives inline in the component.
- Home passes 5 rotating photos (`/images/heroes/mhal-1..5.jpg`, `interval={4000}`); each
  service page passes a single themed image (`leadgen.jpg` / `marketing.jpg` /
  `ai-workflows.jpg`).

## Assets & images

- **Original brand assets** live in `assets/` (`milehighlogo.png`, `appsconsultantslogo.png`,
  plus the high-res hero source PNGs `mhal-1..5.png`, `leadgen.png`, `Marketing-1.png`,
  `AIworkflows.png`). **Web-optimized versions** live in `public/images/`.
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
- **Hero photos** (`public/images/heroes/*.jpg`) are generated by
  **`scripts/process-hero-images.mjs`** with `sharp`: it downscales the large source PNGs
  in `assets/` to 2400px-wide quality-82 mozjpeg JPGs. Re-run
  (`node scripts/process-hero-images.mjs`) after replacing a source PNG; edit the `JOBS`
  map to add/rename a hero image. (These are local files, not hotlinked, so they deploy to
  S3/CloudFront.)
- **Favicon / OG:** `public/favicon.svg` (mountain-peak mark) + `public/og-default.svg`.

## SEO / AEO (brand-new — do NOT reuse the previous site's tags/sitemap)

- Per-page `<SEO>`: unique title/description, canonical absolute URL, OG + Twitter cards.
- JSON-LD: `Organization`, `Service` (per pillar), `FAQPage`, `BreadcrumbList`.
- AEO: concise FAQ section per page, semantic HTML, `/llms.txt`.
- `@astrojs/sitemap` → `sitemap-index.xml`; hand-written `robots.txt`.

### Interior-page components

- `BackLink.astro` — small "← Back" link for the top-left of interior pages.
  Props: `href`, `label` (default "Back"), `variant` ('light' for navy heroes /
  'dark' for light backgrounds). Hover widens the arrow gap.
- `NewsletterPopup.astro` — modal mounted globally in `BaseLayout.astro` (so it
  appears on every Astro page). Opens 30s after load, **once per session**
  (`sessionStorage` `mhal_nl_seen_session`), and is **suppressed forever once
  subscribed** (`localStorage` `mhal_nl_subscribed`). ⚠️ **No backend yet** — submit
  only validates the email client-side and shows a success state. To wire it, POST
  `{ email, interests }` inside the form's submit handler (see the `NOTE` comment).

## The PropSpectrum static-site pipeline (`/propspectrum/*`)

> ⚠️ **Currently a placeholder.** PropSpectrum is intentionally stubbed to a single
> branded "Coming Soon" page at `public/propspectrum/index.html`. The full built
> sub-pages (propai, propleads, propoptics[+portfolio,+design-studio], propreach)
> are preserved out of the deploy in **`propspectrum-prebuilt/`** at repo root. The
> main site links only to `/propspectrum` (no sub-page links): homepage suite cards
> are non-clickable "Coming soon" teasers, `site.ts` `propspectrum` is `/propspectrum`,
> `propProducts` have no `href`, and the sitemap lists only `/propspectrum`.
> **To re-enable:** move `propspectrum-prebuilt/*` back into `public/propspectrum/`,
> restore the sub-page `href`s (homepage cards + `site.ts` `propProducts`), and re-add
> the 6 sub-routes to `astro.config.mjs` `customPages`. The pipeline below regenerates
> those built pages.

PropSpectrum pages are **NOT Astro pages**. They are pre-built static HTML in
`public/propspectrum/**/index.html`, generated by transforming the upstream
`PropSpectrum-main/PropSpectrum-main/**/code v2.html` source. Editing the
`public/propspectrum/*` files directly is wrong — they are **build artifacts** and
will be overwritten. Change the **source HTML** or the **transform scripts** instead,
then rebuild.

Three scripts (run in this order; none are wired into `package.json`, run manually):

1. `node scripts/fetch-propspectrum-images.mjs` — downloads each unique Unsplash
   image once (keyed by photo id) into `public/images/propspectrum/unsplash/`, copies
   PropOptics' local `images/` + `portfolio-images/` folders verbatim, and substitutes
   thematically-matching local fallbacks for retired Unsplash URLs (the `FALLBACKS`
   map). Exits non-zero on any unresolved download.
2. Build the PropSpectrum CSS (the pages were authored against a **Tailwind v3 Play
   CDN** token set, separate from the main site's Tailwind v4):
   ```bash
   npx tailwindcss@3 -c scripts/tailwind.propspectrum.config.cjs \
     -i scripts/propspectrum.input.css \
     -o public/images/propspectrum/propspectrum.css --minify
   ```
   `tailwind.propspectrum.config.cjs` is the merged union of every source page's
   inline `tailwind.config`, with fonts remapped to Instrument Serif + Inter.
3. `node scripts/build-propspectrum.mjs` — the main transform. For each page it:
   strips the Tailwind CDN `<script>`, swaps fonts to Instrument Serif/Inter, rewrites
   all internal links to clean routes (`/propspectrum/...`) and Unsplash/local image
   refs to root-absolute `/images/propspectrum/...`, points all CTAs at
   `cal.com/milehighailabs/15min`, **anonymizes named real brokerages** to neutral
   trust phrases (the `BROKERAGES` map — never reintroduce real client names), wires
   footer social/contact links to the MHAL socials, and injects a "Back" arrow in the
   header. Output map is the `PAGES` const.

After building, validate with `node scripts/check-propspectrum-links.mjs` — it walks
`dist/propspectrum/**` + `dist/index.html` and asserts every root-absolute `href`/`src`
resolves to a real file (exits non-zero on broken links). Run `npm run build` first so
`dist/` exists.

`astro.config.mjs` lists all seven PropSpectrum routes under `sitemap({ customPages })`
because they live in `public/` and aren't auto-discovered by the sitemap integration.
If you add/remove a PropSpectrum page, update **both** the `PAGES`/`linkRules` in the
scripts **and** the `customPages` array.

## Commands

> Requires **Node ≥ 22.12.0** (`package.json` `engines`). `astro.config.mjs` sets
> `trailingSlash: 'never'` and `output: 'static'` — keep internal links un-slashed
> (`/services/lead-gen-crm`, not `/services/lead-gen-crm/`) so they stay canonical.

```bash
npm install
npm run dev      # local dev server → http://localhost:4321
npm run build    # static output → dist/
npm run preview  # preview built site → http://localhost:4321
node scripts/process-logos.mjs        # regenerate web logos from assets/ (after a logo changes)
node scripts/process-hero-images.mjs  # regenerate hero JPGs in public/images/heroes/ from assets/ PNGs

# PropSpectrum pipeline (manual, in order — see the PropSpectrum section above)
node scripts/fetch-propspectrum-images.mjs
npx tailwindcss@3 -c scripts/tailwind.propspectrum.config.cjs -i scripts/propspectrum.input.css -o public/images/propspectrum/propspectrum.css --minify
node scripts/build-propspectrum.mjs
node scripts/check-propspectrum-links.mjs   # run after npm run build
```

## Deployment

Static `dist/` → S3 + CloudFront. See `DEPLOYMENT.md` for sync guidance. Keep asset
paths root-absolute so they work behind CloudFront.

## Git

Don't commit or push unless explicitly asked.
