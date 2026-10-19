import { absoluteUrl } from '../../lib/site';
import { internationalServices } from '../../data/international';

export function ServiceStructuredData({ slug }) {
  const service = internationalServices.find((item) => item.slug === slug);
  if (!service) return null;
  const data = {
    '@context': 'https://schema.org', '@type': 'Service',
    '@id': absoluteUrl(`/services/${service.slug}#service`),
    name: service.name, description: service.summary,
    url: absoluteUrl(`/services/${service.slug}`),
    areaServed: 'Worldwide',
    provider: { '@type': 'Organization', '@id': absoluteUrl('/#organization'), name: 'Algofort', url: absoluteUrl('/') },
  };
  return <script type="application/ld+json">{JSON.stringify(data).replace(/</g, '\\u003c')}</script>;
}
