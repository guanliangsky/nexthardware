# 📧 Gmail API Setup - Step by Step

**Switching from Resend to Gmail API**

---

## ✅ **STEP 1: CREATE GOOGLE CLOUD PROJECT**

### **Action Items:**

1. **Go to Google Cloud Console:**
   - Open: https://console.cloud.google.com
   - Sign in with your Google account

2. **Create New Project:**
   - Click the project dropdown at the top
   - Click "NEW PROJECT"
   - Project Name: `Next Hardware Email` (or any name)
   - Click "CREATE"
   - Wait ~10 seconds for creation

3. **Select the Project:**
   - Make sure your new project is selected (shown at top)

### **✅ Checkpoint:**
- [ ] Project created
- [ ] Project selected (visible at top of page)

**When done, let me know and I'll show you Step 2!**

---

## ✅ **STEP 2: ENABLE GMAIL API**

### **Action Items:**

1. **In Google Cloud Console:**
   - Make sure your project is selected (check top of page)

2. **Go to APIs & Services:**
   - Click "APIs & Services" in left sidebar
   - Or search for "APIs & Services"

3. **Open Library:**
   - Click "Library" (or "Enable APIs and Services")

4. **Search for Gmail API:**
   - In search box, type: `Gmail API`
   - Click on "Gmail API" from results

5. **Enable it:**
   - Click the big blue "ENABLE" button
   - Wait a few seconds

6. **Verify:**
   - You should see "API enabled" or success message

### **✅ Checkpoint:**
- [ ] Gmail API enabled
- [ ] See success message

**When done, let me know and I'll show you Step 3!**

---

## ✅ **STEP 3: CREATE SERVICE ACCOUNT**

### **Action Items:**

1. **Go to IAM & Admin:**
   - In left sidebar, click "IAM & Admin"
   - Or search for "IAM" in search bar

2. **Open Service Accounts:**
   - Click "Service Accounts"

3. **Create New Service Account:**
   - Click blue "CREATE SERVICE ACCOUNT" button

4. **Fill in Details:**
   - **Service account name:** `Next Hardware Email` (or any name)
   - **Service account ID:** (auto-filled, leave as is)
   - **Description:** `Send emails via Gmail API` (optional)

5. **Click "CREATE AND CONTINUE"**

