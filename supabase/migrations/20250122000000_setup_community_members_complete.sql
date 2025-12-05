-- Complete setup for community_members table with authentication
-- Run this SQL in Supabase SQL Editor

-- Create community_members table (if it doesn't exist)
CREATE TABLE IF NOT EXISTS community_members (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  password_hash TEXT,
  registered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  discord_invite_sent BOOLEAN DEFAULT FALSE
);

-- Add password_hash column if table exists but column doesn't
ALTER TABLE community_members 
ADD COLUMN IF NOT EXISTS password_hash TEXT;

-- Create indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_community_members_email ON community_members(email);
CREATE INDEX IF NOT EXISTS idx_community_members_registered_at ON community_members(registered_at DESC);

-- Disable RLS (Row Level Security) for service role access
ALTER TABLE community_members DISABLE ROW LEVEL SECURITY;

-- Update comment
COMMENT ON TABLE community_members IS 'Stores community member registrations with authentication';

-- Verify the table was created (this will show an error if table doesn't exist, which is fine)
DO $$
BEGIN
  IF EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'community_members'
  ) THEN
    RAISE NOTICE '✅ Table community_members created successfully!';
  ELSE
    RAISE NOTICE '❌ Table community_members was not created. Please check for errors above.';
  END IF;
END $$;


