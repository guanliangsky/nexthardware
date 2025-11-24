# 📊 GA4 Setup - Step-by-Step Guide

**Status:** ✅ Code is ready! Follow these steps to enable tracking.

---

## 🎯 Overview

Your website already has GA4 tracking code installed. You just need to:
1. Get your GA4 Measurement ID from Google Analytics
2. Add it to your environment variables
3. Deploy and verify

**Total time: 5 minutes**

---

## 📋 Step 1: Get Your GA4 Measurement ID

### 1.1 Go to Google Analytics
- Open: **https://analytics.google.com/**
- Sign in with your Google account

### 1.2 Create a Property (if you don't have one)

**If you see "Get started" or no properties:**
1. Click **"Start measuring"** or **"Create Property"**
2. Enter property name: **"Next Hardware"**
3. Select timezone: **Your timezone** (e.g., Pacific Time)
4. Select currency: **USD**
5. Click **"Next"**

### 1.3 Create a Data Stream

1. You'll see **"Set up a data stream"**
2. Click **"Web"** (for website tracking)
3. Enter:
   - **Website URL:** `https://nexthardware.io`
   - **Stream name:** `Next Hardware Website`
4. Click **"Create stream"**

### 1.4 Copy Your Measurement ID

After creating the stream, you'll see:
- **Measurement ID:** `G-XXXXXXXXXX` (starts with G-)
- **Example:** `G-ABC123XYZ`

**📋 Copy this ID** - you'll need it in the next step!

---

## 📋 Step 2: Add to Local Environment (.env.local)

### 2.1 Check if .env.local exists

```bash
# In your terminal, run:
ls -la .env.local
```

**If it exists:** Open it in your editor  
**If it doesn't exist:** Create it

### 2.2 Add the Measurement ID

Open or create `.env.local` in your project root and add:

```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

**Replace `G-XXXXXXXXXX` with your actual Measurement ID!**

**Example:**
```bash
NEXT_PUBLIC_GA_ID=G-ABC123XYZ
```

### 2.3 Save the file

Save `.env.local` in your project root directory.

---

## 📋 Step 3: Restart Your Dev Server

### 3.1 Stop the current server

If your dev server is running:
- Press `Ctrl + C` in the terminal

### 3.2 Start the server again

```bash
npm run dev
```

### 3.3 Verify it loaded

You should see:
```
✓ Ready in X ms
```

---

## 📋 Step 4: Verify It's Working (Local)

### 4.1 Open your website

- Go to: **http://localhost:3000**

### 4.2 Open Browser DevTools

- Press `F12` or `Cmd + Option + I` (Mac) / `Ctrl + Shift + I` (Windows)
- Go to **Console** tab

### 4.3 Check for errors

- Should see **no errors** related to Google Analytics
- If you see errors, check that your Measurement ID is correct

### 4.4 Check Network tab

1. Go to **Network** tab in DevTools
2. Filter by: **"gtag"** or **"analytics"**
3. You should see requests to:
   - `google-analytics.com`
   - `googletagmanager.com`
4. Status should be **200** (success)

### 4.5 Check if gtag is loaded

In Console tab, type:
```javascript
typeof gtag
```

Should return: **"function"** ✅

---

## 📋 Step 5: Add to Production (Vercel)

### 5.1 Go to Vercel Dashboard

1. Visit: **https://vercel.com/dashboard**
2. Sign in
3. Select your project: **nexthardware** (or your project name)

### 5.2 Add Environment Variable

1. Click **Settings** (top menu)
2. Click **Environment Variables** (left sidebar)
3. Click **Add New** button

### 5.3 Enter the values

- **Name:** `NEXT_PUBLIC_GA_ID`
- **Value:** `G-XXXXXXXXXX` (your Measurement ID)
- **Environment:** Select all three:
  - ✅ Production
  - ✅ Preview
  - ✅ Development

### 5.4 Save

1. Click **Save**
2. You'll see the variable in the list

### 5.5 Redeploy

1. Go to **Deployments** tab
2. Find your latest deployment
3. Click **"..."** (three dots)
4. Click **"Redeploy"**
5. Wait for deployment to complete (~1-2 minutes)

---

## 📋 Step 6: Verify It's Working (Production)

### 6.1 Visit your live site

- Go to: **https://nexthardware.io**

### 6.2 Check in Browser DevTools

- Open DevTools (`F12`)
- Check **Network** tab for `gtag` requests
- Should see requests to Google Analytics

### 6.3 Check Google Analytics Realtime

1. Go back to: **https://analytics.google.com/**
2. Click **Reports** (left sidebar)
3. Click **Realtime** (under Reports)
4. Visit your website: **https://nexthardware.io**
5. **Within 30 seconds**, you should see:
   - ✅ 1 user online
   - ✅ Your visit showing up

**If you see yourself in Realtime, GA4 is working!** 🎉

---

## ✅ Verification Checklist

- [ ] Created GA4 property
- [ ] Created web data stream
- [ ] Copied Measurement ID (G-XXXXXXXXXX)
- [ ] Added to `.env.local` (local)
- [ ] Restarted dev server
- [ ] Verified in browser console (no errors)
- [ ] Verified in Network tab (gtag requests)
- [ ] Added to Vercel environment variables
- [ ] Redeployed to production
- [ ] Verified in GA4 Realtime report

---

## 🔧 Troubleshooting

### Problem: "gtag is not defined"

**Solution:**
- Check that `NEXT_PUBLIC_GA_ID` is set correctly
- Restart your dev server
- Clear browser cache

### Problem: No data in GA4 Realtime

**Solution:**
- Wait 30-60 seconds (data can be delayed)
- Make sure you're visiting the live site (not localhost)
- Check that Measurement ID is correct
- Verify environment variable is set in Vercel

### Problem: "Invalid Measurement ID"

**Solution:**
- Make sure ID starts with `G-`
- No spaces or extra characters
- Copy directly from Google Analytics (don't type manually)

### Problem: Still not working after all steps

**Solution:**
1. Double-check `.env.local` file exists in project root
2. Verify the variable name is exactly: `NEXT_PUBLIC_GA_ID`
3. Make sure there are no quotes around the value
4. Restart dev server completely
5. Check browser console for specific error messages

---

## 📊 What Gets Tracked Automatically

Once set up, GA4 will automatically track:

- ✅ **Page views** (all pages)
- ✅ **User sessions**
- ✅ **Page navigation** (Next.js routing)
- ✅ **Device/browser info**
- ✅ **Geographic location**
- ✅ **Traffic sources**

**No additional code needed!** The tracking is already implemented.

---

## 🎯 Next Steps (Optional)

After GA4 is working, you can:

1. **Set up Goals/Conversions:**
   - Newsletter signups
   - Contact form submissions
   - Button clicks

2. **Add Custom Events:**
   - Track specific user actions
   - Track downloads
   - Track video plays

3. **Create Audiences:**
   - Returning visitors
   - Newsletter subscribers
   - Blog readers

---

## 📚 Quick Reference

**Files involved:**
- `components/Analytics.tsx` - GA4 tracking code (already done ✅)
- `app/layout.tsx` - Includes Analytics component (already done ✅)
- `.env.local` - Your Measurement ID (you add this)
- Vercel Environment Variables - Production Measurement ID (you add this)

**Measurement ID format:**
- Starts with: `G-`
- Example: `G-ABC123XYZ`
- Found in: Google Analytics → Admin → Data Streams

---

**Need help?** Check the browser console for specific error messages!



