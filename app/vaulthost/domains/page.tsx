import { Metadata } from 'next';
import { createMetadata } from '@/lib/seo';
import DomainsClient from './domains-client';

export const metadata: Metadata = createMetadata({
  title: 'Domain Registration India — Search & Buy Domains from Rs 99 | VaultHost',
  description: 'Search and register domains across 15+ TLDs. Free WHOIS privacy, DNS management, and domain forwarding. Competitive pricing with no hidden fees.',
  keywords: ['domain registration India', 'buy domain India', 'domain search Mumbai', 'cheap domain registration', '.com domain India', '.in domain registration', 'domain name search', 'domain transfer India'],
  canonical: 'https://elsxglobal.com/vaulthost/domains/',
  breadcrumb: [
    { name: 'Home', url: 'https://elsxglobal.com/' },
    { name: 'VaultHost', url: 'https://elsxglobal.com/vaulthost/' },
    { name: 'Domain Search', url: 'https://elsxglobal.com/vaulthost/domains/' },
  ],
  serviceSchema: {
    name: 'Domain Registration',
    description: 'Search and register domain names across 15+ TLDs with free WHOIS privacy and DNS management.',
    provider: 'VaultHost by ELSxGlobal',
    areaServed: 'India',
    category: 'Domain Registration',
  },
});

export default function DomainsPage() {
  return <DomainsClient />;
}
