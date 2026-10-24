import { uaeContent } from './uae.js';
import { usaContent, pakistanContent } from './regional-content.js';

export const countryPriorities = ['United Arab Emirates', 'United States', 'Pakistan'];

// Approved regional landing pages, each with its own canonical URL and copy.
export const markets = [{
  slug: 'united-arab-emirates', path: '/uae', code: 'AE', locale: 'en-AE',
  name: 'United Arab Emirates', shortName: 'UAE',
  title: uaeContent.title,
  description: uaeContent.description,
}, ...[usaContent, pakistanContent].map(content => ({
  slug: content.code === 'US' ? 'united-states' : 'pakistan',
  path: content.path, code: content.code, locale: content.locale,
  name: content.name, shortName: content.shortName,
  title: content.title, description: content.description,
}))];
export const marketPath = (market) => market.path;
export const getMarket = (slug) => markets.find((market) => market.slug === slug);
export const internationalAlternates = () => ({
  en: '/',
  ...Object.fromEntries(markets.map(market => [market.locale, market.path])),
  'x-default': '/',
});
