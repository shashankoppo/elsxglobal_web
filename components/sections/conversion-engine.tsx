'use client';

import { CalendarClock, FileText, PhoneCall, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLead, type LeadIntent } from '@/components/site/lead-context';
import { AuroraBackground } from '@/components/site/aurora-background';

const CTAS: { intent: LeadIntent; icon: typeof FileText; title: string; desc: string; cta: string }[] = [
  {
    intent: 'consultation',
    icon: CalendarClock,
    title: 'Book a Consultation',
    desc: 'A tailored strategy session with a senior transformation advisor.',
    cta: 'Book Consultation',
  },
  {
    intent: 'proposal',
    icon: FileText,
    title: 'Request a Proposal',
    desc: 'Tell us your goals and receive a scoped proposal within 48 hours.',
    cta: 'Request Proposal',
  },
  {
    intent: 'discovery',
    icon: PhoneCall,
    title: 'Schedule a Discovery Call',
    desc: 'A 30-minute call to map priorities and identify quick wins.',
    cta: 'Schedule Call',
  },
];

export function ConversionEngine() {
  const { openLead } = useLead();

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-background" />
      <AuroraBackground />
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-3.5 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse-glow" />
            Let&apos;s Begin
          </div>
          <h2 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05]">
            Ready To Build The Next
            <br />
            <span className="text-gradient">Version Of Your Organization?</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            The organizations that lead the next decade are building their
            foundations today. Let&apos;s build yours.
          </p>
        </div>

        <div className="mt-14 grid sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {CTAS.map((c) => (
            <div
              key={c.intent}
              className="glass-strong rounded-2xl p-7 text-center hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <c.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-base font-semibold mb-2">{c.title}</h3>
              <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                {c.desc}
              </p>
              <Button
                onClick={() => openLead(c.intent)}
                className="w-full bg-primary hover:bg-primary/90 group/btn"
              >
                {c.cta}
                <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
