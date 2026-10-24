import { RegionalLandingPage, regionalMetadata } from '../../components/international/RegionalLandingPage';
import { pakistanContent } from '../../data/regional-content';

export const metadata = regionalMetadata(pakistanContent);

export default function PakistanPage() {
  return <RegionalLandingPage content={pakistanContent} />;
}
