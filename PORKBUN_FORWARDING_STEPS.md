# 📧 Porkbun Email Forwarding - Step-by-Step Guide

**Setting up:** `hello@nexthardware.io` → Your personal email

---

## 🚀 **STEP-BY-STEP INSTRUCTIONS**

### **Step 1: Log in to Porkbun**
1. Go to https://porkbun.com
2. Click "Log In" (top right)
3. Enter your credentials

### **Step 2: Go to Domain Management**
1. After logging in, you'll see your dashboard
2. Click on **"Domain Management"** or **"My Domains"**
3. You should see a list of your domains

### **Step 3: Find Your Domain**
1. Look for `nexthardware.io` in the list
2. You'll see columns like: Domain, Status, Expires, **EMAIL**, etc.
3. Look for the **envelope icon** 📧 under the **"EMAIL"** column
4. Click the **envelope icon** 📧

### **Step 4: Create Email Forwarding**
1. You'll see the email management page
2. Look for **"Create a New Forwarding Address"** section
3. Fill in:
   - **Email prefix:** `hello` (this creates `hello@nexthardware.io`)
   - **Forward to:** Your personal email address (e.g., `yourname@gmail.com`)
4. Click **"Create Email Forward"** button
5. Done! ✅

### **Step 5: Verify It Works**
1. Wait a few minutes for DNS to propagate
2. Send a test email to `hello@nexthardware.io` from a different email
3. Check your personal email inbox
4. You should receive the forwarded email!

---

## 📋 **WHAT YOU NEED**

- ✅ Porkbun account login
- ✅ Your personal email address (where to forward)
- ✅ 5 minutes

---

## ⚠️ **TROUBLESHOOTING**

### **Can't find the envelope icon?**
- Make sure you're logged in
- Check if domain is active
- Look for "Email" or "Email Forwarding" in the menu

### **Email not forwarding?**
- Wait 5-10 minutes for DNS propagation
- Check spam folder
- Verify the forwarding address is correct
- Make sure you're sending from a DIFFERENT email (not the forwarding destination)

### **Need help?**
- Porkbun Support: https://porkbun.com/support
- Or ask me!

---

## ✅ **AFTER SETUP**

Once forwarding is set up:

1. **The code is already configured!**
   - Uses `CONTACT_EMAIL` environment variable
   - Defaults to `hello@nexthardware.io`
   - Should work automatically

2. **Test the website:**
   - Subscribe to newsletter → Should receive notification
   - Submit contact form → Should receive notification

3. **That's it!** No code changes needed! ✅

---

## 🎯 **QUICK REFERENCE**

**What you're setting up:**
- Email: `hello@nexthardware.io`
- Forwards to: Your personal email
- Cost: FREE ✅
- Time: 5 minutes

**After setup:**
- All notifications will go to your personal email
- No code changes needed
- Everything works automatically!

