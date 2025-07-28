// scripts/testSupabase.js
import dotenv from 'dotenv';
dotenv.config();
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

(async () => {
  const { data, error } = await supabase.from('activities').select();
  if (error) {
    console.error('❌ Supabase query failed:', error);
    process.exit(1);
  }
  console.log('✅ Activities:', data);
  process.exit(0);
})();
