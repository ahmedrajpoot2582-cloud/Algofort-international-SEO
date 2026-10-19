import Link from 'next/link';
import { notFound } from 'next/navigation';
import { withSocialMetadata } from '../../../lib/seo';
import { markets, getMarket, marketPath, internationalServices, internationalAlternates } from '../../../data/international';
import { InternationalShell, InternationalSection, InternationalButton } from '../../../components/international/InternationalShell';

export const dynamicParams = false;
export function generateStaticParams() { return markets.map((market) => ({ market: market.slug })); }

export async function generateMetadata({ params }) {
  const market = getMarket((await params).market);
  if (!market) notFound();
  return withSocialMetadata({
    title: market.title, description: market.description,
    alternates: { canonical: marketPath(market), languages: internationalAlternates() },
    openGraph: { locale: market.locale.replace('-', '_') },
  });
}

export default async function MarketPage({ params }) {
  const market = getMarket((await params).market);
  if (!market) notFound();
  return (
    <InternationalShell title={`Digital Services for ${market.shortName}`} breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'International', href: '/international' }, { label: market.name, href: marketPath(market), active: true }]}>
      <InternationalSection id="market-introduction" badge={`${market.name} / Remote delivery`} title={<>Development & design.<br /><span className="text-color-secondary">For your next chapter.</span></>} description={market.intro}>
        <p className="alg-text sec-international__intro">{market.context}</p>
        <p className="alg-text sec-international__note">Remote collaboration from our Karachi studio. English-language market guide. Scope, content requirements and review hours are agreed before work begins.</p>
        <div className="sec-international__actions"><InternationalButton href={`/contact?country=${encodeURIComponent(market.name)}`}>Discuss your project</InternationalButton><Link href="/portfolio">Explore our work ↗</Link></div>
      </InternationalSection>
      <InternationalSection id="market-considerations" badge="Plan for your audience" dark title={<>A thoughtful brief.<br /><span className="text-color-secondary">A stronger starting point.</span></>} description={`Consider these details when planning a digital experience for customers in ${market.name}.`}>
        <div className="section-content sec-international__grid sec-international__grid--three">
          {market.focus.map(([title, text]) => <article className="content-card sec-international__card" key={title}><h3 className="heading-style-h3 sec-international__subtitle">{title}</h3><p className="alg-text">{text}</p></article>)}
        </div>
      </InternationalSection>
      <InternationalSection id="market-services" badge="What we can build" title={<>Choose the service.<br /><span className="text-color-secondary">Shape the scope.</span></>} description="Explore the full service pages, then use the regional considerations below to prepare your brief.">
        <div className="section-content sec-international__grid sec-international__grid--services">
          {internationalServices.map((service, index) => (
            <article className="content-card sec-international__card" key={service.slug}>
              <span className="sec-international__number">0{index + 1}</span>
              <h3 className="heading-style-h3 sec-international__subtitle"><Link href={`/services/${service.slug}`}>{service.name} <span aria-hidden="true">↗</span></Link></h3>
              <p className="alg-text">{market.serviceNotes[index]}</p>
            </article>
          ))}
        </div>
      </InternationalSection>
      <InternationalSection id="market-brief" badge="Make the first conversation useful" dark title={<>Bring the context.<br /><span className="text-color-secondary">We’ll discuss the build.</span></>} description="A short, specific brief helps us discuss feasibility, delivery and next steps.">
        <ul className="alg-text sec-international__brief">{market.brief.map((item) => <li key={item}>{item}</li>)}</ul>
        <p className="alg-text sec-international__intro">No ready-made price or delivery time is assumed. We confirm language work, integrations, account access, review arrangements and support as part of the proposal.</p>
        <div className="sec-international__actions"><InternationalButton href={`/contact?country=${encodeURIComponent(market.name)}`}>Start a conversation</InternationalButton><Link href="/insights/planning-an-international-development-project">Prepare your project brief ↗</Link></div>
      </InternationalSection>
      <InternationalSection id="market-questions" badge="Before we begin" title={<>Your questions.<br /><span className="text-color-secondary">Clear answers.</span></>}>
        <div className="sec-international__faq">
          <details><summary>Do you have an office in {market.name}?</summary><p className="alg-text">Our studio is in Karachi, Pakistan. This page describes remote services for businesses targeting {market.name}; it does not represent a local office.</p></details>
          <details><summary>Can the project support more than one language?</summary><p className="alg-text">We can discuss multilingual requirements during discovery. Required languages, translation ownership, language review and right-to-left work must be confirmed in the project scope. This page itself is in English.</p></details>
          <details><summary>How are meetings and handover arranged?</summary><p className="alg-text">We agree stakeholder time zones, review windows, milestone approvals, repository access and handover documentation before work starts. Availability and delivery dates depend on the agreed engagement.</p></details>
        </div>
        <nav aria-label="Other markets" className="sec-international__market-links"><Link href="/international">Worldwide services</Link>{markets.filter((item) => item.slug !== market.slug).map((item) => <Link key={item.slug} href={marketPath(item)}>{item.name}</Link>)}</nav>
      </InternationalSection>
    </InternationalShell>
  );
}
