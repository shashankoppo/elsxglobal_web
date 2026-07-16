import { createClient as supabaseCreateClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

const clientOptions = {
  auth: { persistSession: true, autoRefreshToken: true },
};

let _client: SupabaseClient | null = null;

export function createClient(): SupabaseClient {
  if (!_client) {
    _client = supabaseCreateClient(supabaseUrl, supabaseAnonKey, clientOptions);
  }
  return _client;
}

export const supabase = createClient();
