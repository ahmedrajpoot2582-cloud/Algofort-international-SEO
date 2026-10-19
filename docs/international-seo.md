# International SEO implementation

## Source and destination

Source: https://github.com/algofort/algofort at commit `8f04c25d853cb30c11bd6fb96f4955845d1b0ab3`.

Destination requested by the owner: https://github.com/ahmedrajpoot2582-cloud/Algofort-international-SEO.

The original Git history transfer stalled. The initial commit imports the pinned source snapshot; original assets were downloaded from the same revision. `scripts/verify-source-assets.mjs` verifies original asset Git hashes, excluding rebuilt `public/lp` outputs. No source history was rewritten or pushed back to the original repository.

## Available routes

- `/international`: worldwide service overview, eight linked market guides, and a searchable directory of 249 ISO countries/territories.
- `/international/united-states`
- `/international/united-kingdom`
- `/international/united-arab-emirates`
- `/international/canada`
- `/international/australia`
- `/international/germany`
- `/international/singapore`
- `/international/saudi-arabia`
- `/insights` and three practical project-planning/localization guides.

The existing four service pages remain the global commercial destinations. Each now links to the international section and includes Service structured data. Footer links connect the new hubs to the rest of the website. Selecting a country without a separate guide opens `/contact?country=...` and prefills the enquiry message; it does not manufacture an empty country page.

## International targeting

All pages are currently English. Market guides contain distinct regional project-planning details. `en`, `en-US`, `en-GB`, `en-AE`, `en-CA`, `en-AU`, `en-DE`, `en-SG`, `en-SA` and `x-default` are reciprocal alternates between the corresponding overview pages, included in HTML and the sitemap. Country codes do not imply translated language versions. No German, Arabic or French translation is claimed.

Country guides use self canonicals. Global service pages use generic English/fallback alternates and can serve visitors worldwide. There are no forced country/IP redirects. A directory entry does not represent a local office, established customer relationship or contractual availability. Project scope and requirements must be agreed with the client.

## Deployment

This repository is a Next.js server application. GitHub stores its code; GitHub Pages cannot run its API routes, Firebase admin features, forms or email delivery.

### Vercel

Import the destination GitHub repository into an authorised Vercel account. The checked-in `vercel.json` selects Next.js and the existing build command. Set the production branch to `main`. Add the private server settings described in README.md to the hosting environment. A new deployment does not inherit private values from the original host.

Configure `NEXT_PUBLIC_SITE_URL` to the final canonical origin. It defaults to `https://algofort.com`. Configure `NEXT_PUBLIC_SITE_INDEXABLE=false` for a staging mirror. Vercel preview deployments also disable indexing. Rebuild after changing these public variables.

### Existing cPanel / Node hosting

The original standalone deployment workflow is retained as **manual** dispatch so a source import does not try to publish using missing or unrelated account secrets. Configure `NAMECHEAP_SSH_KEY`, `NAMECHEAP_HOST` and `CPANEL_USERNAME` in the destination repository. Configure `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_SITE_INDEXABLE` as repository variables. Then run the workflow intentionally for that host. Preserve the private server environment on the hosting account.

The automatic `check.yml` workflow runs SEO checks, lint and a production build on main pushes and pull requests.

### Domain migration

Keep one indexable canonical production copy. If the new host is a preview for algofort.com, keep it noindex and retain algofort.com canonicals until domain cutover. Connecting the domain requires access to its hosting/DNS. If a different domain is the permanent destination, update the public origin, map old URLs and configure permanent redirects on the old host. Do not redirect the source domain until the new deployment is verified.

Static advertising LPs under `/lp` retain their existing source metadata. If changing the permanent brand domain, review those LPs and existing absolute marketing/email links too. The dynamic main-site SEO origin is centralised in `src/lib/site.js`.

## Validation and ongoing work

Run `npm ci`, `npm run check:seo`, `npm run lint`, and `npm run build`. The SEO check verifies directory completeness, sitemap uniqueness, self/reciprocal alternate coverage, deployment-origin configuration and preview indexing protection. Browser QA should include country filtering, country-to-enquiry context, desktop/mobile layouts, a market page and a planning guide. Production forms/email require the existing private server configuration and must be verified after deployment.

This is the on-site foundation, not a claim of rankings in every country. Search-volume research, competitor analysis in each market, translated content, market-specific case studies, earned references/backlinks and Search Console monitoring remain ongoing work. No traffic/ranking uplift or performance score is asserted without measured evidence.

After production deployment, inspect canonical URLs, submit `/sitemap.xml` in Search Console, and review indexed pages, queries, clicks and qualified enquiries by country. Add more country pages only when distinct customer information and a maintainable proposition are available.

## Local validation completed

- Production build passed on 19 October 2026, with all market and guide pages prerendered.
- SEO configuration checks passed for 249 directory entries, eight market guides and 28 sitemap URLs.
- Rendered HTTP checks passed for all 28 sitemap pages and 24 internal destinations, including JSON-LD parsing, canonical URLs, regional alternates and real 404s for unknown market/guide slugs.
- Original asset integrity passed for all 467 non-generated assets at the pinned source revision.
- Browser checks covered mobile and desktop rendering, no horizontal overflow at 390px, country filtering and country-to-enquiry prefill. No new browser errors were captured in the final navigation check.
- Lint completed with zero errors and warnings, including existing project warnings and Next metadata-export warnings. The warnings have not been suppressed.
- Public deployment, Search Console access, live form/email delivery and public performance scores have not been verified.
