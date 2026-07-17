'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu, X, ChevronDown, ArrowRight, Server, Globe, Database,
  Cpu, Cloud, Mail, Layout, KeyRound, ShoppingCart, Plus, Building2,
  MapPin, BookOpen, FileText, Users, Phone, Briefcase, ShieldCheck,
  Zap, Network,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLead } from '@/components/site/lead-context';
import { cn } from '@/lib/utils';
import { Logo } from './logo';

type IconType = typeof Server;

interface MegaMenuItem {
  label: string;
  href: string;
  desc: string;
  icon: IconType;
}

interface MegaMenuColumn {
  heading: string;
  items: MegaMenuItem[];
}

interface MegaMenuConfig {
  columns: MegaMenuColumn[];
  footerLink: { label: string; href: string };
}

const ENTERPRISE_MENU: MegaMenuConfig = {
  columns: [
    {
      heading: 'Development',
      items: [
        { label: 'Custom Software', href: '/software', desc: 'Enterprise applications', icon: Code },
        { label: 'Website Development', href: '/website-development', desc: 'Web & e-commerce', icon: Globe },
      ],
    },
    {
      heading: 'Intelligence',
      items: [
        { label: 'AI & Machine Learning', href: '/ai-solutions', desc: 'Predictive analytics', icon: Cpu },
        { label: 'Cloud Infrastructure', href: '/cloud', desc: 'AWS, Azure, GCP', icon: Cloud },
      ],
    },
    {
      heading: 'Enterprise Systems',
      items: [
        { label: 'ERP & CRM', href: '/erp-crm', desc: 'Odoo, Salesforce', icon: Database },
        { label: 'Cybersecurity', href: '/cybersecurity', desc: 'Zero-trust security', icon: ShieldCheck },
      ],
    },
    {
      heading: 'Growth & Ops',
      items: [
        { label: 'Digital Marketing', href: '/digital-marketing', desc: 'SEO, PPC, social', icon: Zap },
        { label: 'BPO & KPO', href: '/bpo-kpo', desc: 'Outsourcing services', icon: Briefcase },
      ],
    },
  ],
  footerLink: { label: 'View All Enterprise Services', href: '/services' },
};

const VAULTHOST_MENU: MegaMenuConfig = {
  columns: [
    {
      heading: 'Hosting Plans',
      items: [
        { label: 'Shared Hosting', href: '/vaulthost/shared', desc: 'From Rs 99/mo', icon: Globe },
        { label: 'WordPress Hosting', href: '/vaulthost/wordpress', desc: 'Managed WP', icon: Database },
        { label: 'VPS Hosting', href: '/vaulthost/vps', desc: 'From Rs 499/mo', icon: Cpu },
        { label: 'Cloud Hosting', href: '/vaulthost/cloud', desc: 'Auto-scaling', icon: Cloud },
        { label: 'Dedicated Servers', href: '/vaulthost/dedicated', desc: 'From Rs 4999/mo', icon: Server },
      ],
    },
    {
      heading: 'Products & Tools',
      items: [
        { label: 'Domain Registration', href: '/vaulthost/domains', desc: 'Search 15+ TLDs', icon: ShoppingCart },
        { label: 'SSL Certificates', href: '/vaulthost/ssl', desc: 'From Rs 99/mo', icon: KeyRound },
        { label: 'Professional Email', href: '/vaulthost/email', desc: 'From Rs 49/mo', icon: Mail },
        { label: 'Website Builder', href: '/vaulthost/website-builder', desc: 'AI-powered', icon: Layout },
        { label: 'Add-ons Marketplace', href: '/vaulthost/addons', desc: 'Backups, CDN, IPs', icon: Plus },
      ],
    },
    {
      heading: 'Resources',
      items: [
        { label: 'Compare Plans', href: '/vaulthost/compare', desc: 'Side-by-side', icon: Server },
        { label: 'Knowledge Base', href: '/vaulthost/kb', desc: 'Guides & tutorials', icon: BookOpen },
      ],
    },
  ],
  footerLink: { label: 'Explore All VaultHost Plans', href: '/vaulthost' },
};

