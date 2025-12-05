-- Create community_members table for storing member registrations
CREATE TABLE IF NOT EXISTS community_members (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  registered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  discord_invite_sent BOOLEAN DEFAULT FALSE
);

-- Create indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_community_members_email ON community_members(email);
CREATE INDEX IF NOT EXISTS idx_community_members_registered_at ON community_members(registered_at DESC);

-- Disable RLS (Row Level Security) for service role access
ALTER TABLE community_members DISABLE ROW LEVEL SECURITY;

-- Optional: Add a comment
COMMENT ON TABLE community_members IS 'Stores community member registrations with name, email, and phone';


