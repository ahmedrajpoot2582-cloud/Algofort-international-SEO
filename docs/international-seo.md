# Algofort country landing pages

## Current scope

Country priority: UAE, then UK, then USA. Build and review the UAE page first. The worldwide directory, country search and generic market guides have been removed.

- /ae uses the owner-supplied Dubai/UAE copy: regional hero and social strip, about, four home-style services, six illustrated delivery steps, showreel, five testimonials, seven FAQs and the existing project form.
- Additional owner-supplied content covers six industries, four expandable UAE integration topics, four collaboration advantages and three success stories (the technology stack section was removed). Content and result metrics are in src/data/uae-sections.js; styles remain scoped to the UAE page.
- /uae and /dubai permanently redirect to /ae, preserving previous entry URLs while keeping one canonical UAE page.
- /international and /international/united-arab-emirates permanently redirect to /ae.
- Other retired market-guide URLs return 404 and are excluded from the sitemap.
- UK and USA pages follow the UAE review; no placeholder pages are published.

The page reuses Header, Footer, PageBanner, ServicesSection, ShowreelSection, TestimonialsSection, FaqSection, CtaSection, Cursor and BackToTop. Shared components accept optional content props while retaining their homepage defaults. Regional copy lives in src/data/uae.js. Empty counters from the brief are omitted rather than assigned invented values. The delivery studio remains Karachi.

## SEO and validation

The UAE page has a distinct title, description, canonical URL, reciprocal en-AE/en-PK and x-default alternates, Open Graph metadata and WebPage, ProfessionalService and FAQ structured data. Its service area is United Arab Emirates; the studio remains Karachi. The production sitemap source now has 20 canonical page URLs. Country configuration is in src/data/markets.js.

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

## Responsive and international SEO revision (23 October 2026)

The UAE page retains homepage typography and shared About, Services, Showreel, Testimonials, FAQ, CTA and Footer components. The hero fills the small viewport height. Regional sections use 128px vertical spacing on desktop and 64px on mobile. Results have three columns on desktop, one on phones, and reversible right-to-left scroll reveals. The process map enters automatically in normal document flow; it is not pinned. The ecosystem and FAQ accordions each allow one open item with smooth transitions.

The bottom edge blur has been removed. Tablet headings scale to fit; split process words can wrap on narrow screens, and FAQ titles shrink within their flex row without pushing the toggle outside the card. UAE-only CSS preserves homepage layouts.

International alternates use one shared configuration for the homepage and UAE page. Social locales identify en_PK and en_AE with reciprocal alternate locales. The UAE WebPage structured data identifies its canonical URL, English UAE language, parent website and organization, alongside the existing service, FAQ and breadcrumb data. No translated or UK/USA placeholder pages have been introduced, and no Dubai office has been invented.

Validation: production build, source SEO checks, rendered canonical/hreflang/JSON-LD/viewport checks across all 20 sitemap pages and internal destinations, plus browser checks at phone, tablet and desktop widths. The mirror remains deliberately noindex; main-domain launch and Search Console submission still require the hosting/domain steps above. Technical SEO does not guarantee rankings.
## Services, hover and loading revision (23 October 2026)

The services heading is two explicit, responsive lines. UAE ecosystem topics open on pointer hover, stay open after a mouse click, and close the previous topic smoothly. Keyboard and touch activation remain available; the separate FAQ retains click-to-toggle behavior.

A UAE-only Lenis controller synchronizes desktop wheel/anchor scrolling with ScrollTrigger; touch devices keep native momentum and reduced-motion users keep native scrolling. The controller cleans up on navigation. About text splitting and process word motion initialize near their sections rather than during the hero's initial render.

The measured pre-change PageSpeed mobile performance score was 76 (FCP 2.3s, LCP 4.4s, TBT 240ms, CLS 0); desktop was 98. The report identified seven render-blocking CSS requests. Next's inlineCss option now removes those initial stylesheet requests. Trade-off: shared CSS travels with HTML and cannot be cached independently on a full reload; client navigation still uses CSS assets. Recheck the deployed revision with PageSpeed; no perfect score is asserted without a matching measurement.
## Hero stability and deferred motion (24 October 2026)

The UAE hero uses byte-identical embedded versions of its existing poster and Mona Sans BoldNarrow font. Its desktop title reserves two lines while the font decodes; the poster is no longer duplicated as an inline background style. This increases HTML size but removes separate critical poster/font downloads. The font alias remains uppercase and the visible design is unchanged. The remaining regular/medium UI fonts receive response-header preload hints.

The UAE About counters, Advantages timeline and Results cards initialize near their sections. Homepage defaults still initialize as before. Browser checks confirmed that counters start, side markers meet the timeline, and Results cards settle at zero translation then reverse on scrolling up. Production build and rendered SEO checks still pass. Google lab scores are measured observations, not a guarantee of 100 on every device or run; the preview remains noindex as described above.