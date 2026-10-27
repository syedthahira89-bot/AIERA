# AIERA

The AIERA blog (aiera.com), built with [Astro](https://astro.build). It explains how AI and machine learning work for curious readers.

## Run it locally

Requires Node.js 22.23.4 or newer.

```bash
npm install
npm run dev       # http://localhost:4321, reloads as you edit
npm run build     # static site written to dist/
npm run preview   # serve the built site
```

## Write a new article

Add a Markdown file to `src/content/posts/`. The file name becomes the URL, so `my-post.md` is published at `/blog/my-post/`.

```markdown
---
title: "Your article title"
description: "One or two sentences shown in lists, search results and link previews."
pubDate: 2026-11-05
topic: LLMs              # one of the topics in src/data/site.ts
level: Beginner          # Beginner, Intermediate or Advanced
cover: /images/my-cover.jpg       # optional, put the file in public/images/
coverAlt: "What the image shows"  # describe the cover for screen readers
featured: false          # true puts it in the home page hero
draft: false             # true hides it from the built site
updatedDate: 2026-11-20  # optional, shows "Updated ..." on the article
---

Write the article here. Use ## headings: they build the table of contents.

Inline math: $E = mc^2$. Block math:

$$
L(x) = x^2
$$
```

Reading time is calculated automatically. Code blocks get syntax highlighting and a copy button.

## Where things live

| What | File |
| --- | --- |
| Site name, tagline, email, social links, newsletter endpoint | `src/data/site.ts` |
| Topics and learning paths | `src/data/site.ts` |
| Colours, fonts, spacing | `src/styles/global.css` |
| Logo and images | `public/images/` |
| Home page | `src/pages/index.astro` |
| About, Contact, Privacy | `src/pages/*.astro` |

## Before launch

- [x] Write your own story in `src/pages/about.astro`.
- [ ] Set the real email and social links in `src/data/site.ts`.
- [ ] Connect the newsletter: paste your provider's form URL into `newsletterAction` in `src/data/site.ts`. Until then the form tells visitors signups are not open yet.
- [ ] Review `src/pages/privacy.astro` against the services you actually use.
- [ ] Replace or expand the sample articles.

## Deploy

The build is a plain static site, so any static host works. Node.js 22.23.4 is pinned in `.nvmrc`.

- **Netlify** (recommended): import the GitHub repo. `netlify.toml` already sets the build command (`npm run build`), the output folder (`dist`) and the Node version, so the defaults just work.
- **Vercel**: import the repo, choose the Astro preset, and set the Node.js version to 22.x in Project Settings.
- **Cloudflare Pages**: build command `npm run build`, output folder `dist`, and the environment variable `NODE_VERSION=22.23.4`.

Then point the `aiera.com` domain at the host. RSS (`/rss.xml`) and a sitemap (`/sitemap-index.xml`) are generated automatically.
