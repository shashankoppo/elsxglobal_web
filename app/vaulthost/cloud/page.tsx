import { Metadata } from 'next';
import { createMetadata } from '@/lib/seo';
import { HostingTierPage } from '@/components/hosting/tier-page';

export const metadata: Metadata = createMetadata({
  title: 'Cloud Hosting India — Auto-scaling & Multi-region from Rs 999/mo | VaultHost',
  description: 'Cloud hosting with auto-scaling, load balancing, global CDN, and multi-region deployment. Pay only for what you use. Plans from Rs 999/mo.',
  keywords: ['cloud hosting India', 'auto-scaling cloud hosting', 'cloud server Mumbai', 'multi-region hosting', 'load balancer hosting', 'CDN hosting India', 'scalable cloud hosting', 'enterprise cloud infrastructure'],
  canonical: 'https://elsxglobal.com/vaulthost/cloud/',
  breadcrumb: [
    { name: 'Home', url: 'https://elsxglobal.com/' },
    { name: 'VaultHost', url: 'https://elsxglobal.com/vaulthost/' },
    { name: 'Cloud Hosting', url: 'https://elsxglobal.com/vaulthost/cloud/' },
  ],
  faq: [
    { question: 'What is cloud hosting?', answer: 'Cloud hosting uses a network of virtual servers that can scale resources on demand. Your site runs across multiple nodes for maximum availability.' },
    { question: 'How does auto-scaling work?', answer: 'When traffic spikes, your cloud instance automatically provisions more CPU and RAM. When traffic drops, resources scale back down.' },
    { question: 'Which regions are available?', answer: 'We have data centers in Mumbai, Singapore, Dubai, Frankfurt, London, and New York.' },
    { question: 'Is a CDN included?', answer: 'Yes, every cloud plan includes a free global CDN with 200+ edge locations.' },
  ],
  serviceSchema: {
    name: 'Cloud Hosting',
    description: 'Auto-scaling cloud hosting with multi-region deployment, load balancing, and global CDN.',
    provider: 'VaultHost by ELSxGlobal',
    areaServed: 'India',
    category: 'Cloud Hosting',
  },
});

export default function CloudHostingPage() {
  return <HostingTierPage tier="cloud" />;
}