6. **Skip Role Assignment:**
   - On "Grant this service account access" page
   - Click "CONTINUE" or "DONE" (we don't need roles)

7. **Done:**
   - Click "DONE"
   - You should see your service account in the list

### **✅ Checkpoint:**
- [ ] Service account created
- [ ] See it in the service accounts list

**When done, let me know and I'll show you Step 4 (the "long key" JSON file!)**

---

## ✅ **STEP 4: CREATE SERVICE ACCOUNT KEY (THE "LONG KEY")**

### **Action Items:**

1. **Find Your Service Account:**
   - In Service Accounts list, click on your service account name
   - (The one you created: "Next Hardware Email")

2. **Go to Keys Tab:**
   - Click the "KEYS" tab
   - (You'll see tabs: PERMISSIONS, KEYS, etc.)

3. **Create New Key:**
   - Click "ADD KEY" button
   - Select "Create new key"

4. **Choose JSON:**
   - Select "JSON" (this is the "long key" file!)
   - Click "CREATE"

5. **Download:**
   - The JSON file will automatically download!
   - 📥 Check your Downloads folder
   - File name: `project-name-xxxxx.json`

### **⚠️ IMPORTANT:**
- This JSON file contains sensitive credentials
- Keep it secure and don't share it publicly
- We'll add it to the project (but keep it private)

### **✅ Checkpoint:**
- [ ] JSON file downloaded
- [ ] File name: something like `project-name-xxxxx.json`

**When done, let me know and I'll show you Step 5 (implementation!)**

---

## ✅ **STEP 5: SETUP CREDENTIALS & DEPLOY**

### **Part A: Local Development Setup**

1. **Add JSON File to Project:**
   - Create a folder called `credentials` in your project root (if it doesn't exist)
   - Move your downloaded JSON file there
   - Rename it to: `gmail-service-account.json`
   - **Path should be:** `credentials/gmail-service-account.json`

2. **Verify File Location:**
   ```
   nexthardware/
   └── credentials/
       └── gmail-service-account.json  ← Your JSON file here
   ```

3. **Add to .gitignore (IMPORTANT!):**
   - Make sure `credentials/` is in your `.gitignore` file
   - This keeps your credentials private!

### **Part B: Production Setup (Vercel)**

For Vercel deployment, we need to add the JSON as an environment variable:

1. **Convert JSON to Base64:**
   
   **Easy Way (Use Helper Script):**
   ```bash
   ./encode-gmail-credentials.sh
   ```
   This will show you the encoded string ready to paste into Vercel!
   
   **Manual Way (Mac/Linux):**
   ```bash
   cat credentials/gmail-service-account.json | base64
   ```
   
   **Manual Way (Windows PowerShell):**
   ```powershell
   [Convert]::ToBase64String([IO.File]::ReadAllBytes("credentials\gmail-service-account.json"))
   ```
   
   **Or use an online tool:**
   - Copy the entire JSON file content
   - Go to: https://www.base64encode.org/
   - Paste and encode
   - Copy the result

2. **Add to Vercel Environment Variables:**
   - Go to: https://vercel.com/dashboard
   - Select your project: `nexthardware`
   - Go to: **Settings** → **Environment Variables**
   - Click **Add New**
   - **Name:** `GMAIL_SERVICE_ACCOUNT_JSON_BASE64`
   - **Value:** Paste the base64-encoded JSON (the long string)
   - **Environments:** Select all (Production, Preview, Development)
   - Click **Save**

3. **Also Set Sender Email (Optional):**
   - **Name:** `GMAIL_SENDER_EMAIL`
   - **Value:** `guanliangsky@gmail.com` (or your Gmail address)
   - **Environments:** Select all
   - Click **Save**

### **Part C: Domain-Wide Delegation (If Sending from Gmail)**

**⚠️ IMPORTANT:** Service accounts can't send emails from personal Gmail accounts directly. You have two options:

#### **Option 1: Use Google Workspace (If You Have It)**
1. In Google Cloud Console, go to your Service Account
2. Check "Enable Google Workspace Domain-wide Delegation"
3. Note the Client ID
4. In Google Workspace Admin Console, add the Client ID with scope: `https://www.googleapis.com/auth/gmail.send`

#### **Option 2: Use OAuth2 (For Personal Gmail)**
If you're using a personal Gmail account (`@gmail.com`), you'll need OAuth2 instead of service accounts. Let me know if you need help setting this up!

### **✅ Checkpoint:**
- [ ] JSON file added to `credentials/gmail-service-account.json`
- [ ] `credentials/` added to `.gitignore`
- [ ] Base64-encoded JSON added to Vercel as `GMAIL_SERVICE_ACCOUNT_JSON_BASE64`
- [ ] `GMAIL_SENDER_EMAIL` set in Vercel (optional)
- [ ] Domain-wide delegation configured (if using Google Workspace)

---

## ✅ **STEP 6: TEST IT!**

### **Test Locally:**

1. **Start Development Server:**
   ```bash
   npm run dev
   ```

2. **Test Contact Form:**
   - Go to: http://localhost:3000/contact
   - Fill out the form
   - Submit it
   - Check your email inbox!

3. **Check Console Logs:**
   - Look for: `✅ Loaded Gmail credentials from local file`
   - Look for: `✅ Gmail API: Email sent successfully`

### **Test in Production:**

1. **Redeploy on Vercel:**
   - After adding environment variables, Vercel will auto-redeploy
   - Or manually trigger: Settings → Deployments → Redeploy

2. **Test Contact Form:**
   - Go to: https://nexthardware.io/contact
   - Fill out and submit
   - Check your email!

3. **Check Vercel Logs:**
   - Go to: Vercel Dashboard → Your Project → Logs
   - Look for: `✅ Loaded Gmail credentials from environment variable (base64)`
   - Look for: `✅ Gmail API: Email sent successfully`

### **✅ Checkpoint:**
- [ ] Local test successful (email received)
- [ ] Production test successful (email received)
- [ ] No errors in console/logs

---

## 🎉 **YOU'RE DONE!**

**What's Working:**
- ✅ Contact form sends emails via Gmail API
- ✅ Newsletter notifications sent via Gmail API
- ✅ Works locally and in production
- ✅ No more Resend restrictions!

**If You Have Issues:**
- Check Vercel logs for error messages
- Verify environment variables are set correctly
- Make sure the JSON file is valid
- For personal Gmail, you may need OAuth2 instead of service accounts

---

## 📋 **COMPLETE CHECKLIST:**

- ✅ Step 1: Create Google Cloud Project
- ✅ Step 2: Enable Gmail API
- ✅ Step 3: Create Service Account
- ✅ Step 4: Create Service Account Key (the "long key")
- ✅ Step 5: Setup Credentials & Deploy
- ✅ Step 6: Test It!

**All done! 🚀**

---

## 🔧 **TROUBLESHOOTING**

### **Issue: "Failed to load Gmail service account credentials"**

**Solution:**
- ✅ Check that `credentials/gmail-service-account.json` exists
- ✅ Verify the JSON file is valid (not corrupted)
- ✅ For Vercel: Check that `GMAIL_SERVICE_ACCOUNT_JSON_BASE64` is set correctly

### **Issue: "Domain-wide delegation might be required"**

**This means:** Service accounts can't send from personal Gmail accounts directly.

**Solutions:**
1. **If you have Google Workspace:**
   - Enable domain-wide delegation in the service account
   - Add the Client ID in Google Workspace Admin Console

2. **If you have personal Gmail (@gmail.com):**
   - You need OAuth2 instead of service accounts
   - Contact me to set up OAuth2 flow

### **Issue: "Email not sending"**

**Check:**
- ✅ Vercel logs for error messages
- ✅ Environment variables are set correctly
- ✅ JSON credentials are valid
- ✅ Gmail API is enabled in Google Cloud Console

### **Issue: "Permission denied" or "403 error"**

**Possible causes:**
- Service account doesn't have Gmail API access
- Domain-wide delegation not configured (for Google Workspace)
- Using personal Gmail (needs OAuth2 instead)

---

## 📚 **QUICK REFERENCE**

**Files:**
- `lib/gmail.ts` - Gmail API implementation
- `app/api/contact/route.ts` - Contact form (uses Gmail)
- `app/api/newsletter/route.ts` - Newsletter (uses Gmail)
- `credentials/gmail-service-account.json` - Local credentials (gitignored)

**Environment Variables:**
- `GMAIL_SERVICE_ACCOUNT_JSON_BASE64` - Base64-encoded JSON (for Vercel)
- `GMAIL_SENDER_EMAIL` - Gmail address to send from (optional)
- `CONTACT_EMAIL` - Email address to receive notifications

**Helper Scripts:**
- `encode-gmail-credentials.sh` - Encode JSON for Vercel

---

**Need help? Check the logs or let me know! 🚀**

