'use client';

import { useEffect, useState } from 'react';

export function PageLoader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const duration = 1600;

    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setDone(true), 200);
        setTimeout(() => setHidden(true), 900);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (hidden) return null;

  const letters = 'ELSxGlobal'.split('');

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050811] transition-all duration-700 ${
        done ? 'opacity-0 scale-110 blur-md' : 'opacity-100 scale-100 blur-0'
      }`}
    >
      <div className="absolute inset-0 grid-bg opacity-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-primary/10 blur-[120px]" />

      <div className="relative flex items-center">
        {letters.map((ch, i) => (
          <span
            key={i}
            className={`text-4xl sm:text-5xl font-semibold tracking-tight transition-all duration-300 ${
              ch === 'x' ? 'text-primary' : 'text-foreground'
            }`}
            style={{
              opacity: progress > i * 9 ? 1 : 0,
              transform: progress > i * 9 ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: `${i * 40}ms`,
            }}
          >
            {ch}
          </span>
        ))}
      </div>

      <p
        className="mt-4 text-xs uppercase tracking-[0.3em] text-muted-foreground transition-opacity duration-500"
        style={{ opacity: progress > 60 ? 1 : 0 }}
      >
        Enterprise Transformation. Redefined.
      </p>

      <div className="absolute bottom-0 inset-x-0 h-px bg-border/40">
        <div
          className="h-full bg-gradient-to-r from-primary via-accent to-chart-3 transition-all duration-100 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
