# 📧 Formspree Auto Response - Manual Dashboard Setup

## Quick Setup Steps

Based on your current Formspree dashboard, here's how to configure Auto Response:

### Step 1: Navigate to Workflow/Rules Tab

1. In your Formspree dashboard, you're currently on the **"Settings"** tab
2. Look for **"Rules"** or **"Workflow"** tab (usually next to Settings)
3. Click on it

### Step 2: Add Auto Response Action

1. Click **"+Add New"** or **"Add Action"** button
2. Select **"Auto Response"** or **"Send Confirmation Email"**
3. Configure the following:

**From Name:**
```
Next Hardware Team
```

**Subject:**
```
Welcome to Next Hardware Community! 🎉
```

**Message (HTML):**
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

4. **Save** the configuration

### Step 3: Verify

After saving:
- The Auto Response action should appear in your Workflow/Rules list
- It will automatically send emails to the `email` field in form submissions

## ✅ How It Works

When a member registers:
1. ✅ Data saved to Supabase
2. ✅ Formspree receives submission with `email` field
3. ✅ **Auto Response automatically sends welcome email to that email address**
4. ✅ Admin notification sent to `liangoptics@gmail.com`

## 🧪 Test It

1. Register a test user at `/register`
2. Check the user's email inbox (should receive welcome email)
3. Check `liangoptics@gmail.com` (should receive admin notification)

## 📝 Important Notes

- **Email Field Required:** Our code already includes `email` field in submissions ✅
- **Template Variables:** Formspree uses `{{name}}` and `{{email}}` for personalization
- **Form ID:** Make sure you're configuring the form with ID `xankagkj`


