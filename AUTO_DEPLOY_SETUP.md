# 🚀 Auto-Deployment Setup: GitHub → Vercel

## Quick Setup (2 minutes)

### Step 1: Connect GitHub to Vercel Account (One-time)

1. **Open this link:** https://vercel.com/account/integrations
2. **Find "GitHub"** in the list
3. **Click "Add"** or "Connect" button
4. **Authorize Vercel** to access your GitHub
   - You'll be redirected to GitHub
   - Click "Authorize Vercel"
   - You'll be redirected back to Vercel

### Step 2: Connect Repository to Project

1. **Open this link:** https://vercel.com/dashboard
2. **Click on your "nexthardware" project**
3. **Go to:** Settings → Git (in left sidebar)
4. **Click:** "Connect Git Repository"
5. **Select:** GitHub (if not already selected)
6. **Choose repository:** `guanliangsky/nexthardware`
7. **Select branch:** `nexthardware` (or `master`)
8. **Click:** "Connect"

### Step 3: Verify Auto-Deployment

After connecting, Vercel will:
- ✅ Show GitHub icon in project dashboard
- ✅ Display "Deployed from GitHub" badge
- ✅ Automatically deploy on every push

### Step 4: Test It!

```bash
# Make a small change
echo "<!-- Test auto-deploy -->" >> app/page.tsx

# Commit and push
./git-push.sh "Test auto-deployment"

# Watch Vercel automatically deploy!
```

## What Happens After Setup

**Before:**
- Manual: `vercel --prod` (you have to remember)

**After:**
- Automatic: `git push` → Vercel deploys automatically! 🎉

## Verification

After setup, you'll see:
- ✅ GitHub icon in Vercel project
- ✅ "Connected to GitHub" message
- ✅ Automatic deployments on push
- ✅ Deployment status in GitHub commits

## Troubleshooting

**"Failed to link" error:**
- Make sure you completed Step 1 (GitHub OAuth)
- Try refreshing the Vercel dashboard
- Check that the repository is accessible

**No auto-deploy after push:**
- Verify repository is connected in Settings → Git
- Check that you're pushing to the connected branch
- Look at Vercel dashboard for deployment status

## Direct Links

- **Connect GitHub:** https://vercel.com/account/integrations
- **Project Settings:** https://vercel.com/dashboard → nexthardware → Settings → Git
- **Your GitHub Repo:** https://github.com/guanliangsky/nexthardware

