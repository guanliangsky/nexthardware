# 🚀 Vercel Environment Variable Setup

## Quick Steps to Add RESEND_API_KEY to Vercel

### Step 1: Go to Vercel Dashboard
1. Visit: https://vercel.com/dashboard
2. Select project: **nexthardware**

### Step 2: Add Environment Variable
1. Click **Settings** (in the top navigation)
2. Click **Environment Variables** (in the left sidebar)
3. Click **"Add New"** button
4. Fill in:
   - **Name:** `RESEND_API_KEY`
   - **Value:** `re_Bhh2FGv9_9sNy4qJGsjJNgxvtQboW9vry`
   - **Environments:** 
     - ✅ Production
     - ✅ Preview  
     - ✅ Development
5. Click **Save**

### Step 3: Redeploy (if needed)
After adding the variable, Vercel will automatically redeploy, or you can:
1. Go to **Deployments** tab
2. Click **"..."** on the latest deployment
3. Click **"Redeploy"**

## ✅ What This Enables

After adding `RESEND_API_KEY` to Vercel:

- ✅ **User Welcome Emails:** Sent via Resend when members register
- ✅ **Admin Notifications:** Sent via Formspree to `liangoptics@gmail.com`
- ✅ **Discord Invite Links:** Included in welcome emails

## 🧪 Testing

After deployment:
1. Register a test user at `/register`
2. Check the user's email inbox (should receive welcome email)
3. Check `liangoptics@gmail.com` (should receive admin notification)

## 📊 Free Tier Limits

- **Resend:** 100 emails/day, 3,000/month ✅
- **Formspree:** 50 submissions/month ✅

Perfect for a startup! 🎉


