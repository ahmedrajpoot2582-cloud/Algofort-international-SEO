export const countryPriorities = ['United Arab Emirates', 'United Kingdom', 'United States'];

// Publish one complete landing page at a time; UK and USA follow the UAE review.
export const markets = [{
  slug: 'united-arab-emirates', path: '/uae', code: 'AE', locale: 'en-AE',
  name: 'United Arab Emirates', shortName: 'UAE',
  title: 'Web Design & Development for UAE Businesses | Algofort',
  description: 'Website design, web development, brand identity and digital products for UAE businesses. Explore Algofort’s work and request a scoped project proposal.',
}];
export const marketPath = (market) => market.path;
export const getMarket = (slug) => markets.find((market) => market.slug === slug);
export const internationalAlternates = () => ({ 'en-AE': '/uae', 'x-default': '/uae' });
