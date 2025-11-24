# 📋 OAuth2 Client Creation - Step by Step

## **STEP 1: Click "CREATE CREDENTIALS"**

On the page you're seeing:
- Look for the blue button **"+ CREATE CREDENTIALS"** (top of the page)
- Click it

---

## **STEP 2: Select "OAuth client ID"**

- A dropdown menu will appear
- Select **"OAuth client ID"**

---

## **STEP 3: Configure OAuth Consent Screen (If Asked)**

If you see a message saying "To create an OAuth client ID, you need to configure the OAuth consent screen":

1. Click **"CONFIGURE CONSENT SCREEN"** button

2. **Choose User Type:**
   - Select **"External"** (for personal Gmail)
   - Click **"CREATE"**

3. **App Information:**
   - **App name:** `Next Hardware Email`
   - **User support email:** `guanliangsky@gmail.com`
   - **Developer contact information:** `guanliangsky@gmail.com`
   - Click **"SAVE AND CONTINUE"**

4. **Scopes:**
   - Click **"SAVE AND CONTINUE"** (skip this)

5. **Test users:**
   - Click **"SAVE AND CONTINUE"** (skip this)

6. **Summary:**
   - Click **"BACK TO DASHBOARD"**

7. **Go back to Credentials:**
   - Click **"APIs & Services"** → **"Credentials"** (left sidebar)
   - Click **"+ CREATE CREDENTIALS"** → **"OAuth client ID"** again

---

## **STEP 4: Create OAuth Client**

1. **Application type:**
   - Select **"Web application"**

2. **Name:**
   - Enter: `Next Hardware Email Client`

3. **Authorized redirect URIs:**
   - Click **"+ ADD URI"**
   - Add: `http://localhost:3000/api/auth/gmail/callback`
   - Click **"+ ADD URI"** again
   - Add: `https://nexthardware.io/api/auth/gmail/callback`

4. **Click "CREATE"**

---

## **STEP 5: Copy Credentials**

A popup will appear with:
- **Your Client ID** (long string)
- **Your Client Secret** (long string)

**IMPORTANT:** Copy both of these!

---

## **STEP 6: Add to Project**

After copying, come back here and run:

```bash
./add-oauth-credentials.sh
```

Then paste your Client ID and Client Secret when asked!

---

**Need help? Let me know what step you're on!**


