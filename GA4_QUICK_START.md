# 🚀 GA4 Quick Start - 3 Steps

**Status:** Code is ready! Just add your Measurement ID.

---

## ✅ Step 1: Get Your GA4 Measurement ID (2 minutes)

1. Go to: **https://analytics.google.com/**
2. Sign in with Google
3. Click **Admin** (gear icon, bottom left)
4. Click **Create Property** (if needed)
5. Click **Data Streams** → **Add stream** → **Web**
6. Enter: `https://nexthardware.io`
7. Copy your **Measurement ID** (looks like `G-XXXXXXXXXX`)

---

## ✅ Step 2: Add to Environment Variables (1 minute)

### Local (.env.local):
```bash
# Create or edit .env.local in project root
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Production (Vercel):
1. Go to: **https://vercel.com/dashboard**
2. Select your project
3. **Settings** → **Environment Variables**
4. Add: `NEXT_PUBLIC_GA_ID` = `G-XXXXXXXXXX`
5. Select all environments (Production, Preview, Development)
6. Click **Save**

---

## ✅ Step 3: Deploy & Verify (2 minutes)

### Local:
```bash
# Restart dev server
npm run dev
```

### Production:
- Vercel will auto-deploy, OR
- Go to **Deployments** → **Redeploy**

### Verify:
1. Visit your site
2. Open browser DevTools (F12)
3. Check **Console** - should see no errors
4. Check **Network** tab - filter "gtag" - should see requests
5. Go to GA4 → **Reports** → **Realtime** - you should appear!

---

## ✅ That's It!

Once you add your Measurement ID, GA4 will:
- ✅ Track all page views automatically
- ✅ Track user sessions
- ✅ Show data in realtime
- ✅ Work on all pages

**No code changes needed - it's already set up!** 🎉

---

**Need help?** See `GA4_SETUP_GUIDE.md` for detailed instructions.



