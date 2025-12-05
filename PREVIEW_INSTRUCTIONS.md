# How to Preview the Website

## Step 1: Install Node.js (if not already installed)

1. **Download Node.js:**
   - Go to https://nodejs.org/
   - Download the LTS (Long Term Support) version for Windows
   - Run the installer and follow the setup wizard
   - Make sure to check "Add to PATH" during installation

2. **Verify Installation:**
   - Open a new PowerShell or Command Prompt window
   - Run: `node --version` (should show v18.x or higher)
   - Run: `npm --version` (should show version number)

## Step 2: Install Dependencies

Open PowerShell or Command Prompt in this folder (`nexthardware`) and run:

```bash
npm install
```

This will install all required packages (Next.js, React, Tailwind CSS, Framer Motion, etc.)

## Step 3: Start the Development Server

After installation completes, run:

```bash
npm run dev
```

You should see output like:
```
  ▲ Next.js 14.x.x
  - Local:        http://localhost:3000
  - Ready in Xs
```

## Step 4: Open in Browser

1. Open your web browser
2. Navigate to: **http://localhost:3000**
3. You should see your Next Hardware website!

## Troubleshooting

### If `npm` is not recognized:
- Make sure Node.js is installed
- Close and reopen your terminal/PowerShell
- Try restarting your computer after installing Node.js

### If port 3000 is already in use:
- Next.js will automatically try the next available port (3001, 3002, etc.)
- Check the terminal output for the actual URL

### If you see errors:
- Make sure you're in the correct directory (`nexthardware`)
- Delete `node_modules` folder and `package-lock.json` if they exist
- Run `npm install` again

## Alternative: Use Vercel for Preview

If you prefer not to install Node.js locally:

1. Push your code to GitHub
2. Go to https://vercel.com
3. Sign up/login with GitHub
4. Import your repository
5. Vercel will automatically build and deploy
6. You'll get a live preview URL instantly

## Quick Commands Reference

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Stop the server
Press Ctrl + C in the terminal
```

