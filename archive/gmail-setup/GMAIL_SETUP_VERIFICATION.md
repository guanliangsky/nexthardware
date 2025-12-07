# ✅ Gmail API Setup Verification Checklist

Use this checklist to verify your Gmail API setup is correct.

---

## 📋 **PRE-SETUP CHECKLIST**

### **Google Cloud Console:**
- [ ] Google Cloud Project created
- [ ] Project selected in Google Cloud Console
- [ ] Gmail API enabled in the project
- [ ] Service Account created
- [ ] Service Account Key (JSON) downloaded

### **Local Files:**
- [ ] `credentials/gmail-service-account.json` exists
- [ ] JSON file is valid (not corrupted)
- [ ] `credentials/` folder is in `.gitignore` ✅ (Already done)

---

## 🔍 **CODE VERIFICATION**

### **1. Check Gmail Implementation (`lib/gmail.ts`):**
- [x] ✅ Loads credentials from environment variable (base64) or local file
- [x] ✅ Uses JWT authentication with service account
- [x] ✅ Supports domain-wide delegation (via `subject` field)
- [x] ✅ Creates proper email message format
- [x] ✅ Encodes message in base64url format
- [x] ✅ Uses `userId: "me"` (correct for domain-wide delegation)

### **2. Check Contact Form (`app/api/contact/route.ts`):**
- [x] ✅ Imports `sendEmailViaGmail` from `@/lib/gmail`
- [x] ✅ Uses Gmail API (not Resend)
- [x] ✅ Gets sender email from `GMAIL_SENDER_EMAIL` env var
- [x] ✅ Gets recipient from `CONTACT_EMAIL` env var

### **3. Check Newsletter (`app/api/newsletter/route.ts`):**
- [x] ✅ Imports `sendEmailViaGmail` from `@/lib/gmail`
- [x] ✅ Uses Gmail API (not Resend)

---

## 🔐 **ENVIRONMENT VARIABLES**

### **Local Development (.env.local):**
```bash
# Optional for local (uses credentials file instead)
# GMAIL_SERVICE_ACCOUNT_JSON_BASE64=...
GMAIL_SENDER_EMAIL=guanliangsky@gmail.com
CONTACT_EMAIL=guanliangsky@gmail.com
```

### **Vercel Production:**
- [ ] `GMAIL_SERVICE_ACCOUNT_JSON_BASE64` - Base64-encoded JSON (REQUIRED)
- [ ] `GMAIL_SENDER_EMAIL` - Gmail address to send from (REQUIRED for domain-wide delegation)
- [ ] `CONTACT_EMAIL` - Email to receive notifications (optional, defaults to guanliangsky@gmail.com)

---

## ⚠️ **CRITICAL: Domain-Wide Delegation**

**IMPORTANT:** Service accounts can't send emails from personal Gmail accounts without domain-wide delegation.

### **For Personal Gmail (@gmail.com):**
- ❌ Service accounts won't work directly
- ✅ Need OAuth2 instead (different setup)
- ✅ Or use Google Workspace account

### **For Google Workspace:**
1. [ ] Enable domain-wide delegation in Service Account
2. [ ] Note the Client ID from Service Account
3. [ ] In Google Workspace Admin Console:
   - [ ] Go to Security → API Controls → Domain-wide Delegation
   - [ ] Add new Client ID
   - [ ] Add scope: `https://www.googleapis.com/auth/gmail.send`
4. [ ] Set `GMAIL_SENDER_EMAIL` to your Workspace email

---

## 🧪 **TESTING**

### **Local Test:**
```bash
# 1. Start dev server
npm run dev

# 2. Test contact form
# Go to: http://localhost:3000/contact
# Fill and submit

# 3. Check console logs for:
# ✅ Loaded Gmail credentials from local file
# ✅ Gmail API: Email sent successfully
```

### **Production Test:**
1. [ ] Add environment variables to Vercel
2. [ ] Redeploy (automatic after env var changes)
3. [ ] Test contact form at: https://nexthardware.io/contact
4. [ ] Check Vercel logs for success messages
5. [ ] Verify email received in inbox

---

## ❌ **COMMON ISSUES & FIXES**

### **Issue: "Failed to load Gmail credentials"**
- ✅ Check `credentials/gmail-service-account.json` exists
- ✅ Verify JSON is valid (not corrupted)
- ✅ For Vercel: Check `GMAIL_SERVICE_ACCOUNT_JSON_BASE64` is set

### **Issue: "Domain-wide delegation might be required"**
- ✅ Set `GMAIL_SENDER_EMAIL` environment variable
- ✅ Enable domain-wide delegation in Service Account
- ✅ Add Client ID in Google Workspace Admin (if using Workspace)
- ⚠️ For personal Gmail: Need OAuth2 instead

### **Issue: "403 Forbidden" or "Permission denied"**
- ✅ Check Gmail API is enabled in Google Cloud Console
- ✅ Verify domain-wide delegation is configured (for Workspace)
- ✅ Check `GMAIL_SENDER_EMAIL` matches the delegated user
- ⚠️ Personal Gmail requires OAuth2, not service accounts

### **Issue: "Email not sending"**
- ✅ Check Vercel logs for specific error messages
- ✅ Verify all environment variables are set
- ✅ Test locally first to isolate the issue

---

## ✅ **VERIFICATION SUMMARY**

**Code Status:**
- ✅ Gmail API implementation is correct
- ✅ Supports both local file and environment variable credentials
- ✅ Includes domain-wide delegation support
- ✅ Proper error handling

**What You Need:**
1. ✅ Service Account JSON file (you have it)
2. ⚠️ Domain-wide delegation OR OAuth2 (depends on your Gmail type)
3. ⚠️ Environment variables set in Vercel

**Next Steps:**
1. If using Google Workspace: Set up domain-wide delegation
2. If using personal Gmail: Switch to OAuth2 (I can help with this)
3. Add environment variables to Vercel
4. Test and verify emails are sending

---

**Need help? Check the logs or ask me! 🚀**

