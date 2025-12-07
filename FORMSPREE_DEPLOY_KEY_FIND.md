# 🔑 Finding Formspree Deploy Key

If you want to use the CLI instead of manual setup, you need to find your Deploy Key.

## Where to Find Deploy Key

### Option 1: In Form Settings
1. In your form settings page (where you are now)
2. Scroll down to find:
   - **"Deploy"** section
   - **"CLI"** section  
   - **"API"** section
   - **"Deploy Key"** field

### Option 2: Account Settings
1. Go to your account/profile icon (top right)
2. Click **"Account Settings"** or **"Settings"**
3. Look for:
   - **"API Keys"**
   - **"Deploy Keys"**
   - **"CLI Access"**

### Option 3: Project Settings
1. If you have projects, go to **"My First Project"** settings
2. Look for deploy key there

## ⚠️ Important Note

**Deploy Key might only be available on paid plans.**

If you can't find it:
- ✅ **Use Manual Setup instead** (see `FORMSPREE_MANUAL_SETUP.md`)
- Manual setup works on all plans and is actually easier!

## If You Find the Deploy Key

Once you have it, run:

```bash
export FORMSPREE_DEPLOY_KEY='your-deploy-key-here'
formspree deploy
```

Or:

```bash
formspree deploy -k <your-deploy-key>
```


