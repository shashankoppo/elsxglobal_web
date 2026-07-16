'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase';
import { HostingPlan, HostingTier, TIER_LABELS, TIER_DESCRIPTIONS } from '@/lib/hosting-types';
import { HostingPlanCard } from '@/components/hosting/plan-card';
import { PageHero } from '@/components/site/page-hero';
import { CTASection } from '@/components/site/cta-section';
import { ChevronDown, Server, Globe, Cpu, Cloud, Database, Shield, Zap, Gauge, HardDrive, RefreshCw, Lock, Mail, Layout, KeyRound } from 'lucide-react';
import Link from 'next/link';

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

const TIER_FEATURES: Record<HostingTier, { icon: typeof Shield; title: string; desc: string }[]> = {
  shared: [
    { icon: Globe, title: 'cPanel Included', desc: 'Industry-standard cPanel for easy website management.' },
    { icon: Lock, title: 'Free SSL', desc: 'Wildcard SSL certificates on every plan, no extra cost.' },
    { icon: HardDrive, title: 'NVMe SSD Storage', desc: 'Next-gen storage for 10x faster I/O performance.' },
    { icon: RefreshCw, title: 'Daily Backups', desc: 'Automated daily backups with one-click restore.' },
  ],
  wordpress: [
    { icon: Database, title: 'Managed WordPress', desc: 'Automatic core updates, plugin management, and security patches.' },
    { icon: Gauge, title: 'Built-in Caching', desc: 'Server-level caching for blazing-fast page loads.' },
    { icon: RefreshCw, title: 'One-click Staging', desc: 'Test changes on a staging site before going live.' },
    { icon: Shield, title: 'WP CLI Access', desc: 'Full WP CLI access for advanced WordPress management.' },
  ],
  vps: [
    { icon: Cpu, title: 'Dedicated Resources', desc: 'Your own CPU, RAM, and storage — no noisy neighbors.' },
    { icon: Server, title: 'Full Root Access', desc: 'Complete control to install anything you need.' },
    { icon: Shield, title: 'DDoS Protection', desc: 'Enterprise-grade DDoS mitigation included free.' },
    { icon: RefreshCw, title: 'Snapshots', desc: 'Point-in-time snapshots for easy recovery.' },
  ],
  cloud: [
    { icon: Cloud, title: 'Auto-scaling', desc: 'Resources scale up and down automatically with demand.' },
    { icon: Globe, title: 'Multi-region Deploy', desc: 'Deploy across 6 global regions for lowest latency.' },
    { icon: Gauge, title: 'Load Balancer', desc: 'Built-in load balancing for high availability.' },
    { icon: Zap, title: 'Global CDN', desc: 'Free CDN with 200+ edge locations worldwide.' },
  ],
  dedicated: [
    { icon: Server, title: 'Dedicated Hardware', desc: 'A full physical server — no virtualization overhead.' },
    { icon: Cpu, title: 'Enterprise CPUs', desc: 'Intel Xeon Gold processors with up to 64 cores.' },
    { icon: Shield, title: 'Hardware RAID', desc: 'RAID 10 storage for maximum I/O and redundancy.' },
    { icon: Lock, title: 'IPMI Access', desc: 'Full out-of-band management via IPMI.' },
  ],
  email: [
    { icon: Mail, title: 'Custom Domain', desc: 'Professional email on your own domain (you@yourcompany.com).' },
    { icon: Globe, title: 'Webmail Access', desc: 'Access your email from any browser with our webmail client.' },
    { icon: Shield, title: 'Spam & Virus Protection', desc: 'Enterprise-grade filtering blocks 99.9% of spam and malware.' },
    { icon: RefreshCw, title: 'Mobile Sync', desc: 'ActiveSync support for iOS, Android, and Outlook sync.' },
  ],
  'website-builder': [
    { icon: Layout, title: 'Drag & Drop Builder', desc: 'No coding required. Build a professional site with visual editor.' },
    { icon: Zap, title: 'AI Website Generator', desc: 'Describe your business and AI builds a complete site in minutes.' },
    { icon: Globe, title: '100+ Templates', desc: 'Professionally designed, mobile-responsive templates.' },
    { icon: Lock, title: 'Free SSL & Domain', desc: 'SSL certificate and domain included free for the first year.' },
  ],
  ssl: [
    { icon: Lock, title: '256-bit Encryption', desc: 'Industry-standard encryption trusted by all browsers.' },
    { icon: Shield, title: 'Browser Padlock', desc: 'Display the trusted padlock icon to boost visitor confidence.' },
    { icon: Zap, title: 'Fast Issuance', desc: 'Domain-validated certs issued in minutes, EV in 1-3 days.' },
    { icon: RefreshCw, title: 'Unlimited Reissues', desc: 'Reissue your certificate free of charge anytime.' },
  ],
};

