import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className={cn(className)}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="els-logo" x1="0" y1="0" x2="40" y2="40">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="50%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
      <rect
        x="2"
        y="2"
        width="36"
        height="36"
        rx="10"
        stroke="url(#els-logo)"
        strokeWidth="1.5"
        opacity="0.4"
      />
      <circle cx="20" cy="20" r="5" fill="url(#els-logo)" />
      <circle cx="20" cy="20" r="9" stroke="url(#els-logo)" strokeWidth="1.2" opacity="0.5" />
      <circle cx="20" cy="20" r="14" stroke="url(#els-logo)" strokeWidth="0.8" opacity="0.3" />
      <circle cx="20" cy="6" r="1.6" fill="#3B82F6" />
      <circle cx="34" cy="20" r="1.6" fill="#6366F1" />
      <circle cx="20" cy="34" r="1.6" fill="#8B5CF6" />
      <circle cx="6" cy="20" r="1.6" fill="#3B82F6" />
    </svg>
  );
}
