'use client';

import Link from 'next/link';
import { ArrowRight, Factory, HeartPulse, Landmark, Banknote, ShoppingBag, Building2, GraduationCap, Rocket } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

const INDUSTRIES = [
  { icon: Factory, name: 'Manufacturing', slug: 'manufacturing' },
  { icon: HeartPulse, name: 'Healthcare', slug: 'healthcare' },
  { icon: Banknote, name: 'Financial Services', slug: 'financial-services' },
  { icon: GraduationCap, name: 'Education', slug: 'education' },
  { icon: Landmark, name: 'Government', slug: 'government' },
  { icon: ShoppingBag, name: 'Retail & E-commerce', slug: 'retail' },
  { icon: Building2, name: 'Real Estate', slug: 'real-estate' },
  { icon: Rocket, name: 'Startups', slug: 'startups' },
];

export function IndustriesGrid() {
  return (
    <section className="section-padding bg-muted/20 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-[0.02]" />
      <div className="container-wide px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-primary font-medium mb-3">Industries</p>
          <h2 className="text-display-md mb-4">
            Industry-Specific Solutions
          </h2>
          <p className="text-muted-foreground">
            Every industry has unique challenges. We bring deep domain expertise
            to deliver solutions that understand your context.
          </p>
        </ScrollReveal>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {INDUSTRIES.map((industry, idx) => (
            <ScrollReveal key={industry.slug} delay={idx * 50} animation="fade-scale">
              <Link
                href={`/industries/${industry.slug}`}
                className="liquid-glass-card p-5 flex items-center gap-3 group"
              >
                <div className="icon-container h-10 w-10 shrink-0">
                  <industry.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-sm truncate group-hover:text-primary transition-colors">{industry.name}</p>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={500} className="text-center mt-8">
          <Link
            href="/industries"
            className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors group"
          >
            View all industries
            <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
