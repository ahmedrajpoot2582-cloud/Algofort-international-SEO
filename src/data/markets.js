import { uaeContent } from './uae.js';

export const countryPriorities = ['United Arab Emirates', 'United Kingdom', 'United States'];

// Publish one complete landing page at a time; UK and USA follow the UAE review.
export const markets = [{
  slug: 'united-arab-emirates', path: '/uae', code: 'AE', locale: 'en-AE',
  name: 'United Arab Emirates', shortName: 'UAE',
  title: uaeContent.title,
  description: uaeContent.description,
}];
export const marketPath = (market) => market.path;
export const getMarket = (slug) => markets.find((market) => market.slug === slug);
export const internationalAlternates = () => ({ 'en-AE': '/uae', 'en-PK': '/', 'x-default': '/' });
