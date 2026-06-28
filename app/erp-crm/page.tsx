import { SolutionPage } from '@/components/site/solution-page';
import { Boxes, Users, ShoppingCart, Wallet, Package, UserCog, FolderKanban, Settings } from 'lucide-react';

export const metadata = {
  title: 'ERP & CRM',
  description:
    'Unified ERP and CRM that give you complete visibility across your organization.',
};

export default function ErpCrmPage() {
  return (
    <SolutionPage
      eyebrow="ERP & CRM"
      title={
        <>
          Complete visibility across
          <br />
          <span className="text-gradient">your organization.</span>
        </>
      }
      description="One unified command center for sales, operations, finance, HR, and projects — with real-time intelligence on every metric that matters."
      stats={[
        { value: '100%', label: 'Real-time Coverage' },
        { value: '1', label: 'Source of Truth' },
        { value: '7', label: 'Unified Modules' },
        { value: '48h', label: 'Implementation Start' },
      ]}
      features={[
        {
          icon: ShoppingCart,
          title: 'Sales',
          desc: 'Pipeline visibility, forecasting, and revenue intelligence in real time.',
        },
        {
          icon: Users,
          title: 'CRM',
          desc: 'Every customer interaction informed, contextual, and tracked.',
        },
        {
          icon: Package,
          title: 'Inventory',
          desc: 'Stock levels, reorder points, and supply chain visibility across locations.',
        },
        {
          icon: UserCog,
          title: 'HR',
          desc: 'Employee lifecycle, performance, and workforce analytics unified.',
        },
        {
          icon: Wallet,
          title: 'Finance',
          desc: 'Accounting, budgeting, and financial reporting with faster closes.',
        },
        {
          icon: Settings,
          title: 'Operations',
          desc: 'Process monitoring, throughput tracking, and bottleneck detection.',
        },
        {
          icon: FolderKanban,
          title: 'Projects',
          desc: 'Project portfolios, resource allocation, and delivery tracking.',
        },
        {
          icon: Boxes,
          title: 'Unified ERP',
          desc: 'Every business function connected in one intelligent system.',
        },
      ]}
      process={[
        { step: 'Assess', title: 'System Audit', desc: 'We map your current systems, data flows, and integration gaps.' },
        { step: 'Design', title: 'Architecture', desc: 'We design a unified ERP/CRM architecture tailored to your operations.' },
        { step: 'Migrate', title: 'Data Migration', desc: 'We migrate your data safely with zero downtime and full validation.' },
        { step: 'Adopt', title: 'Change Management', desc: 'We train your teams and ensure full adoption across the organization.' },
      ]}
    />
  );
}
