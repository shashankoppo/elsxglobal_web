'use client';

import { ArrowRight, Globe, ShoppingCart, Zap, Search, Smartphone, Palette, Code, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLead } from '@/components/site/lead-context';
import Link from 'next/link';

const capabilities = [
  { icon: Globe, title: 'Corporate Websites', desc: 'Professional websites that establish authority and generate leads.' },
  { icon: ShoppingCart, title: 'E-commerce Platforms', desc: 'High-converting online stores with seamless checkout experiences.' },
  { icon: Code, title: 'Web Applications', desc: 'Complex interactive web apps with rich functionality.' },
  { icon: Smartphone, title: 'Progressive Web Apps', desc: 'App-like experiences that work offline and install on devices.' },
  { icon: Search, title: 'SEO Optimization', desc: 'Technical SEO built into every site for organic visibility.' },
  { icon: Zap, title: 'Performance', desc: 'Sub-second loads, Core Web Vitals optimized.' },
];

const technologies = ['Next.js', 'React', 'Vue.js', 'Node.js', 'WordPress', 'Shopify', 'WooCommerce', 'Strapi', 'Contentful'];

export function WebsiteDevelopmentPage() {
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
                <Globe className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm font-medium text-primary">Website Development</span>
            </div>
            <h1 className="text-display-lg mb-6">
              Website Development Company in India
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mb-8">
              High-performance websites engineered for conversions, SEO, and exceptional user experience.
              From corporate sites to complex e-commerce platforms—we build digital experiences that deliver results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={() => openLead('consultation')} className="btn-primary h-12 px-8">
                Get Free Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" asChild className="h-12 px-8">
                <Link href="#portfolio">View Portfolio</Link>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-8 mt-16 pt-12 border-t">
            <div><p className="text-4xl font-bold">200+</p><p className="text-sm text-muted-foreground mt-1">Websites Launched</p></div>
            <div><p className="text-4xl font-bold">3x</p><p className="text-sm text-muted-foreground mt-1">Avg. Lead Increase</p></div>
            <div><p className="text-4xl font-bold">99.9%</p><p className="text-sm text-muted-foreground mt-1">Uptime</p></div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section id="portfolio" className="section-padding bg-muted/20">
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-primary font-medium mb-3">Services</p>
            <h2 className="text-display-md mb-4">What We Build</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap) => (
              <div key={cap.title} className="card-interactive p-6 group">
                <div className="icon-container h-12 w-12 mb-4">
                  <cap.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">{cap.title}</h3>
                <p className="text-sm text-muted-foreground">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="section-padding">
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-primary font-medium mb-3">Technology</p>
            <h2 className="text-display-md mb-4">Modern Stack</h2>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {technologies.map((tech) => (
              <div key={tech} className="card-minimal px-5 py-3">
                <p className="font-medium text-sm">{tech}</p>
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
            <h2 className="text-display-md mb-4">Serving Clients Across India</h2>
            <p className="text-muted-foreground">
              Website development services in Mumbai, Delhi, Bangalore, Chennai, Hyderabad, Pune, and across India.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {['Mumbai', 'Delhi NCR', 'Bangalore', 'Chennai', 'Hyderabad', 'Pune', 'Ahmedabad', 'Kolkata'].map((city) => (
              <Link
                key={city}
                href={`/locations/${city.toLowerCase().replace(/\s+/g, '-')}`}
                className="card-minimal p-4 text-center hover:border-primary/30"
              >
                <p className="font-medium text-sm">{city}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-wide px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-display-md mb-4">Ready to Launch Your Website?</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
            Get a free website audit and consultation. We'll analyze your needs and provide a detailed proposal.
          </p>
          <Button size="lg" variant="secondary" onClick={() => openLead('consultation')} className="h-12 px-8">
            Schedule Free Consultation
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>
    </>
  );
}
