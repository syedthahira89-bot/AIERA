// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { existsSync } from 'node:fs';
import sharp from 'sharp';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

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
  integrations: [sitemap()],
  markdown: {
    // remark/rehype pipeline so articles can use $inline$ and $$block$$ math (rendered by KaTeX)
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex, rehypeLazyImages],
    }),
    shikiConfig: {
      themes: { light: 'github-light-high-contrast', dark: 'github-dark-dimmed' },
      defaultColor: false, // emit --shiki-light / --shiki-dark so global.css follows the site theme
      wrap: false,
    },
  },
});
