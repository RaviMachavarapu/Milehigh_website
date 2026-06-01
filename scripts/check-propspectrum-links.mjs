// scripts/check-propspectrum-links.mjs
// Resolve every root-absolute internal link/image in the built PropSpectrum
// pages (and the MHAL homepage's PropSpectrum links) against dist/ files.
import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const DIST = 'dist';
const pages = [];
const walk = async (dir) => {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) await walk(p);
    else if (e.name.endsWith('.html')) pages.push(p);
  }
};
await walk(path.join(DIST, 'propspectrum'));
pages.push(path.join(DIST, 'index.html'));

const exists = async (rel) => {
  // rel is a site-root path like /propspectrum/propai or /images/x.png
  const clean = decodeURIComponent(rel.split('#')[0].split('?')[0]);
  if (clean === '/' ) return true;
  const base = path.join(DIST, clean);
  for (const cand of [base, `${base}.html`, path.join(base, 'index.html')]) {
    try { if ((await stat(cand)).isFile()) return true; } catch {}
  }
  return false;
};

const broken = [];
let checked = 0;
for (const page of pages) {
  const html = await readFile(page, 'utf8');
  for (const m of html.matchAll(/(?:href|src)="(\/[^"]*)"/g)) {
    const url = m[1];
    if (url.startsWith('//')) continue;          // protocol-relative (none expected)
    checked++;
    if (!(await exists(url))) broken.push(`${path.relative(DIST, page)} -> ${url}`);
  }
}

console.log(`checked ${checked} internal href/src across ${pages.length} pages`);
if (broken.length) { console.error('BROKEN internal links/assets:\n' + [...new Set(broken)].join('\n')); process.exit(1); }
console.log('all internal links and assets resolve ✓');
