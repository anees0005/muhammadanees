// Build-time script to generate sitemap.xml and feed.xml
// This runs after TypeScript compilation, so we can import from dist

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Base URL - use environment variable or default
const baseUrl = process.env.VERCEL_URL 
  ? `https://${process.env.VERCEL_URL}` 
  : process.env.BASE_URL || 'https://muhammadanees.vercel.app';

async function generateSEOFiles() {
  try {
    // Import from compiled dist folder
    const distPath = path.join(__dirname, '../dist');
    
    // Try to import the utilities
    let generateRSS, generateSitemap;
    
    try {
      const rssModule = await import('../dist/utils/generateRSS.js');
      generateRSS = rssModule.generateRSSFeed;
    } catch (e) {
      console.warn('Could not import RSS generator, using fallback');
    }
    
    try {
      const sitemapModule = await import('../dist/utils/generateSitemap.js');
      generateSitemap = sitemapModule.generateSitemap;
    } catch (e) {
      console.warn('Could not import sitemap generator, using fallback');
    }

    // Generate RSS feed
    if (generateRSS) {
      const rssContent = generateRSS();
      const rssPath = path.join(__dirname, '../public/feed.xml');
      fs.writeFileSync(rssPath, rssContent, 'utf8');
      console.log('✅ RSS feed generated:', rssPath);
    }

    // Generate sitemap
    if (generateSitemap) {
      const sitemapContent = generateSitemap(baseUrl);
      const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
      fs.writeFileSync(sitemapPath, sitemapContent, 'utf8');
      console.log('✅ Sitemap generated:', sitemapPath);
    }

    console.log('✅ SEO files generation complete!');
  } catch (error) {
    console.error('❌ Error generating SEO files:', error);
    // Don't fail the build if SEO generation fails
    process.exit(0);
  }
}

generateSEOFiles();

