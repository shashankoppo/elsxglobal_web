'use client';

import { useState } from 'react';
import { PageHero } from '@/components/site/page-hero';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, CheckCircle2, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { syncLeadToOdoo } from '@/lib/odoo';

const INTENTS = [
  { value: 'consultation', label: 'Strategy Consultation' },
  { value: 'proposal', label: 'Request a Proposal' },
  { value: 'discovery', label: 'Discovery Call' },
  { value: 'contact', label: 'General Inquiry' },
];

export default function ContactPage() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const payload = {
      full_name: String(formData.get('full_name') || ''),
      work_email: String(formData.get('work_email') || ''),
      company: String(formData.get('company') || '') || null,
      phone: String(formData.get('phone') || '') || null,
      intent: String(formData.get('intent') || 'contact'),
      message: String(formData.get('message') || '') || null,
      source: 'contact-page',
    };

    if (!payload.full_name || !payload.work_email) {
      setError('Please provide your name and work email.');
      setSubmitting(false);
      return;
    }

    const { error: insertError } = await supabase.from('leads').insert(payload);
    if (insertError) {
      setError('Something went wrong. Please try again or email us directly.');
      setSubmitting(false);
      return;
    }

    setSuccess(true);
    setSubmitting(false);

    // Fire-and-forget Odoo CRM sync
    syncLeadToOdoo({
      full_name: payload.full_name,
      work_email: payload.work_email,
      company: payload.company,
      phone: payload.phone,
      intent: payload.intent,
      message: payload.message,
      source: payload.source,
    });
  }

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let&apos;s start a <span className="text-gradient">conversation.</span>
          </>
        }
        description="Tell us about your organization and what you're looking to transform. A senior advisor will respond within one business day."
      />

      <section className="relative py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="glass rounded-2xl p-6">
                <h3 className="text-base font-semibold mb-4">Reach us directly</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 shrink-0">
                      <Mail className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Email</p>
                      <a
                        href="mailto:contact@evolucentsphere.com"
                        className="text-sm font-medium hover:text-primary transition-colors break-all"
                      >
                        contact@evolucentsphere.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 shrink-0">
                      <Phone className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Phone</p>
                      <div className="space-y-0.5">
                        <a href="tel:+917247558873" className="block text-sm font-medium hover:text-primary transition-colors">
                          +91 72475 58873
                        </a>
                        <a href="tel:+918770422622" className="block text-sm font-medium hover:text-primary transition-colors">
                          +91 87704 22622
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 shrink-0">
                      <MapPin className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Headquarters</p>
                      <p className="text-sm font-medium">
                        EvolucentSphere Pvt. Ltd.
                        <br />
                        Jabalpur, Madhya Pradesh
                        <br />
                        India
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass rounded-2xl p-6">
                <h3 className="text-base font-semibold mb-3">Response time</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We respond to all inquiries within one business day. For
                  proposal requests, expect a scoped response within 48 hours.
                </p>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="glass-strong rounded-2xl p-6 sm:p-8">
                {success ? (
                  <div className="flex flex-col items-center text-center py-12 animate-fade-in">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/15 border border-primary/30 mb-5">
                      <CheckCircle2 className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      Message Received
                    </h3>
                    <p className="text-sm text-muted-foreground max-w-sm">
                      Thank you for reaching out. A senior transformation advisor
                      will respond within one business day.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="full_name">Full Name *</Label>
                        <Input
                          id="full_name"
                          name="full_name"
                          required
                          placeholder="Jane Doe"
                          className="bg-background/50"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="company">Company</Label>
                        <Input
                          id="company"
                          name="company"
                          placeholder="Acme Inc."
                          className="bg-background/50"
                        />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="work_email">Work Email *</Label>
                        <Input
                          id="work_email"
                          name="work_email"
                          type="email"
                          required
                          placeholder="jane@acme.com"
                          className="bg-background/50"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          name="phone"
                          placeholder="+91 XXXXX XXXXX"
                          className="bg-background/50"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="intent">What are you looking for?</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {INTENTS.map((opt) => (
                          <label
                            key={opt.value}
                            className="flex items-center gap-2 rounded-lg border border-border/60 bg-background/40 px-3 py-2.5 cursor-pointer hover:border-primary/40 transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/10"
                          >
                            <input
                              type="radio"
                              name="intent"
                              value={opt.value}
                              defaultChecked={opt.value === 'consultation'}
                              className="accent-primary"
                            />
                            <span className="text-sm">{opt.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="message">Tell us about your goals</Label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={4}
                        placeholder="Briefly describe your organization, current systems, and what you'd like to transform..."
                        className="bg-background/50 resize-none"
                      />
                    </div>
                    {error && (
                      <p className="text-sm text-destructive">{error}</p>
                    )}
                    <Button
                      type="submit"
                      disabled={submitting}
                      className="w-full h-12 btn-premium group"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
