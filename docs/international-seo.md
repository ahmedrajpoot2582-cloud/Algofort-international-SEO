# Algofort country landing pages

## Current scope

Country priority: UAE, then UK, then USA. Build and review the UAE page first. The worldwide directory, country search and generic market guides have been removed.

- /uae is a service landing page with web design/development, four core services, existing portfolio work, UAE customer-journey considerations, process, FAQs and an inline enquiry form.
- /international and /international/united-arab-emirates permanently redirect to /uae.
- Other retired market-guide URLs return 404 and are excluded from the sitemap.
- UK and USA pages follow the UAE review; no placeholder pages are published.

The page reuses Header, Footer, PageBanner, SmoothScroll, Cursor, BackToTop and ContactSection. PageBanner accepts optional content for the UAE hero. Other pages retain their existing banner layout. Portfolio assets come from the repository; no UAE client relationship, local office or numerical result is invented.

## SEO and validation

The UAE page has a distinct title, description, canonical URL, English/UAE alternate, Open Graph metadata and Service/FAQ structured data. Its service area is United Arab Emirates; the studio remains Karachi. The production sitemap source now has 20 canonical page URLs. Country configuration is in src/data/markets.js.

Run npm run check:seo, npm run lint and npm run build. For a running indexable local build, run node scripts/check-rendered-seo.mjs. Checks cover UAE-first scope, metadata, directory removal, inline form, legacy redirects and unknown-route 404s. Browser QA covers desktop/mobile layouts, anchor navigation, FAQs and enquiry context.

## Repository and hosting

Source snapshot: https://github.com/algofort/algofort at 8f04c25d853cb30c11bd6fb96f4955845d1b0ab3.
Destination: https://github.com/ahmedrajpoot2582-cloud/Algofort-international-SEO.
Vercel project: addiztech/algofort-international-seo.
Live preview: https://algofort-international-seo.vercel.app/uae.

GitHub is connected to Vercel. Main pushes run build/SEO checks and create preview deployments. The mirror remains noindex through NEXT_PUBLIC_SITE_INDEXABLE=false in the Vercel Production environment. Canonicals identify algofort.com. The original domain has not been repointed.

For main-domain launch, connect and verify algofort.com, configure DNS through the owner, retain NEXT_PUBLIC_SITE_URL=https://algofort.com, set NEXT_PUBLIC_SITE_INDEXABLE=true and redeploy. Verify redirects and forms before submitting the sitemap.

Firebase admin, SMTP, reCAPTCHA and other private settings must be configured through hosting to verify form submission, admin access and email. These secrets were absent from the repository and have not been copied from other projects. The UAE form uses the existing submission flow and prefills the project country.

Market keyword research, translated content, market-specific case studies, earned links and Search Console monitoring remain ongoing work; no ranking uplift is asserted.
