'use client';

import Link from 'next/link';
import { ArrowRight, Code, Globe, Brain, Boxes, Cloud, Shield, Megaphone, Headset } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

const SERVICES = [
  {
    icon: Code,
    title: 'Custom Software Development',
    description: 'Enterprise-grade applications built for scale, security, and performance. From MVPs to complex distributed systems.',
    href: '/software',
    cta: 'Build Software',
    featured: true,
  },
  {
    icon: Globe,
    title: 'Website Development',
    description: 'High-performance websites engineered for conversions, SEO, and user experience. E-commerce, portals, and web apps.',
    href: '/website-development',
    cta: 'Launch Website',
    featured: true,
  },
  {
    icon: Brain,
    title: 'AI & Machine Learning',
    description: 'Intelligent automation, predictive analytics, and AI solutions that deliver measurable business outcomes.',
    href: '/ai-solutions',
    cta: 'Explore AI',
    featured: true,
  },
  {
    icon: Boxes,
    title: 'ERP & CRM Systems',
    description: 'Unified enterprise platforms with Odoo, SAP, Salesforce, and Microsoft Dynamics implementations.',
    href: '/erp-crm',
    cta: 'Unify Systems',
    featured: false,
  },
  {
    icon: Cloud,
    title: 'Cloud Infrastructure',
    description: 'Scalable cloud architecture on AWS, Azure, and GCP designed for performance and cost optimization.',
    href: '/cloud',
    cta: 'Migrate to Cloud',
    featured: false,
  },
  {
    icon: Shield,
    title: 'Cybersecurity',
    description: 'Zero-trust security architecture, compliance services, and 24/7 threat monitoring.',
    href: '/cybersecurity',
    cta: 'Secure Business',
    featured: false,
  },
  {
    icon: Megaphone,
    title: 'Digital Marketing',
    description: 'SEO, paid acquisition, and conversion optimization that generates qualified leads at scale.',
    href: '/digital-marketing',
    cta: 'Grow Traffic',
    featured: false,
  },
  {
    icon: Headset,
    title: 'BPO & KPO Services',
    description: 'Outsourced business and knowledge processes that reduce costs while maintaining quality.',
    href: '/bpo-kpo',
    cta: 'Outsource Operations',
    featured: false,
  },
];

export function ServicesOverview() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-dots opacity-[0.015]" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-primary/[0.03] to-transparent rounded-full blur-3xl" />
      <div className="container-wide px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <ScrollReveal className="max-w-2xl mb-12">
          <p className="text-primary font-medium mb-3">Services</p>
          <h2 className="text-display-md mb-4">
            Comprehensive Technology Solutions
          </h2>
          <p className="text-lg text-muted-foreground">
            From strategy to execution, we deliver end-to-end technology solutions
            that drive measurable business outcomes.
          </p>
        </ScrollReveal>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((service, idx) => (
            <ScrollReveal key={service.href} delay={idx * 75}>
              <Link
                href={service.href}
                className={cn(
                  'group glass-card p-6 flex flex-col h-full block',
                  service.featured && 'border-primary/20'
                )}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">{service.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 flex-1">
                  {service.description}
                </p>
                <span className="inline-flex items-center text-sm font-medium text-primary group-hover:text-primary/80">
                  {service.cta}
                  <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
