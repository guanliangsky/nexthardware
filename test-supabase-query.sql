-- Test query to check contact_messages table
-- Run this in Supabase SQL Editor or via CLI

-- Check if table exists and has data
SELECT 
  COUNT(*) as total_messages,
  COUNT(CASE WHEN read = false THEN 1 END) as unread_messages,
  MAX(created_at) as latest_message
FROM contact_messages;

-- Show recent messages (last 5)
SELECT 
  id,
  name,
  email,
  subject,
  LEFT(message, 50) as message_preview,
  created_at,
  read
FROM contact_messages
ORDER BY created_at DESC
LIMIT 5;

