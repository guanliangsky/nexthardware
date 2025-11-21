# 🤖 reCAPTCHA Setup - Step-by-Step Guide

**Setting up:** Google reCAPTCHA v3 for spam protection

---

## 🚀 **STEP 1: Register reCAPTCHA Site**

### **1.1 Go to reCAPTCHA Admin**
1. Open: https://www.google.com/recaptcha/admin/create
2. Log in with your Google account
3. If you don't have a Google account, create one (free)

### **1.2 Fill in the Form**
1. **Label:** `Next Hardware Contact Form`
2. **reCAPTCHA type:** Select **"reCAPTCHA v3"** (invisible)
3. **Domains:** Add these domains (one per line):
   ```
   nexthardware.io
   www.nexthardware.io
   localhost
   ```
4. **Accept the reCAPTCHA Terms of Service** (check the box)
5. Click **"Submit"**

### **1.3 Copy Your Keys**
After submitting, you'll see two keys:

1. **Site Key** (Public Key)
   - Starts with `6L...`
   - Safe to expose (used in frontend)
   - Copy this key

2. **Secret Key** (Private Key)
   - Starts with `6L...`
   - Keep secret! (used in backend)
   - Copy this key

**⚠️ IMPORTANT:** Save both keys! You'll need them in the next step.

---

## 🔧 **STEP 2: Add to Vercel Environment Variables**

### **2.1 Go to Vercel Dashboard**
1. Go to: https://vercel.com/dashboard
2. Log in to your account
3. Select your project: `nexthardware` (or your project name)

### **2.2 Add Environment Variables**
1. Click **"Settings"** (top menu)
2. Click **"Environment Variables"** (left sidebar)
3. Click **"Add New"** button

**Add First Variable:**
- **Name:** `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
- **Value:** Paste your Site Key (from Step 1.3)
- **Environment:** Select all (Production, Preview, Development)
- Click **"Save"**

**Add Second Variable:**
- **Name:** `RECAPTCHA_SECRET_KEY`
- **Value:** Paste your Secret Key (from Step 1.3)
- **Environment:** Select all (Production, Preview, Development)
- Click **"Save"**

### **2.3 Redeploy**
After adding environment variables:
1. Go to **"Deployments"** tab
2. Click the **"..."** menu on the latest deployment
3. Click **"Redeploy"**
4. Wait for deployment to complete (2-3 minutes)

**OR** just wait for the next git push - it will auto-deploy with new variables.

---

## ✅ **STEP 3: Verify It Works**

### **3.1 Test Locally (Optional)**
1. Add to `.env.local`:
   ```bash
   NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key_here
   RECAPTCHA_SECRET_KEY=your_secret_key_here
   ```
2. Restart dev server: `npm run dev`
3. Test contact form
4. Check browser console (should see reCAPTCHA loading)

### **3.2 Test in Production**
1. Go to: https://nexthardware.io
2. Scroll to contact section
3. Submit a test message
4. Should work with spam protection!

---

## 📋 **QUICK REFERENCE**

**What You Need:**
- ✅ Google account
- ✅ Site Key (from reCAPTCHA admin)
- ✅ Secret Key (from reCAPTCHA admin)
- ✅ Vercel account access

**Time:** 5-10 minutes

**Result:**
- ✅ Contact form protected from spam
- ✅ Invisible protection (no checkbox)
- ✅ Free unlimited requests

---

## 🆘 **TROUBLESHOOTING**

### **reCAPTCHA not loading?**
- ✅ Check Site Key is correct
- ✅ Check domain is added in reCAPTCHA admin
- ✅ Check browser console for errors
- ✅ Wait a few minutes for DNS propagation

### **Form not submitting?**
- ✅ Check Secret Key is correct
- ✅ Check environment variables are set
- ✅ Check Vercel deployment is complete
- ✅ Check browser console for errors

### **Need help?**
- Google reCAPTCHA docs: https://developers.google.com/recaptcha/docs/v3
- Or ask me!

---

## ✅ **AFTER SETUP**

Once configured:
- ✅ Contact form will have spam protection
- ✅ Bots will be blocked automatically
- ✅ Real users won't notice (invisible)
- ✅ Free unlimited protection

**That's it!** Your contact form is now protected! 🎉

