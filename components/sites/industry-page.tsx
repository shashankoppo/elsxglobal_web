'use client';

import { ArrowRight, Factory, HeartPulse, Banknote, ShoppingBag, GraduationCap, Landmark, Building2, Rocket, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLead } from '@/components/site/lead-context';
import Link from 'next/link';

const industriesInfo: Record<string, {
  icon: typeof Factory;
  title: string;
  description: string;
  challenges: string[];
  solutions: { title: string; desc: string }[];
  results: { metric: string; label: string }[];
  caseStudyTitle: string;
}> = {
  manufacturing: {
    icon: Factory,
    title: 'Technology Solutions for Manufacturing',
    description: 'Transform manufacturing operations with IoT-enabled production, predictive maintenance, and intelligent ERP systems.',
    challenges: [
      'Disconnected production systems and data silos',
      'Unplanned downtime reducing productivity',
      'Manual quality control processes',
      'Supply chain visibility gaps',
    ],
    solutions: [
      { title: 'AI-Driven Predictive Maintenance', desc: 'Reduce unplanned downtime by 40% with ML-powered failure prediction' },
      { title: 'Unified ERP Systems', desc: 'Single system for production, inventory, and supply chain' },
      { title: 'IoT-Enabled Production', desc: 'Real-time monitoring and automation across all lines' },
      { title: 'Quality Intelligence', desc: 'Automated defect detection and root cause analysis' },
    ],
    results: [
      { metric: '43%', label: 'Downtime Reduction' },
      { metric: '2.7x', label: 'Production Efficiency' },
      { metric: '₹2.1Cr', label: 'Annual Savings' },
      { metric: '99.2%', label: 'OEE Improvement' },
    ],
    caseStudyTitle: 'Manufacturing ERP Transformation',
  },
  healthcare: {
    icon: HeartPulse,
    title: 'Technology Solutions for Healthcare',
    description: 'HIPAA-compliant EMR systems, patient portals, and AI diagnostics that improve patient outcomes.',
    challenges: [
      'Fragmented patient records across systems',
      'Slow diagnostic processes',
      'Compliance and regulatory risks',
      'Patient engagement gaps',
    ],
    solutions: [
      { title: 'Unified EMR Platform', desc: 'Complete patient records with HL7/FHIR integration' },
      { title: 'AI Diagnostics', desc: 'Image analysis and clinical decision support' },
      { title: 'Patient Portal', desc: 'Self-service scheduling, results, and communication' },
      { title: 'Telemedicine Platform', desc: 'HIPAA-compliant video consultations' },
    ],
    results: [
      { metric: '2.1x', label: 'Faster Diagnostics' },
      { metric: '34%', label: 'Patient Satisfaction' },
      { metric: '50K+', label: 'Patients Served' },
      { metric: 'HIPAA', label: 'Compliant' },
    ],
    caseStudyTitle: 'Healthcare Records Platform',
  },
  'financial-services': {
    icon: Banknote,
    title: 'Technology Solutions for Financial Services',
    description: 'Secure, compliant platforms for banking, fintech, and financial institutions with AI fraud detection.',
    challenges: [
      'Fraud and security threats',
      'Regulatory compliance burden',
      'Legacy system limitations',
      'Customer experience gaps',
    ],
    solutions: [
      { title: 'AI Fraud Detection', desc: 'Real-time transaction scoring with ML' },
      { title: 'Core Banking Platform', desc: 'Modern,API-first banking infrastructure' },
      { title: 'Compliance Automation', desc: 'Regulatory reporting and audit trails' },
      { title: 'Digital Banking', desc: 'Mobile-first customer experiences' },
    ],
    results: [
      { metric: '₹12M', label: 'Fraud Prevented' },
      { metric: '94%', label: 'Detection Accuracy' },
      { metric: '62%', label: 'False Positive Reduction' },
      { metric: 'Real-time', label: 'Detection Speed' },
    ],
    caseStudyTitle: 'AI Fraud Detection Platform',
  },
  retail: {
    icon: ShoppingBag,
    title: 'Technology Solutions for Retail & E-commerce',
    description: 'Omnichannel commerce platforms, inventory optimization, and customer analytics that drive growth.',
    challenges: [
      'Channel disconnection',
      'Inventory visibility gaps',
      'Cart abandonment',
      'Customer retention',
    ],
    solutions: [
      { title: 'Headless Commerce', desc: 'Omnichannel experiences from one platform' },
      { title: 'Inventory Intelligence', desc: 'AI-powered demand forecasting' },
      { title: 'Customer Analytics', desc: '360° customer understanding and personalization' },
      { title: 'Conversion Optimization', desc: 'A/B testing and experience optimization' },
    ],
    results: [
      { metric: '34%', label: 'Conversion Lift' },
      { metric: '10x', label: 'Traffic Capacity' },
      { metric: '58%', label: 'Fewer Stockouts' },
      { metric: '8%', label: 'Cart Abandonment' },
    ],
    caseStudyTitle: 'E-commerce Platform Scaling',
  },
  education: {
    icon: GraduationCap,
    title: 'Technology Solutions for Education',
    description: 'Learning management systems, campus platforms, and student analytics for modern institutions.',
    challenges: [
      'Fragmented learning systems',
      'Administrative overhead',
      'Student engagement',
      'Outcome tracking',
    ],
    solutions: [
      { title: 'Learning Management System', desc: 'Modern LMS with personalization' },
      { title: 'Campus Management', desc: 'All operations in one platform' },
      { title: 'Student Analytics', desc: 'Early intervention and retention prediction' },
      { title: 'Virtual Classrooms', desc: 'Interactive online learning' },
    ],
    results: [
      { metric: '52%', label: 'Completion Rate' },
      { metric: '67%', label: 'Engagement Boost' },
      { metric: '38%', label: 'Admin Reduction' },
      { metric: '2M+', label: 'Students Served' },
    ],
    caseStudyTitle: 'Education Platform Transformation',
  },
  government: {
    icon: Landmark,
    title: 'Technology Solutions for Government',
    description: 'E-governance platforms, citizen services portals, and secure systems for public sector.',
    challenges: [
      'Citizen service gaps',
      'Data security requirements',
      'Transparency mandates',
      'Legacy modernization',
    ],
    solutions: [
      { title: 'E-Governance Platform', desc: 'Digital citizen services and workflow automation' },
      { title: 'Citizen Portal', desc: 'Self-service access to government services' },
      { title: 'Data Security', desc: 'Government-grade security and compliance' },
      { title: 'Analytics Dashboard', desc: 'Transparency and outcome tracking' },
    ],
    results: [
      { metric: '80%', label: 'Digital Adoption' },
      { metric: '60%', label: 'Processing Time Reduction' },
      { metric: '99.9%', label: 'System Uptime' },
      { metric: 'ISO27001', label: 'Certified' },
    ],
    caseStudyTitle: 'E-Governance Transformation',
  },
};

