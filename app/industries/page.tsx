import { PageHero } from '@/components/site/page-hero';
import { CTASection } from '@/components/site/cta-section';
import {
  Factory,
  GraduationCap,
  HeartPulse,
  HandHeart,
  Landmark,
  Banknote,
  ShoppingBag,
  Building2,
  Rocket,
  type LucideIcon,
} from 'lucide-react';

type Industry = {
  icon: LucideIcon;
  name: string;
  outcome: string;
  challenges: string[];
  solutions: string[];
};

const INDUSTRIES: Industry[] = [
  {
    icon: Factory,
    name: 'Manufacturing',
    outcome: 'From production lines to intelligent factories.',
    challenges: ['Unplanned downtime', 'Supply chain opacity', 'Quality variance'],
    solutions: ['Predictive maintenance', 'Supply chain visibility', 'Automated QC'],
  },
  {
    icon: GraduationCap,
    name: 'Education',
    outcome: 'Personalized learning at institutional scale.',
    challenges: ['Administrative overload', 'Student disengagement', 'Resource constraints'],
    solutions: ['AI-driven curricula', 'Student analytics', 'Automated administration'],
  },
  {
    icon: HeartPulse,
    name: 'Healthcare',
    outcome: 'Better outcomes through connected care.',
    challenges: ['Fragmented records', 'Regulatory compliance', 'Diagnostic delays'],
    solutions: ['Unified records', 'Compliant infrastructure', 'Predictive diagnostics'],
  },
  {
    icon: HandHeart,
    name: 'NGOs',
    outcome: 'Greater impact with leaner operations.',
    challenges: ['Limited resources', 'Donor visibility', 'Reporting burden'],
    solutions: ['Transparent reporting', 'Donor intelligence', 'Program automation'],
  },
  {
    icon: Landmark,
    name: 'Government',
    outcome: 'Public services that work at scale.',
    challenges: ['Legacy systems', 'Citizen experience', 'Data security'],
    solutions: ['Digital infrastructure', 'Citizen portals', 'Secure data platforms'],
  },
  {
    icon: Banknote,
    name: 'Financial Services',
    outcome: 'Compliance and speed without compromise.',
    challenges: ['Regulatory pressure', 'Fraud risk', 'Legacy infrastructure'],
    solutions: ['Risk analytics', 'Fraud detection', 'Regulated cloud'],
  },
  {
    icon: ShoppingBag,
    name: 'Retail',
    outcome: 'Inventory that thinks. Customers that stay.',
    challenges: ['Stockouts & overstock', 'Customer churn', 'Margin pressure'],
    solutions: ['Demand forecasting', 'Omnichannel CRM', 'Real-time pricing'],
  },
  {
    icon: Building2,
    name: 'Real Estate',
    outcome: 'Portfolios managed with total visibility.',
    challenges: ['Fragmented portfolios', 'Tenant churn', 'Manual operations'],
    solutions: ['Property analytics', 'Tenant CRM', 'Automated operations'],
  },
  {
    icon: Rocket,
    name: 'Startups',
    outcome: 'Enterprise-grade systems from day one.',
    challenges: ['Limited runway', 'Scaling infrastructure', 'Hiring constraints'],
    solutions: ['Scalable architecture', 'Rapid deployment', 'Growth-ready systems'],
  },
];

export const metadata = {
  title: 'Industries',
  description:
    'ELSxGlobal delivers transformation grounded in the specific outcomes each industry demands.',
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industry Transformation"
        title={
          <>
            Built for the realities of
            <br />
            <span className="text-gradient">your industry.</span>
          </>
        }
        description="We do not deliver generic solutions. Every transformation is grounded in the specific outcomes your industry demands — from predictive maintenance in manufacturing to compliant infrastructure in financial services."
      />

      <section className="relative py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-5">
            {INDUSTRIES.map((ind) => (
              <div
                key={ind.name}
                className="group glass rounded-2xl p-7 hover:border-primary/40 transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 shrink-0">
                    <ind.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{ind.name}</h3>
                    <p className="text-sm text-primary font-medium mt-0.5">
                      {ind.outcome}
                    </p>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-destructive/70 mb-2">
                      Challenges
                    </p>
                    <ul className="space-y-1.5">
                      {ind.challenges.map((c) => (
                        <li
                          key={c}
                          className="text-sm text-muted-foreground flex items-start gap-2"
                        >
                          <span className="text-destructive/50 mt-1">—</span>
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-primary mb-2">
                      ELSxGlobal Solutions
                    </p>
                    <ul className="space-y-1.5">
                      {ind.solutions.map((s) => (
                        <li
                          key={s}
                          className="text-sm text-foreground flex items-start gap-2"
                        >
                          <span className="text-primary mt-1">+</span>
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
