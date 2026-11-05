// Checks every link in the built site (the dist/ folder).
//   npm run check-links             links within the site, including #section anchors
//   npm run check-links -- --external   also checks links to other websites (needs internet)
// Run `npm run build` first. Exits with an error if any link is broken.
import { readdir, readFile, stat } from 'node:fs/promises';
import { join } from 'node:path';

const DIST = 'dist';
const external = process.argv.includes('--external');

async function htmlFiles(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await htmlFiles(p)));
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}
const exists = async (p) => { try { await stat(p); return true; } catch { return false; } };
const pageOf = (file) => '/' + file.slice(DIST.length + 1).replace(/index\.html$/, '').replace(/\.html$/, '');

const files = await htmlFiles(DIST);
const ids = new Map(); // page path -> Set of ids
const links = [];      // { from, href }
for (const f of files) {
  const html = await readFile(f, 'utf8');
  const page = pageOf(f);
  ids.set(page, new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
  for (const m of html.matchAll(/<a\s[^>]*href="([^"]+)"/g)) links.push({ from: page, href: m[1].replace(/&amp;/g, '&') });
}

const broken = [];
const outside = new Map();
for (const { from, href } of links) {
  if (/^(mailto:|tel:|javascript:)/.test(href)) continue;
  if (/^https?:\/\//.test(href)) {
    if (/^https?:\/\/(www\.)?aiera-ts\.com/.test(href)) continue; // our own absolute links (share buttons etc.)
    if (!outside.has(href)) outside.set(href, from);
    continue;
  }
  const [pathPart, hash] = href.split('#');
  const path = pathPart === '' ? from : new URL(pathPart, 'https://x' + from).pathname;
  const target = join(DIST, decodeURIComponent(path));
  const ok = (await exists(join(target, 'index.html'))) || (await exists(target)) || (await exists(target + '.html'));
  if (!ok) { broken.push(`${from}  ->  ${href}  (page not found)`); continue; }
  if (hash) {
    const page = path.endsWith('/') || !/\.\w+$/.test(path) ? (path.endsWith('/') ? path : path + '/') : path;
    const set = ids.get(page) || ids.get(path);
    if (set && !set.has(decodeURIComponent(hash))) broken.push(`${from}  ->  ${href}  (section #${hash} not found)`);
  }
}
console.log(`Checked ${links.length} links on ${files.length} pages.`);

if (external) {
  console.log(`Checking ${outside.size} links to other websites…`);
  const check = async (url) => {
    for (const method of ['HEAD', 'GET']) {
      try {
        const r = await fetch(url, { method, redirect: 'follow', signal: AbortSignal.timeout(15000), headers: { 'user-agent': 'Mozilla/5.0 (link check)' } });
        if (r.ok) return null;
        if (method === 'GET' || ![403, 405, 501].includes(r.status)) return r.status === 403 || r.status === 429 ? null : `HTTP ${r.status}`;
      } catch (e) { if (method === 'GET') return e.name === 'TimeoutError' ? 'timed out' : 'could not connect'; }
    }
    return null;
  };
  const list = [...outside];
  for (let i = 0; i < list.length; i += 8) {
    await Promise.all(list.slice(i, i + 8).map(async ([url, from]) => { const err = await check(url); if (err) broken.push(`${from}  ->  ${url}  (${err})`); }));
  }
} else {
  console.log(`Skipped ${outside.size} links to other websites (add --external to check them).`);
}

if (broken.length) { console.log(`\n${broken.length} broken link(s):\n` + broken.map((b) => '  ' + b).join('\n')); process.exit(1); }
console.log('All links OK.');
