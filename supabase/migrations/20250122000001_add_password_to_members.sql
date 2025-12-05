-- Add password_hash column to community_members table
ALTER TABLE community_members 
ADD COLUMN IF NOT EXISTS password_hash TEXT;

-- Add index for faster email lookups (if not exists)
CREATE INDEX IF NOT EXISTS idx_community_members_email ON community_members(email);

-- Update comment
COMMENT ON TABLE community_members IS 'Stores community member registrations with authentication';


