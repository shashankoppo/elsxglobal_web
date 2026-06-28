import { Metadata } from 'next';
import { IndustryPage } from '@/components/sites/industry-page';

const industriesData: Record<string, { title: string; description: string; slug: string }> = {
  manufacturing: {
    title: 'Manufacturing Technology Solutions',
    description: 'Custom software, ERP, AI, and IoT solutions for manufacturing. Reduce downtime 40%, optimize production, and enable predictive maintenance.',
    slug: 'manufacturing',
  },
  healthcare: {
    title: 'Healthcare Technology Solutions',
    description: 'HIPAA-compliant EMR systems, patient portals, telemedicine platforms, and healthcare analytics for hospitals and healthcare providers.',
    slug: 'healthcare',
  },
  'financial-services': {
    title: 'Financial Services Technology',
    description: 'Secure, compliant software solutions for banks, fintech, and financial institutions. Fraud detection, core banking, and trading platforms.',
    slug: 'financial-services',
  },
  retail: {
    title: 'Retail & E-commerce Solutions',
    description: 'Omnichannel commerce platforms, inventory management, and customer analytics for modern retail businesses.',
    slug: 'retail',
  },
  education: {
    title: 'Education Technology Solutions',
    description: 'Learning management systems, student portals, and campus management platforms for educational institutions.',
    slug: 'education',
  },
  government: {
    title: 'Government Technology Solutions',
    description: 'E-governance platforms, citizen services portals, and secure systems for government and public sector organizations.',
    slug: 'government',
  },
};

// Get slug from URL
export async function generateStaticParams() {
  return Object.keys(industriesData).map((slug) => ({ slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const industry = industriesData[slug];
  if (!industry) {
    return { title: 'Industry Not Found' };
  }
  return {
    title: `${industry.title} | ELSxGlobal`,
    description: industry.description,
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const industrySlug = industriesData[slug] ? slug : 'manufacturing';
  return <IndustryPage slug={industrySlug} />;
}
