# DNS Configuration for nexthardware.io in Porkbun

## ✅ Domain Added to Vercel!
Your domain `nexthardware.io` is now connected to Vercel.

## 📋 Step 1: Get DNS Records from Vercel

1. Go to: https://vercel.com/liang-guans-projects/nexthardware/settings/domains
2. You should see `nexthardware.io` listed
3. Click on it or look for **DNS Configuration**
4. Vercel will show you the DNS records to add

## 🔧 Step 2: Add DNS Records in Porkbun

1. Go to: https://porkbun.com/account/domains
2. Click on **nexthardware.io**
3. Click **"DNS"** or **"DNS Records"** tab
4. You'll see existing records - we need to add Vercel's records

### Typical Vercel DNS Records:

**For Root Domain:**
- **Type:** `A`
- **Name:** `@` (or leave blank/empty)
- **Value:** `76.76.21.21` (or the IP Vercel shows you)
- **TTL:** `3600` (or default)

**For WWW:**
- **Type:** `CNAME`
- **Name:** `www`
- **Value:** `cname.vercel-dns.com` (or what Vercel shows)
- **TTL:** `3600` (or default)

## ⚠️ Important Notes:

- **Remove or update** any existing A records pointing to other IPs
- **Keep** any other records you need (MX for email, etc.)
- **Don't delete** records you're not sure about

## ⏳ Step 3: Wait for Propagation

- DNS changes take 5-10 minutes usually
- Can take up to 24 hours in some cases
- Check status: https://dnschecker.org

## ✅ Step 4: Verify

After DNS propagates:
- Visit: https://nexthardware.io
- Should show your site!
- SSL certificate will be automatic (may take a few minutes)

---

**What DNS records does Vercel show you?** 
Copy them here and I'll help you configure them exactly in Porkbun!

