import { Metadata } from 'next';
import { createClient } from '@/lib/supabase-server';
import { createMetadata, createSchemaMarkup } from '@/lib/seo';
import { HostingPlan, TIER_LABELS, TIER_DESCRIPTIONS, TIER_PATHS, HostingTier } from '@/lib/hosting-types';
import { PageHero } from '@/components/site/page-hero';
import { CTASection } from '@/components/site/cta-section';
import { HostingPlanCard } from '@/components/hosting/plan-card';
import Link from 'next/link';
import {
  Server, Globe, Cpu, Cloud, Shield, RefreshCw, HardDrive, Gauge,
  Database, Zap, Lock, Headphones, Check, ArrowRight, Star,
  TrendingUp, Users, Award, Activity, Mail, Layout, KeyRound,
  ShoppingCart, Rocket, Building2, Briefcase, Store, GraduationCap
} from 'lucide-react';

export const metadata: Metadata = createMetadata({
  title: 'VaultHost — Enterprise Hosting India | Cloud, VPS, Dedicated, WordPress, Email',
  description: 'Browse and buy enterprise-grade hosting plans. Shared, WordPress, VPS, cloud, dedicated servers, email hosting, SSL, and website builder with 99.99% uptime, free SSL, DDoS protection, and 24/7 NOC monitoring.',
  keywords: ['hosting plans India', 'VPS hosting India', 'cloud hosting Mumbai', 'dedicated server India', 'WordPress hosting India', 'shared hosting', 'enterprise hosting', 'VaultHost', 'email hosting India', 'SSL certificate India', 'website builder India', 'managed hosting', 'cheap hosting India', 'best hosting company India'],
  canonical: 'https://elsxglobal.com/vaulthost/',
  type: 'website',
  breadcrumb: [
    { name: 'Home', url: 'https://elsxglobal.com/' },
    { name: 'VaultHost', url: 'https://elsxglobal.com/vaulthost/' },
  ],
  faq: [
    { question: 'What types of hosting does VaultHost offer?', answer: 'VaultHost offers shared hosting, managed WordPress hosting, VPS hosting, cloud hosting, dedicated servers, email hosting, SSL certificates, and an AI-powered website builder.' },
    { question: 'Is SSL included with hosting plans?', answer: 'Yes, every hosting plan includes a free wildcard SSL certificate at no extra cost.' },
    { question: 'What is the uptime guarantee?', answer: 'We guarantee 99.99% uptime. If we miss it, you receive service credits proportional to the downtime.' },
    { question: 'Do you offer daily backups?', answer: 'Yes, automated daily backups with one-click restore are included on all plans.' },
    { question: 'Can I upgrade my plan later?', answer: 'Yes, you can upgrade to any higher plan at any time. Our team will migrate your site for free.' },
  ],
  serviceSchema: {
    name: 'VaultHost Hosting',
    description: 'Enterprise-grade hosting marketplace with shared, WordPress, VPS, cloud, dedicated server, email, SSL, and website builder plans.',
    type: 'Service',
    category: 'Web Hosting',
    provider: 'ELSxGlobal',
  },
});

const FEATURES = [
  { icon: Shield, title: 'DDoS Protection', desc: 'Enterprise-grade DDoS mitigation on every plan, at no extra cost.' },
  { icon: Lock, title: 'Free SSL', desc: 'Wildcard SSL certificates included with every hosting plan.' },
  { icon: RefreshCw, title: 'Daily Backups', desc: 'Automated daily backups with one-click restore.' },
  { icon: Gauge, title: '99.99% Uptime SLA', desc: 'Guaranteed uptime with service credits if we miss it.' },
  { icon: HardDrive, title: 'NVMe Storage', desc: 'Next-gen NVMe SSDs for industry-leading I/O performance.' },
  { icon: Headphones, title: '24/7 NOC', desc: 'Round-the-clock monitoring and support by certified engineers.' },
];

const STATS = [
  { value: '99.99%', label: 'Guaranteed Uptime' },
  { value: '12ms', label: 'Avg Latency' },
  { value: '6', label: 'Global Regions' },
  { value: '24/7', label: 'NOC Monitoring' },
];

const TIER_ICONS: Record<HostingTier, typeof Server> = {
  shared: Globe,
  wordpress: Database,
  vps: Cpu,
  cloud: Cloud,
  dedicated: Server,
  email: Mail,
  'website-builder': Layout,
  ssl: KeyRound,
};

const TRUST_LOGOS = [
  { icon: Award, label: 'ISO 27001 Certified' },
  { icon: Shield, label: 'PCI DSS Compliant' },
  { icon: TrendingUp, label: '₹120Cr Valuation' },
  { icon: Users, label: '201-500 Team' },
  { icon: Activity, label: '10+ Countries' },
];

