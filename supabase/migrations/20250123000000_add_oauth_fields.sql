-- Add OAuth support fields to community_members table
ALTER TABLE community_members 
ADD COLUMN IF NOT EXISTS oauth_provider TEXT,
ADD COLUMN IF NOT EXISTS oauth_id TEXT;

-- Create index for OAuth lookups
CREATE INDEX IF NOT EXISTS idx_community_members_oauth ON community_members(oauth_provider, oauth_id);

-- Add comment
COMMENT ON COLUMN community_members.oauth_provider IS 'OAuth provider: google, github, etc.';
COMMENT ON COLUMN community_members.oauth_id IS 'OAuth provider user ID';


