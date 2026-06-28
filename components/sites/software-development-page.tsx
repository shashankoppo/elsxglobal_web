'use client';

import { ArrowRight, Check, Code, Layers, Database, Cloud, Shield, Zap, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLead } from '@/components/site/lead-context';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const serviceData = {
  title: 'Custom Software Development',
  subtitle: 'Enterprise Solutions',
  description: 'Enterprise-grade software engineered for scale, security, and measurable business outcomes. From complex distributed systems to elegant APIs—we build software that transforms how organizations operate.',
  heroStats: [
    { value: '200+', label: 'Projects Delivered' },
    { value: '99.2%', label: 'Success Rate' },
    { value: '3.2x', label: 'Avg. Performance Gain' },
  ],
  capabilities: [
    {
      title: 'Enterprise Applications',
      description: 'Scalable, secure applications built for mission-critical operations. From ERP extensions to customer portals.',
      features: ['Multi-tenant architecture', 'Role-based access control', 'Audit logging', 'Compliance-ready'],
    },
    {
      title: 'API Development',
      description: 'RESTful and GraphQL APIs designed for performance, security, and developer experience.',
      features: ['OpenAPI documentation', 'Rate limiting', 'OAuth 2.0', 'Version management'],
    },
    {
      title: 'Microservices Architecture',
      description: 'Distributed systems that scale independently and fail gracefully.',
      features: ['Container orchestration', 'Service mesh', 'Event-driven', 'Circuit breakers'],
    },
    {
      title: 'Legacy Modernization',
      description: 'Transform outdated systems into modern, maintainable applications.',
      features: ['Code refactoring', 'Database migration', 'API enablement', 'Phased rollout'],
    },
  ],
  technologies: [
    { name: 'Node.js', category: 'Backend' },
    { name: 'Python', category: 'Backend' },
    { name: 'Go', category: 'Backend' },
    { name: 'Java', category: 'Backend' },
    { name: 'React', category: 'Frontend' },
    { name: 'Next.js', category: 'Frontend' },
    { name: 'Vue', category: 'Frontend' },
    { name: 'TypeScript', category: 'Language' },
    { name: 'PostgreSQL', category: 'Database' },
    { name: 'MongoDB', category: 'Database' },
    { name: 'Redis', category: 'Cache' },
    { name: 'Kubernetes', category: 'Infrastructure' },
  ],
  industries: ['Manufacturing', 'Healthcare', 'Financial Services', 'E-commerce', 'Logistics', 'Education'],
  faqs: [
    { question: 'How long does custom software development take?', answer: 'Timeline varies based on complexity. Simple applications: 8-12 weeks. Enterprise systems: 4-6 months. We provide detailed estimates after discovery.' },
    { question: 'What is your development methodology?', answer: 'We use Agile with 2-week sprints, ensuring continuous delivery and stakeholder feedback. This reduces risk and ensures the final product meets expectations.' },
    { question: 'Do you provide post-launch support?', answer: 'Yes. We offer tiered support plans including bug fixes, performance monitoring, security updates, and feature enhancements.' },
    { question: 'Can you work with our existing team?', answer: 'Absolutely. We offer staff augmentation, co-development, and full team training. We adapt to your workflow and tools.' },
  ],
};

export function SoftwareDevelopmentPage() {
  const { openLead } = useLead();

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-[0.03]" />
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Code className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm font-medium text-primary">Custom Software Development</span>
            </div>
            <h1 className="text-display-lg mb-6">
              Software Development Company in India
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mb-8">
              {serviceData.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={() => openLead('consultation')} className="btn-primary h-12 px-8">
                Get Free Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" asChild className="h-12 px-8">
                <Link href="#capabilities">View Capabilities</Link>
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-12 border-t">
            {serviceData.heroStats.map((stat) => (
              <div key={stat.label}>
                <p className="text-4xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section id="capabilities" className="section-padding bg-muted/20">
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-primary font-medium mb-3">Capabilities</p>
            <h2 className="text-display-md mb-4">What We Build</h2>
            <p className="text-muted-foreground">
              Full-stack development capabilities from frontend to backend to infrastructure.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {serviceData.capabilities.map((cap) => (
              <div key={cap.title} className="card-interactive p-6 group">
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">{cap.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{cap.description}</p>
                <div className="flex flex-wrap gap-2">
                  {cap.features.map((f) => (
                    <span key={f} className="badge-muted">{f}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="section-padding">
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-primary font-medium mb-3">Technology Stack</p>
            <h2 className="text-display-md mb-4">Modern Technologies</h2>
            <p className="text-muted-foreground">
              We use battle-tested technologies that scale.
            </p>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4">
            {serviceData.technologies.map((tech) => (
              <div key={tech.name} className="card-interactive p-4 text-center group">
                <p className="font-medium text-sm group-hover:text-primary transition-colors">{tech.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{tech.category}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding bg-muted/20">
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-primary font-medium mb-3">Process</p>
            <h2 className="text-display-md mb-4">How We Work</h2>
            <p className="text-muted-foreground">
              A proven methodology that delivers on time and within budget.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { step: 1, title: 'Discovery', desc: 'Understand requirements, systems, and success metrics', duration: '1-2 weeks' },
              { step: 2, title: 'Architecture', desc: 'Design scalable, secure solutions', duration: '2-3 weeks' },
              { step: 3, title: 'Development', desc: 'Iterative sprints with continuous integration', duration: '4-12 weeks' },
              { step: 4, title: 'Testing', desc: 'Automated, security, and performance testing', duration: '2-3 weeks' },
              { step: 5, title: 'Deployment', desc: 'Zero-downtime production rollout', duration: '1-2 weeks' },
              { step: 6, title: 'Support', desc: 'Ongoing maintenance and improvements', duration: 'Ongoing' },
            ].map((item) => (
              <div key={item.step} className="card-minimal p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                    {item.step}
                  </div>
                  <h3 className="font-semibold">{item.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{item.desc}</p>
                <p className="text-xs font-medium text-primary">{item.duration}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="section-padding">
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-primary font-medium mb-3">Industries</p>
            <h2 className="text-display-md mb-4">Industry Expertise</h2>
            <p className="text-muted-foreground">
              Deep domain knowledge across key sectors.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {serviceData.industries.map((ind) => (
              <Link
                key={ind}
                href={`/industries/${ind.toLowerCase().replace(/\s+/g, '-')}`}
                className="card-minimal p-4 text-center hover:border-primary/30"
              >
                <p className="font-medium text-sm">{ind}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-muted/20">
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-primary font-medium mb-3">FAQ</p>
              <h2 className="text-display-md">Common Questions</h2>
            </div>

            <div className="space-y-4">
              {serviceData.faqs.map((faq, i) => (
                <div key={i} className="card-minimal p-6">
                  <h3 className="font-semibold mb-2">{faq.question}</h3>
                  <p className="text-sm text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-wide px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-display-md mb-4">Ready to Build Your Software?</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
            Get a free technical consultation. We'll discuss your requirements
            and provide a detailed project estimate.
          </p>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => openLead('consultation')}
            className="h-12 px-8"
          >
            Schedule Free Consultation
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>
    </>
  );
}
