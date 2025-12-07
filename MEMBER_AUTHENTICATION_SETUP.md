# Member Authentication System Setup

## Overview
Complete user registration and login system with password authentication and protected membership dashboard.

## Features
- ✅ User registration with password
- ✅ Secure password hashing (bcrypt)
- ✅ Login with email/password
- ✅ Session management (HTTP-only cookies)
- ✅ Protected membership dashboard
- ✅ Bilingual support (English/Chinese)

## Database Setup

### Step 1: Update the `community_members` table

1. Go to your Supabase dashboard: https://supabase.com/dashboard
2. Select your project: `nexthardware`
3. Go to **SQL Editor**
4. Run this SQL:

```sql
-- Add password_hash column to community_members table
ALTER TABLE community_members 
ADD COLUMN IF NOT EXISTS password_hash TEXT;

-- Add index for faster email lookups (if not exists)
CREATE INDEX IF NOT EXISTS idx_community_members_email ON community_members(email);

-- Update comment
COMMENT ON TABLE community_members IS 'Stores community member registrations with authentication';
```

5. Click **Run** to execute the SQL

### Step 2: Verify the table structure

1. Go to **Table Editor** in Supabase
2. Check `community_members` table
3. It should now have columns: `id`, `name`, `email`, `phone`, `password_hash`, `registered_at`, `discord_invite_sent`

## How It Works

### Registration Flow
1. User visits `/register` page
2. Fills out form: Name, Email, Phone (optional), Password, Confirm Password
3. Password is hashed using bcrypt (10 salt rounds)
4. Data saved to Supabase `community_members` table
5. User redirected to login page

### Login Flow
1. User visits `/login` page
2. Enters email and password
3. System verifies password against stored hash
4. Creates secure session token
5. Sets HTTP-only cookie (30 days)
6. Redirects to `/membership` dashboard

### Membership Dashboard
- Protected route (requires authentication)
- Shows member profile information
- Quick links to Discord, Events, Contact
- Community resources section
- Logout functionality

## API Endpoints

### POST `/api/members`
Register a new member
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1 (555) 123-4567",
  "password": "securepassword123"
}
```

### POST `/api/members/auth`
Login
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

### GET `/api/members/auth`
Check current session (returns member info if authenticated)

### DELETE `/api/members/auth`
Logout (clears session cookie)

## Pages

- `/register` - Registration page
- `/login` - Login page
- `/membership` - Protected membership dashboard

## Security Features

1. **Password Hashing**: Uses bcrypt with 10 salt rounds
2. **HTTP-Only Cookies**: Session tokens stored in HTTP-only cookies (prevents XSS)
3. **Secure Cookies**: HTTPS-only in production
4. **SameSite Protection**: CSRF protection
5. **Session Expiry**: 30 days
6. **Password Validation**: Minimum 6 characters

## Environment Variables

No additional environment variables needed. Uses existing:
- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `FORMSPREE_CONTACT_FORM_ID` (for welcome emails)

Optional:
- `MEMBER_SESSION_SECRET` - Custom session secret (defaults to a default value)

## Testing

1. **Register a new account**:
   - Go to `/register`
   - Fill out the form
   - Submit
   - Should redirect to `/login`

2. **Login**:
   - Go to `/login`
   - Enter email and password
   - Should redirect to `/membership`

3. **Access membership dashboard**:
   - Should see profile information
   - Quick links should work
   - Logout should work

4. **Protected route**:
   - Try accessing `/membership` without login
   - Should redirect to `/login`

## Migration from Old System

If you have existing members without passwords:
- They need to register again with a password
- Or you can create a password reset flow (future enhancement)

## Troubleshooting

- **"Email already registered"**: User needs to login instead of registering
- **"Invalid email or password"**: Check email/password are correct
- **"Account not set up with password"**: Old registration, needs to re-register
- **Session not persisting**: Check cookies are enabled in browser

## Next Steps (Optional Enhancements)

1. Password reset functionality
2. Email verification
3. Profile editing
4. Password change
5. Remember me option
6. Two-factor authentication


