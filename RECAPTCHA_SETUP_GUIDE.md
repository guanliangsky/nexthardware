# 🤖 reCAPTCHA Setup Guide

**Status:** Code is implemented, but needs configuration

---

## ✅ **CURRENT STATUS**

**Code Implementation:**
- ✅ reCAPTCHA v3 is already in the code
- ✅ Contact form has reCAPTCHA integration
- ✅ Works invisibly (no checkbox, runs in background)
- ⚠️ **Not configured yet** (needs API keys)

**Current Behavior:**
- Form works without reCAPTCHA (optional)
- No spam protection yet
- Should set up for production

---

## 🎯 **SHOULD YOU ADD IT?**

### **Pros:**
- ✅ Blocks spam bots
- ✅ Protects contact form
- ✅ Free (unlimited requests)
- ✅ Invisible (good UX)
- ✅ Already implemented in code

### **Cons:**
- ⚠️ Requires Google account
- ⚠️ Takes 5-10 minutes to set up
- ⚠️ Need to add environment variables

**Recommendation:** ✅ **YES, add it!** It's free, easy, and protects your form.

---

## 🚀 **SETUP STEPS (5-10 MINUTES)**

### **Step 1: Register reCAPTCHA Site**

1. Go to https://www.google.com/recaptcha/admin/create
2. Log in with Google account
3. Fill in the form:
   - **Label:** Next Hardware Contact Form
   - **reCAPTCHA type:** reCAPTCHA v3 (invisible)
   - **Domains:** 
     - `nexthardware.io`
     - `www.nexthardware.io`
     - `localhost` (for testing)
   - Accept terms
   - Click "Submit"

4. **Copy the keys:**
   - **Site Key** (starts with `6L...`) - Public key
   - **Secret Key** (starts with `6L...`) - Private key

### **Step 2: Add to Environment Variables**

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
5. Redeploy (or wait for next deployment)

### **Step 3: Test**

1. Go to https://nexthardware.io
2. Submit contact form
3. Check browser console (should see reCAPTCHA running)
4. Form should work with spam protection

---

## 📋 **WHAT IS reCAPTCHA v3?**

**How it works:**
- Runs invisibly in the background
- Analyzes user behavior
- Gives a score (0.0 to 1.0)
- Blocks low scores (likely bots)
- No checkbox, no interruption

**User Experience:**
- ✅ No checkbox to click
- ✅ No interruption
- ✅ Just works

**Protection:**
- ✅ Blocks spam bots
- ✅ Allows real users
- ✅ Free unlimited requests

---

## ⚠️ **IMPORTANT NOTES**

1. **Domain Verification:**
   - Must add `nexthardware.io` and `www.nexthardware.io` to reCAPTCHA admin
   - Add `localhost` for local testing

2. **Environment Variables:**
   - `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` - Public (safe to expose)
   - `RECAPTCHA_SECRET_KEY` - Private (keep secret!)

3. **Testing:**
   - Test locally first
   - Then test in production
   - Check browser console for errors

---

## 🔧 **CURRENT CODE STATUS**

**Already Implemented:**
- ✅ Frontend: `components/Contact.tsx` - Loads reCAPTCHA script
- ✅ Backend: `app/api/contact/route.ts` - Verifies reCAPTCHA token
- ✅ Optional: Works without keys (for development)

**What's Missing:**
- ⚠️ Environment variables not set
- ⚠️ reCAPTCHA site not registered

**After Setup:**
- ✅ Form will have spam protection
- ✅ Bots will be blocked
- ✅ Real users won't notice

---

## 💡 **RECOMMENDATION**

**For Production:** ✅ **YES, set it up!**

**Why:**
- Free and easy
- Already implemented
- Protects from spam
- Better user experience (invisible)

**Time:** 5-10 minutes

**Priority:** Medium (form works without it, but spam protection is good)

---

## ❓ **NEXT STEPS**

1. **Option A:** Set up reCAPTCHA now (I'll guide you)
2. **Option B:** Skip for now (form works without it)
3. **Option C:** Set it up later

**What do you want to do?**

