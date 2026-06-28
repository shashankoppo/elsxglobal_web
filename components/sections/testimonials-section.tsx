'use client';

import { Star, Quote } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

const TESTIMONIALS = [
  {
    quote: "ELSxGlobal didn't just implement software — they rethought how our entire operation runs. 18 months later, we're a different company.",
    name: 'Rajesh Kumar',
    title: 'COO',
    company: 'Manufacturing Enterprise',
  },
  {
    quote: "The difference between ELSxGlobal and every other partner we've worked with is that they think like business leaders, not just technologists.",
    name: 'Priya Sharma',
    title: 'CTO',
    company: 'Financial Services Firm',
  },
  {
    quote: "Their AI solution predicted customer churn with 94% accuracy, saving us ₹2.4 Cr in the first year alone. Exceptional delivery.",
    name: 'Vikram Singh',
    title: 'VP Operations',
    company: 'E-commerce Platform',
  },
];

export function TestimonialsSection() {
  return (
    <section className="section-padding bg-muted/10 relative overflow-hidden">
      <div className="absolute inset-0 bg-dots opacity-[0.015]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-radial from-primary/5 to-transparent rounded-full blur-3xl" />
      <div className="container-wide px-4 sm:px-6 lg:px-8 relative">
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-primary font-medium mb-3">Client Success</p>
          <h2 className="text-display-md mb-4">
            What Our Clients Say
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <ScrollReveal key={t.name} delay={idx * 100}>
              <div className="liquid-glass-card p-6 relative group h-full">
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity rotate-12">
                  <Quote className="h-4 w-4 text-primary -rotate-12" />
                </div>
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-foreground/90 mb-6 leading-relaxed text-sm">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3 pt-4 mt-auto border-t border-border/30">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-primary/15 to-primary/5 text-primary font-semibold text-sm ring-1 ring-primary/10">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {t.title}, {t.company}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
