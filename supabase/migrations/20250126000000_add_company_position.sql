-- Add company and position fields to community_members table
ALTER TABLE community_members 
ADD COLUMN IF NOT EXISTS company TEXT,
ADD COLUMN IF NOT EXISTS position TEXT;

-- Add comments
COMMENT ON COLUMN community_members.company IS 'Company or organization name';
COMMENT ON COLUMN community_members.position IS 'Job title or position';


