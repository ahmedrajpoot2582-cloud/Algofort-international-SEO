import { notFound, permanentRedirect } from 'next/navigation';

export const dynamicParams = false;
export function generateStaticParams() { return [{ market: 'united-arab-emirates' }]; }
export default async function LegacyMarketPage({ params }) {
  if ((await params).market === 'united-arab-emirates') permanentRedirect('/ae');
  notFound();
}
