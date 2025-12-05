#!/bin/bash

# Simplified OAuth2 Setup Script
# Opens web UI for credential creation, then automates refresh token

PROJECT_ID="next-hardware-email"

echo "🔐 Gmail OAuth2 Setup"
echo "===================="
echo ""
echo "Project: $PROJECT_ID"
echo ""

# Set project
gcloud config set project $PROJECT_ID >/dev/null 2>&1

echo "📋 Step 1: Creating OAuth2 Credentials"
echo "========================================"
echo ""
echo "Opening Google Cloud Console..."
echo ""

# Open the credentials page
open "https://console.cloud.google.com/apis/credentials?project=$PROJECT_ID"

echo "📋 In the browser that just opened:"
echo ""
echo "   1. Click '+ CREATE CREDENTIALS' → 'OAuth client ID'"
echo "   2. If asked to configure consent screen:"
echo "      - App name: Next Hardware Email"
echo "      - Your email: guanliangsky@gmail.com"
echo "      - Click through (skip scopes/test users)"
echo "   3. Application type: 'Web application'"
echo "   4. Name: 'Next Hardware Email Client'"
echo "   5. Add redirect URIs:"
echo "      - http://localhost:3000/api/auth/gmail/callback"
echo "      - https://nexthardware.io/api/auth/gmail/callback"
echo "   6. Click 'CREATE'"
echo "   7. Copy the Client ID and Client Secret"
echo ""
read -p "Press Enter when you have copied Client ID and Client Secret..."

echo ""
echo "📋 Step 2: Save Credentials Locally"
echo "===================================="
echo ""

read -p "Paste your Client ID: " CLIENT_ID
read -p "Paste your Client Secret: " CLIENT_SECRET

# Save to .env.local
ENV_FILE=".env.local"
if [ ! -f "$ENV_FILE" ]; then
  touch "$ENV_FILE"
fi

# Add or update credentials
if grep -q "GMAIL_CLIENT_ID" "$ENV_FILE"; then
  sed -i '' "s|GMAIL_CLIENT_ID=.*|GMAIL_CLIENT_ID=$CLIENT_ID|" "$ENV_FILE"
else
  echo "GMAIL_CLIENT_ID=$CLIENT_ID" >> "$ENV_FILE"
fi

if grep -q "GMAIL_CLIENT_SECRET" "$ENV_FILE"; then
  sed -i '' "s|GMAIL_CLIENT_SECRET=.*|GMAIL_CLIENT_SECRET=$CLIENT_SECRET|" "$ENV_FILE"
else
  echo "GMAIL_CLIENT_SECRET=$CLIENT_SECRET" >> "$ENV_FILE"
fi

echo "✅ Credentials saved to .env.local"
echo ""

echo "📋 Step 3: Get Refresh Token (Automated)"
echo "=========================================="
echo ""
echo "Running helper script to get refresh token..."
echo ""

node get-gmail-refresh-token.js

echo ""
echo "✅ Setup complete!"
echo ""
echo "📋 Next: Add these to Vercel environment variables:"
echo "   - GMAIL_CLIENT_ID"
echo "   - GMAIL_CLIENT_SECRET"
echo "   - GMAIL_REFRESH_TOKEN"
echo "   - GMAIL_SENDER_EMAIL=guanliangsky@gmail.com"
echo ""

