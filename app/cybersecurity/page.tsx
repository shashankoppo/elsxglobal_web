import { Metadata } from 'next';
import { createMetadata, createSchemaMarkup, services } from '@/lib/seo';
import { SolutionPage } from '@/components/site/solution-page';
import { ShieldCheck, Lock, Eye, AlertTriangle, FileCheck, KeyRound, ScanLine, Network } from 'lucide-react';

export const metadata: Metadata = createMetadata({
  title: 'Cybersecurity Solutions India | Security Audits, Compliance & SOC',
  description: 'Enterprise cybersecurity solutions in India. Zero-trust security, penetration testing, SOC 2, ISO 27001, compliance, and 24/7 threat monitoring. Secure by architecture.',
  keywords: services.cybersecurity.keywords,
  canonical: 'https://elsxglobal.com/cybersecurity/',
  serviceSchema: {
    name: 'Cybersecurity Solutions',
    description: 'Enterprise cybersecurity solutions in India including zero-trust architecture, penetration testing, compliance, and 24/7 threat monitoring.',
    provider: 'ELSxGlobal',
    areaServed: 'India, UAE, USA, UK, Singapore',
    category: 'Cybersecurity',
  },
  breadcrumb: [
    { name: 'Home', url: 'https://elsxglobal.com/' },
    { name: 'Services', url: 'https://elsxglobal.com/services/' },
    { name: 'Cybersecurity', url: 'https://elsxglobal.com/cybersecurity/' },
  ],
  faq: [
    {
      question: 'What cybersecurity services do you offer in India?',
      answer: 'We offer zero-trust architecture, penetration testing, security audits, SOC 2 and ISO 27001 compliance, threat monitoring, IAM, and incident response services.',
    },
    {
      question: 'How do you ensure compliance with Indian data regulations?',
      answer: 'We help implement security frameworks that align with DPDP Act, IT Act, and sector-specific regulations. Our compliance services cover GDPR, HIPAA, SOC 2, and ISO 27001.',
    },
    {
      question: 'What is your incident response process?',
      answer: 'We provide 24/7 threat monitoring with automated detection and response. Our incident response team follows a structured approach: detect, contain, eradicate, recover, and review.',
    },
  ],
});

export default function CybersecurityPage() {
  const schemas = createSchemaMarkup({
    canonical: 'https://elsxglobal.com/cybersecurity/',
    serviceSchema: {
      name: 'Cybersecurity Solutions',
      description: 'Enterprise cybersecurity solutions in India.',
      provider: 'ELSxGlobal',
      areaServed: 'India, UAE, USA, UK, Singapore',
      category: 'Cybersecurity',
    },
    breadcrumb: [
      { name: 'Home', url: 'https://elsxglobal.com/' },
      { name: 'Services', url: 'https://elsxglobal.com/services/' },
      { name: 'Cybersecurity', url: 'https://elsxglobal.com/cybersecurity/' },
    ],
  });

  return (
    <>
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />
      ))}
      <SolutionPage
        eyebrow="Cybersecurity"
        title={
          <>
            Secure by
            <br />
            <span className="text-gradient">architecture.</span>
          </>
        }
        description="Zero-trust security architecture with continuous monitoring, threat intelligence, and compliance built in — so your organization is resilient by design."
        stats={[
          { value: '99.9%', label: 'Threat Prevention' },
          { value: '24/7', label: 'Monitoring' },
          { value: '0', label: 'Trust by Default' },
          { value: '100%', label: 'Compliance Coverage' },
        ]}
        features={[
          {
            icon: ShieldCheck,
            title: 'Zero-Trust Architecture',
            desc: 'Never trust, always verify — security that assumes breach and verifies every access.',
          },
          {
            icon: Eye,
            title: 'Threat Detection',
            desc: 'Continuous monitoring with AI-driven threat detection and response.',
          },
          {
            icon: FileCheck,
            title: 'Compliance',
            desc: 'SOC 2, ISO 27001, GDPR, HIPAA — compliance frameworks built into your systems.',
          },
          {
            icon: ScanLine,
            title: 'Security Audits',
            desc: 'Comprehensive security assessments that find vulnerabilities before attackers do.',
          },
          {
            icon: KeyRound,
            title: 'Identity & Access',
            desc: 'IAM, MFA, and privileged access management that controls who can do what.',
          },
          {
            icon: Network,
            title: 'Network Security',
            desc: 'Firewalls, WAF, segmentation, and DDoS protection across your entire perimeter.',
          },
          {
            icon: Lock,
            title: 'Data Encryption',
            desc: 'End-to-end encryption for data at rest and in transit across all systems.',
          },
          {
            icon: AlertTriangle,
            title: 'Incident Response',
            desc: 'Rapid response playbooks and forensics that minimize impact when incidents occur.',
          },
        ]}
        process={[
          { step: 'Assess', title: 'Risk Assessment', desc: 'We identify vulnerabilities, threats, and compliance gaps.' },
          { step: 'Architect', title: 'Security Design', desc: 'We design zero-trust architecture tailored to your risk profile.' },
          { step: 'Implement', title: 'Deployment', desc: 'We deploy security controls with minimal disruption.' },
          { step: 'Monitor', title: 'Continuous Monitoring', desc: 'We monitor, detect, and respond to threats 24/7.' },
        ]}
      />
    </>
  );
}
