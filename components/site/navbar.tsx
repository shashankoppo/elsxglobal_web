'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, ArrowRight, ExternalLink, Server, Globe, Database, Cpu, Cloud, Mail, Layout, KeyRound, ShoppingCart, Plus } from 'lucide-react';
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

const VAULTHOST_CATEGORIES = [
  { label: 'Shared Hosting', href: '/vaulthost/shared', desc: 'From Rs 99/mo', icon: Globe },
  { label: 'WordPress Hosting', href: '/vaulthost/wordpress', desc: 'Managed WP from Rs 199/mo', icon: Database },
  { label: 'VPS Hosting', href: '/vaulthost/vps', desc: 'From Rs 499/mo', icon: Cpu },
  { label: 'Cloud Hosting', href: '/vaulthost/cloud', desc: 'Auto-scaling from Rs 999/mo', icon: Cloud },
  { label: 'Dedicated Servers', href: '/vaulthost/dedicated', desc: 'From Rs 4999/mo', icon: Server },
  { label: 'Email Hosting', href: '/vaulthost/email', desc: 'From Rs 49/mo', icon: Mail },
  { label: 'Website Builder', href: '/vaulthost/website-builder', desc: 'AI-powered from Rs 99/mo', icon: Layout },
  { label: 'SSL Certificates', href: '/vaulthost/ssl', desc: 'From Rs 99/mo', icon: KeyRound },
];

const VAULTHOST_TOOLS = [
  { label: 'Domain Search', href: '/vaulthost/domains', desc: 'Find your perfect domain', icon: ShoppingCart },
  { label: 'Add-ons Marketplace', href: '/vaulthost/addons', desc: 'Security, performance, support', icon: Plus },
  { label: 'Compare Plans', href: '/vaulthost/compare', desc: 'Side-by-side comparison', icon: Server },
  { label: 'Knowledge Base', href: '/vaulthost/kb', desc: 'Guides and tutorials', icon: Database },
];

const NAV = [
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services', hasDropdown: true },
  { label: 'VaultHost', href: '/vaulthost', hasMegaMenu: true },
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
  const [vaultHostOpen, setVaultHostOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileVaultHostOpen, setMobileVaultHostOpen] = useState(false);
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
    setVaultHostOpen(false);
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
              item.hasMegaMenu ? (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => setVaultHostOpen(true)}
                  onMouseLeave={() => setVaultHostOpen(false)}
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

                  {vaultHostOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[640px] animate-fade-in">
                      <div className="glass-heavy rounded-2xl p-5">
                        <div className="mb-4">
                          <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">Hosting Categories</p>
                          <p className="text-xs text-muted-foreground">Enterprise-grade hosting for every need</p>
                        </div>
                        <div className="grid grid-cols-2 gap-1.5">
                          {VAULTHOST_CATEGORIES.map((c) => (
                            <Link
                              key={c.href}
                              href={c.href}
                              className="flex items-start gap-3 rounded-xl px-3 py-2.5 hover:bg-primary/10 transition-all duration-200 group"
                            >
                              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 group-hover:scale-110 transition-transform">
                                <c.icon className="h-4 w-4 text-primary" />
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-medium group-hover:text-primary transition-colors">{c.label}</p>
                                <p className="text-xs text-muted-foreground">{c.desc}</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                        <div className="glass-divider my-4" />
                        <div className="mb-3">
                          <p className="text-xs font-semibold text-primary uppercase tracking-wide">Tools & Resources</p>
                        </div>
                        <div className="grid grid-cols-2 gap-1.5 mb-4">
                          {VAULTHOST_TOOLS.map((t) => (
                            <Link
                              key={t.href}
                              href={t.href}
                              className="flex items-start gap-3 rounded-xl px-3 py-2.5 hover:bg-primary/10 transition-all duration-200 group"
                            >
                              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted border border-border">
                                <t.icon className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-medium group-hover:text-primary transition-colors">{t.label}</p>
                                <p className="text-xs text-muted-foreground">{t.desc}</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                        <Link
                          href="/vaulthost"
                          className="flex items-center justify-center gap-2 rounded-xl px-4 py-3 glass-button"
                        >
                          Explore All Hosting Plans
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ) : item.hasDropdown ? (
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
            <Link
              href="/portal"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Portal
            </Link>
            <a
              href="https://evolucentsphere.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
            >
              EvolucentSphere
              <ExternalLink className="h-3 w-3" />
            </a>
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
              item.hasMegaMenu ? (
                <div key={item.href}>
                  <button
                    onClick={() => setMobileVaultHostOpen((v) => !v)}
                    className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground rounded-xl hover:bg-primary/5 transition-colors"
                  >
                    {item.label}
                    <ChevronDown className={cn('h-4 w-4 transition-transform', mobileVaultHostOpen ? 'rotate-180' : '')} />
                  </button>
                  {mobileVaultHostOpen && (
                    <div className="ml-4 pl-4 border-l border-primary/20 space-y-1 mt-1">
                      {VAULTHOST_CATEGORIES.map((c) => (
                        <Link
                          key={c.href}
                          href={c.href}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-muted-foreground hover:text-primary rounded-lg transition-colors"
                        >
                          <c.icon className="h-3.5 w-3.5" />
                          {c.label}
                        </Link>
                      ))}
                      <div className="my-2 border-t border-border" />
                      {VAULTHOST_TOOLS.map((t) => (
                        <Link
                          key={t.href}
                          href={t.href}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-muted-foreground hover:text-primary rounded-lg transition-colors"
                        >
                          <t.icon className="h-3.5 w-3.5" />
                          {t.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : item.hasDropdown ? (
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
            <div className="pt-4 border-t border-border space-y-2">
              <Link href="/portal" className="block px-4 py-3 text-sm font-medium text-muted-foreground hover:text-primary rounded-xl hover:bg-primary/5 transition-colors">
                Client Portal
              </Link>
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
