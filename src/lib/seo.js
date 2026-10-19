import { SITE_URL, SITE_INDEXABLE } from './site.js';

const siteUrl = SITE_URL;

const shareImage = {
  url: '/assets/open-graph-image.jpg',
  width: 1200,
  height: 630,
  alt: 'Algofort',
};

export function withSocialMetadata(metadata) {
  const path = metadata.alternates?.canonical || '/';

  return {
    ...metadata,
    alternates: {
      ...metadata.alternates,
      canonical: path,
      languages: metadata.alternates?.languages || { en: path, 'x-default': path },
    },
    robots: metadata.robots || { index: SITE_INDEXABLE, follow: true },
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      url: new URL(path, siteUrl).toString(),
      siteName: 'Algofort',
      type: 'website',
      images: [shareImage],
      locale: metadata.openGraph?.locale || 'en_US',
      ...metadata.openGraph,
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.title,
      description: metadata.description,
      images: [shareImage],
      ...metadata.twitter,
    },
  };
}

export function breadcrumbJsonLd(breadcrumbs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.label,
      item: new URL(crumb.href, siteUrl).toString(),
    })),
  };
}
