import { Hero } from '@/components/sections/hero';
import { TrustBar } from '@/components/sections/trust-bar';
import { ServicesOverview } from '@/components/sections/services-overview';
import { IndustriesGrid } from '@/components/sections/industries-grid';
import { LocationsGrid } from '@/components/sections/locations-grid';
import { OutcomesSection } from '@/components/sections/outcomes-section';
import { ProcessSection } from '@/components/sections/process-section';
import { TestimonialsSection } from '@/components/sections/testimonials-section';
import { CTASection } from '@/components/sections/cta-section';

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ELSxGlobal',
  description: 'Premier enterprise technology partner delivering custom software, cloud, AI, and digital solutions across India and globally.',
  parentOrganization: {
    '@type': 'Organization',
    name: 'EvolucentSphere Pvt. Ltd.',
  },
  founder: {
    '@type': 'Person',
    name: 'Shashank Patel',
    jobTitle: 'Business Transformation Architect',
  },
  url: 'https://elsxglobal.com',
  logo: 'https://elsxglobal.com/logo.png',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-XXXX-XXX-XXX',
    contactType: 'sales',
    areaServed: 'Worldwide',
    availableLanguage: ['English', 'Hindi'],
  },
};

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
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
