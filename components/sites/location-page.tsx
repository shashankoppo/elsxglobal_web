'use client';

import { ArrowRight, MapPin, Code, Globe, Brain, Cloud, Shield, Megaphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLead } from '@/components/site/lead-context';
import Link from 'next/link';

type Location = {
  id: string;
  city: string;
  state: string | null;
  country: string;
  country_code: string;
  slug: string;
  population_tier: string;
};

const services = [
  { icon: Code, title: 'Custom Software Development', slug: 'software' },
  { icon: Globe, title: 'Website Development', slug: 'website-development' },
  { icon: Brain, title: 'AI & Machine Learning', slug: 'ai-solutions' },
  { icon: Cloud, title: 'Cloud Infrastructure', slug: 'cloud' },
  { icon: Shield, title: 'Cybersecurity', slug: 'cybersecurity' },
  { icon: Megaphone, title: 'Digital Marketing', slug: 'digital-marketing' },
];

export function LocationPage({ location }: { location: Location }) {
  const { openLead } = useLead();
  const isIndia = location.country_code === 'IN';
  const locationStr = `${location.city}${location.state ? `, ${location.state}` : ''}, ${location.country}`;

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-[0.03]" />
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 mb-6">
              <MapPin className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">{locationStr}</span>
            </div>
            <h1 className="text-display-lg mb-6">
              Technology Services in {location.city}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mb-8">
              Enterprise software development, website design, AI solutions, and digital
              transformation services in {location.city}. Local expertise, global standards.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={() => openLead('consultation')} className="btn-primary h-12 px-8">
                Get Free Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" asChild className="h-12 px-8">
                <Link href="/services">View All Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services in Location */}
      <section className="section-padding bg-muted/20">
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-primary font-medium mb-3">Services</p>
            <h2 className="text-display-md mb-4">Technology Services in {location.city}</h2>
            <p className="text-muted-foreground">
              Full-stack enterprise technology solutions for businesses in {location.city} and {isIndia ? 'across India' : 'globally'}.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/${s.slug}`}
                className="card-interactive p-6 group"
              >
                <div className="icon-container h-12 w-12 mb-4 group-hover:bg-primary/15 transition-colors">
                  <s.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">{s.title} in {location.city}</h3>
                <span className="inline-flex items-center text-sm font-medium text-primary">
                  Learn more
                  <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="section-padding">
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-primary font-medium mb-3">Why ELSxGlobal {location.city}</p>
              <h2 className="text-display-md mb-6">
                Local Presence, Global Expertise
              </h2>
              <p className="text-muted-foreground mb-6">
                Our {location.city} team combines deep local market knowledge with enterprise-grade
                technology capabilities. We understand the unique challenges of businesses in {location.state || location.country}
                and deliver solutions that drive measurable outcomes.
              </p>
              <div className="space-y-4">
                {[
                  'Dedicated project team with industry expertise',
                  'Agile methodology with regular deliverables',
                  '24/7 support and monitoring options',
                  'Transparent pricing and project tracking',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 mt-0.5">
                      <ArrowRight className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="card-minimal p-6">
                <p className="text-3xl font-bold mb-1">200+</p>
                <p className="text-sm text-muted-foreground">Projects Delivered</p>
              </div>
              <div className="card-minimal p-6">
                <p className="text-3xl font-bold mb-1">99.2%</p>
                <p className="text-sm text-muted-foreground">Success Rate</p>
              </div>
              <div className="card-minimal p-6">
                <p className="text-3xl font-bold mb-1">50+</p>
                <p className="text-sm text-muted-foreground">Team Members</p>
              </div>
              <div className="card-minimal p-6">
                <p className="text-3xl font-bold mb-1">24/7</p>
                <p className="text-sm text-muted-foreground">Support Available</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nearby Locations */}
      {isIndia && (
        <section className="section-padding bg-muted/20">
          <div className="container-wide px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-primary font-medium mb-3">More Locations</p>
              <h2 className="text-display-md">Also Serving</h2>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              {[
                'Mumbai', 'Delhi', 'Bangalore', 'Chennai',
                'Hyderabad', 'Pune', 'Ahmedabad', 'Kolkata',
              ]
                .filter((city) => city.toLowerCase() !== location.city.toLowerCase())
                .slice(0, 6)
                .map((city) => (
                  <Link
                    key={city}
                    href={`/locations/${city.toLowerCase()}`}
                    className="card-minimal px-5 py-3 hover:border-primary/30"
                  >
                    <span className="font-medium text-sm">{city}</span>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-wide px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-display-md mb-4">
            Ready to Transform Your {location.city} Business?
          </h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
            Get a free consultation with our {location.city} team. We'll discuss your
            challenges and provide a clear path forward.
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
