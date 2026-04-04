// ============================================================
//  SUPABASE CONFIG
// ============================================================
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL  = 'https://hfwywsfqwnlavhnmepyj.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhmd3l3c2Zxd25sYXZobm1lcHlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUyMDY5OTYsImV4cCI6MjA5MDc4Mjk5Nn0.tzytS8S0EzA0RylSt3RM0Y36zxlQVU0KyxKstQlSPX8';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON);

// ============================================================
//  AUTH FUNCTIONS
// ============================================================

export async function signUp(email, password, username) {
  const { data: existing } = await supabase
    .from('profiles')
    .select('id')
    .eq('username', username)
    .maybeSingle();

  if (existing) return { error: { message: 'This username is already in use' } };

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { username }
    }
  });

  return { data, error };
}

// Login
export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  return { data, error };
}

// Logout
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

export async function getSession() {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

export async function getProfile(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  return { data, error };
}
