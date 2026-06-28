'use client';

import { Gauge, TrendingUp, PiggyBank, Shield, Clock } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

const OUTCOMES = [
  {
    icon: Gauge,
    value: '3.2x',
    label: 'Faster Operations',
    description: 'Average improvement in process speed',
  },
  {
    icon: PiggyBank,
    value: '38%',
    label: 'Cost Reduction',
    description: 'Average operating cost savings',
  },
  {
    icon: TrendingUp,
    value: '2.7x',
    label: 'Productivity Boost',
    description: 'Increase in team output',
  },
  {
    icon: Shield,
    value: '99.9%',
    label: 'Uptime Achieved',
    description: 'Infrastructure reliability',
  },
];

export function OutcomesSection() {
  return (
    <section className="section-padding bg-muted/20 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-primary/5 to-transparent rounded-full blur-3xl" />
      <div className="container-wide px-4 sm:px-6 lg:px-8 relative">
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-primary font-medium mb-3">Proven Results</p>
          <h2 className="text-display-md mb-4">
            Technology That Delivers
          </h2>
          <p className="text-muted-foreground">
            We measure success in business outcomes, not technology deployed.
            Here's what our clients achieve.
          </p>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {OUTCOMES.map((outcome, idx) => (
            <ScrollReveal key={outcome.label} delay={idx * 100} animation="fade-scale">
              <div className="text-center group">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 mb-5 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  <outcome.icon className="h-7 w-7 text-primary" />
                </div>
                <p className="text-4xl sm:text-5xl font-bold mb-2 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">{outcome.value}</p>
                <p className="font-semibold mb-1">{outcome.label}</p>
                <p className="text-sm text-muted-foreground">{outcome.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