const TIER_FAQS: Record<HostingTier, { q: string; a: string }[]> = {
  shared: [
    { q: 'What is shared hosting?', a: 'Shared hosting means your website shares a server with other websites. It is the most affordable option and perfect for personal sites, blogs, and small businesses getting started online.' },
    { q: 'Can I upgrade later?', a: 'Yes! You can upgrade to any higher plan at any time. Our team will migrate your site for free.' },
    { q: 'Do you include SSL?', a: 'Yes, every plan includes a free wildcard SSL certificate. No extra cost, no configuration needed.' },
    { q: 'What is the uptime guarantee?', a: 'We guarantee 99.99% uptime. If we miss it, you receive service credits proportional to the downtime.' },
    { q: 'How long does setup take?', a: 'Shared hosting accounts are provisioned instantly. You will receive your cPanel login within minutes of payment.' },
  ],
  wordpress: [
    { q: 'What is managed WordPress hosting?', a: 'Managed WordPress hosting is optimized specifically for WordPress. We handle updates, security, caching, and performance optimization so you can focus on your content.' },
    { q: 'Can I use plugins?', a: 'Yes, you can install any WordPress plugin. However, we recommend avoiding resource-heavy plugins that may impact performance.' },
    { q: 'Do you provide staging?', a: 'Yes, all WordPress plans include one-click staging environments. Test changes before pushing them live.' },
    { q: 'Is WP CLI available?', a: 'Yes, all WordPress hosting plans include full WP CLI access for advanced management via command line.' },
    { q: 'Do you handle migrations?', a: 'Yes, our team will migrate your existing WordPress site for free. Contact support after signing up.' },
  ],
  vps: [
    { q: 'What is VPS hosting?', a: 'A Virtual Private Server (VPS) gives you dedicated resources on a virtualized server. You get full root access and complete control.' },
    { q: 'Can I choose my OS?', a: 'Yes, you can choose from Ubuntu, Debian, CentOS, AlmaLinux, Rocky Linux, and Windows Server.' },
    { q: 'Do you provide a control panel?', a: 'You can install cPanel, Plesk, or any other control panel on your VPS. cPanel licenses are available as an add-on.' },
    { q: 'How fast is provisioning?', a: 'VPS instances are provisioned within 2-5 minutes of payment confirmation.' },
    { q: 'Can I scale my VPS?', a: 'Yes, you can upgrade CPU, RAM, and storage at any time from your client portal.' },
  ],
  cloud: [
    { q: 'What is cloud hosting?', a: 'Cloud hosting uses a network of virtual servers that can scale resources on demand. Your site runs across multiple nodes for maximum availability.' },
    { q: 'How does auto-scaling work?', a: 'When traffic spikes, your cloud instance automatically provisions more CPU and RAM. When traffic drops, resources scale back down.' },
    { q: 'Which regions are available?', a: 'We have data centers in Mumbai, Singapore, Dubai, Frankfurt, London, and New York.' },
    { q: 'Is a CDN included?', a: 'Yes, every cloud plan includes a free global CDN with 200+ edge locations.' },
    { q: 'Can I use the API?', a: 'Yes, full API access is included. Manage your cloud infrastructure programmatically.' },
  ],
  dedicated: [
    { q: 'What is a dedicated server?', a: 'A dedicated server is a full physical server reserved exclusively for you. No virtualization, no shared resources — maximum performance and control.' },
    { q: 'How long does setup take?', a: 'Dedicated servers are provisioned within 1-4 hours of payment confirmation, depending on hardware availability.' },
    { q: 'Do you offer managed dedicated servers?', a: 'Yes, we offer fully managed options where our team handles OS updates, security patches, monitoring, and backups.' },
    { q: 'Can I customize the hardware?', a: 'Yes, contact our sales team for custom configurations including additional RAM, storage, GPU, and networking options.' },
    { q: 'Is IPMI access included?', a: 'Yes, all dedicated servers include full IPMI access for out-of-band management, remote console, and hardware monitoring.' },
  ],
  email: [
    { q: 'What is email hosting?', a: 'Email hosting provides professional email on your own custom domain (you@yourcompany.com) instead of a free provider. It includes webmail, IMAP/POP3/SMTP, and mobile sync.' },
    { q: 'Can I use my existing domain?', a: 'Yes! If you already own a domain, simply point its MX records to our servers. We provide step-by-step setup instructions.' },
    { q: 'Do you offer migration?', a: 'Yes, our team will migrate your existing mailboxes for free. Contact support after signing up.' },
    { q: 'Is there a webmail client?', a: 'Yes, every plan includes access to our webmail client. You can also use Outlook, Apple Mail, Thunderbird, or any IMAP client.' },
    { q: 'What is the storage limit?', a: 'Storage varies by plan — from 5 GB per mailbox on Starter to 50 GB on Enterprise. You can purchase additional storage as an add-on.' },
  ],
  'website-builder': [
    { q: 'What is a website builder?', a: 'A website builder is a visual tool that lets you create a website without coding. Drag and drop elements, choose templates, and publish instantly.' },
    { q: 'Do I need coding skills?', a: 'No! Our builder is designed for non-technical users. The AI generator can even build a complete site from a text description.' },
    { q: 'Can I sell products online?', a: 'Yes, the Business plan and above include ecommerce features. You can sell up to 100 products on Business, unlimited on Pro and Enterprise.' },
    { q: 'Can I use my own domain?', a: 'Yes, every plan includes a free domain for the first year. You can also connect an existing domain.' },
    { q: 'Can I export my site?', a: 'The Enterprise plan includes custom code access and site export. Lower plans are builder-only but can be upgraded anytime.' },
  ],
  ssl: [
    { q: 'What is an SSL certificate?', a: 'An SSL certificate encrypts data between your website and visitors. It displays the padlock icon in browsers and is required for HTTPS.' },
    { q: 'Do I need an SSL certificate?', a: 'Yes. Modern browsers flag sites without SSL as "Not Secure." SSL is also required for PCI compliance and improves SEO rankings.' },
    { q: 'What is the difference between DV and EV?', a: 'Domain Validation (DV) verifies domain ownership and issues in minutes. Extended Validation (EV) verifies business identity and shows the company name in the green bar.' },
    { q: 'What is a wildcard SSL?', a: 'A wildcard SSL secures your domain and unlimited subdomains (e.g., *.example.com covers www, mail, blog, etc.) with one certificate.' },
    { q: 'Do you offer free SSL?', a: 'Yes! Every hosting plan includes a free Let\'s Encrypt SSL certificate. Paid SSL options offer higher warranties and EV validation.' },
  ],
};

