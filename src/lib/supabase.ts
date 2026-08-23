import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error("Missing Supabase environment variables.");
}

// Create a single supabase client for interacting with your database
// using the service role key to securely bypass RLS for server actions.
export const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false, // Since this is server-side only
    autoRefreshToken: false,
    detectSessionInUrl: false,
  },
});
