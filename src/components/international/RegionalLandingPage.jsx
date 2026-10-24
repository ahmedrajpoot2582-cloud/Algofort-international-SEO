import { Header } from '../common/Header';
import { Footer } from '../common/Footer';
import { PageBanner } from '../common/PageBanner';
import { Cursor } from '../common/Cursor';
import { BackToTop } from '../common/BackToTop';
import { AboutSection } from '../sections/AboutSection';
import { ServicesSection } from '../sections/ServicesSection';
import { ShowreelSection } from '../sections/ShowreelSection';
import { TestimonialsSection } from '../sections/TestimonialsSection';
import { FaqSection } from '../sections/FaqSection';
import { CtaSection } from '../sections/CtaSection';
import { UaeProcessSection } from '../uae/UaeProcessSection';
import { UaeIndustriesSection, UaeAdvantagesSection, UaeResultsSection } from '../uae/UaeExpertiseSections';
import { UaeMotion } from '../uae/UaeMotion';
import { UaeAccordionMotion } from '../uae/UaeAccordionMotion';
import { UaeSmoothScroll } from '../uae/UaeSmoothScroll';
import { uaeHeroPoster } from '../../data/uae-hero-poster';
import { internationalAlternates, markets } from '../../data/markets';
import { withSocialMetadata } from '../../lib/seo';
import { absoluteUrl } from '../../lib/site';
import '../../styles/uae-hero-font.css';
import '../../styles/uae.css';

export function regionalMetadata(content) {
  return withSocialMetadata({
    title: content.title, description: content.description, keywords: content.keywords,
    alternates: { canonical: content.path, languages: internationalAlternates() },
    openGraph: {
      locale: content.locale.replace('-', '_'),
      alternateLocale: markets.filter(market => market.code !== content.code).map(market => market.locale.replace('-', '_')),
    },
  });
}

function regionalSchema(content) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage', '@id': absoluteUrl(`${content.path}#webpage`),
        url: absoluteUrl(content.path), name: content.title, description: content.description,
        inLanguage: content.locale, isPartOf: { '@id': absoluteUrl('/#website') },
        about: { '@id': absoluteUrl('/#organization') },
      },
      {
        '@type': 'ProfessionalService', '@id': absoluteUrl('/#organization'),
        name: 'Algofort - Digital & Software Agency', url: absoluteUrl('/'),
        email: 'hello@algofort.com', telephone: '+923337198686', description: content.description,
        address: { '@type': 'PostalAddress', streetAddress: '84j Ghazali Rd, Block 2 PECHS', addressLocality: 'Karachi', addressCountry: 'PK' },
        areaServed: [{ '@type': 'Country', name: content.name }, ...content.cities.map(name => ({ '@type': 'City', name }))],
        hasOfferCatalog: {
          '@type': 'OfferCatalog', name: 'Digital & Software Development Services',
          itemListElement: content.services.map(service => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: service.title, url: absoluteUrl(service.link) } })),
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: content.faqs.map(({ question, paragraphs }) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: paragraphs.join(' ') } })),
      },
    ],
  };
}

export function RegionalLandingPage({ content }) {
  // Retain the approved UAE selectors so both new markets share its exact layout and motion.
  return (
    <div key={content.code} className="page-wrapper page-uae" id="top" data-uae-gsap data-market={content.code}>
      <Cursor /><Header prefetch={false} /><BackToTop /><UaeSmoothScroll /><UaeMotion /><UaeAccordionMotion />
      <main id="main-content">
        <script type="application/ld+json">{JSON.stringify(regionalSchema(content)).replace(/</g, '\\u003c')}</script>
        <PageBanner performanceMode posterOverride={uaeHeroPoster} animateEntrance title={content.heroTitle} eyebrow={content.heroBadge} services={content.marquee} breadcrumbs={[{ label: 'Home', href: '/' }, { label: content.shortName, href: content.path, active: true }]} />
        <AboutSection deferMotion id="uae-about" description={content.about} />
        <ServicesSection deferMotion animateHeading={false} items={content.services} heading={<><span className="uae-services-title-line">Creative solutions</span>{' '}<span className="uae-services-title-line text-color-secondary">{content.servicesLine}</span></>} />
        <UaeIndustriesSection items={content.industries} place={content.industryPlace} />
        <UaeResultsSection items={content.results} badge="Built for growth" caption="What we can build together" />
        <UaeAdvantagesSection items={content.advantages} intro={content.advantagesIntro} highlight={content.advantagesHighlight} description={content.advantagesDescription} />
        <ShowreelSection />
        <UaeProcessSection items={content.process} market={content.shortName} highlight={content.processHighlight} />
        <TestimonialsSection />
        <FaqSection deferMotion items={content.faqs} />
        <CtaSection deferMotion title={<>Start a project<br /><span className="text-color-secondary">{content.ctaLine}</span></>} description={content.ctaDescription} country={content.name} phoneLabel={content.phoneLabel} />
      </main>
      <Footer />
    </div>
  );
}