export function HostingTierPage({ tier }: { tier: HostingTier }) {
  const [plans, setPlans] = useState<HostingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const fetchPlans = async () => {
      const { data } = await createClient()
        .from('hosting_plans')
        .select('*')
        .eq('tier', tier)
        .eq('is_active', true)
        .order('sort_order', { ascending: true });
      setPlans((data || []) as unknown as HostingPlan[]);
      setLoading(false);
    };
    fetchPlans();
  }, [tier]);

  const Icon = TIER_ICONS[tier];
  const features = TIER_FEATURES[tier];
  const faqs = TIER_FAQS[tier];

  return (
    <>
      <PageHero
        eyebrow={`VaultHost — ${TIER_LABELS[tier]}`}
        title={
          <>
            {TIER_LABELS[tier]}<br />
            <span className="text-gradient">built for performance.</span>
          </>
        }
        description={TIER_DESCRIPTIONS[tier]}
      />

      <section className="relative py-16 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f) => (
              <div key={f.title} className="liquid-glass-card rounded-2xl p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 mb-4">
                  <f.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-sm font-semibold mb-1.5">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Icon className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-medium text-primary">Choose Your Plan</span>
            </div>
            <h2 className="text-3xl font-semibold tracking-tight">{TIER_LABELS[tier]} plans</h2>
            <p className="mt-4 text-muted-foreground">All plans include free SSL, DDoS protection, and 24/7 support.</p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-pulse text-muted-foreground">Loading plans...</div>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {plans.map((plan) => (
                <HostingPlanCard key={plan.id} plan={plan} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="relative py-20 bg-muted/20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-semibold tracking-tight">Frequently asked questions</h2>
            <p className="mt-4 text-muted-foreground">Everything you need to know about {TIER_LABELS[tier].toLowerCase()}.</p>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="liquid-glass-card rounded-2xl overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left">
                  <span className="text-sm font-semibold pr-4">{faq.q}</span>
                  <ChevronDown className={`h-5 w-5 text-muted-foreground shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-semibold tracking-tight mb-4">Want to compare with other hosting types?</h2>
          <p className="text-muted-foreground mb-8">See how {TIER_LABELS[tier]} stacks up against our other hosting options.</p>
          <Link href="/vaulthost/compare" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
            Compare All Plans
          </Link>
        </div>
      </section>

      <CTASection />
    </>
  );
}
