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

At the owner's request, UAE now uses the homepage's GSAP heading and paragraph character reveals, including its exact shared animation helpers. The about copy uses the home's scroll-scrubbed character opacity. New section cards use GSAP ScrollTrigger, power3.out, 0.75s reveals and a 0.12s stagger. The banner's original GSAP entrance is enabled independently of its image/video loading options. Service mouse-follow, rolling titles/buttons, showreel expansion, FAQ dividers and CTA parallax reuse the existing site components. Offscreen setup remains deferred and marquee/sonar loops pause out of view. Desktop keeps Lenis wheel and anchor scrolling; small screens use native momentum and CSS anchor scrolling while still initializing GSAP text motion. Reduced-motion preferences disable the new card/scrub/fan effects. The local hero poster, mobile video fallback and UAE-only header prefetch setting remain in place.

Testimonials use the homepage's folded-card fan offsets, 1.2s duration and 0.1s stagger, implemented in GSAP. They stay open after the entrance to preserve the spacing fix when visitors move to FAQ. The responsive grid and removal of duplicate outer/inner padding retain an 80px desktop / 56px mobile gap after the cards settle.

Responsive text optimization: at widths up to 767px, UAE body paragraphs and about scrub animate words with GSAP, while headings retain individual letter reveals. Desktop uses the shared character animations unchanged. Paragraph glyphs do not keep permanent will-change layers. Restored/hash navigation explicitly starts visible card sequences and completes sections already passed.

Historical performance measurements before restoring full GSAP text/hero motion: local desktop 95 and mobile 64; deployed desktop 89 and mobile 80. These scores describe the earlier lightweight animation version and do not establish the performance of the current GSAP version. Mobile shared theme CSS and font loading remain opportunities. Lighthouse lab scores are not field Core Web Vitals or search rankings.

Validation: Next production build, lint (existing warnings only), source SEO checks and rendered checks covering 20 pages, 16 internal destinations, metadata, JSON-LD, regional alternates, legacy redirects and unknown-route 404s passed. Backend form delivery remains subject to the hosting settings described above.
