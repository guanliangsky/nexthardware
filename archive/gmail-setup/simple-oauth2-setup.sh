#!/bin/bash

# Simplest possible setup - Web UI for OAuth2 client, CLI for everything else

echo "🚀 Simple OAuth2 Setup"
echo "======================"
echo ""
echo "Since Google doesn't allow OAuth2 client creation via API,"
echo "we'll use web UI (2 minutes) then automate the rest via CLI!"
echo ""

# Find the project from credentials
PROJECT_ID=$(grep -o '"project_id": "[^"]*"' credentials/gmail-service-account.json 2>/dev/null | cut -d'"' -f4 || echo "next-hardware-email")

echo "📋 Project: $PROJECT_ID"
echo ""

# Check if already have credentials
if grep -q "GMAIL_CLIENT_ID=" .env.local 2>/dev/null && [ -n "$(grep "GMAIL_CLIENT_ID=" .env.local | cut -d'=' -f2 | tr -d ' ')" ]; then
  if grep -q "GMAIL_CLIENT_SECRET=" .env.local 2>/dev/null && [ -n "$(grep "GMAIL_CLIENT_SECRET=" .env.local | cut -d'=' -f2 | tr -d ' ')" ]; then
    echo "✅ You already have Client ID and Secret!"
    echo ""
    echo "📋 Getting refresh token now..."
    echo ""
    node get-gmail-refresh-token.js
    exit 0
  fi
fi

# Open credentials page
echo "📋 Opening Google Cloud Console..."
open "https://console.cloud.google.com/apis/credentials?project=$PROJECT_ID" 2>/dev/null || \
open "https://console.cloud.google.com/apis/credentials" 2>/dev/null

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📋 IN THE BROWSER (2 minutes):"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1. Click '+ CREATE CREDENTIALS' → 'OAuth client ID'"
echo ""
echo "2. If asked about consent screen:"
echo "   - Choose 'External' → 'CREATE'"
echo "   - App name: Next Hardware Email"
echo "   - Email: guanliangsky@gmail.com"
echo "   - Click 'SAVE AND CONTINUE' (twice, skip scopes/test users)"
echo "   - Click 'BACK TO DASHBOARD'"
echo "   - Click '+ CREATE CREDENTIALS' → 'OAuth client ID' again"
echo ""
echo "3. Fill in:"
echo "   - Application type: Web application"
echo "   - Name: Next Hardware Email Client"
echo "   - Redirect URIs:"
echo "     * http://localhost:3000/api/auth/gmail/callback"
echo "     * https://nexthardware.io/api/auth/gmail/callback"
echo ""
echo "4. Click 'CREATE'"
echo ""
echo "5. Copy Client ID and Client Secret"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
read -p "Press Enter when you have copied Client ID and Secret..."

echo ""
echo "📋 Paste your credentials:"
echo ""
read -p "Client ID: " CLIENT_ID
read -p "Client Secret: " CLIENT_SECRET

if [ -z "$CLIENT_ID" ] || [ -z "$CLIENT_SECRET" ]; then
  echo "❌ Both are required!"
  exit 1
fi

# Save
ENV_FILE=".env.local"
[ ! -f "$ENV_FILE" ] && touch "$ENV_FILE"

if grep -q "^GMAIL_CLIENT_ID=" "$ENV_FILE"; then
  sed -i '' "s|^GMAIL_CLIENT_ID=.*|GMAIL_CLIENT_ID=$CLIENT_ID|" "$ENV_FILE"
else
  echo "GMAIL_CLIENT_ID=$CLIENT_ID" >> "$ENV_FILE"
fi

if grep -q "^GMAIL_CLIENT_SECRET=" "$ENV_FILE"; then
  sed -i '' "s|^GMAIL_CLIENT_SECRET=.*|GMAIL_CLIENT_SECRET=$CLIENT_SECRET|" "$ENV_FILE"
else
  echo "GMAIL_CLIENT_SECRET=$CLIENT_SECRET" >> "$ENV_FILE"
fi

echo ""
echo "✅ Credentials saved!"
echo ""
echo "📋 Now getting refresh token automatically via CLI..."
echo ""

node get-gmail-refresh-token.js

echo ""
echo "✅ ALL DONE!"
echo ""
echo "📋 Next: Test it!"
echo "   npm run dev"
echo "   Then test: http://localhost:3000/contact"
echo ""

