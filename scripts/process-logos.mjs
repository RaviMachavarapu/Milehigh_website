// One-off: prepare logo assets for the web.
// - Mile High logo: key out the black background (use brightness as alpha),
//   trim transparent padding, resize for crisp nav display.
// - Apps Consultants logo: just optimise/copy (keep its red brand tile).
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const OUT = 'public/images';
await mkdir(OUT, { recursive: true });

// ---- Mile High AI Labs: violet wordmark on a LIGHT background ----
// The source is a violet "MILE HIGH AI LABS" wordmark + mountain on near-white.
// For the dark navy nav we key OUT the light background (transparent) and recolor
// the wordmark to a BRIGHT violet so it reads vivid and crisp on dark.
const src = 'assets/milehighlogo.png';
const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const ch = info.channels; // 4
// Perceived-luminance alpha ramp: bright (white) background -> transparent,
// dark/colored (violet wordmark) -> opaque. Anti-aliased edges blend smoothly.
const OPAQUE_BELOW = 150; // L at/below this -> fully opaque (the wordmark)
const CLEAR_ABOVE = 205; // L at/above this -> fully transparent (white bg)
// Brand violet to paint the wordmark (matches the one brand violet #7c5cff).
const FG = [124, 92, 255];
for (let i = 0; i < data.length; i += ch) {
  const lum = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
  let a = (CLEAR_ABOVE - lum) / (CLEAR_ABOVE - OPAQUE_BELOW);
  a = a < 0 ? 0 : a > 1 ? 1 : a;
  data[i] = FG[0];
  data[i + 1] = FG[1];
  data[i + 2] = FG[2];
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
