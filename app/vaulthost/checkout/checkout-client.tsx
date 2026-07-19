'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import { QRPaymentCanvas } from '@/components/hosting/qr-payment-canvas';
import {
  Check, ChevronRight, ChevronLeft, Loader2, CreditCard, QrCode, Building2,
  ShieldCheck, ArrowRight, AlertCircle, Sparkles, Globe, Lock,
} from 'lucide-react';
import Link from 'next/link';

interface Plan {
  id: string;
  name: string;
  tier: string;
  price_monthly: number;
  price_annual: number;
  features: string[];
}

type Step = 'plan' | 'domain' | 'account' | 'payment' | 'confirmation';

export function CheckoutClient({ planId }: { planId: string }) {
  const router = useRouter();
  const [step, setStep] = useState<Step>('plan');
  const [plan, setPlan] = useState<Plan | null>(null);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [loading, setLoading] = useState(true);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [domain, setDomain] = useState('');
  const [addons, setAddons] = useState<string[]>([]);
  const [paymentSettings, setPaymentSettings] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState<'razorpay' | 'upi_manual' | 'bank_transfer' | null>(null);
  const [proofUrl, setProofUrl] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  const steps: { id: Step; label: string }[] = [
    { id: 'plan', label: 'Plan' },
    { id: 'domain', label: 'Domain' },
    { id: 'account', label: 'Account' },
    { id: 'payment', label: 'Payment' },
    { id: 'confirmation', label: 'Done' },
  ];

  useEffect(() => {
    const init = async () => {
      const supabase = createClient();
      const { data: planData } = await supabase
        .from('hosting_plans')
        .select('*')
        .eq('id', planId)
        .maybeSingle();
      setPlan(planData as any);

      const { data: psData } = await supabase
        .from('public_payment_settings')
        .select('*')
        .maybeSingle();
      setPaymentSettings(psData);

      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      if (session?.user) {
        // Skip account step if logged in
      }

      setLoading(false);
    };
    init();
  }, [planId]);

  const amount = plan
    ? billingCycle === 'annual'
      ? Number(plan.price_annual)
      : Number(plan.price_monthly)
    : 0;

  const handleCreateOrder = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('hosting_orders')
      .insert({
        plan_id: planId,
        billing_cycle: billingCycle,
        amount,
        status: 'pending_payment',
        user_id: user?.id,
      })
      .select('id')
      .single();
    if (error) {
      setError(error.message);
      return null;
    }
    setOrderId(data.id);
    return data.id;
  };

  const handleUpdateOrder = async (id: string) => {
    const supabase = createClient();
    await supabase
      .from('hosting_orders')
      .update({
        domain,
        addons,
        amount,
      })
      .eq('id', id);
  };

  const handlePaymentSubmit = async () => {
    if (!orderId) return;
    setSubmitting(true);
    setError(null);

    try {
      const supabase = createClient();

      // Insert transaction record
      await supabase.from('transactions').insert({
        order_id: orderId,
        user_id: user?.id,
        amount,
        currency: 'INR',
        gateway: paymentMethod,
        status: 'pending',
        metadata: { proof_url: proofUrl, billing_cycle: billingCycle },
      });

      // Update order status
      await supabase
        .from('hosting_orders')
        .update({
          status: 'pending_verification',
          payment_method: paymentMethod,
          payment_proof_url: proofUrl,
        })
        .eq('id', orderId);

      setStep('confirmation');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Submission failed');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="text-center py-24">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <p className="text-lg font-semibold mb-2">Plan Not Found</p>
        <p className="text-sm text-muted-foreground mb-6">The selected hosting plan could not be loaded.</p>
        <Link href="/vaulthost" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground">
          Browse Plans <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  const currentStepIndex = steps.findIndex((s) => s.id === step);

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          {steps.map((s, idx) => (
            <div key={s.id} className="flex items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-colors ${
                  idx <= currentStepIndex ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}
              >
                {idx < currentStepIndex ? <Check className="h-4 w-4" /> : idx + 1}
              </div>
              {idx < steps.length - 1 && (
                <div className={`w-12 h-0.5 mx-1 ${idx < currentStepIndex ? 'bg-primary' : 'bg-muted'}`} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          {steps.map((s) => (
            <span key={s.id}>{s.label}</span>
          ))}
        </div>
      </div>

      {error && (
        <div className="liquid-glass rounded-xl p-3 mb-6 border-red-500/30 bg-red-500/5 flex items-start gap-2.5">
          <AlertCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
          <p className="text-sm text-red-500">{error}</p>
        </div>
      )}

      {/* Step 1: Plan + Cycle */}
      {step === 'plan' && (
        <div className="liquid-glass-card rounded-3xl p-8">
          <h2 className="text-xl font-semibold mb-2">Confirm Your Plan</h2>
          <p className="text-sm text-muted-foreground mb-6">Review your selected plan and billing cycle</p>

          <div className="liquid-glass rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                <p className="text-sm text-muted-foreground capitalize">{plan.tier} hosting</p>
              </div>
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {(plan.features as string[] || []).slice(0, 4).map((f, i) => (
                <span key={i} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                  {f}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="text-sm font-medium mb-3 block">Billing Cycle</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`p-4 rounded-xl border-2 transition-colors text-left ${billingCycle === 'monthly' ? 'border-primary bg-primary/5' : 'border-border'}`}
              >
                <p className="font-semibold">Monthly</p>
                <p className="text-2xl font-bold">Rs {Number(plan.price_monthly).toLocaleString('en-IN')}</p>
                <p className="text-xs text-muted-foreground">per month</p>
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`p-4 rounded-xl border-2 transition-colors text-left ${billingCycle === 'annual' ? 'border-primary bg-primary/5' : 'border-border'}`}
              >
                <div className="flex items-center justify-between">
                  <p className="font-semibold">Annual</p>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-500">
                    Save Rs {(Number(plan.price_monthly) * 12 - Number(plan.price_annual)).toLocaleString('en-IN')}
                  </span>
                </div>
                <p className="text-2xl font-bold">Rs {Number(plan.price_annual).toLocaleString('en-IN')}</p>
                <p className="text-xs text-muted-foreground">per year (2 months free)</p>
              </button>
            </div>
          </div>

          <button
            onClick={async () => {
              const id = await handleCreateOrder();
              if (id) setStep('domain');
            }}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary text-primary-foreground font-medium"
          >
            Continue <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Step 2: Domain & Addons */}
      {step === 'domain' && (
        <div className="liquid-glass-card rounded-3xl p-8">
          <h2 className="text-xl font-semibold mb-2">Domain & Configuration</h2>
          <p className="text-sm text-muted-foreground mb-6">Configure your domain and select addons</p>

          <div className="space-y-4 mb-6">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Primary Domain</label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  placeholder="example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Optional Addons</label>
              <div className="space-y-2">
                {[
                  { id: 'ssl', label: 'Premium SSL Certificate', price: 299 },
                  { id: 'backup', label: 'Daily Backup (30-day retention)', price: 199 },
                  { id: 'managed', label: 'Managed Support (24/7)', price: 499 },
                ].map((addon) => (
                  <label key={addon.id} className="flex items-center justify-between liquid-glass rounded-xl p-3 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={addons.includes(addon.id)}
                        onChange={(e) => {
                          if (e.target.checked) setAddons([...addons, addon.id]);
                          else setAddons(addons.filter((a) => a !== addon.id));
                        }}
                        className="h-4 w-4 rounded"
                      />
                      <span className="text-sm">{addon.label}</span>
                    </div>
                    <span className="text-sm font-medium">+Rs {addon.price}/mo</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep('plan')}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl liquid-glass text-sm font-medium"
            >
              <ChevronLeft className="h-4 w-4" /> Back
            </button>
            <button
              onClick={async () => {
                if (orderId) await handleUpdateOrder(orderId);
                if (user) setStep('payment');
                else setStep('account');
              }}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary text-primary-foreground font-medium"
            >
              Continue <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Account */}
      {step === 'account' && (
        <div className="liquid-glass-card rounded-3xl p-8">
          <h2 className="text-xl font-semibold mb-2">Create Your Account</h2>
          <p className="text-sm text-muted-foreground mb-6">Sign up to manage your hosting services</p>

          <div className="space-y-4 mb-6">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Password</label>
              <input
                type="password"
                placeholder="Minimum 8 characters"
                className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link href="/portal/login" className="text-primary hover:underline">Sign in</Link>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep('domain')}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl liquid-glass text-sm font-medium"
            >
              <ChevronLeft className="h-4 w-4" /> Back
            </button>
            <button
              onClick={() => setStep('payment')}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary text-primary-foreground font-medium"
            >
              Continue to Payment <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Payment */}
      {step === 'payment' && (
        <div className="liquid-glass-card rounded-3xl p-8">
          <h2 className="text-xl font-semibold mb-2">Payment Method</h2>
          <p className="text-sm text-muted-foreground mb-6">Choose how you want to pay Rs {amount.toLocaleString('en-IN')}</p>

          <div className="space-y-3 mb-6">
            {paymentSettings?.razorpay_enabled && (
              <button
                onClick={() => setPaymentMethod('razorpay')}
                className={`w-full p-4 rounded-xl border-2 flex items-center gap-3 transition-colors text-left ${paymentMethod === 'razorpay' ? 'border-primary bg-primary/5' : 'border-border'}`}
              >
                <CreditCard className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="font-medium text-sm">Razorpay</p>
                  <p className="text-xs text-muted-foreground">Credit/Debit card, Net banking, Wallet</p>
                </div>
              </button>
            )}

            {paymentSettings?.upi_enabled && (
              <div>
                <button
                  onClick={() => setPaymentMethod('upi_manual')}
                  className={`w-full p-4 rounded-xl border-2 flex items-center gap-3 transition-colors text-left ${paymentMethod === 'upi_manual' ? 'border-primary bg-primary/5' : 'border-border'}`}
                >
                  <QrCode className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="font-medium text-sm">UPI / QR Code</p>
                    <p className="text-xs text-muted-foreground">Scan QR with any UPI app, upload proof</p>
                  </div>
                </button>

                {paymentMethod === 'upi_manual' && paymentSettings?.upi_id && (
                  <div className="mt-4 liquid-glass rounded-2xl p-6">
                    <QRPaymentCanvas
                      upiId={paymentSettings.upi_id}
                      payeeName={paymentSettings.upi_display_name || 'ELSxGlobal'}
                      amount={amount}
                      orderId={orderId || 'preview'}
                      customQrUrl={paymentSettings.custom_qr_image_url || undefined}
                      onProofUpload={(url) => setProofUrl(url)}
                    />
                  </div>
                )}
              </div>
            )}

            {paymentSettings?.bank_transfer_enabled && (
              <div>
                <button
                  onClick={() => setPaymentMethod('bank_transfer')}
                  className={`w-full p-4 rounded-xl border-2 flex items-center gap-3 transition-colors text-left ${paymentMethod === 'bank_transfer' ? 'border-primary bg-primary/5' : 'border-border'}`}
                >
                  <Building2 className="h-5 w-5 text-amber-500" />
                  <div>
                    <p className="font-medium text-sm">Bank Transfer</p>
                    <p className="text-xs text-muted-foreground">NEFT/IMPS with proof upload</p>
                  </div>
                </button>

                {paymentMethod === 'bank_transfer' && paymentSettings?.bank_details && (
                  <div className="mt-4 liquid-glass rounded-2xl p-6 space-y-3">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div><p className="text-xs text-muted-foreground">Account Name</p><p className="font-medium">{paymentSettings.bank_details.account_name || '—'}</p></div>
                      <div><p className="text-xs text-muted-foreground">Account Number</p><p className="font-medium font-mono">{paymentSettings.bank_details.account_number || '—'}</p></div>
                      <div><p className="text-xs text-muted-foreground">IFSC</p><p className="font-medium font-mono">{paymentSettings.bank_details.ifsc || '—'}</p></div>
                      <div><p className="text-xs text-muted-foreground">Bank</p><p className="font-medium">{paymentSettings.bank_details.bank_name || '—'}</p></div>
                    </div>
                    <div className="pt-3 border-t border-border">
                      <label className="text-sm font-medium mb-2 block">Upload Payment Proof</label>
                      <label className="flex flex-col items-center justify-center w-full h-24 rounded-xl border-2 border-dashed border-border hover:border-primary/50 cursor-pointer transition-colors">
                        <Lock className="h-5 w-5 text-muted-foreground mb-1" />
                        <span className="text-xs text-muted-foreground">Upload screenshot/receipt</span>
                        <input
                          type="file"
                          accept="image/*,application/pdf"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file || !orderId) return;
                            const supabase = createClient();
                            const { data, error } = await supabase.storage
                              .from('payment-proofs')
                              .upload(`proof-${orderId}-${Date.now()}.${file.name.split('.').pop()}`, file);
                            if (!error) {
                              const { data: urlData } = supabase.storage.from('payment-proofs').getPublicUrl(data.path);
                              setProofUrl(urlData.publicUrl);
                            }
                          }}
                          className="hidden"
                        />
                      </label>
                      {proofUrl && <p className="text-xs text-green-500 mt-2">Proof uploaded</p>}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep(user ? 'domain' : 'account')}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl liquid-glass text-sm font-medium"
            >
              <ChevronLeft className="h-4 w-4" /> Back
            </button>
            <button
              onClick={handlePaymentSubmit}
              disabled={!paymentMethod || submitting || (paymentMethod !== 'razorpay' && !proofUrl)}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary text-primary-foreground font-medium disabled:opacity-50"
            >
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
              Submit Payment
            </button>
          </div>
        </div>
      )}

      {/* Step 5: Confirmation */}
      {step === 'confirmation' && (
        <div className="liquid-glass-card rounded-3xl p-8 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-500/10 border border-green-500/20 mx-auto mb-6">
            <Check className="h-8 w-8 text-green-500" />
          </div>
          <h2 className="text-2xl font-semibold mb-3">Payment Submitted</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Our team will verify your payment within 2-4 hours. You will receive an email confirmation once your hosting is activated.
          </p>

          <div className="liquid-glass rounded-2xl p-4 mb-6 text-left">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Order ID</span>
              <span className="text-sm font-mono font-medium">{orderId?.slice(0, 8).toUpperCase()}</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Plan</span>
              <span className="text-sm font-medium">{plan.name}</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Amount</span>
              <span className="text-sm font-medium">Rs {amount.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Status</span>
              <span className="text-sm px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20">
                Pending Verification
              </span>
            </div>
          </div>

          <div className="flex gap-3">
            <Link
              href={user ? `/portal` : '/portal/login'}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary text-primary-foreground font-medium"
            >
              Track Order <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/vaulthost"
              className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl liquid-glass text-sm font-medium"
            >
              Browse Plans
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
