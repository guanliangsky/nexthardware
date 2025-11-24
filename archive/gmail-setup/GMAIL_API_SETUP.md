# 📧 Gmail API Setup Guide

**Switching from Resend to Gmail API (Google Native Service)**

---

## ✅ **WHY GMAIL API?**

- ✅ Google's native service (more reliable)
- ✅ No third-party restrictions
- ✅ Free for reasonable usage
- ✅ You have experience with it
- ✅ No domain verification needed
- ✅ Can send from any email address

---

## 📋 **WHAT WE NEED**

### **Option 1: Service Account (Recommended for Server-Side)**
- Google Cloud Project
- Service Account created
- Service Account Key (JSON file - the "long key")
- Gmail API enabled

### **Option 2: OAuth2 (For User Email)**
- Google Cloud Project
- OAuth2 credentials
- Access token

---

## 🚀 **SETUP STEPS**

### **Step 1: Create Google Cloud Project (If Needed)**

1. Go to: https://console.cloud.google.com
2. Create new project or select existing
3. Note the project ID

### **Step 2: Enable Gmail API**

1. Go to: https://console.cloud.google.com/apis/library
2. Search for "Gmail API"
3. Click "Enable"

### **Step 3: Create Service Account**

1. Go to: https://console.cloud.google.com/iam-admin/serviceaccounts
2. Click "Create Service Account"
3. Fill in:
   - **Name:** Next Hardware Email Service
   - **Description:** Send emails via Gmail API
4. Click "Create and Continue"
5. Skip role assignment (click "Continue")
6. Click "Done"

### **Step 4: Create Service Account Key**

1. Click on the service account you just created
2. Go to "Keys" tab
3. Click "Add Key" → "Create new key"
4. Select "JSON"
5. Download the JSON file (this is the "long key" you mentioned!)

**⚠️ IMPORTANT:** This JSON file contains sensitive credentials. Keep it secure!

### **Step 5: Enable Domain-Wide Delegation (If Sending from Gmail)**

If you want to send from `guanliangsky@gmail.com`:
1. In service account, check "Enable Google Workspace Domain-wide Delegation"
2. Note the Client ID
3. In Google Workspace Admin, add the Client ID with Gmail API scope

**OR** use OAuth2 instead (simpler for personal Gmail).

---

## 🔧 **IMPLEMENTATION**

Once you have the Service Account Key (JSON file), I'll:
1. Add it to the code
2. Implement Gmail API email sending
3. Replace Resend with Gmail API
4. Test it

---

## 📋 **QUICK SETUP (If You Have the Key)**

If you already have the Service Account Key JSON file:
1. Share it with me (or add it to the project)
2. I'll implement Gmail API
3. We'll test it

---

## 💡 **ALTERNATIVE: OAuth2 (Simpler for Personal Gmail)**

If you want to send from your personal Gmail (`guanliangsky@gmail.com`):
1. Use OAuth2 instead of Service Account
2. Simpler setup
3. No domain-wide delegation needed

---

## ❓ **WHAT DO YOU HAVE?**

Do you have:
- ✅ Google Cloud Project?
- ✅ Service Account Key (JSON file)?
- ✅ Or should I guide you to create one?

Let me know and I'll implement it!

