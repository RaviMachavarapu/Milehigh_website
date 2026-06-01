# PropSpectrum Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bring the 7 PropSpectrum v2 pages into the Mile High AI Labs site as static, serverless pages under `/propspectrum`, fully wired to the homepage, with MHAL typography, working buttons, and no broken/hotlinked assets.

**Architecture:** PropSpectrum pages ship as static HTML under `public/propspectrum/` (folder/`index.html` → clean URLs), copied verbatim by Astro into `dist/`. A deterministic Node transform script (`scripts/build-propspectrum.mjs`) does all mechanical rewrites (fonts, CDN removal, CTA links, internal links, image paths). Images are localized into `public/images/propspectrum/`. A single precompiled Tailwind v4 stylesheet replaces the dev CDN. The MHAL homepage cards/nav are wired to the new routes via `src/data/site.ts`.

**Tech Stack:** Astro 6 (static output), Tailwind CSS v4 (`@tailwindcss/cli` for the standalone PropSpectrum stylesheet), Node 22 (transform + image-download scripts).

---

## File Structure

**Create:**
- `scripts/build-propspectrum.mjs` — transform pipeline: copy v2 HTML → `public/propspectrum/`, apply all string rewrites.
- `scripts/fetch-propspectrum-images.mjs` — download the 26 Unsplash photos + copy local PropOptics image folders into `public/images/propspectrum/`.
- `scripts/propspectrum.css` — Tailwind v4 input (`@import "tailwindcss"` + `@theme` tokens + `@source`).
- `public/propspectrum/{index,propai/index,propleads/index,propoptics/index,propoptics/portfolio/index,propoptics/design-studio/index,propreach/index}.html` — generated output (committed so the site builds without re-running scripts).
- `public/images/propspectrum/propspectrum.css` — generated stylesheet (committed).
- `public/images/propspectrum/unsplash/*.jpg` — localized hero/section photos.
- `public/images/propspectrum/propoptics/{images,portfolio-images}/*` — localized PropOptics staging photos.

**Modify:**
- `src/data/site.ts` — add `href` to each `propProducts` entry; point `navLinks` PropSpectrum item to `/propspectrum`.
- `src/pages/index.astro` — cards link to `p.href` (internal), update card CTA label.
- `src/components/Navbar.astro` — PropSpectrum link becomes internal (drop external/target=_blank).
- `astro.config.mjs` — add the 7 PropSpectrum URLs via sitemap `customPages`.

**Source (read-only reference, NOT shipped):** `PropSpectrum-main/PropSpectrum-main/<product>/code v2.html` etc.

---

## Conventions used by the scripts

`SRC = "PropSpectrum-main/PropSpectrum-main"`. Page map (source → output dir):

| key | source | output |
|---|---|---|
| home | `propspectrum_homepage/code v2.html` | `public/propspectrum/index.html` |
| propai | `propai_automation_workflow/code v2.html` | `public/propspectrum/propai/index.html` |
| propleads | `propleads_lead_gen_crm/code v2.html` | `public/propspectrum/propleads/index.html` |
| propoptics | `propoptics_visual_ai_staging/code v2.html` | `public/propspectrum/propoptics/index.html` |
| portfolio | `propoptics_visual_ai_staging/propoptics_portfolio.html` | `public/propspectrum/propoptics/portfolio/index.html` |
| design-studio | `propoptics_visual_ai_staging/design-studio.html` | `public/propspectrum/propoptics/design-studio/index.html` |
| propreach | `propreach_marketing_growth/code v2.html` | `public/propspectrum/propreach/index.html` |

Internal-link rewrite table (apply with optional trailing `#fragment` preserved):

| from (regex, paths may be `../` prefixed) | to |
|---|---|
| `(\.\./)?propspectrum_homepage/code v2.html` | `/propspectrum` |
| `(\.\./)?propai_automation_workflow/code v2.html` | `/propspectrum/propai` |
| `(\.\./)?propleads_lead_gen_crm/code v2.html` | `/propspectrum/propleads` |
| `(\.\./)?propoptics_visual_ai_staging/code v2.html` | `/propspectrum/propoptics` |
| `(\.\./)?propreach_marketing_growth/code v2.html` | `/propspectrum/propreach` |
| `propoptics_portfolio.html` | `/propspectrum/propoptics/portfolio` |
| `design-studio.html` | `/propspectrum/propoptics/design-studio` |
| `code v2.html` (bare self-link, after the above) | `/propspectrum` |

