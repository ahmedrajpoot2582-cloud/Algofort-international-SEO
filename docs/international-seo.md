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

## UAE design and motion (20 October 2026)

The UAE page retains the original header, services, showreel, FAQ, CTA and footer. Its client section now uses the exact default TestimonialsSection component and homepage data/styles/motion, with no UAE grid, card or typography overrides. A browser comparison confirmed matching client copy, widths, padding, radius, type sizes and layout.

The quick navigation fixes the rolling text window to two non-shrinking 18px lines; pointer hover and keyboard focus use the same roll and orange background. The duplicate visual label is hidden from assistive technology. UAE section headings scale up to 64px, section subheadings up to 30px and body text to 17-18px; mobile headings are 40px. The home client section retains its own typography.

The regional page uses native scrolling with smooth anchor navigation. It does not import the global Lenis/text-splitting wrapper. UaeMotion owns reusable GSAP timelines started by native intersection events: each industry card and technology row animates independently and replays when re-entering view. Technology pills stagger, industry icons turn into place, headings rise/fade and about copy reveals fully without leaving trailing text grey. The home client section keeps its original ScrollTrigger behavior.

The hero uses the homepage's server-rendered character/CSS entrance pattern, so it starts before hydration. Its small local poster and main narrow heading font preload; decorative hero video stays off on mobile. Other effects initialize near the viewport and offscreen marquees pause. Reduced-motion visitors receive static readable content.

Initially visible introductory content remains steady during hydration. Section entry timelines arm on the first native scroll (or immediately for a restored/hash position), avoiding a late hide/reveal of copy that has already painted.

Validation includes production build, lint (existing warnings only), source SEO checks and rendered checks across 20 pages/16 internal destinations, plus desktop/mobile layout, menu hover/focus, independent section entry and homepage client parity checks. Lighthouse measurements are lab results and do not establish search rankings. Backend form delivery still depends on the hosting settings above.
