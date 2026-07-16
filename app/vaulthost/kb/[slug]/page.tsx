import { Metadata } from 'next';
import { createMetadata } from '@/lib/seo';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Clock, ChevronRight, FileText } from 'lucide-react';

const ARTICLES: { slug: string; title: string; category: string; excerpt: string; content: string }[] = [
  { slug: 'getting-started-guide', title: 'Getting Started with VaultHost', category: 'getting-started', excerpt: 'Everything you need to know to set up your first hosting account.', content: `## Welcome to VaultHost\n\nVaultHost is ELSxGlobal enterprise hosting platform.\n\n### 1. Create Your Account\n\nVisit our signup page and create your account with your email address.\n\n### 2. Browse Hosting Plans\n\nVisit the VaultHost marketplace to browse our hosting plans. We offer shared, WordPress, VPS, cloud, and dedicated hosting.\n\n### 3. Choose a Plan\n\nCompare plans on our comparison page to find the right fit.\n\n### 4. Complete Checkout\n\nSelect a plan, choose your billing cycle, and complete checkout via Razorpay, UPI, or bank transfer.\n\n### 5. Access Your Service\n\nAfter payment, your service enters provisioning status. Shared hosting is ready within minutes.\n\n### 6. Manage from the Portal\n\nVisit your client portal to manage your services, view invoices, open support tickets, and more.` },
  { slug: 'cpanel-guide', title: 'Complete cPanel Guide', category: 'shared-hosting', excerpt: 'Learn how to use cPanel to manage your website, email, and databases.', content: `## cPanel Overview\n\ncPanel is the web hosting control panel included with all VaultHost shared hosting plans.\n\n### Accessing cPanel\n\n1. Log in to your client portal\n2. Go to My Hosting\n3. Click Open next to the Control Panel link\n\n### Key Features\n\n- File Manager: Upload and manage website files\n- Email Accounts: Create and manage email addresses\n- Databases: Create MySQL databases\n- Domains: Add addon domains and subdomains\n- SSL/TLS: Manage SSL certificates\n- Backups: Create and restore backups` },
  { slug: 'vps-setup-guide', title: 'Setting Up Your VPS', category: 'vps-dedicated', excerpt: 'A step-by-step guide to configuring your new VPS from scratch.', content: `## VPS Setup Guide\n\n### 1. Choose Your OS\n\nUbuntu, Debian, AlmaLinux, Rocky Linux, or Windows Server.\n\n### 2. Connect via SSH\n\nssh root@your-server-ip\n\n### 3. Update Your System\n\napt update && apt upgrade -y\n\n### 4. Create a Non-root User\n\nadduser deploy\nusermod -aG sudo deploy\n\n### 5. Configure Firewall\n\nufw allow OpenSSH\nufw allow 80\nufw allow 443\nufw enable` },
  { slug: 'wordpress-installation', title: 'Installing WordPress on VaultHost', category: 'wordpress', excerpt: 'One-click WordPress installation and manual setup methods.', content: `## WordPress Installation\n\n### Method 1: One-Click Install\n\n1. Log in to your client portal\n2. Go to My Hosting and click your WordPress hosting service\n3. Click Open Control Panel\n4. Navigate to the WordPress section\n5. Click Install WordPress\n6. Fill in your site title, admin username, and password\n7. Click Install\n\n### Method 2: Manual Install\n\n1. Download WordPress from wordpress.org\n2. Upload the files to your hosting via FTP or File Manager\n3. Create a MySQL database\n4. Visit your domain to run the WordPress setup wizard` },
  { slug: 'ssl-setup', title: 'SSL Certificate Setup', category: 'security', excerpt: 'How to install and manage free SSL certificates on your hosting.', content: `## SSL Certificate Setup\n\nAll VaultHost plans include free SSL certificates.\n\n### Automatic SSL\n\nSSL certificates are automatically provisioned for all domains added to your hosting account.\n\n### Force HTTPS Redirect\n\nAdd this to your .htaccess file:\n\nRewriteEngine On\nRewriteCond %{HTTPS} off\nRewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]\n\n### SSL Renewal\n\nAll SSL certificates auto-renew 30 days before expiry.` },
  { slug: 'payment-methods', title: 'Payment Methods and Billing', category: 'billing', excerpt: 'Understanding your billing cycle, payment options, and invoices.', content: `## Payment Methods\n\n### 1. Razorpay (Recommended)\n\nPay via card, UPI, netbanking, or wallet. Payments are processed instantly.\n\n### 2. UPI Direct\n\nPay directly to our UPI ID. After payment, confirm in the checkout flow.\n\n### 3. Bank Transfer\n\nTransfer via NEFT/IMPS/RTGS. Use your order ID as reference.\n\n### Billing Cycles\n\n- Monthly: Billed every month\n- Annual: Billed once per year with 17% savings\n\n### Coupons\n\nUse coupon code VAULT10 for 10% off your first order.\n\n### Refunds\n\n30-day money-back guarantee on shared and WordPress hosting plans.` },
  { slug: 'ssh-access-vps', title: 'SSH Access on VPS', category: 'vps-dedicated', excerpt: 'How to connect to your VPS via SSH and set up key-based authentication.', content: `## SSH Access to Your VPS\n\n### Connecting via SSH\n\nssh root@your-server-ip\n\n### Setting Up SSH Keys\n\n1. Generate a key pair: ssh-keygen -t ed25519\n2. Copy your public key: ssh-copy-id root@your-server-ip\n3. Disable password authentication in /etc/ssh/sshd_config\n4. Restart SSH: systemctl restart sshd` },
  { slug: 'email-setup', title: 'Email Account Setup', category: 'shared-hosting', excerpt: 'Create and configure email accounts for your domain.', content: `## Email Account Setup\n\n### Creating an Email Account\n\n1. Log in to cPanel\n2. Navigate to Email then Email Accounts\n3. Click Create\n4. Enter the email address and set a password\n5. Click Create Account\n\n### Accessing Webmail\n\nVisit webmail.yourdomain.com and log in with your email address and password.` },
  { slug: 'wordpress-staging', title: 'Using WordPress Staging Sites', category: 'wordpress', excerpt: 'Test changes on a staging copy before going live.', content: `## WordPress Staging Sites\n\n### Creating a Staging Site\n\n1. Log in to your WordPress hosting control panel\n2. Navigate to the Staging section\n3. Click Create Staging Site\n4. Access your staging site at staging.yourdomain.com\n\n### Pushing to Production\n\n1. In the Staging section, click Push to Production\n2. Choose what to push\n3. Click Push` },
  { slug: 'ddos-protection', title: 'Understanding DDoS Protection', category: 'security', excerpt: 'How our DDoS mitigation works and what it protects against.', content: `## DDoS Protection\n\nAll VaultHost plans include enterprise-grade DDoS protection.\n\n### How It Works\n\n1. Traffic Monitoring: All incoming traffic is continuously monitored\n2. Attack Detection: Anomalous traffic patterns are detected within seconds\n3. Traffic Scrubbing: Malicious traffic is diverted to scrubbing centers\n4. Clean Traffic Delivery: Only legitimate traffic reaches your server\n\n### What to Do During an Attack\n\nDo not panic. Our system detects and mitigates automatically. If your site is still affected, open a support ticket.` },
  { slug: 'backup-restore', title: 'Backup and Restore Guide', category: 'getting-started', excerpt: 'How to create, manage, and restore from backups.', content: `## Backup and Restore\n\n### Automatic Daily Backups\n\nAll VaultHost plans include automatic daily backups.\n\n- Shared/WordPress: 7 days retention\n- VPS: 14 days retention\n- Cloud: 30 days retention\n- Dedicated: 30 days retention\n\n### Restoring from Backup\n\n1. Log in to your client portal\n2. Go to My Hosting and select your service\n3. Click Restore Backup\n4. Choose the backup date\n5. Click Restore` },
  { slug: 'upgrade-plan', title: 'Upgrading Your Hosting Plan', category: 'billing', excerpt: 'How to upgrade to a higher tier plan without downtime.', content: `## Upgrading Your Hosting Plan\n\n### How Upgrades Work\n\nWhen you upgrade, we create a new order, migrate your data, update DNS, and cancel your old subscription.\n\n### Upgrade Steps\n\n1. Log in to your client portal\n2. Go to My Hosting and select your current service\n3. Click Upgrade\n4. Choose your new plan\n5. Complete checkout\n\n### No Downtime Guarantee\n\nAll upgrades are performed with zero downtime.` },
];

