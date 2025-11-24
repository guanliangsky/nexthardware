# ✅ What You Need to Do Next

**Since you have a personal Gmail account, here's your action plan:**

---

## 🎯 **YOUR SITUATION**

- ✅ Google Cloud Project created
- ✅ Gmail API enabled
- ✅ Project ready
- ⚠️ **Need:** OAuth2 credentials (not service account)

---

## 📋 **3 SIMPLE STEPS**

### **STEP 1: Create OAuth2 Credentials** (5 min)

1. Go to: https://console.cloud.google.com
2. Select your project
3. Go to: **APIs & Services** → **Credentials**
4. Click: **+ CREATE CREDENTIALS** → **OAuth client ID**
5. If asked, configure consent screen:
   - App name: `Next Hardware Email`
   - Your email: `guanliangsky@gmail.com`
   - Click through (skip scopes/test users)
6. Choose: **Web application**
7. Name: `Next Hardware Email Client`
8. Add redirect URIs:
   - `http://localhost:3000/api/auth/gmail/callback`
   - `https://nexthardware.io/api/auth/gmail/callback`
9. Click **CREATE**
10. **Copy Client ID and Client Secret**

**✅ Done when:** You have Client ID and Client Secret

---

### **STEP 2: Get Refresh Token** (2 min)

**Easy way (recommended):**

1. Add to `.env.local`:
   ```bash
   GMAIL_CLIENT_ID=your_client_id_here
   GMAIL_CLIENT_SECRET=your_client_secret_here
   ```

2. Run:
   ```bash
   node get-gmail-refresh-token.js
   ```

3. Follow the instructions (open URL, authorize, paste code)

**✅ Done when:** You have a refresh token

---

### **STEP 3: Add to Vercel** (2 min)

1. Go to: https://vercel.com/dashboard
2. Select: `nexthardware` project
3. Go to: **Settings** → **Environment Variables**
4. Add these 4 variables:

   | Name | Value | Environments |
   |------|-------|--------------|
   | `GMAIL_CLIENT_ID` | Your Client ID | All |
   | `GMAIL_CLIENT_SECRET` | Your Client Secret | All |
   | `GMAIL_REFRESH_TOKEN` | Your Refresh Token | All |
   | `GMAIL_SENDER_EMAIL` | `guanliangsky@gmail.com` | All |

5. Click **Save** for each

**✅ Done when:** All 4 variables are in Vercel

---

## 🧪 **TEST IT**

After Step 3, Vercel will auto-redeploy. Then:

1. Go to: https://nexthardware.io/contact
2. Fill out the form
3. Submit it
4. Check your email inbox!

---

## 📚 **GUIDES AVAILABLE**

- **Quick Start:** `GMAIL_OAUTH2_QUICK_START.md` ← **Start here!**
- **Detailed Setup:** `GMAIL_OAUTH2_SETUP.md`
- **Original Guide:** `GMAIL_API_STEP_BY_STEP.md` (for service accounts)

---

## ✅ **WHAT'S ALREADY DONE**

- ✅ Code updated to support OAuth2
- ✅ Helper script created (`get-gmail-refresh-token.js`)
- ✅ Guides created
- ✅ Ready to use!

---

## 🚀 **START NOW**

**Open:** `GMAIL_OAUTH2_QUICK_START.md` and follow Step 1!

**Time needed:** ~10 minutes total

---

**Questions? Let me know! 🚀**

