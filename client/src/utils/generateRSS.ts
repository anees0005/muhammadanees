import { blogPosts } from '@/data/blogPosts';

export function generateRSSFeed(): string {
  const baseUrl = 'https://anees0005.github.io/muhammadanees';
  const currentDate = new Date().toUTCString();
  
  const items = blogPosts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 20) // Latest 20 posts
    .map(post => {
      const pubDate = new Date(post.date).toUTCString();
      const category = post.category;
      const tags = post.tags.map(tag => `<category>${escapeXml(tag)}</category>`).join('\n        ');
      
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <description>${escapeXml(post.excerpt)}</description>
      <author>anees05it@gmail.com (Muhammad Anees)</author>
      <pubDate>${pubDate}</pubDate>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      <category>${escapeXml(category)}</category>
      ${tags}
    </item>`;
    }).join('\n\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Muhammad Anees - Blog & Insights</title>
    <link>${baseUrl}/blog</link>
    <description>Expert insights on SaaS development, AI automation, web development, and digital marketing from Muhammad Anees</description>
    <language>en-us</language>
    <managingEditor>anees05it@gmail.com (Muhammad Anees)</managingEditor>
    <webMaster>anees05it@gmail.com (Muhammad Anees)</webMaster>
    <lastBuildDate>${currentDate}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${baseUrl}/og-image.jpg</url>
      <title>Muhammad Anees - Blog & Insights</title>
      <link>${baseUrl}/blog</link>
    </image>
    
${items}
    
  </channel>
</rss>`;
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

