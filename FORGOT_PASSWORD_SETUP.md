# 🔐 Forgot Password Functionality - How It Works

## ✅ Current Implementation

The forgot password feature uses **Supabase Auth's built-in password reset functionality**.

### Code Location:
- **File:** `app/auth/page.tsx`
- **Function:** `handleForgotPassword()`
- **Method:** `supabase.auth.resetPasswordForEmail()`

### How It Works:

1. **User clicks "Forgot password?"** on login form
2. **Enters email address** in the modal
3. **Code calls:** `supabase.auth.resetPasswordForEmail(email, { redirectTo: '/auth/reset-password' })`
4. **Supabase sends email** with reset link (if configured)
5. **User clicks link** in email
6. **Redirected to:** `/auth/reset-password`
7. **User enters new password** (with strength validation)
8. **Password updated** via `supabase.auth.updateUser()`

---

## ⚠️ IMPORTANT: Email Configuration Required

**For this to work, Supabase must be configured to send emails.**

### Option 1: Use Supabase's Default Email Service (Free Tier)

**Status:** ✅ **Usually enabled by default**

Supabase provides a default email service that sends from `noreply@mail.app.supabase.io`.

**To verify/enable:**
1. Go to: https://supabase.com/dashboard
2. Select your project: `nexthardware`
3. Go to **Authentication** → **Email Templates**
4. Check if email sending is enabled
5. Verify the "Reset Password" template exists

**Limitations:**
- Emails sent from `noreply@mail.app.supabase.io` (not your domain)
- May go to spam folder
- Limited customization

---

### Option 2: Configure Custom SMTP (Recommended for Production)

**For professional emails from your domain:**

1. **Go to Supabase Dashboard:**
   - https://supabase.com/dashboard
   - Select your project
   - Go to **Settings** → **Auth** → **SMTP Settings**

2. **Configure SMTP:**
   - **SMTP Host:** (e.g., `smtp.resend.com` for Resend)
   - **SMTP Port:** (e.g., `587` or `465`)
   - **SMTP User:** (your email service username)
   - **SMTP Password:** (your email service password)
   - **Sender Email:** `noreply@nexthardware.io`
   - **Sender Name:** `Next Hardware`

3. **Using Resend (Recommended):**
   - Go to: https://resend.com/api-keys
   - Create an API key
   - Use Resend's SMTP settings:
     - **Host:** `smtp.resend.com`
     - **Port:** `587`
     - **User:** `resend`
     - **Password:** Your Resend API key

4. **Test Email Sending:**
   - Go to **Authentication** → **Users**
   - Click on a user
   - Click "Send password reset email"
   - Check if email is received

---

## 🧪 Testing the Feature

### Test Steps:

1. **Go to:** https://nexthardware.io/auth
2. **Click:** "Forgot password?" link
3. **Enter:** A valid email address (must be registered in Supabase Auth)
4. **Click:** "Send Reset Link"
5. **Check email inbox** for password reset email
6. **Click link** in email
7. **Should redirect to:** `/auth/reset-password`
8. **Enter new password** (must meet strength requirements)
9. **Password updated** and redirected to login

### Expected Behavior:

✅ **If email is configured:**
- User receives email with reset link
- Link redirects to `/auth/reset-password`
- User can set new password

❌ **If email is NOT configured:**
- Function will return success (no error)
- But no email will be sent
- User won't receive reset link

---

## 🔍 How to Check if Email is Configured

### Method 1: Check Supabase Dashboard

1. Go to: https://supabase.com/dashboard/project/snpmvpsoxeieguojlwzv
2. Go to **Settings** → **Auth** → **SMTP Settings**
3. Check if SMTP is configured

### Method 2: Test Manually

1. Try the forgot password flow
2. Check email inbox (and spam folder)
3. If no email received, SMTP is likely not configured

### Method 3: Check Supabase Logs

1. Go to **Logs** → **Auth Logs**
2. Look for email sending errors
3. Check for SMTP configuration errors

---

## 🚀 Quick Setup Guide

### If Using Supabase Default Email (Easiest):

1. **Verify it's enabled:**
   - Go to Supabase Dashboard
   - **Authentication** → **Email Templates**
   - Ensure "Reset Password" template exists

2. **Test it:**
   - Use forgot password feature
   - Check email inbox

**Note:** Default emails may go to spam. Check spam folder!

---

### If Setting Up Custom SMTP (Better for Production):

#### Using Resend (Recommended):

1. **Get Resend API Key:**
   - Go to: https://resend.com/api-keys
   - Create API key
   - Copy the key

2. **Configure in Supabase:**
   - Go to: **Settings** → **Auth** → **SMTP Settings**
   - **Enable Custom SMTP**
   - **SMTP Host:** `smtp.resend.com`
   - **SMTP Port:** `587`
   - **SMTP User:** `resend`
   - **SMTP Password:** Your Resend API key
   - **Sender Email:** `noreply@nexthardware.io` (or use Resend's default)
   - **Sender Name:** `Next Hardware`

3. **Save and Test:**
   - Save settings
   - Test forgot password flow
   - Check email inbox

---

## 📧 Email Template Customization

You can customize the password reset email template in Supabase:

1. Go to: **Authentication** → **Email Templates**
2. Select: **Reset Password**
3. Customize:
   - Subject line
   - Email body
   - Link text
4. Save changes

**Default template includes:**
- Reset link with token
- Expiration time
- Security notice

---

## ⚠️ Common Issues

### Issue 1: No Email Received

**Possible Causes:**
- SMTP not configured
- Email in spam folder
- Invalid email address
- Supabase email service disabled

**Solutions:**
- Check spam folder
- Verify SMTP configuration
- Check Supabase logs for errors
- Try with a different email address

### Issue 2: Reset Link Doesn't Work

**Possible Causes:**
- Link expired (default: 1 hour)
- Invalid token
- User not found

**Solutions:**
- Request new reset link
- Check if user exists in Supabase Auth
- Verify redirect URL is correct

### Issue 3: "Email not found" Error

**Possible Causes:**
- Email not registered in Supabase Auth
- User registered via OAuth (no password)

**Solutions:**
- User must be registered with email/password
- OAuth users need to use OAuth login

---

## ✅ Current Status

**Code Implementation:** ✅ Complete
**Email Configuration:** ⚠️ **Needs Verification**

**Next Steps:**
1. Check Supabase SMTP settings
2. Test forgot password flow
3. Verify email delivery
4. Configure custom SMTP if needed

---

## 📝 Summary

**The forgot password feature WILL work IF:**
- ✅ Supabase email service is enabled (default)
- ✅ OR custom SMTP is configured
- ✅ User email exists in Supabase Auth
- ✅ Redirect URL is correct

**To verify it's working:**
- Test the flow end-to-end
- Check email inbox (and spam)
- Check Supabase logs for errors

**If emails aren't sending:**
- Configure SMTP in Supabase Dashboard
- Use Resend or another email service
- Test again

---

**Last Updated:** 2025-01-26


