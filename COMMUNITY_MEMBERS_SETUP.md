# Community Members Registration Setup

## Overview
The community member registration feature allows users to register with their name, email, and phone number. After registration, they automatically receive a Discord invite link via email.

## Database Setup

### Step 1: Create the `community_members` table in Supabase

1. Go to your Supabase dashboard: https://supabase.com/dashboard
2. Select your project: `nexthardware`
3. Go to **SQL Editor**
4. Run this SQL:

```sql
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
```

5. Click **Run** to execute the SQL

### Step 2: Verify the table was created

1. Go to **Table Editor** in Supabase
2. You should see `community_members` table
3. The table should have columns: `id`, `name`, `email`, `phone`, `registered_at`, `discord_invite_sent`

## How It Works

1. **User Registration**: User fills out the form on the "Join the Community" section with:
   - Name (required)
   - Email (required)
   - Phone (optional)

2. **Data Storage**: Registration data is saved to Supabase `community_members` table

3. **Email Notification**: Two emails are sent via Formspree:
   - **Welcome email to the new member** with Discord invite link
   - **Notification email to admin** about the new registration

4. **Discord Link**: The Discord invite link (`https://discord.gg/d5dTjjVD`) is included in the welcome email

## API Endpoint

- **URL**: `/api/members`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1 (555) 123-4567"
  }
  ```

## Viewing Members

### Option 1: Supabase Dashboard
1. Go to Supabase dashboard > **Table Editor** > `community_members`
2. View all registered members with their details

### Option 2: Admin Page (Future)
You can create an admin page similar to `/admin/subscribers` to view and manage community members.

## Email Configuration

The emails are sent via Formspree using the `FORMSPREE_CONTACT_FORM_ID` environment variable. Make sure this is configured in:
- `.env.local` (for local development)
- Vercel environment variables (for production)

## Testing

1. Go to the "Join the Community" section on your website
2. Fill out the registration form
3. Submit the form
4. Check your email for the Discord invite link
5. Check Supabase dashboard to verify the member was saved

## Troubleshooting

- **Email not received**: Check Formspree configuration and spam folder
- **Registration fails**: Check Supabase connection and table exists
- **Duplicate email error**: The system prevents duplicate registrations (email must be unique)


