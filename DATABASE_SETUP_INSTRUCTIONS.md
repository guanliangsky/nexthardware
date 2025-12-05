# Database Setup Instructions

## Quick Setup (5 minutes)

### Step 1: Access Supabase Dashboard

1. Go to: **https://supabase.com/dashboard**
2. Sign in with your Supabase account
3. Select your project: **nexthardware**

### Step 2: Open SQL Editor

1. In the left sidebar, click **"SQL Editor"**
2. Click **"New query"** button (top right)

### Step 3: Run the SQL Script

1. Copy the entire contents of this file: `supabase/migrations/20250122000000_setup_community_members_complete.sql`
2. Paste it into the SQL Editor
3. Click **"Run"** button (or press `Ctrl+Enter` / `Cmd+Enter`)

### Step 4: Verify Table Creation

1. Go to **"Table Editor"** in the left sidebar
2. You should see **`community_members`** table
3. Click on it to view the structure
4. It should have these columns:
   - `id` (bigserial, primary key)
   - `name` (text)
   - `email` (text, unique)
   - `phone` (text, nullable)
   - `password_hash` (text, nullable)
   - `registered_at` (timestamp)
   - `discord_invite_sent` (boolean)

## Alternative: Copy-Paste SQL

If you prefer, here's the SQL to copy directly:

```sql
-- Complete setup for community_members table with authentication
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
```

## Verification

After running the SQL, verify it worked:

1. **Check Table Editor**: Should see `community_members` table
2. **Test Registration**: Try registering at https://nexthardware.io/register
3. **Check Data**: Go to Table Editor > community_members to see new registrations

## Troubleshooting

### Error: "relation already exists"
- This means the table already exists. That's okay! The script uses `IF NOT EXISTS` so it's safe to run.

### Error: "column already exists"
- This means `password_hash` column already exists. That's also okay!

### Error: "permission denied"
- Make sure you're using the SQL Editor (not a restricted user)
- Check you're logged into the correct Supabase project

### Table not showing up
- Refresh the Table Editor page
- Check the SQL Editor output for any errors
- Make sure you selected the correct database/project

## Next Steps

Once the table is created:

1. ✅ Test registration: https://nexthardware.io/register
2. ✅ Test login: https://nexthardware.io/login
3. ✅ Test membership dashboard: https://nexthardware.io/membership

## Need Help?

If you encounter any issues:
1. Check the SQL Editor output for error messages
2. Verify your Supabase project is active
3. Make sure environment variables are set in Vercel:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`


