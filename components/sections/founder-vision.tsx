'use client';

import { Quote, Target, Lightbulb, TrendingUp, Handshake, Rocket, Award, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLead } from '@/components/site/lead-context';

const FOCUS = [
  { icon: Target, label: 'Long-Term Value Creation' },
  { icon: Lightbulb, label: 'Digital Transformation' },
  { icon: Rocket, label: 'Innovation' },
  { icon: TrendingUp, label: 'Enterprise Growth' },
  { icon: Handshake, label: 'Strategic Partnerships' },
];

const CREDENTIALS = [
  '12+ Years Enterprise Experience',
  '200+ Transformations Led',
  'Multi-Industry Expertise',
  'AI & ERP Certified',
];

export function FounderVision() {
  const { openLead } = useLead();

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Founder Card */}
          <div className="lg:col-span-5">
            <div className="max-w-sm mx-auto">
              <div className="liquid-glass-strong rounded-xl p-6">
                <div className="aspect-square rounded-lg bg-card border border-border flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-5xl font-semibold text-gradient mb-2">
                      SP
                    </div>
                    <p className="text-sm text-muted-foreground">Shashank Patel</p>
                  </div>
                </div>
                <div className="mt-5 text-center">
                  <h3 className="text-lg font-semibold">Shashank Patel</h3>
                  <p className="text-sm text-primary font-medium">
                    Business Transformation Architect
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Founder, ELSxGlobal
                  </p>
                </div>
                <div className="mt-5 flex flex-wrap justify-center gap-2">
                  {CREDENTIALS.map((c) => (
                    <span
                      key={c}
                      className="text-xs text-muted-foreground bg-card border border-border px-2 py-1 rounded flex items-center gap-1"
                    >
                      <Award className="h-3 w-3 text-primary/70" />
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 text-xs font-medium text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              BUILT BY A BUILDER
            </div>

            <h2 className="mt-5 text-3xl sm:text-4xl font-semibold tracking-tight leading-tight">
              Shashank Patel
              <span className="block text-gradient text-xl sm:text-2xl mt-1 font-normal">
                Business Transformation Architect
              </span>
            </h2>

            <blockquote className="mt-6 pl-5 text-base text-muted-foreground leading-relaxed border-l-2 border-primary">
              &ldquo;Most organizations are sitting on untapped potential —
              buried under legacy systems, manual processes, and disconnected
              data. ELSxGlobal exists to unlock that potential
              systematically, and turn it into compounding, measurable
              enterprise value.&rdquo;
            </blockquote>

            <p className="mt-6 text-base text-muted-foreground leading-relaxed">
              Shashank brings a rare combination of enterprise technology depth
              and business strategy clarity. His philosophy: technology
              investments must be justified by business outcomes — not the other
              way around. Under his leadership, ELSxGlobal has helped
              organizations across manufacturing, education, healthcare, and
              financial services build intelligent, scalable operational
              foundations.
            </p>

            <div className="mt-8 grid sm:grid-cols-2 gap-3">
              {FOCUS.map((f) => (
                <div
                  key={f.label}
                  className="flex items-center gap-3 liquid-glass-subtle rounded-lg px-4 py-3 hover:border-primary/30 transition-colors"
                >
                  <f.icon className="h-4 w-4 text-primary shrink-0" />
                  <span className="text-sm font-medium">{f.label}</span>
                </div>
              ))}
            </div>

            <Button
              onClick={() => openLead('discovery')}
              className="mt-8 btn-premium"
            >
              Schedule a Discovery Call
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