const USE_CASES = [
  { icon: Briefcase, title: 'Personal & Portfolio', desc: 'Shared hosting for blogs, portfolios, and small personal sites.', tier: 'shared' as HostingTier, price: '₹99/mo' },
  { icon: Store, title: 'Small Business', desc: 'WordPress or shared hosting for business websites and small stores.', tier: 'wordpress' as HostingTier, price: '₹199/mo' },
  { icon: Building2, title: 'Growing Business', desc: 'VPS or cloud for growing sites with moderate traffic.', tier: 'vps' as HostingTier, price: '₹499/mo' },
  { icon: Rocket, title: 'High Traffic', desc: 'Cloud or dedicated for high-traffic sites and apps.', tier: 'cloud' as HostingTier, price: '₹999/mo' },
  { icon: GraduationCap, title: 'Enterprise', desc: 'Dedicated servers for mission-critical workloads.', tier: 'dedicated' as HostingTier, price: '₹4999/mo' },
  { icon: Mail, title: 'Professional Email', desc: 'Custom domain email for your team.', tier: 'email' as HostingTier, price: '₹49/mo' },
];

const TESTIMONIALS = [
  { name: 'Rajesh Kumar', role: 'Founder, TechStart India', text: 'Migrated from Hostinger to VaultHost and saw a 40% speed improvement. The 24/7 NOC support is incredible — they caught a DDoS attack at 3 AM before we even noticed.', rating: 5 },
  { name: 'Priya Sharma', role: 'CTO, EcomHub', text: 'The cloud auto-scaling saved us during our Diwali sale. Traffic spiked 10x and the site never went down. The portal is so much cleaner than cPanel.', rating: 5 },
  { name: 'Amit Patel', role: 'DevOps Lead, FinServe', text: 'The dedicated servers with IPMI access give us full control. The 99.99% uptime SLA is real — we have not had a single minute of downtime in 8 months.', rating: 5 },
  { name: 'Sneha Reddy', role: 'Marketing Director, BrandCo', text: 'The website builder with AI generated our entire site in 5 minutes. We customized it and launched the same day. The free SSL and domain were a bonus.', rating: 5 },
];

