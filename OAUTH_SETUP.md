# 🔐 OAuth Login Setup (Google & GitHub)

## ✅ What's Been Added

- ✅ Google OAuth login button
- ✅ GitHub OAuth login button
- ✅ OAuth callback handlers
- ✅ Automatic user registration/login
- ✅ Database support for OAuth users

## 🚀 Setup Steps

### Step 1: Set Up Google OAuth

1. **Go to Google Cloud Console:**
   - Visit: https://console.cloud.google.com
   - Create a new project or select existing one

2. **Enable Google+ API:**
   - Go to "APIs & Services" → "Library"
   - Search for "Google+ API" or "People API"
   - Click "Enable"

3. **Create OAuth 2.0 Credentials:**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth client ID"
   - Application type: **Web application**
   - Name: `Next Hardware Login`
   - Authorized redirect URIs:
     - `http://localhost:3000/api/auth/google/callback` (local)
     - `https://nexthardware.io/api/auth/google/callback` (production)
   - Click "Create"
   - Copy **Client ID** and **Client Secret**

4. **Add to Environment Variables:**

   **Local (.env.local):**
   ```bash
   GOOGLE_CLIENT_ID=your_google_client_id_here
   GOOGLE_CLIENT_SECRET=your_google_client_secret_here
   GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/google/callback
   ```

   **Vercel:**
   - Go to: https://vercel.com/dashboard
   - Project: `nexthardware` → Settings → Environment Variables
   - Add:
     - `GOOGLE_CLIENT_ID` = `your_google_client_id`
     - `GOOGLE_CLIENT_SECRET` = `your_google_client_secret`
     - `GOOGLE_REDIRECT_URI` = `https://nexthardware.io/api/auth/google/callback`
   - Select: Production, Preview, Development

### Step 2: Set Up GitHub OAuth

1. **Go to GitHub Developer Settings:**
   - Visit: https://github.com/settings/developers
   - Click "New OAuth App"

2. **Create OAuth App:**
   - **Application name:** `Next Hardware`
   - **Homepage URL:** `https://nexthardware.io`
   - **Authorization callback URL:**
     - `http://localhost:3000/api/auth/github/callback` (local)
     - `https://nexthardware.io/api/auth/github/callback` (production)
   - Click "Register application"
   - Copy **Client ID**
   - Click "Generate a new client secret"
   - Copy **Client Secret**

3. **Add to Environment Variables:**

   **Local (.env.local):**
   ```bash
   GITHUB_CLIENT_ID=your_github_client_id_here
   GITHUB_CLIENT_SECRET=your_github_client_secret_here
   GITHUB_REDIRECT_URI=http://localhost:3000/api/auth/github/callback
   ```

   **Vercel:**
   - Go to: https://vercel.com/dashboard
   - Project: `nexthardware` → Settings → Environment Variables
   - Add:
     - `GITHUB_CLIENT_ID` = `your_github_client_id`
     - `GITHUB_CLIENT_SECRET` = `your_github_client_secret`
     - `GITHUB_REDIRECT_URI` = `https://nexthardware.io/api/auth/github/callback`
   - Select: Production, Preview, Development

### Step 3: Update Database

Run the migration to add OAuth support:

```sql
-- Add OAuth support fields to community_members table
ALTER TABLE community_members 
ADD COLUMN IF NOT EXISTS oauth_provider TEXT,
ADD COLUMN IF NOT EXISTS oauth_id TEXT;

-- Create index for OAuth lookups
CREATE INDEX IF NOT EXISTS idx_community_members_oauth ON community_members(oauth_provider, oauth_id);
```

**Or use Supabase Dashboard:**
1. Go to: https://supabase.com/dashboard
2. Select project: `nexthardware`
3. Go to **SQL Editor**
4. Run the SQL above

### Step 4: Set Site URL (Optional)

If you want to use a custom redirect URI, add:

```bash
NEXT_PUBLIC_SITE_URL=https://nexthardware.io
```

## ✅ How It Works

1. **User clicks "Login with Google" or "Login with GitHub"**
2. **Redirects to OAuth provider** (Google/GitHub)
3. **User authorizes** the application
4. **Callback receives authorization code**
5. **Exchanges code for access token**
6. **Gets user info** (email, name)
7. **Creates or finds member** in database
8. **Creates session** and redirects to `/membership`

## 🧪 Testing

1. Go to `/login`
2. Click "Login with Google" or "Login with GitHub"
3. Authorize the application
4. Should redirect to `/membership` dashboard

## 📊 Database Schema

OAuth users are stored in `community_members` table with:
- `oauth_provider`: `"google"` or `"github"`
- `oauth_id`: Provider's user ID
- `password_hash`: `NULL` (OAuth users don't have passwords)

## 🔒 Security

- ✅ State parameter for CSRF protection
- ✅ HTTP-only cookies for sessions
- ✅ Secure cookies in production
- ✅ OAuth tokens never stored (only used for initial auth)

## 📝 Notes

- OAuth users **don't need passwords**
- If email already exists, user is logged in (no duplicate accounts)
- New OAuth users automatically receive welcome email
- OAuth login works alongside email/password login

## 🚀 After Setup

Once environment variables are added:
1. ✅ OAuth buttons will work
2. ✅ Users can login with Google/GitHub
3. ✅ New users automatically registered
4. ✅ Welcome emails sent via Resend


