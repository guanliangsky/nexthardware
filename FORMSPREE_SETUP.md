# 📧 Formspree Setup Guide

This guide explains how to set up Formspree to send email notifications when new information is saved to Supabase.

## ✅ Current Setup

**Flow:**
1. User submits form (Contact or Newsletter)
2. Data is saved to Supabase ✅
3. Formspree sends email notification ✅

---

## 🔧 Step 1: Create Formspree Account

1. Go to https://formspree.io
2. Sign up for a free account (50 submissions/month on free tier)
3. Verify your email address

---

## 🔧 Step 2: Create Forms in Formspree

### Option A: Single Form for All Notifications (Recommended)

1. Go to https://formspree.io/forms
2. Click "New Form"
3. Name it: "Next Hardware Notifications"
4. Copy the Form ID (looks like: `xqwerty123` or `abc123def`)
5. Set the email recipient to: `hello@nexthardware.io` (or your preferred email)

### Option B: Separate Forms (More Organized)

**Contact Form:**
1. Create a form named "Contact Form Notifications"
2. Copy the Form ID
3. Set recipient to: `hello@nexthardware.io`

**Newsletter Form:**
1. Create a form named "Newsletter Notifications"
2. Copy the Form ID
3. Set recipient to: `hello@nexthardware.io`

---

## 🔧 Step 3: Add Environment Variables

### Local Development (`.env.local`)

```bash
# Formspree Form IDs
FORMSPREE_CONTACT_FORM_ID=xqwerty123
FORMSPREE_NEWSLETTER_FORM_ID=abc123def

# Optional: Override email recipient (defaults to hello@nexthardware.io)
CONTACT_EMAIL=hello@nexthardware.io
```

**Note:** If you use a single form for both, set both variables to the same Form ID:
```bash
FORMSPREE_CONTACT_FORM_ID=xqwerty123
FORMSPREE_NEWSLETTER_FORM_ID=xqwerty123
```

### Production (Vercel)

1. Go to https://vercel.com/dashboard
2. Select your project: `nexthardware`
3. Go to **Settings** → **Environment Variables**
4. Add:
   - `FORMSPREE_CONTACT_FORM_ID` = `your_contact_form_id`
   - `FORMSPREE_NEWSLETTER_FORM_ID` = `your_newsletter_form_id` (or same as contact)
   - `CONTACT_EMAIL` = `hello@nexthardware.io` (optional)

---

## 📋 How It Works

### Contact Form Flow:
1. User fills out contact form
2. Data is saved to Supabase `contact_messages` table
3. Formspree sends email notification to `CONTACT_EMAIL`
4. Email includes: Name, Email, Subject, Message

### Newsletter Flow:
1. User subscribes to newsletter
2. Email is saved to Supabase `newsletter_subscribers` table
3. Formspree sends email notification to `CONTACT_EMAIL`
4. Email includes: Subscriber email and timestamp

---

## ✅ Testing

### Test Contact Form:
1. Fill out the contact form on your site
2. Check Supabase dashboard - should see new entry in `contact_messages`
3. Check your email inbox - should receive Formspree notification

### Test Newsletter:
1. Subscribe to newsletter on your site
2. Check Supabase dashboard - should see new entry in `newsletter_subscribers`
3. Check your email inbox - should receive Formspree notification

---

## 🔍 Troubleshooting

### Emails Not Sending?

1. **Check Formspree Form ID:**
   - Verify `FORMSPREE_CONTACT_FORM_ID` and `FORMSPREE_NEWSLETTER_FORM_ID` are set
   - Check Vercel logs for: `⚠️  FORMSPREE_CONTACT_FORM_ID not configured`

2. **Check Formspree Dashboard:**
   - Go to https://formspree.io/forms
   - Check if submissions are being received
   - Check spam folder if emails aren't arriving

3. **Check Vercel Logs:**
   - Look for: `✅ Formspree email sent successfully`
   - Or: `❌ Formspree API error`

### Data Not Saving to Supabase?

1. Check Supabase environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`

2. Check Supabase dashboard for errors

---

## 📊 Formspree Limits

**Free Tier:**
- 50 submissions/month
- Basic email notifications
- No custom domains

**Paid Plans:**
- More submissions
- Custom domains
- Webhooks
- More features

---

## ✅ Setup Complete!

Once you've added the Formspree Form IDs to your environment variables:
- ✅ All contact form submissions → Saved to Supabase + Email via Formspree
- ✅ All newsletter subscriptions → Saved to Supabase + Email via Formspree

**Next Steps:**
1. Add Form IDs to `.env.local` for local testing
2. Add Form IDs to Vercel for production
3. Test both forms to verify everything works!


