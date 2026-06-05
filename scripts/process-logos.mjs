// One-off: prepare logo assets for the web.
// - Mile High logo: key out the black background (use brightness as alpha),
//   trim transparent padding, resize for crisp nav display.
// - Apps Consultants logo: just optimise/copy (keep its red brand tile).
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const OUT = 'public/images';
await mkdir(OUT, { recursive: true });

// ---- Mile High AI Labs: dark-green background -> transparent ----
const src = 'assets/milehighlogo.png';
const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const ch = info.channels; // 4
// Luminance alpha ramp so the cream wordmark + mountain stay FULLY opaque (no
// fading/blending) while the dark-green gradient background goes transparent.
// The logo is cleanly bimodal: green bg brightness tops out ~109, the cream
// foreground is ~200-255, so this ramp sits safely in the gap and keeps edges
// anti-aliased.
const LOW = 110; // below this brightness -> transparent (green background)
const HIGH = 185; // above this -> fully opaque (cream foreground)
for (let i = 0; i < data.length; i += ch) {
  const lum = Math.max(data[i], data[i + 1], data[i + 2]);
  let a = (lum - LOW) / (HIGH - LOW);
  a = a < 0 ? 0 : a > 1 ? 1 : a;
  data[i + 3] = Math.round(a * 255);
}
await sharp(data, { raw: { width: info.width, height: info.height, channels: ch } })
  .modulate({ brightness: 1.28 }) // lift the cream wordmark/mountain toward white so it reads brighter on navy
  .trim({ threshold: 12 }) // crop the transparent border for a tight wordmark
  .resize({ width: 560, withoutEnlargement: true })
  .png({ compressionLevel: 9 })
  .toFile(`${OUT}/logo-mhal.png`);

// ---- Apps Consultants: keep brand red tile, just normalise size ----
await sharp('assets/appsconsultantslogo.png')
  .resize({ width: 480, withoutEnlargement: true })
  .png({ compressionLevel: 9 })
  .toFile(`${OUT}/logo-apps-consultants.png`);

const a = await sharp(`${OUT}/logo-mhal.png`).metadata();
const b = await sharp(`${OUT}/logo-apps-consultants.png`).metadata();
console.log('logo-mhal.png', a.width + 'x' + a.height);
console.log('logo-apps-consultants.png', b.width + 'x' + b.height);
