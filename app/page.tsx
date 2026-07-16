import { Hero } from '@/components/sections/hero';
import { TrustBar } from '@/components/sections/trust-bar';
import { ServicesOverview } from '@/components/sections/services-overview';
import { IndustriesGrid } from '@/components/sections/industries-grid';
import { LocationsGrid } from '@/components/sections/locations-grid';
import { OutcomesSection } from '@/components/sections/outcomes-section';
import { ProcessSection } from '@/components/sections/process-section';
import { TestimonialsSection } from '@/components/sections/testimonials-section';
import { CTASection } from '@/components/sections/cta-section';
import { defaultOrganization, parentOrganization } from '@/lib/seo';

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Enterprise Technology Services',
  itemListElement: [
    { '@type': 'Service', name: 'Custom Software Development', description: 'Enterprise software solutions' },
    { '@type': 'Service', name: 'Website Development', description: 'Professional web development' },
    { '@type': 'Service', name: 'AI Solutions', description: 'Machine learning and AI implementations' },
    { '@type': 'Service', name: 'ERP Implementation', description: 'Enterprise resource planning' },
    { '@type': 'Service', name: 'Cloud Infrastructure', description: 'AWS, Azure, GCP architecture' },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(parentOrganization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(defaultOrganization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Hero />
      <TrustBar />
      <ServicesOverview />
      <IndustriesGrid />
      <ProcessSection />
      <OutcomesSection />
      <LocationsGrid />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
