// Vite plugin to generate sitemap.xml and feed.xml during build
import fs from 'fs';
import path from 'path';

export default function seoPlugin() {
  return {
    name: 'seo-generator',
    writeBundle() {
      // This runs after the build is complete
      // We'll generate sitemap and RSS here
      console.log('Generating SEO files...');
    }
  };
}

