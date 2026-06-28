import { Metadata } from 'next';
import { createMetadata, createSchemaMarkup, services } from '@/lib/seo';
import { SolutionPage } from '@/components/site/solution-page';
import { Cloud, Server, Gauge, Shield, RefreshCw, Globe, Layers, DollarSign } from 'lucide-react';

export const metadata: Metadata = createMetadata({
  title: 'Cloud Infrastructure & Migration Services India | AWS, Azure, GCP',
  description: 'Enterprise cloud migration and infrastructure services in India. AWS, Azure, GCP architecture, DevOps, auto-scaling, and cost optimization. 38% average cost reduction.',
  keywords: services.cloud.keywords,
  canonical: 'https://elsxglobal.com/cloud/',
  serviceSchema: {
    name: 'Cloud Infrastructure & Migration',
    description: 'Enterprise cloud migration and infrastructure services in India. AWS, Azure, GCP architecture, DevOps, and auto-scaling.',
    provider: 'ELSxGlobal',
    areaServed: 'India, UAE, USA, UK, Singapore',
    category: 'Cloud Computing',
  },
  breadcrumb: [
    { name: 'Home', url: 'https://elsxglobal.com/' },
    { name: 'Services', url: 'https://elsxglobal.com/services/' },
    { name: 'Cloud Infrastructure', url: 'https://elsxglobal.com/cloud/' },
  ],
  faq: [
    {
      question: 'What cloud platforms do you support for migration in India?',
      answer: 'We support AWS, Microsoft Azure, and Google Cloud Platform (GCP) for cloud migration, infrastructure setup, and optimization.',
    },
    {
      question: 'How do you ensure zero downtime during cloud migration?',
      answer: 'We use phased migration strategies, blue-green deployments, and real-time data replication to ensure zero downtime during migration.',
    },
    {
      question: 'What is your DevOps approach for cloud infrastructure?',
      answer: 'We implement infrastructure as code, CI/CD pipelines, automated monitoring, and container orchestration with Docker and Kubernetes.',
    },
  ],
});

export default function CloudPage() {
  const schemas = createSchemaMarkup({
    canonical: 'https://elsxglobal.com/cloud/',
    serviceSchema: {
      name: 'Cloud Infrastructure & Migration',
      description: 'Enterprise cloud migration and infrastructure services in India.',
      provider: 'ELSxGlobal',
      areaServed: 'India, UAE, USA, UK, Singapore',
      category: 'Cloud Computing',
    },
    breadcrumb: [
      { name: 'Home', url: 'https://elsxglobal.com/' },
      { name: 'Services', url: 'https://elsxglobal.com/services/' },
      { name: 'Cloud Infrastructure', url: 'https://elsxglobal.com/cloud/' },
    ],
  });

  return (
    <>
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />
      ))}
      <SolutionPage
        eyebrow="Cloud Infrastructure"
        title={
          <>
            Elastic by design.
            <br />
            <span className="text-gradient">Cloud that scales.</span>
          </>
        }
        description="Cloud architecture that scales with demand and contracts with efficiency. AWS, Azure, GCP migration, DevOps, auto-scaling, and cost optimization — so you never pay for idle capacity."
        stats={[
          { value: '99.99%', label: 'Availability' },
          { value: '38%', label: 'Cost Reduction' },
          { value: '0', label: 'Downtime Migration' },
          { value: '∞', label: 'Scalability' },
        ]}
        features={[
          {
            icon: Cloud,
            title: 'Cloud Migration',
            desc: 'Zero-downtime migration to AWS, Azure, or GCP with full data integrity and validation.',
          },
          {
            icon: Layers,
            title: 'Auto-scaling',
            desc: 'Infrastructure that automatically scales up and down based on real-time demand.',
          },
          {
            icon: Globe,
            title: 'Multi-region',
            desc: 'Deploy across multiple regions for resilience, compliance, and global performance.',
          },
          {
            icon: DollarSign,
            title: 'Cost Optimization',
            desc: 'Continuous optimization that eliminates waste, right-sizes resources, and reduces costs.',
          },
          {
            icon: Shield,
            title: 'Security & Compliance',
            desc: 'Cloud security architecture that meets SOC 2, ISO 27001, and GDPR requirements.',
          },
          {
            icon: RefreshCw,
            title: 'Disaster Recovery',
            desc: 'Automated failover, backup, and disaster recovery strategies that keep you always on.',
          },
          {
            icon: Server,
            title: 'Containerization',
            desc: 'Docker and Kubernetes orchestration for portable, scalable, and resilient workloads.',
          },
          {
            icon: Gauge,
            title: 'Performance Engineering',
            desc: 'Latency optimization, caching strategies, and CDN integration for global speed.',
          },
        ]}
        process={[
          { step: 'Assess', title: 'Cloud Readiness', desc: 'We evaluate your workloads, dependencies, and cloud readiness for a smooth migration.' },
          { step: 'Architect', title: 'Cloud Design', desc: 'We design a scalable, secure, and cost-effective cloud architecture tailored to your needs.' },
          { step: 'Migrate', title: 'Zero-Downtime Migration', desc: 'We migrate with full validation, testing, and rollback strategies at every step.' },
          { step: 'Optimize', title: 'Continuous Optimization', desc: 'We optimize cost, performance, and security on an ongoing basis.' },
        ]}
      />
    </>
  );
}
