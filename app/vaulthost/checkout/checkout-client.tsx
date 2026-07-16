'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import { HostingPlan, HostingAddon, GST_RATE } from '@/lib/hosting-types';
import {
  Check, CreditCard, Smartphone, Building2, Shield, Lock, ArrowLeft,
  Loader2, Receipt, Server, AlertCircle, Copy, Wallet, ChevronRight, Clock,
  Plus
} from 'lucide-react';
import Link from 'next/link';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

type Step = 'details' | 'processing' | 'success' | 'manual-pending' | 'upi' | 'bank';
type PaymentMethod = 'razorpay' | 'upi' | 'bank';

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const planSlug = searchParams.get('plan');

  const [plan, setPlan] = useState<HostingPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');
  const [domain, setDomain] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('razorpay');
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [step, setStep] = useState<Step>('details');
  const [orderData, setOrderData] = useState<{
    orderId?: string; razorpayOrderId?: string; razorpayKeyId?: string;
    amount?: number; invoiceNumber?: string; upiId?: string;
    bankDetails?: { accountName: string; accountNumber: string; ifsc: string; bank: string };
  }>({});
  const [errorMsg, setErrorMsg] = useState('');
  const [user, setUser] = useState<{ id: string; email: string } | null>(null);
  const [addons, setAddons] = useState<HostingAddon[]>([]);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  useEffect(() => {
    const init = async () => {
      const supabase = createClient();
      const { data: planData } = await supabase
        .from('hosting_plans').select('*').eq('slug', planSlug).eq('is_active', true).maybeSingle();
      if (planData) setPlan(planData as unknown as HostingPlan);

      const { data: addonData } = await supabase
        .from('hosting_addons').select('*').eq('is_active', true).order('sort_order', { ascending: true });
      setAddons((addonData || []) as unknown as HostingAddon[]);

      const { data: authData } = await supabase.auth.getUser();
      if (authData?.user) {
        setUser({ id: authData.user.id, email: authData.user.email || '' });
      }
      setLoading(false);
    };
    init();
  }, [planSlug]);

  const basePrice = plan ? (billing === 'annual' ? plan.price_annual / 12 : plan.price_monthly) : 0;
  const addonsTotal = addons
    .filter((a) => selectedAddons.includes(a.slug))
    .reduce((sum, a) => sum + (billing === 'annual' ? a.price_annual / 12 : a.price_monthly), 0);
  const subtotal = basePrice + addonsTotal;
  const discount = couponApplied ? subtotal * 0.1 : 0;
  const taxableAmount = subtotal - discount;
  const tax = taxableAmount * GST_RATE;
  const total = taxableAmount + tax;

  const applyCoupon = () => {
    if (!couponCode.trim()) return;
    if (couponCode.toUpperCase() === 'VAULT10') {
      setCouponApplied(true);
      setCouponError('');
    } else {
      setCouponApplied(false);
      setCouponError('Invalid coupon code. Try VAULT10');
    }
  };

  const callApi = async (payload: Record<string, unknown>) => {
    const supabase = createClient();
    const { data: session } = await supabase.auth.getSession();
    const token = session.session?.access_token || SUPABASE_ANON_KEY;

    const response = await fetch(`${SUPABASE_URL}/functions/v1/vaulthost-payments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'apikey': SUPABASE_ANON_KEY || '',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({ error: 'Request failed' }));
      throw new Error(err.error || `HTTP ${response.status}`);
    }
    return response.json();
  };

  const loadRazorpay = () => new Promise((resolve, reject) => {
    if ((window as unknown as { Razorpay?: unknown }).Razorpay) { resolve(true); return; }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => reject(new Error('Failed to load Razorpay SDK'));
    document.body.appendChild(script);
  });

  const handleCheckout = async () => {
    if (!plan) return;
    if (!user) {
      router.push('/portal/login?redirect=' + encodeURIComponent(`/vaulthost/checkout?plan=${planSlug}`));
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    try {
      const result = await callApi({
        action: 'create-order',
        planSlug: plan.slug,
        billingCycle: billing,
        domain: domain || undefined,
        couponCode: couponApplied ? couponCode : undefined,
        addonSlugs: selectedAddons.length > 0 ? selectedAddons : undefined,
      });

      setOrderData(result);

      if (paymentMethod === 'razorpay' && result.razorpayOrderId && result.razorpayKeyId) {
        await loadRazorpay();

        const options = {
          key: result.razorpayKeyId,
          amount: result.amount,
          currency: 'INR',
          name: 'VaultHost by ELSxGlobal',
          description: `${plan.name} — ${billing} billing`,
          order_id: result.razorpayOrderId,
          prefill: { email: user.email },
          handler: async (response: { razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string }) => {
            setStep('processing');
            try {
              const verifyResult = await callApi({
                action: 'verify-payment',
                orderId: result.orderId,
                paymentId: response.razorpay_payment_id,
              });
              setOrderData({ ...result, invoiceNumber: verifyResult.invoiceNumber });
              setStep('success');
            } catch {
              setErrorMsg('Payment verification failed. Please contact support.');
              setStep('details');
            }
          },
          modal: { ondismiss: () => { setSubmitting(false); setStep('details'); } },
          theme: { color: '#3b82f6' },
        };

        // @ts-expect-error Razorpay global
        const rzp = new window.Razorpay(options);
        rzp.on('payment.failed', (resp: { error: { description: string } }) => {
          setErrorMsg(resp.error?.description || 'Payment failed');
          setStep('details');
        });
        rzp.open();
      } else if (paymentMethod === 'upi') {
        setStep('upi');
      } else {
        setStep('bank');
      }
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Failed to initiate payment');
    } finally {
      setSubmitting(false);
    }
  };

  const confirmManualPayment = async () => {
    if (!orderData.orderId) return;
    setSubmitting(true);
    try {
      await callApi({
        action: 'mark-manual-payment',
        orderId: orderData.orderId,
        paymentMethod,
      });
      setStep('manual-pending');
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Failed to record payment');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  if (!plan) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-semibold mb-4">Plan not found</h1>
          <p className="text-muted-foreground mb-6">The hosting plan you selected is no longer available.</p>
          <Link href="/vaulthost" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium">
            <ArrowLeft className="h-4 w-4" />Back to VaultHost
          </Link>
        </div>
      </div>
    );
  }

  // Success
  if (step === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-lg w-full">
          <div className="liquid-glass-strong rounded-3xl p-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-500/10 border border-green-500/20 mx-auto mb-6">
              <Check className="h-8 w-8 text-green-500" />
            </div>
            <h1 className="text-2xl font-semibold mb-3">Payment Successful!</h1>
            <p className="text-muted-foreground mb-6">Your hosting plan is now being provisioned. You will receive a confirmation email shortly.</p>
            <div className="liquid-glass rounded-xl p-4 mb-6 text-left space-y-2">
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Order ID</span><span className="font-mono text-xs">{orderData.orderId?.slice(0, 8)}</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Invoice</span><span className="font-mono text-xs">{orderData.invoiceNumber}</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Plan</span><span className="font-medium">{plan.name}</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Billing</span><span className="font-medium capitalize">{billing}</span></div>
              <div className="flex justify-between text-sm pt-2 border-t border-border"><span className="font-medium">Total Paid</span><span className="font-bold text-green-500">&#8377;{total.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span></div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/portal" className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm">Go to Portal</Link>
              <Link href="/vaulthost" className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl liquid-glass-button font-medium text-sm">Browse More Plans</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Manual pending
  if (step === 'manual-pending') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-lg w-full">
          <div className="liquid-glass-strong rounded-3xl p-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/20 mx-auto mb-6">
              <Clock className="h-8 w-8 text-amber-500" />
            </div>
            <h1 className="text-2xl font-semibold mb-3">Payment Submitted</h1>
            <p className="text-muted-foreground mb-6">We have recorded your payment. Your order will be activated within 1-2 business hours after verification.</p>
            <div className="liquid-glass rounded-xl p-4 mb-6 text-left space-y-2">
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Order ID</span><span className="font-mono text-xs">{orderData.orderId?.slice(0, 8)}</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Plan</span><span className="font-medium">{plan.name}</span></div>
              <div className="flex justify-between text-sm pt-2 border-t border-border"><span className="font-medium">Amount</span><span className="font-bold">&#8377;{total.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span></div>
            </div>
            <Link href="/portal" className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm">Go to Portal</Link>
          </div>
        </div>
      </div>
    );
  }

  // UPI
  if (step === 'upi' && orderData.upiId) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-md w-full">
          <div className="liquid-glass-strong rounded-3xl p-8 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 mx-auto mb-6">
              <Smartphone className="h-7 w-7 text-primary" />
            </div>
            <h1 className="text-2xl font-semibold mb-3">Pay via UPI</h1>
            <p className="text-muted-foreground mb-6">Use the UPI ID below to pay &#8377;{total.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</p>
            <div className="liquid-glass rounded-2xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-muted-foreground">UPI ID</span>
                <button onClick={() => navigator.clipboard.writeText(orderData.upiId!)} className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline">
                  <Copy className="h-3.5 w-3.5" />Copy
                </button>
              </div>
              <p className="text-xl font-mono font-semibold mb-4">{orderData.upiId}</p>
              <div className="border-t border-border pt-4 space-y-2 text-sm text-left">
                <div className="flex justify-between"><span className="text-muted-foreground">Amount</span><span className="font-bold">&#8377;{total.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Plan</span><span>{plan.name}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Order Ref</span><span className="font-mono text-xs">{orderData.orderId?.slice(0, 12)}</span></div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mb-6">After making the payment, click below to confirm. We will verify and activate your service within 1-2 hours.</p>
            <button onClick={confirmManualPayment} disabled={submitting} className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 disabled:opacity-50">
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
              {submitting ? 'Confirming...' : "I've Paid — Confirm"}
            </button>
            <button onClick={() => setStep('details')} className="w-full mt-3 text-sm text-muted-foreground hover:text-foreground">Back to checkout</button>
          </div>
        </div>
      </div>
    );
  }

  // Bank transfer
  if (step === 'bank' && orderData.bankDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-md w-full">
          <div className="liquid-glass-strong rounded-3xl p-8 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 mx-auto mb-6">
              <Building2 className="h-7 w-7 text-primary" />
            </div>
            <h1 className="text-2xl font-semibold mb-3">Bank Transfer</h1>
            <p className="text-muted-foreground mb-6">Transfer &#8377;{total.toLocaleString('en-IN', { maximumFractionDigits: 2 })} to the account below</p>
            <div className="liquid-glass rounded-2xl p-6 mb-6 text-left space-y-3">
              {[
                { label: 'Account Name', value: orderData.bankDetails.accountName },
                { label: 'Account Number', value: orderData.bankDetails.accountNumber },
                { label: 'IFSC Code', value: orderData.bankDetails.ifsc },
                { label: 'Bank', value: orderData.bankDetails.bank },
                { label: 'Amount', value: `₹${total.toLocaleString('en-IN', { maximumFractionDigits: 2 })}` },
                { label: 'Reference', value: orderData.orderId?.slice(0, 12) || '', mono: true },
              ].map((item) => (
                <div key={item.label} className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-medium ${item.mono ? 'font-mono text-xs' : ''}`}>{item.value}</span>
                    <button onClick={() => navigator.clipboard.writeText(item.value)} className="text-muted-foreground hover:text-primary"><Copy className="h-3.5 w-3.5" /></button>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mb-6">Use the Order Reference as your transfer note. After transferring, confirm below.</p>
            <button onClick={confirmManualPayment} disabled={submitting} className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 disabled:opacity-50">
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
              {submitting ? 'Confirming...' : "I've Transferred — Confirm"}
            </button>
            <button onClick={() => setStep('details')} className="w-full mt-3 text-sm text-muted-foreground hover:text-foreground">Back to checkout</button>
          </div>
        </div>
      </div>
    );
  }

  // Processing
  if (step === 'processing') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <h2 className="text-lg font-semibold mb-2">Verifying Payment...</h2>
          <p className="text-sm text-muted-foreground">Please don&apos;t close this window.</p>
        </div>
      </div>
    );
  }

  // Main checkout form
  return (
    <div className="min-h-screen py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Link href="/vaulthost" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft className="h-4 w-4" />Back to plans
        </Link>

        <h1 className="text-3xl font-semibold tracking-tight mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 space-y-6">
            {!user && (
              <div className="liquid-glass-card rounded-2xl p-5 border-amber-500/30 bg-amber-500/5">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">
                    You need to be signed in to complete your purchase.{' '}
                    <Link href={`/portal/login?redirect=${encodeURIComponent(`/vaulthost/checkout?plan=${planSlug}`)}`} className="text-primary hover:underline font-medium">Sign in</Link>
                    {' '}or{' '}
                    <Link href={`/portal/signup?redirect=${encodeURIComponent(`/vaulthost/checkout?plan=${planSlug}`)}`} className="text-primary hover:underline font-medium">create an account</Link>.
                  </p>
                </div>
              </div>
            )}

            {/* Billing Cycle */}
            <div className="liquid-glass-card rounded-2xl p-6">
              <h2 className="text-base font-semibold mb-4 flex items-center gap-2"><ChevronRight className="h-4 w-4 text-primary" />Billing Cycle</h2>
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => setBilling('monthly')} className={`p-4 rounded-xl border text-left transition-all ${billing === 'monthly' ? 'border-primary bg-primary/5 ring-1 ring-primary/20' : 'border-border hover:border-primary/30'}`}>
                  <p className="text-sm font-medium">Monthly</p>
                  <p className="text-2xl font-bold mt-1">&#8377;{plan.price_monthly.toLocaleString('en-IN')}</p>
                  <p className="text-xs text-muted-foreground">per month</p>
                </button>
                <button onClick={() => setBilling('annual')} className={`p-4 rounded-xl border text-left transition-all ${billing === 'annual' ? 'border-primary bg-primary/5 ring-1 ring-primary/20' : 'border-border hover:border-primary/30'}`}>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">Annual</p>
                    <span className="text-xs px-1.5 py-0.5 rounded-full bg-green-500/10 text-green-500 font-medium">Save 17%</span>
                  </div>
                  <p className="text-2xl font-bold mt-1">&#8377;{(plan.price_annual / 12).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                  <p className="text-xs text-muted-foreground">per month, billed yearly</p>
                </button>
              </div>
            </div>

            {/* Domain */}
            <div className="liquid-glass-card rounded-2xl p-6">
              <h2 className="text-base font-semibold mb-4 flex items-center gap-2"><ChevronRight className="h-4 w-4 text-primary" />Domain (Optional)</h2>
              <p className="text-sm text-muted-foreground mb-3">Enter the domain you want to host, or leave blank to configure later.</p>
              <input type="text" value={domain} onChange={(e) => setDomain(e.target.value)} placeholder="example.com" className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40" />
            </div>

            {/* Add-ons */}
            {addons.length > 0 && (
              <div className="liquid-glass-card rounded-2xl p-6">
                <h2 className="text-base font-semibold mb-4 flex items-center gap-2"><Plus className="h-4 w-4 text-primary" />Add-ons (Optional)</h2>
                <p className="text-sm text-muted-foreground mb-4">Enhance your hosting with powerful add-ons. Cancel anytime.</p>
                <div className="space-y-2.5">
                  {addons.map((addon) => {
                    const isSelected = selectedAddons.includes(addon.slug);
                    const addonPrice = billing === 'annual' ? addon.price_annual / 12 : addon.price_monthly;
                    return (
                      <button
                        key={addon.id}
                        onClick={() => {
                          setSelectedAddons(isSelected
                            ? selectedAddons.filter((s) => s !== addon.slug)
                            : [...selectedAddons, addon.slug]);
                        }}
                        className={`w-full p-4 rounded-xl border text-left flex items-center gap-4 transition-all ${isSelected ? 'border-primary bg-primary/5 ring-1 ring-primary/20' : 'border-border hover:border-primary/30'}`}
                      >
                        <div className={`h-5 w-5 rounded-md border-2 flex items-center justify-center shrink-0 ${isSelected ? 'border-primary bg-primary' : 'border-border'}`}>
                          {isSelected && <Check className="h-3 w-3 text-primary-foreground" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">{addon.name}</p>
                          <p className="text-xs text-muted-foreground line-clamp-1">{addon.description}</p>
                        </div>
                        <div className="text-right shrink-0">
                          {addonPrice === 0 ? (
                            <p className="text-sm font-medium text-green-500">Free</p>
                          ) : (
                            <p className="text-sm font-medium">&#8377;{addonPrice.toLocaleString('en-IN', { maximumFractionDigits: 0 })}<span className="text-xs text-muted-foreground">/mo</span></p>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Payment Method */}
            <div className="liquid-glass-card rounded-2xl p-6">
              <h2 className="text-base font-semibold mb-4 flex items-center gap-2"><ChevronRight className="h-4 w-4 text-primary" />Payment Method</h2>
              <div className="space-y-3">
                {[
                  { id: 'razorpay' as PaymentMethod, label: 'Razorpay', sublabel: 'Card / UPI / Netbanking / Wallet', icon: CreditCard },
                  { id: 'upi' as PaymentMethod, label: 'UPI Direct', sublabel: 'Pay via UPI ID', icon: Smartphone },
                  { id: 'bank' as PaymentMethod, label: 'Bank Transfer', sublabel: 'NEFT / IMPS / RTGS', icon: Building2 },
                ].map((method) => (
                  <button key={method.id} onClick={() => setPaymentMethod(method.id)} className={`w-full p-4 rounded-xl border text-left flex items-center gap-4 transition-all ${paymentMethod === method.id ? 'border-primary bg-primary/5 ring-1 ring-primary/20' : 'border-border hover:border-primary/30'}`}>
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${paymentMethod === method.id ? 'bg-primary/10 border border-primary/20' : 'bg-muted border border-border'}`}>
                      <method.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{method.label}</p>
                      <p className="text-xs text-muted-foreground">{method.sublabel}</p>
                    </div>
                    <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === method.id ? 'border-primary bg-primary' : 'border-border'}`}>
                      {paymentMethod === method.id && <Check className="h-3 w-3 text-primary-foreground" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {errorMsg && (
              <div className="liquid-glass-card rounded-2xl p-4 border-red-500/30 bg-red-500/5">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-red-500 shrink-0" />
                  <p className="text-sm text-red-500">{errorMsg}</p>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="liquid-glass-strong rounded-2xl p-6 sticky top-8">
              <h2 className="text-base font-semibold mb-4 flex items-center gap-2"><Receipt className="h-4 w-4" />Order Summary</h2>

              <div className="flex items-start gap-3 mb-6 pb-6 border-b border-border">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 shrink-0">
                  <Server className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{plan.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{plan.tier} hosting</p>
                  <p className="text-xs text-muted-foreground mt-1 capitalize">{billing} billing</p>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex gap-2">
                  <input type="text" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} placeholder="Coupon code" className="flex-1 px-3 py-2 rounded-lg bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                  <button onClick={applyCoupon} className="px-4 py-2 rounded-lg liquid-glass-button text-sm font-medium">Apply</button>
                </div>
                {couponApplied && <p className="text-xs text-green-500 mt-1.5 flex items-center gap-1"><Check className="h-3 w-3" />Coupon applied: 10% off</p>}
                {couponError && <p className="text-xs text-red-500 mt-1.5">{couponError}</p>}
                {!couponApplied && !couponError && <p className="text-xs text-muted-foreground/60 mt-1.5">Try code: VAULT10</p>}
              </div>

              <div className="space-y-2.5 mb-4">
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Plan ({plan.name})</span><span>&#8377;{basePrice.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span></div>
                {addonsTotal > 0 && (
                  <div className="flex justify-between text-sm"><span className="text-muted-foreground">Add-ons</span><span>&#8377;{addonsTotal.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span></div>
                )}
                <div className="flex justify-between text-sm pt-2 border-t border-border"><span className="font-medium">Subtotal</span><span>&#8377;{subtotal.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span></div>
                {discount > 0 && <div className="flex justify-between text-sm"><span className="text-muted-foreground">Discount (10%)</span><span className="text-green-500">-&#8377;{discount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span></div>}
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">GST (18%)</span><span>&#8377;{tax.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span></div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-border mb-6">
                <span className="text-base font-semibold">Total</span>
                <div className="text-right">
                  <span className="text-2xl font-bold">&#8377;{total.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                  <p className="text-xs text-muted-foreground">{billing === 'annual' ? 'per month, billed yearly' : 'per month'}</p>
                </div>
              </div>

              <button onClick={handleCheckout} disabled={submitting} className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors disabled:opacity-50">
                {submitting ? <><Loader2 className="h-4 w-4 animate-spin" />Processing...</> : <><Lock className="h-4 w-4" />Pay &#8377;{total.toLocaleString('en-IN', { maximumFractionDigits: 0 })} Now</>}
              </button>

              <div className="flex items-center justify-center gap-2 mt-4 text-xs text-muted-foreground">
                <Shield className="h-3.5 w-3.5" />Secure checkout · 30-day money-back guarantee
              </div>

              <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-border">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground"><Lock className="h-3 w-3" />SSL Secured</div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground"><Wallet className="h-3 w-3" />GST Invoice</div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground"><Shield className="h-3 w-3" />PCI Compliant</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutClient() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}>
      <CheckoutContent />
    </Suspense>
  );
}
