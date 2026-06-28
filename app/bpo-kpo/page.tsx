import { SolutionPage } from '@/components/site/solution-page';
import { Headset, BookOpen, Users, Wallet, FileText, BarChart3, Phone, Search } from 'lucide-react';

export const metadata = {
  title: 'BPO & KPO',
  description:
    'Business and knowledge process outsourcing for operational scale and on-demand expertise.',
};

export default function BpoKpoPage() {
  return (
    <SolutionPage
      eyebrow="BPO & KPO"
      title={
        <>
          Scale without
          <br />
          <span className="text-gradient">the overhead.</span>
        </>
      }
      description="Business and knowledge process outsourcing that gives you operational scale and on-demand expertise — so your core team focuses on growth."
      stats={[
        { value: '38%', label: 'Cost Reduction' },
        { value: '24/7', label: 'Operations' },
        { value: '100+', label: 'Skilled Experts' },
        { value: '99%', label: 'Quality SLA' },
      ]}
      features={[
        {
          icon: Headset,
          title: 'Customer Support',
          desc: 'Multi-channel support that keeps your customers happy and loyal.',
        },
        {
          icon: Users,
          title: 'Back Office',
          desc: 'Administrative and operational processes handled with precision.',
        },
        {
          icon: Wallet,
          title: 'Finance & Accounting',
          desc: 'Bookkeeping, payroll, AP/AR, and financial reporting outsourced.',
        },
        {
          icon: Phone,
          title: 'HR Operations',
          desc: 'Recruitment, onboarding, and HR administration at scale.',
        },
        {
          icon: BookOpen,
          title: 'Research & Analysis',
          desc: 'Market research, competitive analysis, and business intelligence.',
        },
        {
          icon: FileText,
          title: 'Legal Support',
          desc: 'Contract review, compliance documentation, and legal research.',
        },
        {
          icon: BarChart3,
          title: 'Financial Modeling',
          desc: 'Complex financial models and analysis on demand.',
        },
        {
          icon: Search,
          title: 'Data Research',
          desc: 'Data collection, cleansing, and research for informed decisions.',
        },
      ]}
      process={[
        { step: 'Scope', title: 'Process Mapping', desc: 'We map the processes you want to outsource and define SLAs.' },
        { step: 'Transition', title: 'Knowledge Transfer', desc: 'We onboard your processes with full knowledge transfer.' },
        { step: 'Operate', title: 'Delivery', desc: 'We deliver with quality, security, and continuous improvement.' },
        { step: 'Optimize', title: 'Scale', desc: 'We scale capacity up or down with your business needs.' },
      ]}
    />
  );
}
