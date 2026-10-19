import Link from 'next/link';
import { notFound } from 'next/navigation';
import { insights, getInsight } from '../../../data/insights';
import { internationalServices } from '../../../data/international';
import { withSocialMetadata } from '../../../lib/seo';
import { InternationalShell, InternationalSection, InternationalButton } from '../../../components/international/InternationalShell';

export const dynamicParams = false;
export function generateStaticParams() { return insights.map((insight) => ({ slug: insight.slug })); }
export async function generateMetadata({ params }) {
  const insight = getInsight((await params).slug);
  if (!insight) notFound();
  return withSocialMetadata({ title: `${insight.title} | Algofort`, description: insight.description, alternates: { canonical: `/insights/${insight.slug}` }, openGraph: { type: 'article' } });
}
export default async function InsightPage({ params }) {
  const insight = getInsight((await params).slug);
  if (!insight) notFound();
  return (
    <InternationalShell title={insight.title} breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Insights', href: '/insights' }, { label: insight.title, href: `/insights/${insight.slug}`, active: true }]}>
      {insight.sections.map((section, index) => (
        <InternationalSection key={section.title} id={`guide-section-${index + 1}`} badge={`Planning guide / 0${index + 1}`} title={section.title} description={index === 0 ? insight.intro : undefined} dark={index % 2 === 1}>
          <div className="sec-international__article">{section.paragraphs.map((paragraph) => <p key={paragraph} className="alg-text">{paragraph}</p>)}</div>
        </InternationalSection>
      ))}
      <InternationalSection id="related-services" badge="Take the next step" title={<>From the brief.<br /><span className="text-color-secondary">To the build.</span></>} description="Explore the service that matches your next project.">
        <nav aria-label="Related services" className="sec-international__market-links">{internationalServices.filter((service) => insight.relatedServices.includes(service.slug)).map((service) => <Link key={service.slug} href={`/services/${service.slug}`}>{service.name} ↗</Link>)}</nav>
        <div className="sec-international__actions"><InternationalButton href="/contact">Discuss your project</InternationalButton><Link href="/insights">All planning guides ↗</Link></div>
      </InternationalSection>
    </InternationalShell>
  );
}
