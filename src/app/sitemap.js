import { absoluteUrl, SITE_INDEXABLE } from '../lib/site.js';
import { markets, marketPath, internationalAlternates } from '../data/international.js';
import { insights } from '../data/insights.js';

const pages = [
  '/',
  '/about',
  '/services',
  '/services/web-development',
  '/services/brand-identity',
  '/services/saas-app-development',
  '/services/mobile-app-development',
  '/portfolio',
  '/contact',
  '/privacy-policy',
  '/terms-of-service',
  '/lp/web-development',
  '/lp/brand-agency',
  '/lp/app-development',
  '/lp/saas-app-development',
];

export default function sitemap() {
  if (!SITE_INDEXABLE) return [];
  const regionalPaths = ['/international', ...markets.map(marketPath)];
  const allPages = [...pages, ...regionalPaths, '/insights', ...insights.map((insight) => `/insights/${insight.slug}`)];
  return allPages.map((path) => ({
    url: absoluteUrl(path),
    alternates: {
      languages: Object.fromEntries(Object.entries(regionalPaths.includes(path) ? internationalAlternates() : { en: path, 'x-default': path }).map(([locale, href]) => [locale, absoluteUrl(href)])),
    },
  }));
}
