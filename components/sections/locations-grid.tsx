'use client';

import { MapPin, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

const INDIAN_CITIES = [
  { name: 'Mumbai', state: 'Maharashtra', slug: 'mumbai' },
  { name: 'Delhi', state: 'Delhi', slug: 'delhi' },
  { name: 'Bangalore', state: 'Karnataka', slug: 'bangalore' },
  { name: 'Chennai', state: 'Tamil Nadu', slug: 'chennai' },
  { name: 'Hyderabad', state: 'Telangana', slug: 'hyderabad' },
  { name: 'Pune', state: 'Maharashtra', slug: 'pune' },
];

const GLOBAL_CITIES = [
  { name: 'Dubai', country: 'UAE', slug: 'dubai' },
  { name: 'Singapore', country: 'Singapore', slug: 'singapore' },
  { name: 'London', country: 'UK', slug: 'london' },
  { name: 'New York', country: 'USA', slug: 'new-york' },
  { name: 'Sydney', country: 'Australia', slug: 'sydney' },
  { name: 'Toronto', country: 'Canada', slug: 'toronto' },
];

export function LocationsGrid() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-primary/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-accent/3 to-transparent rounded-full blur-3xl" />
      <div className="container-wide px-4 sm:px-6 lg:px-8 relative">
        <ScrollReveal className="max-w-2xl mb-12">
          <p className="text-primary font-medium mb-3">Global Presence</p>
          <h2 className="text-display-md mb-4">
            Serving Clients Across India & World
          </h2>
          <p className="text-muted-foreground">
            From our headquarters in India, we serve enterprises across major metropolitan
            areas globally. Local expertise, global standards.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {/* India */}
          <ScrollReveal animation="slide-left" delay={100}>
            <div className="liquid-glass-panel p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">India</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {INDIAN_CITIES.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/locations/${city.slug}`}
                    className="liquid-glass-card p-3 flex items-center justify-between group"
                  >
                    <div>
                      <p className="font-medium text-sm group-hover:text-primary transition-colors">{city.name}</p>
                      <p className="text-xs text-muted-foreground">{city.state}</p>
                    </div>
                    <MapPin className="h-4 w-4 text-muted-foreground/30 group-hover:text-primary group-hover:scale-110 transition-all duration-200" />
                  </Link>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Global */}
          <ScrollReveal animation="slide-right" delay={200}>
            <div className="liquid-glass-panel p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15">
                  <MapPin className="h-5 w-5 text-accent" />
                </div>
                <h3 className="font-semibold text-lg">Global</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {GLOBAL_CITIES.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/locations/${city.slug}`}
                    className="liquid-glass-card p-3 flex items-center justify-between group"
                  >
                    <div>
                      <p className="font-medium text-sm group-hover:text-accent transition-colors">{city.name}</p>
                      <p className="text-xs text-muted-foreground">{city.country}</p>
                    </div>
                    <MapPin className="h-4 w-4 text-muted-foreground/30 group-hover:text-accent group-hover:scale-110 transition-all duration-200" />
                  </Link>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={400} className="text-center mt-10">
          <Link
            href="/locations"
            className="inline-flex items-center gap-2 liquid-glass-button px-5 py-2.5 text-sm"
          >
            View all locations
            <ArrowRight className="h-4 w-4" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
