# Quick Check: Is Supabase Email Configured?

## Step 1: Check Supabase Dashboard

1. Go to: https://supabase.com/dashboard/project/snpmvpsoxeieguojlwzv
2. Navigate to: **Settings** → **Auth** → **SMTP Settings**
3. Check if:
   - ✅ Custom SMTP is configured, OR
   - ✅ Default email service is enabled

## Step 2: Test Forgot Password

1. Go to: https://nexthardware.io/auth
2. Click "Forgot password?"
3. Enter a test email
4. Check if email is received

## Step 3: Check Logs

1. In Supabase Dashboard: **Logs** → **Auth Logs**
2. Look for email sending activity
3. Check for any errors

## If Not Working:

See FORGOT_PASSWORD_SETUP.md for detailed setup instructions.
