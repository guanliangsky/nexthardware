# Deploy nexthardware.io via Vercel Dashboard

## ✅ Step 1: Logged into Vercel - COMPLETE

## 🚀 Step 2: Deploy Your Site

### Option A: Deploy via GitHub (Recommended)
1. Go to https://vercel.com/dashboard
2. Click **"Add New Project"** or **"Import Project"**
3. If you have GitHub connected:
   - Click **"Import Git Repository"**
   - Select your repository (or create one)
   - Click **"Import"**
4. Configure:
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** `./` (leave as is)
   - **Build Command:** `npm run build` (auto-filled)
   - **Output Directory:** `.next` (auto-filled)
5. Click **"Deploy"**

### Option B: Deploy via Drag & Drop
1. Go to https://vercel.com/dashboard
2. Click **"Add New Project"**
3. Drag your entire `nexthardware` folder to the upload area
4. Configure the same settings as above
5. Click **"Deploy"**

---

## ⏳ Step 3: Wait for Deployment
- This takes 1-2 minutes
- You'll see build logs in real-time
- When done, you'll get a URL like: `nexthardware-xxx.vercel.app`

---

## 📝 Step 4: Add Your Domain
After deployment completes:
1. In your project dashboard, click **"Settings"**
2. Click **"Domains"** in the left sidebar
3. Click **"Add Domain"**
4. Enter: **nexthardware.io**
5. Click **"Add"**

Vercel will show you DNS records to add in Porkbun.

---

**Let me know when you've deployed and I'll help you with the DNS configuration!**

