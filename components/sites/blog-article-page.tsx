'use client';

import { ArrowRight, Clock, User, Calendar, ArrowLeft, Share2, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLead } from '@/components/site/lead-context';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  author_name: string;
  author_title: string;
  read_time: number;
  published_at: string;
  lead_magnet_url: string;
  lead_magnet_title: string;
};

export function BlogArticlePage({
  article,
  relatedArticles,
}: {
  article: Article;
  relatedArticles: Article[];
}) {
  const { openLead } = useLead();

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-8 overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-[0.03]" />
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <Link href="/blog" className="hover:text-foreground flex items-center gap-1">
                <ArrowLeft className="h-4 w-4" />
                Blog
              </Link>
            </div>

            <Badge variant="outline" className="mb-4">
              {article.category}
            </Badge>

            <h1 className="text-display-md mb-6">{article.title}</h1>
            <p className="text-xl text-muted-foreground mb-6">{article.excerpt}</p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8">
              <span className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {article.author_name}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {article.read_time} min read
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(article.published_at).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {article.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-16">
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <article className="max-w-3xl mx-auto prose prose-neutral prose-lg">
                {article.content ? (
                  <div dangerouslySetInnerHTML={{ __html: article.content }} />
                ) : (
                  <div className="space-y-6">
                    <p>
                      In today's rapidly evolving technology landscape, businesses face unprecedented
                      challenges in staying competitive. The difference between organizations that
                      thrive and those that struggle often comes down to how effectively they leverage
                      technology to solve real business problems.
                    </p>
                    <h2>The Challenge</h2>
                    <p>
                      Most technology initiatives fail not because of technical limitations, but because
                      of misalignment between technology choices and business objectives. Organizations
                      invest in solutions that look impressive on paper but fail to deliver measurable
                      outcomes.
                    </p>
                    <p>
                      This is where a strategic approach to technology transformation becomes essential.
                      It's not about adopting the latest trends—it's about understanding your unique
                      business context and building solutions that address specific challenges.
                    </p>
                    <h2>Our Approach</h2>
                    <p>
                      At ELSxGlobal, we've developed a framework that bridges the gap between technology
                      potential and business results. Every engagement starts with understanding your
                      goals, constraints, and success metrics.
                    </p>
                    <ul>
                      <li>Discovery: Deep dive into your business requirements and current systems</li>
                      <li>Architecture: Design solutions that scale and adapt to future needs</li>
                      <li>Development: Iterative delivery with continuous feedback</li>
                      <li>Deployment: Zero-downtime launch with comprehensive testing</li>
                      <li>Support: Ongoing optimization and maintenance</li>
                    </ul>
                    <h2>Key Takeaways</h2>
                    <p>
                      Success in technology transformation requires:
                    </p>
                    <ol>
                      <li>Clear alignment between business goals and technology choices</li>
                      <li>Stakeholder buy-in at every level of the organization</li>
                      <li>Agile methodology that allows for course correction</li>
                      <li>Measurement framework tied to business outcomes</li>
                    </ol>
                    <p>
                      Ready to discuss your technology transformation? Schedule a free consultation
                      with our team to explore how we can help you achieve your objectives.
                    </p>
                  </div>
                )}
              </article>

              {/* Lead Magnet */}
              {article.lead_magnet_title && (
                <div className="max-w-3xl mx-auto mt-12 card-minimal p-6 bg-primary/5 border-primary/20">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Download className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{article.lead_magnet_title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Get this free resource and start applying these insights today.
                      </p>
                      <Button onClick={() => openLead('lead-magnet')} className="btn-primary">
                        Download Free
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="max-w-3xl mx-auto mt-12 text-center">
                <h3 className="text-lg font-semibold mb-3">Ready to Transform Your Business?</h3>
                <p className="text-muted-foreground mb-4">
                  Schedule a free consultation to discuss your requirements.
                </p>
                <Button onClick={() => openLead('consultation')} className="btn-primary">
                  Get Free Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="card-minimal p-4">
                  <h3 className="text-sm font-semibold mb-3">Share This Article</h3>
                  <Button variant="outline" size="sm" className="w-full">
                    <Share2 className="h-4 w-4 mr-2" />
                    Copy Link
                  </Button>
                </div>

                <div className="card-minimal p-4 bg-primary/5 border-primary/20">
                  <h3 className="text-sm font-semibold mb-2">Free Resources</h3>
                  <p className="text-xs text-muted-foreground mb-3">
                    Download templates, checklists, and guides.
                  </p>
                  <Button
                    size="sm"
                    onClick={() => openLead('resources')}
                    className="btn-primary w-full"
                  >
                    Download Free
                  </Button>
                </div>

                {relatedArticles.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold mb-3">Related Articles</h3>
                    <div className="space-y-3">
                      {relatedArticles.map((related) => (
                        <Link
                          key={related.id}
                          href={`/blog/${related.slug}`}
                          className="block text-sm text-muted-foreground hover:text-foreground"
                        >
                          {related.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
