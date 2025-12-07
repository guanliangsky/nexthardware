# 🔐 OAuth Setup - Step by Step Guide

This guide will walk you through setting up Google and GitHub OAuth login, one step at a time.

---

## 📋 Part 1: Google OAuth Setup

### Step 1.1: Go to Google Cloud Console

1. Open your browser
2. Go to: **https://console.cloud.google.com**
3. Sign in with your Google account

### Step 1.2: Create or Select a Project

1. At the top, click the **project dropdown** (shows current project name)
2. Click **"New Project"** (or select an existing project)
3. If creating new:
   - **Project name:** `Next Hardware` (or any name)
   - Click **"Create"**
4. Wait for project creation (takes a few seconds)
5. Make sure the new project is selected

### Step 1.3: Enable Google+ API

1. In the left sidebar, click **"APIs & Services"** → **"Library"**
2. In the search box, type: **"Google+ API"** or **"People API"**
3. Click on **"Google+ API"** or **"People API"**
4. Click the blue **"Enable"** button
5. Wait for it to enable (takes a few seconds)

### Step 1.4: Configure OAuth Consent Screen

1. In the left sidebar, click **"APIs & Services"** → **"OAuth consent screen"**
2. Select **"External"** (unless you have Google Workspace)
3. Click **"Create"**
4. Fill in the form:
   - **App name:** `Next Hardware`
   - **User support email:** Your email (e.g., `guanliangsky@gmail.com`)
   - **Developer contact information:** Your email
5. Click **"Save and Continue"**
6. On "Scopes" page, click **"Save and Continue"** (no need to add scopes)
7. On "Test users" page, click **"Save and Continue"** (optional)
8. On "Summary" page, click **"Back to Dashboard"**

### Step 1.5: Create OAuth Credentials

1. In the left sidebar, click **"APIs & Services"** → **"Credentials"**
2. Click **"+ CREATE CREDENTIALS"** (top of page)
3. Select **"OAuth client ID"**
4. If prompted, select **"Web application"**
5. Fill in:
   - **Name:** `Next Hardware Login`
   - **Authorized JavaScript origins:** 
     - `http://localhost:3000` (for local development)
     - `https://nexthardware.io` (for production)
   - **Authorized redirect URIs:**
     - `http://localhost:3000/api/auth/google/callback`
     - `https://nexthardware.io/api/auth/google/callback`
6. Click **"Create"**
7. **IMPORTANT:** A popup will show your credentials:
   - **Client ID:** Copy this (starts with something like `123456789-abc...`)
   - **Client Secret:** Copy this (starts with `GOCSPX-...`)
8. Click **"OK"**

**⚠️ Save these credentials - you won't see the secret again!**

---

## 📋 Part 2: GitHub OAuth Setup

### Step 2.1: Go to GitHub Developer Settings

1. Open your browser
2. Go to: **https://github.com/settings/developers**
3. Sign in if needed

### Step 2.2: Create New OAuth App

1. In the left sidebar, click **"OAuth Apps"**
2. Click the green **"New OAuth App"** button (top right)

### Step 2.3: Fill in OAuth App Details

Fill in the form:

- **Application name:** `Next Hardware`
- **Homepage URL:** `https://nexthardware.io`
- **Application description:** `Next Hardware Community Login` (optional)
- **Authorization callback URL:**
  - `http://localhost:3000/api/auth/github/callback` (for local)
  - `https://nexthardware.io/api/auth/github/callback` (for production)

**Note:** GitHub only allows ONE callback URL. Use the production one for now, or create separate apps for dev/prod.

### Step 2.4: Register and Get Credentials

