import rss from '@astrojs/rss';
import { SITE } from '../data/site';
import { getPosts } from '../lib/posts';

export async function GET(context) {
  const posts = await getPosts();
  return rss({
    title: SITE.name,
    description: SITE.description,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      categories: [post.data.topic, post.data.level],
      link: `/blog/${post.id}/`,
    })),
  });
}
