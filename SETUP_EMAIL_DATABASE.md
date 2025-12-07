# Email Database Setup - Quick Guide

## Step 1: Create Supabase Account (2 minutes)

1. Go to **https://supabase.com**
2. Click **"Start your project"** (free tier is fine)
3. Sign up with GitHub/Google or email
4. Click **"New Project"**
5. Fill in:
   - **Name**: `nexthardware` (or any name)
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to you
6. Click **"Create new project"**
7. Wait 2-3 minutes for setup to complete

## Step 2: Create Database Table (1 minute)

1. In your Supabase dashboard, click **"SQL Editor"** in the left sidebar
2. Click **"New query"**
3. Copy and paste the contents of `supabase-setup.sql` file
4. Click **"Run"** (or press Cmd/Ctrl + Enter)
5. You should see "Success. No rows returned"

## Step 3: Get API Keys (1 minute)

1. In Supabase dashboard, click **"Settings"** (gear icon) in left sidebar
2. Click **"API"**
3. You'll see two keys you need:

   **a) Project URL:**
   - Copy the **"Project URL"** (looks like: `https://xxxxx.supabase.co`)
   - This is your `NEXT_PUBLIC_SUPABASE_URL`

   **b) Service Role Key:**
   - Scroll down to **"Project API keys"**
   - Find **"service_role"** key (⚠️ Keep this secret!)
   - Click the eye icon to reveal it, then copy
   - This is your `SUPABASE_SERVICE_ROLE_KEY`

## Step 4: Add Keys to Your Project (1 minute)

1. In your project root, create a file called `.env.local`:

```bash
# In your terminal, run:
touch .env.local
```

2. Open `.env.local` and add:

```
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

Replace with your actual values from Step 3.

**Example:**
```
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijk.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTYzODk2NzI5MCwiZXhwIjoxOTU0NTQzMjkwfQ.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## Step 5: Restart Your Dev Server

```bash
# Stop your current server (Ctrl+C)
# Then restart:
npm run dev
```

## Step 6: Test It!

1. Go to your website
2. Scroll to the newsletter section
3. Enter an email and click "Subscribe"
4. You should see "Successfully subscribed!"
5. Go back to Supabase dashboard > **"Table Editor"** > **"newsletter_subscribers"**
6. You should see your email in the table! 🎉

## Troubleshooting

**"Invalid API key" error:**
- Make sure you copied the **service_role** key (not the anon key)
- Check for extra spaces in `.env.local`
- Restart your dev server after adding keys

**"Table doesn't exist" error:**
- Make sure you ran the SQL from `supabase-setup.sql` in SQL Editor
- Check that the table name is exactly `newsletter_subscribers`

**Still not working?**
- Check the terminal/console for error messages
- Make sure `.env.local` is in the project root (same folder as `package.json`)
- Verify your Supabase project is active (not paused)

## Viewing Your Subscribers

To see all subscribers:
1. Go to Supabase dashboard
2. Click **"Table Editor"** in left sidebar
3. Click **"newsletter_subscribers"**
4. You'll see all emails with subscription dates

## Need Help?

If you get stuck, share the error message and I'll help you fix it!

