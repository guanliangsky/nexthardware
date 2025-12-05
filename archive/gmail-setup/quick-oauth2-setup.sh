#!/bin/bash

# Quick OAuth2 Setup - Hybrid approach
# Uses web UI for OAuth2 client creation (simplest)
# Then automates refresh token via CLI

echo "🚀 Quick Gmail OAuth2 Setup"
echo "============================"
echo ""
echo "This will:"
echo "  1. Open Google Cloud Console (you create OAuth2 client)"
echo "  2. Automatically get refresh token via CLI"
echo ""

# Check if credentials already exist
if grep -q "GMAIL_CLIENT_ID=" .env.local 2>/dev/null && [ -n "$(grep "GMAIL_CLIENT_ID=" .env.local | cut -d'=' -f2 | tr -d ' ')" ]; then
  echo "✅ GMAIL_CLIENT_ID already set"
  if grep -q "GMAIL_CLIENT_SECRET=" .env.local 2>/dev/null && [ -n "$(grep "GMAIL_CLIENT_SECRET=" .env.local | cut -d'=' -f2 | tr -d ' ')" ]; then
    echo "✅ GMAIL_CLIENT_SECRET already set"
    echo ""
    echo "📋 You already have credentials! Getting refresh token..."
    echo ""
    node get-gmail-refresh-token.js
    exit 0
  fi
fi

# Get project ID
PROJECT_ID=$(grep -o '"project_id": "[^"]*"' credentials/gmail-service-account.json 2>/dev/null | cut -d'"' -f4 || echo "next-hardware-email")

echo "📋 Project: $PROJECT_ID"
echo ""

# Open Google Cloud Console
echo "📋 Step 1: Creating OAuth2 Client"
echo "=================================="
echo ""
echo "Opening Google Cloud Console..."
echo ""

# Try to open with the project
open "https://console.cloud.google.com/apis/credentials?project=$PROJECT_ID" 2>/dev/null || \
open "https://console.cloud.google.com/apis/credentials" 2>/dev/null

echo "📋 In the browser that just opened:"
echo ""
echo "   1. Make sure project '$PROJECT_ID' is selected (top dropdown)"
echo "   2. Click '+ CREATE CREDENTIALS' → 'OAuth client ID'"
echo ""
echo "   If asked to configure consent screen:"
echo "      - Choose 'External' → Click 'CREATE'"
echo "      - App name: 'Next Hardware Email'"
echo "      - User support email: 'guanliangsky@gmail.com'"
echo "      - Developer contact: 'guanliangsky@gmail.com'"
echo "      - Click 'SAVE AND CONTINUE' (skip scopes)"
echo "      - Click 'SAVE AND CONTINUE' (skip test users)"
echo "      - Click 'BACK TO DASHBOARD'"
echo ""
echo "   3. Application type: 'Web application'"
echo "   4. Name: 'Next Hardware Email Client'"
echo "   5. Authorized redirect URIs (click '+ ADD URI' for each):"
echo "      - http://localhost:3000/api/auth/gmail/callback"
echo "      - https://nexthardware.io/api/auth/gmail/callback"
echo "   6. Click 'CREATE'"
echo "   7. Copy the Client ID and Client Secret"
echo ""
read -p "Press Enter when you have copied Client ID and Client Secret..."

echo ""
echo "📋 Step 2: Saving Credentials"
echo "==============================="
echo ""

read -p "Paste Client ID: " CLIENT_ID
read -p "Paste Client Secret: " CLIENT_SECRET

# Save to .env.local
ENV_FILE=".env.local"
if [ ! -f "$ENV_FILE" ]; then
  touch "$ENV_FILE"
fi

# Update or add
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

echo "✅ Credentials saved to .env.local"

# Get refresh token
echo ""
echo "📋 Step 3: Getting Refresh Token (Automated)"
echo "=============================================="
echo ""

node get-gmail-refresh-token.js

echo ""
echo "✅ Setup Complete!"
echo ""
echo "📋 Next Steps:"
echo "   1. Test locally: npm run dev"
echo "   2. Test contact form: http://localhost:3000/contact"
echo "   3. Add to Vercel: GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, GMAIL_REFRESH_TOKEN"
echo ""

