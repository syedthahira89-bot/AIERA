// Launch announcement images for AIERA-TS: wide (1200x627, LinkedIn/X link size) and square (1080x1080).
//   node scripts/make-launch-image.mjs      (run `npm run build` first so the small image copies exist)
// Output: linkedin/launch-wide.png and linkedin/launch-square.png (not stored in git).
import { createRequire } from 'node:module';
import { readFile, mkdir, readdir } from 'node:fs/promises';
const { chromium } = createRequire(import.meta.url)('playwright');

const uri = async (name) => `data:image/webp;base64,${(await readFile(`public/images/sized/${name}-800.webp`)).toString('base64')}`;
const count = (await readdir('src/content/posts')).filter((f) => f.endsWith('.md')).length;
const covers = await Promise.all(['cover-top-7-tools', 'cover-agentic', 'cover-nature'].map(uri));

const wordmark = `<span class="wm"><span class="word">A<span class="i">ı<span class="dot"></span></span>era</span><span class="badge"><span class="ts">TS</span></span></span>`;
const spark = (x, y, s) => `<svg class="sp" style="left:${x}px;top:${y}px;width:${s}px;height:${s}px" viewBox="-16 -16 32 32"><path d="M0 -16 C 2 -5, 5 -2, 16 0 C 5 2, 2 5, 0 16 C -2 5, -5 2, -16 0 C -5 -2, -2 -5, 0 -16 Z" fill="url(#g)"/><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFF1B8"/><stop offset=".5" stop-color="#F5CC4E"/><stop offset="1" stop-color="#C98F14"/></linearGradient></defs></svg>`;

const CSS = `
  html,body{margin:0}
  .card{position:relative;overflow:hidden;font-family:'Inter Tight',sans-serif;color:#13261B;
    background:radial-gradient(ellipse 55% 65% at 85% 30%, rgba(160,210,150,.45), transparent 62%), radial-gradient(ellipse 45% 50% at 0% 0%, rgba(245,204,78,.28), transparent 60%),
      radial-gradient(ellipse 50% 55% at 10% 100%, rgba(140,200,170,.35), transparent 60%), linear-gradient(160deg,#FBF8EF 0%,#F4F3E8 55%,#E9F1E2 100%)}
  .card::before{content:"";position:absolute;inset:0;background-image:radial-gradient(rgba(23,96,60,.08) 1px, transparent 1.4px);background-size:24px 24px}
  .live{display:inline-flex;align-items:center;gap:10px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:#fff;border-radius:999px;
    background:linear-gradient(180deg,#36A86B,#11502F);box-shadow:inset 0 1px 0 rgba(255,255,255,.45),0 8px 20px rgba(15,74,44,.28)}
  .live i{border-radius:50%;background:#F5CC4E;box-shadow:0 0 0 4px rgba(245,204,78,.35)}
  .wm{display:inline-flex;align-items:center;gap:.24em;font-weight:700;letter-spacing:-.035em;line-height:1}
  .word{background:linear-gradient(180deg,rgba(255,255,255,.55) 0%,rgba(255,255,255,0) 46%),linear-gradient(180deg,#2F9A62 0%,#17603C 55%,#0F4A2C 100%);-webkit-background-clip:text;background-clip:text;color:transparent;padding-block:.08em;filter:drop-shadow(0 3px 6px rgba(15,74,44,.2))}
  .i{position:relative;display:inline-block;background:inherit;-webkit-background-clip:text;background-clip:text}
  .dot{position:absolute;left:50%;top:-.02em;width:.27em;height:.27em;border-radius:50%;transform:translateX(-50%);background:radial-gradient(circle at 34% 30%,#FFF6C8 0 18%,#F5CC4E 42%,#C98F14 100%);box-shadow:0 0 0 .06em rgba(245,204,78,.3)}
  .badge{position:relative;font-size:.6em;letter-spacing:.04em;padding:.3em .6em .34em;border-radius:999px;background:linear-gradient(180deg,#36A86B,#11502F);box-shadow:inset 0 1px 0 rgba(255,255,255,.45),0 4px 10px rgba(15,74,44,.3)}
  .ts{background:linear-gradient(180deg,#FFF4C2 0%,#F5CC4E 40%,#C98F14 68%,#F0C75A 100%);-webkit-background-clip:text;background-clip:text;color:transparent}
  .h{font-family:'Instrument Serif',serif;line-height:1.02;color:#13452C}
  .h em{font-style:italic;color:#A87A12}
  .sub{color:#46594C;line-height:1.45;font-weight:500}
  .chips{display:flex;flex-wrap:wrap;gap:8px}
  .chips span{font-weight:600;color:#17603C;background:rgba(255,255,255,.75);border:1px solid rgba(23,96,60,.2);border-radius:999px}
  .url{display:inline-flex;align-items:center;gap:10px;font-weight:800;color:#13452C;background:#fff;border-radius:999px;border:1.5px solid rgba(201,154,46,.6);box-shadow:0 10px 24px rgba(19,38,27,.12)}
  .url b{color:#C98F14}
  .stack{position:absolute}
  .cv{position:absolute;border-radius:18px;overflow:hidden;background:#fff;box-shadow:0 0 0 5px #fff,0 26px 50px rgba(19,38,27,.25)}
  .cv img{display:block;width:100%;height:100%;object-fit:cover}
  .sp{position:absolute;filter:drop-shadow(0 0 6px rgba(245,204,78,.7))}
  .ribbon{position:absolute;font-weight:800;color:#5A3B00;background:linear-gradient(180deg,#FFE9A0,#F5B83D);border-radius:999px;box-shadow:inset 0 1px 0 rgba(255,255,255,.7),0 8px 18px rgba(201,143,20,.35)}
`;

