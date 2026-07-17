import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Panel | ELSxGlobal',
  description: 'ELSxGlobal administration dashboard',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="pt-24">{children}</div>;
}
