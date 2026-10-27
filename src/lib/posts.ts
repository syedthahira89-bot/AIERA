import { getCollection, type CollectionEntry } from 'astro:content';
import { readingMinutes } from '../data/site';

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
