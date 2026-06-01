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

// Retired/dead Unsplash photos -> thematically-matching local fallback image.
const FALLBACKS = {
  // "Empty bedroom" before-staging shot in design-studio.html
  '1597149212278-37e5d8f6b83f': path.join(SRC, 'propoptics_visual_ai_staging/portfolio-images/bedroom(before).jpg'),
};

const seen = new Map(); // id -> filename
const failures = [];
for (const u of urls) {
  const id = idFor(u);
  const file = `${id}.jpg`;
  if (seen.has(id)) continue;
  seen.set(id, file);
  const dest = `${OUT}/unsplash/${file}`;
  if (existsSync(dest)) continue;
  try {
    const res = await fetch(u);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    await writeFile(dest, Buffer.from(await res.arrayBuffer()));
    console.log('downloaded', file);
  } catch (err) {
    const fb = FALLBACKS[id];
    if (fb && existsSync(fb)) {
      await copyFile(fb, dest);
      console.log('fallback ', file, '<-', path.basename(fb), `(${err.message})`);
    } else {
      failures.push(`${u} (${err.message})`);
    }
  }
}
if (failures.length) {
  console.error('UNRESOLVED downloads:\n' + failures.join('\n'));
  process.exit(1);
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
