import { Metadata } from 'next';
import { createMetadata, createSchemaMarkup, services } from '@/lib/seo';
import { SolutionPage } from '@/components/site/solution-page';
import { Code2, Cpu, Globe, Layers, RefreshCw, Shield, Smartphone, Zap, Database, Server } from 'lucide-react';

export const metadata: Metadata = createMetadata({
  title: 'Custom Software Development Company India | Enterprise Software Solutions',
  description: 'Leading custom software development company in India. Enterprise web apps, mobile apps, API platforms, microservices, and legacy modernization. 200+ projects delivered.',
  keywords: services.software.keywords,
  canonical: 'https://elsxglobal.com/software/',
  serviceSchema: {
    name: 'Custom Software Development',
    description: 'Enterprise-grade custom software development services in India. Web applications, mobile apps, API platforms, and microservices architecture.',
    provider: 'ELSxGlobal',
    areaServed: 'India, UAE, USA, UK, Singapore',
    category: 'Software Development',
  },
  breadcrumb: [
    { name: 'Home', url: 'https://elsxglobal.com/' },
    { name: 'Services', url: 'https://elsxglobal.com/services/' },
    { name: 'Software Development', url: 'https://elsxglobal.com/software/' },
  ],
  faq: [
    {
      question: 'What software development services do you offer in India?',
      answer: 'We offer custom software development, web application development, mobile app development, API development, microservices architecture, legacy system modernization, and enterprise software solutions.',
    },
    {
      question: 'What technologies do you use for software development?',
      answer: 'We use modern technologies including React, Next.js, Node.js, Python, TypeScript, PostgreSQL, MongoDB, Redis, Docker, Kubernetes, and cloud-native technologies.',
    },
    {
      question: 'How long does a typical software project take?',
      answer: 'Project timelines vary based on scope. MVP projects typically take 8-12 weeks, while enterprise solutions take 3-6 months. We provide detailed timelines during project planning.',
    },
  ],
});

export default function SoftwarePage() {
  const schemas = createSchemaMarkup({
    canonical: 'https://elsxglobal.com/software/',
    serviceSchema: {
      name: 'Custom Software Development',
      description: 'Enterprise-grade custom software development services in India.',
      provider: 'ELSxGlobal',
      areaServed: 'India, UAE, USA, UK, Singapore',
      category: 'Software Development',
    },
    breadcrumb: [
      { name: 'Home', url: 'https://elsxglobal.com/' },
      { name: 'Services', url: 'https://elsxglobal.com/services/' },
      { name: 'Software Development', url: 'https://elsxglobal.com/software/' },
    ],
  });

  return (
    <>
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />
      ))}
      <SolutionPage
        eyebrow="Software Development"
        title={
          <>
            Built for your business.
            <br />
            <span className="text-gradient">Engineered for scale.</span>
          </>
        }
        description="Custom enterprise software that solves real business problems. From web applications to mobile apps, API platforms to microservices — we build software that lasts."
        stats={[
          { value: '200+', label: 'Projects Delivered' },
          { value: '99.9%', label: 'Uptime SLA' },
          { value: '3x', label: 'Faster Delivery' },
          { value: '40+', label: 'Tech Experts' },
        ]}
        features={[
          {
            icon: Code2,
            title: 'Custom Web Applications',
            desc: 'Scalable web applications built with React, Next.js, and Node.js for enterprise requirements.',
          },
          {
            icon: Smartphone,
            title: 'Mobile App Development',
            desc: 'Native and cross-platform mobile apps for iOS and Android with offline capabilities.',
          },
          {
            icon: Layers,
            title: 'API Platforms',
            desc: 'RESTful and GraphQL APIs that power your ecosystem and integrate with third-party services.',
          },
          {
            icon: Server,
            title: 'Microservices',
            desc: 'Modular, scalable architecture that lets your systems grow independently.',
          },
          {
            icon: RefreshCw,
            title: 'Legacy Modernization',
            desc: 'Transform legacy systems into modern, cloud-native applications without disrupting operations.',
          },
          {
            icon: Database,
            title: 'Database Architecture',
            desc: 'High-performance database design with PostgreSQL, MongoDB, Redis, and data warehousing.',
          },
          {
            icon: Shield,
            title: 'Security Engineering',
            desc: 'Security-first development with OWASP compliance, encryption, and vulnerability testing.',
          },
          {
            icon: Zap,
            title: 'Performance Optimization',
            desc: 'Sub-second load times, efficient caching, and scalable infrastructure that handles millions.',
          },
        ]}
        process={[
          { step: 'Discover', title: 'Requirements Analysis', desc: 'We deeply understand your business, users, and technical requirements before writing a single line of code.' },
          { step: 'Design', title: 'Architecture & UX', desc: 'We design scalable architecture and intuitive interfaces that your users will love.' },
          { step: 'Develop', title: 'Agile Development', desc: 'We build in sprints with daily standups, continuous integration, and automated testing.' },
          { step: 'Deliver', title: 'Deployment & Support', desc: 'We deploy with zero downtime and provide ongoing support, monitoring, and optimization.' },
        ]}
      />
    </>
  );
}
