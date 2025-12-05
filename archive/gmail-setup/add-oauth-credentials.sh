#!/bin/bash

# Helper script to add OAuth2 credentials

echo "🔐 Add OAuth2 Credentials"
echo "========================="
echo ""

ENV_FILE=".env.local"

if [ ! -f "$ENV_FILE" ]; then
  touch "$ENV_FILE"
fi

echo "📋 Please paste your OAuth2 credentials from Google Cloud Console:"
echo ""

read -p "Client ID: " CLIENT_ID
read -p "Client Secret: " CLIENT_SECRET

# Validate
if [ -z "$CLIENT_ID" ] || [ -z "$CLIENT_SECRET" ]; then
  echo "❌ Error: Both Client ID and Client Secret are required"
  exit 1
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

echo ""
echo "✅ Credentials saved to .env.local"
echo ""
echo "📋 Next: Getting refresh token..."
echo ""

node get-gmail-refresh-token.js

