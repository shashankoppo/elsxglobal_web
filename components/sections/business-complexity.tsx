'use client';

import {
  Unplug,
  Hand,
  Database,
  ShieldAlert,
  Gauge,
  EyeOff,
  Code,
  Boxes,
  Workflow,
  Brain,
  ShieldCheck,
  Eye,
  Rocket,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import { SectionHeading } from '@/components/site/section-heading';

const CHALLENGES: { icon: LucideIcon; label: string }[] = [
  { icon: Unplug, label: 'Disconnected Systems' },
  { icon: Hand, label: 'Manual Processes' },
  { icon: Database, label: 'Siloed Data & Reporting' },
  { icon: ShieldAlert, label: 'Compliance Gaps' },
  { icon: Gauge, label: 'Operational Bottlenecks' },
  { icon: EyeOff, label: 'No Unified Visibility' },
];

const SOLUTIONS: { icon: LucideIcon; label: string }[] = [
  { icon: Boxes, label: 'Unified Enterprise Platform' },
  { icon: Workflow, label: 'Intelligent Automation' },
  { icon: Brain, label: 'Real-Time Business Insight' },
  { icon: ShieldCheck, label: 'Regulatory Compliance' },
  { icon: Eye, label: 'Executive-Level Visibility' },
  { icon: Rocket, label: 'Future-Ready Foundation' },
];

export function BusinessComplexity() {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden bg-card/20">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="The Challenge"
          title={
            <>
              Growth Should Not
              <br />
              <span className="text-gradient">Create Chaos</span>
            </>
          }
          description="Most organizations reach a ceiling — not because they lack ambition, but because their systems, data, and operations can't keep pace with scale."
        />

        <div className="mt-16 grid md:grid-cols-2 gap-12 items-start">
          {/* Challenges */}
          <div>
            <h3 className="text-lg font-semibold text-muted-foreground mb-6">
              Common Pain Points
            </h3>
            <div className="space-y-3">
              {CHALLENGES.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-4 p-4 rounded-lg bg-card/50 border border-border"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10 border border-destructive/20">
                    <item.icon className="h-5 w-5 text-destructive/80" />
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-6">
              ELSxGlobal Solutions
            </h3>
            <div className="space-y-3">
              {SOLUTIONS.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-4 p-4 rounded-lg bg-card/50 border border-border hover:border-primary/40 transition-colors"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex items-center justify-center gap-3">
          <span className="text-sm text-muted-foreground">
            ELSxGlobal closes the gap between where you are and where you could be.
          </span>
          <ArrowRight className="h-4 w-4 text-primary" />
        </div>
      </div>
    </section>
  );
}
