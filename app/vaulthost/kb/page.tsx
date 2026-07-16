import { Metadata } from 'next';
import { createMetadata } from '@/lib/seo';
import { PageHero } from '@/components/site/page-hero';
import { BookOpen, Search, ArrowRight, FileText } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = createMetadata({
  title: 'Hosting Knowledge Base — Guides, Tutorials & Documentation | VaultHost',
  description: 'Browse our knowledge base for hosting guides, tutorials, FAQs, and documentation. Learn how to set up, manage, and optimize your hosting with VaultHost.',
  keywords: ['hosting knowledge base', 'hosting tutorials India', 'cPanel guide', 'VPS setup guide', 'WordPress hosting tutorial', 'DNS management guide', 'SSL setup tutorial', 'hosting documentation'],
  canonical: 'https://elsxglobal.com/vaulthost/kb/',
  breadcrumb: [
    { name: 'Home', url: 'https://elsxglobal.com/' },
    { name: 'VaultHost', url: 'https://elsxglobal.com/vaulthost/' },
    { name: 'Knowledge Base', url: 'https://elsxglobal.com/vaulthost/kb/' },
  ],
});

const CATEGORIES = [
  { name: 'Getting Started', slug: 'getting-started', icon: BookOpen, desc: 'New to VaultHost? Start here.' },
  { name: 'Shared Hosting', slug: 'shared-hosting', icon: FileText, desc: 'cPanel, email, and website management.' },
  { name: 'VPS & Dedicated', slug: 'vps-dedicated', icon: FileText, desc: 'Server management and configuration.' },
  { name: 'WordPress', slug: 'wordpress', icon: FileText, desc: 'WordPress-specific guides and tips.' },
  { name: 'Billing & Payments', slug: 'billing', icon: FileText, desc: 'Invoices, payments, and subscriptions.' },
  { name: 'Security', slug: 'security', icon: FileText, desc: 'SSL, DDoS, and security best practices.' },
];

const ARTICLES = [
  { slug: 'getting-started-guide', title: 'Getting Started with VaultHost', category: 'getting-started', excerpt: 'Everything you need to know to set up your first hosting account.' },
  { slug: 'cpanel-guide', title: 'Complete cPanel Guide', category: 'shared-hosting', excerpt: 'Learn how to use cPanel to manage your website, email, and databases.' },
  { slug: 'vps-setup-guide', title: 'Setting Up Your VPS', category: 'vps-dedicated', excerpt: 'A step-by-step guide to configuring your new VPS from scratch.' },
  { slug: 'wordpress-installation', title: 'Installing WordPress on VaultHost', category: 'wordpress', excerpt: 'One-click WordPress installation and manual setup methods.' },
  { slug: 'ssl-setup', title: 'SSL Certificate Setup', category: 'security', excerpt: 'How to install and manage free SSL certificates on your hosting.' },
  { slug: 'payment-methods', title: 'Payment Methods and Billing', category: 'billing', excerpt: 'Understanding your billing cycle, payment options, and invoices.' },
  { slug: 'ssh-access-vps', title: 'SSH Access on VPS', category: 'vps-dedicated', excerpt: 'How to connect to your VPS via SSH and set up key-based authentication.' },
  { slug: 'email-setup', title: 'Email Account Setup', category: 'shared-hosting', excerpt: 'Create and configure email accounts for your domain.' },
  { slug: 'wordpress-staging', title: 'Using WordPress Staging Sites', category: 'wordpress', excerpt: 'Test changes on a staging copy before going live.' },
  { slug: 'ddos-protection', title: 'Understanding DDoS Protection', category: 'security', excerpt: 'How our DDoS mitigation works and what it protects against.' },
  { slug: 'backup-restore', title: 'Backup and Restore Guide', category: 'getting-started', excerpt: 'How to create, manage, and restore from backups.' },
  { slug: 'upgrade-plan', title: 'Upgrading Your Hosting Plan', category: 'billing', excerpt: 'How to upgrade to a higher tier plan without downtime.' },
];

export default function KnowledgeBasePage() {
  return (
    <>
      <PageHero
        eyebrow="VaultHost Knowledge Base"
        title={<>Find answers in our <span className="text-gradient">knowledge base</span></>}
        description="Browse guides, tutorials, and documentation to get the most out of your VaultHost hosting."
      />

      <section className="relative py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input type="text" placeholder="Search articles..." className="w-full pl-12 pr-4 py-3 rounded-xl bg-muted/30 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40" />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {CATEGORIES.map((cat) => {
              const count = ARTICLES.filter((a) => a.category === cat.slug).length;
              return (
                <div key={cat.slug} className="group liquid-glass-card rounded-2xl p-5 hover:border-primary/40 transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 shrink-0"><cat.icon className="h-5 w-5 text-primary" /></div>
                    <div><h3 className="text-sm font-semibold group-hover:text-primary transition-colors">{cat.name}</h3><p className="text-xs text-muted-foreground mt-1">{cat.desc}</p><p className="text-xs text-muted-foreground/60 mt-2">{count} articles</p></div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-6">Popular articles</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {ARTICLES.slice(0, 8).map((article) => (
                <Link key={article.slug} href={`/vaulthost/kb/${article.slug}`} className="group liquid-glass-card rounded-2xl p-5 hover:border-primary/40 transition-all duration-300">
                  <div className="flex items-start justify-between gap-4">
                    <div><h3 className="text-sm font-semibold group-hover:text-primary transition-colors mb-1">{article.title}</h3><p className="text-xs text-muted-foreground leading-relaxed">{article.excerpt}</p></div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-primary transition-colors shrink-0 mt-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-6">All articles</h2>
            <div className="space-y-2">
              {ARTICLES.map((article) => (
                <Link key={article.slug} href={`/vaulthost/kb/${article.slug}`} className="group flex items-center justify-between p-4 liquid-glass rounded-xl hover:border-primary/30 transition-colors">
                  <div className="flex items-center gap-3"><FileText className="h-4 w-4 text-muted-foreground" /><span className="text-sm font-medium group-hover:text-primary transition-colors">{article.title}</span></div>
                  <span className="text-xs text-muted-foreground capitalize">{article.category.replace(/-/g, ' ')}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
