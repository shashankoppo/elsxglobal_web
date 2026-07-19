'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase';
import { ComparisonMatrix } from '@/components/hosting/comparison-matrix';
import { Check, Sparkles, TrendingDown, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';

interface Plan {
  id: string;
  name: string;
  tier: string;
  price_monthly: number;
  price_annual: number;
  features: string[];
  is_popular: boolean;
  short_description: string;
}

export function PricingPageClient() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  useEffect(() => {
    const fetchPlans = async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from('hosting_plans')
        .select('*')
        .eq('is_active', true)
        .order('sort_order');
      setPlans(data || []);
      setLoading(false);
    };
    fetchPlans();
  }, []);

  const tiers = ['shared', 'vps', 'cloud', 'dedicated', 'wordpress'];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="pt-24">
      <div className="container-wide px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <TrendingDown className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-medium text-primary">Save up to 85% vs AWS/Azure</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Enterprise Hosting. <span className="text-primary">Human Pricing.</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            All plans include NVMe storage, daily backups, DDoS protection, and 24/7 human support. No hidden fees, ever.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-3 mt-8 liquid-glass rounded-full p-1">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${billingCycle === 'monthly' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${billingCycle === 'annual' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}
            >
              Annual
              <span className="text-xs px-1.5 py-0.5 rounded-full bg-green-500/20 text-green-500">2 months free</span>
            </button>
          </div>
        </div>

        {/* Plan Grids by Tier */}
        {tiers.map((tier) => {
          const tierPlans = plans.filter((p) => p.tier === tier);
          if (tierPlans.length === 0) return null;

          return (
            <div key={tier} className="mb-16">
              <h2 className="text-2xl font-semibold capitalize mb-6">{tier} Hosting</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tierPlans.map((plan) => {
                  const price = billingCycle === 'annual' ? Number(plan.price_annual) : Number(plan.price_monthly);
                  const monthlyEquivalent = billingCycle === 'annual' ? Math.round(Number(plan.price_annual) / 12) : null;
                  const savings = billingCycle === 'annual' ? Number(plan.price_monthly) * 12 - Number(plan.price_annual) : 0;

                  return (
                    <div
                      key={plan.id}
                      className={`liquid-glass-card rounded-3xl p-6 relative transition-transform hover:-translate-y-1 ${plan.is_popular ? 'border-primary ring-2 ring-primary/20' : ''}`}
                    >
                      {plan.is_popular && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                            <Sparkles className="h-3 w-3" /> Popular
                          </span>
                        </div>
                      )}

                      <h3 className="text-lg font-semibold mb-1">{plan.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{plan.short_description}</p>

                      <div className="mb-4">
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-bold">Rs {price.toLocaleString('en-IN')}</span>
                          <span className="text-sm text-muted-foreground">/{billingCycle === 'annual' ? 'yr' : 'mo'}</span>
                        </div>
                        {monthlyEquivalent && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Rs {monthlyEquivalent.toLocaleString('en-IN')}/mo billed annually
                          </p>
                        )}
                        {savings > 0 && (
                          <p className="text-xs text-green-500 mt-1">
                            Save Rs {savings.toLocaleString('en-IN')}/year
                          </p>
                        )}
                      </div>

                      <ul className="space-y-2 mb-6">
                        {(plan.features as string[] || []).slice(0, 6).map((f, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                            <span className="text-muted-foreground">{f}</span>
                          </li>
                        ))}
                      </ul>

                      <Link
                        href={`/vaulthost/checkout?plan=${plan.id}`}
                        className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${plan.is_popular ? 'bg-primary text-primary-foreground' : 'liquid-glass hover:bg-muted'}`}
                      >
                        Get Started <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* AWS/Azure Comparison */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-3">The Real Cost Difference</h2>
            <p className="text-muted-foreground">See exactly how much you save with VaultHost vs AWS and Azure</p>
          </div>
          <ComparisonMatrix />
        </div>
      </div>
    </div>
  );
}