1. Click the green **"Register application"** button
2. You'll see your OAuth app page
3. **Client ID:** Copy this (it's visible on the page)
4. Click **"Generate a new client secret"** button
5. **Client Secret:** Copy this immediately (you won't see it again!)
6. Click **"I understand, regenerate secret"** if prompted

**⚠️ Save these credentials!**

---

## 📋 Part 3: Add Environment Variables

### Step 3.1: Add to Local Environment (.env.local)

1. Open your project folder: `/Users/liang/Documents/nexthardware`
2. Open the file `.env.local` (create it if it doesn't exist)
3. Add these lines:

```bash
# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/google/callback

# GitHub OAuth
GITHUB_CLIENT_ID=your_github_client_id_here
GITHUB_CLIENT_SECRET=your_github_client_secret_here
GITHUB_REDIRECT_URI=http://localhost:3000/api/auth/github/callback

# Site URL (optional, for production)
NEXT_PUBLIC_SITE_URL=https://nexthardware.io
```

4. **Replace the placeholder values** with your actual credentials:
   - Replace `your_google_client_id_here` with your Google Client ID
   - Replace `your_google_client_secret_here` with your Google Client Secret
   - Replace `your_github_client_id_here` with your GitHub Client ID
   - Replace `your_github_client_secret_here` with your GitHub Client Secret

5. Save the file

### Step 3.2: Add to Vercel (Production)

1. Go to: **https://vercel.com/dashboard**
2. Sign in if needed
3. Click on your project: **nexthardware**
4. Click **"Settings"** (top navigation)
5. Click **"Environment Variables"** (left sidebar)
6. Click **"Add New"** button

**Add Google OAuth variables:**

7. Click **"Add New"** again
   - **Name:** `GOOGLE_CLIENT_ID`
   - **Value:** Paste your Google Client ID
   - **Environments:** ✅ Production, ✅ Preview, ✅ Development
   - Click **"Save"**

8. Click **"Add New"** again
   - **Name:** `GOOGLE_CLIENT_SECRET`
   - **Value:** Paste your Google Client Secret
   - **Environments:** ✅ Production, ✅ Preview, ✅ Development
   - Click **"Save"**

9. Click **"Add New"** again
   - **Name:** `GOOGLE_REDIRECT_URI`
   - **Value:** `https://nexthardware.io/api/auth/google/callback`
   - **Environments:** ✅ Production, ✅ Preview, ✅ Development
   - Click **"Save"**

**Add GitHub OAuth variables:**

10. Click **"Add New"** again
    - **Name:** `GITHUB_CLIENT_ID`
    - **Value:** Paste your GitHub Client ID
    - **Environments:** ✅ Production, ✅ Preview, ✅ Development
    - Click **"Save"**

11. Click **"Add New"** again
    - **Name:** `GITHUB_CLIENT_SECRET`
    - **Value:** Paste your GitHub Client Secret
    - **Environments:** ✅ Production, ✅ Preview, ✅ Development
    - Click **"Save"**

12. Click **"Add New"** again
    - **Name:** `GITHUB_REDIRECT_URI`
    - **Value:** `https://nexthardware.io/api/auth/github/callback`
    - **Environments:** ✅ Production, ✅ Preview, ✅ Development
    - Click **"Save"**

---

## 📋 Part 4: Update Database

### Step 4.1: Go to Supabase Dashboard

1. Go to: **https://supabase.com/dashboard**
2. Sign in
3. Select your project: **nexthardware**

### Step 4.2: Run SQL Migration

1. Click **"SQL Editor"** in the left sidebar
2. Click **"New query"** (top right)
3. Copy and paste this SQL:

```sql
-- Add OAuth support fields to community_members table
ALTER TABLE community_members 
ADD COLUMN IF NOT EXISTS oauth_provider TEXT,
ADD COLUMN IF NOT EXISTS oauth_id TEXT;

-- Create index for OAuth lookups
CREATE INDEX IF NOT EXISTS idx_community_members_oauth ON community_members(oauth_provider, oauth_id);

-- Add comments
COMMENT ON COLUMN community_members.oauth_provider IS 'OAuth provider: google, github, etc.';
COMMENT ON COLUMN community_members.oauth_id IS 'OAuth provider user ID';
```

4. Click **"Run"** button (or press Ctrl+Enter / Cmd+Enter)
5. You should see: **"Success. No rows returned"**

### Step 4.3: Verify Table Structure

1. Click **"Table Editor"** in the left sidebar
2. Click on **"community_members"** table
3. Check that you see these columns:
   - `oauth_provider` (text, nullable)
   - `oauth_id` (text, nullable)

---

## 📋 Part 5: Test OAuth Login

### Step 5.1: Test Locally

1. Make sure your `.env.local` has all the credentials
2. Start your development server:
   ```bash
   npm run dev
   ```
3. Open: **http://localhost:3000/login**
4. You should see:
   - "Login with Google" button
   - "Login with GitHub" button
   - "or" divider
   - Email/password form

### Step 5.2: Test Google Login

1. Click **"Login with Google"** button
2. You should be redirected to Google
3. Select your Google account
4. Click **"Allow"** or **"Continue"**
5. You should be redirected back to `/membership` dashboard
6. ✅ Success!

### Step 5.3: Test GitHub Login

1. Go back to `/login`
2. Click **"Login with GitHub"** button
3. You should be redirected to GitHub
4. Click **"Authorize Next Hardware"**
5. You should be redirected back to `/membership` dashboard
6. ✅ Success!

### Step 5.4: Deploy to Production

1. After testing locally, deploy to Vercel:
   ```bash
   vercel --prod
   ```
2. Or push to your git repository (if auto-deploy is enabled)
3. Wait for deployment to complete
4. Test on production: **https://nexthardware.io/login**

---

## ✅ Checklist

Use this checklist to make sure everything is set up:

### Google OAuth
- [ ] Google Cloud project created
- [ ] Google+ API enabled
- [ ] OAuth consent screen configured
- [ ] OAuth client ID created
- [ ] Client ID and Secret copied
- [ ] Redirect URIs added (localhost + production)

### GitHub OAuth
- [ ] GitHub OAuth App created
- [ ] Client ID and Secret copied
- [ ] Callback URL added

### Environment Variables
- [ ] `GOOGLE_CLIENT_ID` added to `.env.local`
- [ ] `GOOGLE_CLIENT_SECRET` added to `.env.local`
- [ ] `GOOGLE_REDIRECT_URI` added to `.env.local`
- [ ] `GITHUB_CLIENT_ID` added to `.env.local`
- [ ] `GITHUB_CLIENT_SECRET` added to `.env.local`
- [ ] `GITHUB_REDIRECT_URI` added to `.env.local`
- [ ] All variables added to Vercel (Production, Preview, Development)

### Database
- [ ] SQL migration run in Supabase
- [ ] `oauth_provider` column exists
- [ ] `oauth_id` column exists

### Testing
- [ ] Local Google login works
- [ ] Local GitHub login works
- [ ] Production Google login works
- [ ] Production GitHub login works

---

## 🐛 Troubleshooting

### "OAuth not configured" error
- Check that environment variables are set correctly
- Make sure variable names match exactly (case-sensitive)
- Restart your dev server after adding variables

### "Redirect URI mismatch" error
- Check that redirect URIs in OAuth apps match exactly
- For Google: Check both JavaScript origins and redirect URIs
- For GitHub: Check callback URL matches exactly

### "No email" error
- Google: Make sure you granted email permission
- GitHub: Make sure email is public or you granted email scope

### Database errors
- Make sure you ran the SQL migration
- Check that columns exist in Supabase Table Editor

---

## 🎉 You're Done!

Once all steps are complete, users can:
- ✅ Login with Google (one click)
- ✅ Login with GitHub (one click)
- ✅ Still use email/password login
- ✅ Automatically get welcome emails

Enjoy your new OAuth login system! 🚀


