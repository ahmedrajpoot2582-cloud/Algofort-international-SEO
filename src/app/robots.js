import { absoluteUrl, SITE_INDEXABLE } from '../lib/site.js';

export default function robots() {
  return {
    rules: SITE_INDEXABLE ? {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/api/'],
    } : { userAgent: '*', disallow: '/' },
    ...(SITE_INDEXABLE ? { sitemap: absoluteUrl('/sitemap.xml') } : {}),
  };
}
