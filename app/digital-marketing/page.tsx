import { Metadata } from 'next';
import { DigitalMarketingPage } from '@/components/sites/digital-marketing-page';

export const metadata: Metadata = {
  title: 'Digital Marketing Agency India | SEO, PPC, Content Marketing | ELSxGlobal',
  description: "Results-driven digital marketing agency in India. SEO services, PPC, content marketing, conversion optimization. 300% average ROI. Free strategy session available.",
  keywords: [
    'digital marketing agency india',
    'seo company india',
    'ppc agency',
    'content marketing services',
    'digital marketing services mumbai',
    'seo services bangalore',
    'google ads agency india',
    'social media marketing agency',
    'performance marketing india',
  ],
  openGraph: {
    title: 'Digital Marketing Agency India | ELSxGlobal',
    description: 'Results-driven digital marketing. SEO, PPC, content, and conversion optimization.',
    type: 'website',
  },
  alternates: {
    canonical: '/digital-marketing',
  },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Digital Marketing Services',
  description: 'Comprehensive digital marketing including SEO, PPC, content marketing, and social media.',
  provider: { '@type': 'Organization', name: 'ELSxGlobal' },
  serviceType: 'Digital Marketing',
  areaServed: { '@type': 'Country', name: 'India' },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <DigitalMarketingPage />
    </>
  );
}
