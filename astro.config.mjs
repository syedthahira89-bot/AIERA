// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export default defineConfig({
  site: 'https://aiera.com',
  integrations: [sitemap()],
  markdown: {
    // remark/rehype pipeline so articles can use $inline$ and $$block$$ math (rendered by KaTeX)
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    }),
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark-dimmed' },
      defaultColor: false, // emit --shiki-light / --shiki-dark so global.css follows the site theme
      wrap: false,
    },
  },
});
