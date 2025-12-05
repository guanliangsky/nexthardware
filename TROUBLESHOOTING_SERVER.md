# Troubleshooting Server Connection Issue

## Issue
The development server is having trouble starting automatically. This might be due to:
- Google Drive folder permissions
- Background process limitations
- Port conflicts

## Solution: Run Server Manually

### Step 1: Open Terminal
Open Terminal (or iTerm) on your Mac.

### Step 2: Navigate to Project
```bash
cd "/Users/liang/Library/CloudStorage/GoogleDrive-liang@rokid.ai/Other computers/My Computer (2)/cursor/nexthardware"
```

### Step 3: Start the Server
```bash
npm run dev
```

### Step 4: Wait for "Ready" Message
You should see output like:
```
▲ Next.js 14.x.x
- Local:        http://localhost:3000
- Ready in Xs
```

### Step 5: Open Browser
Once you see "Ready", open your browser and go to:
**http://localhost:3000**

---

## Alternative: Try Different Port

If port 3000 is busy, try:
```bash
npx next dev -p 3001
```

Then open: http://localhost:3001

---

## Check for Port Conflicts

If you get "port already in use" error:
```bash
# Find what's using port 3000
lsof -ti:3000

# Kill the process (replace PID with actual number)
kill -9 <PID>
```

---

## Quick Fix Commands

```bash
# Navigate to project
cd "/Users/liang/Library/CloudStorage/GoogleDrive-liang@rokid.ai/Other computers/My Computer (2)/cursor/nexthardware"

# Clear cache
rm -rf .next

# Fix permissions (if needed)
chmod +x node_modules/.bin/*

# Start server
npm run dev
```

---

## If Still Not Working

1. **Check Node.js version**: Should be 18+ 
   ```bash
   node --version
   ```

2. **Reinstall dependencies**:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Check for errors** in the terminal output

---

**Once the server is running, you should see your Next Hardware website!** 🚀


