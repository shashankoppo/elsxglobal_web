import { Metadata } from 'next';
import { WebsiteDevelopmentPage } from '@/components/sites/website-development-page';

export const metadata: Metadata = {
  title: 'Website Development Company India | Custom Web Solutions | ELSxGlobal',
  description: "Top website development company in India. Custom websites, e-commerce platforms, and web applications. SEO-optimized, conversion-focused. 200+ projects delivered. Get free consultation.",
  keywords: [
    'website development company india',
    'web development services',
    'website design company',
    'e-commerce development india',
    'custom website development',
    'web application development',
    'website development mumbai',
    'website development bangalore',
    'responsive web design india',
  ],
  openGraph: {
    title: 'Website Development Company India | ELSxGlobal',
    description: 'Professional website development services. Custom designs, e-commerce, and web applications.',
    type: 'website',
  },
  alternates: {
    canonical: '/website-development',
  },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Website Development Services',
  description: 'Custom website development including corporate sites, e-commerce, and web applications.',
  provider: {
    '@type': 'Organization',
    name: 'ELSxGlobal',
  },
  serviceType: 'Website Development',
  areaServed: { '@type': 'Country', name: 'India' },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <WebsiteDevelopmentPage />
    </>
  );
}
