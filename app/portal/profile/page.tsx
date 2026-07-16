'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import { Loader2, User, Mail, Lock, Shield, Save, Check, AlertCircle, LogOut, Menu, X, Bell, LayoutDashboard, Server, Receipt, LifeBuoy } from 'lucide-react';
import Link from 'next/link';
import { Logo } from '@/components/site/logo';

type Tab = 'profile' | 'security';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<{ id: string; email: string } | null>(null);
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  useEffect(() => {
    const init = async () => {
      const supabase = createClient();
      const { data: authData } = await supabase.auth.getUser();
      if (!authData.data.user) { router.push('/portal/login'); return; }
      setUser({ id: authData.data.user.id, email: authData.data.user.email || '' });
      setFullName((authData.data.user.user_metadata?.full_name as string) || '');
      setLoading(false);
    };
    init();
  }, [router]);

  const handleSaveProfile = async () => {
    if (!user) return;
    setSaving(true); setError('');
    try {
      const { error } = await createClient().auth.updateUser({ data: { full_name: fullName } });
      if (error) throw error;
      setSaved(true); setTimeout(() => setSaved(false), 3000);
    } catch (err) { setError(err instanceof Error ? err.message : 'Failed to update profile'); }
    finally { setSaving(false); }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) { setPasswordError('Passwords do not match'); return; }
    if (newPassword.length < 6) { setPasswordError('Password must be at least 6 characters'); return; }
    setSaving(true); setPasswordError(''); setPasswordSuccess(false);
    try {
      const { error } = await createClient().auth.updateUser({ password: newPassword });
      if (error) throw error;
      setPasswordSuccess(true); setNewPassword(''); setConfirmPassword('');
      setTimeout(() => setPasswordSuccess(false), 3000);
    } catch (err) { setPasswordError(err instanceof Error ? err.message : 'Failed to change password'); }
    finally { setSaving(false); }
  };

  const handleSignOut = async () => { await createClient().auth.signOut(); router.push('/'); };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  const navItems = [
    { label: 'Overview', icon: LayoutDashboard, href: '/portal' },
    { label: 'My Hosting', icon: Server, href: '/portal' },
    { label: 'Invoices', icon: Receipt, href: '/portal' },
    { label: 'Support', icon: LifeBuoy, href: '/portal' },
    { label: 'Profile', icon: User, href: '/portal/profile' },
    { label: 'Notifications', icon: Bell, href: '/portal/notifications' },
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
          <nav className="px-3 space-y-1">{navItems.map((item) => (
            <Link key={item.label} href={item.href} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${item.label === 'Profile' ? 'bg-primary/10 text-primary border border-primary/20' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}><item.icon className="h-4 w-4" />{item.label}</Link>
          ))}</nav>
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border"><button onClick={handleSignOut} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-red-500 hover:bg-red-500/5 transition-colors"><LogOut className="h-4 w-4" />Sign Out</button></div>
        </aside>

        <main className="flex-1 p-6 lg:p-8 max-w-4xl">
          <h1 className="text-2xl font-semibold tracking-tight mb-6">Profile & Settings</h1>
          <div className="flex gap-2 mb-6 border-b border-border">
            <button onClick={() => setActiveTab('profile')} className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${activeTab === 'profile' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}>Profile</button>
            <button onClick={() => setActiveTab('security')} className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${activeTab === 'security' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}>Security</button>
          </div>

          {activeTab === 'profile' && (
            <div className="liquid-glass-card rounded-2xl p-6 max-w-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 border border-primary/20"><User className="h-8 w-8 text-primary" /></div>
                <div><h2 className="text-base font-semibold">{fullName || 'User'}</h2><p className="text-sm text-muted-foreground">{user?.email}</p></div>
              </div>
              <div className="space-y-4">
                <div><label className="text-sm font-medium mb-1.5 block">Full Name</label><div className="relative"><User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40" /></div></div>
                <div><label className="text-sm font-medium mb-1.5 block">Email</label><div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><input type="email" value={user?.email || ''} disabled className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-muted/30 border border-border text-sm text-muted-foreground" /></div><p className="text-xs text-muted-foreground mt-1.5">Email cannot be changed. Contact support if needed.</p></div>
                {error && <div className="text-sm text-red-500 bg-red-500/5 border border-red-500/20 rounded-lg p-3 flex items-center gap-2"><AlertCircle className="h-4 w-4" />{error}</div>}
                {saved && <div className="text-sm text-green-500 bg-green-500/5 border border-green-500/20 rounded-lg p-3 flex items-center gap-2"><Check className="h-4 w-4" />Profile updated successfully</div>}
                <button onClick={handleSaveProfile} disabled={saving} className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 disabled:opacity-50">{saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}Save Changes</button>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6 max-w-2xl">
              <div className="liquid-glass-card rounded-2xl p-6">
                <h2 className="text-base font-semibold mb-4 flex items-center gap-2"><Lock className="h-4 w-4 text-primary" />Change Password</h2>
                <div className="space-y-4">
                  <div><label className="text-sm font-medium mb-1.5 block">New Password</label><input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="At least 6 characters" className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40" /></div>
                  <div><label className="text-sm font-medium mb-1.5 block">Confirm Password</label><input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Re-enter new password" className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40" /></div>
                  {passwordError && <div className="text-sm text-red-500 bg-red-500/5 border border-red-500/20 rounded-lg p-3 flex items-center gap-2"><AlertCircle className="h-4 w-4" />{passwordError}</div>}
                  {passwordSuccess && <div className="text-sm text-green-500 bg-green-500/5 border border-green-500/20 rounded-lg p-3 flex items-center gap-2"><Check className="h-4 w-4" />Password changed successfully</div>}
                  <button onClick={handleChangePassword} disabled={saving || !newPassword || !confirmPassword} className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 disabled:opacity-50">{saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />}Update Password</button>
                </div>
              </div>
              <div className="liquid-glass-card rounded-2xl p-6">
                <h2 className="text-base font-semibold mb-4 flex items-center gap-2"><Shield className="h-4 w-4 text-primary" />Account Security</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 liquid-glass rounded-xl"><div><p className="text-sm font-medium">Two-Factor Authentication</p><p className="text-xs text-muted-foreground">Add an extra layer of security</p></div><span className="text-xs px-2 py-1 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20">Coming Soon</span></div>
                  <div className="flex items-center justify-between p-3 liquid-glass rounded-xl"><div><p className="text-sm font-medium">Active Sessions</p><p className="text-xs text-muted-foreground">Manage devices logged into your account</p></div><span className="text-xs text-muted-foreground">1 active session</span></div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
