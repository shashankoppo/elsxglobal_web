'use client';

import { ArrowRight, Calendar, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLead } from '@/components/site/lead-context';
import Link from 'next/link';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

export function CTASection() {
  const { openLead } = useLead();

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary to-primary/90" />
      <div className="absolute inset-0 bg-grid opacity-[0.03]" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/3 rounded-full blur-3xl" />

      <div className="container-wide px-4 sm:px-6 lg:px-8 text-center relative">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full liquid-glass-subtle mb-6">
            <Calendar className="h-4 w-4 text-white" />
            <span className="text-sm font-medium text-white">Free 30-minute consultation</span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <h2 className="text-display-md text-white mb-4">
            Ready to Transform Your Business?
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
            Schedule a free 30-minute consultation. No sales pitch—just a
            conversation about your challenges and possible solutions.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              onClick={() => openLead('consultation')}
              className="h-12 sm:h-14 px-8 text-base bg-white text-primary hover:bg-white/90 shadow-lg hover:shadow-xl transition-all"
            >
              Schedule Free Consultation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="h-12 sm:h-14 px-8 text-base border-white/30 text-white hover:bg-white/10 hover:border-white/40 backdrop-blur-sm"
            >
              <Link href="/services">View All Services</Link>
            </Button>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={400}>
          <div className="mt-8 flex items-center justify-center gap-6 text-white/70 text-sm">
            <span className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              +91 98765 43210
            </span>
            <span className="w-px h-4 bg-white/30" />
            <span>Available Mon-Sat, 9am-7pm IST</span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
