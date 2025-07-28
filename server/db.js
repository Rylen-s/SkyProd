// db.js
import dotenv from 'dotenv'
dotenv.config();
import { createClient } from '@supabase/supabase-js';

console.log('Generating supabase client');
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { db: { connectionString: process.env.DATABASE_URL } }
);

export default supabase;
