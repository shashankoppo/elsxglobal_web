'use client';

import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLead } from '@/components/site/lead-context';
import { AuroraBackground } from '@/components/site/aurora-background';

export function CTASection({
  title = 'Ready To Build The Next Version Of Your Organization?',
  description = 'The organizations that lead the next decade are building their foundations today. Let\u2019s build yours.',
}: {
  title?: string;
  description?: string;
}) {
  const { openLead } = useLead();

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-background" />
      <AuroraBackground />
      <div className="absolute inset-0 grid-bg opacity-20" />

      {/* Gradient border card */}
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="liquid-glass-strong rounded-3xl p-10 sm:p-14 text-center border-gradient animate-glow-pulse">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-glow" />
            <span className="text-gradient-warm">Start Today</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight leading-[1.1] text-gradient">
            {title}
          </h2>

          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>

          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              onClick={() => openLead('consultation')}
              className="h-12 px-7 text-base btn-premium group glow-primary"
            >
              Book Strategy Consultation
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => openLead('proposal')}
              className="h-12 px-7 text-base border-border/60 bg-card/30 backdrop-blur-sm hover:bg-card/60 hover:border-accent/40"
            >
              Request a Proposal
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
