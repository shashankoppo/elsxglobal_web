'use client';

import Link from 'next/link';
import {
  Factory,
  GraduationCap,
  HeartPulse,
  Landmark,
  Banknote,
  ShoppingBag,
  Building2,
  HandHeart,
  Rocket,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import { SectionHeading } from '@/components/site/section-heading';

type Industry = {
  icon: LucideIcon;
  name: string;
  tagline: string;
  detail: string;
};

const INDUSTRIES: Industry[] = [
  {
    icon: Factory,
    name: 'Manufacturing',
    tagline: 'From reactive operations to predictive excellence.',
    detail: 'ERP automation, supply chain AI, quality intelligence.',
  },
  {
    icon: GraduationCap,
    name: 'Education',
    tagline: 'From legacy administration to intelligent campuses.',
    detail: 'ERP for institutions, digital portals, analytics.',
  },
  {
    icon: HeartPulse,
    name: 'Healthcare',
    tagline: 'From paperwork to patient-first digital workflows.',
    detail: 'Compliance, records automation, operational efficiency.',
  },
  {
    icon: Landmark,
    name: 'Government & PSU',
    tagline: 'From manual governance to digital sovereignty.',
    detail: 'e-Governance, security, citizen data management.',
  },
  {
    icon: Banknote,
    name: 'Financial Services',
    tagline: 'From compliance burden to competitive intelligence.',
    detail: 'RegTech, automation, fraud detection AI.',
  },
  {
    icon: ShoppingBag,
    name: 'Retail & E-commerce',
    tagline: 'From disconnected channels to unified commerce.',
    detail: 'Omnichannel ERP, inventory AI, customer analytics.',
  },
  {
    icon: Building2,
    name: 'Real Estate',
    tagline: 'From spreadsheets to intelligent property operations.',
    detail: 'CRM, project tracking, digital transactions.',
  },
  {
    icon: HandHeart,
    name: 'NGOs & Social Sector',
    tagline: 'From reporting overhead to mission-focused scale.',
    detail: 'Impact analytics, donor CRM, operational efficiency.',
  },
  {
    icon: Rocket,
    name: 'Startups & Scale-ups',
    tagline: 'From zero to enterprise-grade infrastructure.',
    detail: 'Full-stack transformation for hypergrowth.',
  },
];

export function Industries() {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden bg-card/20">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Industry Transformation"
          title={
            <>
              Built for the Industries
              <br />
              <span className="text-gradient">Driving Tomorrow's Economy</span>
            </>
          }
          description="We build industry-specific transformation strategies grounded in the outcomes your sector demands."
        />

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {INDUSTRIES.map((ind) => (
            <Link
              key={ind.name}
              href="/industries"
              className="group liquid-glass-card rounded-xl p-5 hover:border-primary/40 transition-colors"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 mb-4 group-hover:bg-primary/15 transition-colors">
                <ind.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-base font-semibold mb-1.5">{ind.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">
                {ind.tagline}
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {ind.detail}
              </p>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-primary mt-4">
                Learn more
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
