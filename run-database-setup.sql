-- Complete setup for community_members table with authentication
-- Copy this entire file and paste into Supabase SQL Editor

CREATE TABLE IF NOT EXISTS community_members (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  password_hash TEXT,
  registered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  discord_invite_sent BOOLEAN DEFAULT FALSE
);

ALTER TABLE community_members 
ADD COLUMN IF NOT EXISTS password_hash TEXT;

CREATE INDEX IF NOT EXISTS idx_community_members_email ON community_members(email);
CREATE INDEX IF NOT EXISTS idx_community_members_registered_at ON community_members(registered_at DESC);

ALTER TABLE community_members DISABLE ROW LEVEL SECURITY;

COMMENT ON TABLE community_members IS 'Stores community member registrations with authentication';


