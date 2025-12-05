-- Add password_hash column to existing community_members table
ALTER TABLE community_members 
ADD COLUMN IF NOT EXISTS password_hash TEXT;

-- Ensure indexes exist
CREATE INDEX IF NOT EXISTS idx_community_members_email ON community_members(email);
CREATE INDEX IF NOT EXISTS idx_community_members_registered_at ON community_members(registered_at DESC);

-- Ensure RLS is disabled
ALTER TABLE community_members DISABLE ROW LEVEL SECURITY;


