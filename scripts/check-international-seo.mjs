import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { countries, markets, internationalServices, internationalAlternates, marketPath } from '../src/data/international.js';
import { insights } from '../src/data/insights.js';
import { withSocialMetadata } from '../src/lib/seo.js';
import sitemap from '../src/app/sitemap.js';
import robots from '../src/app/robots.js';
import { absoluteUrl } from '../src/lib/site.js';

assert.equal(countries.length, 249, 'Complete ISO country/territory directory');
assert.equal(new Set(countries.map((country) => country.code)).size, countries.length);
assert.equal(new Set(markets.map((market) => market.locale)).size, markets.length);
const urls = new Set(sitemap().map((entry) => entry.url));
assert.equal(urls.size, sitemap().length, 'No duplicate sitemap URLs');
for (const market of markets) {
  assert.equal(market.serviceNotes.length, internationalServices.length);
  assert.equal(market.focus.length, 3);
  assert.ok(countries.some((country) => country.code === market.code && country.market === market.slug));
  const metadata = withSocialMetadata({ title: market.title, description: market.description, alternates: { canonical: marketPath(market), languages: internationalAlternates() } });
  assert.equal(metadata.alternates.languages[market.locale], marketPath(market));
  assert.equal(metadata.openGraph.url, absoluteUrl(marketPath(market)));
}
for (const entry of sitemap()) {
  const languages = entry.alternates.languages;
  assert.ok(Object.values(languages).includes(entry.url), `Missing self alternate: ${entry.url}`);
  for (const target of Object.values(languages)) assert.ok(urls.has(target), `Alternate absent from sitemap: ${target}`);
}
for (const insight of insights) {
  assert.ok(urls.has(absoluteUrl(`/insights/${insight.slug}`)));
  assert.ok(insight.sections.length >= 4);
}
assert.equal(robots().sitemap, absoluteUrl('/sitemap.xml'));
const previewCheck = spawnSync(process.execPath, ['--input-type=module', '-e', "const { default: sitemap } = await import('./src/app/sitemap.js'); const { default: robots } = await import('./src/app/robots.js'); const { withSocialMetadata } = await import('./src/lib/seo.js'); if (sitemap().length || robots().rules.disallow !== '/' || withSocialMetadata({}).robots.index) process.exit(1);"], { cwd: process.cwd(), env: { ...process.env, NEXT_PUBLIC_SITE_INDEXABLE: 'false' } });
assert.equal(previewCheck.status, 0, 'Preview indexing protection');
const customOrigin = spawnSync(process.execPath, ['--input-type=module', '-e', "const { absoluteUrl } = await import('./src/lib/site.js'); if (absoluteUrl('/international') !== 'https://example.org/international') process.exit(1);"], { cwd: process.cwd(), env: { ...process.env, NEXT_PUBLIC_SITE_URL: 'https://example.org' } });
assert.equal(customOrigin.status, 0, 'Deployment origin configuration');
console.log(`SEO checks passed: ${countries.length} countries/territories, ${markets.length} market guides, ${urls.size} sitemap URLs, reciprocal alternates and preview protection.`);
