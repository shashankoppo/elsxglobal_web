import Link from 'next/link';
import { ArrowUpRight, Clock } from 'lucide-react';
import { SectionHeading } from '@/components/site/section-heading';

const FEATURED = {
  category: 'AI & Automation',
  title: 'Why most AI initiatives fail — and how to make yours succeed',
  excerpt:
    'The gap between AI ambition and AI outcomes is almost always an execution problem, not a technology problem. Here is the framework that closes it.',
  readTime: '8 min',
  date: 'Jun 2026',
};

const ARTICLES = [
  {
    category: 'Cloud Infrastructure',
    title: 'The hidden cost of over-provisioned cloud infrastructure',
    readTime: '6 min',
    date: 'Jun 2026',
  },
  {
    category: 'ERP & CRM',
    title: 'Unified systems: the foundation of intelligent enterprises',
    readTime: '7 min',
    date: 'May 2026',
  },
  {
    category: 'Cybersecurity',
    title: 'Zero-trust is not a product. It is an architecture.',
    readTime: '5 min',
    date: 'May 2026',
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  'AI & Automation': 'text-primary bg-primary/10',
  'Cloud Infrastructure': 'text-chart-4 bg-chart-4/10',
  'ERP & CRM': 'text-accent bg-accent/10',
  Cybersecurity: 'text-destructive bg-destructive/10',
};

export function ResourceHubTeaser() {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden bg-card/20">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Enterprise Intelligence"
          title={
            <>
              Perspectives That Shape
              <br />
              <span className="text-gradient">Better Decisions</span>
            </>
          }
        />

        <div className="mt-16 grid lg:grid-cols-2 gap-6">
          <Link
            href="/blog"
            className="group liquid-glass-strong rounded-xl p-6 hover:border-primary/30 transition-colors flex flex-col"
          >
            <div className="flex items-center justify-between mb-4">
              <span className={`text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded ${CATEGORY_COLORS[FEATURED.category]}`}>
                {FEATURED.category}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {FEATURED.readTime}
              </span>
            </div>
            <h3 className="text-xl font-semibold mb-3 leading-tight group-hover:text-primary transition-colors">
              {FEATURED.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
              {FEATURED.excerpt}
            </p>
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <span className="text-xs text-muted-foreground">{FEATURED.date}</span>
              <span className="flex items-center gap-1 text-sm font-medium text-primary">
                Read Article
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
          </Link>

          <div className="space-y-3">
            {ARTICLES.map((a) => (
              <Link
                key={a.title}
                href="/blog"
                className="group liquid-glass-card rounded-lg p-4 hover:border-primary/30 transition-colors block"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded ${CATEGORY_COLORS[a.category]}`}>
                    {a.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {a.readTime}
                  </span>
                </div>
                <h3 className="text-sm font-semibold leading-tight group-hover:text-primary transition-colors">
                  {a.title}
                </h3>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-muted-foreground">{a.date}</span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-primary transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
