import { Header } from '../../components/common/Header';
import { Footer } from '../../components/common/Footer';
import { PageBanner } from '../../components/common/PageBanner';
import { Cursor } from '../../components/common/Cursor';
import { BackToTop } from '../../components/common/BackToTop';
import { AboutSection } from '../../components/sections/AboutSection';
import { UaeProcessSection } from '../../components/uae/UaeProcessSection';
import { ServicesSection } from '../../components/sections/ServicesSection';
import { ShowreelSection } from '../../components/sections/ShowreelSection';
import { TestimonialsSection } from '../../components/sections/TestimonialsSection';
import { FaqSection } from '../../components/sections/FaqSection';
import { CtaSection } from '../../components/sections/CtaSection';
import { UaeIndustriesSection, UaeEcosystemSection, UaeAdvantagesSection, UaeResultsSection } from '../../components/uae/UaeExpertiseSections';
import { UaeMotion } from '../../components/uae/UaeMotion';
import { UaeAccordionMotion } from '../../components/uae/UaeAccordionMotion';
import { UaeSmoothScroll } from '../../components/uae/UaeSmoothScroll';
import { uaeContent as content } from '../../data/uae';
import { internationalAlternates } from '../../data/markets';
import { withSocialMetadata } from '../../lib/seo';
import { absoluteUrl } from '../../lib/site';
import { uaeHeroPoster } from '../../data/uae-hero-poster';
import '../../styles/uae-hero-font.css';
import '../../styles/uae.css';

export const metadata = withSocialMetadata({
  title: content.title,
  description: content.description,
  keywords: content.keywords,
  alternates: { canonical: '/ae', languages: internationalAlternates() },
  openGraph: { locale: 'en_AE', alternateLocale: ['en_PK'] },
});

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': absoluteUrl('/ae#webpage'),
      url: absoluteUrl('/ae'),
      name: content.title,
      description: content.description,
      inLanguage: 'en-AE',
      isPartOf: { '@id': absoluteUrl('/#website') },
      about: { '@id': absoluteUrl('/#organization') },
    },
    {
      '@type': 'ProfessionalService',
      '@id': absoluteUrl('/#organization'),
      name: 'Algofort - Digital & Software Agency',
      url: absoluteUrl('/ae'),
      email: 'hello@algofort.com',
      telephone: '+923337198686',
      description: content.description,
      address: { '@type': 'PostalAddress', streetAddress: '84j Ghazali Rd, Block 2 PECHS', addressLocality: 'Karachi', addressCountry: 'PK' },
      areaServed: [{ '@type': 'City', name: 'Dubai' }, { '@type': 'City', name: 'Abu Dhabi' }, { '@type': 'Country', name: 'United Arab Emirates' }],
      hasOfferCatalog: {
        '@type': 'OfferCatalog', name: 'Digital & Software Development Services',
        itemListElement: content.services.map((service) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: service.title, url: absoluteUrl(service.link) } })),
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: content.faqs.map(({ question, paragraphs }) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: paragraphs.join(' ') } })),
    },
  ],
};

export default function UaePage() {
  return (
      <div className="page-wrapper page-uae" id="top" data-uae-gsap>
        <Cursor /><Header prefetch={false} /><BackToTop /><UaeSmoothScroll /><UaeMotion /><UaeAccordionMotion />
        <main id="main-content">
          <script type="application/ld+json">{JSON.stringify(schema).replace(/</g, '\\u003c')}</script>
          <PageBanner performanceMode posterOverride={uaeHeroPoster} animateEntrance title={content.heroTitle} eyebrow={content.heroBadge} services={content.marquee} breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'UAE', href: '/ae', active: true }]} />

          <AboutSection deferMotion id="uae-about" description={content.about} studioNote="Global engineering & delivery studio: Karachi. Serving Dubai, Abu Dhabi, the UAE and global markets." />

          <ServicesSection deferMotion animateHeading={false} items={content.services} heading={<><span className="uae-services-title-line">Creative solutions</span>{' '}<span className="uae-services-title-line text-color-secondary">for UAE enterprises.</span></>} />
          <UaeIndustriesSection />
          <UaeEcosystemSection />

          <UaeProcessSection items={content.process} />

          <UaeAdvantagesSection />
          <ShowreelSection />
          <UaeResultsSection />
          <TestimonialsSection />
          <FaqSection deferMotion items={content.faqs} />
          <CtaSection deferMotion title={<>Start a project<br /><span className="text-color-secondary">in the UAE.</span></>} description="Let us collaborate to build something extraordinary and elevate your brand across Dubai and the GCC." country="United Arab Emirates" phoneLabel="Phone Number (UAE / International)" />
        </main>
        <Footer />
      </div>
  );
}
