'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import { Logo } from '@/components/site/logo';
import {
  LayoutDashboard, Server, Receipt, LifeBuoy, LogOut, Menu, X,
  Plus, Loader2, Clock, Check, Send, ExternalLink, RefreshCw,
  CreditCard, MessageSquare, ArrowRightLeft, Bell, User as UserIcon
} from 'lucide-react';
import Link from 'next/link';

type Tab = 'overview' | 'hosting' | 'orders' | 'invoices' | 'support' | 'new-ticket';

export default function PortalPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ id: string; email: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [orders, setOrders] = useState<Record<string, unknown>[]>([]);
  const [services, setServices] = useState<Record<string, unknown>[]>([]);
  const [invoices, setInvoices] = useState<Record<string, unknown>[]>([]);
  const [tickets, setTickets] = useState<Record<string, unknown>[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Record<string, unknown> | null>(null);
  const [ticketReplies, setTicketReplies] = useState<Record<string, unknown>[]>([]);
  const [replyText, setReplyText] = useState('');
  const [newTicket, setNewTicket] = useState({ subject: '', description: '', priority: 'normal' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const init = async () => {
      const supabase = createClient();
      const { data: authData } = await supabase.auth.getUser();
      if (!authData?.user) { router.push('/portal/login'); return; }
      setUser({ id: authData.user.id, email: authData.user.email || '' });

      const [o, s, i, t] = await Promise.all([
        supabase.from('hosting_orders').select('*').eq('user_id', authData.user.id).order('created_at', { ascending: false }),
        supabase.from('hosting_services').select('*').eq('user_id', authData.user.id).order('created_at', { ascending: false }),
        supabase.from('hosting_invoices').select('*').eq('user_id', authData.user.id).order('created_at', { ascending: false }),
        supabase.from('support_tickets').select('*').eq('user_id', authData.user.id).order('created_at', { ascending: false }),
      ]);
      setOrders(o.data || []);
      setServices(s.data || []);
      setInvoices(i.data || []);
      setTickets(t.data || []);
      setLoading(false);
    };
    init();
  }, [router]);

  const handleSignOut = async () => { await createClient().auth.signOut(); router.push('/'); };

  const loadReplies = async (ticketId: string) => {
    const { data } = await createClient().from('ticket_replies').select('*').eq('ticket_id', ticketId).order('created_at', { ascending: true });
    setTicketReplies(data || []);
  };

  const handleTicketClick = (ticket: Record<string, unknown>) => { setSelectedTicket(ticket); loadReplies(ticket.id as string); setReplyText(''); };

  const handleSendReply = async () => {
    if (!selectedTicket || !replyText.trim() || !user) return;
    setSubmitting(true);
    const { data } = await createClient().from('ticket_replies').insert({
      ticket_id: selectedTicket.id, user_id: user.id, sender_type: 'user', message: replyText,
    }).select().single();
    if (data) { setTicketReplies([...ticketReplies, data]); setReplyText(''); }
    setSubmitting(false);
  };

  const handleCreateTicket = async () => {
    if (!newTicket.subject.trim() || !newTicket.description.trim() || !user) return;
    setSubmitting(true);
    const { data } = await createClient().from('support_tickets').insert({
      user_id: user.id, subject: newTicket.subject, description: newTicket.description,
      priority: newTicket.priority, status: 'open',
    }).select().single();
    if (data) { setTickets([data, ...tickets]); setNewTicket({ subject: '', description: '', priority: 'normal' }); setActiveTab('support'); }
    setSubmitting(false);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  const activeServices = services.filter((s) => s.status === 'active').length;
  const pendingOrders = orders.filter((o) => o.status === 'pending').length;
  const openTickets = tickets.filter((t) => t.status === 'open' || t.status === 'pending').length;
  const unpaidInvoices = invoices.filter((i) => i.status === 'sent' || i.status === 'overdue').length;

  const statusColors: Record<string, string> = {
    active: 'text-green-500 bg-green-500/10 border-green-500/20',
    pending: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
    provisioning: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
    paid: 'text-green-500 bg-green-500/10 border-green-500/20',
    open: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
    resolved: 'text-green-500 bg-green-500/10 border-green-500/20',
    overdue: 'text-red-500 bg-red-500/10 border-red-500/20',
    sent: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
    draft: 'text-muted-foreground bg-muted/20 border-border',
    failed: 'text-red-500 bg-red-500/10 border-red-500/20',
    suspended: 'text-red-500 bg-red-500/10 border-red-500/20',
    cancelled: 'text-muted-foreground bg-muted/20 border-border',
  };

  const navItems: { id: Tab; label: string; icon: typeof LayoutDashboard; badge?: number }[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'hosting', label: 'My Hosting', icon: Server, badge: activeServices },
    { id: 'orders', label: 'Orders', icon: CreditCard, badge: orders.length },
    { id: 'invoices', label: 'Invoices', icon: Receipt, badge: unpaidInvoices },
    { id: 'support', label: 'Support', icon: LifeBuoy, badge: openTickets },
    { id: 'new-ticket', label: 'New Ticket', icon: Plus },
  ];

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
          <nav className="px-3 space-y-1">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => { setActiveTab(item.id); setSidebarOpen(false); if (item.id === 'support') setSelectedTicket(null); }} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === item.id ? 'bg-primary/10 text-primary border border-primary/20' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}>
                <item.icon className="h-4 w-4" />{item.label}
                {item.badge !== undefined && item.badge > 0 && <span className="ml-auto text-xs px-1.5 py-0.5 rounded-full bg-primary/10 text-primary">{item.badge}</span>}
              </button>
            ))}
          </nav>
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border space-y-1">
            <Link href="/portal/profile" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"><UserIcon className="h-4 w-4" />Profile</Link>
            <Link href="/portal/notifications" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"><Bell className="h-4 w-4" />Notifications</Link>
            <Link href="/vaulthost" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"><Server className="h-4 w-4" />Browse Plans</Link>
            <button onClick={handleSignOut} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-red-500 hover:bg-red-500/5 transition-colors"><LogOut className="h-4 w-4" />Sign Out</button>
          </div>
        </aside>

        <main className="flex-1 p-6 lg:p-8 max-w-6xl">
          {activeTab === 'overview' && (
            <div>
              <h1 className="text-2xl font-semibold tracking-tight mb-6">Dashboard</h1>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[{ label: 'Active Services', value: activeServices, icon: Server, color: 'text-green-500' }, { label: 'Pending Orders', value: pendingOrders, icon: Clock, color: 'text-amber-500' }, { label: 'Open Tickets', value: openTickets, icon: LifeBuoy, color: 'text-blue-500' }, { label: 'Unpaid Invoices', value: unpaidInvoices, icon: Receipt, color: 'text-red-500' }].map((stat) => (
                  <div key={stat.label} className="liquid-glass-card rounded-2xl p-5">
                    <stat.icon className={`h-5 w-5 ${stat.color} mb-3`} />
                    <p className="text-3xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="liquid-glass-card rounded-2xl p-6">
                  <h2 className="text-base font-semibold mb-4">Recent Orders</h2>
                  {orders.length === 0 ? <p className="text-sm text-muted-foreground">No orders yet. <Link href="/vaulthost" className="text-primary hover:underline">Browse plans</Link>.</p> : (
                    <div className="space-y-3">{orders.slice(0, 5).map((order) => (
                      <div key={order.id as string} className="flex items-center justify-between text-sm">
                        <div><p className="font-medium">{order.plan_name as string}</p><p className="text-xs text-muted-foreground">{new Date(order.created_at as string).toLocaleDateString()}</p></div>
                        <span className={`text-xs px-2 py-0.5 rounded-full border ${statusColors[order.status as string] || statusColors.draft}`}>{order.status as string}</span>
                      </div>
                    ))}</div>
                  )}
                </div>
                <div className="liquid-glass-card rounded-2xl p-6">
                  <h2 className="text-base font-semibold mb-4">Active Services</h2>
                  {services.length === 0 ? <p className="text-sm text-muted-foreground">No active hosting services.</p> : (
                    <div className="space-y-3">{services.slice(0, 5).map((service) => (
                      <div key={service.id as string} className="flex items-center justify-between text-sm">
                        <div><p className="font-medium">{service.plan_name as string}</p><p className="text-xs text-muted-foreground">{(service.domain as string) || 'No domain set'}</p></div>
                        <span className={`text-xs px-2 py-0.5 rounded-full border ${statusColors[service.status as string] || statusColors.draft}`}>{service.status as string}</span>
                      </div>
                    ))}</div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'hosting' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold tracking-tight">My Hosting</h1>
                <Link href="/vaulthost" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium"><Plus className="h-4 w-4" />Add Service</Link>
              </div>
              {services.length === 0 ? (
                <div className="liquid-glass-card rounded-2xl p-12 text-center">
                  <Server className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No hosting services yet</h3>
                  <p className="text-sm text-muted-foreground mb-6">Browse our marketplace and deploy your first server.</p>
                  <Link href="/vaulthost" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm">Browse Plans</Link>
                </div>
              ) : (
                <div className="grid gap-4">{services.map((service) => (
                  <div key={service.id as string} className="liquid-glass-card rounded-2xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div><h3 className="text-base font-semibold">{service.plan_name as string}</h3><p className="text-sm text-muted-foreground">{(service.domain as string) || 'No domain configured'}</p></div>
                      <span className={`text-xs px-2.5 py-1 rounded-full border ${statusColors[service.status as string] || statusColors.draft}`}>{service.status as string}</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                      {service.ip_address && <div><p className="text-xs text-muted-foreground">IP Address</p><p className="font-mono text-xs">{service.ip_address as string}</p></div>}
                      {service.renewal_date && <div><p className="text-xs text-muted-foreground">Renewal Date</p><p className="text-xs">{new Date(service.renewal_date as string).toLocaleDateString()}</p></div>}
                      {service.control_panel_url && <div><p className="text-xs text-muted-foreground">Control Panel</p><a href={service.control_panel_url as string} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-xs inline-flex items-center gap-1">Open <ExternalLink className="h-3 w-3" /></a></div>}
                      <div><p className="text-xs text-muted-foreground">Created</p><p className="text-xs">{new Date(service.created_at as string).toLocaleDateString()}</p></div>
                    </div>
                    {service.status === 'provisioning' && (
                      <div className="mt-4 flex items-center gap-2 text-sm text-blue-500 bg-blue-500/5 border border-blue-500/20 rounded-lg p-3"><RefreshCw className="h-4 w-4 animate-spin" />Our team is setting up your server. This usually takes 5-15 minutes.</div>
                    )}
                    <div className="mt-4 pt-4 border-t border-border flex items-center gap-3">
                      <Link href={`/portal/service?id=${service.id}`} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90">
                        Manage <ArrowRightLeft className="h-3.5 w-3.5" />
                      </Link>
                      {service.control_panel_url && (
                        <a href={service.control_panel_url as string} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl liquid-glass-button text-sm font-medium">
                          Open Panel <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}</div>
              )}
            </div>
          )}

          {activeTab === 'orders' && (
            <div>
              <h1 className="text-2xl font-semibold tracking-tight mb-6">Orders</h1>
              {orders.length === 0 ? <div className="liquid-glass-card rounded-2xl p-12 text-center"><CreditCard className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" /><p className="text-sm text-muted-foreground">No orders yet.</p></div> : (
                <div className="liquid-glass-card rounded-2xl overflow-hidden">
                  <table className="w-full">
                    <thead><tr className="border-b border-border">
                      <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase">Plan</th>
                      <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase">Billing</th>
                      <th className="text-right p-4 text-xs font-semibold text-muted-foreground uppercase">Total</th>
                      <th className="text-center p-4 text-xs font-semibold text-muted-foreground uppercase">Status</th>
                      <th className="text-right p-4 text-xs font-semibold text-muted-foreground uppercase">Date</th>
                    </tr></thead>
                    <tbody>{orders.map((order) => (
                      <tr key={order.id as string} className="border-b border-border/50 hover:bg-muted/20">
                        <td className="p-4 text-sm font-medium">{order.plan_name as string}</td>
                        <td className="p-4 text-sm text-muted-foreground capitalize">{order.billing_cycle as string}</td>
                        <td className="p-4 text-sm text-right">&#8377;{(order.total as number).toLocaleString('en-IN', { maximumFractionDigits: 2 })}</td>
                        <td className="p-4 text-center"><span className={`text-xs px-2 py-0.5 rounded-full border ${statusColors[order.status as string] || statusColors.draft}`}>{order.status as string}</span></td>
                        <td className="p-4 text-sm text-right text-muted-foreground">{new Date(order.created_at as string).toLocaleDateString()}</td>
                      </tr>
                    ))}</tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'invoices' && (
            <div>
              <h1 className="text-2xl font-semibold tracking-tight mb-6">Invoices</h1>
              {invoices.length === 0 ? <div className="liquid-glass-card rounded-2xl p-12 text-center"><Receipt className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" /><p className="text-sm text-muted-foreground">No invoices yet. Invoices are generated when you complete a purchase.</p></div> : (
                <div className="liquid-glass-card rounded-2xl overflow-hidden">
                  <table className="w-full">
                    <thead><tr className="border-b border-border">
                      <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase">Invoice #</th>
                      <th className="text-right p-4 text-xs font-semibold text-muted-foreground uppercase">Amount</th>
                      <th className="text-center p-4 text-xs font-semibold text-muted-foreground uppercase">Status</th>
                      <th className="text-right p-4 text-xs font-semibold text-muted-foreground uppercase">Due Date</th>
                    </tr></thead>
                    <tbody>{invoices.map((inv) => (
                      <tr key={inv.id as string} className="border-b border-border/50 hover:bg-muted/20">
                        <td className="p-4 text-sm font-mono">{inv.invoice_number as string}</td>
                        <td className="p-4 text-sm text-right">&#8377;{(inv.total as number).toLocaleString('en-IN', { maximumFractionDigits: 2 })}</td>
                        <td className="p-4 text-center"><span className={`text-xs px-2 py-0.5 rounded-full border ${statusColors[inv.status as string] || statusColors.draft}`}>{inv.status as string}</span></td>
                        <td className="p-4 text-sm text-right text-muted-foreground">{inv.due_date ? new Date(inv.due_date as string).toLocaleDateString() : '—'}</td>
                      </tr>
                    ))}</tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'support' && !selectedTicket && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold tracking-tight">Support Tickets</h1>
                <button onClick={() => setActiveTab('new-ticket')} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium"><Plus className="h-4 w-4" />New Ticket</button>
              </div>
              {tickets.length === 0 ? (
                <div className="liquid-glass-card rounded-2xl p-12 text-center">
                  <LifeBuoy className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No support tickets</h3>
                  <p className="text-sm text-muted-foreground mb-6">Need help? Create a ticket and our team will assist you.</p>
                  <button onClick={() => setActiveTab('new-ticket')} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm">Create a Ticket</button>
                </div>
              ) : (
                <div className="space-y-3">{tickets.map((ticket) => (
                  <button key={ticket.id as string} onClick={() => handleTicketClick(ticket)} className="w-full liquid-glass-card rounded-2xl p-5 text-left hover:border-primary/30 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3"><MessageSquare className="h-4 w-4 text-muted-foreground" /><h3 className="text-sm font-semibold">{ticket.subject as string}</h3></div>
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${statusColors[ticket.status as string] || statusColors.draft}`}>{ticket.status as string}</span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-1 ml-7">{ticket.description as string}</p>
                    <div className="flex items-center gap-4 mt-2 ml-7 text-xs text-muted-foreground"><span className="capitalize">Priority: {ticket.priority as string}</span><span>{new Date(ticket.created_at as string).toLocaleDateString()}</span></div>
                  </button>
                ))}</div>
              )}
            </div>
          )}

          {activeTab === 'support' && selectedTicket && (
            <div>
              <button onClick={() => setSelectedTicket(null)} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"><ArrowRightLeft className="h-4 w-4 rotate-180" />Back to tickets</button>
              <div className="liquid-glass-card rounded-2xl p-6 mb-6">
                <div className="flex items-start justify-between mb-4">
                  <h1 className="text-xl font-semibold">{selectedTicket.subject as string}</h1>
                  <span className={`text-xs px-2.5 py-1 rounded-full border ${statusColors[selectedTicket.status as string] || statusColors.draft}`}>{selectedTicket.status as string}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{selectedTicket.description as string}</p>
                <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground"><span className="capitalize">Priority: {selectedTicket.priority as string}</span><span>Created: {new Date(selectedTicket.created_at as string).toLocaleString()}</span></div>
              </div>
              <div className="space-y-3 mb-6">
                {ticketReplies.map((reply) => (
                  <div key={reply.id as string} className={`flex ${reply.sender_type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] rounded-2xl p-4 ${reply.sender_type === 'user' ? 'bg-primary/10 border border-primary/20' : 'liquid-glass-card'}`}>
                      <p className="text-xs text-muted-foreground mb-1.5">{reply.sender_type === 'user' ? 'You' : 'Support Team'} · {new Date(reply.created_at as string).toLocaleString()}</p>
                      <p className="text-sm">{reply.message as string}</p>
                    </div>
                  </div>
                ))}
                {ticketReplies.length === 0 && <p className="text-sm text-muted-foreground text-center py-8">No replies yet. Be the first to respond.</p>}
              </div>
              {selectedTicket.status !== 'closed' && selectedTicket.status !== 'resolved' && (
                <div className="liquid-glass-card rounded-2xl p-4">
                  <div className="flex gap-3">
                    <input type="text" value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder="Type your reply..." className="flex-1 px-4 py-2.5 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" onKeyDown={(e) => e.key === 'Enter' && handleSendReply()} />
                    <button onClick={handleSendReply} disabled={submitting || !replyText.trim()} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium disabled:opacity-50"><Send className="h-4 w-4" /></button>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'new-ticket' && (
            <div>
              <h1 className="text-2xl font-semibold tracking-tight mb-6">Create Support Ticket</h1>
              <div className="liquid-glass-card rounded-2xl p-6 max-w-2xl">
                <div className="space-y-4">
                  <div><label className="text-sm font-medium mb-1.5 block">Subject</label><input type="text" value={newTicket.subject} onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })} placeholder="Brief description of your issue" className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40" /></div>
                  <div><label className="text-sm font-medium mb-1.5 block">Priority</label><select value={newTicket.priority} onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"><option value="low">Low</option><option value="normal">Normal</option><option value="high">High</option><option value="urgent">Urgent</option></select></div>
                  <div><label className="text-sm font-medium mb-1.5 block">Description</label><textarea value={newTicket.description} onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })} placeholder="Describe your issue in detail..." rows={6} className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 resize-none" /></div>
                  <button onClick={handleCreateTicket} disabled={submitting || !newTicket.subject.trim() || !newTicket.description.trim()} className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium disabled:opacity-50">{submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}Create Ticket</button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
