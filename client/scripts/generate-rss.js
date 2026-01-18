// Script to generate RSS feed from blog posts
// Run with: node scripts/generate-rss.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import blog posts - we'll need to compile TypeScript first or use a workaround
// For now, we'll read from a JSON export or use a different approach
// This script will be run during build time after TypeScript compilation

// Base URL - will be updated based on deployment
const baseUrl = process.env.VERCEL_URL 
  ? `https://${process.env.VERCEL_URL}` 
  : process.env.BASE_URL || 'https://muhammadanees.vercel.app';

const currentDate = new Date().toUTCString();

function escapeXml(unsafe) {
  if (!unsafe) return '';
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// This will be populated from the actual blogPosts data
// For build-time generation, we'll need to import from compiled JS or use a different method
// For now, creating a template that can be updated

// Try to read blog posts from a data file
// In production, this should import from the compiled TypeScript
let blogPosts = [];

try {
  // Try to import from the source (this will work if we compile TS first)
  // For Vercel build, we can use a different approach
  const blogPostsModule = await import('../dist/data/blogPosts.js').catch(() => null);
  if (blogPostsModule && blogPostsModule.blogPosts) {
    blogPosts = blogPostsModule.blogPosts;
  }
} catch (error) {
  console.warn('Could not import blog posts from compiled file, using fallback');
}

// Fallback: If we can't import, we'll need to manually list or use a different method
// For now, we'll create a comprehensive RSS feed structure
// The actual posts will be added during the build process

const items = blogPosts
  .sort((a, b) => new Date(b.date || b.lastUpdated || '2025-01-01').getTime() - new Date(a.date || a.lastUpdated || '2025-01-01').getTime())
  .slice(0, 50) // Include up to 50 most recent posts
  .map(post => {
    const pubDate = new Date(post.date || post.lastUpdated || new Date()).toUTCString();
    const category = post.category || 'General';
    const tags = (post.tags || []).map(tag => `        <category>${escapeXml(tag)}</category>`).join('\n');
    
    return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <description>${escapeXml(post.excerpt || post.seoDescription || '')}</description>
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
    <description>Expert insights on SaaS development, AI automation, web development, and digital marketing from Muhammad Anees. Learn about React, Next.js, TypeScript, SaaS products, and business automation.</description>
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
    
${items || '    <!-- Blog posts will be added here during build -->'}
    
  </channel>
</rss>`;

// Write to public folder
const outputPath = path.join(__dirname, '../public/feed.xml');
fs.writeFileSync(outputPath, rssContent, 'utf8');
console.log('✅ RSS feed generated successfully at:', outputPath);
console.log(`   Posts included: ${blogPosts.length}`);