---

## Task 1: Localize all images

**Files:**
- Create: `scripts/fetch-propspectrum-images.mjs`

- [ ] **Step 1: Write the image-fetch script**

```js
// scripts/fetch-propspectrum-images.mjs
import { readFile, mkdir, copyFile, writeFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const SRC = 'PropSpectrum-main/PropSpectrum-main';
const OUT = 'public/images/propspectrum';
const PAGES = [
  'propspectrum_homepage/code v2.html',
  'propai_automation_workflow/code v2.html',
  'propleads_lead_gen_crm/code v2.html',
  'propoptics_visual_ai_staging/code v2.html',
  'propoptics_visual_ai_staging/propoptics_portfolio.html',
  'propoptics_visual_ai_staging/design-studio.html',
  'propreach_marketing_growth/code v2.html',
];

await mkdir(`${OUT}/unsplash`, { recursive: true });

// 1) Unsplash: collect unique URLs, key by photo id, download once each.
const urls = new Set();
for (const p of PAGES) {
  const html = await readFile(path.join(SRC, p), 'utf8');
  for (const m of html.matchAll(/https:\/\/images\.unsplash\.com\/[^"')\s]+/g)) urls.add(m[0]);
}
const idFor = (u) => (u.match(/photo-([\w-]+)/)?.[1]) ?? Buffer.from(u).toString('hex').slice(0, 16);
const seen = new Map(); // id -> filename
for (const u of urls) {
  const id = idFor(u);
  const file = `${id}.jpg`;
  if (!seen.has(id)) {
    seen.set(id, file);
    const dest = `${OUT}/unsplash/${file}`;
    if (!existsSync(dest)) {
      const res = await fetch(u);
      if (!res.ok) throw new Error(`Download failed ${res.status}: ${u}`);
      await writeFile(dest, Buffer.from(await res.arrayBuffer()));
      console.log('downloaded', file);
    }
  }
}

// 2) Copy PropOptics local image folders verbatim.
for (const dir of ['images', 'portfolio-images']) {
  const from = path.join(SRC, 'propoptics_visual_ai_staging', dir);
  if (!existsSync(from)) continue;
  const to = `${OUT}/propoptics/${dir}`;
  await mkdir(to, { recursive: true });
  const walk = async (rel = '') => {
    for (const ent of await readdir(path.join(from, rel), { withFileTypes: true })) {
      const r = path.join(rel, ent.name);
      if (ent.isDirectory()) { await mkdir(path.join(to, r), { recursive: true }); await walk(r); }
      else await copyFile(path.join(from, r), path.join(to, r));
    }
  };
  await walk();
}
console.log('images localized');
```

- [ ] **Step 2: Run it**

Run: `node scripts/fetch-propspectrum-images.mjs`
Expected: prints `downloaded ...` lines then `images localized`, no error thrown.

- [ ] **Step 3: Verify counts**

Run: `node -e "const f=require('fs');console.log('unsplash',f.readdirSync('public/images/propspectrum/unsplash').length);console.log('portfolio',f.readdirSync('public/images/propspectrum/propoptics/portfolio-images').length)"`
Expected: `unsplash` ≈ number of unique photo ids (≤26); `portfolio` > 20.

- [ ] **Step 4: Commit**

```bash
git add scripts/fetch-propspectrum-images.mjs public/images/propspectrum
git commit -m "feat(propspectrum): localize hero/section/portfolio images"
```

---

## Task 2: Transform & emit the 7 static pages

**Files:**
- Create: `scripts/build-propspectrum.mjs`

- [ ] **Step 1: Write the transform script**

