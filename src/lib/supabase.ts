import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://foxezhxncpzzpbemdafa.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_ByWaCTFpHF0GXiY0BoFHqw_b4f8Ao7Q';

// Client for public interactions (respects RLS)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin Client for API Routes (Bypasses RLS - Use carefully!)
// Only initialize this if the key exists (server-side only)
export const supabaseAdmin = process.env.SUPABASE_SERVICE_ROLE_KEY
  ? createClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY)
  : null;