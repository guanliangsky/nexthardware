# Domain Configuration for nexthardware.io

## ✅ Deployment Complete!
- **Production URL:** https://nexthardware-6bui1g5pw-liang-guans-projects.vercel.app
- **Project:** nexthardware

## 🔗 Step 4: Add Domain in Vercel Dashboard

Since CLI domain commands might need project linking, let's use the dashboard:

1. Go to: https://vercel.com/liang-guans-projects/nexthardware/settings/domains
2. Click **"Add Domain"**
3. Enter: **nexthardware.io**
4. Click **"Add"**

Vercel will show you DNS records to configure.

## 📋 Step 5: DNS Records You'll Need

Vercel will show you something like:

**For Root Domain (nexthardware.io):**
- Type: `A`
- Name: `@` (or blank)
- Value: `76.76.21.21` (Vercel's IP - check dashboard for exact value)

**For WWW (www.nexthardware.io):**
- Type: `CNAME`
- Name: `www`
- Value: `cname.vercel-dns.com` (or what Vercel shows)

## 🔧 Step 6: Configure in Porkbun

1. Go to: https://porkbun.com/account/domains
2. Click on **nexthardware.io**
3. Go to **DNS Records** or **DNS**
4. Add the records Vercel provided
5. Save

## ⏳ Step 7: Wait for DNS Propagation
- Usually takes 5-10 minutes
- Can take up to 24 hours
- Check: https://dnschecker.org

## ✅ Step 8: Verify
Visit: https://nexthardware.io
Should show your site with SSL certificate!

