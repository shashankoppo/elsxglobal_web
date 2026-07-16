'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import { Logo } from '@/components/site/logo';
import {
  LayoutDashboard, Server, Receipt, LifeBuoy, LogOut, Menu,
  Loader2, Users, CreditCard, Package, DollarSign, TrendingUp,
  Check, X as XIcon, RefreshCw, Eye, ToggleLeft, ToggleRight,
  Plus, Search, AlertCircle,
  ShieldCheck, ShoppingCart, Globe
} from 'lucide-react';
import Link from 'next/link';

type Tab = 'overview' | 'orders' | 'plans' | 'addons' | 'users' | 'tickets' | 'invoices';

interface AdminInfo {
  email: string;
  name: string;
}

interface Stats {
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  activeServices: number;
  totalServices: number;
  openTickets: number;
  totalTickets: number;
  unpaidInvoices: number;
  totalInvoices: number;
  activePlans: number;
  totalPlans: number;
  activeAddons: number;
  totalAddons: number;
}

export default function AdminPage() {
  const router = useRouter();
  const [admin, setAdmin] = useState<AdminInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [stats, setStats] = useState<Stats | null>(null);
  const [orders, setOrders] = useState<Record<string, unknown>[]>([]);
  const [plans, setPlans] = useState<Record<string, unknown>[]>([]);
  const [addons, setAddons] = useState<Record<string, unknown>[]>([]);
  const [tickets, setTickets] = useState<Record<string, unknown>[]>([]);
  const [invoices, setInvoices] = useState<Record<string, unknown>[]>([]);
  const [users, setUsers] = useState<Record<string, unknown>[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const showToast = (type: 'success' | 'error', msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchStats = useCallback(async () => {
    const res = await fetch(`${supabaseUrl}/functions/v1/admin-auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseAnonKey}`,
      },
      body: JSON.stringify({ action: 'stats' }),
    });
    if (res.ok) {
      const data = await res.json();
      setStats(data);
    }
  }, [supabaseUrl, supabaseAnonKey]);

  const fetchOrders = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from('hosting_orders')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);
    setOrders(data || []);
  }, []);

  const fetchPlans = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from('hosting_plans')
      .select('*')
      .order('tier', { ascending: true })
      .order('sort_order', { ascending: true });
    setPlans(data || []);
  }, []);

  const fetchAddons = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from('hosting_addons')
      .select('*')
      .order('category', { ascending: true })
      .order('sort_order', { ascending: true });
    setAddons(data || []);
  }, []);

  const fetchTickets = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from('support_tickets')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);
    setTickets(data || []);
  }, []);

  const fetchInvoices = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from('hosting_invoices')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);
    setInvoices(data || []);
  }, []);

  const fetchUsers = useCallback(async () => {
    const supabase = createClient();
    const { data: orderUsers } = await supabase
      .from('hosting_orders')
      .select('user_id, user_email')
      .order('created_at', { ascending: false });
    const uniqueUsers = new Map<string, Record<string, unknown>>();
    for (const o of orderUsers || []) {
      const uid = o.user_id as string;
      if (!uniqueUsers.has(uid)) {
        uniqueUsers.set(uid, o);
      }
    }
    setUsers(Array.from(uniqueUsers.values()));
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem('admin_token');
    const email = sessionStorage.getItem('admin_email');
    const name = sessionStorage.getItem('admin_name');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    setAdmin({ email: email || '', name: name || 'Administrator' });
    setLoading(false);
    fetchStats();
    fetchOrders();
    fetchPlans();
    fetchAddons();
    fetchTickets();
    fetchInvoices();
    fetchUsers();
  }, [router, fetchStats, fetchOrders, fetchPlans, fetchAddons, fetchTickets, fetchInvoices, fetchUsers]);

  const handleSignOut = () => {
    sessionStorage.removeItem('admin_token');
    sessionStorage.removeItem('admin_email');
    sessionStorage.removeItem('admin_name');
    router.push('/admin/login');
  };

  const updateOrderStatus = async (orderId: string, status: string) => {
    setActionLoading(orderId);
    const supabase = createClient();
    const { error } = await supabase
      .from('hosting_orders')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', orderId);
    if (error) {
      showToast('error', 'Failed to update order: ' + error.message);
    } else {
      showToast('success', `Order marked as ${status}`);
      fetchOrders();
      fetchStats();
    }
    setActionLoading(null);
  };

  const togglePlanActive = async (planId: string, current: boolean) => {
    setActionLoading(planId);
    const supabase = createClient();
    const { error } = await supabase
      .from('hosting_plans')
      .update({ is_active: !current })
      .eq('id', planId);
    if (error) {
      showToast('error', 'Failed to toggle plan: ' + error.message);
    } else {
      showToast('success', `Plan ${!current ? 'activated' : 'deactivated'}`);
      fetchPlans();
      fetchStats();
    }
    setActionLoading(null);
  };

  const toggleAddonActive = async (addonId: string, current: boolean) => {
    setActionLoading(addonId);
    const supabase = createClient();
    const { error } = await supabase
      .from('hosting_addons')
      .update({ is_active: !current })
      .eq('id', addonId);
    if (error) {
      showToast('error', 'Failed to toggle add-on: ' + error.message);
    } else {
      showToast('success', `Add-on ${!current ? 'activated' : 'deactivated'}`);
      fetchAddons();
      fetchStats();
    }
    setActionLoading(null);
  };

  const updateTicketStatus = async (ticketId: string, status: string) => {
    setActionLoading(ticketId);
    const supabase = createClient();
    const { error } = await supabase
      .from('support_tickets')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', ticketId);
    if (error) {
      showToast('error', 'Failed to update ticket: ' + error.message);
    } else {
      showToast('success', `Ticket marked as ${status}`);
      fetchTickets();
      fetchStats();
    }
    setActionLoading(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

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
    closed: 'text-muted-foreground bg-muted/20 border-border',
  };

  const navItems: { id: Tab; label: string; icon: typeof LayoutDashboard; badge?: number }[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'orders', label: 'Orders', icon: CreditCard, badge: stats?.pendingOrders },
    { id: 'plans', label: 'Hosting Plans', icon: Package },
    { id: 'addons', label: 'Add-ons', icon: Plus },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'tickets', label: 'Support', icon: LifeBuoy, badge: stats?.openTickets },
    { id: 'invoices', label: 'Invoices', icon: Receipt, badge: stats?.unpaidInvoices },
  ];

  const filteredOrders = orders.filter((o) => {
    const matchesSearch = !searchQuery ||
      (o.plan_name as string)?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (o.id as string)?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredTickets = tickets.filter((t) => {
    const matchesSearch = !searchQuery ||
      (t.subject as string)?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-background">
      {toast && (
        <div className={`fixed top-20 right-4 z-50 px-4 py-3 rounded-xl border text-sm font-medium animate-fade-in ${toast.type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-600' : 'bg-red-500/10 border-red-500/20 text-red-600'}`}>
          {toast.msg}
        </div>
      )}

      <div className="lg:hidden flex items-center justify-between p-4 border-b border-border bg-background/80 backdrop-blur sticky top-0 z-50">
        <Link href="/" className="inline-flex items-center gap-2">
          <Logo className="h-7 w-7" />
          <span className="font-semibold">Admin</span>
        </Link>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg hover:bg-muted">
          {sidebarOpen ? <XIcon className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div className="flex">
        <aside className={`fixed lg:sticky top-0 left-0 h-screen w-64 border-r border-border bg-muted/20 z-40 transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
          <div className="p-6 hidden lg:block">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <Logo className="h-8 w-8" />
              <span className="font-semibold">ELS<span className="text-primary">x</span>Global</span>
            </Link>
          </div>
          <div className="px-4 mb-6 hidden lg:block">
            <div className="liquid-glass rounded-xl p-3">
              <div className="flex items-center gap-2 mb-1">
                <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                <p className="text-xs text-muted-foreground">Admin</p>
              </div>
              <p className="text-sm font-medium truncate">{admin?.name}</p>
              <p className="text-xs text-muted-foreground truncate">{admin?.email}</p>
            </div>
          </div>
          <nav className="px-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setSidebarOpen(false); setSearchQuery(''); setStatusFilter('all'); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === item.id ? 'bg-primary/10 text-primary border border-primary/20' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="ml-auto text-xs px-1.5 py-0.5 rounded-full bg-primary/10 text-primary">{item.badge}</span>
                )}
              </button>
            ))}
          </nav>
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border space-y-1">
            <Link href="/" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
              <Globe className="h-4 w-4" />View Site
            </Link>
            <button onClick={handleSignOut} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-red-500 hover:bg-red-500/5 transition-colors">
              <LogOut className="h-4 w-4" />Sign Out
            </button>
          </div>
        </aside>

        <main className="flex-1 p-6 lg:p-8 max-w-7xl">
          {activeTab === 'overview' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
                  <p className="text-sm text-muted-foreground mt-1">VaultHost administration overview</p>
                </div>
                <button onClick={() => { fetchStats(); fetchOrders(); fetchTickets(); }} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl liquid-glass text-sm font-medium hover:bg-muted/50">
                  <RefreshCw className="h-4 w-4" />Refresh
                </button>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { label: 'Total Revenue', value: stats ? `Rs ${stats.totalRevenue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}` : '—', icon: DollarSign, color: 'text-green-500' },
                  { label: 'Total Orders', value: stats?.totalOrders ?? '—', icon: ShoppingCart, color: 'text-blue-500' },
                  { label: 'Active Services', value: stats?.activeServices ?? '—', icon: Server, color: 'text-green-500' },
                  { label: 'Pending Orders', value: stats?.pendingOrders ?? '—', icon: CreditCard, color: 'text-amber-500' },
                ].map((stat) => (
                  <div key={stat.label} className="liquid-glass-card rounded-2xl p-5">
                    <stat.icon className={`h-5 w-5 ${stat.color} mb-3`} />
                    <p className="text-3xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { label: 'Open Tickets', value: stats?.openTickets ?? '—', icon: LifeBuoy, color: 'text-blue-500' },
                  { label: 'Unpaid Invoices', value: stats?.unpaidInvoices ?? '—', icon: Receipt, color: 'text-red-500' },
                  { label: 'Active Plans', value: stats?.activePlans ?? '—', icon: Package, color: 'text-green-500' },
                  { label: 'Active Add-ons', value: stats?.activeAddons ?? '—', icon: Plus, color: 'text-green-500' },
                ].map((stat) => (
                  <div key={stat.label} className="liquid-glass-card rounded-2xl p-5">
                    <stat.icon className={`h-5 w-5 ${stat.color} mb-3`} />
                    <p className="text-3xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                <div className="liquid-glass-card rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-base font-semibold">Recent Orders</h2>
                    <button onClick={() => setActiveTab('orders')} className="text-xs text-primary hover:underline">View all</button>
                  </div>
                  {orders.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No orders yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {orders.slice(0, 5).map((order) => (
                        <div key={order.id as string} className="flex items-center justify-between text-sm">
                          <div>
                            <p className="font-medium">{order.plan_name as string}</p>
                            <p className="text-xs text-muted-foreground">{new Date(order.created_at as string).toLocaleDateString()}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">Rs {(order.total as number).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full border ${statusColors[order.status as string] || statusColors.draft}`}>
                              {order.status as string}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="liquid-glass-card rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-base font-semibold">Recent Support Tickets</h2>
                    <button onClick={() => setActiveTab('tickets')} className="text-xs text-primary hover:underline">View all</button>
                  </div>
                  {tickets.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No support tickets.</p>
                  ) : (
                    <div className="space-y-3">
                      {tickets.slice(0, 5).map((ticket) => (
                        <div key={ticket.id as string} className="flex items-center justify-between text-sm">
                          <div className="min-w-0">
                            <p className="font-medium truncate">{ticket.subject as string}</p>
                            <p className="text-xs text-muted-foreground">{new Date(ticket.created_at as string).toLocaleDateString()}</p>
                          </div>
                          <span className={`text-xs px-2 py-0.5 rounded-full border ${statusColors[ticket.status as string] || statusColors.draft}`}>
                            {ticket.status as string}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div>
              <h1 className="text-2xl font-semibold tracking-tight mb-6">Orders Management</h1>
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by plan name or order ID..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2.5 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="failed">Failed</option>
                </select>
              </div>

              {filteredOrders.length === 0 ? (
                <div className="liquid-glass-card rounded-2xl p-12 text-center">
                  <CreditCard className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground">No orders found.</p>
                </div>
              ) : (
                <div className="liquid-glass-card rounded-2xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase">Plan</th>
                          <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase">Billing</th>
                          <th className="text-right p-4 text-xs font-semibold text-muted-foreground uppercase">Total</th>
                          <th className="text-center p-4 text-xs font-semibold text-muted-foreground uppercase">Status</th>
                          <th className="text-right p-4 text-xs font-semibold text-muted-foreground uppercase">Date</th>
                          <th className="text-center p-4 text-xs font-semibold text-muted-foreground uppercase">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredOrders.map((order) => (
                          <tr key={order.id as string} className="border-b border-border/50 hover:bg-muted/20">
                            <td className="p-4">
                              <p className="text-sm font-medium">{order.plan_name as string}</p>
                              <p className="text-xs text-muted-foreground font-mono">{(order.id as string).slice(0, 8)}</p>
                            </td>
                            <td className="p-4 text-sm text-muted-foreground capitalize">{order.billing_cycle as string}</td>
                            <td className="p-4 text-sm text-right font-medium">Rs {(order.total as number).toLocaleString('en-IN', { maximumFractionDigits: 2 })}</td>
                            <td className="p-4 text-center">
                              <span className={`text-xs px-2 py-0.5 rounded-full border ${statusColors[order.status as string] || statusColors.draft}`}>
                                {order.status as string}
                              </span>
                            </td>
                            <td className="p-4 text-sm text-right text-muted-foreground">{new Date(order.created_at as string).toLocaleDateString()}</td>
                            <td className="p-4">
                              <div className="flex items-center justify-center gap-1">
                                {order.status === 'pending' && (
                                  <>
                                    <button
                                      onClick={() => updateOrderStatus(order.id as string, 'paid')}
                                      disabled={actionLoading === order.id}
                                      className="p-1.5 rounded-lg hover:bg-green-500/10 text-green-500 transition-colors"
                                      title="Approve payment"
                                    >
                                      {actionLoading === order.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />}
                                    </button>
                                    <button
                                      onClick={() => updateOrderStatus(order.id as string, 'cancelled')}
                                      disabled={actionLoading === order.id}
                                      className="p-1.5 rounded-lg hover:bg-red-500/10 text-red-500 transition-colors"
                                      title="Cancel order"
                                    >
                                      <XIcon className="h-3.5 w-3.5" />
                                    </button>
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'plans' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-semibold tracking-tight">Hosting Plans</h1>
                  <p className="text-sm text-muted-foreground mt-1">Manage all hosting plans across categories</p>
                </div>
                <Link href="/vaulthost" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl liquid-glass text-sm font-medium hover:bg-muted/50">
                  <Eye className="h-4 w-4" />View on Site
                </Link>
              </div>

              <div className="grid gap-4">
                {plans.map((plan) => (
                  <div key={plan.id as string} className="liquid-glass-card rounded-2xl p-5">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-base font-semibold">{plan.name as string}</h3>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary capitalize">{plan.tier as string}</span>
                          {plan.is_popular && <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20">Popular</span>}
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{plan.short_description as string}</p>
                        <div className="flex flex-wrap gap-4 text-sm">
                          <span className="text-muted-foreground">Monthly: <span className="font-medium text-foreground">Rs {plan.price_monthly as number}</span></span>
                          <span className="text-muted-foreground">Annual: <span className="font-medium text-foreground">Rs {plan.price_annual as number}</span></span>
                          <span className="text-muted-foreground">Sort: <span className="font-medium text-foreground">{plan.sort_order as number}</span></span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <button
                          onClick={() => togglePlanActive(plan.id as string, plan.is_active as boolean)}
                          disabled={actionLoading === plan.id}
                          className={`p-2 rounded-lg transition-colors ${plan.is_active ? 'text-green-500 hover:bg-green-500/10' : 'text-muted-foreground hover:bg-muted/50'}`}
                          title={plan.is_active ? 'Deactivate' : 'Activate'}
                        >
                          {actionLoading === plan.id ? <Loader2 className="h-4 w-4 animate-spin" /> : plan.is_active ? <ToggleRight className="h-5 w-5" /> : <ToggleLeft className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'addons' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-semibold tracking-tight">Add-ons Management</h1>
                  <p className="text-sm text-muted-foreground mt-1">Manage hosting add-ons and marketplace items</p>
                </div>
                <Link href="/vaulthost/addons" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl liquid-glass text-sm font-medium hover:bg-muted/50">
                  <Eye className="h-4 w-4" />View on Site
                </Link>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {addons.map((addon) => (
                  <div key={addon.id as string} className="liquid-glass-card rounded-2xl p-5">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-sm font-semibold">{addon.name as string}</h3>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground capitalize">{addon.category as string}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mb-3">{addon.description as string}</p>
                        <div className="flex gap-4 text-xs">
                          <span className="text-muted-foreground">Monthly: <span className="font-medium text-foreground">Rs {addon.price_monthly as number}</span></span>
                          <span className="text-muted-foreground">Annual: <span className="font-medium text-foreground">Rs {addon.price_annual as number}</span></span>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleAddonActive(addon.id as string, addon.is_active as boolean)}
                        disabled={actionLoading === addon.id}
                        className={`p-2 rounded-lg transition-colors ml-2 ${addon.is_active ? 'text-green-500 hover:bg-green-500/10' : 'text-muted-foreground hover:bg-muted/50'}`}
                        title={addon.is_active ? 'Deactivate' : 'Activate'}
                      >
                        {actionLoading === addon.id ? <Loader2 className="h-4 w-4 animate-spin" /> : addon.is_active ? <ToggleRight className="h-5 w-5" /> : <ToggleLeft className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div>
              <h1 className="text-2xl font-semibold tracking-tight mb-6">Users</h1>
              {users.length === 0 ? (
                <div className="liquid-glass-card rounded-2xl p-12 text-center">
                  <Users className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground">No registered users with orders yet.</p>
                </div>
              ) : (
                <div className="liquid-glass-card rounded-2xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase">User ID</th>
                          <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase">Email</th>
                          <th className="text-right p-4 text-xs font-semibold text-muted-foreground uppercase">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user, i) => (
                          <tr key={user.user_id as string} className="border-b border-border/50 hover:bg-muted/20">
                            <td className="p-4 text-sm font-mono text-muted-foreground">{(user.user_id as string).slice(0, 8)}...</td>
                            <td className="p-4 text-sm font-medium">{user.user_email as string || '—'}</td>
                            <td className="p-4 text-right">
                              <span className="text-xs text-muted-foreground">User #{i + 1}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'tickets' && (
            <div>
              <h1 className="text-2xl font-semibold tracking-tight mb-6">Support Tickets</h1>
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search tickets..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2.5 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="all">All Statuses</option>
                  <option value="open">Open</option>
                  <option value="pending">Pending</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              {filteredTickets.length === 0 ? (
                <div className="liquid-glass-card rounded-2xl p-12 text-center">
                  <LifeBuoy className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground">No support tickets found.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredTickets.map((ticket) => (
                    <div key={ticket.id as string} className="liquid-glass-card rounded-2xl p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold mb-1">{ticket.subject as string}</h3>
                          <p className="text-xs text-muted-foreground line-clamp-2">{ticket.description as string}</p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                            <span className="capitalize">Priority: {ticket.priority as string}</span>
                            <span>{new Date(ticket.created_at as string).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <span className={`text-xs px-2 py-0.5 rounded-full border ${statusColors[ticket.status as string] || statusColors.draft}`}>
                            {ticket.status as string}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border">
                        {ticket.status !== 'resolved' && ticket.status !== 'closed' && (
                          <>
                            <button
                              onClick={() => updateTicketStatus(ticket.id as string, 'resolved')}
                              disabled={actionLoading === ticket.id}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-green-500/10 text-green-600 hover:bg-green-500/20 transition-colors"
                            >
                              {actionLoading === ticket.id ? <Loader2 className="h-3 w-3 animate-spin" /> : <Check className="h-3 w-3" />}
                              Resolve
                            </button>
                            <button
                              onClick={() => updateTicketStatus(ticket.id as string, 'closed')}
                              disabled={actionLoading === ticket.id}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-muted/50 text-muted-foreground hover:bg-muted transition-colors"
                            >
                              <XIcon className="h-3 w-3" />
                              Close
                            </button>
                          </>
                        )}
                        {ticket.status === 'resolved' && (
                          <button
                            onClick={() => updateTicketStatus(ticket.id as string, 'open')}
                            disabled={actionLoading === ticket.id}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 transition-colors"
                          >
                            <RefreshCw className="h-3 w-3" />
                            Reopen
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'invoices' && (
            <div>
              <h1 className="text-2xl font-semibold tracking-tight mb-6">Invoices</h1>
              {invoices.length === 0 ? (
                <div className="liquid-glass-card rounded-2xl p-12 text-center">
                  <Receipt className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground">No invoices generated yet.</p>
                </div>
              ) : (
                <div className="liquid-glass-card rounded-2xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase">Invoice #</th>
                          <th className="text-right p-4 text-xs font-semibold text-muted-foreground uppercase">Amount</th>
                          <th className="text-right p-4 text-xs font-semibold text-muted-foreground uppercase">Tax</th>
                          <th className="text-right p-4 text-xs font-semibold text-muted-foreground uppercase">Total</th>
                          <th className="text-center p-4 text-xs font-semibold text-muted-foreground uppercase">Status</th>
                          <th className="text-right p-4 text-xs font-semibold text-muted-foreground uppercase">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {invoices.map((inv) => (
                          <tr key={inv.id as string} className="border-b border-border/50 hover:bg-muted/20">
                            <td className="p-4 text-sm font-mono">{inv.invoice_number as string}</td>
                            <td className="p-4 text-sm text-right">Rs {(inv.amount as number).toLocaleString('en-IN', { maximumFractionDigits: 2 })}</td>
                            <td className="p-4 text-sm text-right text-muted-foreground">Rs {(inv.tax_amount as number).toLocaleString('en-IN', { maximumFractionDigits: 2 })}</td>
                            <td className="p-4 text-sm text-right font-medium">Rs {(inv.total as number).toLocaleString('en-IN', { maximumFractionDigits: 2 })}</td>
                            <td className="p-4 text-center">
                              <span className={`text-xs px-2 py-0.5 rounded-full border ${statusColors[inv.status as string] || statusColors.draft}`}>
                                {inv.status as string}
                              </span>
                            </td>
                            <td className="p-4 text-sm text-right text-muted-foreground">{new Date(inv.created_at as string).toLocaleDateString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
