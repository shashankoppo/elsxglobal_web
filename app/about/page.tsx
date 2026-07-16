import { Metadata } from 'next';
import { createMetadata, createSchemaMarkup, parentCompanyInfo, ecosystemDivisions } from '@/lib/seo';
import { PageHero } from '@/components/site/page-hero';
import { CTASection } from '@/components/site/cta-section';
import { Target, Eye, Heart, Shield, Layers, TrendingUp, Building2, ExternalLink, Globe, Users, MapPin } from 'lucide-react';

export const metadata: Metadata = createMetadata({
  title: 'About ELSxGlobal | Enterprise Technology Partner | EvolucentSphere Pvt. Ltd.',
  description: 'Learn about ELSxGlobal, the flagship division of EvolucentSphere Pvt. Ltd. Founded by Shashank Patel in 2009. ₹120Cr valuation, 201-500 team members, serving 9 industries globally.',
  keywords: ['about ELSxGlobal', 'EvolucentSphere Pvt. Ltd.', 'Shashank Patel', 'enterprise technology company', 'software company India', 'business transformation architect', 'Jabalpur Madhya Pradesh'],
  canonical: 'https://elsxglobal.com/about/',
  type: 'website',
  breadcrumb: [
    { name: 'Home', url: 'https://elsxglobal.com/' },
    { name: 'About', url: 'https://elsxglobal.com/about/' },
  ],
});

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

const PARENT_STATS = [
  { icon: Building2, value: '2009', label: 'Founded' },
  { icon: Users, value: '201-500', label: 'Employees' },
  { icon: Globe, value: '10+', label: 'Countries Served' },
  { icon: TrendingUp, value: '₹500Cr', label: 'Target by 2025' },
];

export default function AboutPage() {
  const schemas = createSchemaMarkup({
    canonical: 'https://elsxglobal.com/about/',
    breadcrumb: [
      { name: 'Home', url: 'https://elsxglobal.com/' },
      { name: 'About', url: 'https://elsxglobal.com/about/' },
    ],
  });

  return (
    <>
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />
      ))}
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

      {/* Mission Section */}
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
                  className="liquid-glass rounded-2xl p-6 text-center"
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

      {/* Parent Company Section */}
      <section className="relative py-20 bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Building2 className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-medium text-primary">Parent Company</span>
            </div>
            <h2 className="text-3xl font-semibold tracking-tight mb-4">
              EvolucentSphere Pvt. Ltd.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {parentCompanyInfo.description}
            </p>
          </div>

          {/* Parent Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {PARENT_STATS.map((s) => (
              <div
                key={s.label}
                className="liquid-glass-card rounded-2xl p-6 text-center"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 mx-auto mb-3">
                  <s.icon className="h-5 w-5 text-primary" />
                </div>
                <p className="text-2xl font-semibold text-gradient-primary">
                  {s.value}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Parent Company Contact */}
          <div className="liquid-glass-strong rounded-2xl p-8 max-w-2xl mx-auto">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  Headquarters
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {parentCompanyInfo.headquarters}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <Globe className="h-4 w-4 text-primary" />
                  Connect
                </h3>
                <a
                  href={parentCompanyInfo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
                >
                  evolucentsphere.com
                  <ExternalLink className="h-3 w-3" />
                </a>
                <p className="text-sm text-muted-foreground mt-2">
                  {parentCompanyInfo.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ecosystem Divisions */}
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-semibold tracking-tight">
              The EvolucentSphere Ecosystem
            </h2>
            <p className="mt-4 text-muted-foreground">
              One unified group of specialized divisions, each reinforcing the others.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {ecosystemDivisions.map((d) => (
              <a
                key={d.name}
                href={d.url}
                {...(d.url.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="group liquid-glass-card rounded-2xl p-6 hover:border-primary/40 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors">
                    <Building2 className="h-5 w-5 text-primary" />
                  </div>
                  {d.url.startsWith('http') && (
                    <ExternalLink className="h-4 w-4 text-muted-foreground/40 group-hover:text-primary transition-colors" />
                  )}
                </div>
                <h3 className="text-base font-semibold mb-1">{d.name}</h3>
                <p className="text-xs text-primary font-medium mb-2">{d.role}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {d.description}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative py-20 bg-muted/20">
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
                className="liquid-glass-card rounded-2xl p-6 hover:border-primary/40 transition-all duration-300 hover:-translate-y-1"
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
