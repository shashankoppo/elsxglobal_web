'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import { Loader2, Bell, Check, Server, Receipt, LifeBuoy, LogOut, Menu, X, AlertCircle, Info, CheckCircle, Clock, LayoutDashboard, User as UserIcon } from 'lucide-react';
import Link from 'next/link';
import { Logo } from '@/components/site/logo';

interface Notification { id: string; type: string; title: string; body: string; is_read: boolean; created_at: string; }

export default function NotificationsPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ id: string; email: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const init = async () => {
      const supabase = createClient();
      const { data: authData } = await supabase.auth.getUser();
      if (!authData.data.user) { router.push('/portal/login'); return; }
      setUser({ id: authData.data.user.id, email: authData.data.user.email || '' });

      const [o, s, t] = await Promise.all([
        supabase.from('hosting_orders').select('*').eq('user_id', authData.data.user.id).order('created_at', { ascending: false }),
        supabase.from('hosting_services').select('*').eq('user_id', authData.data.user.id).order('created_at', { ascending: false }),
        supabase.from('support_tickets').select('*').eq('user_id', authData.data.user.id).order('created_at', { ascending: false }),
      ]);

      const notifs: Notification[] = [];
      (o.data || []).forEach((order: Record<string, unknown>) => notifs.push({ id: `order-${order.id}`, type: order.status === 'paid' ? 'success' : 'info', title: `Order ${order.status === 'paid' ? 'confirmed' : 'created'}`, body: `Your ${order.plan_name} plan order is ${order.status}.`, is_read: false, created_at: order.created_at as string }));
      (s.data || []).forEach((service: Record<string, unknown>) => notifs.push({ id: `service-${service.id}`, type: service.status === 'active' ? 'success' : 'info', title: `Service ${service.status === 'active' ? 'activated' : 'provisioning'}`, body: `Your ${service.plan_name} hosting service is ${service.status}.`, is_read: service.status === 'active', created_at: service.created_at as string }));
      (t.data || []).forEach((ticket: Record<string, unknown>) => notifs.push({ id: `ticket-${ticket.id}`, type: 'info', title: `Ticket ${ticket.status}`, body: `Your support ticket "${ticket.subject}" is ${ticket.status}.`, is_read: ticket.status === 'resolved' || ticket.status === 'closed', created_at: ticket.created_at as string }));

      notifs.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      setNotifications(notifs);
      setLoading(false);
    };
    init();
  }, [router]);

  const handleSignOut = async () => { await createClient().auth.signOut(); router.push('/'); };
  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  const navItems = [
    { label: 'Overview', icon: LayoutDashboard, href: '/portal' },
    { label: 'My Hosting', icon: Server, href: '/portal' },
    { label: 'Invoices', icon: Receipt, href: '/portal' },
    { label: 'Support', icon: LifeBuoy, href: '/portal' },
    { label: 'Profile', icon: UserIcon, href: '/portal/profile' },
    { label: 'Notifications', icon: Bell, href: '/portal/notifications' },
  ];

  const iconForType: Record<string, typeof Info> = { success: CheckCircle, info: Info, warning: AlertCircle, error: AlertCircle };
  const colorForType: Record<string, string> = { success: 'text-green-500 bg-green-500/10 border-green-500/20', info: 'text-blue-500 bg-blue-500/10 border-blue-500/20', warning: 'text-amber-500 bg-amber-500/10 border-amber-500/20', error: 'text-red-500 bg-red-500/10 border-red-500/20' };

  return (
    <div className="min-h-screen bg-background">
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-border bg-background/80 backdrop-blur sticky top-0 z-50">
        <Link href="/" className="inline-flex items-center gap-2"><Logo className="h-7 w-7" /><span className="font-semibold">Portal</span></Link>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg hover:bg-muted">{sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
      </div>
      <div className="flex">
        <aside className={`fixed lg:sticky top-0 left-0 h-screen w-64 border-r border-border bg-muted/20 z-40 transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
          <div className="p-6 hidden lg:block"><Link href="/" className="inline-flex items-center gap-2.5"><Logo className="h-8 w-8" /><span className="font-semibold">ELS<span className="text-primary">x</span>Global</span></Link></div>
          <div className="px-4 mb-6 hidden lg:block"><div className="liquid-glass rounded-xl p-3"><p className="text-xs text-muted-foreground">Signed in as</p><p className="text-sm font-medium truncate">{user?.email}</p></div></div>
          <nav className="px-3 space-y-1">{navItems.map((item) => (
            <Link key={item.label} href={item.href} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${item.label === 'Notifications' ? 'bg-primary/10 text-primary border border-primary/20' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}><item.icon className="h-4 w-4" />{item.label}</Link>
          ))}</nav>
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border"><button onClick={handleSignOut} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-red-500 hover:bg-red-500/5 transition-colors"><LogOut className="h-4 w-4" />Sign Out</button></div>
        </aside>

        <main className="flex-1 p-6 lg:p-8 max-w-4xl">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold tracking-tight">Notifications</h1>
            {notifications.some((n) => !n.is_read) && <button onClick={() => setNotifications(notifications.map((n) => ({ ...n, is_read: true })))} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl liquid-glass-button text-sm font-medium"><Check className="h-4 w-4" />Mark all read</button>}
          </div>
          {notifications.length === 0 ? (
            <div className="liquid-glass-card rounded-2xl p-12 text-center"><Bell className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" /><h3 className="text-lg font-semibold mb-2">No notifications</h3><p className="text-sm text-muted-foreground">You are all caught up. New notifications will appear here.</p></div>
          ) : (
            <div className="space-y-3">{notifications.map((notif) => {
              const Icon = iconForType[notif.type] || Info;
              return (
                <div key={notif.id} className={`liquid-glass-card rounded-2xl p-5 flex items-start gap-4 ${!notif.is_read ? 'border-primary/20' : ''}`}>
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl shrink-0 ${colorForType[notif.type] || colorForType.info}`}><Icon className="h-5 w-5" /></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1"><h3 className="text-sm font-semibold">{notif.title}</h3>{!notif.is_read && <span className="h-2 w-2 rounded-full bg-primary shrink-0" />}</div>
                    <p className="text-sm text-muted-foreground">{notif.body}</p>
                    <div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground"><Clock className="h-3 w-3" />{new Date(notif.created_at).toLocaleString()}</div>
                  </div>
                </div>
              );
            })}</div>
          )}
        </main>
      </div>
    </div>
  );
}
