import { Metadata } from 'next';
import { SoftwareDevelopmentPage } from '@/components/sites/software-development-page';

export const metadata: Metadata = {
  title: 'Custom Software Development Company India | Enterprise Solutions | ELSxGlobal',
  description: "India's leading custom software development company. Enterprise-grade solutions built for scale. 200+ successful projects. Full-cycle development from strategy to deployment. Get your free consultation today.",
  keywords: [
    'custom software development company india',
    'software development services',
    'enterprise software development',
    'custom application development',
    'software development company in mumbai',
    'software development company in bangalore',
    'software development company delhi',
    'enterprise software solutions india',
    'custom software developers',
  ],
  openGraph: {
    title: 'Custom Software Development Company India | ELSxGlobal',
    description: 'Enterprise-grade custom software solutions built for scale. 200+ successful projects.',
    type: 'website',
    images: [{ url: '/og-software-development.jpg', width: 1200, height: 630 }],
  },
  alternates: {
    canonical: '/software',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Custom Software Development Services',
  description: 'Enterprise-grade custom software development including web applications, APIs, and microservices.',
  provider: {
    '@type': 'Organization',
    name: 'ELSxGlobal',
    url: 'https://elsxglobal.com',
  },
  serviceType: 'Software Development',
  areaServed: {
    '@type': 'Country',
    name: 'India',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Software Development Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Custom Application Development' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'API Development' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Microservices Architecture' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Legacy Modernization' } },
    ],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How long does custom software development take?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Timeline varies based on complexity. Simple applications: 8-12 weeks. Enterprise systems: 4-6 months. We provide detailed estimates after discovery.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is your development methodology?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We use Agile with 2-week sprints, ensuring continuous delivery and stakeholder feedback.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you provide post-launch support?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We offer tiered support plans including bug fixes, performance monitoring, security updates, and feature enhancements.',
      },
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <SoftwareDevelopmentPage />
    </>
  );
}
