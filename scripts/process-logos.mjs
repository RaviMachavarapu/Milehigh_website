// One-off: prepare logo assets for the web.
// - Mile High logo: key out the black background (use brightness as alpha),
//   trim transparent padding, resize for crisp nav display.
// - Apps Consultants logo: just optimise/copy (keep its red brand tile).
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const OUT = 'public/images';
await mkdir(OUT, { recursive: true });

// ---- Mile High AI Labs: all-white wordmark on a LIGHT background ----
// The source is a violet "MILE HIGH AI LABS" wordmark + mountain on near-white.
// We key OUT the light background (transparent) and repaint every stroke WHITE,
// because the logo sits on a violet plate in the nav/footer (white-on-violet,
// like the "Book a Free Call" button).
const src = 'assets/milehighlogo.png';
const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const ch = info.channels; // 4
// Perceived-luminance alpha ramp: bright (white) background -> transparent,
// dark/colored (violet wordmark) -> opaque. Anti-aliased edges blend smoothly.
const OPAQUE_BELOW = 150; // L at/below this -> fully opaque (the wordmark)
const CLEAR_ABOVE = 205; // L at/above this -> fully transparent (white bg)
// Precompute the anti-aliased alpha once, then emit the logo in two flat colors.
const px = data.length / ch;
const alpha = new Uint8ClampedArray(px);
for (let p = 0; p < px; p++) {
  const i = p * ch;
  const lum = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
  let a = (CLEAR_ABOVE - lum) / (CLEAR_ABOVE - OPAQUE_BELOW);
  a = a < 0 ? 0 : a > 1 ? 1 : a;
  alpha[p] = Math.round(a * 255);
}
// Build a raw RGBA buffer of the wordmark painted one flat colour.
const tinted = ([r, g, b]) => {
  const out = Buffer.alloc(px * 4);
  for (let p = 0; p < px; p++) {
    out[p * 4] = r;
    out[p * 4 + 1] = g;
    out[p * 4 + 2] = b;
    out[p * 4 + 3] = alpha[p];
  }
  return out;
};
const finish = (buf) =>
  sharp(buf, { raw: { width: info.width, height: info.height, channels: 4 } })
    .trim({ threshold: 12 }) // crop the transparent border for a tight wordmark
    .resize({ width: 560, withoutEnlargement: true })
    .sharpen({ sigma: 0.6 }) // crisp up the glyph edges after downscaling
    .png({ compressionLevel: 9 });

// WHITE wordmark — sits on the violet plate in the nav (white-on-violet).
await finish(tinted([255, 255, 255])).toFile(`${OUT}/logo-mhal.png`);
// VIOLET wordmark — used ONLY in the footer, with no plate behind it.
await finish(tinted([124, 92, 255])).toFile(`${OUT}/logo-mhal-violet.png`);

// ---- Apps Consultants: keep brand red tile, just normalise size ----
await sharp('assets/appsconsultantslogo.png')
  .resize({ width: 480, withoutEnlargement: true })
  .png({ compressionLevel: 9 })
  .toFile(`${OUT}/logo-apps-consultants.png`);

const a = await sharp(`${OUT}/logo-mhal.png`).metadata();
const b = await sharp(`${OUT}/logo-apps-consultants.png`).metadata();
console.log('logo-mhal.png', a.width + 'x' + a.height);
console.log('logo-apps-consultants.png', b.width + 'x' + b.height);
