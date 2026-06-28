import Link from 'next/link';
import { Logo } from './logo';

const SERVICES = [
  { label: 'Custom Software Development', href: '/software' },
  { label: 'Website Development', href: '/website-development' },
  { label: 'AI & Machine Learning', href: '/ai-solutions' },
  { label: 'ERP & CRM', href: '/erp-crm' },
  { label: 'Cloud Infrastructure', href: '/cloud' },
  { label: 'Digital Marketing', href: '/digital-marketing' },
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
            <p className="text-sm text-muted-foreground max-w-sm mb-6 leading-relaxed">
              Enterprise technology partner delivering custom software, cloud, AI,
              and digital solutions across India and globally. A division of EvolucentSphere Pvt. Ltd.
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

          {/* Locations */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider mb-4">Locations</h4>
            <ul className="space-y-2">
              {LOCATIONS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} ELSxGlobal. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
