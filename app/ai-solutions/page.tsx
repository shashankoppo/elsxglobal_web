import { SolutionPage } from '@/components/site/solution-page';
import { Brain, Bot, Workflow, BarChart3, Sparkles, Gauge } from 'lucide-react';

export const metadata = {
  title: 'AI Solutions',
  description:
    'Predictive analytics, AI assistants, and intelligent automation embedded across your operations.',
};

export default function AISolutionsPage() {
  return (
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
  );
}
