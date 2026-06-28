'use client';

import {
  ShoppingCart,
  Users,
  Package,
  UserCog,
  Wallet,
  Settings,
  FolderKanban,
  TrendingUp,
  TrendingDown,
  type LucideIcon,
} from 'lucide-react';
import { SectionHeading } from '@/components/site/section-heading';
import { cn } from '@/lib/utils';

const MODULES: { icon: LucideIcon; label: string; value: string; change: string; up: boolean }[] = [
  { icon: ShoppingCart, label: 'Sales', value: '₹2.4 Cr', change: '+18.2%', up: true },
  { icon: Users, label: 'CRM', value: '12,847', change: '+12.4%', up: true },
  { icon: Package, label: 'Inventory', value: '94%', change: '+2.1%', up: true },
  { icon: UserCog, label: 'HR', value: '248', change: '+4.0%', up: true },
  { icon: Wallet, label: 'Finance', value: '₹847 L', change: '-3.2%', up: false },
  { icon: Settings, label: 'Operations', value: '97%', change: '+1.8%', up: true },
  { icon: FolderKanban, label: 'Projects', value: '18/22', change: '+6', up: true },
];

const MONTHLY_DATA = [42, 58, 51, 67, 72, 64, 78, 85, 79, 92, 88, 96];

export function CommandCenter() {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden bg-card/20">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="ERP & CRM Command Center"
          title={
            <>
              Complete Visibility Across
              <br />
              <span className="text-gradient">Your Organization</span>
            </>
          }
          description="No more guessing. No more spreadsheet silos. One unified command center for every business function — with real-time intelligence on every metric that matters."
        />

        <div className="mt-16 glass-strong rounded-xl p-6 sm:p-8">
          {/* Key Metrics */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {MODULES.slice(0, 4).map((m) => (
              <div
                key={m.label}
                className="rounded-lg bg-card/50 border border-border p-5 hover:border-primary/30 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <m.icon className="h-5 w-5 text-muted-foreground" />
                  <span
                    className={cn(
                      'flex items-center gap-1 text-xs font-medium',
                      m.up ? 'text-success' : 'text-destructive'
                    )}
                  >
                    {m.up ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    {m.change}
                  </span>
                </div>
                <p className="text-2xl font-semibold">{m.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{m.label}</p>
              </div>
            ))}
          </div>

          {/* Chart and Additional Modules */}
          <div className="grid lg:grid-cols-12 gap-6">
            {/* Revenue Trend Chart */}
            <div className="lg:col-span-7 rounded-lg bg-card/50 border border-border p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-base font-semibold">Revenue Trend</p>
                  <p className="text-xs text-muted-foreground">Last 12 months</p>
                </div>
                <div className="flex gap-2">
                  {['1M', '6M', '1Y'].map((p, i) => (
                    <span
                      key={p}
                      className={cn(
                        'text-xs px-3 py-1 rounded-md cursor-pointer transition-colors',
                        i === 2
                          ? 'bg-primary/15 text-primary'
                          : 'text-muted-foreground bg-card/50 hover:bg-card'
                      )}
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-end justify-between gap-2 h-32">
                {MONTHLY_DATA.map((v, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t bg-primary/70 hover:bg-primary transition-colors"
                    style={{ height: `${v}%` }}
                  />
                ))}
              </div>
              <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                <span>Jan</span>
                <span>Jun</span>
                <span>Dec</span>
              </div>
            </div>

            {/* Additional Modules */}
            <div className="lg:col-span-5 space-y-4">
              {MODULES.slice(4).map((m) => (
                <div
                  key={m.label}
                  className="flex items-center justify-between rounded-lg bg-card/50 border border-border p-4"
                >
                  <div className="flex items-center gap-3">
                    <m.icon className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{m.label}</p>
                      <p className="text-xs text-muted-foreground">{m.change}</p>
                    </div>
                  </div>
                  <p className="text-lg font-semibold">{m.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* System Status */}
          <div className="mt-6 pt-6 border-t border-border">
            <div className="flex flex-wrap items-center gap-6">
              <span className="text-sm text-muted-foreground">System Status:</span>
              {[
                { name: 'API Gateway', status: 'Operational' },
                { name: 'Database', status: 'Operational' },
                { name: 'AI Services', status: 'Operational' },
              ].map((s) => (
                <div key={s.name} className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-success" />
                  <span className="text-sm text-muted-foreground">{s.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
