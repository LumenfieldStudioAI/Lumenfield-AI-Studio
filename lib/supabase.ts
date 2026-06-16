import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL");
}

if (!supabaseAnonKey) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_ANON_KEY");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type LumenfieldUser = {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  credits: number;
  plan: string;
  created_at: string;
};

export type Generation = {
  id: string;
  user_id: string;
  prompt: string;
  mode: string;
  provider?: string;
  status: string;
  media_url?: string;
  credits_used: number;
  created_at: string;
};
