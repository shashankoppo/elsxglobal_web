'use client';

import { CheckCircle } from 'lucide-react';

const TRUST_ITEMS = [
  'ISO 27001 Certified',
  'AWS Partner',
  'Microsoft Partner',
  'Google Cloud Partner',
  '200+ Projects Delivered',
  'Fortune 500 Clients',
];

export function TrustBar() {
  return (
    <section className="border-y border-border/50 bg-muted/20 py-8">
      <div className="container-wide px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {TRUST_ITEMS.map((item) => (
            <div key={item} className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
