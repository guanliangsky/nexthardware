# 🚀 Formspree CLI Setup for Auto Response

## Quick Setup

I've created the configuration file and setup script. Here's how to use it:

### Step 1: Install Formspree CLI (if not already installed)

```bash
npm install -g @formspree/cli
```

### Step 2: Login to Formspree

```bash
formspree login
```

This will open your browser to authenticate with Formspree.

### Step 3: Deploy Configuration

```bash
formspree deploy
```

Or use the automated script:

```bash
./scripts/setup-formspree-autoresponse.sh
```

## Configuration File

The `formspree.json` file has been created with:
- Form ID: `xankagkj`
- Auto Response enabled
- Welcome email template with Discord link

## What This Does

After deployment, when a member registers:
1. ✅ Data saved to Supabase
2. ✅ Formspree receives submission with `email` field
3. ✅ **Auto Response automatically sends welcome email to the member**
4. ✅ Admin receives notification

## Manual Alternative

If CLI doesn't work, you can also configure via Dashboard:
1. Go to https://formspree.io/forms
2. Click on form `xankagkj`
3. Go to "Workflow" tab
4. Click "+Add New" → "Auto Response"
5. Use the template from `FORMSPREE_AUTORESPONSE_SETUP.md`

## Testing

After setup:
1. Register a test user at `/register`
2. Check the user's email inbox
3. Should receive welcome email with Discord link


