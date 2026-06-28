import { PageHero } from '@/components/site/page-hero';
import { CTASection } from '@/components/site/cta-section';
import { Target, Eye, Heart, Shield, Layers, TrendingUp } from 'lucide-react';

const VALUES = [
  {
    icon: Target,
    title: 'Outcomes Over Outputs',
    desc: 'We measure success by your business results, not by features shipped or hours billed.',
  },
  {
    icon: Eye,
    title: 'Radical Transparency',
    desc: 'Clear roadmaps, honest timelines, and complete visibility into everything we build.',
  },
  {
    icon: Heart,
    title: 'Partnership Mindset',
    desc: 'We act as an extension of your team, invested in your long-term success.',
  },
  {
    icon: Shield,
    title: 'Security First',
    desc: 'Every system we build is engineered with security and compliance at its core.',
  },
  {
    icon: Layers,
    title: 'Systems Thinking',
    desc: 'We design ecosystems, not point solutions — so every part reinforces the others.',
  },
  {
    icon: TrendingUp,
    title: 'Compounding Value',
    desc: 'Our work should make your organization more capable, not just more automated.',
  },
];

const STATS = [
  { value: '₹120Cr', label: 'Current Valuation' },
  { value: '201-500', label: 'Team Members' },
  { value: '11', label: 'Integrated Capabilities' },
  { value: '9', label: 'Industries Served' },
];

export const metadata = {
  title: 'About',
  description:
    'ELSxGlobal is a Business Transformation Ecosystem helping organizations become faster, smarter, safer, and more scalable.',
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About ELSxGlobal"
        title={
          <>
            We don&apos;t sell services.
            <br />
            We build <span className="text-gradient">intelligent enterprises.</span>
          </>
        }
        description="ELSxGlobal is the flagship division of EvolucentSphere Pvt. Ltd., founded on the conviction that technology should be the engine of growth — not its bottleneck. We help organizations build digital foundations that make them faster, smarter, safer, and infinitely scalable."
      />

      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight mb-5">
                Our mission
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Most digital transformations fail. Not because the technology is
                wrong, but because strategy, operations, and execution are
                disconnected — managed by different teams, measured by
                different metrics, and aligned to different goals.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                ELSxGlobal exists to close that gap. We bring strategy,
                technology, operations, automation, and analytics into one
                unified ecosystem — so transformation is not a project, but a
                continuous capability.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="glass rounded-2xl p-6 text-center"
                >
                  <p className="text-3xl font-semibold text-gradient-primary">
                    {s.value}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-semibold tracking-tight">
              What we believe
            </h2>
            <p className="mt-4 text-muted-foreground">
              The principles that guide every decision we make.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="glass rounded-2xl p-6 hover:border-primary/40 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 mb-4">
                  <v.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-base font-semibold mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
