import { Metadata } from 'next';
import { createMetadata, createSchemaMarkup } from '@/lib/seo';
import { PageHero } from '@/components/site/page-hero';
import { CTASection } from '@/components/site/cta-section';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import {
  Factory, Heart, Landmark, ShoppingBag, Truck, Building, GraduationCap, ArrowRight
} from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = createMetadata({
  title: 'Industry Solutions | Enterprise Software for Manufacturing, Healthcare, Finance & More',
  description: 'Industry-specific technology solutions for manufacturing, healthcare, finance, retail, logistics, real estate, and education. ERP, software, and AI solutions tailored to your sector.',
  keywords: [
    'industry solutions India', 'manufacturing software', 'healthcare IT solutions', 'fintech solutions',
    'retail software', 'logistics software', 'real estate software', 'education technology',
    'ERP for manufacturing', 'hospital management system', 'banking software',
  ],
  canonical: 'https://elsxglobal.com/industries/',
  type: 'website',
  breadcrumb: [
    { name: 'Home', url: 'https://elsxglobal.com/' },
    { name: 'Industries', url: 'https://elsxglobal.com/industries/' },
  ],
});

const INDUSTRIES = [
  {
    icon: Factory,
    name: 'Manufacturing',
    slug: 'manufacturing',
    description: 'Smart factory solutions, ERP for manufacturing, Industry 4.0, and supply chain optimization.',
    stats: '40% efficiency improvement',
  },
  {
    icon: Heart,
    name: 'Healthcare',
    slug: 'healthcare',
    description: 'EMR, hospital management systems, telemedicine platforms, and healthcare IT solutions.',
    stats: '200+ healthcare clients',
  },
  {
    icon: Landmark,
    name: 'Financial Services',
    slug: 'financial-services',
    description: 'Core banking, fintech, payment processing, risk management, and compliance software.',
    stats: '3.5x faster processing',
  },
  {
    icon: ShoppingBag,
    name: 'Retail & E-commerce',
    slug: 'retail',
    description: 'Omnichannel commerce, POS systems, inventory management, and customer engagement.',
    stats: '2.5x conversion increase',
  },
  {
    icon: Truck,
    name: 'Logistics & Transportation',
    slug: 'logistics',
    description: 'Fleet management, route optimization, warehouse management, and freight tracking.',
    stats: '30% cost reduction',
  },
  {
    icon: Building,
    name: 'Real Estate',
    slug: 'real-estate',
    description: 'Property management, CRM for builders, lead management, and real estate marketing.',
    stats: '3x lead generation',
  },
  {
    icon: GraduationCap,
    name: 'Education',
    slug: 'education',
    description: 'LMS, school management systems, student portals, and online learning platforms.',
    stats: '50+ institutions',
  },
];

export default function IndustriesPage() {
  const schemas = createSchemaMarkup({
    canonical: 'https://elsxglobal.com/industries/',
    breadcrumb: [
      { name: 'Home', url: 'https://elsxglobal.com/' },
      { name: 'Industries', url: 'https://elsxglobal.com/industries/' },
    ],
  });

  return (
    <>
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />
      ))}
      <PageHero
        eyebrow="Industry Solutions"
        title={
          <>
            Technology built for
            <br />
            <span className="text-gradient">your industry.</span>
          </>
        }
        description="Industry-specific solutions that understand the unique challenges of your sector — from manufacturing to healthcare, finance to education."
      />

      <section className="relative py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {INDUSTRIES.map((industry, i) => (
              <ScrollReveal key={industry.slug} delay={i * 100}>
                <Link
                  href={`/industries/${industry.slug}/`}
                  className="group liquid-glass-card rounded-2xl p-6 h-full flex flex-col hover:border-primary/40 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors">
                      <industry.icon className="h-6 w-6 text-primary" />
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-primary transition-colors" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{industry.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                    {industry.description}
                  </p>
                  <div className="pt-3 border-t border-border/40">
                    <p className="text-sm font-medium text-primary">{industry.stats}</p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
