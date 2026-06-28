import { Metadata } from 'next';
import { createMetadata, createSchemaMarkup, services } from '@/lib/seo';
import { SolutionPage } from '@/components/site/solution-page';
import { Megaphone, Search, TrendingUp, Target, Globe, PenTool, BarChart3, Mail } from 'lucide-react';

export const metadata: Metadata = createMetadata({
  title: 'Digital Marketing Services | SEO, PPC, Social Media & Growth Marketing',
  description: 'Results-driven digital marketing agency in India. SEO, PPC, social media, content marketing, and performance marketing. 3x average ROI increase. 200+ campaigns delivered.',
  keywords: services.digitalMarketing.keywords,
  canonical: 'https://elsxglobal.com/digital-marketing/',
  serviceSchema: {
    name: 'Digital Marketing Services',
    description: 'Results-driven digital marketing agency in India offering SEO, PPC, social media, content marketing, and performance marketing services.',
    provider: 'ELSxGlobal',
    areaServed: 'India, UAE, USA, UK, Singapore',
    category: 'Digital Marketing',
  },
  breadcrumb: [
    { name: 'Home', url: 'https://elsxglobal.com/' },
    { name: 'Services', url: 'https://elsxglobal.com/services/' },
    { name: 'Digital Marketing', url: 'https://elsxglobal.com/digital-marketing/' },
  ],
  faq: [
    {
      question: 'What digital marketing services do you offer in India?',
      answer: 'We offer comprehensive digital marketing services including SEO, PPC management, social media marketing, content marketing, email marketing, conversion rate optimization, and performance marketing.',
    },
    {
      question: 'How long does it take to see SEO results?',
      answer: 'SEO typically takes 3-6 months to show measurable results. We provide monthly reporting and continuous optimization to improve rankings over time.',
    },
    {
      question: 'Do you offer digital marketing for e-commerce businesses?',
      answer: 'Yes, we specialize in e-commerce digital marketing including product listing optimization, shopping ads, and conversion rate optimization for platforms like Shopify, WooCommerce, and Magento.',
    },
    {
      question: 'What is your pricing for digital marketing services?',
      answer: 'Our digital marketing packages start at ₹25,000/month. We offer custom packages based on your goals, industry, and competitive landscape.',
    },
  ],
});

export default function DigitalMarketingPage() {
  const schemas = createSchemaMarkup({
    canonical: 'https://elsxglobal.com/digital-marketing/',
    serviceSchema: {
      name: 'Digital Marketing Services',
      description: 'Results-driven digital marketing agency in India offering SEO, PPC, social media, content marketing, and performance marketing services.',
      provider: 'ELSxGlobal',
      areaServed: 'India, UAE, USA, UK, Singapore',
      category: 'Digital Marketing',
    },
    breadcrumb: [
      { name: 'Home', url: 'https://elsxglobal.com/' },
      { name: 'Services', url: 'https://elsxglobal.com/services/' },
      { name: 'Digital Marketing', url: 'https://elsxglobal.com/digital-marketing/' },
    ],
    faq: [
      {
        question: 'What digital marketing services do you offer in India?',
        answer: 'We offer comprehensive digital marketing services including SEO, PPC management, social media marketing, content marketing, email marketing, conversion rate optimization, and performance marketing.',
      },
      {
        question: 'How long does it take to see SEO results?',
        answer: 'SEO typically takes 3-6 months to show measurable results. We provide monthly reporting and continuous optimization to improve rankings over time.',
      },
    ],
  });

  return (
    <>
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />
      ))}
      <SolutionPage
        eyebrow="Digital Marketing"
        title={
          <>
            Growth, engineered.
            <br />
            <span className="text-gradient">Marketing that compounds.</span>
          </>
        }
        description="Data-driven digital marketing that delivers measurable results. From SEO that ranks to PPC that converts, and social media that engages — we engineer growth across every channel."
        stats={[
          { value: '3x', label: 'Avg ROI Increase' },
          { value: '200+', label: 'Campaigns Delivered' },
          { value: '85%', label: 'Organic Traffic Growth' },
          { value: '40%', label: 'Conversion Lift' },
        ]}
        features={[
          {
            icon: Search,
            title: 'SEO Services',
            desc: 'Technical SEO, content strategy, and link building that drives organic traffic growth.',
          },
          {
            icon: Target,
            title: 'PPC Management',
            desc: 'Google Ads, Meta Ads, and programmatic campaigns optimized for maximum ROI.',
          },
          {
            icon: Megaphone,
            title: 'Social Media Marketing',
            desc: 'Strategy, content creation, and community management across all major platforms.',
          },
          {
            icon: PenTool,
            title: 'Content Marketing',
            desc: 'Blog posts, whitepapers, case studies, and video content that builds authority.',
          },
          {
            icon: Mail,
            title: 'Email Marketing',
            desc: 'Automated email sequences, newsletters, and drip campaigns that nurture leads.',
          },
          {
            icon: TrendingUp,
            title: 'Conversion Rate Optimization',
            desc: 'A/B testing, funnel optimization, and UX improvements that maximize conversions.',
          },
          {
            icon: Globe,
            title: 'Performance Marketing',
            desc: 'Full-funnel marketing that drives measurable results across every channel.',
          },
          {
            icon: BarChart3,
            title: 'Analytics & Reporting',
            desc: 'Real-time dashboards and monthly reports that track every metric that matters.',
          },
        ]}
        process={[
          { step: 'Audit', title: 'Marketing Audit', desc: 'We audit your current marketing performance and identify quick wins and long-term opportunities.' },
          { step: 'Strategy', title: 'Channel Strategy', desc: 'We design a custom channel strategy based on your goals, audience, and competitive landscape.' },
          { step: 'Execute', title: 'Campaign Execution', desc: 'We execute campaigns with precision, A/B testing, and continuous optimization.' },
          { step: 'Scale', title: 'Growth Optimization', desc: 'We double down on what works and eliminate waste for compounding growth.' },
        ]}
      />
    </>
  );
}
