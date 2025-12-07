# 🚀 Formspree CLI Deployment Guide

## ✅ What's Ready

1. ✅ Formspree CLI installed
2. ✅ `formspree.json` configuration file created
3. ✅ Auto Response template configured

## 📋 Get Your Deploy Key

1. Go to: **https://formspree.io/forms**
2. Click on your form: **`xankagkj`**
3. Go to **"Settings"** tab
4. Find **"Deploy Key"** section
5. Copy the deploy key

## 🚀 Deploy Configuration

### Option 1: Using Environment Variable (Recommended)

```bash
export FORMSPREE_DEPLOY_KEY='your-deploy-key-here'
formspree deploy
```

### Option 2: Using Inline Flag

```bash
formspree deploy -k <your-deploy-key>
```

### Option 3: Using the Script

```bash
export FORMSPREE_DEPLOY_KEY='your-deploy-key-here'
./scripts/deploy-formspree-autoresponse.sh
```

## 📄 Configuration File

The `formspree.json` file contains:
- Form ID: `xankagkj`
- Auto Response action
- Welcome email template with Discord link

## ✅ After Deployment

When a member registers:
1. ✅ Data saved to Supabase
2. ✅ Formspree receives submission
3. ✅ **Auto Response sends welcome email to member**
4. ✅ Admin receives notification

## 🧪 Testing

1. Register a test user at `/register`
2. Check the user's email inbox
3. Should receive welcome email with Discord link

## 🔍 Verify Configuration

After deployment, check in Formspree Dashboard:
1. Go to https://formspree.io/forms
2. Click on form `xankagkj`
3. Go to "Workflow" tab
4. Should see "Auto Response" action configured

## 📝 Alternative: Manual Setup

If CLI doesn't work, you can configure manually:
1. Go to https://formspree.io/forms
2. Click on form `xankagkj`
3. Go to "Workflow" tab
4. Click "+Add New" → "Auto Response"
5. Use template from `FORMSPREE_AUTORESPONSE_SETUP.md`


