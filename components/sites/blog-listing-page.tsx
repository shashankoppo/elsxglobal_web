'use client';

import { ArrowRight, Clock, User, Tag, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLead } from '@/components/site/lead-context';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  tags: string[];
  author_name: string;
  read_time: number;
  published_at: string;
  is_featured: boolean;
};

export function BlogListingPage({
  articles,
  featuredArticles,
}: {
  articles: Article[];
  featuredArticles: Article[];
}) {
  const { openLead } = useLead();

  const categories = Array.from(new Set(articles.map((a) => a.category)));

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-[0.03]" />
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="text-sm font-medium text-muted-foreground">Enterprise Technology Insights</span>
            </div>
            <h1 className="text-display-lg mb-6">
              Technology Blog
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mb-8">
              Expert insights on custom software development, AI implementation, cloud infrastructure,
              and digital transformation. Practical knowledge that drives business outcomes.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <section className="section-padding bg-muted/20">
          <div className="container-wide px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-semibold mb-6">Featured Articles</h2>
            <div className="grid lg:grid-cols-3 gap-6">
              {featuredArticles.map((article) => (
                <ArticleCard key={article.id} article={article} featured />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Articles */}
      <section className="section-padding">
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div>
                  <h3 className="text-sm font-semibold mb-3">Categories</h3>
                  <div className="space-y-2">
                    <Link
                      href="/blog"
                      className="block text-sm text-primary font-medium"
                    >
                      All Articles
                    </Link>
                    {categories.map((cat) => (
                      <Link
                        key={cat}
                        href={`/blog?category=${encodeURIComponent(cat)}`}
                        className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {cat}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="card-minimal p-4 bg-primary/5 border-primary/20">
                  <h3 className="text-sm font-semibold mb-2">Free Resources</h3>
                  <p className="text-xs text-muted-foreground mb-3">
                    Get templates, checklists, and guides for your technology projects.
                  </p>
                  <Button
                    size="sm"
                    onClick={() => openLead('resources')}
                    className="btn-primary w-full"
                  >
                    Download Free
                  </Button>
                </div>
              </div>
            </div>

            {/* Articles Grid */}
            <div className="lg:col-span-3">
              <div className="grid md:grid-cols-2 gap-6">
                {articles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-wide px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-display-md mb-4">Stay Ahead of Technology Trends</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
            Get weekly insights on enterprise technology, AI, and digital transformation.
          </p>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => openLead('newsletter')}
            className="h-12 px-8"
          >
            Subscribe Free
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>
    </>
  );
}

function ArticleCard({ article, featured = false }: { article: Article; featured?: boolean }) {
  return (
    <Link
      href={`/blog/${article.slug}`}
      className={`card-minimal p-6 hover:border-primary/30 group ${featured ? '' : ''}`}
    >
      <div className="flex items-center gap-2 mb-3">
        <Badge variant="outline" className="text-xs">
          {article.category}
        </Badge>
        {article.is_featured && (
          <Badge className="text-xs bg-primary/10 text-primary border-0">Featured</Badge>
        )}
      </div>
      <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors leading-tight">
        {article.title}
      </h3>
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {article.excerpt}
      </p>
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" />
          {article.read_time} min read
        </span>
        <span>{new Date(article.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
      </div>
    </Link>
  );
}
