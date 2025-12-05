# 📧 Resend Setup for User Welcome Emails

## ✅ Solution: Hybrid Email Setup

Since Formspree's Auto Response requires a paid plan, we're using a **hybrid approach**:

- **Resend (Free Tier)** → Sends welcome emails to users
- **Formspree (Free Tier)** → Sends admin notifications

## 🎯 Why This Works

- ✅ **Resend Free Tier:** 100 emails/day, 3,000/month (perfect for user emails)
- ✅ **Formspree Free Tier:** 50 submissions/month (perfect for admin notifications)
- ✅ **No paid plans needed!**

## 🚀 Setup Steps

### Step 1: Create Resend Account

1. Go to: https://resend.com
2. Sign up for free account
3. Verify your email

### Step 2: Get API Key

1. Go to: https://resend.com/api-keys
2. Click **"Create API Key"**
3. Name it: `nexthardware-user-emails`
4. Copy the API key (starts with `re_`)

### Step 3: Add to Environment Variables

#### Local Development (`.env.local`)

```bash
# Resend API Key (for sending emails to users)
RESEND_API_KEY=re_your_api_key_here
```

#### Vercel Production

1. Go to: https://vercel.com/dashboard
2. Select project: `nexthardware`
3. Go to **Settings** → **Environment Variables**
4. Add:
   - **Name:** `RESEND_API_KEY`
   - **Value:** `re_your_api_key_here`
   - **Environments:** Production, Preview, Development
5. Click **Save**

## ✅ How It Works

When a member registers:

1. ✅ Data saved to Supabase
2. ✅ **Resend sends welcome email to the member** (with Discord link)
3. ✅ **Formspree sends admin notification** to `liangoptics@gmail.com`

## 📧 Email Details

### User Welcome Email (via Resend)
- **From:** `Next Hardware <onboarding@resend.dev>`
- **To:** Member's email address
- **Content:** Welcome message + Discord invite link

### Admin Notification (via Formspree)
- **From:** Formspree (configured in dashboard)
- **To:** `liangoptics@gmail.com`
- **Content:** New member registration details

## 🧪 Testing

After setup:

1. Register a test user at `/register`
2. Check the user's email inbox (should receive welcome email from Resend)
3. Check `liangoptics@gmail.com` (should receive admin notification from Formspree)

## 📊 Limits

### Resend Free Tier
- ✅ 100 emails/day
- ✅ 3,000 emails/month
- ✅ Perfect for user welcome emails

### Formspree Free Tier
- ✅ 50 submissions/month
- ✅ Perfect for admin notifications

## 🔧 Code Changes

The code has been updated to:
- Use `sendMemberWelcomeEmailViaResend()` for user emails
- Use `sendEmailViaFormspree()` for admin notifications
- Both run in parallel (non-blocking)

## ✅ Status

- ✅ Resend package installed
- ✅ `lib/resend.ts` created
- ✅ `lib/formspree.ts` updated to use Resend for user emails
- ⏳ **Need to add `RESEND_API_KEY` to environment variables**

## 🚀 Next Steps

1. **Get Resend API key** (see Step 2 above)
2. **Add to `.env.local`** for local testing
3. **Add to Vercel** for production
4. **Test registration** to verify emails are sent

## 💡 Optional: Custom Domain

If you want to send from `noreply@nexthardware.io` instead of `onboarding@resend.dev`:

1. Go to: https://resend.com/domains
2. Add domain: `nexthardware.io`
3. Add DNS records (provided by Resend)
4. Verify domain
5. Update code to use `noreply@nexthardware.io`

**Note:** This is optional - `onboarding@resend.dev` works perfectly fine!


