import { Metadata } from 'next';
import { createMetadata } from '@/lib/seo';
import { HostingTierPage } from '@/components/hosting/tier-page';

export const metadata: Metadata = createMetadata({
  title: 'Dedicated Servers India — Enterprise Hardware from Rs 4,999/mo | VaultHost',
  description: 'Dedicated servers with enterprise-grade Intel Xeon CPUs, hardware RAID, IPMI access, and DDoS protection. From Rs 4,999/mo with full management options.',
  keywords: ['dedicated server India', 'dedicated server Mumbai', 'bare metal server', 'Xeon dedicated server', 'IPMI server access', 'hardware RAID hosting', 'enterprise dedicated hosting', 'managed dedicated server'],
  canonical: 'https://elsxglobal.com/vaulthost/dedicated/',
  breadcrumb: [
    { name: 'Home', url: 'https://elsxglobal.com/' },
    { name: 'VaultHost', url: 'https://elsxglobal.com/vaulthost/' },
    { name: 'Dedicated Servers', url: 'https://elsxglobal.com/vaulthost/dedicated/' },
  ],
  faq: [
    { question: 'What is a dedicated server?', answer: 'A dedicated server is a full physical server reserved exclusively for you. No virtualization, no shared resources — maximum performance and control.' },
    { question: 'How long does setup take?', answer: 'Dedicated servers are provisioned within 1-4 hours of payment confirmation, depending on hardware availability.' },
    { question: 'Do you offer managed dedicated servers?', answer: 'Yes, we offer fully managed options where our team handles OS updates, security patches, monitoring, and backups.' },
    { question: 'Is IPMI access included?', answer: 'Yes, all dedicated servers include full IPMI access for out-of-band management, remote console, and hardware monitoring.' },
  ],
  serviceSchema: {
    name: 'Dedicated Server Hosting',
    description: 'Enterprise-grade dedicated servers with Intel Xeon CPUs, hardware RAID, and IPMI access.',
    provider: 'VaultHost by ELSxGlobal',
    areaServed: 'India',
    category: 'Dedicated Server Hosting',
  },
});

export default function DedicatedHostingPage() {
  return <HostingTierPage tier="dedicated" />;
}
