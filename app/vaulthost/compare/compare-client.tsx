'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase';
import { HostingPlan, TIER_LABELS, HostingTier } from '@/lib/hosting-types';
import { Check, X, Star, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { PageHero } from '@/components/site/page-hero';

export default function CompareClient() {
  const [plans, setPlans] = useState<HostingPlan[]>([]);
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      const { data } = await createClient()
        .from('hosting_plans')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });
      setPlans((data || []) as unknown as HostingPlan[]);
      setLoading(false);
    };
    fetchPlans();
  }, []);

  const getPrice = (plan: HostingPlan) =>
    billing === 'annual' ? plan.price_annual / 12 : plan.price_monthly;

  const allFeatures = Array.from(new Set(plans.flatMap((p) => p.features))).sort();
  const hasFeature = (plan: HostingPlan, feature: string) => plan.features.includes(feature);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading plans...</div>
      </div>
    );
  }

  return (
    <>
      <PageHero
        eyebrow="VaultHost"
        title={<>Compare all <span className="text-gradient">hosting plans</span></>}
        description="Side-by-side comparison of every hosting plan we offer. Switch between monthly and annual billing to see your savings."
      />

      <section className="relative py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-4 mb-10">
            <span className={`text-sm font-medium ${billing === 'monthly' ? 'text-foreground' : 'text-muted-foreground'}`}>Monthly</span>
            <button
              onClick={() => setBilling(billing === 'monthly' ? 'annual' : 'monthly')}
              className="relative h-7 w-14 rounded-full bg-muted border border-border transition-colors"
            >
              <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-primary transition-transform ${billing === 'annual' ? 'translate-x-7' : 'translate-x-0.5'}`} />
            </button>
            <span className={`text-sm font-medium ${billing === 'annual' ? 'text-foreground' : 'text-muted-foreground'}`}>
              Annual <span className="text-xs text-primary">(Save ~17%)</span>
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-sm font-semibold text-muted-foreground sticky left-0 bg-background z-10 min-w-[180px]">Plan</th>
                  {plans.map((plan) => (
                    <th key={plan.id} className="p-4 text-center min-w-[160px]">
                      <div className="flex flex-col items-center gap-1">
                        {plan.is_popular && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary">
                            <Star className="h-2.5 w-2.5 fill-primary" />Popular
                          </span>
                        )}
                        <span className="text-sm font-semibold">{plan.name}</span>
                        <span className="text-xs text-muted-foreground">{TIER_LABELS[plan.tier as HostingTier]}</span>
                        <span className="text-lg font-bold mt-1">&#8377;{getPrice(plan).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                        <span className="text-xs text-muted-foreground">/mo</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {['cpu', 'ram', 'storage', 'bandwidth'].map((spec) => (
                  <tr key={spec} className="border-b border-border/50">
                    <td className="p-4 text-sm font-medium sticky left-0 bg-background z-10 capitalize">{spec}</td>
                    {plans.map((plan) => (
                      <td key={plan.id} className="p-4 text-center text-sm text-muted-foreground">
                        {(plan as unknown as Record<string, string | null>)[spec] || '—'}
                      </td>
                    ))}
                  </tr>
                ))}

                {allFeatures.map((feature, i) => (
                  <tr key={i} className={`border-b border-border/30 ${i % 2 === 0 ? 'bg-muted/10' : ''}`}>
                    <td className="p-3 text-sm text-muted-foreground sticky left-0 bg-background z-10">{feature}</td>
                    {plans.map((plan) => (
                      <td key={plan.id} className="p-3 text-center">
                        {hasFeature(plan, feature) ? (
                          <Check className="h-4 w-4 text-primary mx-auto" />
                        ) : (
                          <X className="h-4 w-4 text-muted-foreground/30 mx-auto" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}

                <tr>
                  <td className="p-4 sticky left-0 bg-background z-10"></td>
                  {plans.map((plan) => (
                    <td key={plan.id} className="p-4 text-center">
                      <Link
                        href={`/vaulthost/checkout?plan=${plan.slug}`}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium liquid-glass-button hover:border-primary/40 transition-colors"
                      >
                        Order<ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
