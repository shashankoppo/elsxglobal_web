'use client';

import { Compass, Code, Rocket, LineChart, ArrowRight, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

const STEPS = [
  {
    icon: Compass,
    title: 'Discovery',
    description: 'Deep understanding of your business, challenges, and objectives.',
    duration: '1-2 weeks',
  },
  {
    icon: Code,
    title: 'Architecture',
    description: 'Technical design and solution architecture for your unique needs.',
    duration: '2-4 weeks',
  },
  {
    icon: Rocket,
    title: 'Build',
    description: 'Iterative development with continuous integrations and feedback.',
    duration: '4-12 weeks',
  },
  {
    icon: LineChart,
    title: 'Optimize',
    description: 'Performance tuning, monitoring, and continuous improvements.',
    duration: 'Ongoing',
  },
];

export function ProcessSection() {
  return (
    <section className="section-padding relative">
      <div className="container-wide px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="max-w-2xl mb-12">
          <p className="text-primary font-medium mb-3">Our Process</p>
          <h2 className="text-display-md mb-4">
            From Vision to Production
          </h2>
          <p className="text-muted-foreground">
            A proven methodology that transforms complex requirements into
            working solutions on time and within budget.
          </p>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, index) => (
            <ScrollReveal key={step.title} delay={index * 100}>
              <div className="relative group">
                <div className="card-interactive p-6 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground text-sm font-bold shadow-sm">
                      {index + 1}
                    </div>
                    <div className="icon-container h-10 w-10">
                      <step.icon className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">{step.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {step.description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                    {step.duration}
                  </span>
                </div>
                {index < STEPS.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-3 transform -translate-y-1/2 z-10 w-6 h-6 items-center justify-center bg-card rounded-full border border-border/50 group-hover:border-primary/30 transition-colors">
                    <ArrowRight className="h-3 w-3 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
