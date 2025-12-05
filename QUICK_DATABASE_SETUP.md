# 🚀 Quick Database Setup - 5 Minutes

## Current Status
❌ Database table not created yet
✅ All code is ready and deployed

## Step-by-Step Instructions

### Step 1: Open Supabase Dashboard
1. Go to: **https://supabase.com/dashboard**
2. Login with your Supabase account
3. Click on your project: **nexthardware**

### Step 2: Open SQL Editor
1. Look at the **left sidebar**
2. Click on **"SQL Editor"** (it has a database icon)
3. Click the **"New query"** button (top right, green button)

### Step 3: Copy This SQL Code

Copy the ENTIRE block below (from `-- Complete setup` to the end):

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

### Step 4: Paste and Run
1. **Paste** the SQL code into the SQL Editor
2. Click the **"Run"** button (or press `Cmd+Enter` on Mac / `Ctrl+Enter` on Windows)
3. Wait for it to complete (should show "Success" message)

### Step 5: Verify It Worked
1. In the left sidebar, click **"Table Editor"**
2. You should see a table called **`community_members`**
3. Click on it to see the columns

## ✅ Success Indicators

You'll know it worked if:
- ✅ SQL Editor shows "Success" message
- ✅ Table Editor shows `community_members` table
- ✅ Table has these columns: id, name, email, phone, password_hash, registered_at, discord_invite_sent

## 🧪 Test After Setup

Once the table is created, test the registration:

1. Go to: **https://nexthardware.io/register**
2. Fill out the form:
   - Name: Test User
   - Email: test@example.com
   - Phone: +1 (555) 123-4567
   - Password: testpass123
   - Confirm Password: testpass123
3. Click "Register"
4. Should see success message!

## ❌ Troubleshooting

### "relation already exists" error
- ✅ This is OK! It means the table already exists
- You can ignore this error

### "permission denied" error
- Make sure you're logged into the correct Supabase account
- Make sure you selected the correct project

### Table not showing in Table Editor
- Refresh the page (F5 or Cmd+R)
- Check if SQL Editor showed any errors

### Still getting "table not found" error
- Wait 1-2 minutes after running SQL (sometimes takes time to sync)
- Double-check you ran the SQL in the correct project
- Verify the table exists in Table Editor

## 📞 Need Help?

If you're stuck:
1. Check the SQL Editor output for error messages
2. Make sure you're in the correct Supabase project
3. Verify your environment variables are set in Vercel

---

**Once you've run the SQL, let me know and I'll test the registration flow!**


