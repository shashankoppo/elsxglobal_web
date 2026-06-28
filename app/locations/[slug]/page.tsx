import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase-server';
import { LocationPage } from '@/components/sites/location-page';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const supabase = createClient();
  const { data: locations } = await supabase
    .from('locations')
    .select('slug')
    .eq('is_active', true);

  return locations?.map((loc) => ({ slug: loc.slug })) ?? [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = createClient();

  const { data: location } = await supabase
    .from('locations')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!location) {
    return { title: 'Location Not Found' };
  }

  const cityName = location.city;
  const isIndia = location.country_code === 'IN';

  return {
    title: `${cityName} | Software Development & Technology Services | ELSxGlobal`,
    description: `Enterprise software development, website design, AI solutions, and digital transformation services in ${cityName}${isIndia ? `, ${location.state}` : ''}, ${location.country}. Get free consultation.`,
    keywords: [
      `software development company ${cityName}`,
      `website development ${cityName}`,
      `IT services ${cityName}`,
      `digital marketing agency ${cityName}`,
      `custom software ${cityName}`,
      `web design ${cityName}`,
    ],
    openGraph: {
      title: `${cityName} Technology Services | ELSxGlobal`,
      description: `Enterprise software and digital transformation services in ${cityName}.`,
      type: 'website',
    },
    alternates: {
      canonical: `/locations/${slug}`,
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const supabase = createClient();

  const { data: location } = await supabase
    .from('locations')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  if (!location) {
    notFound();
  }

  const locationSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `ELSxGlobal ${location.city}`,
    description: `Enterprise technology services in ${location.city}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: location.city,
      addressRegion: location.state,
      addressCountry: location.country,
    },
    areaServed: {
      '@type': location.country_code === 'IN' ? 'State' : 'Country',
      name: location.state || location.country,
    },
    parentOrganization: {
      '@type': 'Organization',
      name: 'ELSxGlobal',
      url: 'https://elsxglobal.com',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(locationSchema) }}
      />
      <LocationPage location={location} />
    </>
  );
}
