# 📧 Contact Form Setup Guide

This guide will help you set up the contact form with:
- ✅ Database storage (Supabase)
- ✅ Email notifications (Resend)
- ✅ Spam protection (Google reCAPTCHA v3)

---

## Step 1: Create Supabase Table

Run the migration to create the `contact_messages` table:

```bash
# Using Supabase CLI
cd /Users/liang/Documents/nexthardware
supabase db push

# OR manually in Supabase Dashboard:
# 1. Go to https://supabase.com/dashboard
# 2. Select your project
# 3. Go to SQL Editor
# 4. Run the SQL from: supabase/migrations/20250121000000_create_contact_messages.sql
```

---

## Step 2: Set Up Resend (Email Notifications)

### 2.1 Create Resend Account
1. Go to https://resend.com
2. Sign up (free tier: 3,000 emails/month)
3. Verify your email

### 2.2 Get API Key
1. Go to https://resend.com/api-keys
2. Click "Create API Key"
3. Name it: "Next Hardware Contact Form"
4. Copy the API key (starts with `re_`)

### 2.3 Add to Environment Variables

**Local (.env.local):**
```bash
RESEND_API_KEY=re_your_api_key_here
CONTACT_EMAIL=hello@nexthardware.io
```

**Vercel (Production):**
1. Go to https://vercel.com/dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add:
   - `RESEND_API_KEY` = `re_your_api_key_here`
   - `CONTACT_EMAIL` = `hello@nexthardware.io`

### 2.4 Verify Domain (Optional but Recommended)
1. Go to https://resend.com/domains
2. Add `nexthardware.io`
3. Add the DNS records to your domain
4. Wait for verification (usually a few minutes)

**Note:** Without domain verification, emails will be sent from `noreply@nexthardware.io` but might go to spam. With verification, emails are more likely to reach inbox.

---

## Step 3: Set Up Google reCAPTCHA v3

### 3.1 Register Site
1. Go to https://www.google.com/recaptcha/admin/create
2. Fill in:
   - **Label:** Next Hardware Contact Form
   - **reCAPTCHA type:** reCAPTCHA v3
   - **Domains:** 
     - `nexthardware.io`
     - `www.nexthardware.io`
     - `localhost` (for testing)
3. Accept terms and submit
4. Copy the **Site Key** and **Secret Key**

### 3.2 Add to Environment Variables

**Local (.env.local):**
```bash
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key_here
RECAPTCHA_SECRET_KEY=your_secret_key_here
```

**Vercel (Production):**
1. Go to https://vercel.com/dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add:
   - `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` = `your_site_key_here`
   - `RECAPTCHA_SECRET_KEY` = `your_secret_key_here`

---

## Step 4: Test the Form

1. **Local Testing:**
   ```bash
   npm run dev
   ```
   Visit: http://localhost:3000/contact

2. **Production Testing:**
   - Deploy to Vercel
   - Visit: https://nexthardware.io/contact
   - Submit a test message

3. **Verify:**
   - ✅ Check Supabase dashboard → `contact_messages` table
   - ✅ Check your email inbox (hello@nexthardware.io)
   - ✅ Form shows success message

---

## How It Works

1. **User submits form** → reCAPTCHA v3 runs invisibly
2. **API receives request** → Verifies reCAPTCHA token
3. **Message saved** → Stored in Supabase `contact_messages` table
4. **Email sent** → Resend sends notification to hello@nexthardware.io
5. **User sees success** → Confirmation message displayed

---

## Optional: View Messages in Admin Panel

You can add a page to view contact messages similar to the newsletter subscribers admin:

**Future Enhancement:**
- Create `/admin/contacts` page
- List all contact messages
- Mark as read/unread
- Reply to messages

---

## Troubleshooting

### Emails not sending?
- ✅ Check Resend API key is correct
- ✅ Check `CONTACT_EMAIL` is set
- ✅ Check Resend dashboard for errors
- ✅ Verify domain if using custom domain

### reCAPTCHA not working?
- ✅ Check site key is correct (starts with `6L`)
- ✅ Check secret key is correct (starts with `6L`)
- ✅ Verify domain is added in reCAPTCHA admin
- ✅ Check browser console for errors

### Messages not saving?
- ✅ Check Supabase connection
- ✅ Verify table exists: `contact_messages`
- ✅ Check RLS is disabled (migration handles this)
- ✅ Check Supabase logs for errors

---

## Cost Summary

- **Supabase:** Free tier (up to 500MB database)
- **Resend:** Free tier (3,000 emails/month)
- **reCAPTCHA:** Free (unlimited)

**Total Cost: $0/month** (for typical usage)

---

## Security Notes

- ✅ reCAPTCHA v3 is invisible (no checkbox)
- ✅ All API keys are server-side only
- ✅ Messages stored securely in Supabase
- ✅ Email notifications sent via Resend (secure)

---

## Next Steps

1. ✅ Complete all setup steps above
2. ✅ Test the form locally
3. ✅ Deploy to production
4. ✅ Test on production
5. ✅ Monitor for spam (reCAPTCHA should block most)

Ready to go! 🚀

