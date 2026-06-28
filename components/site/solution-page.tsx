import { PageHero } from '@/components/site/page-hero';
import { CTASection } from '@/components/site/cta-section';
import { CheckCircle2, type LucideIcon } from 'lucide-react';

export type SolutionFeature = {
  icon: LucideIcon;
  title: string;
  desc: string;
};

export type SolutionPageProps = {
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  features: SolutionFeature[];
  stats?: { value: string; label: string }[];
  process?: { step: string; title: string; desc: string }[];
  ctaTitle?: string;
  ctaDescription?: string;
};

export function SolutionPage({
  eyebrow,
  title,
  description,
  features,
  stats,
  process,
  ctaTitle,
  ctaDescription,
}: SolutionPageProps) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} description={description} />

      {stats && (
        <section className="relative py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((s) => (
                <div key={s.label} className="liquid-glass rounded-2xl p-6 text-center hover:border-primary/30 transition-colors">
                  <p className="text-3xl font-semibold text-gradient-primary">{s.value}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="relative py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => (
              <div key={f.title} className="liquid-glass-card rounded-2xl p-6 hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 group h-full">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 mb-4 group-hover:bg-primary/20 transition-colors">
                  <f.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-base font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {process && (
        <section className="relative py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-semibold tracking-tight">How we deliver</h2>
              <p className="mt-4 text-muted-foreground">
                A structured approach that turns ambition into measurable outcomes.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {process.map((p, i) => (
                <div key={p.title} className="liquid-glass-card rounded-2xl p-6 h-full hover:border-primary/40 transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 text-primary text-sm font-semibold">
                      {i + 1}
                    </span>
                    <span className="text-xs uppercase tracking-wider text-muted-foreground">{p.step}</span>
                  </div>
                  <h3 className="text-base font-semibold mb-2">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="relative py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="liquid-glass-strong rounded-2xl p-8">
            <h3 className="text-xl font-semibold mb-5">What you get</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {features.slice(0, 6).map((f) => (
                <div key={f.title} className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">{f.title}</p>
                    <p className="text-xs text-muted-foreground">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection title={ctaTitle} description={ctaDescription} />
    </>
  );
}
