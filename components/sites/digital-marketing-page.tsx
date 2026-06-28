'use client';

import { ArrowRight, Search, Target, PenTool, Mail, Share2, BarChart3, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLead } from '@/components/site/lead-context';
import Link from 'next/link';

const services = [
  { icon: Search, title: 'SEO Services', desc: 'Technical SEO, content optimization, and authority building for long-term organic growth.' },
  { icon: Target, title: 'Paid Advertising', desc: 'Google Ads, Meta, LinkedIn campaigns with full-funnel attribution and optimization.' },
  { icon: PenTool, title: 'Content Marketing', desc: 'Strategy, creation, and distribution that builds authority and generates leads.' },
  { icon: Mail, title: 'Email Marketing', desc: 'Lifecycle automation, nurture sequences, and retention campaigns.' },
  { icon: Share2, title: 'Social Media', desc: 'Strategy and execution for B2B and B2C social presence.' },
  { icon: BarChart3, title: 'Analytics', desc: 'Full-funnel attribution and reporting that connects marketing to revenue.' },
];

const results = [
  { metric: '3.2x', label: 'Average Lead Increase' },
  { metric: '48%', label: 'Lower Cost Per Acquisition' },
  { metric: '300%', label: 'Average ROI' },
  { metric: '24/7', label: 'Campaign Monitoring' },
];

export function DigitalMarketingPage() {
  const { openLead } = useLead();

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-[0.03]" />
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm font-medium text-primary">Digital Marketing</span>
            </div>
            <h1 className="text-display-lg mb-6">
              Digital Marketing Agency in India
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mb-8">
              Data-driven digital marketing that generates qualified leads and accelerates growth.
              From SEO to paid acquisition—we build marketing engines that deliver measurable ROI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={() => openLead('consultation')} className="btn-primary h-12 px-8">
                Get Free Strategy Session
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" asChild className="h-12 px-8">
                <Link href="#services">View Services</Link>
              </Button>
            </div>
          </div>

          {/* Results */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-12 border-t">
            {results.map((r) => (
              <div key={r.label}>
                <p className="text-4xl font-bold">{r.metric}</p>
                <p className="text-sm text-muted-foreground mt-1">{r.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="section-padding bg-muted/20">
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-primary font-medium mb-3">Services</p>
            <h2 className="text-display-md mb-4">Full-Stack Digital Marketing</h2>
            <p className="text-muted-foreground">
              Integrated marketing services that work together to drive growth.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <div key={s.title} className="card-minimal p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                  <s.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding">
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-primary font-medium mb-3">Process</p>
            <h2 className="text-display-md mb-4">How We Drive Growth</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: 1, title: 'Audit', desc: 'Comprehensive marketing and funnel analysis' },
              { step: 2, title: 'Strategy', desc: 'Data-driven growth plan development' },
              { step: 3, title: 'Execute', desc: 'Integrated campaign launch across channels' },
              { step: 4, title: 'Optimize', desc: 'Continuous testing and optimization' },
            ].map((item) => (
              <div key={item.step} className="card-minimal p-5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Coverage */}
      <section className="section-padding bg-muted/20">
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-primary font-medium mb-3">Coverage</p>
            <h2 className="text-display-md mb-4">Digital Marketing Services Across India</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              'Mumbai', 'Delhi NCR', 'Bangalore', 'Chennai',
              'Hyderabad', 'Pune', 'Ahmedabad', 'Kolkata',
            ].map((city) => (
              <Link
                key={city}
                href={`/locations/${city.toLowerCase().replace(/\s+/g, '-')}`}
                className="card-minimal p-4 text-center hover:border-primary/30"
              >
                <p className="font-medium text-sm">Digital Marketing in {city}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-wide px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-display-md mb-4">Ready to Accelerate Growth?</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
            Get a free marketing audit and growth strategy session. No commitment required.
          </p>
          <Button size="lg" variant="secondary" onClick={() => openLead('consultation')} className="h-12 px-8">
            Get Free Strategy Session
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>
    </>
  );
}
