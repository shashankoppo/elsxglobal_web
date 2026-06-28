import { Metadata } from 'next';
import { createMetadata, createSchemaMarkup, services } from '@/lib/seo';
import { SolutionPage } from '@/components/site/solution-page';
import { Brain, Bot, Workflow, BarChart3, Sparkles, Gauge } from 'lucide-react';

export const metadata: Metadata = createMetadata({
  title: 'AI & Machine Learning Solutions India | Predictive Analytics & AI Consulting',
  description: 'Enterprise AI and machine learning solutions company in India. Predictive analytics, NLP, computer vision, AI assistants, and business intelligence. 3.2x faster decision-making.',
  keywords: services.ai.keywords,
  canonical: 'https://elsxglobal.com/ai-solutions/',
  serviceSchema: {
    name: 'AI & Machine Learning Solutions',
    description: 'Enterprise AI and ML solutions including predictive analytics, NLP, computer vision, and AI assistants for businesses in India.',
    provider: 'ELSxGlobal',
    areaServed: 'India, UAE, USA, UK, Singapore',
    category: 'Artificial Intelligence',
  },
  breadcrumb: [
    { name: 'Home', url: 'https://elsxglobal.com/' },
    { name: 'Services', url: 'https://elsxglobal.com/services/' },
    { name: 'AI Solutions', url: 'https://elsxglobal.com/ai-solutions/' },
  ],
  faq: [
    {
      question: 'What AI solutions do you offer for Indian businesses?',
      answer: 'We offer predictive analytics, natural language processing, computer vision, AI-powered chatbots, business intelligence dashboards, and custom AI model development tailored to your industry.',
    },
    {
      question: 'How can AI benefit my manufacturing business?',
      answer: 'AI can optimize production scheduling, predict equipment failures, improve quality control, and optimize supply chain logistics — reducing costs by 20-40%.',
    },
    {
      question: 'Do you build custom AI models or use pre-trained solutions?',
      answer: 'We do both. For common use cases, we leverage pre-trained models and fine-tune them. For unique business problems, we build custom models from scratch.',
    },
  ],
});

export default function AISolutionsPage() {
  const schemas = createSchemaMarkup({
    canonical: 'https://elsxglobal.com/ai-solutions/',
    serviceSchema: {
      name: 'AI & Machine Learning Solutions',
      description: 'Enterprise AI and ML solutions for Indian businesses.',
      provider: 'ELSxGlobal',
      areaServed: 'India, UAE, USA, UK, Singapore',
      category: 'Artificial Intelligence',
    },
    breadcrumb: [
      { name: 'Home', url: 'https://elsxglobal.com/' },
      { name: 'Services', url: 'https://elsxglobal.com/services/' },
      { name: 'AI Solutions', url: 'https://elsxglobal.com/ai-solutions/' },
    ],
  });

  return (
    <>
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />
      ))}
      <SolutionPage
        eyebrow="AI Solutions"
        title={
          <>
            Intelligence that
            <br />
            <span className="text-gradient">compounds.</span>
          </>
        }
        description="ELSxGlobal embeds AI across your entire operation — from predictive analytics that forecast the future to AI assistants that execute decisions and automation that eliminates friction."
        stats={[
          { value: '3.2x', label: 'Faster Decisions' },
          { value: '64%', label: 'Better Accuracy' },
          { value: '24/7', label: 'AI Operations' },
          { value: '38%', label: 'Cost Reduction' },
        ]}
        features={[
          {
            icon: Brain,
            title: 'Predictive Analytics',
            desc: 'Forecast demand, churn, and risk before they happen with models trained on your business data.',
          },
          {
            icon: Bot,
            title: 'AI Assistants',
            desc: 'Context-aware copilots embedded in every workflow, from sales to operations to support.',
          },
          {
            icon: Workflow,
            title: 'Workflow Automation',
            desc: 'End-to-end orchestration of complex business processes without human bottlenecks.',
          },
          {
            icon: BarChart3,
            title: 'Business Intelligence',
            desc: 'Live dashboards that turn raw data into decisions, delivered to the people who need them.',
          },
          {
            icon: Sparkles,
            title: 'Intelligent Recommendations',
            desc: 'AI that surfaces the next best action across every system and every team.',
          },
          {
            icon: Gauge,
            title: 'Continuous Optimization',
            desc: 'Models that learn and improve continuously, making your organization smarter every day.',
          },
        ]}
        process={[
          { step: 'Discover', title: 'Data Assessment', desc: 'We map your data landscape and identify high-impact AI opportunities.' },
          { step: 'Design', title: 'Model Architecture', desc: 'We design AI models tailored to your specific business outcomes.' },
          { step: 'Deploy', title: 'Integration', desc: 'We embed AI into your existing systems and workflows seamlessly.' },
          { step: 'Optimize', title: 'Continuous Learning', desc: 'Models improve over time, compounding value with every interaction.' },
        ]}
      />
    </>
  );
}
