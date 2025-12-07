# ⚠️ Important: SQL Execution Limitation

Unfortunately, **Supabase doesn't allow executing DDL (CREATE TABLE) statements via the REST API or JS client** for security reasons. 

## ✅ Solution: Use Supabase Dashboard (Recommended)

The easiest and most reliable way is to use the Supabase Dashboard:

1. **Go to**: https://supabase.com/dashboard/project/snpmvpsoxeieguojlwzv/editor
2. **Click**: "SQL Editor" in left sidebar
3. **Click**: "New query"
4. **Copy and paste** the SQL from `run-database-setup.sql`
5. **Click**: "Run" button

## 🔧 Alternative: Supabase CLI (If Linked)

If your project is linked to Supabase CLI:

```bash
# Link project (one time)
supabase link --project-ref snpmvpsoxeieguojlwzv

# Execute SQL file
supabase db execute --file run-database-setup.sql
```

However, you need to be authenticated with Supabase CLI first.

## 📋 Quick Copy-Paste SQL

Here's the SQL ready to paste:

```sql
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

## 🎯 Direct Link

**Quick access**: https://supabase.com/dashboard/project/snpmvpsoxeieguojlwzv/editor

Just paste the SQL above and click "Run"!


