import { SolutionPage } from '@/components/site/solution-page';
import { ShieldCheck, Lock, Eye, AlertTriangle, FileCheck, KeyRound, ScanLine, Network } from 'lucide-react';

export const metadata = {
  title: 'Cybersecurity',
  description:
    'Zero-trust security architecture with continuous monitoring and threat intelligence.',
};

export default function CybersecurityPage() {
  return (
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
  );
}
