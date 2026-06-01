// One-off: prepare logo assets for the web.
// - Mile High logo: key out the black background (use brightness as alpha),
//   trim transparent padding, resize for crisp nav display.
// - Apps Consultants logo: just optimise/copy (keep its red brand tile).
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const OUT = 'public/images';
await mkdir(OUT, { recursive: true });

// ---- Mile High AI Labs: black -> transparent ----
const src = 'assets/Milehighai labs logo.png';
const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const ch = info.channels; // 4
// Steep alpha ramp so the foreground stays FULLY opaque (no fading/blending):
// only near-black background pixels go transparent; a narrow ramp keeps edges
// anti-aliased without making the text/mountain semi-transparent.
const LOW = 38; // below this brightness -> transparent (background)
const HIGH = 90; // above this -> fully opaque (foreground)
for (let i = 0; i < data.length; i += ch) {
  const lum = Math.max(data[i], data[i + 1], data[i + 2]);
  let a = (lum - LOW) / (HIGH - LOW);
  a = a < 0 ? 0 : a > 1 ? 1 : a;
  data[i + 3] = Math.round(a * 255);
}
await sharp(data, { raw: { width: info.width, height: info.height, channels: ch } })
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
