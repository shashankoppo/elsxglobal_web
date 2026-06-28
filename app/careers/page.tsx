import { PageHero } from '@/components/site/page-hero';
import { CTASection } from '@/components/site/cta-section';
import { MapPin, Clock, ArrowUpRight } from 'lucide-react';

const ROLES = [
  {
    title: 'Senior AI Engineer',
    department: 'Engineering',
    location: 'Remote / India',
    type: 'Full-time',
    desc: 'Build AI systems that transform enterprise operations. Strong ML engineering and production deployment experience required.',
  },
  {
    title: 'Cloud Solutions Architect',
    department: 'Infrastructure',
    location: 'Remote / India',
    type: 'Full-time',
    desc: 'Design and deliver scalable cloud architectures for enterprise clients. Deep AWS/Azure/GCP experience required.',
  },
  {
    title: 'ERP Implementation Lead',
    department: 'Delivery',
    location: 'Hybrid / India',
    type: 'Full-time',
    desc: 'Lead ERP transformation programs end-to-end. Experience with major ERP platforms and change management required.',
  },
  {
    title: 'Cybersecurity Consultant',
    department: 'Security',
    location: 'Remote / India',
    type: 'Full-time',
    desc: 'Design zero-trust security architectures and lead security assessments for enterprise clients.',
  },
  {
    title: 'Business Transformation Consultant',
    department: 'Consulting',
    location: 'Remote / Global',
    type: 'Full-time',
    desc: 'Bridge strategy and execution for enterprise transformation programs. Strong business acumen required.',
  },
  {
    title: 'Full-Stack Engineer',
    department: 'Engineering',
    location: 'Remote / India',
    type: 'Full-time',
    desc: 'Build enterprise software that scales. Strong TypeScript, React, and backend experience required.',
  },
];

const VALUES = [
  'Outcomes over outputs',
  'Radical transparency',
  'Partnership mindset',
  'Security first',
  'Systems thinking',
  'Compounding value',
];

export const metadata = {
  title: 'Careers',
  description:
    'Build the future of enterprise transformation. Join ELSxGlobal and help organizations become faster, smarter, safer, and more scalable.',
};

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title={
          <>
            Build the future of
            <br />
            <span className="text-gradient">enterprise transformation.</span>
          </>
        }
        description="We are building a team that understands business, technology, operations, and scale. If you want to do work that matters, we want to talk."
      />

      <section className="relative py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="glass-strong rounded-2xl p-8 mb-12">
            <h2 className="text-2xl font-semibold mb-4">How we work</h2>
            <p className="text-muted-foreground leading-relaxed mb-6 max-w-2xl">
              We are remote-first, outcome-obsessed, and built on the conviction
              that technology should be the engine of growth. We move fast, we
              ship quality, and we measure ourselves by our clients&apos; success.
            </p>
            <div className="flex flex-wrap gap-2">
              {VALUES.map((v) => (
                <span
                  key={v}
                  className="text-sm text-foreground bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-full"
                >
                  {v}
                </span>
              ))}
            </div>
          </div>

          <h2 className="text-2xl font-semibold mb-6">Open positions</h2>
          <div className="space-y-3">
            {ROLES.map((r) => (
              <div
                key={r.title}
                className="group glass rounded-2xl p-6 hover:border-primary/40 transition-all duration-300 cursor-pointer"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{r.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2 max-w-2xl">
                      {r.desc}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                      <span className="font-medium text-primary">
                        {r.department}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {r.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {r.type}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-primary shrink-0">
                    <span className="text-sm font-medium">Apply</span>
                    <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Don't see your role?"
        description="We are always looking for exceptional people. Send us your story and we will find a place for you."
      />
    </>
  );
}
