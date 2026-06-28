'use client';

import { ArrowRight, Building2, TrendingUp, DollarSign, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLead } from '@/components/site/lead-context';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

type CaseStudy = {
  id: string;
  title: string;
  slug: string;
  client_name: string;
  client_industry: string;
  challenge: string;
  solution: string;
  results: Record<string, string>;
  technologies: string[];
  is_featured: boolean;
};

export function CaseStudiesListingPage({
  caseStudies,
  industries,
}: {
  caseStudies: CaseStudy[];
  industries: string[];
}) {
  const { openLead } = useLead();

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-[0.03]" />
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span className="text-sm font-medium text-muted-foreground">Client Success Stories</span>
            </div>
            <h1 className="text-display-lg mb-6">
              Case Studies
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mb-8">
              Real results from our enterprise technology implementations. See how we've helped
              organizations across industries achieve measurable outcomes.
            </p>
            <div className="grid grid-cols-4 gap-6">
              <div className="text-center">
                <p className="text-3xl font-bold">₹50Cr+</p>
                <p className="text-sm text-muted-foreground">Client Savings</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold">200+</p>
                <p className="text-sm text-muted-foreground">Projects</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold">99.2%</p>
                <p className="text-sm text-muted-foreground">Success Rate</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold">9+</p>
                <p className="text-sm text-muted-foreground">Industries</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter by Industry */}
      <section className="border-y border-border bg-muted/20 py-4">
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 overflow-x-auto">
            <span className="text-sm font-medium shrink-0">Filter by:</span>
            <Link
              href="/case-studies"
              className="text-sm text-primary font-medium shrink-0"
            >
              All Industries
            </Link>
            {industries.map((industry) => (
              <Link
                key={industry}
                href={`/case-studies?industry=${encodeURIComponent(industry)}`}
                className="text-sm text-muted-foreground hover:text-foreground shrink-0"
              >
                {industry}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="section-padding">
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            {caseStudies.map((cs) => (
              <div key={cs.id} className="card-minimal p-6 hover:border-primary/30">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="outline">{cs.client_industry}</Badge>
                  {cs.is_featured && (
                    <Badge className="bg-accent/10 text-accent border-0 text-xs">
                      Featured
                    </Badge>
                  )}
                </div>

                <h3 className="text-lg font-semibold mb-2">{cs.title}</h3>

                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                  <Building2 className="h-3.5 w-3.5" />
                  {cs.client_name}
                </div>

                <p className="text-sm text-muted-foreground mb-4">{cs.challenge}</p>

                {/* Results */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {Object.entries(cs.results || {})
                    .slice(0, 4)
                    .map(([key, value]) => (
                      <div key={key} className="bg-muted/50 rounded-lg p-2">
                        <p className="text-lg font-semibold text-primary">{value}</p>
                        <p className="text-xs text-muted-foreground capitalize">
                          {key.replace(/_/g, ' ')}
                        </p>
                      </div>
                    ))}
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {cs.technologies?.slice(0, 4).map((tech) => (
                    <span key={tech} className="badge-muted text-xs">
                      {tech}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/case-studies/${cs.slug}`}
                  className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                >
                  Read Full Case Study
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-wide px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-display-md mb-4">Ready to Be Our Next Success Story?</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
            Join 200+ organizations that transformed their operations with ELSxGlobal.
          </p>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => openLead('consultation')}
            className="h-12 px-8"
          >
            Get Free Consultation
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>
    </>
  );
}
