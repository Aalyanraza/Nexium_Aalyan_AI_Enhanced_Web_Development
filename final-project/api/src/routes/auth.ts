import { Router } from 'express';
import { supabase } from '../lib/supabase';

const router = Router();

// Send magic link
router.post('/magic-link', async (req, res) => {
  const { email } = req.body;
  const { data, error } = await supabase.auth.signInWithOtp({ email });

  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: 'Magic link sent!', data });
});

export default router;
