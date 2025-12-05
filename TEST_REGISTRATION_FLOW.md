# Testing Registration and Login Flow

## Current Status
✅ UI is working correctly
❌ Database table needs to be created first

## Step 1: Create Database Table (REQUIRED)

Before testing, you need to run the SQL migration in Supabase:

1. Go to: https://supabase.com/dashboard
2. Select project: `nexthardware`
3. Click **SQL Editor**
4. Run this SQL:

```sql
-- Create community_members table (if it doesn't exist)
CREATE TABLE IF NOT EXISTS community_members (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  password_hash TEXT,
  registered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  discord_invite_sent BOOLEAN DEFAULT FALSE
);

-- Add password_hash column if table exists but column doesn't
ALTER TABLE community_members 
ADD COLUMN IF NOT EXISTS password_hash TEXT;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_community_members_email ON community_members(email);
CREATE INDEX IF NOT EXISTS idx_community_members_registered_at ON community_members(registered_at DESC);

-- Disable RLS
ALTER TABLE community_members DISABLE ROW LEVEL SECURITY;

-- Update comment
COMMENT ON TABLE community_members IS 'Stores community member registrations with authentication';
```

5. Click **Run**

## Step 2: Test Registration

1. Go to: https://nexthardware.io/register
2. Fill out the form:
   - Name: Test User
   - Email: test@example.com
   - Phone: +1 (555) 123-4567 (optional)
   - Password: testpass123
   - Confirm Password: testpass123
3. Click "Register"
4. Should see success message and redirect to login page

## Step 3: Test Login

1. Go to: https://nexthardware.io/login
2. Enter:
   - Email: test@example.com
   - Password: testpass123
3. Click "Login"
4. Should redirect to membership dashboard

## Step 4: Test Membership Dashboard

1. Should see profile information
2. Should see quick links (Discord, Events, Contact)
3. Should see community resources
4. Test logout button

## Step 5: Test Protected Route

1. Logout
2. Try to access: https://nexthardware.io/membership
3. Should redirect to login page

## API Testing (Optional)

### Test Registration API
```bash
curl -X POST https://nexthardware.io/api/members \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+1 (555) 123-4567",
    "password": "testpass123"
  }'
```

### Test Login API
```bash
curl -X POST https://nexthardware.io/api/members/auth \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "testpass123"
  }' \
  -c cookies.txt
```

### Test Session Check
```bash
curl -X GET https://nexthardware.io/api/members/auth \
  -b cookies.txt
```

### Test Logout
```bash
curl -X DELETE https://nexthardware.io/api/members/auth \
  -b cookies.txt
```

## Expected Results

✅ Registration form validates input
✅ Password must be at least 6 characters
✅ Passwords must match
✅ Email must be valid format
✅ Registration saves to database
✅ Password is hashed (not stored in plain text)
✅ Login verifies password correctly
✅ Session cookie is set (HTTP-only)
✅ Membership dashboard shows user info
✅ Protected routes redirect if not logged in
✅ Logout clears session

## Troubleshooting

### "Table not found" error
- Run the SQL migration in Supabase first

### "Email already registered"
- Use a different email or login instead

### "Invalid email or password"
- Check email and password are correct
- Make sure you registered first

### Session not persisting
- Check browser cookies are enabled
- Check you're using HTTPS in production

### Can't access membership page
- Make sure you're logged in first
- Check session cookie is set


