# 📊 Google Analytics 4 (GA4) Setup Guide

**Status:** Code is ready! Just need your GA4 Measurement ID.

---

## 🚀 Quick Setup (5 minutes)

### Step 1: Get Your GA4 Measurement ID

1. **Go to Google Analytics:**
   - Visit: https://analytics.google.com/
   - Sign in with your Google account

2. **Create a Property (if you don't have one):**
   - Click "Admin" (gear icon) in bottom left
   - Click "Create Property"
   - Enter property name: "Next Hardware"
   - Select timezone and currency
   - Click "Next"

3. **Set Up Data Stream:**
   - Select "Web" as platform
   - Enter website URL: `https://nexthardware.io`
   - Enter stream name: "Next Hardware Website"
   - Click "Create stream"

4. **Copy Your Measurement ID:**
   - You'll see "Measurement ID" (looks like `G-XXXXXXXXXX`)
   - Copy this ID (starts with `G-`)

---

### Step 2: Add to Environment Variables

#### Local Development (.env.local):

1. **Create or edit `.env.local` file** in your project root:
   ```bash
   # .env.local
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```
   (Replace `G-XXXXXXXXXX` with your actual Measurement ID)

2. **Restart your dev server:**
   ```bash
   npm run dev
   ```

#### Production (Vercel):

1. **Go to Vercel Dashboard:**
   - Visit: https://vercel.com/dashboard
   - Select your project

2. **Add Environment Variable:**
   - Go to Settings → Environment Variables
   - Click "Add New"
   - Name: `NEXT_PUBLIC_GA_ID`
   - Value: `G-XXXXXXXXXX` (your Measurement ID)
   - Environment: Production, Preview, Development (select all)
   - Click "Save"

3. **Redeploy:**
   - Go to Deployments
   - Click "..." on latest deployment
   - Click "Redeploy"

---

### Step 3: Verify It's Working

1. **Check Browser Console:**
   - Open your site
   - Open browser DevTools (F12)
   - Go to Console tab
   - Look for: `gtag` function loaded
   - No errors = ✅ Working!

2. **Check Network Tab:**
   - Open DevTools → Network tab
   - Filter by "gtag" or "analytics"
   - You should see requests to `google-analytics.com`
   - Status 200 = ✅ Working!

3. **Check Google Analytics:**
   - Go to GA4 dashboard
   - Click "Reports" → "Realtime"
   - Visit your site
   - You should see yourself as a visitor within 30 seconds!

---

## ✅ Current Implementation

**File:** `components/Analytics.tsx`

**What it does:**
- ✅ Loads Google Analytics 4 script
- ✅ Initializes tracking
- ✅ Only loads if `NEXT_PUBLIC_GA_ID` is set
- ✅ Works automatically on all pages

**Code:**
```typescript
if (typeof window !== "undefined" && process.env.NEXT_PUBLIC_GA_ID) {
  // Loads GA4 script
  // Tracks page views automatically
  // Tracks events (if you add them later)
}
```

---

## 📊 What Gets Tracked

### Automatic Tracking:
- ✅ Page views (all pages)
- ✅ Page navigation (Next.js router)
- ✅ User sessions
- ✅ Device/browser info
- ✅ Geographic location

### Optional (Can Add Later):
- Custom events (form submissions, button clicks)
- E-commerce tracking
- User properties
- Custom dimensions

---

## 🔧 Troubleshooting

### Not seeing data?

1. **Check Environment Variable:**
   ```bash
   # In terminal, check if variable is set:
   echo $NEXT_PUBLIC_GA_ID
   ```

2. **Check Browser Console:**
   - Look for errors
   - Check if `gtag` is defined: `typeof gtag`

3. **Check Network Requests:**
   - Should see requests to `google-analytics.com`
   - Status should be 200

4. **Wait a few minutes:**
   - GA4 can take 24-48 hours for full data
   - Realtime view shows data immediately

---

## 📝 Quick Checklist

- [ ] Created GA4 property
- [ ] Got Measurement ID (G-XXXXXXXXXX)
- [ ] Added to `.env.local` (local)
- [ ] Added to Vercel environment variables (production)
- [ ] Restarted dev server (local)
- [ ] Redeployed (production)
- [ ] Verified in browser console
- [ ] Checked GA4 Realtime report

---

## 🎯 Next Steps (Optional)

Once GA4 is working, you can:

1. **Set up Goals/Conversions:**
   - Newsletter signups
   - Contact form submissions
   - Blog post views

2. **Add Custom Events:**
   - Track button clicks
   - Track downloads
   - Track video plays

3. **Set up Audiences:**
   - Returning visitors
   - Newsletter subscribers
   - Blog readers

---

## 📚 Resources

- **GA4 Documentation:** https://support.google.com/analytics/answer/9304153
- **GA4 Setup Guide:** https://support.google.com/analytics/answer/9304153
- **Measurement ID Format:** `G-XXXXXXXXXX`

---

**Once you add your Measurement ID, GA4 will start tracking immediately!** 🚀



