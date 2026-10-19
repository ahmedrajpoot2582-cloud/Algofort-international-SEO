import Link from 'next/link';
import { markets, marketPath } from '../../data/international';
import { InternationalSection, InternationalButton } from './InternationalShell';

export function InternationalServiceLinks() {
  return (
    <InternationalSection id="international-projects" badge="Working across borders" title={<>Your market.<br /><span className="text-color-secondary">Our shared starting point.</span></>} description="Planning a project for customers in another country? Explore regional considerations and prepare your brief. Our Karachi studio collaborates remotely; scope and availability are agreed for each engagement.">
      <nav aria-label="International market guides" className="sec-international__market-links">{markets.map((market) => <Link key={market.slug} href={marketPath(market)}>{market.name} ↗</Link>)}</nav>
      <div className="sec-international__actions"><InternationalButton href="/international">Find your country</InternationalButton><Link href="/insights/planning-an-international-development-project">Plan a remote project ↗</Link></div>
    </InternationalSection>
  );
}