const wide = `<div class="card" style="width:1200px;height:627px">
  <div style="position:absolute;left:72px;top:0;bottom:0;width:560px;display:flex;flex-direction:column;justify-content:center;gap:20px;z-index:2">
    <span class="live" style="align-self:flex-start;font-size:15px;padding:9px 18px"><i style="width:9px;height:9px"></i>Now live</span>
    <div style="font-size:84px">${wordmark}</div>
    <div class="h" style="font-size:46px">The bright side of AI,<br><em>made for curious minds.</em></div>
    <div class="sub" style="font-size:19px;max-width:470px">Hopeful real-world stories and jargon-free guides to how AI works. A new article every Thursday.</div>
    <div class="url" style="align-self:flex-start;font-size:20px;padding:11px 22px">aiera-ts.com <b>→</b></div>
  </div>
  <div class="stack" style="left:640px;top:0;width:560px;height:627px">
    <div class="cv" style="left:70px;top:70px;width:380px;height:214px;transform:rotate(-7deg)"><img src="${covers[0]}"></div>
    <div class="cv" style="left:150px;top:350px;width:370px;height:208px;transform:rotate(6deg)"><img src="${covers[2]}"></div>
    <div class="cv" style="left:110px;top:200px;width:410px;height:231px;transform:rotate(-1deg);z-index:2"><img src="${covers[1]}"></div>
    <span class="ribbon" style="left:340px;top:176px;z-index:3;font-size:15px;padding:8px 16px;transform:rotate(4deg)">✦ ${count} articles to explore</span>
  </div>
  ${spark(600, 84, 26)}${spark(1140, 520, 22)}${spark(1110, 60, 16)}${spark(590, 520, 14)}
</div>`;

const square = `<div class="card" style="width:1080px;height:1080px">
  <div style="position:absolute;left:84px;right:84px;top:84px;display:flex;flex-direction:column;align-items:flex-start;gap:22px;z-index:2">
    <span class="live" style="font-size:18px;padding:11px 22px"><i style="width:11px;height:11px"></i>Now live</span>
    <div style="font-size:104px">${wordmark}</div>
    <div class="h" style="font-size:60px">The bright side of AI,<br><em>made for curious minds.</em></div>
  </div>
  <div class="stack" style="left:0;top:470px;width:1080px;height:420px">
    <div class="cv" style="left:84px;top:40px;width:400px;height:225px;transform:rotate(-6deg)"><img src="${covers[0]}"></div>
    <div class="cv" style="left:600px;top:40px;width:400px;height:225px;transform:rotate(6deg)"><img src="${covers[2]}"></div>
    <div class="cv" style="left:300px;top:110px;width:480px;height:270px;z-index:2"><img src="${covers[1]}"></div>
    <span class="ribbon" style="left:640px;top:86px;z-index:3;font-size:18px;padding:9px 18px;transform:rotate(4deg)">✦ ${count} articles to explore</span>
  </div>
  <div style="position:absolute;left:84px;right:84px;bottom:76px;display:flex;align-items:center;justify-content:space-between;z-index:2">
    <div class="sub" style="font-size:22px;max-width:520px">Hopeful stories and jargon-free AI guides.<br>New article every Thursday.</div>
    <div class="url" style="font-size:24px;padding:14px 26px">aiera-ts.com <b>→</b></div>
  </div>
  ${spark(940, 110, 34)}${spark(1000, 420, 20)}${spark(60, 450, 18)}${spark(980, 900, 16)}
</div>`;

await mkdir('linkedin', { recursive: true });
const browser = await chromium.launch();
for (const [name, body, w, h] of [['launch-wide', wide, 1200, 627], ['launch-square', square, 1080, 1080]]) {
  const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 2 });
  await page.setContent(`<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:wght@500;600;700;800&display=swap"><style>${CSS}</style></head><body>${body}</body></html>`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: `linkedin/${name}.png` });
  await page.close();
  console.log(`made linkedin/${name}.png`);
}
await browser.close();
