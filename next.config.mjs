import { SITE_INDEXABLE } from './src/lib/site.js';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  // Avoid the seven render-blocking CSS requests measured on a cold visit.
  // Next keeps CSS assets for subsequent client-side page navigation.
  experimental: { inlineCss: true },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.algofort.com' }],
        destination: 'https://algofort.com/:path*',
        permanent: true,
      },
      { source: '/contact-us', destination: '/contact', permanent: true },
      { source: '/our-services', destination: '/services', permanent: true },
      { source: '/projects', destination: '/portfolio', permanent: true },
      { source: '/privacy', destination: '/privacy-policy', permanent: true },
      { source: '/terms', destination: '/terms-of-service', permanent: true },
      { source: '/web-development', destination: '/services/web-development', permanent: true },
      { source: '/brand-identity', destination: '/services/brand-identity', permanent: true },
      { source: '/mobile-app', destination: '/services/mobile-app-development', permanent: true },
      { source: '/mobile-app-development', destination: '/services/mobile-app-development', permanent: true },
      { source: '/saas-app', destination: '/services/saas-app-development', permanent: true },
      { source: '/saas-app-development', destination: '/services/saas-app-development', permanent: true },
      { source: '/lp/web-development/index.html', destination: '/lp/web-development', permanent: true },
      { source: '/lp/brand-agency/index.html', destination: '/lp/brand-agency', permanent: true },
      { source: '/lp/app-development/index.html', destination: '/lp/app-development', permanent: true },
      { source: '/lp/saas-app-development/index.html', destination: '/lp/saas-app-development', permanent: true },
    ];
  },
  async rewrites() {
    return [
      { source: '/lp/web-development', destination: '/lp/web-development/index.html' },
      { source: '/lp/brand-agency', destination: '/lp/brand-agency/index.html' },
      { source: '/lp/app-development', destination: '/lp/app-development/index.html' },
      { source: '/lp/saas-app-development', destination: '/lp/saas-app-development/index.html' },
    ];
  },
  async headers() {
    return [
      {
        source: '/ae',
        headers: [{
          key: 'Link',
          // Start the hero image and fonts before the inlined stylesheet arrives.
          value: [
            '</assets/68ee74b7102caefef6ce7890_2F68f23d0b14d2158ab1fa8dea_14471915_3840_2160_30fps_20_281_29-poster-00001.jpg>; rel=preload; as=image; fetchpriority=high',
            '</assets/68f24a7e02445111cfe6382d_Mona-Sans-BoldNarrow.woff2>; rel=preload; as=font; type="font/woff2"; crossorigin',
            '</assets/68f243b1931a07b0823ded78_Mona-Sans-Regular.woff2>; rel=preload; as=font; type="font/woff2"; crossorigin',
            '</assets/68f243c27b60d703ec78917e_Mona-Sans-Medium.woff2>; rel=preload; as=font; type="font/woff2"; crossorigin',
          ].join(', '),
        }],
      },
      {
        source: '/fonts/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/assets/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=604800, stale-while-revalidate=86400' }],
      },
      {
        source: '/lp/:page/assets/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/:path*',
        headers: [
          ...(!SITE_INDEXABLE ? [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] : []),
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Strict-Transport-Security', value: 'max-age=31536000' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Content-Security-Policy',
            value: "base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'",
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