export default async function VaultHostPage() {
  const supabase = createClient();
  const { data: plans } = await supabase
    .from('hosting_plans')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  const allPlans = (plans || []) as unknown as HostingPlan[];

  const tiers = Object.keys(TIER_LABELS) as HostingTier[];
  const plansByTier = tiers.map((tier) => ({
    tier,
    label: TIER_LABELS[tier],
    description: TIER_DESCRIPTIONS[tier],
    icon: TIER_ICONS[tier],
    path: TIER_PATHS[tier],
    plans: allPlans.filter((p) => p.tier === tier),
  })).filter((g) => g.plans.length > 0);

  const schemas = createSchemaMarkup({
    canonical: 'https://elsxglobal.com/vaulthost/',
    breadcrumb: [
      { name: 'Home', url: 'https://elsxglobal.com/' },
      { name: 'VaultHost', url: 'https://elsxglobal.com/vaulthost/' },
    ],
  });

  return (
    <>
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />
      ))}

      <PageHero
        eyebrow="VaultHost Infrastructure"
        title={
          <>
            Your business never sleeps.
            <br />
            <span className="text-gradient">Neither should your infrastructure.</span>
          </>
        }
        description="Enterprise-grade hosting marketplace engineered for 99.99% uptime, security, and performance at global scale. Browse plans, compare specs, and deploy in minutes."
        stats={STATS}
      />

      {/* Trust Bar */}
      <section className="relative py-8 border-b border-border bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {TRUST_LOGOS.map((logo) => (
              <div key={logo.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                <logo.icon className="h-4 w-4 text-primary" />
                {logo.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="relative py-16 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Zap className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-medium text-primary">Why VaultHost</span>
            </div>
            <h2 className="text-3xl font-semibold tracking-tight">
              Everything included. No hidden fees.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Every plan comes with enterprise-grade features that other providers charge extra for.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f) => (
              <div key={f.title} className="liquid-glass-card rounded-2xl p-5 flex items-start gap-4 hover:border-primary/30 transition-colors">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
                  <f.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-1">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plan Marketplace */}
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Server className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-medium text-primary">Hosting Marketplace</span>
            </div>
            <h2 className="text-3xl font-semibold tracking-tight">
              Find your perfect hosting plan
            </h2>
            <p className="mt-4 text-muted-foreground">
              From entry-level shared hosting to enterprise dedicated servers — all with free SSL, DDoS protection, and 24/7 support.
            </p>
          </div>

          {plansByTier.map((group) => (
            <div key={group.tier} className="mb-16 last:mb-0">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
                    <group.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{group.label}</h3>
                    <p className="text-sm text-muted-foreground">{group.description}</p>
                  </div>
                </div>
                <Link
                  href={group.path}
                  className="hidden sm:inline-flex items-center gap-1.5 text-sm text-primary hover:underline font-medium"
                >
                  View all
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {group.plans.map((plan) => (
                  <HostingPlanCard key={plan.id} plan={plan} />
                ))}
              </div>
              <Link
                href={group.path}
                className="sm:hidden inline-flex items-center gap-1.5 text-sm text-primary hover:underline font-medium mt-4"
              >
                View all {group.label}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison CTA */}
      <section className="relative py-16 bg-muted/20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-semibold tracking-tight mb-4">
            Not sure which plan is right for you?
          </h2>
          <p className="text-muted-foreground mb-8">
            Compare all plans side-by-side and find the perfect match for your needs.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/vaulthost/compare"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              Compare All Plans
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/vaulthost/kb"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl liquid-glass-button font-medium"
            >
              Knowledge Base
            </Link>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Rocket className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-medium text-primary">Find Your Match</span>
            </div>
            <h2 className="text-3xl font-semibold tracking-tight">Hosting for every use case</h2>
            <p className="mt-4 text-muted-foreground">From personal blogs to enterprise apps — we have a plan for you.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {USE_CASES.map((uc) => (
              <Link
                key={uc.title}
                href={TIER_PATHS[uc.tier]}
                className="liquid-glass-card rounded-2xl p-6 hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 mb-4 group-hover:scale-110 transition-transform">
                  <uc.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-base font-semibold mb-2">{uc.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{uc.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-primary">From {uc.price}</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Domain Search CTA */}
      <section className="relative py-16 bg-muted/20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="liquid-glass-strong rounded-3xl p-8 sm:p-12 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 mx-auto mb-6">
              <Globe className="h-7 w-7 text-primary" />
            </div>
            <h2 className="text-2xl font-semibold tracking-tight mb-3">Find your perfect domain</h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">Search across 15+ TLDs. Free WHOIS privacy, DNS management, and domain forwarding on every domain.</p>
            <Link href="/vaulthost/domains" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90">
              <ShoppingCart className="h-4 w-4" /> Search Domains
            </Link>
          </div>
        </div>
      </section>

      {/* 30-Day Money-Back Guarantee */}
      <section className="relative py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 mb-4">
                <Shield className="h-3.5 w-3.5 text-green-500" />
                <span className="text-xs font-medium text-green-500">Risk-Free</span>
              </div>
              <h2 className="text-3xl font-semibold tracking-tight mb-4">30-day money-back guarantee</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Try any VaultHost plan risk-free for 30 days. If you are not completely satisfied, we will refund your money — no questions asked. That is how confident we are in our service.
              </p>
              <ul className="space-y-3">
                {[
                  'Full refund within 30 days of purchase',
                  'No hidden cancellation fees',
                  'Keep your free domain even after refund',
                  'Instant refund processing (3-5 business days)',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500/10 border border-green-500/20">
                      <Check className="h-3 w-3 text-green-500" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="liquid-glass-strong rounded-3xl p-8 text-center">
              <div className="text-6xl font-bold text-gradient mb-2">30</div>
              <div className="text-xl font-semibold mb-1">Day Guarantee</div>
              <p className="text-sm text-muted-foreground mb-6">100% money-back, no questions asked</p>
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
                <div><p className="text-2xl font-bold">99.99%</p><p className="text-xs text-muted-foreground">Uptime SLA</p></div>
                <div><p className="text-2xl font-bold">24/7</p><p className="text-xs text-muted-foreground">Support</p></div>
                <div><p className="text-2xl font-bold">6</p><p className="text-xs text-muted-foreground">Regions</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative py-20 bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Star className="h-3.5 w-3.5 text-primary fill-primary" />
              <span className="text-xs font-medium text-primary">Customer Stories</span>
            </div>
            <h2 className="text-3xl font-semibold tracking-tight">Loved by 50,000+ customers</h2>
            <p className="mt-4 text-muted-foreground">Join thousands of businesses that trust VaultHost with their infrastructure.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="liquid-glass-card rounded-2xl p-6 flex flex-col">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-amber-500 fill-amber-500" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">&ldquo;{t.text}&rdquo;</p>
                <div className="pt-4 border-t border-border">
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