export function IndustryPage({ slug }: { slug: string }) {
  const { openLead } = useLead();
  const industry = industriesInfo[slug] || industriesInfo.manufacturing;
  const Icon = industry.icon;

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-[0.03]" />
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">Industry Solutions</span>
            </div>
            <h1 className="text-display-lg mb-6">{industry.title}</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mb-8">{industry.description}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={() => openLead('consultation')} className="btn-primary h-12 px-8">
                Get Free Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" asChild className="h-12 px-8">
                <Link href="/case-studies">View Case Studies</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="border-y border-border bg-muted/20 py-8">
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {industry.results.map((r) => (
              <div key={r.label} className="text-center">
                <p className="text-3xl font-bold text-primary">{r.metric}</p>
                <p className="text-sm text-muted-foreground mt-1">{r.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenges & Solutions */}
      <section className="section-padding">
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Challenges */}
            <div>
              <h2 className="text-display-md mb-6">Common Challenges</h2>
              <div className="space-y-4">
                {industry.challenges.map((challenge) => (
                  <div key={challenge} className="flex items-start gap-3 card-minimal p-4">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-destructive/10 mt-0.5">
                      <span className="h-2 w-2 rounded-full bg-destructive" />
                    </div>
                    <p className="text-sm">{challenge}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Solutions */}
            <div>
              <h2 className="text-display-md mb-6">Our Solutions</h2>
              <div className="space-y-4">
                {industry.solutions.map((solution) => (
                  <div key={solution.title} className="card-minimal p-4 hover:border-primary/30">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                        <CheckCircle className="h-3.5 w-3.5 text-primary" />
                      </div>
                      <h3 className="font-semibold">{solution.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground ml-9">{solution.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Teaser */}
      <section className="section-padding bg-muted/20">
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="outline" className="mb-4">Featured Case Study</Badge>
            <h2 className="text-display-md mb-4">{industry.caseStudyTitle}</h2>
            <p className="text-muted-foreground mb-8">
              See how we helped a leading organization in this industry achieve measurable outcomes.
            </p>
            <Button onClick={() => openLead('consultation')} className="btn-primary">
              Request Case Study Details
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Other Industries */}
      <section className="section-padding">
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-display-md mb-4">More Industries</h2>
            <p className="text-muted-foreground">Explore our solutions across other sectors.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Object.entries(industriesInfo)
              .filter(([key]) => key !== slug)
              .slice(0, 5)
              .map(([key, info]) => (
                <Link
                  key={key}
                  href={`/industries/${key}`}
                  className="card-minimal p-4 text-center hover:border-primary/30"
                >
                  <info.icon className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-medium">{info.title.replace('Technology Solutions for ', '')}</p>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-wide px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-display-md mb-4">Ready to Transform Your {industry.title.replace('Technology Solutions for ', '')}?</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
            Schedule a free consultation to discuss your specific challenges.
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
