// Supabase client for client-side use (with anon key)
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

// Create client - createClientComponentClient automatically uses NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
export const supabase = createClientComponentClient();

