import { blogPosts } from '@/data/blogPosts';
import { getAllSaaSProducts } from '@/data/saasTools';

export function generateSitemap(baseUrl: string = 'https://muhammadanees.vercel.app'): string {
  const currentDate = new Date().toISOString().split('T')[0];

  // Static pages
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

  // Blog posts
  const blogUrls = blogPosts.map(post => ({
    url: `/blog/${post.slug}`,
    priority: post.featured ? '0.9' : '0.8',
    changefreq: 'monthly',
    lastmod: post.lastUpdated || post.date
  }));

  // Categories
  const categories = [...new Set(blogPosts.map(post => post.category))];
  const categoryUrls = categories.map(category => ({
    url: `/blog/category/${category.toLowerCase().replace(/\s+/g, '-')}`,
    priority: '0.7',
    changefreq: 'weekly',
    lastmod: currentDate
  }));

  // Tags
  const allTags = [...new Set(blogPosts.flatMap(post => post.tags))];
  const tagUrls = allTags.map(tag => ({
    url: `/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`,
    priority: '0.6',
    changefreq: 'monthly',
    lastmod: currentDate
  }));

  // SaaS products
  const saasProducts = getAllSaaSProducts();
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

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  
${urlEntries}
  
</urlset>`;
}

