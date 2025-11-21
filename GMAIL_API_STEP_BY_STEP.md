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

## 📋 **UPCOMING STEPS:**

- ✅ Step 1: Create Google Cloud Project
- ✅ Step 2: Enable Gmail API
- ✅ Step 3: Create Service Account
- ✅ Step 4: Create Service Account Key (the "long key")
- Step 5: Implementation

---

**Ready? Let's go! 🚀**

