# Deployment Guide - Next Hardware Website

## 🚀 Deploying to Vercel (Recommended for Next.js)

### Step 1: Prepare Your Code
Your code is ready! Make sure everything is committed:
```bash
git add .
git commit -m "Ready for deployment"
```

### Step 2: Deploy to Vercel

**Option A: Using Vercel CLI (Recommended)**
```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (from your project directory)
cd ~/Documents/nexthardware
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? (your account)
# - Link to existing project? No
# - Project name? nexthardware (or your domain name)
# - Directory? ./
# - Override settings? No
```

**Option B: Using Vercel Dashboard**
1. Go to https://vercel.com
2. Sign up/Login with GitHub
3. Click "Add New Project"
4. Import your Git repository (or drag & drop your folder)
5. Configure:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: `.next`
6. Click "Deploy"

### Step 3: Connect Your Porkbun Domain

**In Vercel Dashboard:**
1. Go to your project → Settings → Domains
2. Add your domain (e.g., `nexthardware.io`)
3. Vercel will show you DNS records to add

**In Porkbun Dashboard:**
1. Login to https://porkbun.com
2. Go to your domain → DNS Records
3. Add the DNS records Vercel provides:

**For Root Domain (nexthardware.io):**
- Type: `A`
- Name: `@` (or leave blank)
- Value: `76.76.21.21` (Vercel's IP - check Vercel dashboard for current IP)

**For WWW (www.nexthardware.io):**
- Type: `CNAME`
- Name: `www`
- Value: `cname.vercel-dns.com` (or what Vercel shows)

**OR Use Vercel's Nameservers (Easier):**
1. In Vercel: Copy the nameservers shown
2. In Porkbun: Go to your domain → Nameservers
3. Replace with Vercel's nameservers

### Step 4: SSL Certificate
Vercel automatically provides SSL certificates. It may take a few minutes to provision.

### Step 5: Verify
- Wait 5-10 minutes for DNS to propagate
- Visit your domain: `https://nexthardware.io`
- Check SSL: Should show a padlock icon

## 🔧 Environment Variables (if needed)

If you add environment variables later:
1. Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add any API keys or secrets
3. Redeploy

## 📝 DNS Propagation Check

Check if DNS has propagated:
- https://dnschecker.org
- Enter your domain and check globally

## 🆘 Troubleshooting

**Domain not working?**
- Wait 24-48 hours for DNS propagation
- Check DNS records match Vercel's requirements
- Verify nameservers are correct

**SSL Certificate issues?**
- Wait a few minutes after adding domain
- Check Vercel dashboard for certificate status
- Ensure DNS is properly configured

**Build errors?**
- Check Vercel build logs
- Ensure all dependencies are in `package.json`
- Test build locally: `npm run build`

## 📚 Additional Resources

- Vercel Docs: https://vercel.com/docs
- Porkbun DNS Guide: https://porkbun.com/support/kb/how-to-manage-dns-records
- Next.js Deployment: https://nextjs.org/docs/deployment

