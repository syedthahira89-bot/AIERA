// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import sharp from 'sharp';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// Tell search engines when each article last changed: updatedDate, or pubDate if it has never been updated
const lastChanged = new Map(
  readdirSync('src/content/posts').filter((f) => f.endsWith('.md')).map((f) => {
    const fm = readFileSync(`src/content/posts/${f}`, 'utf8').split('---')[1];
    const date = (fm.match(/^updatedDate:\s*(\S+)/m) || fm.match(/^pubDate:\s*(\S+)/m) || [])[1];
    return [`/blog/${f.replace(/\.md$/, '')}/`, date];
  }),
);
// The glossary has no front matter, so its date comes from GLOSSARY_UPDATED in src/data/glossary.ts
const glossaryDate = (readFileSync('src/data/glossary.ts', 'utf8').match(/GLOSSARY_UPDATED = '([^']+)'/) || [])[1];
if (glossaryDate) lastChanged.set('/glossary/', glossaryDate);
const withLastmod = (item) => {
  const date = lastChanged.get(new URL(item.url).pathname);
  return date ? { ...item, lastmod: new Date(date).toISOString() } : item;
};

// Link the first mention of each glossary word in an article straight to its glossary entry.
// Skips headings, code, maths, existing links and the "Sources & further reading" section.
// To add a word, add [term exactly as in src/data/glossary.ts, matching pattern] below.
const GLOSSARY_LINKS = [
  ['Adam', 'Adam'],
  ['Benchmark', 'benchmarks?'],
  ['Byte-pair encoding', 'byte-pair encoding'],
  ['Classifier-free guidance', 'classifier-free guidance'],
  ['Computer vision', 'computer vision'],
  ['Concept drift', 'concept drift'],
  ['Convolution', 'convolutions?'],
  ['Data drift', 'data drift'],
  ['Deep learning', 'deep learning'],
  ['Diffusion model', 'diffusion models?'],
  ['Dropout', 'dropout'],
  ['Early stopping', 'early stopping'],
  ['Embedding', 'embeddings?'],
  ['Ensemble forecast', 'ensemble forecasts?'],
  ['Feature map', 'feature maps?'],
  ['Fine-tuning', 'fine-tun(?:ing|ed)'],
  ['Generative AI', 'generative AI'],
  ['Goodhart’s law', 'Goodhart[’\']s law'],
  ['Gradient descent', 'gradient descent'],
  ['Graph neural network', 'graph neural networks?'],
  ['Hallucination', 'hallucinations?'],
  ['Human in the loop', 'human[- ]in[- ]the[- ]loop'],
  ['Isolation Forest', 'Isolation Forest'],
  ['scikit-learn', 'scikit-learn'],
  ['Large language model (LLM)', 'large language models?|LLMs?'],
  ['Learning rate', 'learning rates?'],
  ['Machine learning (ML)', 'machine learning'],
  ['Multi-head attention', 'multi-head attention'],
  ['Natural language processing (NLP)', 'natural language processing'],
  ['Neural network', 'neural networks?'],
  ['Overfitting', 'overfitting'],
  ['Reinforcement learning', 'reinforcement learning'],
  ['Reward model', 'reward models?'],
  ['Softmax', 'softmax'],
  ['Specification gaming', 'specification gaming'],
  ['Test set', 'test sets?'],
  ['Token', 'tokens?'],
  ['Training data', 'training data'],
  ['Transformer', 'transformers?'],
  ['Turing test', 'Turing test'],
  ['Validation loss', 'validation loss'],
  ['Weight decay', 'weight decay'],
];
const unq = (v) => v.replace(/\\'/g, "'");
const glossaryDefs = new Map([...readFileSync('src/data/glossary.ts', 'utf8').matchAll(/term: '((?:[^'\\]|\\.)*)', definition: '((?:[^'\\]|\\.)*)'/g)].map((m) => [unq(m[1]), unq(m[2])]));
const glossaryTerms = new Set(glossaryDefs.keys());
for (const [term] of GLOSSARY_LINKS) if (!glossaryTerms.has(term)) throw new Error(`Glossary link "${term}" is not a glossary term`);
const termId = (term) => term.toLowerCase().replace(/[’']/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const glossaryPatterns = GLOSSARY_LINKS.map(([term, pattern]) => ({ id: termId(term), term, re: new RegExp(`^(?:${pattern})$`, 'i') }))
  .sort((a, b) => b.term.length - a.term.length);
const glossaryRe = new RegExp(`(?<![\\w-])(${GLOSSARY_LINKS.map(([, p]) => p).sort((a, b) => b.length - a.length).join('|')})(?![\\w-])`, 'gi');
const SKIP = new Set(['a', 'code', 'pre', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'script', 'style', 'kbd', 'svg']);
const text = (n) => (n.type === 'text' ? n.value : (n.children || []).map(text).join(''));

function rehypeGlossaryLinks() {
  return (tree) => {
    const used = new Set();
    const findExisting = (n) => {
      const href = n.type === 'element' && n.tagName === 'a' ? String(n.properties?.href || '') : '';
      const m = href.match(/^\/glossary\/#(.+)$/);
      if (m) used.add(m[1]);
      (n.children || []).forEach(findExisting);
    };
    findExisting(tree);
    const visit = (node) => {
      if (!node.children) return;
      const out = [];
      for (const child of node.children) {
        if (child.type === 'text') {
          let last = 0;
          const value = child.value;
          for (const m of value.matchAll(glossaryRe)) {
            const hit = glossaryPatterns.find((g) => g.re.test(m[0]));
            if (!hit || used.has(hit.id)) continue;
            used.add(hit.id);
            if (m.index > last) out.push({ type: 'text', value: value.slice(last, m.index) });
            out.push({ type: 'element', tagName: 'a', properties: { href: `/glossary/#${hit.id}`, className: ['gloss'], title: `${hit.term}: ${glossaryDefs.get(hit.term)}` }, children: [{ type: 'text', value: m[0] }] });
            last = m.index + m[0].length;
          }
          if (last === 0) out.push(child);
          else if (last < value.length) out.push({ type: 'text', value: value.slice(last) });
        } else {
          const cls = [].concat(child.properties?.className || []);
          if (!(child.type === 'element' && (SKIP.has(child.tagName) || cls.some((c) => String(c).startsWith('katex'))))) visit(child);
          out.push(child);
        }
      }
      node.children = out;
    };
    // Stop at the "Sources & further reading" heading so source titles stay as they are
    for (const child of tree.children) {
      if (child.type === 'element' && child.tagName === 'h2' && /^sources/i.test(text(child).trim())) break;
      if (child.type === 'element' && SKIP.has(child.tagName)) continue;
      visit({ children: [child] });
    }
  };
}

// Pictures inside articles load only when the reader scrolls near them
// and, where smaller copies exist (scripts/optimize-images.mjs), each screen picks the right size
// They also get their width and height, so the page reserves the right space before they load (no jumping)
function rehypeLazyImages() {
  const sized = [];
  const walk = (node) => {
    if (node.type === 'element' && node.tagName === 'img') {
      node.properties = { loading: 'lazy', decoding: 'async', ...node.properties };
      const local = String(node.properties.src || '').match(/^\/images\/[^/]+\.(jpe?g|png|webp)$/i);
      if (local && !node.properties.width) sized.push(node);
      const m = String(node.properties.src || '').match(/^\/images\/([^/]+)\.(jpe?g|png)$/i);
      if (m) {
        const set = [400, 800, 1280, 1920].filter((w) => existsSync(`public/images/sized/${m[1]}-${w}.webp`));
        if (set.length) {
          node.properties.srcSet = set.map((w) => `/images/sized/${m[1]}-${w}.webp ${w}w`).join(', ');
          node.properties.sizes = '(max-width: 800px) 100vw, 720px';
        }
      }
    }
    (node.children || []).forEach(walk);
  };
  return async (tree) => {
    walk(tree);
    for (const node of sized) {
      const { width, height } = await sharp(`public${node.properties.src}`).metadata();
      if (width && height) Object.assign(node.properties, { width, height });
    }
  };
}

export default defineConfig({
  site: 'https://aiera-ts.com',
  integrations: [sitemap({ serialize: withLastmod })],
  markdown: {
    // remark/rehype pipeline so articles can use $inline$ and $$block$$ math (rendered by KaTeX)
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex, rehypeGlossaryLinks, rehypeLazyImages],
    }),
    shikiConfig: {
      themes: { light: 'github-light-high-contrast', dark: 'github-dark-dimmed' },
      defaultColor: false, // emit --shiki-light / --shiki-dark so global.css follows the site theme
      wrap: false,
    },
  },
});
