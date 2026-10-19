import Link from 'next/link';
import { withSocialMetadata } from '../../lib/seo';
import { insights } from '../../data/insights';
import { InternationalShell, InternationalSection, InternationalButton } from '../../components/international/InternationalShell';

export const metadata = withSocialMetadata({
  title: 'Digital Project & Website Localization Guides | Algofort',
  description: 'Practical guides to planning remote development, localizing websites and choosing the right first digital product for your business.',
  alternates: { canonical: '/insights' },
});
export default function InsightsPage() {
  return (
    <InternationalShell title="Ideas into Action" breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Insights', href: '/insights', active: true }]}>
      <InternationalSection id="planning-guides" badge="Practical thinking" title={<>Better questions.<br /><span className="text-color-secondary">Clearer projects.</span></>} description="Useful starting points for planning a website, digital product or international launch.">
        <div className="section-content sec-international__grid sec-international__grid--three">
          {insights.map((insight, index) => <article key={insight.slug} className="content-card sec-international__card"><span className="sec-international__number">0{index + 1} / Planning guide</span><h3 className="heading-style-h3 sec-international__subtitle"><Link href={`/insights/${insight.slug}`}>{insight.title}</Link></h3><p className="alg-text">{insight.description}</p></article>)}
        </div>
        <div className="sec-international__actions"><InternationalButton href="/international">Explore worldwide services</InternationalButton></div>
      </InternationalSection>
    </InternationalShell>
  );
}