const INDUSTRIES_MENU: MegaMenuConfig = {
  columns: [
    {
      heading: 'Industries',
      items: [
        { label: 'Manufacturing', href: '/industries/manufacturing', desc: 'Industry 4.0', icon: Building2 },
        { label: 'Healthcare', href: '/industries/healthcare', desc: 'EMR & telemedicine', icon: ShieldCheck },
        { label: 'Financial Services', href: '/industries/financial-services', desc: 'Fintech & banking', icon: Database },
        { label: 'Retail & E-commerce', href: '/industries/retail', desc: 'Omnichannel', icon: ShoppingCart },
      ],
    },
    {
      heading: 'More Industries',
      items: [
        { label: 'Logistics & Transport', href: '/industries/logistics', desc: 'Fleet & warehouse', icon: Network },
        { label: 'Real Estate', href: '/industries/real-estate', desc: 'Property management', icon: Building2 },
        { label: 'Education', href: '/industries/education', desc: 'EdTech & LMS', icon: BookOpen },
      ],
    },
    {
      heading: 'Locations',
      items: [
        { label: 'Mumbai', href: '/locations/mumbai', desc: 'Maharashtra', icon: MapPin },
        { label: 'Bangalore', href: '/locations/bangalore', desc: 'Karnataka', icon: MapPin },
        { label: 'Dubai', href: '/locations/dubai', desc: 'UAE', icon: MapPin },
        { label: 'Singapore', href: '/locations/singapore', desc: 'APAC hub', icon: MapPin },
        { label: 'All Locations', href: '/locations', desc: '15+ cities', icon: Globe },
      ],
    },
  ],
  footerLink: { label: 'View All Industries', href: '/industries' },
};

const COMPANY_MENU: MegaMenuConfig = {
  columns: [
    {
      heading: 'Company',
      items: [
        { label: 'About Us', href: '/about', desc: 'Our story & mission', icon: Users },
        { label: 'Case Studies', href: '/case-studies', desc: 'Client success stories', icon: FileText },
        { label: 'Careers', href: '/careers', desc: 'Join our team', icon: Briefcase },
        { label: 'Contact', href: '/contact', desc: 'Get in touch', icon: Phone },
      ],
    },
    {
      heading: 'Resources',
      items: [
        { label: 'Blog', href: '/blog', desc: 'Insights & articles', icon: BookOpen },
        { label: 'Resources Hub', href: '/resources', desc: 'Guides & whitepapers', icon: FileText },
        { label: 'Compare Services', href: '/compare', desc: 'Find your fit', icon: Server },
      ],
    },
  ],
  footerLink: { label: 'About EvolucentSphere', href: '/about' },
};

const NAV_PILLARS: { label: string; href: string; menu: MegaMenuConfig }[] = [
  { label: 'Enterprise Services', href: '/services', menu: ENTERPRISE_MENU },
  { label: 'VaultHost', href: '/vaulthost', menu: VAULTHOST_MENU },
  { label: 'Industries & Locations', href: '/industries', menu: INDUSTRIES_MENU },
  { label: 'Company & Resources', href: '/about', menu: COMPANY_MENU },
];

