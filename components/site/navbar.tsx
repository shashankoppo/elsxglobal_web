'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLead } from '@/components/site/lead-context';
import { cn } from '@/lib/utils';
import { Logo } from './logo';

const SERVICES = [
  { label: 'Custom Software Development', href: '/software', desc: 'Enterprise applications' },
  { label: 'Website Development', href: '/website-development', desc: 'Web solutions' },
  { label: 'AI & Machine Learning', href: '/ai-solutions', desc: 'Intelligent automation' },
  { label: 'ERP & CRM', href: '/erp-crm', desc: 'Enterprise systems' },
  { label: 'Cloud Infrastructure', href: '/cloud', desc: 'AWS, Azure, GCP' },
  { label: 'Cybersecurity', href: '/cybersecurity', desc: 'Zero-trust security' },
  { label: 'Digital Marketing', href: '/digital-marketing', desc: 'Growth marketing' },
  { label: 'BPO & KPO', href: '/bpo-kpo', desc: 'Outsourcing services' },
];

const NAV = [
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services', hasDropdown: true },
  { label: 'Industries', href: '/industries', hasDropdown: false },
  { label: 'Locations', href: '/locations' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Resources', href: '/resources' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const pathname = usePathname();
  const { openLead } = useLead();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    pathname === href || (href !== '/' && pathname.startsWith(href));

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-300',
        scrolled
          ? 'liquid-glass-nav'
          : 'bg-transparent'
      )}
    >
      <nav className="container-wide px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <Logo className="h-8 w-8" />
            <span className="text-base font-semibold">
              ELS<span className="text-primary">x</span>Global
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {NAV.map((item) =>
              item.hasDropdown ? (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <button
                    className={cn(
                      'flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                      isActive(item.href)
                        ? 'text-foreground bg-muted/50'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
                    )}
                  >
                    {item.label}
                    <ChevronDown className="h-3.5 w-3.5" />
                  </button>

                  {servicesOpen && (
                    <div className="absolute top-full left-0 pt-3 w-[360px] animate-fade-in">
                      <div className="glass-heavy rounded-2xl p-3">
                        {SERVICES.map((s) => (
                          <Link
                            key={s.href}
                            href={s.href}
                            className="flex items-center justify-between rounded-xl px-4 py-3 hover:bg-primary/10 transition-all duration-200 group"
                          >
                            <div>
                              <p className="text-sm font-medium group-hover:text-primary transition-colors">{s.label}</p>
                              <p className="text-xs text-muted-foreground">{s.desc}</p>
                            </div>
                            <ArrowRight className="h-4 w-4 text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" />
                          </Link>
                        ))}
                        <div className="glass-divider mt-3 mb-2" />
                        <Link
                          href="/services"
                          className="flex items-center justify-center gap-2 rounded-xl px-4 py-3 glass-button"
                        >
                          View All Services
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                    isActive(item.href)
                      ? 'text-foreground bg-muted/50'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
                  )}
                >
                  {item.label}
                </Link>
              )
            )}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Button
              size="sm"
              onClick={() => openLead('consultation')}
              className="btn-primary"
            >
              Get Consultation
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Button>
          </div>

          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="lg:hidden glass-overlay max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="px-4 py-5 space-y-2">
            {NAV.map((item) =>
              item.hasDropdown ? (
                <div key={item.href}>
                  <button
                    onClick={() => setMobileServicesOpen((v) => !v)}
                    className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground rounded-xl hover:bg-primary/5 transition-colors"
                  >
                    {item.label}
                    <ChevronDown className={cn('h-4 w-4 transition-transform', mobileServicesOpen ? 'rotate-180' : '')} />
                  </button>
                  {mobileServicesOpen && (
                    <div className="ml-4 pl-4 border-l border-primary/20 space-y-1 mt-1">
                      {SERVICES.map((s) => (
                        <Link
                          key={s.href}
                          href={s.href}
                          className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-primary rounded-lg transition-colors"
                        >
                          {s.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'block px-4 py-3 text-sm font-medium rounded-xl transition-colors',
                    isActive(item.href)
                      ? 'text-primary bg-primary/10 liquid-glass-badge'
                      : 'text-muted-foreground hover:text-foreground hover:bg-primary/5'
                  )}
                >
                  {item.label}
                </Link>
              )
            )}
            <div className="pt-4">
              <Button
                className="w-full btn-primary h-12"
                onClick={() => openLead('consultation')}
              >
                Get Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
