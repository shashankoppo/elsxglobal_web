import { Metadata } from 'next';
import { createClient } from '@/lib/supabase-server';
import { createMetadata } from '@/lib/seo';
import { HostingAddon } from '@/lib/hosting-types';
import { PageHero } from '@/components/site/page-hero';
import { CTASection } from '@/components/site/cta-section';
import {
  Shield, Lock, Globe, Server, Headphones, RefreshCw, Database,
  Check, ArrowRight, Zap, Star
} from 'lucide-react';

export const metadata: Metadata = createMetadata({
  title: 'Hosting Add-ons India — Security, Performance, Support | VaultHost',
  description: 'Enhance your hosting with add-ons: daily backups, SSL, CDN, DDoS protection, priority support, and more. Competitive pricing with monthly and annual options.',
  keywords: ['hosting addons India', 'website security add-ons', 'CDN add-on', 'DDoS protection add-on', 'daily backup service', 'priority support hosting', 'SSL add-on', 'hosting performance optimization'],
  canonical: 'https://elsxglobal.com/vaulthost/addons/',
  breadcrumb: [
    { name: 'Home', url: 'https://elsxglobal.com/' },
    { name: 'VaultHost', url: 'https://elsxglobal.com/vaulthost/' },
    { name: 'Add-ons', url: 'https://elsxglobal.com/vaulthost/addons/' },
  ],
  serviceSchema: {
    name: 'Hosting Add-ons Marketplace',
    description: 'Security, performance, and support add-ons for hosting plans including backups, CDN, DDoS protection, and priority support.',
    provider: 'VaultHost by ELSxGlobal',
    areaServed: 'India',
    category: 'Hosting Add-ons',
  },
});

const CATEGORY_LABELS: Record<string, string> = {
  security: 'Security',
  performance: 'Performance',
  support: 'Support',
};

const ICON_MAP: Record<string, typeof Shield> = {
  shield: Shield,
  lock: Lock,
  globe: Globe,
  server: Server,
  headphones: Headphones,
  refresh: RefreshCw,
  database: Database,
};

export default async function AddonsPage() {
  const supabase = createClient();
  const { data: addons } = await supabase
    .from('hosting_addons')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  const allAddons = (addons || []) as unknown as HostingAddon[];
  const categories = Object.keys(CATEGORY_LABELS);

  return (
    <>
      <PageHero
        eyebrow="VaultHost Add-ons"
        title={
          <>
            Supercharge your hosting<br />
            <span className="text-gradient">with powerful add-ons.</span>
          </>
        }
        description="Add security, performance, and support upgrades to any hosting plan. Cancel anytime."
      />

      <section className="relative py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {categories.map((cat) => {
            const catAddons = allAddons.filter((a) => a.category === cat);
            if (catAddons.length === 0) return null;
            return (
              <div key={cat} className="mb-16 last:mb-0">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
                    {cat === 'security' && <Shield className="h-5 w-5 text-primary" />}
                    {cat === 'performance' && <Zap className="h-5 w-5 text-primary" />}
                    {cat === 'support' && <Headphones className="h-5 w-5 text-primary" />}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">{CATEGORY_LABELS[cat]}</h2>
                    <p className="text-sm text-muted-foreground">{catAddons.length} add-ons available</p>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {catAddons.map((addon) => {
                    const Icon = ICON_MAP[addon.icon] || Shield;
                    const isFree = addon.price_monthly === 0;
                    return (
                      <div key={addon.id} className="liquid-glass-card rounded-2xl p-6 flex flex-col">
                        <div className="flex items-start gap-3 mb-4">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-sm font-semibold">{addon.name}</h3>
                            {isFree && (
                              <span className="inline-flex items-center gap-1 mt-1 text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-500 font-medium">
                                <Star className="h-3 w-3 fill-green-500" /> Free
                              </span>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">{addon.description}</p>
                        <div className="flex items-baseline gap-1 mb-4">
                          {isFree ? (
                            <span className="text-2xl font-bold text-green-500">Free</span>
                          ) : (
                            <>
                              <span className="text-2xl font-bold">&#8377;{addon.price_monthly.toLocaleString('en-IN')}</span>
                              <span className="text-sm text-muted-foreground">/mo</span>
                            </>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Check className="h-3.5 w-3.5 text-primary" />
                          {isFree ? 'Included with all plans' : `or ₹${addon.price_annual.toLocaleString('en-IN')}/yr`}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="relative py-16 bg-muted/20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-semibold tracking-tight mb-4">Add-ons are applied at checkout</h2>
          <p className="text-muted-foreground mb-8">Select your hosting plan, then add any add-ons during checkout. You can also add them later from your portal.</p>
          <a href="/vaulthost" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90">
            Browse Hosting Plans <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      <CTASection />
    </>
  );
}
