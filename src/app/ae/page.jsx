import { Header } from '../../components/common/Header';
import { Footer } from '../../components/common/Footer';
import { PageBanner } from '../../components/common/PageBanner';
import { Cursor } from '../../components/common/Cursor';
import { BackToTop } from '../../components/common/BackToTop';
import { SubtitleMarquee } from '../../components/common/SubtitleMarquee';
import { DeferredLottie } from '../../components/common/DeferredLottie';
import { ServicesSection } from '../../components/sections/ServicesSection';
import { ShowreelSection } from '../../components/sections/ShowreelSection';
import { TestimonialsSection } from '../../components/sections/TestimonialsSection';
import { FaqSection } from '../../components/sections/FaqSection';
import { CtaSection } from '../../components/sections/CtaSection';
import { UaeIndustriesSection, UaeEcosystemSection, UaeAdvantagesSection, UaeTechnologySection, UaeResultsSection } from '../../components/uae/UaeExpertiseSections';
import { UaeMotion } from '../../components/uae/UaeMotion';
import { uaeContent as content } from '../../data/uae';
import { internationalAlternates } from '../../data/markets';
import { withSocialMetadata } from '../../lib/seo';
import { absoluteUrl } from '../../lib/site';
import '../../styles/uae.css';

export const metadata = withSocialMetadata({
  title: content.title,
  description: content.description,
  keywords: content.keywords,
  alternates: { canonical: '/ae', languages: internationalAlternates() },
  openGraph: { locale: 'en_AE' },
});

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
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
        <Cursor /><Header prefetch={false} /><BackToTop /><UaeMotion />
        <main id="main-content">
          <script type="application/ld+json">{JSON.stringify(schema).replace(/</g, '\\u003c')}</script>
          <PageBanner performanceMode animateEntrance title={content.heroTitle} eyebrow={content.heroBadge} services={content.marquee} breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'UAE', href: '/ae', active: true }]} />

          <section className="site-section sec-uae-about" id="uae-about" aria-label="About Algofort">
            <div className="site-container container-large padding-global">
              <div className="section-header sec-uae__about-heading">
                <div className="section-badge"><SubtitleMarquee text="About Algofort — " /></div>
              </div>
              <div className="sec-uae__about-copy">
                <p className="alg-text section-description">{content.about}</p>
                <p className="alg-text sec-uae__studio-note">Global engineering & delivery studio: Karachi. Serving Dubai, Abu Dhabi, the UAE and global markets.</p>
              </div>
            </div>
          </section>

          <ServicesSection deferMotion animateHeading={false} items={content.services} heading={<><span className="uae-services-title-line">Creative solutions</span>{' '}<span className="uae-services-title-line text-color-secondary">for UAE enterprises.</span></>} />
          <UaeIndustriesSection />
          <UaeEcosystemSection />

          <section className="site-section sec-uae-process" id="uae-process">
            <div className="site-container container-large padding-global">
              <div className="section-header sec-uae__process-header">
                <div className="section-badge"><SubtitleMarquee text="From Concept to Launch ✦ " /></div>
                <h2 className="heading-style-h2 section-title">Your ideas into a<br /><span className="text-color-secondary">market-leading UAE brand.</span></h2>
              </div>
              <div className="section-content sec-uae__process-grid">
                {content.process.map((step) => <article className="content-card sec-uae__step" key={step.step}>
                  <div className="sec-uae__step-head"><span className="sec-uae__number">{step.step}</span><h3 className="heading-style-h3 sec-uae__subtitle">{step.title}</h3></div>
                  <div className="sec-uae__step-illustration"><DeferredLottie src={step.lottieSrc} background="transparent" speed="1" style={{ width: '120px', height: '120px' }} loop autoplay /></div>
                  <p className="alg-text">{step.description}</p>
                </article>)}
              </div>
            </div>
          </section>

          <UaeAdvantagesSection />
          <UaeTechnologySection />
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
