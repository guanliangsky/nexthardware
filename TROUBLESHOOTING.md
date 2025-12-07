# Troubleshooting Guide

## Server Status
The development server should be running on **http://localhost:3000**

## Common Issues & Solutions

### 1. "This site can't be reached" / Connection Refused

**Solution 1: Check if server is running**
```powershell
netstat -ano | findstr :3000
```
If you see `LISTENING`, the server is running.

**Solution 2: Restart the server**
1. Stop any running Node processes:
   ```powershell
   Get-Process -Name node | Stop-Process -Force
   ```
2. Navigate to project folder:
   ```powershell
   cd c:\Users\liang\Documents\cursor\nexthardware
   ```
3. Start server:
   ```powershell
   npm run dev
   ```
4. Wait for "Ready" message (should say "Ready in Xs")
5. Open browser to http://localhost:3000

**Solution 3: Try different port**
If port 3000 is busy, Next.js will automatically use 3001, 3002, etc.
Check the terminal output for the actual port.

### 2. Page loads but shows errors

**Check browser console:**
- Press F12 to open Developer Tools
- Look at Console tab for errors
- Look at Network tab to see if files are loading

### 3. Compilation errors

**Clear cache and rebuild:**
```powershell
# Delete .next folder
Remove-Item -Recurse -Force .next

# Reinstall dependencies
npm install

# Start server
npm run dev
```

### 4. Port already in use

**Kill process on port 3000:**
```powershell
# Find process ID
netstat -ano | findstr :3000

# Kill the process (replace PID with actual number)
taskkill /PID <PID> /F
```

### 5. Node.js not found

**Refresh PATH:**
```powershell
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
```

## Quick Test

Try accessing these URLs:
- http://localhost:3000
- http://127.0.0.1:3000
- http://[::1]:3000 (IPv6)

## Still Not Working?

1. Check Windows Firewall - it might be blocking localhost
2. Try a different browser
3. Check if antivirus is blocking Node.js
4. Restart your computer (refreshes all environment variables)

