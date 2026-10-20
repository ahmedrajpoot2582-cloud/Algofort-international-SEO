# Algofort country landing pages

## Current scope

Country priority: UAE, then UK, then USA. Build and review the UAE page first. The worldwide directory, country search and generic market guides have been removed.

- /ae uses the owner-supplied Dubai/UAE copy: regional hero and social strip, about, four home-style services, six illustrated delivery steps, showreel, five testimonials, seven FAQs and the existing project form.
- Additional owner-supplied content covers six industries, four expandable UAE integration topics, four collaboration advantages, five technology groups and three success stories. Content and result metrics are in src/data/uae-sections.js; styles remain scoped to the UAE page.
- /uae and /dubai permanently redirect to /ae, preserving previous entry URLs while keeping one canonical UAE page.
- /international and /international/united-arab-emirates permanently redirect to /ae.
- Other retired market-guide URLs return 404 and are excluded from the sitemap.
- UK and USA pages follow the UAE review; no placeholder pages are published.

The page reuses Header, Footer, PageBanner, ServicesSection, ShowreelSection, TestimonialsSection, FaqSection, CtaSection, SmoothScroll, Cursor and BackToTop. Shared components accept optional content props while retaining their homepage defaults. Regional copy lives in src/data/uae.js. Empty counters from the brief are omitted rather than assigned invented values. The delivery studio remains Karachi.

## SEO and validation

The UAE page has a distinct title, description, canonical URL, reciprocal en-AE/en-PK and x-default alternates, Open Graph metadata and ProfessionalService/FAQ structured data. Its service area is United Arab Emirates; the studio remains Karachi. The production sitemap source now has 20 canonical page URLs. Country configuration is in src/data/markets.js.

Run npm run check:seo, npm run lint and npm run build. For a running indexable local build, run node scripts/check-rendered-seo.mjs. Checks cover UAE-first scope, metadata, directory removal, inline form, legacy redirects and unknown-route 404s. Browser QA covers desktop/mobile layouts, anchor navigation, FAQs and enquiry context.

## Repository and hosting

Source snapshot: https://github.com/algofort/algofort at 8f04c25d853cb30c11bd6fb96f4955845d1b0ab3.
Destination: https://github.com/ahmedrajpoot2582-cloud/Algofort-international-SEO.
Vercel project: addiztech/algofort-international-seo.
Live preview: https://algofort-international-seo.vercel.app/ae.

GitHub is connected to Vercel. Main pushes run build/SEO checks and create preview deployments. The mirror remains noindex through NEXT_PUBLIC_SITE_INDEXABLE=false in the Vercel Production environment. Canonicals identify algofort.com. The original domain has not been repointed.

For main-domain launch, connect and verify algofort.com, configure DNS through the owner, retain NEXT_PUBLIC_SITE_URL=https://algofort.com, set NEXT_PUBLIC_SITE_INDEXABLE=true and redeploy. Verify redirects and forms before submitting the sitemap.

Firebase admin, SMTP, reCAPTCHA and other private settings must be configured through hosting to verify form submission, admin access and email. These secrets were absent from the repository and have not been copied from other projects. The UAE form uses the existing submission flow and prefills the project country.

Market keyword research, translated content, market-specific case studies, earned links and Search Console monitoring remain ongoing work; no ranking uplift is asserted.

## UAE motion and loading (20 October 2026)

The UAE page uses a native intersection observer to reveal whole section headings and cards once. It avoids paragraph character splitting, leaves server-rendered content visible, honors reduced motion and pauses offscreen marquee/sonar loops. Desktop keeps Lenis wheel and anchor scrolling; small screens use native momentum and CSS anchor scrolling. The hero poster is preloaded locally and the decorative video stays off on small screens. Service hover setup and FAQ divider effects initialize near their sections; touch devices omit service mouse-follow effects. Header route prefetching is disabled for UAE only.

Testimonials use an upright responsive grid. Duplicate outer/inner section padding was removed: the testimonial-to-FAQ gap measures 80px at 1440px and 56px at 390px, instead of 368px in the previous desktop page. No horizontal overflow was found at 390px, 768px or 1440px. FAQ expansion and back-to-top navigation were checked.

Local production-build Lighthouse 13.5.0 diagnostics: desktop 95 (LCP 1.1s, TBT 40ms); optimized simulated mobile 64 (LCP 5.4s, TBT 250ms, CLS 0). These are lab measurements, not field Core Web Vitals or search rankings. Mobile render-blocking shared theme CSS and font loading remain the largest opportunity. Production hosting uses a different network stack, so deployed measurements should be checked separately.

Validation: Next production build, lint (existing warnings only), source SEO checks and rendered checks covering 20 pages, 16 internal destinations, metadata, JSON-LD, regional alternates, legacy redirects and unknown-route 404s passed. Backend form delivery remains subject to the hosting settings described above.
