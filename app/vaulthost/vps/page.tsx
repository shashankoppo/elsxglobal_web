import { Metadata } from 'next';
import { createMetadata } from '@/lib/seo';
import { HostingTierPage } from '@/components/hosting/tier-page';

export const metadata: Metadata = createMetadata({
  title: 'VPS Hosting India — Full Root Access & Dedicated Resources from Rs 499/mo | VaultHost',
  description: 'VPS hosting with dedicated CPU, RAM, SSD storage, full root access, DDoS protection, and snapshots. Plans from Rs 499/mo with instant provisioning.',
  keywords: ['VPS hosting India', 'virtual private server Mumbai', 'cheap VPS hosting', 'root access VPS', 'dedicated resources VPS', 'Linux VPS India', 'SSD VPS hosting', 'DDoS protected VPS'],
  canonical: 'https://elsxglobal.com/vaulthost/vps/',
  breadcrumb: [
    { name: 'Home', url: 'https://elsxglobal.com/' },
    { name: 'VaultHost', url: 'https://elsxglobal.com/vaulthost/' },
    { name: 'VPS Hosting', url: 'https://elsxglobal.com/vaulthost/vps/' },
  ],
  faq: [
    { question: 'What is VPS hosting?', answer: 'A Virtual Private Server (VPS) gives you dedicated resources on a virtualized server. You get full root access and complete control.' },
    { question: 'Can I choose my OS?', answer: 'Yes, you can choose from Ubuntu, Debian, CentOS, AlmaLinux, Rocky Linux, and Windows Server.' },
    { question: 'How fast is provisioning?', answer: 'VPS instances are provisioned within 2-5 minutes of payment confirmation.' },
    { question: 'Can I scale my VPS?', answer: 'Yes, you can upgrade CPU, RAM, and storage at any time from your client portal.' },
  ],
  serviceSchema: {
    name: 'VPS Hosting',
    description: 'Virtual Private Server hosting with dedicated resources, full root access, and DDoS protection.',
    provider: 'VaultHost by ELSxGlobal',
    areaServed: 'India',
    category: 'VPS Hosting',
  },
});

export default function VpsHostingPage() {
  return <HostingTierPage tier="vps" />;
}
