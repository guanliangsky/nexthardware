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

# Get credentials from .env.local (get the last occurrence to avoid duplicates)
CLIENT_ID=$(grep "^GMAIL_CLIENT_ID=" .env.local | tail -1 | cut -d'=' -f2- | tr -d '\r\n')
CLIENT_SECRET=$(grep "^GMAIL_CLIENT_SECRET=" .env.local | tail -1 | cut -d'=' -f2- | tr -d '\r\n')
REFRESH_TOKEN=$(grep "^GMAIL_REFRESH_TOKEN=" .env.local | tail -1 | cut -d'=' -f2- | tr -d '\r\n')
SENDER_EMAIL="liangoptics@gmail.com"

if [ -z "$CLIENT_ID" ] || [ -z "$CLIENT_SECRET" ] || [ -z "$REFRESH_TOKEN" ]; then
  echo "❌ Error: Missing credentials in .env.local"
  echo "CLIENT_ID: ${CLIENT_ID:0:20}..."
  echo "CLIENT_SECRET: ${CLIENT_SECRET:0:20}..."
  echo "REFRESH_TOKEN: ${REFRESH_TOKEN:0:20}..."
  exit 1
fi

echo "📋 Adding environment variables..."
echo ""

# Add GMAIL_CLIENT_ID
echo "1. Adding GMAIL_CLIENT_ID..."
echo "$CLIENT_ID" | vercel env add GMAIL_CLIENT_ID production 2>&1 | grep -v "Already exists" || echo "   (already exists)"
echo "$CLIENT_ID" | vercel env add GMAIL_CLIENT_ID preview 2>&1 | grep -v "Already exists" || echo "   (already exists)"
echo "$CLIENT_ID" | vercel env add GMAIL_CLIENT_ID development 2>&1 | grep -v "Already exists" || echo "   (already exists)"
echo "✅ GMAIL_CLIENT_ID added"

# Add GMAIL_CLIENT_SECRET
echo ""
echo "2. Adding GMAIL_CLIENT_SECRET..."
echo "$CLIENT_SECRET" | vercel env add GMAIL_CLIENT_SECRET production 2>&1 | grep -v "Already exists" || echo "   (already exists)"
echo "$CLIENT_SECRET" | vercel env add GMAIL_CLIENT_SECRET preview 2>&1 | grep -v "Already exists" || echo "   (already exists)"
echo "$CLIENT_SECRET" | vercel env add GMAIL_CLIENT_SECRET development 2>&1 | grep -v "Already exists" || echo "   (already exists)"
echo "✅ GMAIL_CLIENT_SECRET added"

# Add GMAIL_REFRESH_TOKEN
echo ""
echo "3. Adding GMAIL_REFRESH_TOKEN..."
echo "$REFRESH_TOKEN" | vercel env add GMAIL_REFRESH_TOKEN production 2>&1 | grep -v "Already exists" || echo "   (already exists)"
echo "$REFRESH_TOKEN" | vercel env add GMAIL_REFRESH_TOKEN preview 2>&1 | grep -v "Already exists" || echo "   (already exists)"
echo "$REFRESH_TOKEN" | vercel env add GMAIL_REFRESH_TOKEN development 2>&1 | grep -v "Already exists" || echo "   (already exists)"
echo "✅ GMAIL_REFRESH_TOKEN added"

# Add GMAIL_SENDER_EMAIL
echo ""
echo "4. Adding GMAIL_SENDER_EMAIL..."
echo "$SENDER_EMAIL" | vercel env add GMAIL_SENDER_EMAIL production 2>&1 | grep -v "Already exists" || echo "   (already exists)"
echo "$SENDER_EMAIL" | vercel env add GMAIL_SENDER_EMAIL preview 2>&1 | grep -v "Already exists" || echo "   (already exists)"
echo "$SENDER_EMAIL" | vercel env add GMAIL_SENDER_EMAIL development 2>&1 | grep -v "Already exists" || echo "   (already exists)"
echo "✅ GMAIL_SENDER_EMAIL added"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ All environment variables added to Vercel!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📋 Next: Vercel will auto-redeploy with the new environment variables"
echo "   Then test: https://nexthardware.io/contact"
echo ""

