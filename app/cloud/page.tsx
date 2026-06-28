import { SolutionPage } from '@/components/site/solution-page';
import { Cloud, Server, Gauge, Shield, RefreshCw, Globe, Layers, DollarSign } from 'lucide-react';

export const metadata = {
  title: 'Cloud Infrastructure',
  description:
    'Elastic cloud architecture that scales with demand and contracts with efficiency.',
};

export default function CloudPage() {
  return (
    <SolutionPage
      eyebrow="Cloud Infrastructure"
      title={
        <>
          Elastic by
          <br />
          <span className="text-gradient">design.</span>
        </>
      }
      description="Cloud architecture that scales with demand and contracts with efficiency — so you never pay for idle capacity and never run out of headroom."
      stats={[
        { value: '99.99%', label: 'Availability' },
        { value: '38%', label: 'Cost Reduction' },
        { value: '0', label: 'Downtime Migration' },
        { value: '∞', label: 'Scalability' },
      ]}
      features={[
        {
          icon: Cloud,
          title: 'Cloud Migration',
          desc: 'Move workloads to the cloud with zero downtime and full data integrity.',
        },
        {
          icon: Layers,
          title: 'Auto-scaling',
          desc: 'Infrastructure that grows and contracts automatically with demand.',
        },
        {
          icon: Globe,
          title: 'Multi-region',
          desc: 'Deploy across regions for resilience, compliance, and global performance.',
        },
        {
          icon: DollarSign,
          title: 'Cost Optimization',
          desc: 'Continuous optimization that eliminates waste and right-sizes spend.',
        },
        {
          icon: Shield,
          title: 'Security & Compliance',
          desc: 'Cloud security architecture that meets your regulatory requirements.',
        },
        {
          icon: RefreshCw,
          title: 'Disaster Recovery',
          desc: 'Automated failover and backup strategies that keep you always on.',
        },
        {
          icon: Server,
          title: 'Containerization',
          desc: 'Docker and Kubernetes orchestration for portable, scalable workloads.',
        },
        {
          icon: Gauge,
          title: 'Performance Engineering',
          desc: 'Latency optimization, caching strategies, and CDN integration.',
        },
      ]}
      process={[
        { step: 'Assess', title: 'Cloud Readiness', desc: 'We evaluate your workloads and cloud readiness.' },
        { step: 'Architect', title: 'Cloud Design', desc: 'We design a scalable, secure cloud architecture.' },
        { step: 'Migrate', title: 'Migration', desc: 'We migrate with zero downtime and full validation.' },
        { step: 'Optimize', title: 'Continuous Optimization', desc: 'We optimize cost, performance, and security ongoing.' },
      ]}
    />
  );
}
