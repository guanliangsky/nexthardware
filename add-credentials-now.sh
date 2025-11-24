#!/bin/bash

echo "🔐 Add OAuth2 Credentials"
echo "========================="
echo ""
echo "Please paste your credentials from Google Cloud Console:"
echo ""

read -p "Client ID: " CLIENT_ID
read -p "Client Secret: " CLIENT_SECRET

if [ -z "$CLIENT_ID" ] || [ -z "$CLIENT_SECRET" ]; then
  echo "❌ Both are required!"
  exit 1
fi

# Save to .env.local
ENV_FILE=".env.local"
[ ! -f "$ENV_FILE" ] && touch "$ENV_FILE"

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
echo "✅ Credentials saved!"
echo ""
echo "📋 Getting refresh token now..."
echo ""

node get-gmail-refresh-token.js




