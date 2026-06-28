'use client';

import { Star, ArrowUpRight, Quote } from 'lucide-react';
import { SectionHeading } from '@/components/site/section-heading';

const CASE_CARDS = [
  {
    industry: 'Manufacturing',
    challenge: 'Manual production tracking, zero predictive capability',
    solution: 'AI + ERP integration across 4 plants',
    result: '43% reduction in downtime. ₹2.1Cr saved in Year 1.',
    metric: '43%',
    metricLabel: 'Downtime Reduction',
  },
  {
    industry: 'Financial Services',
    challenge: 'Compliance burden, manual fraud detection',
    solution: 'RegTech automation + AI fraud detection',
    result: '₹12M fraud prevented. 62% fewer false positives.',
    metric: '₹12M',
    metricLabel: 'Fraud Prevented',
  },
  {
    industry: 'Healthcare',
    challenge: 'Fragmented patient records, diagnostic delays',
    solution: 'Unified records platform + predictive diagnostics',
    result: '2.1x faster diagnostics. 34% higher patient satisfaction.',
    metric: '2.1x',
    metricLabel: 'Faster Diagnostics',
  },
];

const TESTIMONIALS = [
  {
    quote:
      "ELSxGlobal didn't just implement software — they rethought how our entire operation runs. 18 months later, we're a different company.",
    name: 'Rajesh Kumar',
    title: 'COO',
    company: 'Manufacturing Enterprise',
  },
  {
    quote:
      "The difference between ELSxGlobal and every other partner we've worked with is that they think like business leaders, not just technologists.",
    name: 'Priya Sharma',
    title: 'CTO',
    company: 'Financial Services Firm',
  },
];

export function SocialProof() {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Results & Testimonials"
          title={
            <>
              Organizations That Chose
              <br />
              <span className="text-gradient">Transformation Over Status Quo</span>
            </>
          }
        />

        <div className="mt-16 grid lg:grid-cols-3 gap-4">
          {CASE_CARDS.map((c) => (
            <div
              key={c.industry}
              className="group glass-panel rounded-xl p-5 hover:border-primary/30 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded">
                  {c.industry}
                </span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground/40" />
              </div>
              <div className="mb-4">
                <p className="text-2xl font-semibold">{c.metric}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {c.metricLabel}
                </p>
              </div>
              <div className="space-y-2 text-sm">
                <p className="text-muted-foreground">
                  <span className="text-destructive/80 font-medium">Challenge: </span>
                  {c.challenge}
                </p>
                <p className="text-muted-foreground">
                  <span className="text-primary font-medium">Solution: </span>
                  {c.solution}
                </p>
                <p className="text-foreground font-medium pt-1">{c.result}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 grid sm:grid-cols-2 gap-4">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="glass-strong rounded-xl p-6 relative">
              <Quote className="absolute top-5 right-5 h-6 w-6 text-primary/15" />
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-base text-foreground/90 leading-relaxed mb-5">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 border border-primary/20 text-sm font-semibold text-primary">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {t.title}, {t.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
