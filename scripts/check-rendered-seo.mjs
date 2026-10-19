import assert from 'node:assert/strict';
import sitemap from '../src/app/sitemap.js';
import { markets, internationalAlternates, marketPath } from '../src/data/international.js';
import { insights } from '../src/data/insights.js';
import { absoluteUrl } from '../src/lib/site.js';

const origin = process.argv[2] || 'http://127.0.0.1:3010';
const paths = sitemap().map((entry) => new URL(entry.url).pathname);
const newPaths = ['/international', ...markets.map(marketPath), '/insights', ...insights.map((insight) => `/insights/${insight.slug}`)];
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
  for (const [, content] of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) JSON.parse(content);
  if (path === '/international' || markets.some((market) => marketPath(market) === path)) {
    for (const [locale, target] of Object.entries(internationalAlternates())) {
      assert.ok(links.some((link) => link.hreflang === locale && new URL(link.href).toString() === absoluteUrl(target)), `${path}: ${locale} alternate`);
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
assert.ok(sitemapXml.includes('hreflang="en-GB"'));
console.log(`Rendered SEO checks passed: ${paths.length} pages, ${internalTargets.size} internal destinations, valid JSON-LD, regional alternates and unknown-route 404s.`);