```js
// scripts/build-propspectrum.mjs
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const SRC = 'PropSpectrum-main/PropSpectrum-main';
const PAGES = {
  'propspectrum_homepage/code v2.html': 'public/propspectrum/index.html',
  'propai_automation_workflow/code v2.html': 'public/propspectrum/propai/index.html',
  'propleads_lead_gen_crm/code v2.html': 'public/propspectrum/propleads/index.html',
  'propoptics_visual_ai_staging/code v2.html': 'public/propspectrum/propoptics/index.html',
  'propoptics_visual_ai_staging/propoptics_portfolio.html': 'public/propspectrum/propoptics/portfolio/index.html',
  'propoptics_visual_ai_staging/design-studio.html': 'public/propspectrum/propoptics/design-studio/index.html',
  'propreach_marketing_growth/code v2.html': 'public/propspectrum/propreach/index.html',
};

const FONT_LINK = '<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />';
const CSS_LINK = '<link rel="stylesheet" href="/images/propspectrum/propspectrum.css" />';

// id->filename helper must MATCH fetch script.
const idFor = (u) => (u.match(/photo-([\w-]+)/)?.[1]) ?? Buffer.from(u).toString('hex').slice(0, 16);

const linkRules = [
  [/(\.\.\/)?propspectrum_homepage\/code v2\.html/g, '/propspectrum'],
  [/(\.\.\/)?propai_automation_workflow\/code v2\.html/g, '/propspectrum/propai'],
  [/(\.\.\/)?propleads_lead_gen_crm\/code v2\.html/g, '/propspectrum/propleads'],
  [/(\.\.\/)?propoptics_visual_ai_staging\/code v2\.html/g, '/propspectrum/propoptics'],
  [/(\.\.\/)?propreach_marketing_growth\/code v2\.html/g, '/propspectrum/propreach'],
  [/propoptics_portfolio\.html/g, '/propspectrum/propoptics/portfolio'],
  [/design-studio\.html/g, '/propspectrum/propoptics/design-studio'],
];

for (const [src, out] of Object.entries(PAGES)) {
  let html = await readFile(path.join(SRC, src), 'utf8');

  // 1) Remove Tailwind Play CDN <script> and its config <script> block.
  html = html.replace(/<script src="https:\/\/cdn\.tailwindcss\.com"><\/script>/g, '');
  html = html.replace(/<script>\s*tailwind\.config[\s\S]*?<\/script>/g, '');

  // 2) Swap font <link> (Plus Jakarta + DM Sans) -> Instrument Serif + Inter, and add CSS link.
  html = html.replace(/<link href="https:\/\/fonts\.googleapis\.com\/css2\?family=Plus\+Jakarta[^>]*>/g, FONT_LINK);
  html = html.replace('</head>', `  ${CSS_LINK}\n</head>`);

  // 3) Inline font-family swaps.
  html = html.replace(/'Plus Jakarta Sans'/g, "'Instrument Serif'").replace(/Plus Jakarta Sans/g, 'Instrument Serif');
  html = html.replace(/'DM Sans'/g, "'Inter'").replace(/DM Sans/g, 'Inter');

  // 4) CTA links -> MHAL booking.
  html = html.replace(/https:\/\/calendly\.com\/propspectrum\/audit/g, 'https://cal.com/milehighailabs/15min');

  // 5) Internal links -> clean routes (fragments survive automatically; bare self-link last).
  for (const [re, to] of linkRules) html = html.replace(re, to);
  html = html.replace(/href="code v2\.html(#[\w-]*)?"/g, (_, frag = '') => `href="/propspectrum${frag}"`);

  // 6) Image paths -> root-absolute /images/propspectrum/...
  html = html.replace(/https:\/\/images\.unsplash\.com\/[^"')\s]+/g, (u) => `/images/propspectrum/unsplash/${idFor(u)}.jpg`);
  html = html.replace(/(["'(])(\.\.\/)*(images|portfolio-images)\//g, (_, q, _d, dir) => `${q}/images/propspectrum/propoptics/${dir}/`);

  await mkdir(path.dirname(out), { recursive: true });
  await writeFile(out, html);
  console.log('wrote', out);
}
console.log('pages built');
```

- [ ] **Step 2: Run it**

Run: `node scripts/build-propspectrum.mjs`
Expected: 7 `wrote ...` lines then `pages built`.

- [ ] **Step 3: Verify no leftover source artifacts**

Run: `grep -rlE "cdn\.tailwindcss\.com|calendly\.com|code v2\.html|images\.unsplash\.com|Plus Jakarta|DM Sans" public/propspectrum || echo CLEAN`
Expected: `CLEAN`

- [ ] **Step 4: Commit**

```bash
git add scripts/build-propspectrum.mjs public/propspectrum
git commit -m "feat(propspectrum): emit static pages with MHAL fonts, fixed links and CTAs"
```

---

## Task 3: Precompiled self-contained Tailwind stylesheet

**Files:**
- Create: `scripts/propspectrum.css`, `public/images/propspectrum/propspectrum.css` (generated)

- [ ] **Step 1: Write the Tailwind v4 input**

