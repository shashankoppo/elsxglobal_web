import { AuroraBackground } from '@/components/site/aurora-background';
import { cn } from '@/lib/utils';

export function PageHero({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn('relative pt-32 pb-20 overflow-hidden', className)}>
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 grid-bg opacity-20" />
      <AuroraBackground />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background via-background/80 to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {eyebrow && (
            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-3.5 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-sm animate-fade-up">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-glow" />
              {eyebrow}
            </div>
          )}
          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05] animate-fade-up" style={{ animationDelay: '0.1s' }}>
            {title}
          </h1>
          {description && (
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl animate-fade-up" style={{ animationDelay: '0.2s' }}>
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
