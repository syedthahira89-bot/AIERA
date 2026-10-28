import { getCollection, type CollectionEntry } from 'astro:content';
import { readingMinutes, formatDate, UPCOMING } from '../data/site';

export type Post = CollectionEntry<'posts'>;

/** Published posts, newest first. Drafts show up in `astro dev` only. */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('posts', ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export const minutesFor = (post: Post) => readingMinutes(post.body);

export function relatedPosts(post: Post, all: Post[], count = 3): Post[] {
  const others = all.filter((p) => p.id !== post.id);
  const sameTopic = others.filter((p) => p.data.topic === post.data.topic);
  return [...sameTopic, ...others.filter((p) => p.data.topic !== post.data.topic)].slice(0, count);
}

export type Planned = (typeof UPCOMING)[number];

/** Calendar entries still to come: not yet published (matched by title) and dated today or later at build time. */
export function upcoming(posts: Post[]): Planned[] {
  const published = new Set(posts.map((p) => p.data.title));
  const today = new Date().toISOString().slice(0, 10);
  return UPCOMING.filter((u) => !published.has(u.title) && u.date >= today);
}

export const formatPlanned = (date: string) => formatDate(new Date(`${date}T00:00:00Z`));