```css
/* scripts/propspectrum.css */
@import "tailwindcss";
@source "../public/propspectrum/**/*.html";

@theme {
  --color-midnight: #1C2B3A;
  --color-warm-white: #F5F2ED;
  --color-terracotta: #E8A87C;
  --color-deep-forest: #1A3028;
  --color-amber-gold: #C9A84C;
  --color-steel-blue: #6B8FA8;
  --font-serif: "Instrument Serif", ui-serif, Georgia, serif;
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
}
```

- [ ] **Step 2: Build the stylesheet (after Task 2 has emitted the HTML it scans)**

Run: `npx @tailwindcss/cli -i scripts/propspectrum.css -o public/images/propspectrum/propspectrum.css --minify`
Expected: exits 0; `public/images/propspectrum/propspectrum.css` exists and is non-trivial.

- [ ] **Step 3: Verify key utilities + tokens are present**

Run: `grep -cE "\.bg-midnight|\.text-terracotta|\.font-serif" public/images/propspectrum/propspectrum.css`
Expected: a number ≥ 1 (utilities generated). Also: `grep -c "Instrument Serif" public/images/propspectrum/propspectrum.css` → ≥ 1.

- [ ] **Step 4: Commit**

```bash
git add scripts/propspectrum.css public/images/propspectrum/propspectrum.css
git commit -m "feat(propspectrum): precompiled self-contained Tailwind stylesheet (no CDN)"
```

---

## Task 4: Anonymize brokerages + footer/back-link alignment

**Files:**
- Modify: `public/propspectrum/index.html` (and any other page containing the ticker/footer)

- [ ] **Step 1: Locate the brokerage ticker**

Run: `grep -nE "Sotheby|RE/MAX|Compass|Coldwell|Kentwood|Slifer|eXp" public/propspectrum/index.html`
Expected: line numbers for the ticker `<span>` list (appears twice — the loop is duplicated for seamless scroll).

- [ ] **Step 2: Replace each named brokerage span's text with neutral trust phrases**

Edit every ticker `<span ...>NAME</span>` so the visible names become generic, e.g.:
`Denver-Metro Agents` · `Front Range Teams` · `Boutique Brokerages` · `Independent Realtors` · `Luxury Listing Specialists` · `Growing Teams`
(Keep the same number of spans/separators so the scroll animation still loops cleanly.)

- [ ] **Step 3: Align footer + add back-to-MHAL link**

Run: `grep -nE "sales@|mailto:|linkedin|facebook|youtube|instagram|<footer" public/propspectrum/index.html`
Then, in the footer of each page: ensure email is `sales@milehighlabs.ai`, social links match `src/data/site.ts` socials, and add a link `Mile High AI Labs` → `/`. The booking CTA is already `cal.com/milehighailabs/15min` from Task 2.

- [ ] **Step 4: Add a design-studio link from PropOptics**

In `public/propspectrum/propoptics/index.html`, add a button/link to `/propspectrum/propoptics/design-studio` near the portfolio CTA (so the page is reachable). Example anchor:
`<a href="/propspectrum/propoptics/design-studio" class="...">Try the Design Studio</a>`

- [ ] **Step 5: Verify brokerages gone**

Run: `grep -rlE "Sotheby|RE/MAX|Compass|Coldwell|Kentwood|Slifer|eXp" public/propspectrum || echo CLEAN`
Expected: `CLEAN`

- [ ] **Step 6: Commit**

```bash
git add public/propspectrum
git commit -m "feat(propspectrum): neutralize named brokerages, align footer, link design studio"
```

> **Note:** Tasks 2 and 4 both write to `public/propspectrum`. If the transform script (Task 2) is ever re-run, Task 4's manual edits are overwritten. Re-apply Task 4 after any Task 2 re-run (the build verification in Task 6 will catch a regression).

---

## Task 5: Wire the MHAL homepage and nav

**Files:**
- Modify: `src/data/site.ts`, `src/pages/index.astro`, `src/components/Navbar.astro`

- [ ] **Step 1: Add `href` to each product in `site.ts`**

In `src/data/site.ts`, change `propProducts` to:

```ts
export const propProducts = [
  { name: 'PropAI', oneLine: 'Never drop a lead.', color: 'forest', href: '/propspectrum/propai' },
  { name: 'PropLeads', oneLine: 'Always know who to call.', color: 'amber', href: '/propspectrum/propleads' },
  { name: 'PropOptics', oneLine: 'Make the listing irresistible.', color: 'terracotta', href: '/propspectrum/propoptics' },
  { name: 'PropReach', oneLine: 'Written in your voice. Posted automatically.', color: 'amber', href: '/propspectrum/propreach' },
];
```

