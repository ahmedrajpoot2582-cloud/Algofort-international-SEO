import assert from 'node:assert/strict';
import sitemap from '../src/app/sitemap.js';
import { markets, internationalAlternates, marketPath } from '../src/data/international.js';
import { insights } from '../src/data/insights.js';
import { absoluteUrl } from '../src/lib/site.js';

const origin = process.argv[2] || 'http://127.0.0.1:3010';
const paths = sitemap().map((entry) => new URL(entry.url).pathname);
const newPaths = [...markets.map(marketPath), '/insights', ...insights.map((insight) => `/insights/${insight.slug}`)];
const internalTargets = new Set();
for (const path of paths) {
  const response = await fetch(new URL(path, origin));
  assert.equal(response.status, 200, `${path} must return 200`);
  const html = await response.text();
  assert.match(html, /<title>[^<]+<\/title>/, `${path}: title`);
  assert.match(html, /<meta name="description" content="[^"]+"/, `${path}: description`);
  if (path.startsWith('/lp/')) continue; // Existing standalone marketing templates.
  const links = [...html.matchAll(/<link\b([^>]+)>/g)].map(([, attributes]) => Object.fromEntries([...attributes.matchAll(/([\w:-]+)="([^"]*)"/g)].map(([, name, value]) => [name.toLowerCase(), value])));
  const canonical = links.find((link) => link.rel === 'canonical')?.href;
  assert.equal(canonical ? new URL(canonical).toString() : undefined, absoluteUrl(path), `${path}: canonical`);
  assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, `${path}: one server-rendered H1`);
  const structuredData = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap(([, content]) => {
    const data = JSON.parse(content);
    return data['@graph'] || [data];
  });
  if (path === '/' || markets.some((market) => marketPath(market) === path)) {
    for (const [locale, target] of Object.entries(internationalAlternates())) {
      assert.ok(links.some((link) => link.hreflang === locale && new URL(link.href).toString() === absoluteUrl(target)), `${path}: ${locale} alternate`);
    }
  }
  if (path === '/uae') {
    assert.match(html, /<meta name="viewport" content="width=device-width, initial-scale=1"/, 'Responsive viewport without zoom restrictions');
    assert.match(html, /<meta property="og:locale" content="en_AE"/, 'UAE social locale');
    assert.match(html, /<meta property="og:locale:alternate" content="en_PK"/, 'Regional social alternate');
    const webPage = structuredData.find((node) => node['@type'] === 'WebPage');
    assert.equal(webPage?.url, absoluteUrl('/uae'), 'UAE WebPage canonical URL');
    assert.equal(webPage?.inLanguage, 'en-AE', 'UAE WebPage language');
    assert.equal(webPage?.isPartOf?.['@id'], absoluteUrl('/#website'), 'UAE WebPage belongs to main site');
    assert.ok(!html.includes('Find your location') && !html.includes('country-directory'), 'No unwanted directory section');
    assert.ok(html.includes('name="message"') && html.includes('id="sec-cta"'), 'Inline project enquiry form');
    assert.ok(!html.includes('id="uae-ecosystem"'), 'Removed Global Engineering slider stays absent');
    assert.ok(!html.includes('Global engineering &amp; delivery studio: Karachi.'), 'Removed studio note stays absent');
    for (const section of ['uae-industries', 'uae-process', 'uae-advantages', 'uae-results']) {
      assert.ok(html.includes(`id="${section}"`), `Server-rendered UAE section: ${section}`);
    }
  }
  if (newPaths.includes(path)) {
    for (const [, href] of html.matchAll(/<a\b[^>]*href="(\/[^"#]*)"/g)) internalTargets.add(new URL(href.replaceAll('&amp;', '&'), origin).pathname);
  }
}
for (const target of internalTargets) {
  const response = await fetch(new URL(target, origin));
  assert.equal(response.status, 200, `Internal link target ${target}`);
}
for (const invalidPath of ['/international/not-a-market', '/insights/not-a-guide']) {
  assert.equal((await fetch(new URL(invalidPath, origin))).status, 404, `${invalidPath}: real 404`);
}
const sitemapXml = await (await fetch(new URL('/sitemap.xml', origin))).text();
assert.equal((sitemapXml.match(/<loc>/g) || []).length, paths.length);
assert.ok(sitemapXml.includes('hreflang="en-AE"'));
for (const legacyPath of ['/ae', '/dubai', '/international', '/international/united-arab-emirates']) {
  const response = await fetch(new URL(legacyPath, origin), { redirect: 'manual' });
  assert.equal(response.status, 308, `${legacyPath}: permanent redirect`);
  assert.equal(new URL(response.headers.get('location'), origin).pathname, '/uae');
}
const oldCampaign = await fetch(new URL('/ae?utm_source=legacy', origin), { redirect: 'manual' });
assert.equal(oldCampaign.status, 308, 'Old UAE campaign URL permanently redirects');
const campaignTarget = new URL(oldCampaign.headers.get('location'), origin);
assert.equal(campaignTarget.pathname, '/uae');
assert.equal(campaignTarget.searchParams.get('utm_source'), 'legacy', 'Preserve campaign parameters on the UAE redirect');
assert.equal((await fetch(new URL('/international/canada', origin))).status, 404, 'Retired market guide');
console.log(`Rendered SEO checks passed: ${paths.length} pages, ${internalTargets.size} internal destinations, valid JSON-LD, regional alternates and unknown-route 404s.`);
