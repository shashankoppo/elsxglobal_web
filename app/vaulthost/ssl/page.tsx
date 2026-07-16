import { Metadata } from 'next';
import { createMetadata } from '@/lib/seo';
import { HostingTierPage } from '@/components/hosting/tier-page';

export const metadata: Metadata = createMetadata({
  title: 'SSL Certificates India — Secure Your Website from Rs 99/mo | VaultHost',
  description: 'SSL certificates with domain, wildcard, and extended validation. 256-bit encryption, fast issuance, and browser padlock. Plans starting at Rs 99/mo.',
  keywords: ['SSL certificate India', 'buy SSL certificate', 'wildcard SSL certificate', 'EV SSL certificate', 'domain validation SSL', 'HTTPS certificate Mumbai', 'SSL cert India', 'website security certificate'],
  canonical: 'https://elsxglobal.com/vaulthost/ssl/',
  breadcrumb: [
    { name: 'Home', url: 'https://elsxglobal.com/' },
    { name: 'VaultHost', url: 'https://elsxglobal.com/vaulthost/' },
    { name: 'SSL Certificates', url: 'https://elsxglobal.com/vaulthost/ssl/' },
  ],
  faq: [
    { question: 'What is an SSL certificate?', answer: 'An SSL certificate encrypts data between your website and visitors. It displays the padlock icon in browsers and is required for HTTPS.' },
    { question: 'Do I need an SSL certificate?', answer: 'Yes. Modern browsers flag sites without SSL as "Not Secure." SSL is also required for PCI compliance and improves SEO rankings.' },
    { question: 'What is the difference between DV and EV?', answer: 'Domain Validation (DV) verifies domain ownership and issues in minutes. Extended Validation (EV) verifies business identity and shows the company name in the green bar.' },
    { question: 'What is a wildcard SSL?', answer: 'A wildcard SSL secures your domain and unlimited subdomains (e.g., *.example.com covers www, mail, blog, etc.) with one certificate.' },
  ],
  serviceSchema: {
    name: 'SSL Certificates',
    description: 'SSL certificates with domain validation, wildcard, and extended validation options.',
    provider: 'VaultHost by ELSxGlobal',
    areaServed: 'India',
    category: 'SSL Certificates',
  },
});

export default function SslPage() {
  return <HostingTierPage tier="ssl" />;
}