- [ ] **Step 2: Point the nav PropSpectrum item internal**

In `src/data/site.ts`, change the navLinks PropSpectrum entry from
`{ label: 'PropSpectrum', href: site.propspectrum, external: true }` to
`{ label: 'PropSpectrum', href: '/propspectrum' }`.

- [ ] **Step 3: Update the homepage cards**

In `src/pages/index.astro`, in the PropSpectrum Suite map, change the `<a>`:
- `href={site.propspectrum}` → `href={p.href}`
- remove `target="_blank" rel="noopener"`
- change the label text `Visit PropSpectrum →` → `Explore {p.name} →`

- [ ] **Step 4: Confirm Navbar handles non-external link**

Read `src/components/Navbar.astro`; verify links without `external` render as a normal internal `<a href>` (no `target=_blank`). Adjust only if the PropSpectrum link still forces external behavior.

- [ ] **Step 5: Commit**

```bash
git add src/data/site.ts src/pages/index.astro src/components/Navbar.astro
git commit -m "feat(propspectrum): link homepage cards and nav to internal PropSpectrum routes"
```

---

## Task 6: Sitemap + full build verification

**Files:**
- Modify: `astro.config.mjs`

- [ ] **Step 1: Add PropSpectrum URLs to the sitemap**

In `astro.config.mjs`, pass `customPages` to the sitemap integration:

```js
integrations: [sitemap({
  customPages: [
    'https://www.milehighlabs.ai/propspectrum',
    'https://www.milehighlabs.ai/propspectrum/propai',
    'https://www.milehighlabs.ai/propspectrum/propleads',
    'https://www.milehighlabs.ai/propspectrum/propoptics',
    'https://www.milehighlabs.ai/propspectrum/propoptics/portfolio',
    'https://www.milehighlabs.ai/propspectrum/propoptics/design-studio',
    'https://www.milehighlabs.ai/propspectrum/propreach',
  ],
})],
```

- [ ] **Step 2: Build**

Run: `npm run build`
Expected: build succeeds; `dist/propspectrum/index.html` and all 6 subpages exist.

- [ ] **Step 3: Verify built output is clean and self-contained**

Run: `grep -rlE "cdn\.tailwindcss\.com|calendly\.com|images\.unsplash\.com|code v2\.html" dist/propspectrum || echo CLEAN`
Expected: `CLEAN`

- [ ] **Step 4: Manual click-through (preview)**

Run: `npm run preview` then open `http://localhost:4321/propspectrum`.
Confirm for every route (`/propspectrum`, `/propspectrum/propai`, `/propspectrum/propleads`, `/propspectrum/propoptics`, `/propspectrum/propoptics/portfolio`, `/propspectrum/propoptics/design-studio`, `/propspectrum/propreach`):
- headings render in Instrument Serif, body in Inter;
- no `cdn.tailwindcss.com` network request and no console CDN warning;
- every nav item, product cross-link, CTA ("Book Free Audit" → cal.com), portfolio anchor, and the back-to-MHAL link resolves (no 404);
- all images load (no `images.unsplash.com` in the network tab);
- from the MHAL homepage (`/`), each of the 4 PropSpectrum cards and the nav "PropSpectrum" link routes to the correct internal page.

- [ ] **Step 5: Commit**

```bash
git add astro.config.mjs
git commit -m "feat(propspectrum): add routes to sitemap"
```

---

## Self-review notes

- **Spec coverage:** static/serverless (Tasks 2/3/6), MHAL fonts (Tasks 2/3), CDN removed (Tasks 2/3), CTAs→cal.com (Task 2), internal links fixed (Task 2), images localized (Task 1), brokerages anonymized / pricing kept (Task 4), footer + back-link + design-studio link (Task 4), homepage+nav wiring (Task 5), sitemap (Task 6), every-button verification (Task 6 Step 4). All 7 pages incl. portfolio + design-studio (Task 2 page map).
- **`idFor` consistency:** identical helper in Task 1 and Task 2 so filenames match.
- **Order dependency:** Task 1 (images) and Task 2 (HTML) before Task 3 (CSS scans the emitted HTML). Task 4 edits after Task 2. Documented in Task 4 note.
