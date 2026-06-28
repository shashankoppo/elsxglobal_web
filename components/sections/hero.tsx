'use client';

import { ArrowRight, Sparkles, TrendingUp, Users, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLead } from '@/components/site/lead-context';
import Link from 'next/link';

const METRICS = [
  { icon: TrendingUp, value: '200+', label: 'Transformations' },
  { icon: Award, value: '₹120Cr', label: 'Client Value Generated' },
  { icon: Users, value: '99.2%', label: 'Success Rate' },
];

const TRUST_BADGES = [
  'ISO 27001 Certified',
  'AWS Partner',
  'Google Cloud Partner',
  'Microsoft Partner',
];

export function Hero() {
  const { openLead } = useLead();

  return (
    <section className="relative min-h-[92vh] flex items-center pt-24 pb-12 sm:pb-16 overflow-hidden">
      {/* Background Layers */}
      <div className="absolute inset-0 bg-dots opacity-[0.02]" />
      <div className="absolute top-0 left-1/2 right-0 h-[700px] bg-gradient-to-bl from-primary/[0.04] via-primary/[0.02] to-transparent" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-accent/[0.03] to-transparent blur-3xl" />

      {/* Decorative Elements */}
      <div className="absolute top-40 right-8 lg:right-24 w-72 h-72 bg-gradient-conic from-primary/8 via-accent/5 to-transparent rounded-full blur-2xl animate-spin-slow hidden lg:block" />

      <div className="relative container-wide px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Main Content */}
          <div className="lg:col-span-7">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-6 animate-fade-up liquid-glass-badge">
              <Sparkles className="h-3.5 w-3.5" />
              <span className="text-xs font-medium">Enterprise Transformation Partner</span>
            </div>

            {/* Headline */}
            <h1 className="text-display-lg text-balance mb-6 animate-fade-up stagger-1">
              Build Technology That
              <br />
              <span className="text-gradient">Drives Business Growth</span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mb-8 animate-fade-up stagger-2 leading-relaxed">
              ELSxGlobal is India's premier enterprise technology partner. We architect
              software, cloud, AI, and digital solutions that transform how organizations
              operate, compete, and grow.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10 animate-fade-up stagger-3">
              <Button
                size="lg"
                onClick={() => openLead('consultation')}
                className="btn-primary h-12 sm:h-14 px-8 text-base"
              >
                Schedule Free Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="h-12 sm:h-14 px-8 text-base glass-button"
              >
                <Link href="/services">Explore Services</Link>
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-3 animate-fade-up stagger-4">
              {TRUST_BADGES.map((badge) => (
                <span key={badge} className="liquid-glass-badge">
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Stats Panel */}
          <div className="lg:col-span-5 animate-fade-up stagger-5">
            <div className="relative">
              {/* Floating accent */}
              <div className="absolute -inset-6 bg-gradient-to-br from-primary/8 to-accent/5 rounded-3xl blur-2xl" />

              <div className="relative liquid-glass-panel p-6 sm:p-8">
                <div className="space-y-5">
                  {METRICS.map((metric, idx) => (
                    <div key={metric.label} className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 shrink-0">
                        <metric.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-2xl sm:text-3xl font-bold tracking-tight">{metric.value}</p>
                        <p className="text-sm text-muted-foreground">{metric.label}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
