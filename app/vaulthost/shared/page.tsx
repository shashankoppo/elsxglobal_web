import { Metadata } from 'next';
import { createMetadata } from '@/lib/seo';
import { HostingTierPage } from '@/components/hosting/tier-page';

export const metadata: Metadata = createMetadata({
  title: 'Shared Hosting India — Affordable cPanel Hosting from Rs 99/mo | VaultHost',
  description: 'Affordable shared hosting in India with free SSL, cPanel, NVMe SSD storage, daily backups, and 24/7 support. Plans starting at Rs 99/mo with 99.99% uptime guarantee.',
  keywords: ['shared hosting India', 'cheap shared hosting', 'cPanel hosting India', 'web hosting Mumbai', 'affordable hosting plans', 'shared web hosting', 'budget hosting India', 'free SSL hosting'],
  canonical: 'https://elsxglobal.com/vaulthost/shared/',
  breadcrumb: [
    { name: 'Home', url: 'https://elsxglobal.com/' },
    { name: 'VaultHost', url: 'https://elsxglobal.com/vaulthost/' },
    { name: 'Shared Hosting', url: 'https://elsxglobal.com/vaulthost/shared/' },
  ],
  faq: [
    { question: 'What is shared hosting?', answer: 'Shared hosting means your website shares a server with other websites. It is the most affordable option and perfect for personal sites, blogs, and small businesses getting started online.' },
    { question: 'Can I upgrade later?', answer: 'Yes! You can upgrade to any higher plan at any time. Our team will migrate your site for free.' },
    { question: 'Do you include SSL?', answer: 'Yes, every plan includes a free wildcard SSL certificate. No extra cost, no configuration needed.' },
    { question: 'What is the uptime guarantee?', answer: 'We guarantee 99.99% uptime. If we miss it, you receive service credits proportional to the downtime.' },
  ],
  serviceSchema: {
    name: 'Shared Hosting',
    description: 'Affordable shared hosting with cPanel, free SSL, NVMe SSD storage, and daily backups.',
    provider: 'VaultHost by ELSxGlobal',
    areaServed: 'India',
    category: 'Web Hosting',
  },
});

export default function SharedHostingPage() {
  return <HostingTierPage tier="shared" />;
}
