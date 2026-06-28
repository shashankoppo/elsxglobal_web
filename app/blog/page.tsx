import { Metadata } from 'next';
import { createClient } from '@/lib/supabase-server';
import { BlogListingPage } from '@/components/sites/blog-listing-page';

export const metadata: Metadata = {
  title: 'Enterprise Technology Blog | Software, AI, Cloud Insights | ELSxGlobal',
  description: 'Expert insights on custom software development, AI implementation, cloud infrastructure, ERP systems, and digital transformation. Stay ahead with our technology blog.',
  keywords: [
    'enterprise technology blog',
    'software development insights',
    'AI implementation guide',
    'cloud migration tips',
    'ERP best practices',
    'digital transformation articles',
  ],
};

export default async function Page() {
  const supabase = createClient();

  const { data: articles } = await supabase
    .from('articles')
    .select('*')
    .eq('is_published', true)
    .order('is_featured', { ascending: false })
    .order('published_at', { ascending: false });

  const { data: featuredArticles } = await supabase
    .from('articles')
    .select('*')
    .eq('is_published', true)
    .eq('is_featured', true)
    .order('published_at', { ascending: false })
    .limit(3);

  return (
    <BlogListingPage
      articles={articles || []}
      featuredArticles={featuredArticles || []}
    />
  );
}
