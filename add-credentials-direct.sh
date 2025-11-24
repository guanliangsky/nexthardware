#!/bin/bash

# Add credentials directly (non-interactive)
# Usage: ./add-credentials-direct.sh CLIENT_ID CLIENT_SECRET

if [ $# -lt 2 ]; then
  echo "Usage: ./add-credentials-direct.sh CLIENT_ID CLIENT_SECRET"
  echo ""
  echo "Or provide them as environment variables:"
  echo "  CLIENT_ID=xxx CLIENT_SECRET=yyy ./add-credentials-direct.sh"
  exit 1
fi

CLIENT_ID="$1"
CLIENT_SECRET="$2"

# Or use environment variables if provided
if [ -z "$CLIENT_ID" ] && [ -n "$CLIENT_ID_ENV" ]; then
  CLIENT_ID="$CLIENT_ID_ENV"
fi
if [ -z "$CLIENT_SECRET" ] && [ -n "$CLIENT_SECRET_ENV" ]; then
  CLIENT_SECRET="$CLIENT_SECRET_ENV"
fi

if [ -z "$CLIENT_ID" ] || [ -z "$CLIENT_SECRET" ]; then
  echo "❌ Both Client ID and Client Secret are required"
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

echo "✅ Credentials saved to .env.local"
echo ""
echo "📋 Getting refresh token now..."
echo ""

node get-gmail-refresh-token.js


