# Configure DNS in Porkbun - Step by Step

## ✅ Your Site is Deployed!
- **Production URL:** https://nexthardware.vercel.app
- **Domain:** nexthardware.io (added to Vercel)

## 📋 Standard Vercel DNS Records

For most Vercel projects, you need these DNS records:

### Record 1: Root Domain (nexthardware.io)
- **Type:** `A`
- **Name:** `@` (or leave blank/empty)
- **Value:** `76.76.21.21`
- **TTL:** `3600` (or Auto)

### Record 2: WWW Subdomain (www.nexthardware.io)
- **Type:** `CNAME`
- **Name:** `www`
- **Value:** `cname.vercel-dns.com`
- **TTL:** `3600` (or Auto)

## 🔧 How to Add in Porkbun (Web Interface)

Since Porkbun doesn't have a CLI, here's the exact steps:

1. **Go to Porkbun:**
   - Visit: https://porkbun.com/account/domains
   - Login to your account

2. **Select Your Domain:**
   - Click on **nexthardware.io**

3. **Go to DNS Settings:**
   - Click **"DNS"** tab or **"DNS Records"**

4. **Remove Conflicting Records:**
   - Delete any existing A records for `@` or root
   - Delete any existing CNAME for `www` (if pointing elsewhere)

5. **Add New Records:**
   
   **Add A Record:**
   - Click **"Add Record"** or **"+"**
   - Type: Select **"A"**
   - Name: Enter **`@`** or leave blank
   - Answer: Enter **`76.76.21.21`**
   - TTL: **3600** or Auto
   - Click **"Add"** or **"Save"**

   **Add CNAME Record:**
   - Click **"Add Record"** or **"+"**
   - Type: Select **"CNAME"**
   - Name: Enter **`www`**
   - Answer: Enter **`cname.vercel-dns.com`**
   - TTL: **3600** or Auto
   - Click **"Add"** or **"Save"**

6. **Save All Changes**

## ⏳ Wait for DNS Propagation

- Usually takes 5-10 minutes
- Can take up to 24 hours
- Check status: https://dnschecker.org/#A/nexthardware.io

## ✅ Verify

After DNS propagates:
- Visit: https://nexthardware.io
- Should redirect to your Vercel site
- SSL certificate will be automatic

---

**Note:** If Vercel shows different DNS records in the dashboard, use those instead. But `76.76.21.21` is Vercel's standard IP.

