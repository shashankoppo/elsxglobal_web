import Link from 'next/link';
import { PageHero } from '@/components/site/page-hero';
import { CTASection } from '@/components/site/cta-section';
import {
  Brain,
  Boxes,
  Users,
  Cloud,
  Server,
  ShieldCheck,
  Workflow,
  BarChart3,
  Headset,
  BookOpen,
  Compass,
  Code2,
  Megaphone,
  ArrowUpRight,
  type LucideIcon,
} from 'lucide-react';

type Service = {
  icon: LucideIcon;
  name: string;
  tagline: string;
  desc: string;
  href: string;
  capabilities: string[];
};

const SERVICES: Service[] = [
  {
    icon: Brain,
    name: 'AI Solutions',
    tagline: 'Intelligence that compounds.',
    desc: 'Predictive analytics, AI assistants, and intelligent automation embedded across your operations.',
    href: '/ai-solutions',
    capabilities: ['Predictive Analytics', 'AI Assistants', 'Workflow Automation', 'Business Intelligence'],
  },
  {
    icon: Boxes,
    name: 'ERP Transformation',
    tagline: 'One source of truth.',
    desc: 'Unified ERP connecting finance, inventory, operations, and HR in real time.',
    href: '/erp-crm',
    capabilities: ['Finance', 'Inventory', 'Operations', 'HR Management'],
  },
  {
    icon: Users,
    name: 'CRM Transformation',
    tagline: 'Every relationship, informed.',
    desc: 'CRM that unifies sales, service, and marketing on a single intelligent platform.',
    href: '/erp-crm',
    capabilities: ['Sales Pipeline', 'Customer 360', 'Service Desk', 'Marketing Automation'],
  },
  {
    icon: Cloud,
    name: 'Cloud Infrastructure',
    tagline: 'Elastic by design.',
    desc: 'Cloud architecture that scales with demand and contracts with efficiency.',
    href: '/cloud',
    capabilities: ['Migration', 'Auto-scaling', 'Multi-region', 'Cost Optimization'],
  },
  {
    icon: Server,
    name: 'VaultHost Hosting',
    tagline: 'Always on, always fast.',
    desc: 'Enterprise hosting with 99.99% guaranteed uptime and global performance.',
    href: '/vaulthost',
    capabilities: ['Shared', 'Business', 'VPS', 'Enterprise Cloud'],
  },
  {
    icon: ShieldCheck,
    name: 'Cybersecurity',
    tagline: 'Secure by architecture.',
    desc: 'Zero-trust security with continuous monitoring and threat intelligence.',
    href: '/cybersecurity',
    capabilities: ['Zero-Trust', 'Threat Detection', 'Compliance', 'Security Audits'],
  },
  {
    icon: Code2,
    name: 'Software Development',
    tagline: 'Built for your business.',
    desc: 'Custom enterprise software engineered for scale, reliability, and longevity.',
    href: '/software',
    capabilities: ['Custom Apps', 'API Platforms', 'Microservices', 'Legacy Modernization'],
  },
  {
    icon: Workflow,
    name: 'Automation',
    tagline: 'Friction, eliminated.',
    desc: 'End-to-end orchestration of complex business processes without human bottlenecks.',
    href: '/services',
    capabilities: ['Process Mining', 'RPA', 'Workflow Orchestration', 'Integration'],
  },
  {
    icon: BarChart3,
    name: 'Analytics',
    tagline: 'Data into decisions.',
    desc: 'Real-time dashboards and intelligence that turn raw data into action.',
    href: '/services',
    capabilities: ['Live Dashboards', 'Data Engineering', 'Reporting', 'Forecasting'],
  },
  {
    icon: Headset,
    name: 'BPO',
    tagline: 'Scale without overhead.',
    desc: 'Business process outsourcing for operational scale and efficiency.',
    href: '/bpo-kpo',
    capabilities: ['Customer Support', 'Back Office', 'Finance & Accounting', 'HR Ops'],
  },
  {
    icon: BookOpen,
    name: 'KPO',
    tagline: 'Expertise on demand.',
    desc: 'Knowledge process outsourcing for research, analysis, and specialized work.',
    href: '/bpo-kpo',
    capabilities: ['Research', 'Data Analysis', 'Legal Support', 'Financial Modeling'],
  },
  {
    icon: Megaphone,
    name: 'Digital Marketing',
    tagline: 'Growth, engineered.',
    desc: 'Data-driven marketing that compounds — from SEO to full-funnel automation.',
    href: '/digital-marketing',
    capabilities: ['SEO', 'Paid Media', 'Content', 'Marketing Automation'],
  },
  {
    icon: Compass,
    name: 'Consulting',
    tagline: 'Strategy that ships.',
    desc: 'Transformation consulting that bridges vision and delivery.',
    href: '/services',
    capabilities: ['Strategy', 'Roadmapping', 'Change Management', 'Program Delivery'],
  },
];

export const metadata = {
  title: 'Services',
  description:
    'The ELSxGlobal ecosystem: AI, ERP, CRM, cloud, hosting, cybersecurity, software, automation, analytics, BPO, KPO, and consulting.',
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="The Ecosystem"
        title={
          <>
            One ecosystem for
            <br />
            <span className="text-gradient">every capability.</span>
          </>
        }
        description="ELSxGlobal is not a menu of services. It is an interconnected ecosystem where every capability reinforces the others — so your transformation is coherent, not fragmented."
      />

      <section className="relative py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((s) => (
              <Link
                key={s.name}
                href={s.href}
                className="group glass rounded-2xl p-6 hover:border-primary/40 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors">
                    <s.icon className="h-6 w-6 text-primary" />
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-lg font-semibold mb-1">{s.name}</h3>
                <p className="text-sm text-primary font-medium mb-3">
                  {s.tagline}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {s.desc}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {s.capabilities.map((c) => (
                    <span
                      key={c}
                      className="text-[10px] text-muted-foreground bg-muted/40 px-2 py-1 rounded-md border border-border/40"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
