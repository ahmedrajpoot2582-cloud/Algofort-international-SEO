import Link from 'next/link';
import { withSocialMetadata } from '../../lib/seo';
import { countries, markets, internationalServices, internationalAlternates, marketPath } from '../../data/international';
import { InternationalShell, InternationalSection, InternationalButton } from '../../components/international/InternationalShell';
import { CountryDirectory } from '../../components/international/CountryDirectory';

export const metadata = withSocialMetadata({
  title: 'International Web, App & Brand Development Services | Algofort',
  description: 'Explore Algofort’s remote web development, SaaS, mobile app and brand identity services worldwide. Find your market and plan a clear international project brief.',
  alternates: { canonical: '/international', languages: internationalAlternates() },
});

export default function InternationalPage() {
  return (
    <InternationalShell title="Digital Services Worldwide" breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'International', href: '/international', active: true }]}>
      <InternationalSection id="global-services" badge="Across borders" title={<>Your next idea.<br /><span className="text-color-secondary">A wider world.</span></>} description="Websites, digital products and brand identities for teams working across borders. Explore Algofort’s services, choose your market and bring a focused brief to the conversation.">
        <p className="alg-text sec-international__intro">Our studio is based in Karachi, Pakistan. We collaborate remotely, with project scope, communication, language requirements and delivery arrangements agreed with each client.</p>
        <div className="section-content sec-international__grid sec-international__grid--services">
          {internationalServices.map((service, index) => (
            <article className="content-card sec-international__card" key={service.slug}>
              <span className="sec-international__number">0{index + 1}</span>
              <h3 className="heading-style-h3 sec-international__subtitle"><Link href={`/services/${service.slug}`}>{service.name} <span aria-hidden="true">↗</span></Link></h3>
              <p className="alg-text">{service.summary}</p>
              <ul className="alg-text sec-international__list">{service.deliverables.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          ))}
        </div>
      </InternationalSection>
      <InternationalSection id="market-guides" badge="Explore your market" dark title={<>Local context.<br /><span className="text-color-secondary">Shared ambition.</span></>} description="Start with an English-language guide to planning your project for these markets. Each guide covers useful regional content, interface and delivery considerations.">
        <div className="section-content sec-international__grid sec-international__grid--markets">
          {markets.map((market) => (
            <Link className="content-card sec-international__market" key={market.slug} href={marketPath(market)}>
              <span className="sec-international__number">{market.code}</span>
              <h3 className="heading-style-h3 sec-international__subtitle">{market.name} <span aria-hidden="true">↗</span></h3>
              <p className="alg-text">{market.focus[0][0]}</p>
            </Link>
          ))}
        </div>
      </InternationalSection>
      <InternationalSection id="country-directory" badge="Find your location" title={<>Where are you<br /><span className="text-color-secondary">building next?</span></>} description="Our global service pages are the starting point for every market. Search the directory to explore a country guide or begin a conversation about your project.">
        <CountryDirectory countries={countries} />
      </InternationalSection>
      <InternationalSection id="remote-delivery" badge="A clear way to work" dark title={<>Different locations.<br /><span className="text-color-secondary">One project plan.</span></>} description="A useful remote engagement starts with expectations everyone can review.">
        <div className="section-content sec-international__grid sec-international__grid--three">
          {[
            ['01 / Define', 'Share your audience, goals, existing platform and the countries you intend to serve. Confirm required languages and what a successful first release looks like.'],
            ['02 / Agree', 'Set a written scope, milestones, review windows and account ownership. Confirm costs, support arrangements and any specialist content or policy reviews.'],
            ['03 / Deliver', 'Review work against agreed criteria, test the customer journeys and document the release. Plan future markets from actual customer needs and feedback.'],
          ].map(([title, text]) => <article className="content-card sec-international__card" key={title}><h3 className="heading-style-h3 sec-international__subtitle">{title}</h3><p className="alg-text">{text}</p></article>)}
        </div>
        <div className="sec-international__actions"><InternationalButton href="/contact">Discuss your project</InternationalButton><Link href="/insights">Read our planning guides ↗</Link></div>
      </InternationalSection>
    </InternationalShell>
  );
}
