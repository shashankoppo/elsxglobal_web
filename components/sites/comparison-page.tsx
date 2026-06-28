'use client';

import { ArrowRight, Check, X, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLead } from '@/components/site/lead-context';
import Link from 'next/link';

const comparisonCriteria = [
  { category: 'Company', items: ['Founded', 'Team Size', 'Projects Delivered', 'Success Rate'] },
  { category: 'Services', items: ['Custom Software', 'AI/ML', 'ERP Implementation', 'Cloud Architecture'] },
  { category: 'Approach', items: ['Strategy-First', 'Agile Delivery', 'Dedicated Team', 'Post-Launch Support'] },
  { category: 'Industries', items: ['Manufacturing', 'Healthcare', 'Financial Services', 'E-commerce'] },
];

const ourData: Record<string, string | boolean> = {
  'Founded': '2018',
  'Team Size': '200+',
  'Projects Delivered': '200+',
  'Success Rate': '99.2%',
  'Custom Software': true,
  'AI/ML': true,
  'ERP Implementation': true,
  'Cloud Architecture': true,
  'Strategy-First': true,
  'Agile Delivery': true,
  'Dedicated Team': true,
  'Post-Launch Support': true,
  'Manufacturing': true,
  'Healthcare': true,
  'Financial Services': true,
  'E-commerce': true,
};

const competitors: Array<{
  name: string;
  items: Record<string, string | boolean>;
}> = [
  {
    name: 'Typical IT Agency',
    items: {
      'Founded': 'Various',
      'Team Size': '5-50',
      'Projects Delivered': '10-50',
      'Success Rate': '70-80%',
      'Custom Software': true,
      'AI/ML': false,
      'ERP Implementation': false,
      'Cloud Architecture': true,
      'Strategy-First': false,
      'Agile Delivery': '-',
      'Dedicated Team': false,
      'Post-Launch Support': 'Limited',
      'Manufacturing': '-',
      'Healthcare': '-',
      'Financial Services': '-',
      'E-commerce': true,
    },
  },
  {
    name: 'Large Consultancy',
    items: {
      'Founded': 'Various',
      'Team Size': '1000+',
      'Projects Delivered': '500+',
      'Success Rate': '85%+',
      'Custom Software': true,
      'AI/ML': true,
      'ERP Implementation': true,
      'Cloud Architecture': true,
      'Strategy-First': true,
      'Agile Delivery': '-',
      'Dedicated Team': '-',
      'Post-Launch Support': 'Extra Cost',
      'Manufacturing': true,
      'Healthcare': true,
      'Financial Services': true,
      'E-commerce': true,
    },
  },
];

export function ComparisonPage() {
  const { openLead } = useLead();

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="text-sm font-medium text-primary">Why ELSxGlobal</span>
            </div>
            <h1 className="text-display-lg mb-6">
              Why Leading Companies Choose ELSxGlobal
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mb-8">
              See how we compare to typical software development agencies and large consulting firms.
              Enterprise-grade delivery without enterprise-grade overhead.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="section-padding bg-muted/20">
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-3 text-sm font-medium text-muted-foreground">
                    Criteria
                  </th>
                  <th className="text-center py-4 px-3">
                    <div className="inline-flex flex-col items-center">
                      <span className="text-lg font-bold text-primary">ELSxGlobal</span>
                      <span className="text-xs text-muted-foreground">Your Partner</span>
                    </div>
                  </th>
                  {competitors.map((c) => (
                    <th key={c.name} className="text-center py-4 px-3">
                      <span className="text-base font-semibold text-muted-foreground">{c.name}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonCriteria.map((group) => (
                  <>
                    <tr key={group.category} className="border-b border-border/50">
                      <td
                        colSpan={competitors.length + 2}
                        className="py-2 px-3 bg-muted/30"
                      >
                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          {group.category}
                        </span>
                      </td>
                    </tr>
                    {group.items.map((item) => (
                      <tr key={item} className="border-b border-border/30">
                        <td className="py-3 px-3 text-sm font-medium">{item}</td>
                        <td className="py-3 px-3 text-center">
                          <ComparisonValue value={ourData[item]} isUs />
                        </td>
                        {competitors.map((c) => (
                          <td key={c.name} className="py-3 px-3 text-center">
                            <ComparisonValue value={c.items[item]} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Key Differentiators */}
      <section className="section-padding">
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-display-md mb-4">What Sets Us Apart</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Strategy-First Approach', desc: 'We start with business outcomes, not technology choices' },
              { title: 'Dedicated Team Model', desc: 'Your project gets a focused team, not shared resources' },
              { title: 'Proven Methodology', desc: '99.2% success rate across 200+ enterprise projects' },
              { title: 'Full-Stack Capabilities', desc: 'AI, ERP, Cloud, Security—all under one roof' },
              { title: 'Industry Expertise', desc: 'Deep experience across 9+ industry verticals' },
              { title: 'Transparent Pricing', desc: 'Fixed-price or T&M with clear scope and timelines' },
            ].map((item) => (
              <div key={item.title} className="card-minimal p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 mb-4">
                  <Check className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-wide px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-display-md mb-4">Experience the Difference</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
            See why 200+ organizations chose ELSxGlobal.
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

function ComparisonValue({ value, isUs = false }: { value: string | boolean | undefined; isUs?: boolean }) {
  if (typeof value === 'boolean') {
    return value ? (
      <Check className={`h-5 w-5 mx-auto ${isUs ? 'text-primary' : 'text-success'}`} />
    ) : (
      <X className="h-5 w-5 mx-auto text-muted-foreground/40" />
    );
  }
  if (value === '-' || !value) {
    return <Minus className="h-5 w-5 mx-auto text-muted-foreground/40" />;
  }
  return (
    <span className={`text-sm font-medium ${isUs ? 'text-primary font-semibold' : 'text-muted-foreground'}`}>
      {value}
    </span>
  );
}
