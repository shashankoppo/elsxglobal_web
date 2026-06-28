'use client';

import {
  Gauge,
  Brain,
  PiggyBank,
  TrendingUp,
  Eye,
  ShieldCheck,
  BarChart3,
  type LucideIcon,
} from 'lucide-react';
import { SectionHeading } from '@/components/site/section-heading';

const OUTCOMES: { icon: LucideIcon; label: string; value: string; desc: string }[] = [
  { icon: Gauge, label: 'Faster Operations', value: '3.2x', desc: 'process speed' },
  { icon: Brain, label: 'Better Decision Making', value: '64%', desc: 'faster decisions' },
  { icon: PiggyBank, label: 'Reduced Costs', value: '38%', desc: 'lower operating cost' },
  { icon: TrendingUp, label: 'Increased Productivity', value: '2.7x', desc: 'output per team' },
  { icon: Eye, label: 'Higher Visibility', value: '100%', desc: 'real-time coverage' },
  { icon: ShieldCheck, label: 'Stronger Security', value: '99.9%', desc: 'threat prevention' },
  { icon: BarChart3, label: 'Business Intelligence', value: '24/7', desc: 'live insights' },
];

export function BusinessOutcomes() {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Business Outcomes"
          title={
            <>
              Technology Is Only Valuable
              <br />
              <span className="text-gradient">When It Produces Results</span>
            </>
          }
          description="We measure success in your business outcomes — not in features shipped. These are the measurable improvements our ecosystem delivers."
        />

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {OUTCOMES.map((o) => (
            <div
              key={o.label}
              className="glass-panel rounded-xl p-5 hover:border-primary/30 transition-colors"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 mb-4">
                <o.icon className="h-5 w-5 text-primary" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-semibold text-foreground tabular-nums">
                  {o.value}
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{o.desc}</p>
              <p className="mt-3 text-sm font-medium text-foreground">{o.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
