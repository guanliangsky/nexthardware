-- Run this SQL in your Supabase SQL Editor
-- This creates the newsletter_subscribers table

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id BIGSERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index for faster email lookups
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email);

-- Optional: Add a comment
COMMENT ON TABLE newsletter_subscribers IS 'Stores email addresses of newsletter subscribers';

