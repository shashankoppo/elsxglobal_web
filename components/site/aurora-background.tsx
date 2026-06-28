import { cn } from '@/lib/utils';

export function AuroraBackground({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden',
        className
      )}
      aria-hidden="true"
    >
      {/* Very subtle gradient orbs */}
      <div className="absolute -top-20 left-1/4 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[100px]" />
      <div className="absolute top-1/3 -right-10 h-[350px] w-[350px] rounded-full bg-accent/4 blur-[100px]" />
    </div>
  );
}
