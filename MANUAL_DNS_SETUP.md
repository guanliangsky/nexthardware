# Manual DNS Setup in Porkbun

## ✅ Keep Porkbun Nameservers - No Changes Needed!

You can keep Porkbun's default nameservers and just add DNS records.

## 📋 Step-by-Step Instructions

### Step 1: Go to DNS Settings
1. Login to Porkbun: https://porkbun.com/account/domains
2. Click on **nexthardware.io**
3. Click **"DNS"** or **"DNS Records"** tab

### Step 2: Remove Conflicting Records
Look for and **DELETE** any existing:
- **A records** for `@` or root domain (blank name)
- **CNAME records** for `www` (if pointing elsewhere)

### Step 3: Add Vercel DNS Records

**Record 1: Root Domain (nexthardware.io)**
- Click **"Add Record"** or **"+"**
- **Type:** Select **"A"**
- **Name:** Enter **`@`** or leave **blank/empty**
- **Answer/Value:** Enter **`76.76.21.21`**
- **TTL:** `600` or `3600` (or leave default)
- Click **"Add"** or **"Save"**

**Record 2: WWW Subdomain (www.nexthardware.io)**
- Click **"Add Record"** or **"+"**
- **Type:** Select **"CNAME"**
- **Name:** Enter **`www`**
- **Answer/Value:** Enter **`cname.vercel-dns.com`**
- **TTL:** `600` or `3600` (or leave default)
- Click **"Add"** or **"Save"**

### Step 4: Save All Changes
Make sure to click **"Save"** or **"Apply"** if there's a button

## ⏳ Step 5: Wait for DNS Propagation
- Usually takes **5-10 minutes**
- Can take up to **24 hours** in rare cases
- Check status: https://dnschecker.org/#A/nexthardware.io

## ✅ Step 6: Verify
After DNS propagates:
- Visit: **https://nexthardware.io**
- Should show your Vercel site
- SSL certificate will be automatic (may take a few minutes)

---

## 📝 Summary

**You need to add:**
1. **A record:** `@` → `76.76.21.21`
2. **CNAME record:** `www` → `cname.vercel-dns.com`

**You do NOT need to:**
- ❌ Change nameservers
- ❌ Modify any other DNS records
- ❌ Contact support

Just add those 2 records and you're done!

