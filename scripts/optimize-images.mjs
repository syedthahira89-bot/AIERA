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
console.log(`optimize-images: ${made} made, ${kept} already up to date`);
