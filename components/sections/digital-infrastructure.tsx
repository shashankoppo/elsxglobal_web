'use client';

import { Server, Shield, Lock, Zap, MapPin, Check, ArrowRight } from 'lucide-react';
import { SectionHeading } from '@/components/site/section-heading';
import { Button } from '@/components/ui/button';
import { useLead } from '@/components/site/lead-context';
import { cn } from '@/lib/utils';

const TIERS = [
  {
    name: 'Shared Hosting',
    desc: 'Reliable entry-level hosting for small sites and apps.',
    specs: ['99.9% uptime', 'Free SSL', 'Daily backups', 'cPanel'],
    badge: 'Starter',
    featured: false,
  },
  {
    name: 'Business Hosting',
    desc: 'Optimized performance for growing businesses.',
    specs: ['99.95% uptime', 'NVMe storage', 'Free CDN', 'Priority support'],
    badge: 'Growth',
    featured: false,
  },
  {
    name: 'VPS Hosting',
    desc: 'Dedicated resources with full root control.',
    specs: ['99.99% uptime', 'Dedicated CPU', 'SSD storage', 'Snapshots'],
    badge: 'Pro',
    featured: false,
  },
  {
    name: 'Enterprise Cloud',
    desc: 'Scalable, redundant infrastructure for mission-critical workloads.',
    specs: ['99.995% uptime', 'Auto-scaling', 'Multi-region', '24/7 NOC'],
    badge: 'Enterprise',
    featured: true,
  },
];

const TRUST_SIGNALS = [
  { icon: Lock, label: 'ISO 27001 Compliant' },
  { icon: Zap, label: '99.97% Uptime SLA' },
  { icon: MapPin, label: 'Multi-Region' },
  { icon: Shield, label: 'DDoS Protected' },
];

const REGIONS = [
  { label: 'US-East' },
  { label: 'EU-West' },
  { label: 'AP-South' },
  { label: 'AP-East' },
  { label: 'US-West' },
  { label: 'ME-Central' },
];

export function DigitalInfrastructure() {
  const { openLead } = useLead();

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="VaultHost Infrastructure"
          title={
            <>
              Your Business Never Sleeps.
              <br />
              <span className="text-gradient">Neither Should Your Infrastructure.</span>
            </>
          }
          description="VaultHost is the ELSxGlobal infrastructure layer — enterprise-grade hosting engineered for uptime, security, and performance at global scale."
        />

        <div className="mt-16 grid lg:grid-cols-5 gap-8 items-start">
          {/* Left - Global Presence */}
          <div className="lg:col-span-3 space-y-8">
            {/* Trust Signals */}
            <div className="grid sm:grid-cols-2 gap-4">
              {TRUST_SIGNALS.map((t) => (
                <div
                  key={t.label}
                  className="flex items-center gap-3 rounded-lg glass-panel p-4"
                >
                  <t.icon className="h-5 w-5 text-primary shrink-0" />
                  <span className="text-sm font-medium">{t.label}</span>
                </div>
              ))}
            </div>

            {/* Global Regions */}
            <div className="glass-panel rounded-xl p-6">
              <h3 className="text-base font-semibold mb-4">Global Infrastructure</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {REGIONS.map((r) => (
                  <div
                    key={r.label}
                    className="flex items-center gap-2 rounded-lg bg-card/50 border border-border p-3"
                  >
                    <span className="h-2 w-2 rounded-full bg-success" />
                    <span className="text-sm text-muted-foreground">{r.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-3 gap-4">
              <Metric label="Uptime SLA" value="99.99%" />
              <Metric label="Avg Latency" value="12ms" />
              <Metric label="Regions" value="6" />
            </div>
          </div>

          {/* Right - Pricing Tiers */}
          <div className="lg:col-span-2 space-y-4">
            {TIERS.map((t) => (
              <div
                key={t.name}
                className={cn(
                  'glass-panel rounded-xl p-5 transition-colors',
                  t.featured && 'border-primary/40 bg-card'
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base font-semibold">{t.name}</h3>
                  <span
                    className={cn(
                      'text-xs font-medium px-2 py-0.5 rounded-full',
                      t.featured
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-primary/10 text-primary'
                    )}
                  >
                    {t.badge}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{t.desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {t.specs.map((s) => (
                    <span
                      key={s}
                      className="flex items-center gap-1 text-xs text-muted-foreground bg-card/50 px-2 py-1 rounded border border-border"
                    >
                      <Check className="h-3 w-3 text-success" />
                      {s}
                    </span>
                  ))}
                </div>
                <Button
                  size="sm"
                  variant={t.featured ? 'default' : 'outline'}
                  className={cn('w-full h-9 text-sm', t.featured && 'btn-premium')}
                  onClick={() => openLead('consultation')}
                >
                  {t.featured ? 'Contact Us' : 'Get Started'}
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass-panel rounded-lg p-4">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className="text-xl font-semibold">{value}</p>
    </div>
  );
}
