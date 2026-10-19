import Link from 'next/link';
import { Header } from '../../components/common/Header';
import { Footer } from '../../components/common/Footer';
import { PageBanner } from '../../components/common/PageBanner';
import { Cursor } from '../../components/common/Cursor';
import { BackToTop } from '../../components/common/BackToTop';
import { SmoothScroll } from '../../components/common/SmoothScroll';
import { ContactSection } from '../../components/sections/ContactSection';
import { InternationalSection, InternationalButton } from '../../components/international/InternationalShell';
import { withSocialMetadata } from '../../lib/seo';
import { absoluteUrl } from '../../lib/site';
import { markets, internationalAlternates } from '../../data/markets';
import '../../styles/uae.css';

const market = markets[0];
export const metadata = withSocialMetadata({
  title: market.title, description: market.description,
  alternates: { canonical: '/uae', languages: internationalAlternates() },
  openGraph: { locale: 'en_AE' },
});

const services = [
  { name: 'Web Design & Development', path: 'web-development', text: 'A clear, responsive website that explains your offer and makes the next step easy for your customers.', items: ['Custom design & development', 'WordPress & ecommerce websites', 'Enquiry forms & business integrations'] },
  { name: 'Brand Identity', path: 'brand-identity', text: 'A consistent identity for your website, sales material and the places people meet your business.', items: ['Logo & visual direction', 'Typography & colour systems', 'Brand guidelines & usable assets'] },
  { name: 'SaaS & Web Applications', path: 'saas-app-development', text: 'Turn a business workflow or product idea into software your customers and team can use.', items: ['Product discovery & UI/UX', 'User accounts & role-based journeys', 'Custom dashboards & integrations'] },
  { name: 'Mobile App Development', path: 'mobile-app-development', text: 'A focused mobile experience, from the first user journey to testing and release preparation.', items: ['App planning & prototypes', 'Application & backend development', 'Device testing & release support'] },
];
const questions = [
  ['What does a website project cost?', 'The price depends on your pages, design, content, features and integrations. Share your brief and existing website so we can propose the scope, deliverables and cost before work starts.'],
  ['Can you plan an English and Arabic website?', 'If you need both languages, include that in your brief. We will agree translation ownership, Arabic content review, right-to-left layouts and language-switching requirements as part of the project scope.'],
  ['Can you redesign our existing website?', 'Yes. We can review the existing content, customer journeys and platform, then agree what to retain, improve or rebuild. Important URLs and redirects should be mapped before the replacement goes live.'],
  ['How will we review work and launch the site?', 'We collaborate remotely from Karachi. Review times, milestones and approvals are agreed around your team. The proposal defines hosting, domain access, deployment, handover and any ongoing support.'],
];
const schema = {
  '@context': 'https://schema.org', '@graph': [
    { '@type': 'Service', '@id': absoluteUrl('/uae#service'), name: 'Web design and development for UAE businesses', url: absoluteUrl('/uae'), description: market.description, areaServed: { '@type': 'Country', name: 'United Arab Emirates' }, provider: { '@type': 'Organization', '@id': absoluteUrl('/#organization'), name: 'Algofort', url: absoluteUrl('/') } },
    { '@type': 'FAQPage', mainEntity: questions.map(([name, text]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text } })) },
  ],
};

