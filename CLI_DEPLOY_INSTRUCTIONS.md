# Deploy via CLI - Instructions

## If you need to login via CLI:

Since the terminal here is read-only, you'll need to:

1. **Get a Vercel token from browser:**
   - Go to https://vercel.com/account/tokens
   - Click "Create Token"
   - Name it "nexthardware-deploy"
   - Copy the token

2. **Use token to login:**
   ```bash
   cd ~/Documents/nexthardware
   vercel login --token YOUR_TOKEN_HERE
   ```

3. **Then deploy:**
   ```bash
   vercel
   ```

## OR: If already logged in via browser

Just run:
```bash
cd ~/Documents/nexthardware
vercel
```

And answer the prompts.