interface Props { params: { slug: string }; }

export function generateStaticParams() {
  return ARTICLES.map((article) => ({ slug: article.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const article = ARTICLES.find((a) => a.slug === params.slug);
  if (!article) return createMetadata({ title: 'Article Not Found' });
  return createMetadata({
    title: `${article.title} — VaultHost KB`,
    description: article.excerpt,
    canonical: `https://elsxglobal.com/vaulthost/kb/${params.slug}/`,
  });
}

export default function KBArticlePage({ params }: Props) {
  const article = ARTICLES.find((a) => a.slug === params.slug);
  if (!article) notFound();

  return (
    <div className="min-h-screen py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/vaulthost/kb" className="hover:text-foreground">Knowledge Base</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="capitalize">{article.category.replace(/-/g, ' ')}</span>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground truncate">{article.title}</span>
        </nav>

        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <BookOpen className="h-3 w-3 text-primary" />
            <span className="text-xs font-medium text-primary capitalize">{article.category.replace(/-/g, ' ')}</span>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight mb-3">{article.title}</h1>
          <p className="text-muted-foreground">{article.excerpt}</p>
          <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground"><Clock className="h-3.5 w-3.5" /><span>Updated regularly</span></div>
        </div>

        <div className="liquid-glass-card rounded-2xl p-8">
          <div className="prose prose-sm dark:prose-invert max-w-none">
            {article.content.split('\n').map((line, i) => {
              if (line.startsWith('## ')) return <h2 key={i} className="text-xl font-semibold mt-6 mb-3">{line.replace('## ', '')}</h2>;
              if (line.startsWith('### ')) return <h3 key={i} className="text-base font-semibold mt-5 mb-2">{line.replace('### ', '')}</h3>;
              if (line.startsWith('- ')) return <li key={i} className="ml-4 text-sm text-muted-foreground">{line.replace('- ', '')}</li>;
              if (line.trim() === '') return <br key={i} />;
              return <p key={i} className="text-sm text-muted-foreground leading-relaxed mb-3">{line}</p>;
            })}
          </div>
        </div>

        <div className="mt-8">
          <Link href="/vaulthost/kb" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"><ArrowLeft className="h-4 w-4" />Back to Knowledge Base</Link>
        </div>
      </div>
    </div>
  );
}
