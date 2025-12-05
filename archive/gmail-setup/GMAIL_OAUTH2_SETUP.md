# 📧 Gmail OAuth2 Setup for Personal Gmail

**Since you have a personal Gmail account, we need OAuth2 (not service accounts)**

---

## ✅ **WHAT YOU ALREADY HAVE**

- ✅ Google Cloud Project created
- ✅ Gmail API enabled
- ✅ Project ready to use

**What we need to add:**
- OAuth2 credentials (instead of service account)
- Refresh token (one-time setup)

---

## 🚀 **STEP 1: CREATE OAUTH2 CREDENTIALS**

### **Action Items:**

1. **Go to Google Cloud Console:**
   - Open: https://console.cloud.google.com
   - Make sure your project is selected

2. **Go to APIs & Services → Credentials:**
   - Click "APIs & Services" in left sidebar
   - Click "Credentials"

3. **Create OAuth2 Credentials:**
   - Click "+ CREATE CREDENTIALS" at the top
   - Select "OAuth client ID"

4. **Configure OAuth Consent Screen (if first time):**
   - If prompted, click "CONFIGURE CONSENT SCREEN"
   - Choose "External" (for personal Gmail)
   - Click "CREATE"
   - Fill in:
     - **App name:** `Next Hardware Email`
     - **User support email:** Your email (`guanliangsky@gmail.com`)
     - **Developer contact:** Your email
   - Click "SAVE AND CONTINUE"
   - Skip "Scopes" (click "SAVE AND CONTINUE")
   - Skip "Test users" (click "SAVE AND CONTINUE")
   - Click "BACK TO DASHBOARD"

5. **Create OAuth Client ID:**
   - Application type: **"Web application"**
   - **Name:** `Next Hardware Email Client`
   - **Authorized redirect URIs:** 
     - Add: `http://localhost:3000/api/auth/gmail/callback`
     - Add: `https://nexthardware.io/api/auth/gmail/callback`
   - Click "CREATE"

6. **Download Credentials:**
   - You'll see a popup with Client ID and Client Secret
   - **IMPORTANT:** Copy both of these!
   - Or click "DOWNLOAD JSON" to save the file
   - File name: `client_secret_xxxxx.json`

### **✅ Checkpoint:**
- [ ] OAuth2 Client ID created
- [ ] Client ID and Client Secret copied/downloaded
- [ ] JSON file downloaded (optional but helpful)

---

## 🔑 **STEP 2: GET REFRESH TOKEN (ONE-TIME SETUP)**

You need to get a refresh token once. This allows the app to send emails on your behalf.

### **Option A: Use Helper Script (Easiest)**

I'll create a script that makes this easy!

### **Option B: Manual Method**

1. **Go to OAuth2 Playground:**
   - Open: https://developers.google.com/oauthplayground

2. **Configure:**
   - Click gear icon (⚙️) in top right
   - Check "Use your own OAuth credentials"
   - Enter your **Client ID**
   - Enter your **Client Secret**
   - Click "Close"

3. **Get Token:**
   - In left sidebar, find "Gmail API v1"
   - Check: `https://www.googleapis.com/auth/gmail.send`
   - Click "Authorize APIs"
   - Sign in with your Gmail account
   - Click "Allow"
   - Click "Exchange authorization code for tokens"
   - Copy the **Refresh Token** (long string)

### **✅ Checkpoint:**
- [ ] Refresh token obtained
- [ ] Refresh token saved securely

---

## 🔧 **STEP 3: ADD TO ENVIRONMENT VARIABLES**

### **Local Development (.env.local):**

```bash
# Gmail OAuth2 Credentials
GMAIL_CLIENT_ID=your_client_id_here
GMAIL_CLIENT_SECRET=your_client_secret_here
GMAIL_REFRESH_TOKEN=your_refresh_token_here
GMAIL_SENDER_EMAIL=guanliangsky@gmail.com
CONTACT_EMAIL=guanliangsky@gmail.com
```

### **Vercel Production:**

1. Go to: https://vercel.com/dashboard
2. Select project: `nexthardware`
3. Go to: **Settings** → **Environment Variables**
4. Add these variables:

   - **Name:** `GMAIL_CLIENT_ID`
   - **Value:** Your Client ID
   - **Environments:** All

   - **Name:** `GMAIL_CLIENT_SECRET`
   - **Value:** Your Client Secret
   - **Environments:** All

   - **Name:** `GMAIL_REFRESH_TOKEN`
   - **Value:** Your Refresh Token
   - **Environments:** All

   - **Name:** `GMAIL_SENDER_EMAIL`
   - **Value:** `guanliangsky@gmail.com`
   - **Environments:** All

5. Click **Save** for each

### **✅ Checkpoint:**
- [ ] All environment variables added to Vercel
- [ ] Variables set for Production, Preview, and Development

---

## 🧪 **STEP 4: TEST IT!**

### **Local Test:**

```bash
# 1. Start dev server
npm run dev

# 2. Test contact form
# Go to: http://localhost:3000/contact
# Fill and submit

# 3. Check console logs for:
# ✅ Gmail OAuth2: Access token obtained
# ✅ Gmail API: Email sent successfully
```

### **Production Test:**

1. Vercel will auto-redeploy after adding env vars
2. Test contact form at: https://nexthardware.io/contact
3. Check Vercel logs for success messages
4. Verify email received in inbox

---

## ✅ **YOU'RE DONE!**

**What's Working:**
- ✅ OAuth2 authentication (works with personal Gmail!)
- ✅ Refresh token automatically gets new access tokens
- ✅ Emails sent from your Gmail account
- ✅ No domain-wide delegation needed!

---

## 🔧 **TROUBLESHOOTING**

### **Issue: "Invalid credentials"**

**Solution:**
- ✅ Check Client ID and Client Secret are correct
- ✅ Verify they're from the same OAuth2 client
- ✅ Make sure no extra spaces in environment variables

### **Issue: "Invalid refresh token"**

**Solution:**
- ✅ Get a new refresh token (Step 2)
- ✅ Make sure you're using the refresh token (not access token)
- ✅ Refresh token should be a long string

### **Issue: "Access denied"**

**Solution:**
- ✅ Make sure you authorized the app in OAuth Playground
- ✅ Check the scope is: `https://www.googleapis.com/auth/gmail.send`
- ✅ Try getting a new refresh token

---

**Ready to set it up? Let me know when you have the OAuth2 credentials! 🚀**

