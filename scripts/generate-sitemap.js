#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const siteUrl = 'https://gustavduplessis.com';
const today = new Date().toISOString().split('T')[0];

// Static pages
const staticPages = [
  { url: '/', priority: '1.0', changefreq: 'monthly' },
  { url: '/articles', priority: '0.8', changefreq: 'weekly' },
  { url: '/projects', priority: '0.8', changefreq: 'monthly' },
  { url: '/experience', priority: '0.7', changefreq: 'monthly' },
  { url: '/lets-work-together', priority: '0.9', changefreq: 'monthly' },
  { url: '/contact', priority: '0.6', changefreq: 'monthly' }
];

// Get dynamic pages from content directories
function getContentPages() {
  const contentPages = [];
  
  // Articles
  try {
    const articlesDir = path.join(__dirname, 'src/content/articles');
    if (fs.existsSync(articlesDir)) {
      const articleFiles = fs.readdirSync(articlesDir)
        .filter(file => file.endsWith('.md') || file.endsWith('.mdx'))
        .map(file => file.replace(/\.(md|mdx)$/, ''));
      
      articleFiles.forEach(slug => {
        contentPages.push({
          url: `/articles/${slug}`,
          priority: '0.6',
          changefreq: 'yearly'
        });
      });
    }
  } catch (error) {
    console.log('No articles directory found or error reading it');
  }
  
  // Projects
  try {
    const projectsDir = path.join(__dirname, 'src/content/projects');
    if (fs.existsSync(projectsDir)) {
      const projectFiles = fs.readdirSync(projectsDir)
        .filter(file => file.endsWith('.md') || file.endsWith('.mdx'))
        .map(file => file.replace(/\.(md|mdx)$/, ''));
      
      projectFiles.forEach(slug => {
        contentPages.push({
          url: `/projects/${slug}`,
          priority: '0.6',
          changefreq: 'yearly'
        });
      });
    }
  } catch (error) {
    console.log('No projects directory found or error reading it');
  }
  
  return contentPages;
}

function generateSitemap() {
  const allPages = [...staticPages, ...getContentPages()];
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${siteUrl}${page.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  // Write to public directory
  const sitemapPath = path.join(__dirname, 'public/sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemap);
  
  console.log(`✅ Sitemap generated with ${allPages.length} pages`);
  console.log(`📍 Written to: ${sitemapPath}`);
}

generateSitemap();
