import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { TOPICS, LEVELS } from './data/site';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    topic: z.enum(TOPICS.map((t) => t.name) as [string, ...string[]]),
    level: z.enum(LEVELS),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    /** Up to four short bullet points shown in a Key takeaways box at the top of the article */
    takeaways: z.array(z.string()).max(4).optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
