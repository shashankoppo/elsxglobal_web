'use client';

import { MessageCircle, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  const [tooltip, setTooltip] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => setTooltip(true), 1500);
    const hideTimer = setTimeout(() => setTooltip(false), 6000);
    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, [visible]);

  const phone = '917247558873';
  const text = encodeURIComponent(
    "Hello ELSxGlobal, I'd like to learn more about your enterprise transformation services."
  );

  return (
    <div
      className={`fixed bottom-6 left-6 z-40 flex items-center gap-3 transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      {tooltip && (
        <div className="liquid-glass-strong rounded-xl px-4 py-2.5 shadow-xl animate-slide-up relative">
          <button
            onClick={() => setTooltip(false)}
            className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-muted/80 text-muted-foreground hover:text-foreground"
          >
            <X className="h-3 w-3" />
          </button>
          <p className="text-sm font-medium text-foreground">Chat with us</p>
          <p className="text-xs text-muted-foreground">We typically reply in minutes</p>
        </div>
      )}
      <a
        href={`https://wa.me/${phone}?text=${text}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 transition-all duration-300 hover:scale-110 hover:shadow-[#25D366]/50"
      >
        <MessageCircle className="h-6 w-6" />
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
        <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[9px] font-bold text-accent-foreground border-2 border-background">
          1
        </span>
      </a>
    </div>
  );
}
