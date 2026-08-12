import fs from 'fs';
import path from 'path';
import { INITIAL_ARTICLES } from '../src/data/articles';
import { INITIAL_OPPORTUNITIES } from '../src/data/opportunities';
import { INITIAL_MARKET_REPORTS } from '../src/data/marketReports';
import { MAIN_CATEGORIES } from '../src/data/categories';
import { AUTHORS } from '../src/data/authors';
import { CITY_CLUSTERS } from '../src/data/cityClusters';
import { INVESTMENT_TIERS } from '../src/data/investmentTiers';

const BASE_URL = 'https://bizopp.ai.studio';

const staticRoutes = [
  '/',
  '/articles/',
  '/business-ideas/',
  '/market-research/',
  '/authors/',
  '/about/',
  '/editorial-policy/',
  '/privacy-policy/',
  '/terms/',
  '/disclaimer/',
  '/contact/',
  '/submit-opportunity/',
  '/sitemap/',
];

function generateSitemapXml(): string {
  const urls: { loc: string; priority: string; changefreq: string }[] = [];

  // Static routes
  staticRoutes.forEach(route => {
    const isHome = route === '/';
    urls.push({
      loc: `${BASE_URL}${route}`,
      priority: isHome ? '1.0' : '0.8',
      changefreq: isHome ? 'daily' : 'weekly',
    });
  });

  // Articles
  INITIAL_ARTICLES.forEach(a => {
    urls.push({
      loc: `${BASE_URL}/articles/${a.slug}`,
      priority: '0.9',
      changefreq: 'weekly',
    });
  });

  // Business Opportunities
  INITIAL_OPPORTUNITIES.forEach(o => {
    urls.push({
      loc: `${BASE_URL}/business-ideas/${o.slug}`,
      priority: '0.9',
      changefreq: 'weekly',
    });
  });

  // Market Reports
  INITIAL_MARKET_REPORTS.forEach(r => {
    urls.push({
      loc: `${BASE_URL}/market-research/${r.slug}`,
      priority: '0.9',
      changefreq: 'weekly',
    });
  });

  // Categories
  MAIN_CATEGORIES.forEach(c => {
    urls.push({
      loc: `${BASE_URL}/category/${c.slug}`,
      priority: '0.7',
      changefreq: 'weekly',
    });
  });

  // Authors
  AUTHORS.forEach(a => {
    urls.push({
      loc: `${BASE_URL}/authors/${a.slug}`,
      priority: '0.6',
      changefreq: 'monthly',
    });
  });

  // City Clusters
  CITY_CLUSTERS.forEach(c => {
    urls.push({
      loc: `${BASE_URL}/city/${c.slug}`,
      priority: '0.8',
      changefreq: 'weekly',
    });
  });

  // Investment Tiers
  INVESTMENT_TIERS.forEach(t => {
    urls.push({
      loc: `${BASE_URL}/investment/${t.slug}`,
      priority: '0.8',
      changefreq: 'weekly',
    });
  });

  const today = new Date().toISOString().substring(0, 10);

  const xmlEntries = urls
    .map(
      item => `  <url>
    <loc>${item.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlEntries}
</urlset>`;
}

function generateRobotsTxt(): string {
  return `User-agent: *
Allow: /

Sitemap: ${BASE_URL}/sitemap.xml
`;
}

function main() {
  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const distDir = path.join(process.cwd(), 'dist');

  const sitemapXml = generateSitemapXml();
  const robotsTxt = generateRobotsTxt();

  // Write to public/
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml, 'utf-8');
  fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt, 'utf-8');

  console.log('✅ Generated public/sitemap.xml and public/robots.txt');

  // If dist/ directory exists, copy there too
  if (fs.existsSync(distDir)) {
    fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml, 'utf-8');
    fs.writeFileSync(path.join(distDir, 'robots.txt'), robotsTxt, 'utf-8');
    console.log('✅ Copied sitemap.xml and robots.txt to dist/');
  }
}

main();
