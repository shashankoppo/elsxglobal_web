import { Metadata } from 'next';
import { createClient } from '@/lib/supabase-server';
import { LocationsListingPage } from '@/components/sites/locations-listing-page';

export const metadata: Metadata = {
  title: 'Our Locations | Software Development Services India & Global | ELSxGlobal',
  description: 'ELSxGlobal provides enterprise technology services across India and globally. Mumbai, Delhi, Bangalore, Chennai, Hyderabad, Pune, Dubai, Singapore, London, and more.',
  keywords: [
    'software development company locations india',
    'IT services mumbai',
    'software company bangalore',
    'web development delhi',
    'technology services hyderabad',
    'digital transformation services india',
  ],
};

export default async function Page() {
  const supabase = createClient();

  const { data: locations } = await supabase
    .from('locations')
    .select('*')
    .eq('is_active', true)
    .order('population_tier')
    .order('city');

  return <LocationsListingPage locations={locations || []} />;
}
