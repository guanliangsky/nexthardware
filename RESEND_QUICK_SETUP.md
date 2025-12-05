# 🚀 Resend Quick Setup Guide

## ✅ Your Resend Account
- **Email:** guanliangsky@gmail.com
- **Status:** Ready to use!

## 📋 Step 1: Get Your Resend API Key

1. Go to: https://resend.com
2. Log in with: **guanliangsky@gmail.com**
3. Go to: https://resend.com/api-keys
4. Click **"Create API Key"**
5. Name it: `nexthardware-user-emails`
6. Copy the API key (starts with `re_`)

## 📋 Step 2: Add to Local Environment

Add to `.env.local`:

```bash
RESEND_API_KEY=re_your_api_key_here
```

## 📋 Step 3: Add to Vercel

1. Go to: https://vercel.com/dashboard
2. Select project: `nexthardware`
3. Go to **Settings** → **Environment Variables**
4. Click **"Add New"**
5. Add:
   - **Name:** `RESEND_API_KEY`
   - **Value:** `re_your_api_key_here` (paste your key)
   - **Environments:** ✅ Production, ✅ Preview, ✅ Development
6. Click **Save**

## ✅ What Happens Next

After adding the API key:

1. **User registers** → Resend sends welcome email to user
2. **Admin notification** → Formspree sends notification to `liangoptics@gmail.com`

## 🧪 Test It

1. Register a test user at `/register`
2. Check user's email (should receive welcome email from Resend)
3. Check `liangoptics@gmail.com` (should receive admin notification from Formspree)

## 📊 Free Tier Limits

- ✅ **Resend:** 100 emails/day, 3,000/month (for user emails)
- ✅ **Formspree:** 50 submissions/month (for admin notifications)

## ✅ Code Status

- ✅ Resend package installed
- ✅ `lib/resend.ts` ready
- ✅ Code updated to use Resend for user emails
- ⏳ **Just need to add `RESEND_API_KEY`**

Once you add the API key, everything will work! 🎉


