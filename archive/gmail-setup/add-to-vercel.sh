#!/bin/bash

# Add Gmail OAuth2 credentials to Vercel via CLI

set -e

echo "🔐 Adding Gmail OAuth2 Credentials to Vercel"
echo "=============================================="
echo ""

# Check if logged in
if ! vercel whoami &>/dev/null; then
  echo "📋 Not logged in to Vercel. Logging in..."
  vercel login
fi

# Get project name
PROJECT_NAME=$(vercel ls 2>/dev/null | grep -i "nexthardware" | head -1 | awk '{print $1}' || echo "nexthardware")

echo "📋 Project: $PROJECT_NAME"
echo ""

# Get credentials from .env.local
CLIENT_ID=$(grep "^GMAIL_CLIENT_ID=" .env.local | cut -d'=' -f2 | head -1 | tr -d ' ')
CLIENT_SECRET=$(grep "^GMAIL_CLIENT_SECRET=" .env.local | cut -d'=' -f2 | head -1 | tr -d ' ')
REFRESH_TOKEN=$(grep "^GMAIL_REFRESH_TOKEN=" .env.local | cut -d'=' -f2 | head -1 | tr -d ' ')
SENDER_EMAIL="liangoptics@gmail.com"

if [ -z "$CLIENT_ID" ] || [ -z "$CLIENT_SECRET" ] || [ -z "$REFRESH_TOKEN" ]; then
  echo "❌ Error: Missing credentials in .env.local"
  exit 1
fi

echo "📋 Adding environment variables..."
echo ""

# Add GMAIL_CLIENT_ID
echo "1. Adding GMAIL_CLIENT_ID..."
echo "$CLIENT_ID" | vercel env add GMAIL_CLIENT_ID production
echo "$CLIENT_ID" | vercel env add GMAIL_CLIENT_ID preview
echo "$CLIENT_ID" | vercel env add GMAIL_CLIENT_ID development
echo "✅ GMAIL_CLIENT_ID added"

# Add GMAIL_CLIENT_SECRET
echo ""
echo "2. Adding GMAIL_CLIENT_SECRET..."
echo "$CLIENT_SECRET" | vercel env add GMAIL_CLIENT_SECRET production
echo "$CLIENT_SECRET" | vercel env add GMAIL_CLIENT_SECRET preview
echo "$CLIENT_SECRET" | vercel env add GMAIL_CLIENT_SECRET development
echo "✅ GMAIL_CLIENT_SECRET added"

# Add GMAIL_REFRESH_TOKEN
echo ""
echo "3. Adding GMAIL_REFRESH_TOKEN..."
echo "$REFRESH_TOKEN" | vercel env add GMAIL_REFRESH_TOKEN production
echo "$REFRESH_TOKEN" | vercel env add GMAIL_REFRESH_TOKEN preview
echo "$REFRESH_TOKEN" | vercel env add GMAIL_REFRESH_TOKEN development
echo "✅ GMAIL_REFRESH_TOKEN added"

# Add GMAIL_SENDER_EMAIL
echo ""
echo "4. Adding GMAIL_SENDER_EMAIL..."
echo "$SENDER_EMAIL" | vercel env add GMAIL_SENDER_EMAIL production
echo "$SENDER_EMAIL" | vercel env add GMAIL_SENDER_EMAIL preview
echo "$SENDER_EMAIL" | vercel env add GMAIL_SENDER_EMAIL development
echo "✅ GMAIL_SENDER_EMAIL added"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ All environment variables added to Vercel!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📋 Next: Vercel will auto-redeploy with the new environment variables"
echo "   Then test: https://nexthardware.io/contact"
echo ""

