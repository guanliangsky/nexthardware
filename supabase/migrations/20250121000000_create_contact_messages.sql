-- Create contact_messages table for storing contact form submissions
CREATE TABLE IF NOT EXISTS contact_messages (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  read BOOLEAN DEFAULT FALSE
);

-- Create an index for faster lookups
CREATE INDEX IF NOT EXISTS idx_contact_created_at ON contact_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_read ON contact_messages(read);

-- Disable RLS (Row Level Security) for service role access
ALTER TABLE contact_messages DISABLE ROW LEVEL SECURITY;

-- Optional: Add a comment
COMMENT ON TABLE contact_messages IS 'Stores contact form submissions from the website';

