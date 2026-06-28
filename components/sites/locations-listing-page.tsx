'use client';

import { MapPin, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useLead } from '@/components/site/lead-context';

type Location = {
  id: string;
  city: string;
  state: string | null;
  country: string;
  country_code: string;
  slug: string;
  population_tier: string;
};

export function LocationsListingPage({ locations }: { locations: Location[] }) {
  const { openLead } = useLead();

  const indiaLocations = locations.filter((l) => l.country_code === 'IN');
  const globalLocations = locations.filter((l) => l.country_code !== 'IN');
  const tier1Cities = indiaLocations.filter((l) => l.population_tier === 'tier-1');
  const tier2Cities = indiaLocations.filter((l) => l.population_tier === 'tier-2');

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-[0.03]" />
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 mb-6">
              <MapPin className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Global Presence</span>
            </div>
            <h1 className="text-display-lg mb-6">
              Technology Services Across India & World
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mb-8">
              From our headquarters in India, we serve enterprises across major metropolitan
              areas globally. Local expertise, global standards, enterprise-grade delivery.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t">
            <div><p className="text-4xl font-bold">{locations.length}+</p><p className="text-sm text-muted-foreground mt-1">Locations</p></div>
            <div><p className="text-4xl font-bold">200+</p><p className="text-sm text-muted-foreground mt-1">Projects Delivered</p></div>
            <div><p className="text-4xl font-bold">9+</p><p className="text-sm text-muted-foreground mt-1">Countries</p></div>
          </div>
        </div>
      </section>

      {/* Tier 1 India Cities */}
      {tier1Cities.length > 0 && (
        <section className="section-padding bg-muted/20">
          <div className="container-wide px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <p className="text-primary font-medium mb-3">India</p>
              <h2 className="text-display-md mb-4">Major Metropolitan Areas</h2>
              <p className="text-muted-foreground">
                Serving clients in India's largest technology and business hubs.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {tier1Cities.map((loc) => (
                <LocationCard key={loc.id} location={loc} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Tier 2 India Cities */}
      {tier2Cities.length > 0 && (
        <section className="section-padding">
          <div className="container-wide px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-display-md mb-4">Emerging Technology Hubs</h2>
              <p className="text-muted-foreground">
                Growing presence across Tier-2 cities with strong technology ecosystems.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {tier2Cities.map((loc) => (
                <LocationCard key={loc.id} location={loc} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Global */}
      {globalLocations.length > 0 && (
        <section className="section-padding bg-muted/20">
          <div className="container-wide px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <p className="text-accent font-medium mb-3">Global</p>
              <h2 className="text-display-md mb-4">International Presence</h2>
              <p className="text-muted-foreground">
                Enterprise clients across North America, Europe, Middle East, and Asia Pacific.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {globalLocations.map((loc) => (
                <LocationCard key={loc.id} location={loc} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-wide px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-display-md mb-4">Find Services Near You</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
            Contact us for enterprise technology services in your location.
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

function LocationCard({ location }: { location: Location }) {
  const locStr = `${location.city}${location.state ? `, ${location.state}` : ''}`;

  return (
    <Link
      href={`/locations/${location.slug}`}
      className="card-interactive p-4 group"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="font-semibold group-hover:text-primary transition-colors">{location.city}</p>
          <p className="text-sm text-muted-foreground">{location.state || location.country}</p>
        </div>
        <MapPin className="h-4 w-4 text-muted-foreground/40 group-hover:text-primary group-hover:scale-110 transition-all duration-200" />
      </div>
    </Link>
  );
}
