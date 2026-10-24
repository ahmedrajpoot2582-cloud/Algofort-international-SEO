import { RegionalLandingPage, regionalMetadata } from '../../components/international/RegionalLandingPage';
import { usaContent } from '../../data/regional-content';

export const metadata = regionalMetadata(usaContent);

export default function UsaPage() {
  return <RegionalLandingPage content={usaContent} />;
}
