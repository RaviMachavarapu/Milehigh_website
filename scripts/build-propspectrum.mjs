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

// MHAL social + contact (kept in sync with src/data/site.ts).
const LINKEDIN = 'https://www.linkedin.com/company/107492824/';
const FACEBOOK = 'https://www.facebook.com/profile.php?id=61576855723694';
const INSTAGRAM = 'https://www.instagram.com/';

// Named real brokerages -> neutral trust phrases (no fabricated client endorsements).
const BROKERAGES = {
  'Kentwood Real Estate': 'Denver-Metro Agents',
  "LIV Sotheby's International Realty": 'Luxury Listing Specialists',
  'RE/MAX Professionals Colorado': 'Front Range Teams',
  'Coldwell Banker Realty': 'Independent Brokerages',
  'Slifer Smith &amp; Frampton': 'Mountain-Resort Realtors',
  'West + Main Homes': 'Independent Real Estate Teams',
  'Compass Colorado': 'High-Volume Producers',
  'The Agency Denver': 'Growing Brokerages',
  'eXp Realty Colorado': 'Solo Agents &amp; Teams',
  'ERA New Age': 'Property Management Groups',
};

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

  // 1) Remove Tailwind Play CDN <script> (with or without ?plugins=...) and its config block.
  html = html.replace(/<script src="https:\/\/cdn\.tailwindcss\.com[^"]*"><\/script>/g, '');
  html = html.replace(/<script[^>]*>\s*tailwind\.config[\s\S]*?<\/script>/g, '');

  // 2) Swap font <link> (Plus Jakarta + DM Sans) -> Instrument Serif + Inter, and add CSS link.
  html = html.replace(/<link href="https:\/\/fonts\.googleapis\.com\/css2\?family=Plus\+Jakarta[^>]*>/g, FONT_LINK);
  html = html.replace('</head>', `  ${CSS_LINK}\n</head>`);

  // 3) Inline font-family swaps.
  html = html.replace(/'Plus Jakarta Sans'/g, "'Instrument Serif'").replace(/Plus Jakarta Sans/g, 'Instrument Serif');
  html = html.replace(/'DM Sans'/g, "'Inter'").replace(/DM Sans/g, 'Inter');

  // 4) CTA links -> MHAL booking.
  html = html.replace(/https:\/\/calendly\.com\/propspectrum\/audit/g, 'https://cal.com/milehighailabs/15min');
  //    Design Studio CTAs -> the local ported page (was external demo subdomain).
  html = html.replace(/https:\/\/demo\.milehighlabs\.ai\/?/g, '/propspectrum/propoptics/design-studio');

  // 5) Internal links -> clean routes (fragments survive automatically; bare self-link last).
  for (const [re, to] of linkRules) html = html.replace(re, to);
  html = html.replace(/href="code v2\.html(#[\w-]*)?"/g, (_, frag = '') => `href="/propspectrum${frag}"`);

  // 6) Image paths -> root-absolute /images/propspectrum/...
  html = html.replace(/https:\/\/images\.unsplash\.com\/[^"')\s]+/g, (u) => `/images/propspectrum/unsplash/${idFor(u)}.jpg`);
  html = html.replace(/(["'(])(\.\.\/)*(images|portfolio-images)\//g, (_, q, _d, dir) => `${q}/images/propspectrum/propoptics/${dir}/`);

  // 7) Anonymize named brokerages: drop the real-logo hotlinks (clearbit) and
  //    replace the visible names with neutral trust phrases (no fabricated endorsements).
  html = html.replace(/<img[^>]*logo\.clearbit\.com[^>]*>/g, '');
  for (const [name, neutral] of Object.entries(BROKERAGES)) html = html.replaceAll(name, neutral);

  // 8) Footer/back-link cleanup.
  //    a) external company link -> internal MHAL home
  html = html.replaceAll('"https://milehighlabs.ai"', '"/"');
  //    b) stray external propspectrum domain -> internal
  html = html.replaceAll('realpropspectrum.com', 'milehighlabs.ai/propspectrum');
  //    c) wire dead footer social links (attribute order varies across pages)
  const wireSocial = (label, url) => {
    const re = new RegExp(`(<a\\b[^>]*?)href="#"([^>]*>\\s*${label}\\s*</a>)`, 'g');
    html = html.replace(re, `$1href="${url}"$2`);
  };
  wireSocial('LinkedIn', LINKEDIN);
  wireSocial('Instagram', INSTAGRAM);
  wireSocial('Facebook', FACEBOOK);
  //    e) wire footer links that have unambiguous real targets
  wireSocial('Apps Consultants', 'https://appsconsultants.com');
  wireSocial('About MHAL', '/');
  wireSocial('Contact', 'mailto:sales@milehighlabs.ai');
  //    d) add a sales email under the footer Company list
  html = html.replace(
    /(<li><a href="https:\/\/appsconsultants\.com"[^>]*>Apps Consultants<\/a><\/li>)/,
    `$1\n          <li><a href="mailto:sales@milehighlabs.ai" class="text-white/55 text-sm hover:text-white transition-colors">sales@milehighlabs.ai</a></li>`
  );

  // 9) Placeholder link decisions.
  //    a) Resources lead-magnet CTAs -> booking (no real assets exist yet).
  html = html.replace(
    /(<a\b[^>]*?)href="#"([^>]*?>\s*(?:Read Guide|Try Calculator|Download Report)\b)/g,
    '$1href="https://cal.com/milehighailabs/15min"$2'
  );
  //    b) "How It Works" footer link -> the on-page process section (add the anchor id).
  html = html.replace(
    /<section(\s+class="[^"]*">[\s\S]{0,120}?<h2[^>]*>How it works, end to end)/,
    '<section id="how-it-works"$1'
  );
  html = html.replace(/(<a\b[^>]*?)href="#"([^>]*?>How It Works<\/a>)/g, '$1href="#how-it-works"$2');
  //    c) Remove dead Privacy/Terms links (no such pages yet).
  html = html.replace(/<a\b[^>]*href="#"[^>]*>(?:Privacy|Terms)<\/a>\s*/g, '');

  await mkdir(path.dirname(out), { recursive: true });
  await writeFile(out, html);
  console.log('wrote', out);
}
console.log('pages built');
