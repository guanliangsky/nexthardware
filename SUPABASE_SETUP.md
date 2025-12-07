# Supabase Setup for Email Database

## Quick Setup (5 minutes)

### Step 1: Create Supabase Account
1. Go to https://supabase.com
2. Sign up for free (no credit card needed)
3. Create a new project

### Step 2: Create Database Table
1. In your Supabase dashboard, go to **SQL Editor**
2. Run this SQL to create the newsletter table:

```sql
CREATE TABLE newsletter_subscribers (
  id BIGSERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index for faster lookups
CREATE INDEX idx_newsletter_email ON newsletter_subscribers(email);
```

### Step 3: Get API Keys
1. Go to **Settings** > **API**
2. Copy your **Project URL** (this is `NEXT_PUBLIC_SUPABASE_URL`)
3. Copy your **service_role** key (this is `SUPABASE_SERVICE_ROLE_KEY`)
   - ⚠️ Keep this secret! Never commit it to git.

### Step 4: Add to Environment Variables
1. Create a `.env.local` file in your project root
2. Add your keys:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

3. Restart your dev server: `npm run dev`

### Step 5: Test
1. Try subscribing with an email on your site
2. Check Supabase dashboard > **Table Editor** > `newsletter_subscribers`
3. You should see the email saved!

## Viewing Subscribers

Go to Supabase dashboard > **Table Editor** > `newsletter_subscribers` to see all subscribers.

## Alternative: Use Email Service Instead

If you prefer not to use a database, you can integrate with:
- **Resend** (recommended) - Simple email API
- **Mailchimp** - Full email marketing platform
- **ConvertKit** - Creator-focused email platform

Let me know if you want help setting up one of these instead!

