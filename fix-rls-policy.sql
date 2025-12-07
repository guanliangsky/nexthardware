-- Fix RLS (Row Level Security) for newsletter_subscribers table
-- Run this in Supabase SQL Editor

-- Option 1: Disable RLS (Simplest - allows all operations with service_role key)
ALTER TABLE newsletter_subscribers DISABLE ROW LEVEL SECURITY;

-- Option 2: OR Create a policy to allow inserts (More secure)
-- Uncomment below if you prefer policies over disabling RLS:

-- CREATE POLICY "Allow service role inserts" ON newsletter_subscribers
--   FOR INSERT
--   TO service_role
--   WITH CHECK (true);

-- CREATE POLICY "Allow service role selects" ON newsletter_subscribers
--   FOR SELECT
--   TO service_role
--   USING (true);

-- Verify RLS status
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'newsletter_subscribers';

