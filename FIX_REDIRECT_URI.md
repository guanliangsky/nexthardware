# 🔧 Fix Redirect URI Mismatch Error

**Error:** `redirect_uri_mismatch`

This means the redirect URI in your OAuth2 client doesn't match what we're using.

---

## **QUICK FIX:**

### **Step 1: Go to OAuth2 Client Settings**

1. In Google Cloud Console (just opened)
2. Find your OAuth2 client: **"Web client 1"**
3. Click on it (or click the edit/pencil icon)

### **Step 2: Add Redirect URI**

In the **"Authorized redirect URIs"** section:

1. Click **"+ ADD URI"**
2. Add this EXACT URI:
   ```
   http://localhost:3000/api/auth/gmail/callback
   ```
3. Click **"SAVE"**

### **Step 3: Wait a Few Minutes**

- Google says it may take 5 minutes to a few hours
- Usually it's ready in 1-2 minutes

### **Step 4: Try Again**

After saving, come back and we'll try getting the refresh token again!

---

## **ALTERNATIVE: Use OAuth Playground**

If the redirect URI fix doesn't work immediately, we can use Google OAuth Playground instead, which doesn't require a redirect URI.

---

**After you've added the redirect URI and saved, let me know and we'll try again!**


