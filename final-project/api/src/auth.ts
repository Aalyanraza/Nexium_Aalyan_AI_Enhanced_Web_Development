import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

// Function to send magic link
export async function sendMagicLink(email: string) {
  const { data, error } = await supabase.auth.signInWithOtp({ email });
  if (error) throw new Error(error.message);
  return data;
}
