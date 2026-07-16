import Link from 'next/link';
import { Logo } from './logo';
import { Building2, ExternalLink } from 'lucide-react';

const SERVICES = [
  { label: 'Custom Software Development', href: '/software' },
  { label: 'Website Development', href: '/website-development' },
  { label: 'AI & Machine Learning', href: '/ai-solutions' },
  { label: 'ERP & CRM', href: '/erp-crm' },
  { label: 'Cloud Infrastructure', href: '/cloud' },
  { label: 'Digital Marketing', href: '/digital-marketing' },
];

const VAULTHOST = [
  { label: 'Shared Hosting', href: '/vaulthost/shared' },
  { label: 'WordPress Hosting', href: '/vaulthost/wordpress' },
  { label: 'VPS Hosting', href: '/vaulthost/vps' },
  { label: 'Cloud Hosting', href: '/vaulthost/cloud' },
  { label: 'Dedicated Servers', href: '/vaulthost/dedicated' },
  { label: 'Email Hosting', href: '/vaulthost/email' },
  { label: 'Website Builder', href: '/vaulthost/website-builder' },
  { label: 'SSL Certificates', href: '/vaulthost/ssl' },
  { label: 'Domain Search', href: '/vaulthost/domains' },
  { label: 'Add-ons', href: '/vaulthost/addons' },
  { label: 'Compare Plans', href: '/vaulthost/compare' },
  { label: 'Knowledge Base', href: '/vaulthost/kb' },
];

const COMPANY = [
  { label: 'About Us', href: '/about' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Blog', href: '/blog' },
  { label: 'Resources', href: '/resources' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
];

const LOCATIONS = [
  { label: 'Mumbai', href: '/locations/mumbai' },
  { label: 'Delhi', href: '/locations/delhi' },
  { label: 'Bangalore', href: '/locations/bangalore' },
  { label: 'Chennai', href: '/locations/chennai' },
  { label: 'Hyderabad', href: '/locations/hyderabad' },
  { label: 'Pune', href: '/locations/pune' },
  { label: 'All Locations', href: '/locations' },
];

const INDUSTRIES = [
  { label: 'Manufacturing', href: '/industries/manufacturing' },
  { label: 'Healthcare', href: '/industries/healthcare' },
  { label: 'Financial Services', href: '/industries/financial-services' },
  { label: 'Retail', href: '/industries/retail' },
];

const ECOSYSTEM = [
  { label: 'EvolucentSphere Pvt. Ltd.', href: 'https://evolucentsphere.com', external: true, desc: 'Parent Company' },
  { label: 'ELSxSoftwareoverload', href: 'https://evolucentsphere.com/elsxsoftwareoverload', external: true, desc: 'Software Division' },
  { label: 'ELSxTech', href: 'https://elsxtech.blogspot.com', external: true, desc: 'Tech Consulting' },
  { label: 'VaultHost', href: '/vaulthost', external: false, desc: 'Hosting Infrastructure' },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container-wide px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-4">
              <Logo className="h-8 w-8" />
              <span className="text-lg font-semibold">
                ELS<span className="text-primary">x</span>Global
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm mb-4 leading-relaxed">
              Enterprise technology partner delivering custom software, cloud, AI,
              and digital solutions across India and globally.
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
              <Building2 className="h-3.5 w-3.5" />
              <span>A division of</span>
              <a
                href="https://evolucentsphere.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                EvolucentSphere Pvt. Ltd.
              </a>
            </div>
            <p className="text-xs text-muted-foreground">
              Jabalpur, Madhya Pradesh, India
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider mb-4">Services</h4>
            <ul className="space-y-2">
              {SERVICES.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* VaultHost */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider mb-4">VaultHost</h4>
            <ul className="space-y-2">
              {VAULTHOST.map((v) => (
                <li key={v.href}>
                  <Link href={v.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {v.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider mb-4">Industries</h4>
            <ul className="space-y-2">
              {INDUSTRIES.map((i) => (
                <li key={i.href}>
                  <Link href={i.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2">
              {COMPANY.map((c) => (
                <li key={c.href}>
                  <Link href={c.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Ecosystem Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider mb-3 text-muted-foreground">
                EvolucentSphere Ecosystem
              </h4>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                {ECOSYSTEM.map((e) => (
                  <a
                    key={e.label}
                    href={e.href}
                    {...(e.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {e.label}
                    <span className="text-xs text-muted-foreground/60">({e.desc})</span>
                    {e.external && (
                      <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} ELSxGlobal, a division of EvolucentSphere Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <Link href="/portal" className="hover:text-foreground transition-colors">
              Client Portal
            </Link>
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <a
              href="https://evolucentsphere.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              Parent Company
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
