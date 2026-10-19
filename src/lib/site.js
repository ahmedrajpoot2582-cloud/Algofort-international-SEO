// Set this to the final public origin when connecting the new repository to hosting.
const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://algofort.com';
const parsedUrl = new URL(configuredUrl);
if (!['https:', 'http:'].includes(parsedUrl.protocol) || parsedUrl.pathname !== '/' || parsedUrl.search || parsedUrl.hash || parsedUrl.username || parsedUrl.password) {
  throw new Error('NEXT_PUBLIC_SITE_URL must be an HTTP(S) origin without a path, credentials, query or fragment.');
}

export const SITE_URL = parsedUrl.origin;
export const SITE_INDEXABLE = process.env.NEXT_PUBLIC_SITE_INDEXABLE !== 'false' && process.env.VERCEL_ENV !== 'preview';
export const absoluteUrl = (path = '/') => new URL(path, `${SITE_URL}/`).toString();
