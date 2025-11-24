# 📋 Step-by-Step: Create OAuth2 Client in Browser

**You're on the Google Cloud Console Credentials page. Follow these steps:**

---

## **STEP 1: Click "CREATE CREDENTIALS"**

Look for the blue button at the top that says:
**"+ CREATE CREDENTIALS"**

Click it!

---

## **STEP 2: Select "OAuth client ID"**

A dropdown menu will appear. Select:
**"OAuth client ID"**

---

## **STEP 3: Configure OAuth Consent Screen (If Asked)**

If you see a message saying:
> "To create an OAuth client ID, you need to configure the OAuth consent screen"

**Do this:**

1. Click the **"CONFIGURE CONSENT SCREEN"** button

2. **Choose User Type:**
   - Select **"External"** (for personal Gmail)
   - Click **"CREATE"**

3. **App Information:**
   - **App name:** `Next Hardware Email`
   - **User support email:** `liangoptics@gmail.com` (or `guanliangsky@gmail.com`)
   - **Developer contact information:** `liangoptics@gmail.com`
   - Click **"SAVE AND CONTINUE"**

4. **Scopes:**
   - Click **"SAVE AND CONTINUE"** (skip this step)

5. **Test users:**
   - Click **"SAVE AND CONTINUE"** (skip this step)

6. **Summary:**
   - Click **"BACK TO DASHBOARD"**

7. **Go back to Credentials:**
   - In the left sidebar, click **"APIs & Services"** → **"Credentials"**
   - Click **"+ CREATE CREDENTIALS"** → **"OAuth client ID"** again

---

## **STEP 4: Create OAuth Client**

Now you'll see a form. Fill it in:

1. **Application type:**
   - Select **"Web application"**

2. **Name:**
   - Enter: `Next Hardware Email Client`

3. **Authorized redirect URIs:**
   - Click **"+ ADD URI"** button
   - Add: `http://localhost:3000/api/auth/gmail/callback`
   - Click **"+ ADD URI"** button again
   - Add: `https://nexthardware.io/api/auth/gmail/callback`

4. **Click "CREATE"** button (at the bottom)

---

## **STEP 5: Copy Your Credentials**

A popup window will appear showing:

- **Your Client ID** (a long string like: `123456789-abcdefg.apps.googleusercontent.com`)
- **Your Client Secret** (a long string)

**IMPORTANT:** Copy both of these!

You can:
- Click the copy icon next to each one
- Or select and copy manually

---

## **STEP 6: Come Back Here**

After copying, come back to the terminal and:

1. Run: `./add-credentials-now.sh`
2. Paste your Client ID when asked
3. Paste your Client Secret when asked
4. The script will automatically get your refresh token!

---

**Need help? Tell me which step you're on!**