export default function UaePage() {
  return (
    <SmoothScroll>
      <div className="page-wrapper page-uae" id="top">
        <Header /><Cursor /><BackToTop />
        <main id="main-content">
          <script type="application/ld+json">{JSON.stringify(schema).replace(/</g, '\\u003c')}</script>
          <PageBanner title="Web Design & Development for the UAE" className="sec-page-banner--uae" showBottomBar={false} breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'UAE Services', href: '/uae', active: true }]}>
            <div className="sec-uae__hero-copy">
              <p className="alg-text sec-uae__hero-description">A better website for your next stage of business. We design and build websites, brands and digital products for businesses serving the UAE.</p>
              <div className="sec-uae__actions"><InternationalButton href="#sec-contact">Discuss your UAE project</InternationalButton><Link href="#uae-work" className="sec-uae__text-link">Explore our work <span aria-hidden="true">↗</span></Link></div>
              <p className="alg-text sec-uae__hero-note">Custom design. Clear project scope. A launch plan you can follow.</p>
            </div>
            <div className="sec-uae__hero-visual" aria-label="Selected website and brand work from the Algofort portfolio">
              <div className="sec-uae__browser"><div className="sec-uae__browser-bar"><span aria-hidden="true">● ● ●</span><span>Website / Selected work</span><span aria-hidden="true">↗</span></div><div className="sec-uae__browser-image"><img src="/assets/portfolio/animation/project-1.jpg" alt="Website design from the Algofort portfolio" width="768" height="1797" fetchPriority="high" /></div></div>
              <div className="sec-uae__identity"><img src="/assets/projects_3.webp" alt="Forvex visual identity from the Algofort portfolio" width="560" height="420" /><span>Brand to browser.<br /><strong>One clear identity.</strong></span></div>
            </div>
          </PageBanner>

          <nav className="sec-uae__page-nav" aria-label="On this page"><Link href="#uae-services">Services</Link><Link href="#uae-work">Selected work</Link><Link href="#uae-delivery">How we work</Link><Link href="#uae-faq">FAQs</Link><Link href="#sec-contact">Start your project ↗</Link></nav>

          <InternationalSection plainBadge id="uae-services" badge="What we do" title={<>The right digital tools.<br /><span className="text-color-secondary">For your business.</span></>} description="Launch a service website, refresh your brand or develop the platform behind your next idea. Start with the service you need; we’ll shape the delivery around your brief.">
            <div className="sec-uae__service-grid">{services.map((service, index) => <article className="content-card sec-uae__service" key={service.path}><span className="sec-uae__number">0{index + 1}</span><h3 className="heading-style-h3 sec-uae__subtitle"><Link href={`/services/${service.path}`}>{service.name}<span aria-hidden="true">↗</span></Link></h3><p className="alg-text">{service.text}</p><ul className="alg-text sec-uae__deliverables">{service.items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div>
          </InternationalSection>

          <InternationalSection plainBadge id="uae-work" badge="Selected work" dark title={<>See the thinking.<br /><span className="text-color-secondary">Explore the work.</span></>} description="Website and brand examples from our wider portfolio.">
            <div className="sec-uae__work-grid"><Link href="/portfolio" className="sec-uae__project"><div className="sec-uae__project-image sec-uae__project-image--website"><img src="/assets/portfolio/animation/project-1.jpg" alt="Selected website design" width="768" height="1797" loading="lazy" /></div><div className="sec-uae__project-caption"><h3 className="heading-style-h3 sec-uae__subtitle">Website experience</h3><span>Website / View portfolio ↗</span></div></Link><Link href="/portfolio" className="sec-uae__project"><div className="sec-uae__project-image"><img src="/assets/projects_3.webp" alt="Forvex brand identity presentation" width="560" height="420" loading="lazy" /></div><div className="sec-uae__project-caption"><h3 className="heading-style-h3 sec-uae__subtitle">Forvex</h3><span>Brand identity / View portfolio ↗</span></div></Link></div>
          </InternationalSection>

          <InternationalSection plainBadge id="uae-customer-journey" badge="Built around your customers" title={<>Make the next step<br /><span className="text-color-secondary">easy to take.</span></>} description="For businesses serving Dubai, Abu Dhabi and the wider UAE, we plan the details around the people who will actually use your website.">
            <div className="sec-uae__feature-grid">{[
              ['Mobile-first enquiries', 'Keep the service, contact options and next action clear on a phone. Plan forms, calls and WhatsApp around the channels your team uses.'],
              ['English & Arabic planning', 'Need two languages? Include approved content, translation review and right-to-left layouts in the brief from the start.'],
              ['Useful business connections', 'Agree how enquiries reach the right team and which CRM, booking or other systems need to connect.'],
              ['A website you can manage', 'Define content editing, account ownership, handover and support before launch, so the site fits your day-to-day work.'],
            ].map(([title, text]) => <article className="sec-uae__feature" key={title}><h3 className="heading-style-h3 sec-uae__subtitle">{title}</h3><p className="alg-text">{text}</p></article>)}</div>
          </InternationalSection>

          <InternationalSection plainBadge id="uae-delivery" badge="How we work" dark title={<>From the first call.<br /><span className="text-color-secondary">To the final handover.</span></>}>
            <div className="sec-uae__process-grid">{[
              ['01', 'Discover & scope', 'We discuss your customers, current platform and goals, then agree deliverables, responsibilities and milestones.'],
              ['02', 'Design & develop', 'Review the design and key journeys before development. Follow progress through agreed review points and clear feedback.'],
              ['03', 'Test & launch', 'Check the important journeys and responsive layouts, prepare the release and complete the agreed handover.'],
            ].map(([number, title, text]) => <article className="sec-uae__step" key={number}><span className="sec-uae__number">{number}</span><h3 className="heading-style-h3 sec-uae__subtitle">{title}</h3><p className="alg-text">{text}</p></article>)}</div>
          </InternationalSection>

          <InternationalSection plainBadge id="uae-faq" badge="Your questions" title={<>Before we<br /><span className="text-color-secondary">get started.</span></>}><div className="sec-international__faq">{questions.map(([question, answer]) => <details key={question}><summary>{question}</summary><p className="alg-text">{answer}</p></details>)}</div></InternationalSection>
          <ContactSection country="United Arab Emirates" plainBadge serviceOptions={['Website Design', 'Brand Identity', 'Software Development', 'App Development']} />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}