function Code(props: React.ComponentProps<typeof Server>) {
  return <FileText {...props} />;
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
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
    setOpenMenu(null);
    setMobileExpanded(null);
  }, [pathname]);

  const isActive = (href: string) =>
    pathname === href || (href !== '/' && pathname.startsWith(href));

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-300',
        scrolled ? 'liquid-glass-nav' : 'bg-transparent'
      )}
      onMouseLeave={() => setOpenMenu(null)}
    >
      {/* Utility Bar — An EvolucentSphere Company */}
      <div className="hidden lg:block bg-foreground text-background/80 text-xs">
        <div className="container-wide px-4 sm:px-6 lg:px-8 flex items-center justify-between h-8">
          <div className="flex items-center gap-2">
            <Building2 className="h-3 w-3 opacity-60" />
            <span className="opacity-70">An</span>
            <a
              href="https://evolucentsphere.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:text-primary transition-colors"
            >
              EvolucentSphere
            </a>
            <span className="opacity-70">Company</span>
          </div>
          <div className="flex items-center gap-4 opacity-60">
            <a href="tel:+917247558873" className="hover:text-primary transition-colors">+91 72475 58873</a>
            <span className="text-border">|</span>
            <a href="mailto:contact@elsxglobal.com" className="hover:text-primary transition-colors">contact@elsxglobal.com</a>
          </div>
        </div>
      </div>

      <nav className="container-wide px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <Logo className="h-8 w-8" />
            <span className="text-base font-semibold">
              ELS<span className="text-primary">x</span>Global
            </span>
          </Link>

          {/* Desktop: 4 Pillar Mega-Menus */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_PILLARS.map((pillar) => (
              <div
                key={pillar.label}
                className="relative"
                onMouseEnter={() => setOpenMenu(pillar.label)}
              >
                <button
                  className={cn(
                    'flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                    isActive(pillar.href)
                      ? 'text-foreground bg-muted/50'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
                  )}
                >
                  {pillar.label}
                  <ChevronDown
                    className={cn(
                      'h-3.5 w-3.5 transition-transform duration-200',
                      openMenu === pillar.label ? 'rotate-180' : ''
                    )}
                  />
                </button>

                {openMenu === pillar.label && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[680px] animate-fade-in">
                    <div className="glass-heavy rounded-2xl p-5">
                      <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                        {pillar.menu.columns.map((col) => (
                          <div key={col.heading}>
                            <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-2 mt-3">
                              {col.heading}
                            </p>
                            {col.items.map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                className="flex items-start gap-3 rounded-xl px-3 py-2.5 hover:bg-primary/10 transition-all duration-200 group"
                              >
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 group-hover:scale-110 transition-transform">
                                  <item.icon className="h-4 w-4 text-primary" />
                                </div>
                                <div className="min-w-0">
                                  <p className="text-sm font-medium group-hover:text-primary transition-colors">
                                    {item.label}
                                  </p>
                                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        ))}
                      </div>
                      <div className="glass-divider my-4" />
                      <Link
                        href={pillar.menu.footerLink.href}
                        className="flex items-center justify-center gap-2 rounded-xl px-4 py-3 glass-button"
                      >
                        {pillar.menu.footerLink.label}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/portal"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Portal
            </Link>
            <Button size="sm" onClick={() => openLead('consultation')} className="btn-primary">
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

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden glass-overlay max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="px-4 py-5 space-y-2">
            {NAV_PILLARS.map((pillar) => (
              <div key={pillar.label}>
                <button
                  onClick={() =>
                    setMobileExpanded(mobileExpanded === pillar.label ? null : pillar.label)
                  }
                  className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground rounded-xl hover:bg-primary/5 transition-colors"
                >
                  {pillar.label}
                  <ChevronDown
                    className={cn(
                      'h-4 w-4 transition-transform',
                      mobileExpanded === pillar.label ? 'rotate-180' : ''
                    )}
                  />
                </button>
                {mobileExpanded === pillar.label && (
                  <div className="ml-4 pl-4 border-l border-primary/20 space-y-1 mt-1">
                    {pillar.menu.columns.map((col) => (
                      <div key={col.heading}>
                        <p className="text-xs font-semibold text-primary uppercase tracking-wide mt-3 mb-1 px-2">
                          {col.heading}
                        </p>
                        {col.items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-2 px-4 py-2.5 text-sm text-muted-foreground hover:text-primary rounded-lg transition-colors"
                          >
                            <item.icon className="h-3.5 w-3.5" />
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4 border-t border-border space-y-2">
              <Link
                href="/portal"
                className="block px-4 py-3 text-sm font-medium text-muted-foreground hover:text-primary rounded-xl hover:bg-primary/5 transition-colors"
              >
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
