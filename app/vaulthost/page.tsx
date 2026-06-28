import { SolutionPage } from '@/components/site/solution-page';
import { Server, Shield, Gauge, Globe, HardDrive, Cpu, RefreshCw, Cloud } from 'lucide-react';

export const metadata = {
  title: 'VaultHost Hosting',
  description:
    'Enterprise-grade hosting engineered for uptime, security, and performance at global scale.',
};

export default function VaultHostPage() {
  return (
    <SolutionPage
      eyebrow="VaultHost Infrastructure"
      title={
        <>
          Your business never sleeps.
          <br />
          <span className="text-gradient">Neither should your infrastructure.</span>
        </>
      }
      description="VaultHost is the ELSxGlobal infrastructure layer — enterprise-grade hosting engineered for 99.99% uptime, security, and performance at global scale."
      stats={[
        { value: '99.99%', label: 'Guaranteed Uptime' },
        { value: '12ms', label: 'Avg Latency' },
        { value: '6', label: 'Global Regions' },
        { value: '24/7', label: 'NOC Monitoring' },
      ]}
      features={[
        {
          icon: Server,
          title: 'Shared Hosting',
          desc: 'Reliable entry-level hosting for small sites and apps with free SSL and daily backups.',
        },
        {
          icon: Globe,
          title: 'Business Hosting',
          desc: 'Optimized performance with NVMe storage, free CDN, and priority support.',
        },
        {
          icon: Cpu,
          title: 'VPS Hosting',
          desc: 'Dedicated resources with full root control, SSD storage, and snapshots.',
        },
        {
          icon: Cloud,
          title: 'Enterprise Cloud',
          desc: 'Scalable, redundant infrastructure with auto-scaling and multi-region deployment.',
        },
        {
          icon: Shield,
          title: 'Security Built-in',
          desc: 'DDoS protection, free SSL, WAF, and continuous security monitoring on every plan.',
        },
        {
          icon: RefreshCw,
          title: 'Automated Backups',
          desc: 'Daily backups with one-click restore, so your data is always recoverable.',
        },
        {
          icon: HardDrive,
          title: 'NVMe Storage',
          desc: 'Next-generation storage that delivers industry-leading I/O performance.',
        },
        {
          icon: Gauge,
          title: 'Performance Monitoring',
          desc: 'Real-time uptime, latency, and throughput visibility across all your infrastructure.',
        },
      ]}
      process={[
        { step: 'Plan', title: 'Needs Assessment', desc: 'We assess your workload, traffic, and growth projections.' },
        { step: 'Migrate', title: 'Zero-Downtime Migration', desc: 'We migrate your workloads with no disruption to your business.' },
        { step: 'Optimize', title: 'Performance Tuning', desc: 'We tune your infrastructure for maximum speed and efficiency.' },
        { step: 'Monitor', title: '24/7 Operations', desc: 'Our NOC monitors your infrastructure around the clock.' },
      ]}
    />
  );
}
