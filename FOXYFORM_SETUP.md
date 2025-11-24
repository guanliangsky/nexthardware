# 🦊 FoxyForm Setup Guide

## Why FoxyForm?

FoxyForm is a **super simple** contact form service that:
- ✅ No API keys or OAuth setup needed
- ✅ Free with anti-spam protection
- ✅ Just paste embed code and it works
- ✅ Emails sent directly to your inbox
- ✅ No server-side code required

## Quick Setup (5 minutes)

### Step 1: Create Your Form

1. Go to **https://www.foxyform.com/**
2. Click **"Create Your Form"** or **"Get Started"**
3. Customize your form:
   - Select fields: Name, Email, Subject, Message
   - Mark required fields (Name, Email, Message)
   - Adjust colors to match your site (optional)
4. Enter your email: `liangoptics@gmail.com` (or your preferred email)
5. Click **"Generate Form"**

### Step 2: Get Your Embed Code

After generating, you'll get HTML code that looks like:
```html
<form id="foxyform_contactform" action="https://www.foxyform.com/api.php" method="post">
  <!-- form fields -->
</form>
<script type="text/javascript" src="https://www.foxyform.com/js/foxyform.js"></script>
```

### Step 3: Add to Environment Variables

1. Copy the **entire HTML code** (form + script)
2. Add to `.env.local`:
   ```
   NEXT_PUBLIC_FOXYFORM_CODE=<paste your entire HTML code here>
   ```

   **Important:** The code should be on one line, or use `\n` for line breaks.

3. Add to Vercel:
   ```bash
   vercel env add NEXT_PUBLIC_FOXYFORM_CODE production
   # Paste your code when prompted
   ```

### Step 4: Deploy

```bash
vercel --prod
```

## Alternative: Direct Embed (Even Simpler)

If you prefer, you can also directly embed FoxyForm in the component without environment variables:

1. Get your FoxyForm code
2. Replace the form section in `components/Contact.tsx` with the FoxyForm HTML

## Testing

1. Visit your contact page: `https://nexthardware.io/contact`
2. Fill out the form
3. Submit
4. Check your email inbox!

## Benefits Over Gmail API

- ✅ **No OAuth2 setup** - no tokens, no refresh tokens
- ✅ **No Google Cloud Console** configuration
- ✅ **No environment variables** for API keys
- ✅ **Works immediately** - just paste and go
- ✅ **Built-in spam protection**
- ✅ **Free tier available**

## Troubleshooting

### Form not showing?
- Check that `NEXT_PUBLIC_FOXYFORM_CODE` is set correctly
- Make sure the HTML code is properly formatted
- Check browser console for errors

### Emails not arriving?
- Check spam folder
- Verify email address in FoxyForm settings
- Check FoxyForm dashboard for submission logs

## Need Help?

- FoxyForm Docs: https://www.foxyform.com/help.php
- FoxyForm Support: https://www.foxyform.com/contact.php


