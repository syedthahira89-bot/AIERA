// Makes lighter WebP copies of the site's images in a few widths, so each screen downloads only what it needs.
// Runs automatically before every build (see "prebuild" in package.json), on your computer and on Netlify.
// Output goes to public/images/sized/ (not stored in git; it is rebuilt each time).
import sharp from 'sharp';
import { readdir, mkdir, stat } from 'node:fs/promises';
import { join, parse } from 'node:path';

const SRC = 'public/images';
const OUT = 'public/images/sized';
export const WIDTHS = [400, 800, 1280, 1920];

await mkdir(OUT, { recursive: true });
const files = (await readdir(SRC)).filter((f) => /\.(jpe?g|png)$/i.test(f));
let made = 0, kept = 0;

for (const file of files) {
  const src = join(SRC, file);
  const { name } = parse(file);
  const { width } = await sharp(src).metadata();
  const srcTime = (await stat(src)).mtimeMs;
  for (const w of WIDTHS) {
    if (w > width) continue; // never enlarge
    const out = join(OUT, `${name}-${w}.webp`);
    try { if ((await stat(out)).mtimeMs >= srcTime) { kept++; continue; } } catch {}
    await sharp(src).resize({ width: w }).webp({ quality: 80, effort: 5 }).toFile(out);
    made++;
  }
}
// Sharing images: 1200x627, the shape LinkedIn, X and Facebook show for a shared link.
// The whole cover sits in the middle on a soft, blurred copy of itself, so nothing gets cropped.
const OG_W = 1200, OG_H = 627;
let og = 0;
for (const file of files) {
  const src = join(SRC, file);
  const { name } = parse(file);
  const { width, height } = await sharp(src).metadata();
  if (width < 1000 || width / height > 1.85) continue; // skip small images and ones already this shape
  const out = join(OUT, `${name}-og.jpg`);
  try { if ((await stat(out)).mtimeMs >= (await stat(src)).mtimeMs) continue; } catch {}
  const bg = await sharp(src).resize(OG_W, OG_H, { fit: 'cover' }).blur(28).modulate({ brightness: 0.92 }).toBuffer();
  const fgH = OG_H - 24, fgW = Math.round((width / height) * fgH);
  const fg = await sharp(src).resize(fgW, fgH).toBuffer();
  const mask = Buffer.from(`<svg width="${fgW}" height="${fgH}"><rect width="${fgW}" height="${fgH}" rx="14" fill="#fff"/></svg>`);
  const rounded = await sharp(fg).composite([{ input: mask, blend: 'dest-in' }]).png().toBuffer();
  await sharp(bg).composite([{ input: rounded, left: Math.round((OG_W - fgW) / 2), top: 12 }]).jpeg({ quality: 86, mozjpeg: true }).toFile(out);
  og++;
}
console.log(`optimize-images: ${made} made, ${kept} already up to date, ${og} sharing images`);
