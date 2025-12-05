# 📧 Formspree Dashboard Setup Guide

Based on your current Formspree settings, here's what you need to configure:

## ✅ Current Settings (Good!)

From your dashboard:
- ✅ Form Name: `nexthardware`
- ✅ Form Enabled: Yes
- ✅ Email Notifications: Enabled
- ✅ Target Email: `liangoptics@gmail.com`

## 🔧 Step 1: Find Deploy Key

The Deploy Key is usually in one of these locations:

1. **In Settings tab** (where you are now):
   - Scroll down to find "Deploy Key" or "API" section
   - It might be under "HTTP API" section
   - Or in a "Deploy" or "CLI" section

2. **Alternative locations:**
   - Account Settings → API Keys
   - Project Settings → Deploy Keys
   - Form Settings → Advanced → Deploy Key

**If you can't find it:**
- The deploy key might only be available on paid plans
- You can still configure Auto Response manually via Dashboard (see Step 2)

## 🔧 Step 2: Configure Auto Response (Two Options)

### Option A: Using CLI (If you have Deploy Key)

1. Get your deploy key from Settings
2. Run:
   ```bash
   export FORMSPREE_DEPLOY_KEY='your-deploy-key-here'
   formspree deploy
   ```

### Option B: Manual Dashboard Setup (Recommended if no Deploy Key)

1. In your Formspree dashboard, go to the form `nexthardware`
2. Click on **"Rules"** or **"Workflow"** tab (next to Settings)
3. Click **"+Add New"** or **"Add Action"**
4. Select **"Auto Response"** or **"Send Confirmation Email"**
5. Configure:
   - **From Name:** Next Hardware Team
   - **Subject:** Welcome to Next Hardware Community! 🎉
   - **Message:** (Use the HTML template below)

## 📄 Auto Response Email Template

Copy this HTML for the welcome email:

```html
<h2>Welcome to Next Hardware, {{name}}!</h2>
<p>Thank you for joining our Silicon Valley hardware community. We're excited to have you!</p>
<p><strong>Join our Discord community to start collaborating:</strong></p>
<p style="text-align: center; margin: 30px 0;">
  <a href="https://discord.gg/d5dTjjVD" style="display: inline-block; padding: 12px 24px; background-color: #5865F2; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
    Join Discord Community
  </a>
</p>
<p><a href="https://discord.gg/d5dTjjVD">https://discord.gg/d5dTjjVD</a></p>
<hr>
<p><strong>What's next?</strong></p>
<ul>
  <li>Join our Discord to connect with other members</li>
  <li>Check out our upcoming events on <a href="https://luma.com/NextHardware">Luma</a></li>
  <li>Follow us on <a href="https://x.com/nexthardware">X/Twitter</a> for updates</li>
</ul>
<p>See you in the community!</p>
<p>— The Next Hardware Team</p>
```

**Note:** Formspree uses `{{name}}` and `{{email}}` for template variables.

## ✅ Important: Email Field Requirement

For Auto Response to work, your form submission **must include an `email` field**.

✅ Our code already includes this:
- In `lib/formspree.ts`, we send `email` field in the submission
- This triggers the Auto Response to send to that email address

## 🧪 Testing

After configuration:

1. Register a test user at `/register`
2. Check the user's email inbox (should receive welcome email)
3. Check `liangoptics@gmail.com` (should receive admin notification)

## 🔍 Verify Configuration

After setup, check:
1. Go to form → "Rules" or "Workflow" tab
2. Should see "Auto Response" action listed
3. Test by submitting a form with an email field

## 📝 Current Code Status

✅ Code is ready:
- `lib/formspree.ts` includes `email` field in submissions
- `formspree.json` has the configuration ready
- API routes send data with email field

⚠️ Need to configure:
- Auto Response in Formspree Dashboard (via CLI or manually)


