import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase-server';
import { BlogArticlePage } from '@/components/sites/blog-article-page';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const supabase = createClient();
  const { data: articles } = await supabase
    .from('articles')
    .select('slug')
    .eq('is_published', true);

  return articles?.map((article) => ({ slug: article.slug })) ?? [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = createClient();

  const { data: article } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!article) {
    return { title: 'Article Not Found' };
  }

  return {
    title: article.meta_title || `${article.title} | ELSxGlobal Blog`,
    description: article.meta_description || article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.published_at,
      authors: [article.author_name],
    },
    authors: [{ name: article.author_name }],
    alternates: {
      canonical: `/blog/${slug}`,
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const supabase = createClient();

  const { data: article } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single();

  if (!article) {
    notFound();
  }

  const { data: relatedArticles } = await supabase
    .from('articles')
    .select('*')
    .eq('is_published', true)
    .eq('category', article.category)
    .neq('id', article.id)
    .order('published_at', { ascending: false })
    .limit(3);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    datePublished: article.published_at,
    author: {
      '@type': 'Organization',
      name: 'ELSxGlobal',
    },
    publisher: {
      '@type': 'Organization',
      name: 'ELSxGlobal',
      url: 'https://elsxglobal.com',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <BlogArticlePage article={article} relatedArticles={relatedArticles || []} />
    </>
  );
}
