'use client';

import { Star, ArrowRight } from 'lucide-react';
import { SectionHeading } from '@/components/site/section-heading';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { useLead } from '@/components/site/lead-context';

const testimonials = [
  {
    name: 'Rahul Mehta',
    role: 'CTO',
    company: 'FinEdge Corp',
    quote: 'ELSxGlobal transformed our entire technology stack. Our operational efficiency increased by 40% within the first quarter.',
    stars: 5,
  },
  {
    name: 'Priya Sharma',
    role: 'Operations Director',
    company: 'MedFlow Healthcare',
    quote: 'The ERP integration they delivered has completely streamlined our hospital operations across 12 locations.',
    stars: 5,
  },
  {
    name: 'Amit Patel',
    role: 'CEO',
    company: 'TechVenture Labs',
    quote: 'From concept to deployment in 8 weeks. Their AI implementation saved us months of development time.',
    stars: 5,
  },
  {
    name: 'Sarah Johnson',
    role: 'VP of Digital',
    company: 'GlobalRetail Inc',
    quote: 'Our e-commerce platform conversion rate increased by 2.5x after their redesign. Incredible ROI.',
    stars: 5,
  },
  {
    name: 'David Chen',
    role: 'Head of IT',
    company: 'CloudScale Systems',
    quote: 'Migrated our entire infrastructure to AWS with zero downtime. Their cloud expertise is unmatched.',
    stars: 5,
  },
  {
    name: 'Neha Gupta',
    role: 'Founder',
    company: 'GrowthPixel Agency',
    quote: 'Their SEO strategy brought us from page 3 to position 1 on Google for 15 key terms within 6 months.',
    stars: 5,
  },
];

export function SocialProof() {
  const { openLead } = useLead();

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl" />
      <div className="container-wide px-4 sm:px-6 lg:px-8 relative">
        <SectionHeading
          eyebrow="Client Success"
          title="Trusted by Industry Leaders"
          description="Real results from real clients. Our clients see measurable outcomes within months of engagement."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {testimonials.map((t, i) => (
            <ScrollReveal
              key={t.name}
              delay={i * 100}
              className="block"
              animation={i < 3 ? 'fade-scale' : 'fade-up'}
            >
              <div className="group liquid-glass-card rounded-xl p-5 hover:border-primary/30 transition-colors">
                <div className="flex gap-1 mb-3">
                  {[...Array(t.stars)].map((_, s) => (
                    <Star key={s} className="h-4 w-4 text-accent fill-accent" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-4 text-foreground/80">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3 pt-3 border-t border-border/40">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}, {t.company}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Featured testimonial */}
        <ScrollReveal delay={600} className="mt-12">
          <div className="liquid-glass-strong rounded-xl p-6 relative">
            <div className="absolute top-4 right-4 text-6xl text-primary/5 font-serif leading-none">
              "
            </div>
            <div className="grid md:grid-cols-[1fr_2fr] gap-6 items-center">
              <div>
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-lg font-bold text-primary mb-3">
                  SK
                </div>
                <p className="font-semibold">Sunita Krishnan</p>
                <p className="text-sm text-muted-foreground">CEO, Krishnan Industries</p>
                <div className="flex gap-1 mt-2">
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} className="h-4 w-4 text-accent fill-accent" />
                  ))}
                </div>
              </div>
              <div>
                <p className="text-lg leading-relaxed mb-4">
                  "We evaluated 12 vendors before choosing ELSxGlobal. Their ability to understand our business needs, not just our technical requirements, was the differentiator. Three years later, they've become our strategic technology partner — handling everything from our ERP to our AI implementations."
                </p>
                <p className="text-sm text-muted-foreground">
                  — Sunita Krishnan, CEO, Krishnan Industries (Manufacturing, ₹500+ Cr revenue)
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <div className="text-center mt-12">
          <button
            onClick={() => openLead('consultation')}
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm font-medium"
          >
            Read case studies
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
