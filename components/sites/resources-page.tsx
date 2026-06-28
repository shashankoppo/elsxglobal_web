'use client';

import { ArrowRight, Download, FileText, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLead } from '@/components/site/lead-context';
import { Badge } from '@/components/ui/badge';

type LeadMagnet = {
  id: string;
  title: string;
  slug: string;
  description: string;
  file_type: string;
  category: string;
  tags: string[];
};

export function ResourcesPage({ leadMagnets }: { leadMagnets: LeadMagnet[] }) {
  const { openLead } = useLead();
  const categories = Array.from(new Set(leadMagnets.map((lm) => lm.category)));

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-[0.03]" />
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 mb-6">
              <Download className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary">Free Resources</span>
            </div>
            <h1 className="text-display-lg mb-6">
              Enterprise Technology Resources
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mb-8">
              Download free templates, checklists, and guides to accelerate your
              technology initiatives. All resources are instantly accessible.
            </p>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-success" />
                <span>No registration required</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-success" />
                <span>Instant download</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-success" />
                <span>Free forever</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="section-padding">
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {leadMagnets.map((lm) => (
              <div key={lm.id} className="card-minimal p-6 hover:border-primary/30">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <Badge variant="outline" className="mb-3">{lm.category}</Badge>
                <h3 className="text-lg font-semibold mb-2">{lm.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{lm.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {lm.tags?.map((tag) => (
                    <span key={tag} className="badge-muted text-xs">{tag}</span>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mb-4">Format: {lm.file_type || 'PDF'}</p>
                <Button
                  onClick={() => openLead('download')}
                  className="btn-primary w-full"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Free
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Download */}
      <section className="section-padding bg-muted/20">
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-display-md mb-4">Why These Resources?</h2>
            <p className="text-muted-foreground">
              Developed from 200+ enterprise implementations. Practical tools that work.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Battle-Tested', desc: 'Used in real enterprise projects' },
              { title: 'Vendor-Neutral', desc: 'No sales pitch, just value' },
              { title: 'Immediately Useful', desc: 'Apply today, see results' },
              { title: 'Expert Curated', desc: 'Created by industry veterans' },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-wide px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-display-md mb-4">Need Implementation Help?</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
            Our team can help you apply these frameworks to your specific context.
          </p>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => openLead('consultation')}
            className="h-12 px-8"
          >
            Schedule Free Consultation
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>
    </>
  );
}
