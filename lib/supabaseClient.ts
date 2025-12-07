import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let supabase: any;

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClientComponentClient({
    supabaseUrl,
    supabaseKey: supabaseAnonKey,
  });
} else {
  const noopSubscription = { unsubscribe: () => {} };
  supabase = {
    auth: {
      getSession: async () => ({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: noopSubscription } }),
      signOut: async () => ({ error: null }),
      signInWithPassword: async () => ({ data: null, error: { message: 'Supabase not configured' } }),
      signInWithOAuth: async () => ({ data: null, error: { message: 'Supabase not configured' } }),
      resetPasswordForEmail: async () => ({ data: null, error: { message: 'Supabase not configured' } }),
      updateUser: async () => ({ data: null, error: { message: 'Supabase not configured' } }),
    },
    from: () => ({
      select: async () => ({ data: null, error: { message: 'Supabase not configured' } }),
      insert: async () => ({ data: null, error: { message: 'Supabase not configured' } }),
      update: async () => ({ data: null, error: { message: 'Supabase not configured' } }),
      delete: async () => ({ data: null, error: { message: 'Supabase not configured' } }),
      eq: () => ({ data: null, error: { message: 'Supabase not configured' } }),
      limit: () => ({ data: null, error: { message: 'Supabase not configured' } }),
      single: () => ({ data: null, error: { message: 'Supabase not configured' } }),
    }),
  };
}

export { supabase };
