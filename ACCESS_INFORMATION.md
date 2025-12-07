# 🔐 Database Access Information

## 📊 How to Access Your Database

### Method 1: Supabase Dashboard (Recommended)

**Login:**
- **URL:** https://supabase.com/dashboard
- **Username:** Your Supabase account email (the one you used to sign up)
- **Password:** Your Supabase account password

**Access Your Project:**
- Go to: https://supabase.com/dashboard/project/snpmvpsoxeieguojlwzv
- Or: Dashboard → Select "nexthardware" project

**View Subscribers:**
1. Click **"Table Editor"** in left sidebar
2. Click **"newsletter_subscribers"** table
3. See all emails with subscription dates

**Run SQL Queries:**
1. Click **"SQL Editor"** in left sidebar
2. Write SQL queries to view/manage data
3. Example: `SELECT * FROM newsletter_subscribers;`

### Method 2: Admin Page (On Your Site)

**Access:**
- **URL:** https://nexthardware.io/admin/subscribers
- **Password:** `nexthardware2024` (default)

**Features:**
- ✅ View all subscribers in a table
- ✅ Delete subscribers
- ✅ Export to CSV
- ✅ Refresh data
- ✅ Password protected

**Change Admin Password:**
1. Edit: `app/admin/subscribers/page.tsx`
2. Change: `ADMIN_PASSWORD` variable
3. Or set: `NEXT_PUBLIC_ADMIN_PASSWORD` in `.env.local`

### Method 3: API (Via Code)

**Already Configured:**
- API endpoint: `/api/newsletter` (POST)
- Admin API: `/api/admin/subscribers` (GET)
- Delete API: `/api/admin/subscribers/[id]` (DELETE)

**API Keys:**
- Stored in: `.env.local` (local)
- Stored in: Vercel (production)
- Keys: `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`

## 🔑 Access Credentials Summary

### Supabase Account
- **Login URL:** https://supabase.com/dashboard
- **Username:** Your Supabase account email
- **Password:** Your Supabase account password
- **Project:** nexthardware
- **Project ID:** snpmvpsoxeieguojlwzv

### Database
- **Type:** PostgreSQL
- **Access:** Via Supabase dashboard or API
- **No direct database password needed** (managed by Supabase)

### Admin Page
- **URL:** https://nexthardware.io/admin/subscribers
- **Password:** `nexthardware2024` (changeable)

### API Keys
- **Location:** `.env.local` (local) and Vercel (production)
- **Not in code:** ✅ Secure
- **Not in GitHub:** ✅ Secure

## 📝 What Access Information Do I Have?

**I have access to:**
- ✅ Supabase project URL
- ✅ API keys (stored securely in environment variables)
- ✅ Database structure (table schema)
- ✅ API endpoints (code)

**I do NOT have:**
- ❌ Your Supabase account password
- ❌ Direct database password
- ❌ Your Supabase account email

**You need to:**
- Login to Supabase dashboard with your account
- Use the admin page password (or change it)
- Keep API keys secure (already done)

## 🎯 Quick Access Links

- **Supabase Dashboard:** https://supabase.com/dashboard/project/snpmvpsoxeieguojlwzv
- **Admin Page:** https://nexthardware.io/admin/subscribers
- **View Subscribers:** Supabase Dashboard → Table Editor → newsletter_subscribers

## ✅ Security Notes

- ✅ Database password protected (PostgreSQL)
- ✅ API keys in environment variables (not in code)
- ✅ Admin page password protected
- ✅ HTTPS connections only
- ✅ Service role key (server-side only)

