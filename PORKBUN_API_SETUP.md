# Configure DNS via Porkbun API

## Step 1: Get Your Porkbun API Keys

1. Go to: https://porkbun.com/account/api
2. Login to your Porkbun account
3. Click **"Create API Key"** or use existing one
4. Copy your:
   - **API Key**
   - **Secret Key**

## Step 2: Set Environment Variables

In your terminal, run:

```bash
export PORKBUN_API_KEY="your_api_key_here"
export PORKBUN_API_SECRET="your_secret_key_here"
```

## Step 3: Run the Configuration Script

```bash
cd ~/Documents/nexthardware
node configure-porkbun-dns.js
```

The script will:
- ✅ Fetch existing DNS records
- 🗑️  Delete conflicting records
- ➕ Add Vercel DNS records (A and CNAME)
- ✅ Verify configuration

## What Records Will Be Added

1. **A Record** (Root domain):
   - Name: `@`
   - Type: `A`
   - Value: `76.76.21.21`
   - TTL: `600`

2. **CNAME Record** (WWW):
   - Name: `www`
   - Type: `CNAME`
   - Value: `cname.vercel-dns.com`
   - TTL: `600`

## After Running

- Wait 5-10 minutes for DNS propagation
- Check: https://dnschecker.org/#A/nexthardware.io
- Visit: https://nexthardware.io

---

**Ready? Get your API keys and let me know when you have them!**

