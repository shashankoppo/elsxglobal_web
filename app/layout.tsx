import './globals.css';
import type { Metadata } from 'next';
import { Inter, Sora } from 'next/font/google';
import { Navbar } from '@/components/site/navbar';
import { Footer } from '@/components/site/footer';
import { LeadProvider } from '@/components/site/lead-context';
import { LeadDialog } from '@/components/site/lead-dialog';
import { WhatsAppButton } from '@/components/site/whatsapp-button';
import { PageLoader } from '@/components/site/page-loader';
import { EnterpriseAssistant } from '@/components/site/enterprise-assistant';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
});

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://elsxglobal.com'),
  title: {
    default: 'ELSxGlobal | Enterprise Technology Partner | Software, AI & Cloud Solutions',
    template: '%s | ELSxGlobal',
  },
  description:
    'India\'s premier enterprise technology partner. Custom software development, AI/ML solutions, cloud infrastructure, ERP/CRM, and digital transformation services. 200+ successful transformations.',
  keywords: [
    'custom software development India',
    'enterprise software solutions',
    'AI machine learning services',
    'cloud infrastructure AWS Azure',
    'ERP CRM implementation',
    'digital transformation company',
    'website development services',
    'cybersecurity solutions',
    'business process outsourcing',
    'Mumbai Bangalore Delhi software company',
  ],
  authors: [{ name: 'ELSxGlobal', url: 'https://elsxglobal.com' }],
  creator: 'ELSxGlobal',
  publisher: 'ELSxGlobal',
  other: {
    'organization:name': 'ELSxGlobal',
    'organization:parent': 'EvolucentSphere Pvt. Ltd.',
    'organization:parent_url': 'https://evolucentsphere.com',
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://elsxglobal.com',
    siteName: 'ELSxGlobal',
    title: 'ELSxGlobal | Enterprise Technology Partner',
    description: 'Custom software, AI solutions, cloud infrastructure, and digital transformation. Trusted by 200+ enterprises across India and globally.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ELSxGlobal - Enterprise Technology Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ELSxGlobal | Enterprise Technology Partner',
    description: 'Custom software, AI solutions, cloud infrastructure, and digital transformation. Trusted by 200+ enterprises.',
    images: ['/og-image.png'],
    creator: '@elsxglobal',
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://elsxglobal.com',
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0a0f1a" media="(prefers-color-scheme: dark)" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://elsxglobal.com" />
      </head>
      <body className="font-sans antialiased bg-background text-foreground min-h-screen">
        <LeadProvider>
          <PageLoader />
          <Navbar />
          <main className="relative pt-24">{children}</main>
          <Footer />
          <LeadDialog />
          <EnterpriseAssistant />
          <WhatsAppButton />
        </LeadProvider>
      </body>
    </html>
  );
}
