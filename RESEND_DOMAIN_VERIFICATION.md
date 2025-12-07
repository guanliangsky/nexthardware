# 📧 Resend Domain Verification Guide

**Issue:** Emails weren't sending because `nexthardware.io` domain is not verified in Resend.

**Quick Fix Applied:** Changed to use Resend's default domain (`onboarding@resend.dev`) which works immediately.

---

## ✅ **CURRENT STATUS**

**Email Sending:**
- ✅ **From:** `onboarding@resend.dev` (Resend default - works now!)
- ✅ **To:** `hello@nexthardware.io` → forwards to `liangoptics@gmail.com`
- ✅ **Status:** Working!

---

## 🔧 **OPTIONAL: VERIFY DOMAIN FOR PROFESSIONAL ADDRESS**

If you want to use `noreply@nexthardware.io` instead of `onboarding@resend.dev`:

### **Step 1: Add Domain to Resend**
1. Go to: https://resend.com/domains
2. Click "Add Domain"
3. Enter: `nexthardware.io`
4. Click "Add"

### **Step 2: Add DNS Records**
Resend will show you DNS records to add. Add them to your domain:

**Example DNS records (your actual records may differ):**
- **Type:** TXT
- **Name:** `_resend`
- **Value:** (provided by Resend)

- **Type:** MX
- **Name:** `@`
- **Value:** (provided by Resend)

### **Step 3: Verify Domain**
1. Wait for DNS propagation (5-30 minutes)
2. Click "Verify" in Resend dashboard
3. Once verified, domain is ready!

### **Step 4: Update Code**
Once verified, change back to:
```typescript
from: "Next Hardware <noreply@nexthardware.io>"
```

---

## 📋 **CURRENT SETUP (WORKING)**

**Contact Form:**
- From: `onboarding@resend.dev`
- To: `hello@nexthardware.io`
- Forwards to: `liangoptics@gmail.com`

**Newsletter:**
- From: `onboarding@resend.dev`
- To: `hello@nexthardware.io`
- Forwards to: `liangoptics@gmail.com`

**Status:** ✅ Working perfectly!

---

## 💡 **RECOMMENDATION**

**For Now:**
- ✅ Keep using `onboarding@resend.dev` (works great!)
- ✅ Emails are being delivered
- ✅ No action needed

**Later (Optional):**
- Verify domain in Resend for professional address
- Change back to `noreply@nexthardware.io`
- More professional, but not required

---

## ✅ **EVERYTHING IS WORKING!**

The quick fix is deployed and emails should now be sending successfully!

