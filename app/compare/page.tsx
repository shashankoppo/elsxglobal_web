import { Metadata } from 'next';
import { ComparisonPage } from '@/components/sites/comparison-page';

export const metadata: Metadata = {
  title: 'Compare ELSxGlobal vs Competitors | Why Choose Us',
  description: 'See how ELSxGlobal compares to other software development companies in India. Compare services, expertise, track record, and value.',
};

export default function Page() {
  return <ComparisonPage />;
}
