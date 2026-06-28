'use client';

import { useState } from 'react';
import {
  Brain,
  Boxes,
  Users,
  Cloud,
  Server,
  ShieldCheck,
  Workflow,
  BarChart3,
  Headset,
  BookOpen,
  Compass,
  type LucideIcon,
} from 'lucide-react';
import { SectionHeading } from '@/components/site/section-heading';
import { cn } from '@/lib/utils';

type Domain = {
  key: string;
  label: string;
  icon: LucideIcon;
  problem: string;
  solution: string;
  outcome: string;
};

const DOMAINS: Domain[] = [
  {
    key: 'ai',
    label: 'AI Solutions',
    icon: Brain,
    problem: 'Decisions rely on intuition instead of data.',
    solution: 'AI models that predict, recommend, and automate decisions.',
    outcome: 'Faster, evidence-based decisions across the organization.',
  },
  {
    key: 'erp',
    label: 'ERP Systems',
    icon: Boxes,
    problem: 'Finance, inventory, and operations live in separate systems.',
    solution: 'Unified ERP connecting every business function in real time.',
    outcome: 'A single source of truth for the entire organization.',
  },
  {
    key: 'crm',
    label: 'CRM Platform',
    icon: Users,
    problem: 'Customer relationships are scattered and inconsistent.',
    solution: 'CRM that unifies sales, service, and marketing.',
    outcome: 'Every customer interaction informed and contextual.',
  },
  {
    key: 'cloud',
    label: 'Cloud Infrastructure',
    icon: Cloud,
    problem: 'Rigid infrastructure cannot scale with demand.',
    solution: 'Elastic cloud architecture that grows and contracts with you.',
    outcome: 'Infrastructure that matches your business in real time.',
  },
  {
    key: 'hosting',
    label: 'Enterprise Hosting',
    icon: Server,
    problem: 'Unreliable hosting causes downtime and lost revenue.',
    solution: 'VaultHost enterprise hosting with 99.99% uptime.',
    outcome: 'Your business is always online, always fast.',
  },
  {
    key: 'security',
    label: 'Cybersecurity',
    icon: ShieldCheck,
    problem: 'Expanding attack surfaces outpace defensive capacity.',
    solution: 'Zero-trust security architecture with continuous monitoring.',
    outcome: 'Threats detected and neutralized before impact.',
  },
  {
    key: 'automation',
    label: 'Process Automation',
    icon: Workflow,
    problem: 'Manual, repetitive work drains productivity.',
    solution: 'Workflow automation that eliminates repetitive tasks.',
    outcome: 'People focus on strategy; systems handle the rest.',
  },
  {
    key: 'analytics',
    label: 'Business Analytics',
    icon: BarChart3,
    problem: 'Data exists but insights do not.',
    solution: 'Real-time analytics dashboards that turn data into decisions.',
    outcome: 'Every leader sees the same live picture of the business.',
  },
  {
    key: 'bpo',
    label: 'BPO Services',
    icon: Headset,
    problem: 'Non-core operations distract from strategic work.',
    solution: 'Business process outsourcing for operational scale.',
    outcome: 'Core team focuses on growth; we handle the rest.',
  },
  {
    key: 'kpo',
    label: 'KPO Services',
    icon: BookOpen,
    problem: 'Specialized knowledge work is expensive to staff.',
    solution: 'Knowledge process outsourcing for research and analysis.',
    outcome: 'Expert insights without the overhead of hiring.',
  },
  {
    key: 'consulting',
    label: 'Consulting',
    icon: Compass,
    problem: 'Strategy and execution rarely connect.',
    solution: 'Transformation consulting that bridges vision and delivery.',
    outcome: 'Roadmaps that actually get implemented.',
  },
];

export function EcosystemOrbit() {
  const [active, setActive] = useState<Domain>(DOMAINS[0]);

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="The Ecosystem"
          title={
            <>
              One Ecosystem.
              <br />
              <span className="text-gradient">Every Capability.</span>
            </>
          }
          description="ELSxGlobal is not a collection of services. It is an interconnected ecosystem where every domain reinforces the others."
        />

        <div className="mt-16 grid lg:grid-cols-12 gap-8">
          {/* Domain Grid */}
          <div className="lg:col-span-7">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {DOMAINS.map((d) => (
                <button
                  key={d.key}
                  onClick={() => setActive(d)}
                  className={cn(
                    'flex items-center gap-3 p-4 rounded-lg border text-left transition-all',
                    active.key === d.key
                      ? 'bg-card border-primary/40'
                      : 'bg-card/50 border-border hover:border-primary/30 hover:bg-card'
                  )}
                >
                  <div
                    className={cn(
                      'flex h-9 w-9 items-center justify-center rounded-lg border shrink-0 transition-colors',
                      active.key === d.key
                        ? 'bg-primary/15 border-primary/30'
                        : 'bg-card border-border'
                    )}
                  >
                    <d.icon
                      className={cn(
                        'h-4.5 w-4.5 transition-colors',
                        active.key === d.key ? 'text-primary' : 'text-muted-foreground'
                      )}
                    />
                  </div>
                  <span
                    className={cn(
                      'text-sm font-medium transition-colors',
                      active.key === d.key ? 'text-foreground' : 'text-muted-foreground'
                    )}
                  >
                    {d.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Detail Panel */}
          <div className="lg:col-span-5">
            <div className="glass-strong rounded-xl p-6 lg:sticky lg:top-28">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                  <active.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-base font-semibold">{active.label}</h3>
                  <p className="text-xs text-muted-foreground">
                    ELSxGlobal Capability
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="border-l-2 border-border pl-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-destructive/80 mb-1">
                    Business Problem
                  </p>
                  <p className="text-sm text-foreground/90">{active.problem}</p>
                </div>
                <div className="border-l-2 border-border pl-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">
                    Solution
                  </p>
                  <p className="text-sm text-foreground/90">{active.solution}</p>
                </div>
                <div className="border-l-2 border-border pl-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-1">
                    Expected Outcome
                  </p>
                  <p className="text-sm text-foreground/90">{active.outcome}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
