// Makes a LinkedIn carousel (a 6-slide PDF, 1080x1350) for each article, in the AIERA-TS brand style.
// Upload the PDF to LinkedIn as a "document" post and it shows as swipeable slides.
//   npm run carousels                 all articles
//   npm run carousels -- what-is-agentic-ai   just one (by file name)
// Output: linkedin/<article>.pdf and linkedin/<article>-preview.png (not stored in git).
// Needs: npm run build first (for the image copies), and Playwright with Chromium.
// On your own computer, install it once with:  npm install --no-save playwright && npx playwright install chromium
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright');
import { readdir, readFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

const POSTS = 'src/content/posts';
const OUT = 'linkedin';
const SITE = 'aiera-ts.com';
const only = process.argv.slice(2).filter((a) => !a.startsWith('-'));

// Minimal front-matter reader for the fields we need
function frontMatter(src) {
  const fm = src.split('---')[1];
  const get = (k) => (fm.match(new RegExp(`^${k}:\\s*"?(.*?)"?\\s*$`, 'm')) || [])[1];
  const list = (fm.match(/^takeaways:\n((?:\s+- .*\n?)+)/m) || [])[1] || '';
  return {
    title: get('title'), description: get('description'), topic: get('topic'), cover: get('cover'), draft: get('draft') === 'true',
    takeaways: [...list.matchAll(/^\s+- "?(.*?)"?\s*$/gm)].map((m) => m[1].replace(/\\"/g, '"')),
  };
}
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
async function dataUri(cover) {
  const name = cover.replace(/^\/images\//, '').replace(/\.\w+$/, '');
  const small = `public/images/sized/${name}-1280.webp`;
  const file = existsSync(small) ? small : join('public', cover);
  const type = file.endsWith('.webp') ? 'image/webp' : 'image/jpeg';
  return `data:${type};base64,${(await readFile(file)).toString('base64')}`;
}

const wordmark = `<span class="wm"><span class="word">A<span class="i">ı<span class="dot"></span></span>era</span><span class="badge"><span class="ts">TS</span></span></span>`;

function slides(p, img, slug) {
  const [head, ...rest] = p.title.split(/:\s+/);
  const sub = rest.join(': ');
  const total = 6;
  const foot = (n) => `<div class="foot">${wordmark}<span class="n">${n} / ${total}</span></div>`;
  const tips = p.takeaways.slice(0, 3);
  return [
    `<section class="s cover"><span class="pill">✦ ${esc(p.topic)}</span><h1>${esc(head)}</h1>${sub ? `<p class="h2">${esc(sub)}</p>` : ''}
      <div class="img"><img src="${img}"></div><p class="swipe">Swipe to learn more <b>→</b></p>${foot(1)}</section>`,
    `<section class="s"><span class="kicker">In short</span><p class="big">${esc(p.description)}</p>${foot(2)}</section>`,
    ...tips.map((t, i) => `<section class="s"><span class="num">0${i + 1}</span><span class="kicker">Key takeaway</span><p class="big">${esc(t)}</p>${foot(3 + i)}</section>`),
    `<section class="s cta"><span class="kicker">Want the full guide?</span><p class="big">Read the whole article, free, on AIERA-TS.</p>
      <p class="url">${SITE}/blog/${slug}</p><ul><li>♻️ Repost to help someone learn</li><li>💬 Tell me what you'd add</li><li>✉️ Get one idea every Thursday</li></ul>${foot(6)}</section>`,
  ].join('');
}

const CSS = `
  @page { size: 1080px 1350px; margin: 0; }
  html, body { margin: 0; }
  body { font-family: 'Inter Tight', sans-serif; color: #13261B; }
  .s { position: relative; width: 1080px; height: 1350px; box-sizing: border-box; padding: 96px 90px 150px; overflow: hidden; page-break-after: always; display: flex; flex-direction: column; justify-content: center; gap: 34px;
    background: radial-gradient(ellipse 70% 55% at 100% 0%, rgba(255,226,140,.55), transparent 60%), radial-gradient(ellipse 60% 60% at 0% 100%, rgba(120,214,166,.5), transparent 60%),
      radial-gradient(ellipse 60% 50% at 80% 60%, rgba(255,255,255,.7), transparent 60%), linear-gradient(160deg,#E4F7EA 0%,#D2F0DC 55%,#BFE6CD 100%); }
  .s::before { content: ""; position: absolute; inset: 0; background-image: radial-gradient(rgba(23,96,60,.12) 1.4px, transparent 1.8px); background-size: 30px 30px; }
  .s > * { position: relative; }
  .pill { align-self: flex-start; font-size: 26px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: #17603C; padding: 12px 24px; border-radius: 999px; background: rgba(255,255,255,.85); border: 1.5px solid rgba(23,96,60,.25); }
  h1 { margin: 0; font-size: 104px; line-height: .98; font-weight: 800; letter-spacing: -.035em;
    background: linear-gradient(180deg,#5CCB8F 0%,#2F9A62 30%,#17603C 62%,#0F4A2C 100%); -webkit-background-clip: text; background-clip: text; color: transparent; filter: drop-shadow(0 3px 0 rgba(255,255,255,.9)); }
  .h2 { margin: -6px 0 0; font-family: 'Instrument Serif', serif; font-style: italic; font-size: 58px; line-height: 1.05; color: #13452C; }
  .img { border-radius: 30px; overflow: hidden; box-shadow: 0 0 0 6px #fff, 0 0 0 9px rgba(245,204,78,.9), 0 30px 60px rgba(23,96,60,.25); }
  .img img { display: block; width: 100%; aspect-ratio: 16/9; object-fit: cover; }
  .swipe { margin: 0; font-size: 30px; font-weight: 700; color: #17603C; } .swipe b { color: #C98F14; }
  .kicker { font-size: 28px; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; color: #C98F14; }
  .num { font-size: 210px; font-weight: 800; line-height: .8; letter-spacing: -.05em; background: linear-gradient(180deg,#FFF1B8,#F5CC4E 45%,#C98F14); -webkit-background-clip: text; background-clip: text; color: transparent; filter: drop-shadow(0 4px 0 rgba(255,255,255,.9)); }
  .big { margin: 0; font-family: 'Instrument Serif', serif; font-size: 72px; line-height: 1.14; color: #0F2E1D; }
  .url { margin: 0; align-self: flex-start; font-size: 34px; font-weight: 700; color: #fff; padding: 18px 30px; border-radius: 999px; background: linear-gradient(180deg,#36A86B,#11502F); box-shadow: inset 0 2px 0 rgba(255,255,255,.45), 0 12px 26px rgba(15,74,44,.3); }
  ul { margin: 6px 0 0; padding: 0; list-style: none; display: grid; gap: 16px; font-size: 34px; font-weight: 600; color: #1F4A33; }
  .foot { position: absolute; left: 90px; right: 90px; bottom: 64px; display: flex; align-items: center; justify-content: space-between; }
  .n { font-size: 26px; font-weight: 700; color: #4D6355; }
  .wm { display: inline-flex; align-items: center; gap: .26em; font-size: 54px; font-weight: 700; letter-spacing: -.03em; line-height: 1; }
  .word { background: linear-gradient(180deg,rgba(255,255,255,.55) 0%,rgba(255,255,255,0) 46%), linear-gradient(180deg,#2F9A62 0%,#17603C 55%,#0F4A2C 100%); -webkit-background-clip: text; background-clip: text; color: transparent; padding-block: .08em; }
  .i { position: relative; display: inline-block; background: inherit; -webkit-background-clip: text; background-clip: text; }
  .dot { position: absolute; left: 50%; top: -.02em; width: .27em; height: .27em; border-radius: 50%; transform: translateX(-50%); background: radial-gradient(circle at 34% 30%,#FFF6C8 0 18%,#F5CC4E 42%,#C98F14 100%); }
  .badge { font-size: .62em; letter-spacing: .04em; padding: .32em .6em .34em; border-radius: 999px; background: linear-gradient(180deg,#36A86B,#11502F); box-shadow: inset 0 1px 0 rgba(255,255,255,.45); }
  .ts { background: linear-gradient(180deg,#FFF4C2 0%,#F5CC4E 40%,#C98F14 68%,#F0C75A 100%); -webkit-background-clip: text; background-clip: text; color: transparent; }
`;

await mkdir(OUT, { recursive: true });
const files = (await readdir(POSTS)).filter((f) => f.endsWith('.md') && (!only.length || only.includes(f.replace(/\.md$/, ''))));
const browser = await chromium.launch();
for (const f of files) {
  const slug = f.replace(/\.md$/, '');
  const p = frontMatter(await readFile(join(POSTS, f), 'utf8'));
  if (p.draft || !p.cover || p.takeaways.length < 3) { console.log(`skip ${slug} (needs a cover and three takeaways)`); continue; }
  const html = `<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:wght@500;600;700;800&display=swap"><style>${CSS}</style></head><body>${slides(p, await dataUri(p.cover), slug)}</body></html>`;
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 } });
  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({ path: join(OUT, `${slug}.pdf`), width: '1080px', height: '1350px', printBackground: true });
  await page.screenshot({ path: join(OUT, `${slug}-preview.png`), clip: { x: 0, y: 0, width: 1080, height: 1350 } });
  await page.close();
  console.log(`made ${OUT}/${slug}.pdf`);
}
await browser.close();
