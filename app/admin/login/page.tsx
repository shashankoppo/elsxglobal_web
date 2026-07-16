'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Lock, Mail, ArrowRight, Shield, ShieldCheck, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { Logo } from '@/components/site/logo';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [needsSetup, setNeedsSetup] = useState(false);
  const [setupMode, setSetupMode] = useState(false);
  const [setupName, setSetupName] = useState('');
  const [setupSuccess, setSetupSuccess] = useState(false);

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  useEffect(() => {
    const token = sessionStorage.getItem('admin_token');
    if (token) {
      router.push('/admin');
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${supabaseUrl}/functions/v1/admin-auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseAnonKey}`,
        },
        body: JSON.stringify({ action: 'login', email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.error?.includes('Invalid credentials')) {
          setError('Invalid email or password. If this is a new installation, you may need to set up the admin account first.');
          setNeedsSetup(true);
        } else {
          throw new Error(data.error || 'Login failed');
        }
        return;
      }
      sessionStorage.setItem('admin_token', data.token);
      sessionStorage.setItem('admin_email', data.admin.email);
      sessionStorage.setItem('admin_name', data.admin.name);
      router.push('/admin');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${supabaseUrl}/functions/v1/admin-auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseAnonKey}`,
        },
        body: JSON.stringify({
          action: 'setup',
          email,
          password,
          name: setupName || 'Administrator',
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Setup failed');
      sessionStorage.setItem('admin_token', data.token);
      sessionStorage.setItem('admin_email', data.admin.email);
      sessionStorage.setItem('admin_name', data.admin.name);
      setSetupSuccess(true);
      setTimeout(() => router.push('/admin'), 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Setup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-6">
            <Logo className="h-9 w-9" />
            <span className="text-xl font-semibold">ELS<span className="text-primary">x</span>Global</span>
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-medium text-primary">Admin Panel</span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">
            {setupMode ? 'Initialize Admin Account' : 'Admin Sign In'}
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            {setupMode
              ? 'Create the first admin account for this installation'
              : 'Sign in to the ELSxGlobal administration dashboard'}
          </p>
        </div>

        {setupSuccess ? (
          <div className="liquid-glass-strong rounded-2xl p-8 text-center">
            <ShieldCheck className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h2 className="text-lg font-semibold mb-2">Admin account created!</h2>
            <p className="text-sm text-muted-foreground">Redirecting to dashboard...</p>
            <Loader2 className="h-5 w-5 animate-spin text-primary mx-auto mt-4" />
          </div>
        ) : (
          <div className="liquid-glass-strong rounded-2xl p-8">
            {setupMode && (
              <div className="mb-4 flex items-start gap-2 text-xs text-amber-600 bg-amber-500/5 border border-amber-500/20 rounded-lg p-3">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>Setup mode is only available when no admin accounts exist. This creates a superadmin account.</span>
              </div>
            )}
            <form onSubmit={setupMode ? handleSetup : handleLogin} className="space-y-4">
              {setupMode && (
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Full Name</label>
                  <input
                    type="text"
                    value={setupName}
                    onChange={(e) => setSetupName(e.target.value)}
                    placeholder="Administrator Name"
                    className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40"
                  />
                </div>
              )}
              <div>
                <label className="text-sm font-medium mb-1.5 block">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="admin@elsxglobal.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder={setupMode ? 'Minimum 8 characters' : '********'}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40"
                  />
                </div>
              </div>
              {error && (
                <div className="text-sm text-red-500 bg-red-500/5 border border-red-500/20 rounded-lg p-3 flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
                {loading ? 'Please wait...' : setupMode ? 'Create Admin Account' : 'Sign In'}
              </button>
            </form>

            {needsSetup && !setupMode && (
              <div className="mt-4 pt-4 border-t border-border text-center">
                <p className="text-sm text-muted-foreground mb-3">No admin account found yet?</p>
                <button
                  onClick={() => { setSetupMode(true); setError(''); }}
                  className="text-sm text-primary hover:underline font-medium"
                >
                  Initialize Admin Account
                </button>
              </div>
            )}
            {setupMode && (
              <div className="mt-4 pt-4 border-t border-border text-center">
                <button
                  onClick={() => { setSetupMode(false); setError(''); setNeedsSetup(false); }}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Back to Login
                </button>
              </div>
            )}
          </div>
        )}

        <div className="flex items-center justify-center gap-2 mt-6 text-xs text-muted-foreground">
          <Shield className="h-3.5 w-3.5" />
          <span>Secured admin access · ELSxGlobal</span>
        </div>
      </div>
    </div>
  );
}
