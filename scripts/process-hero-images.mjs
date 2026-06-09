// One-off: optimize the full-bleed hero background images.
// Source images in assets/ (mixed PNG/JPG, some 5-12MB) -> compressed, resized
// JPGs in public/images/heroes/. Re-run after replacing a source file in assets/.
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const OUT = 'public/images/heroes';
await mkdir(OUT, { recursive: true });

// source (in assets/)  ->  output name (in public/images/heroes/)
const JOBS = [
  ['assets/mhal-1.jpg', 'mhal-1.jpg'],
  ['assets/mhal-2.jpg', 'mhal-2.jpg'],
  ['assets/mhal-3.jpg', 'mhal-3.jpg'],
  ['assets/mhal-4.png', 'mhal-4.jpg'],
  ['assets/mhal-5.png', 'mhal-5.jpg'],
  ['assets/leadgen.png', 'leadgen.jpg'],
  ['assets/marketing.jpg', 'marketing.jpg'],
  ['assets/AIworkflows.jpg', 'hero-aiworkflows.jpg'],
];

const WIDTH = 2400; // plenty for a full-bleed hero; downscale only

for (const [src, name] of JOBS) {
  const info = await sharp(src)
    .resize({ width: WIDTH, withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(`${OUT}/${name}`);
  console.log(`${name}  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} KB`);
}

console.log('\nHero images written to', OUT);
