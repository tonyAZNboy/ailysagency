// AiLys Agency Supabase client.
// Reads URL + anon key from Vite env so we can swap projects without touching code.
// Set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY in .env (local) and
// in Cloudflare Pages environment variables (production).
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const RAW_URL = (import.meta.env.VITE_SUPABASE_URL ?? '').trim();
const RAW_KEY = (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? '').trim();

// supabase-js throws on empty URL. Use a non-functional placeholder so the client
// can be constructed at boot. Network calls will fail at request time, which is
// caught by useAIEngine and the audit form, both of which fall back gracefully.
const SUPABASE_URL = RAW_URL || 'https://placeholder.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = RAW_KEY || 'placeholder-key';

if (!RAW_URL || !RAW_KEY) {
  // eslint-disable-next-line no-console
  console.warn(
    '[AiLys] VITE_SUPABASE_URL / VITE_SUPABASE_PUBLISHABLE_KEY not set. Chat and audit form will not work until configured.'
  );
}

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    persistSession: true,
    autoRefreshToken: true,
  },
});
