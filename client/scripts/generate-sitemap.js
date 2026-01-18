// Script to generate sitemap.xml from blog posts and pages
// Run with: node scripts/generate-sitemap.js or tsx scripts/generate-sitemap.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// For now, we'll create a comprehensive sitemap structure
// The actual blog posts will be added via a different method
// This script can be enhanced to read from a JSON export or use tsx
let blogPosts = [];
let saasProducts = [];

// Try to import data (will work if using tsx or after compilation)
try {
  // Attempt dynamic import - this will work with tsx or after build
  const blogData = await import('../src/data/blogPosts.ts').catch(() => 
    import('../src/data/blogPosts.js').catch(() => null)
  );
  if (blogData && blogData.blogPosts) {
    blogPosts = blogData.blogPosts;
  }
  
  const saasData = await import('../src/data/saasTools.ts').catch(() =>
    import('../src/data/saasTools.js').catch(() => null)
  );
  if (saasData && saasData.getAllSaaSProducts) {
    saasProducts = saasData.getAllSaaSProducts();
  }
} catch (error) {
  console.warn('Could not import data directly. Using fallback method.');
  // Fallback: Read from a pre-generated JSON file if available
  try {
    const dataPath = path.join(__dirname, '../src/data/data.json');
    if (fs.existsSync(dataPath)) {
      const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
      blogPosts = data.blogPosts || [];
      saasProducts = data.saasProducts || [];
    }
  } catch (e) {
    console.warn('No fallback data found. Sitemap will have static pages only.');
  }
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseUrl = process.env.VERCEL_URL 
  ? `https://${process.env.VERCEL_URL}` 
  : 'https://muhammadanees.vercel.app';

const currentDate = new Date().toISOString().split('T')[0];

// Static pages with priorities and change frequencies
const staticPages = [
  { url: '', priority: '1.0', changefreq: 'weekly', lastmod: currentDate },
  { url: '/blog', priority: '0.9', changefreq: 'daily', lastmod: currentDate },
  { url: '/saas-tools', priority: '0.9', changefreq: 'weekly', lastmod: currentDate },
  { url: '/tools', priority: '0.8', changefreq: 'weekly', lastmod: currentDate },
  { url: '/resources', priority: '0.8', changefreq: 'weekly', lastmod: currentDate },
  { url: '/resources-library', priority: '0.8', changefreq: 'weekly', lastmod: currentDate },
  { url: '/glossary', priority: '0.7', changefreq: 'monthly', lastmod: currentDate },
  { url: '/case-studies', priority: '0.8', changefreq: 'weekly', lastmod: currentDate },
];

// Generate blog post URLs
const blogUrls = blogPosts.map(post => ({
  url: `/blog/${post.slug}`,
  priority: post.featured ? '0.9' : '0.8',
  changefreq: 'monthly',
  lastmod: post.lastUpdated || post.date
}));

// Generate category pages
const categories = [...new Set(blogPosts.map(post => post.category))];
const categoryUrls = categories.map(category => ({
  url: `/blog/category/${category.toLowerCase().replace(/\s+/g, '-')}`,
  priority: '0.7',
  changefreq: 'weekly',
  lastmod: currentDate
}));

// Generate tag pages
const allTags = [...new Set(blogPosts.flatMap(post => post.tags))];
const tagUrls = allTags.map(tag => ({
  url: `/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`,
  priority: '0.6',
  changefreq: 'monthly',
  lastmod: currentDate
}));

// Generate SaaS product URLs
const saasUrls = saasProducts.map(product => ({
  url: `/saas-tools/${product.slug}`,
  priority: '0.8',
  changefreq: 'monthly',
  lastmod: currentDate
}));

// Combine all URLs
const allUrls = [
  ...staticPages,
  ...blogUrls,
  ...categoryUrls,
  ...tagUrls,
  ...saasUrls
];

// Generate XML
const urlEntries = allUrls.map(({ url, priority, changefreq, lastmod }) => {
  const fullUrl = url === '' ? baseUrl : `${baseUrl}${url}`;
  return `  <url>
    <loc>${fullUrl}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}).join('\n');

const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  
${urlEntries}
  
</urlset>`;

// Write to public folder
const outputPath = path.join(__dirname, '../public/sitemap.xml');
fs.writeFileSync(outputPath, sitemapContent, 'utf8');
console.log(`✅ Sitemap generated successfully at: ${outputPath}`);
console.log(`   Total URLs: ${allUrls.length}`);
console.log(`   - Static pages: ${staticPages.length}`);
console.log(`   - Blog posts: ${blogUrls.length}`);
console.log(`   - Categories: ${categoryUrls.length}`);
console.log(`   - Tags: ${tagUrls.length}`);
console.log(`   - SaaS products: ${saasUrls.length}`);

