# Quick Deploy Steps

## 🚀 Deploy Your Site Now

### Step 1: Login to Vercel
```bash
cd ~/Documents/nexthardware
vercel login
```
This will open your browser to login.

### Step 2: Deploy
```bash
vercel
```
Answer the prompts:
- Set up and deploy? **Yes**
- Which scope? (choose your account)
- Link to existing project? **No**
- Project name? **nexthardware** (or your domain name)
- Directory? **./** (just press Enter)
- Override settings? **No**

### Step 3: Add Your Domain

After deployment, Vercel will give you a URL like: `https://nexthardware-xxx.vercel.app`

**To add your Porkbun domain:**

1. Go to https://vercel.com/dashboard
2. Click on your project
3. Go to **Settings** → **Domains**
4. Click **Add Domain**
5. Enter your domain (e.g., `nexthardware.io`)
6. Vercel will show you DNS records to add

### Step 4: Configure DNS in Porkbun

**Option A: Use Vercel Nameservers (Easiest)**
1. In Vercel dashboard, copy the nameservers shown
2. Go to Porkbun → Your Domain → Nameservers
3. Replace with Vercel's nameservers

**Option B: Add DNS Records (More Control)**
In Porkbun DNS settings, add:

For root domain:
- Type: `A`
- Name: `@` (or blank)
- Value: `76.76.21.21` (check Vercel for current IP)

For www:
- Type: `CNAME`  
- Name: `www`
- Value: `cname.vercel-dns.com`

### Step 5: Wait & Verify
- Wait 5-10 minutes for DNS
- Visit your domain
- SSL certificate will be automatic

## 📝 What's Your Domain Name?

Tell me your domain and I can help you configure it specifically!

