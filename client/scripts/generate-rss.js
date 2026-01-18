// Script to generate RSS feed from blog posts
// Run with: node scripts/generate-rss.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read blog posts data (simplified - in production, import from actual data file)
const blogPosts = [
  {
    id: '1',
    title: 'Building Scalable SaaS Products: A Complete Guide for 2025',
    slug: 'building-scalable-saas-products-complete-guide-2025',
    excerpt: 'Learn how to build scalable SaaS products from scratch. Discover architecture patterns, tech stack choices, and growth strategies that work in 2025.',
    date: '2025-01-15',
    category: 'SaaS Development',
    tags: ['SaaS', 'Development', 'Architecture']
  }
  // Add all posts here or import from data file
];

const baseUrl = 'https://anees0005.github.io/muhammadanees';
const currentDate = new Date().toUTCString();

function escapeXml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

const items = blogPosts
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 20)
  .map(post => {
    const pubDate = new Date(post.date).toUTCString();
    const category = post.category;
    const tags = post.tags.map(tag => `        <category>${escapeXml(tag)}</category>`).join('\n');
    
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

const rssContent = `<?xml version="1.0" encoding="UTF-8"?>
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

// Write to public folder
const outputPath = path.join(__dirname, '../public/feed.xml');
fs.writeFileSync(outputPath, rssContent, 'utf8');
console.log('✅ RSS feed generated successfully at:', outputPath);

