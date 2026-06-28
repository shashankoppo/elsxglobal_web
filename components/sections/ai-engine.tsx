'use client';

import {
  TrendingUp,
  Bot,
  Workflow,
  FileText,
  ScanEye,
  Cpu,
  Brain,
  Database,
  type LucideIcon,
} from 'lucide-react';
import { SectionHeading } from '@/components/site/section-heading';

const STAGES: { icon: LucideIcon; label: string; desc: string }[] = [
  { icon: Database, label: 'Data Integration', desc: 'Unify every system, transaction, and signal into one intelligent layer.' },
  { icon: Brain, label: 'AI Intelligence', desc: 'Models that learn your business and surface patterns.' },
  { icon: Workflow, label: 'Automation', desc: 'Decisions and actions executed without human friction.' },
  { icon: TrendingUp, label: 'Growth', desc: 'Compounding improvements across speed, cost, and revenue.' },
];

const CAPABILITIES: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: TrendingUp, title: 'Predictive Analytics', desc: 'Forecast demand, churn, and risk before they happen.' },
  { icon: Bot, title: 'AI Business Assistants', desc: 'Context-aware copilots supporting decisions at every level.' },
  { icon: Workflow, title: 'Intelligent Automation', desc: 'Eliminate repetition at scale across every department.' },
  { icon: FileText, title: 'NLP & Document AI', desc: 'Turn unstructured data into structured insight automatically.' },
  { icon: ScanEye, title: 'Computer Vision', desc: 'Automate visual inspection, quality control, and monitoring.' },
  { icon: Cpu, title: 'ML Pipeline Operations', desc: 'Models that improve with your data — continuously.' },
];

export function AIEngine() {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden bg-card/20">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="AI-First Enterprise"
          title={
            <>
              Intelligence Is Your
              <br />
              <span className="text-gradient">Competitive Advantage</span>
            </>
          }
          description="The ELSxGlobal AI engine turns raw business data into automated action and measurable growth — a continuous loop that makes your organization smarter every day."
        />

        {/* Process Flow */}
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STAGES.map((stage, i) => (
            <div key={stage.label} className="relative">
              <div className="glass-panel rounded-xl p-6 h-full">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 mb-4">
                  <stage.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-base font-semibold mb-2">{stage.label}</h3>
                <p className="text-sm text-muted-foreground">{stage.desc}</p>
              </div>
              {i < STAGES.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                  <div className="w-6 h-px bg-border" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Capabilities Grid */}
        <div className="mt-16">
          <h3 className="text-lg font-semibold mb-6">AI Capabilities</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CAPABILITIES.map((c) => (
              <div
                key={c.title}
                className="glass-panel rounded-lg p-5 hover:border-primary/30 transition-colors"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 mb-3">
                  <c.icon className="h-4.5 w-4.5 text-primary" />
                </div>
                <h4 className="text-sm font-semibold mb-1.5">{c.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
