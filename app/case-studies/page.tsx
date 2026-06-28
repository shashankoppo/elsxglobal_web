import { Metadata } from 'next';
import { createClient } from '@/lib/supabase-server';
import { CaseStudiesListingPage } from '@/components/sites/case-studies-listing-page';

export const metadata: Metadata = {
  title: 'Client Success Stories | Case Studies | ELSxGlobal',
  description: 'Real results from our enterprise technology implementations. See how we helped businesses save costs, improve efficiency, and scale operations.',
  keywords: [
    'software development case studies',
    'ERP implementation success stories',
    'AI implementation results',
    'digital transformation case studies',
    'enterprise technology ROI',
  ],
};

export default async function Page() {
  const supabase = createClient();

  const { data: caseStudies } = await supabase
    .from('case_studies')
    .select('*')
    .eq('is_published', true)
    .order('is_featured', { ascending: false })
    .order('published_at', { ascending: false });

  const industries = caseStudies
    ? Array.from(new Set(caseStudies.map((cs) => cs.client_industry)))
    : [];

  return (
    <CaseStudiesListingPage
      caseStudies={caseStudies || []}
      industries={industries}
    />
  );
}
