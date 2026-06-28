'use client';

import { Compass, Cpu, Settings, Workflow, BarChart3, ArrowRight, Check } from 'lucide-react';
import { SectionHeading } from '@/components/site/section-heading';

const PILLARS = [
  { icon: Compass, label: 'Strategy', desc: 'A clear roadmap grounded in your business reality — not technology trends.' },
  { icon: Cpu, label: 'Technology', desc: 'Enterprise systems engineered for 3-year scale, not 3-month fixes.' },
  { icon: Settings, label: 'Operations', desc: 'Processes redesigned for speed, reliability, and measurable outcomes.' },
  { icon: Workflow, label: 'Automation', desc: 'Friction eliminated across every workflow and department.' },
  { icon: BarChart3, label: 'Analytics', desc: 'Decisions driven by live intelligence, not lagging reports.' },
];

const DIFFERENTIATORS = [
  'We start with business outcomes, not technology choices.',
  'We architect for 3-year scale, not 3-month fixes.',
  'We integrate across your entire stack — not just one department.',
  'We operate alongside you — not just hand off deliverables.',
  'We measure results in business metrics, not IT tickets.',
];

export function WhyElsxglobal() {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden bg-card/20">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="The ELSxGlobal Framework"
          title={
            <>
              Technology Alone Doesn't Create Growth.
              <br />
              <span className="text-gradient">Execution Does.</span>
            </>
          }
          description="Most transformations fail not because the technology is wrong, but because strategy, operations, and execution are disconnected. Our framework unifies them."
        />

        {/* Pillars */}
        <div className="mt-16 flex flex-col lg:flex-row items-stretch gap-4">
          {PILLARS.map((p, i) => (
            <div key={p.label} className="flex items-center gap-3 flex-1">
              <div className="glass-panel rounded-xl p-5 flex-1 hover:border-primary/30 transition-colors">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 mb-4">
                  <p.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-sm font-semibold mb-1">{p.label}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {p.desc}
                </p>
              </div>
              {i < PILLARS.length - 1 && (
                <div className="hidden lg:flex items-center text-border">
                  <ArrowRight className="h-4 w-4" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Result */}
        <div className="mt-8 flex flex-col items-center">
          <div className="text-border text-xl font-light mb-4">=</div>
          <div className="glass-strong rounded-xl px-8 py-5 text-center">
            <p className="text-xs uppercase tracking-wider text-primary mb-1">
              The Result
            </p>
            <p className="text-xl font-semibold">Sustainable Growth</p>
          </div>
        </div>

        {/* Differentiators */}
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {DIFFERENTIATORS.map((d, i) => (
            <div
              key={i}
              className="glass-panel rounded-lg p-4 hover:border-primary/30 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/15 border border-primary/30 shrink-0 mt-0.5">
                  <Check className="h-3 w-3 text-primary" />
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {d}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
