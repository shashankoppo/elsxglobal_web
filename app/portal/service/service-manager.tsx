'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import { Logo } from '@/components/site/logo';
import {
  Server, Globe, Database, Mail, Lock, RefreshCw, FileText,
  ArrowLeft, Loader2, Plus, Trash2, Copy, Check, ExternalLink,
  Shield, HardDrive, Activity, Download
} from 'lucide-react';
import Link from 'next/link';

type Tab = 'overview' | 'dns' | 'databases' | 'email' | 'ssl' | 'backups' | 'files';

const DNS_TYPES = ['A', 'AAAA', 'CNAME', 'MX', 'TXT', 'NS', 'SRV'];

export default function ServiceManager() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const serviceId = searchParams.get('id') || '';

  const [user, setUser] = useState<{ id: string; email: string } | null>(null);
  const [service, setService] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  const [dnsZone, setDnsZone] = useState<Record<string, unknown> | null>(null);
  const [dnsRecords, setDnsRecords] = useState<Record<string, unknown>[]>([]);
  const [newRecord, setNewRecord] = useState({ type: 'A', name: '@', value: '', ttl: 3600, priority: '' });

  const [databases, setDatabases] = useState<Record<string, unknown>[]>([]);
  const [newDb, setNewDb] = useState({ db_name: '', db_type: 'mysql' });

  const [emailAccounts, setEmailAccounts] = useState<Record<string, unknown>[]>([]);
  const [newEmail, setNewEmail] = useState({ local_part: '', password: '', quota: 1024 });

  const [sslCerts, setSslCerts] = useState<Record<string, unknown>[]>([]);
  const [backups, setBackups] = useState<Record<string, unknown>[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState('');

  useEffect(() => {
    if (!serviceId) { router.push('/portal'); return; }
    const init = async () => {
      const supabase = createClient();
      const { data: authData } = await supabase.auth.getUser();
      if (!authData?.user) { router.push('/portal/login'); return; }
      setUser({ id: authData.user.id, email: authData.user.email || '' });

      const { data: svc } = await supabase
        .from('hosting_services')
        .select('*')
        .eq('id', serviceId)
        .eq('user_id', authData.user.id)
        .maybeSingle();
      if (!svc) { router.push('/portal'); return; }
      setService(svc);

      const domain = (svc.domain as string) || 'example.com';

      const [dnsZ, dnsR, dbs, emails, ssls, bks] = await Promise.all([
        supabase.from('dns_zones').select('*').eq('user_id', authData.user.id).eq('domain', domain).maybeSingle(),
        supabase.from('dns_records').select('*').eq('user_id', authData.user.id).order('created_at', { ascending: false }),
        supabase.from('hosting_databases').select('*').eq('user_id', authData.user.id).eq('service_id', serviceId).order('created_at', { ascending: false }),
        supabase.from('email_accounts').select('*').eq('user_id', authData.user.id).eq('domain', domain).order('created_at', { ascending: false }),
        supabase.from('ssl_certificates').select('*').eq('user_id', authData.user.id).eq('domain', domain).order('created_at', { ascending: false }),
        supabase.from('backup_snapshots').select('*').eq('user_id', authData.user.id).eq('service_id', serviceId).order('created_at', { ascending: false }),
      ]);

      setDnsZone(dnsZ.data || null);
      setDnsRecords((dnsR.data || []).filter((r) => (r as { zone_id?: string }).zone_id === (dnsZ.data as { id?: string })?.id));
      setDatabases(dbs.data || []);
      setEmailAccounts(emails.data || []);
      setSslCerts(ssls.data || []);
      setBackups(bks.data || []);
      setLoading(false);
    };
    init();
  }, [serviceId, router]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(''), 2000);
  };

  const ensureDnsZone = async () => {
    if (dnsZone) return dnsZone;
    const supabase = createClient();
    const domain = (service?.domain as string) || 'example.com';
    const { data, error } = await supabase.from('dns_zones').insert({
      user_id: user?.id, domain, status: 'active',
    }).select().single();
    if (!error && data) { setDnsZone(data); return data; }
    return null;
  };

  const addDnsRecord = async () => {
    if (!newRecord.value.trim() || !user) return;
    setSubmitting(true);
    const zone = await ensureDnsZone();
    if (!zone) { setSubmitting(false); return; }
    const supabase = createClient();
    const { data } = await supabase.from('dns_records').insert({
      zone_id: (zone as { id: string }).id, user_id: user.id,
      type: newRecord.type, name: newRecord.name, value: newRecord.value,
      ttl: newRecord.ttl, priority: newRecord.priority ? parseInt(newRecord.priority) : null,
    }).select().single();
    if (data) { setDnsRecords([data, ...dnsRecords]); setNewRecord({ type: 'A', name: '@', value: '', ttl: 3600, priority: '' }); }
    setSubmitting(false);
  };

  const deleteDnsRecord = async (id: string) => {
    const supabase = createClient();
    await supabase.from('dns_records').delete().eq('id', id).eq('user_id', user?.id);
    setDnsRecords(dnsRecords.filter((r) => r.id !== id));
  };

  const createDatabase = async () => {
    if (!newDb.db_name.trim() || !user) return;
    setSubmitting(true);
    const supabase = createClient();
    const dbUser = `u_${newDb.db_name.substring(0, 8).toLowerCase()}`;
    const { data } = await supabase.from('hosting_databases').insert({
      user_id: user.id, service_id: serviceId,
      db_name: newDb.db_name, db_type: newDb.db_type, db_user: dbUser,
      db_host: 'localhost', db_port: newDb.db_type === 'mysql' ? 3306 : 5432,
      status: 'active',
    }).select().single();
    if (data) { setDatabases([data, ...databases]); setNewDb({ db_name: '', db_type: 'mysql' }); }
    setSubmitting(false);
  };

  const deleteDatabase = async (id: string) => {
    const supabase = createClient();
    await supabase.from('hosting_databases').delete().eq('id', id).eq('user_id', user?.id);
    setDatabases(databases.filter((d) => d.id !== id));
  };

  const createEmailAccount = async () => {
    if (!newEmail.local_part.trim() || !user) return;
    setSubmitting(true);
    const supabase = createClient();
    const domain = (service?.domain as string) || 'example.com';
    const { data } = await supabase.from('email_accounts').insert({
      user_id: user.id, domain, local_part: newEmail.local_part,
      storage_quota_mb: newEmail.quota, status: 'active',
    }).select().single();
    if (data) { setEmailAccounts([data, ...emailAccounts]); setNewEmail({ local_part: '', password: '', quota: 1024 }); }
    setSubmitting(false);
  };

  const deleteEmailAccount = async (id: string) => {
    const supabase = createClient();
    await supabase.from('email_accounts').delete().eq('id', id).eq('user_id', user?.id);
    setEmailAccounts(emailAccounts.filter((e) => e.id !== id));
  };

  const issueSsl = async () => {
    if (!user) return;
    setSubmitting(true);
    const supabase = createClient();
    const domain = (service?.domain as string) || 'example.com';
    const validFrom = new Date();
    const validUntil = new Date();
    validUntil.setFullYear(validUntil.getFullYear() + 1);
    const { data } = await supabase.from('ssl_certificates').insert({
      user_id: user.id, domain, cert_type: 'lets_encrypt', issuer: "Let's Encrypt",
      valid_from: validFrom.toISOString(), valid_until: validUntil.toISOString(),
      status: 'active', auto_renew: true,
    }).select().single();
    if (data) { setSslCerts([data, ...sslCerts]); }
    setSubmitting(false);
  };

  const createBackup = async () => {
    if (!user) return;
    setSubmitting(true);
    const supabase = createClient();
    const { data } = await supabase.from('backup_snapshots').insert({
      user_id: user.id, service_id: serviceId,
      backup_type: 'manual', size_mb: Math.random() * 500 + 100,
      status: 'completed',
    }).select().single();
    if (data) { setBackups([data, ...backups]); }
    setSubmitting(false);
  };

  const deleteBackup = async (id: string) => {
    const supabase = createClient();
    await supabase.from('backup_snapshots').delete().eq('id', id).eq('user_id', user?.id);
    setBackups(backups.filter((b) => b.id !== id));
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  if (!service) return null;

  const tabs: { id: Tab; label: string; icon: typeof Server }[] = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'dns', label: 'DNS', icon: Globe },
    { id: 'databases', label: 'Databases', icon: Database },
    { id: 'email', label: 'Email', icon: Mail },
    { id: 'ssl', label: 'SSL', icon: Lock },
    { id: 'backups', label: 'Backups', icon: RefreshCw },
    { id: 'files', label: 'Files', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-background/80 backdrop-blur sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2.5"><Logo className="h-8 w-8" /><span className="font-semibold">ELS<span className="text-primary">x</span>Global</span></Link>
          <Link href="/portal" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" /> Back to Portal</Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="liquid-glass-card rounded-2xl p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
                  <Server className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold">{service.plan_name as string}</h1>
                  <p className="text-sm text-muted-foreground">{(service.domain as string) || 'No domain configured'}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-xs px-2.5 py-1 rounded-full border ${service.status === 'active' ? 'text-green-500 bg-green-500/10 border-green-500/20' : 'text-blue-500 bg-blue-500/10 border-blue-500/20'}`}>
                {service.status as string}
              </span>
              {service.control_panel_url && (
                <a href={service.control_panel_url as string} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium">
                  Open Panel <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
            {service.ip_address && <div><p className="text-xs text-muted-foreground mb-1">IP Address</p><div className="flex items-center gap-2"><p className="font-mono text-xs">{service.ip_address as string}</p><button onClick={() => copyToClipboard(service.ip_address as string, 'ip')} className="text-muted-foreground hover:text-primary">{copied === 'ip' ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}</button></div></div>}
            {service.renewal_date && <div><p className="text-xs text-muted-foreground mb-1">Renewal Date</p><p className="text-xs">{new Date(service.renewal_date as string).toLocaleDateString()}</p></div>}
            <div><p className="text-xs text-muted-foreground mb-1">Created</p><p className="text-xs">{new Date(service.created_at as string).toLocaleDateString()}</p></div>
            <div><p className="text-xs text-muted-foreground mb-1">Plan</p><p className="text-xs font-medium">{service.plan_name as string}</p></div>
          </div>
        </div>

        <div className="flex gap-1 mb-6 overflow-x-auto pb-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${activeTab === tab.id ? 'bg-primary/10 text-primary border border-primary/20' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}
            >
              <tab.icon className="h-4 w-4" /> {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: Globe, label: 'DNS Records', value: dnsRecords.length, color: 'text-blue-500' },
              { icon: Database, label: 'Databases', value: databases.length, color: 'text-green-500' },
              { icon: Mail, label: 'Email Accounts', value: emailAccounts.length, color: 'text-amber-500' },
              { icon: Lock, label: 'SSL Certificates', value: sslCerts.length, color: 'text-green-500' },
              { icon: RefreshCw, label: 'Backups', value: backups.length, color: 'text-primary' },
              { icon: HardDrive, label: 'Storage Used', value: '—', color: 'text-muted-foreground' },
            ].map((stat) => (
              <div key={stat.label} className="liquid-glass-card rounded-2xl p-5">
                <stat.icon className={`h-5 w-5 ${stat.color} mb-3`} />
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'dns' && (
          <div className="space-y-6">
            <div className="liquid-glass-card rounded-2xl p-6">
              <h3 className="text-base font-semibold mb-4">Add DNS Record</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
                <select value={newRecord.type} onChange={(e) => setNewRecord({ ...newRecord, type: e.target.value })} className="px-3 py-2.5 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
                  {DNS_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
                <input type="text" value={newRecord.name} onChange={(e) => setNewRecord({ ...newRecord, name: e.target.value })} placeholder="Name (@ or subdomain)" className="px-3 py-2.5 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                <input type="text" value={newRecord.value} onChange={(e) => setNewRecord({ ...newRecord, value: e.target.value })} placeholder="Value (IP or target)" className="px-3 py-2.5 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                <input type="number" value={newRecord.ttl} onChange={(e) => setNewRecord({ ...newRecord, ttl: parseInt(e.target.value) || 3600 })} placeholder="TTL" className="px-3 py-2.5 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                <button onClick={addDnsRecord} disabled={submitting || !newRecord.value.trim()} className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium disabled:opacity-50">
                  {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />} Add
                </button>
              </div>
            </div>
            <div className="liquid-glass-card rounded-2xl overflow-hidden">
              <div className="p-4 border-b border-border"><h3 className="text-base font-semibold">DNS Records ({dnsRecords.length})</h3></div>
              {dnsRecords.length === 0 ? (
                <div className="p-12 text-center"><Globe className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" /><p className="text-sm text-muted-foreground">No DNS records yet. Add one above.</p></div>
              ) : (
                <table className="w-full">
                  <thead><tr className="border-b border-border">
                    <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase">Type</th>
                    <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase">Name</th>
                    <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase">Value</th>
                    <th className="text-right p-4 text-xs font-semibold text-muted-foreground uppercase">TTL</th>
                    <th className="text-right p-4 text-xs font-semibold text-muted-foreground uppercase"></th>
                  </tr></thead>
                  <tbody>{dnsRecords.map((r) => (
                    <tr key={r.id as string} className="border-b border-border/50 hover:bg-muted/20">
                      <td className="p-4"><span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-mono font-medium">{r.type as string}</span></td>
                      <td className="p-4 text-sm font-mono">{r.name as string}</td>
                      <td className="p-4 text-sm font-mono max-w-xs truncate">{r.value as string}</td>
                      <td className="p-4 text-sm text-right text-muted-foreground">{r.ttl as number}</td>
                      <td className="p-4 text-right"><button onClick={() => deleteDnsRecord(r.id as string)} className="text-muted-foreground hover:text-red-500"><Trash2 className="h-4 w-4" /></button></td>
                    </tr>
                  ))}</tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {activeTab === 'databases' && (
          <div className="space-y-6">
            <div className="liquid-glass-card rounded-2xl p-6">
              <h3 className="text-base font-semibold mb-4">Create Database</h3>
              <div className="grid sm:grid-cols-3 gap-3">
                <input type="text" value={newDb.db_name} onChange={(e) => setNewDb({ ...newDb, db_name: e.target.value })} placeholder="Database name" className="px-3 py-2.5 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                <select value={newDb.db_type} onChange={(e) => setNewDb({ ...newDb, db_type: e.target.value })} className="px-3 py-2.5 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
                  <option value="mysql">MySQL</option>
                  <option value="postgresql">PostgreSQL</option>
                </select>
                <button onClick={createDatabase} disabled={submitting || !newDb.db_name.trim()} className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium disabled:opacity-50">
                  {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />} Create
                </button>
              </div>
            </div>
            <div className="liquid-glass-card rounded-2xl overflow-hidden">
              <div className="p-4 border-b border-border"><h3 className="text-base font-semibold">Databases ({databases.length})</h3></div>
              {databases.length === 0 ? (
                <div className="p-12 text-center"><Database className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" /><p className="text-sm text-muted-foreground">No databases yet. Create one above.</p></div>
              ) : (
                <table className="w-full">
                  <thead><tr className="border-b border-border">
                    <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase">Name</th>
                    <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase">Type</th>
                    <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase">User</th>
                    <th className="text-right p-4 text-xs font-semibold text-muted-foreground uppercase">Size</th>
                    <th className="text-right p-4 text-xs font-semibold text-muted-foreground uppercase"></th>
                  </tr></thead>
                  <tbody>{databases.map((db) => (
                    <tr key={db.id as string} className="border-b border-border/50 hover:bg-muted/20">
                      <td className="p-4 text-sm font-mono">{db.db_name as string}</td>
                      <td className="p-4"><span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium uppercase">{db.db_type as string}</span></td>
                      <td className="p-4 text-sm font-mono">{db.db_user as string}</td>
                      <td className="p-4 text-sm text-right text-muted-foreground">{(db.size_mb as number).toFixed(1)} MB</td>
                      <td className="p-4 text-right"><button onClick={() => deleteDatabase(db.id as string)} className="text-muted-foreground hover:text-red-500"><Trash2 className="h-4 w-4" /></button></td>
                    </tr>
                  ))}</tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {activeTab === 'email' && (
          <div className="space-y-6">
            <div className="liquid-glass-card rounded-2xl p-6">
              <h3 className="text-base font-semibold mb-4">Create Email Account</h3>
              <div className="grid sm:grid-cols-4 gap-3">
                <div className="relative">
                  <input type="text" value={newEmail.local_part} onChange={(e) => setNewEmail({ ...newEmail, local_part: e.target.value })} placeholder="name" className="w-full px-3 py-2.5 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">@{(service.domain as string) || 'example.com'}</span>
                </div>
                <input type="password" value={newEmail.password} onChange={(e) => setNewEmail({ ...newEmail, password: e.target.value })} placeholder="Password" className="px-3 py-2.5 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                <input type="number" value={newEmail.quota} onChange={(e) => setNewEmail({ ...newEmail, quota: parseInt(e.target.value) || 1024 })} placeholder="Quota (MB)" className="px-3 py-2.5 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                <button onClick={createEmailAccount} disabled={submitting || !newEmail.local_part.trim()} className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium disabled:opacity-50">
                  {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />} Create
                </button>
              </div>
            </div>
            <div className="liquid-glass-card rounded-2xl overflow-hidden">
              <div className="p-4 border-b border-border"><h3 className="text-base font-semibold">Email Accounts ({emailAccounts.length})</h3></div>
              {emailAccounts.length === 0 ? (
                <div className="p-12 text-center"><Mail className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" /><p className="text-sm text-muted-foreground">No email accounts yet. Create one above.</p></div>
              ) : (
                <table className="w-full">
                  <thead><tr className="border-b border-border">
                    <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase">Email</th>
                    <th className="text-right p-4 text-xs font-semibold text-muted-foreground uppercase">Quota</th>
                    <th className="text-right p-4 text-xs font-semibold text-muted-foreground uppercase">Used</th>
                    <th className="text-center p-4 text-xs font-semibold text-muted-foreground uppercase">Status</th>
                    <th className="text-right p-4 text-xs font-semibold text-muted-foreground uppercase"></th>
                  </tr></thead>
                  <tbody>{emailAccounts.map((em) => (
                    <tr key={em.id as string} className="border-b border-border/50 hover:bg-muted/20">
                      <td className="p-4 text-sm font-medium">{em.local_part as string}@{em.domain as string}</td>
                      <td className="p-4 text-sm text-right text-muted-foreground">{em.storage_quota_mb as number} MB</td>
                      <td className="p-4 text-sm text-right text-muted-foreground">{(em.storage_used_mb as number).toFixed(1)} MB</td>
                      <td className="p-4 text-center"><span className="text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-500">{em.status as string}</span></td>
                      <td className="p-4 text-right"><button onClick={() => deleteEmailAccount(em.id as string)} className="text-muted-foreground hover:text-red-500"><Trash2 className="h-4 w-4" /></button></td>
                    </tr>
                  ))}</tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {activeTab === 'ssl' && (
          <div className="space-y-6">
            <div className="liquid-glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold">SSL Certificates</h3>
                  <p className="text-sm text-muted-foreground mt-1">Issue a free Let&apos;s Encrypt certificate for your domain.</p>
                </div>
                <button onClick={issueSsl} disabled={submitting} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium disabled:opacity-50">
                  {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />} Issue Free SSL
                </button>
              </div>
            </div>
            {sslCerts.length === 0 ? (
              <div className="liquid-glass-card rounded-2xl p-12 text-center">
                <Lock className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">No SSL certificates yet. Issue a free one above.</p>
              </div>
            ) : (
              <div className="space-y-3">{sslCerts.map((cert) => (
                <div key={cert.id as string} className="liquid-glass-card rounded-2xl p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10 border border-green-500/20"><Lock className="h-5 w-5 text-green-500" /></div>
                      <div>
                        <p className="text-sm font-semibold">{cert.domain as string}</p>
                        <p className="text-xs text-muted-foreground">{cert.issuer as string} · {cert.cert_type as string}</p>
                      </div>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-green-500/10 text-green-500 border border-green-500/20">{cert.status as string}</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4 pt-4 border-t border-border text-sm">
                    <div><p className="text-xs text-muted-foreground">Valid From</p><p className="text-xs">{cert.valid_from ? new Date(cert.valid_from as string).toLocaleDateString() : '—'}</p></div>
                    <div><p className="text-xs text-muted-foreground">Valid Until</p><p className="text-xs">{cert.valid_until ? new Date(cert.valid_until as string).toLocaleDateString() : '—'}</p></div>
                    <div><p className="text-xs text-muted-foreground">Auto-Renew</p><p className="text-xs">{cert.auto_renew ? 'Enabled' : 'Disabled'}</p></div>
                  </div>
                </div>
              ))}</div>
            )}
          </div>
        )}

        {activeTab === 'backups' && (
          <div className="space-y-6">
            <div className="liquid-glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold">Backup Snapshots</h3>
                  <p className="text-sm text-muted-foreground mt-1">Create on-demand backups of your hosting service.</p>
                </div>
                <button onClick={createBackup} disabled={submitting} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium disabled:opacity-50">
                  {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />} Create Backup
                </button>
              </div>
            </div>
            {backups.length === 0 ? (
              <div className="liquid-glass-card rounded-2xl p-12 text-center">
                <RefreshCw className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">No backups yet. Create one above.</p>
              </div>
            ) : (
              <div className="space-y-3">{backups.map((bk) => (
                <div key={bk.id as string} className="liquid-glass-card rounded-2xl p-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/20"><RefreshCw className="h-5 w-5 text-primary" /></div>
                    <div>
                      <p className="text-sm font-semibold capitalize">{bk.backup_type as string} backup</p>
                      <p className="text-xs text-muted-foreground">{(bk.size_mb as number).toFixed(1)} MB · {new Date(bk.created_at as string).toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-500">{bk.status as string}</span>
                    <button className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-primary"><Download className="h-4 w-4" /></button>
                    <button onClick={() => deleteBackup(bk.id as string)} className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-red-500"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </div>
              ))}</div>
            )}
          </div>
        )}

        {activeTab === 'files' && (
          <div className="liquid-glass-card rounded-2xl p-12 text-center">
            <FileText className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">File Manager</h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">Access your files via the control panel. Upload, edit, and manage your website files with our web-based file manager.</p>
            {service.control_panel_url ? (
              <a href={service.control_panel_url as string} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm">
                Open File Manager <ExternalLink className="h-4 w-4" />
              </a>
            ) : (
              <p className="text-sm text-muted-foreground">File manager will be available once your service is provisioned.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
