import { Metadata } from 'next';
import { createClient } from '@/lib/supabase-server';
import { ResourcesPage } from '@/components/sites/resources-page';

export const metadata: Metadata = {
  title: 'Free Enterprise Technology Resources | ELSxGlobal',
  description: 'Download free templates, checklists, and guides for AI implementation, ERP selection, cloud migration, and digital transformation.',
  keywords: [
    'free enterprise templates',
    'AI readiness checklist',
    'ERP vendor comparison template',
    'cloud migration workbook',
    'digital transformation guides',
  ],
};

export default async function Page() {
  const supabase = createClient();

  const { data: leadMagnets } = await supabase
    .from('lead_magnets')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  return <ResourcesPage leadMagnets={leadMagnets || []} />;
}
