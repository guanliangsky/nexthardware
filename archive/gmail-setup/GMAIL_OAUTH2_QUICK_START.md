# 🚀 Gmail OAuth2 Quick Start Guide

**For Personal Gmail Accounts - Simple 3-Step Setup**

---

## ✅ **WHAT YOU NEED TO DO**

Since you already have a Google Cloud Project, you just need to:

1. **Create OAuth2 Credentials** (5 minutes)
2. **Get Refresh Token** (2 minutes)
3. **Add to Environment Variables** (2 minutes)

**Total time: ~10 minutes**

---

## 📋 **STEP 1: CREATE OAUTH2 CREDENTIALS**

1. **Go to Google Cloud Console:**
   - https://console.cloud.google.com
   - Select your project

2. **Go to Credentials:**
   - Click "APIs & Services" → "Credentials"

3. **Create OAuth Client ID:**
   - Click "+ CREATE CREDENTIALS" → "OAuth client ID"
   - If asked, configure consent screen:
     - App name: `Next Hardware Email`
     - Your email: `guanliangsky@gmail.com`
     - Click through (skip scopes/test users)
   - Application type: **"Web application"**
   - Name: `Next Hardware Email Client`
   - Authorized redirect URIs:
     - `http://localhost:3000/api/auth/gmail/callback`
     - `https://nexthardware.io/api/auth/gmail/callback`
   - Click "CREATE"

4. **Copy Credentials:**
   - Copy **Client ID** (long string)
   - Copy **Client Secret** (long string)
   - Or download JSON file

### **✅ Checkpoint:**
- [ ] Client ID copied
- [ ] Client Secret copied

---

## 🔑 **STEP 2: GET REFRESH TOKEN**

### **Easy Way (Recommended):**

1. **Add to .env.local:**
   ```bash
   GMAIL_CLIENT_ID=your_client_id_here
   GMAIL_CLIENT_SECRET=your_client_secret_here
   ```

2. **Run helper script:**
   ```bash
   node get-gmail-refresh-token.js
   ```

3. **Follow instructions:**
   - Open the URL shown
   - Sign in with Gmail
   - Click "Allow"
   - Copy the code from redirect URL
   - Paste it in the script
   - Get your refresh token!

### **Manual Way (Alternative):**

1. Go to: https://developers.google.com/oauthplayground
2. Click gear icon (⚙️) → Check "Use your own OAuth credentials"
3. Enter Client ID and Client Secret
4. In left sidebar, find "Gmail API v1"
5. Check: `https://www.googleapis.com/auth/gmail.send`
6. Click "Authorize APIs" → Sign in → Allow
7. Click "Exchange authorization code for tokens"
8. Copy the **Refresh Token**

### **✅ Checkpoint:**
- [ ] Refresh token obtained
- [ ] Refresh token saved

---

## 🔧 **STEP 3: ADD TO ENVIRONMENT VARIABLES**

### **Local (.env.local):**

Add these lines:
```bash
GMAIL_CLIENT_ID=your_client_id_here
GMAIL_CLIENT_SECRET=your_client_secret_here
GMAIL_REFRESH_TOKEN=your_refresh_token_here
GMAIL_SENDER_EMAIL=guanliangsky@gmail.com
CONTACT_EMAIL=guanliangsky@gmail.com
```

### **Vercel:**

1. Go to: https://vercel.com/dashboard
2. Select: `nexthardware` project
3. Go to: **Settings** → **Environment Variables**
4. Add these (one by one):

   **Variable 1:**
   - Name: `GMAIL_CLIENT_ID`
   - Value: (paste your Client ID)
   - Environments: ✅ Production, ✅ Preview, ✅ Development

   **Variable 2:**
   - Name: `GMAIL_CLIENT_SECRET`
   - Value: (paste your Client Secret)
   - Environments: ✅ Production, ✅ Preview, ✅ Development

   **Variable 3:**
   - Name: `GMAIL_REFRESH_TOKEN`
   - Value: (paste your Refresh Token)
   - Environments: ✅ Production, ✅ Preview, ✅ Development

   **Variable 4:**
   - Name: `GMAIL_SENDER_EMAIL`
   - Value: `guanliangsky@gmail.com`
   - Environments: ✅ Production, ✅ Preview, ✅ Development

5. Click **Save** for each

### **✅ Checkpoint:**
- [ ] All 4 variables added to Vercel
- [ ] All environments selected

---

## 🧪 **STEP 4: TEST IT!**

### **Local Test:**

```bash
npm run dev
```

Then:
1. Go to: http://localhost:3000/contact
2. Fill out the form
3. Submit it
4. Check console for: `✅ Gmail OAuth2: Access token obtained`
5. Check console for: `✅ Gmail API: Email sent successfully`
6. Check your email inbox!

### **Production Test:**

1. Vercel will auto-redeploy
2. Go to: https://nexthardware.io/contact
3. Fill and submit
4. Check Vercel logs
5. Check your email!

---

## ✅ **YOU'RE DONE!**

**What's Working:**
- ✅ OAuth2 authentication (works with personal Gmail!)
- ✅ Automatic token refresh
- ✅ Emails sent from your Gmail
- ✅ No service account needed!

---

## 🔧 **TROUBLESHOOTING**

### **"Invalid credentials"**
- Check Client ID and Secret are correct
- No extra spaces in env vars

### **"Invalid refresh token"**
- Get a new refresh token
- Make sure it's the refresh token (not access token)

### **"Access denied"**
- Make sure you authorized in OAuth Playground
- Check scope is: `https://www.googleapis.com/auth/gmail.send`

---

## 📚 **QUICK REFERENCE**

**Files:**
- `lib/gmail.ts` - Gmail API (now supports OAuth2!)
- `get-gmail-refresh-token.js` - Helper script to get refresh token
- `GMAIL_OAUTH2_SETUP.md` - Detailed setup guide

**Environment Variables:**
- `GMAIL_CLIENT_ID` - OAuth2 Client ID
- `GMAIL_CLIENT_SECRET` - OAuth2 Client Secret
- `GMAIL_REFRESH_TOKEN` - OAuth2 Refresh Token
- `GMAIL_SENDER_EMAIL` - Your Gmail address

---

**Ready? Start with Step 1! 🚀**

