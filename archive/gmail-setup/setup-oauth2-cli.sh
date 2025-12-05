#!/bin/bash

# Complete OAuth2 Setup via CLI
# This script automates the entire OAuth2 setup process

set -e

PROJECT_ID="next-hardware-email"
CLIENT_NAME="Next Hardware Email Client"
APP_NAME="Next Hardware Email"
USER_EMAIL="guanliangsky@gmail.com"

REDIRECT_URIS=(
  "http://localhost:3000/api/auth/gmail/callback"
  "https://nexthardware.io/api/auth/gmail/callback"
)

echo "🔐 Gmail OAuth2 Setup via CLI"
echo "=============================="
echo ""
echo "Project: $PROJECT_ID"
echo ""

# Check authentication
if ! gcloud auth list --filter=status:ACTIVE --format="value(account)" | grep -q .; then
  echo "❌ Not authenticated. Logging in..."
  gcloud auth login
fi

# Set project
echo "📋 Setting project..."
gcloud config set project $PROJECT_ID >/dev/null 2>&1

# Enable required APIs
echo "📋 Enabling required APIs..."
gcloud services enable iam.googleapis.com --project=$PROJECT_ID >/dev/null 2>&1 || true
gcloud services enable cloudresourcemanager.googleapis.com --project=$PROJECT_ID >/dev/null 2>&1 || true
gcloud services enable gmail.googleapis.com --project=$PROJECT_ID >/dev/null 2>&1 || true

# Get access token
echo "📋 Getting access token..."
ACCESS_TOKEN=$(gcloud auth print-access-token)

# Check if OAuth consent screen exists
echo "📋 Checking OAuth Consent Screen..."
CONSENT_SCREEN=$(curl -s -H "Authorization: Bearer $ACCESS_TOKEN" \
  "https://iap.googleapis.com/v1/projects/$PROJECT_ID/oauthClients" 2>/dev/null || echo "")

# Create OAuth Consent Screen if needed
echo "📋 Configuring OAuth Consent Screen..."
# Note: This is complex via API, so we'll guide user or use a workaround

# Get project number
PROJECT_NUMBER=$(gcloud projects describe $PROJECT_ID --format="value(projectNumber)")

echo ""
echo "📋 Step 1: OAuth Consent Screen"
echo "================================"
echo ""
echo "⚠️  OAuth Consent Screen needs to be configured first."
echo "   This is a one-time setup."
echo ""
echo "Opening Google Cloud Console..."
open "https://console.cloud.google.com/apis/credentials/consent?project=$PROJECT_ID"

echo ""
echo "📋 In the browser:"
echo "   1. Choose 'External' → Click 'CREATE'"
echo "   2. Fill in:"
echo "      - App name: $APP_NAME"
echo "      - User support email: $USER_EMAIL"
echo "      - Developer contact: $USER_EMAIL"
echo "   3. Click 'SAVE AND CONTINUE' (skip scopes)"
echo "   4. Click 'SAVE AND CONTINUE' (skip test users)"
echo "   5. Click 'BACK TO DASHBOARD'"
echo ""
read -p "Press Enter when OAuth Consent Screen is configured..."

# Create OAuth2 Client via API
echo ""
echo "📋 Step 2: Creating OAuth2 Client"
echo "==================================="
echo ""

# Build redirect URIs JSON
REDIRECT_URIS_JSON="["
for i in "${!REDIRECT_URIS[@]}"; do
  if [ $i -gt 0 ]; then
    REDIRECT_URIS_JSON+=","
  fi
  REDIRECT_URIS_JSON+="\"${REDIRECT_URIS[$i]}\""
done
REDIRECT_URIS_JSON+="]"

# Try to create OAuth2 client
echo "Attempting to create OAuth2 client via API..."
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"name\": \"$CLIENT_NAME\",
    \"type\": \"WEB_APPLICATION\",
    \"redirectUris\": $REDIRECT_URIS_JSON
  }" \
  "https://iamcredentials.googleapis.com/v1/projects/$PROJECT_ID/oauthClients" 2>&1)

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | sed '$d')

if [ "$HTTP_CODE" = "200" ] || echo "$BODY" | grep -q "clientId"; then
  CLIENT_ID=$(echo "$BODY" | grep -o '"clientId":"[^"]*"' | cut -d'"' -f4 || echo "")
  CLIENT_SECRET=$(echo "$BODY" | grep -o '"clientSecret":"[^"]*"' | cut -d'"' -f4 || echo "")
  
  if [ -n "$CLIENT_ID" ] && [ -n "$CLIENT_SECRET" ]; then
    echo "✅ OAuth2 client created successfully!"
    echo ""
    echo "Client ID: $CLIENT_ID"
    echo "Client Secret: $CLIENT_SECRET"
  else
    echo "⚠️  Client created but couldn't parse credentials"
    echo "Response: $BODY"
  fi
else
  echo "❌ Could not create via API (this is normal)"
  echo "   Error: $BODY"
  echo ""
  echo "📋 Creating via Web UI instead..."
  open "https://console.cloud.google.com/apis/credentials?project=$PROJECT_ID"
  
  echo ""
  echo "📋 In the browser:"
  echo "   1. Click '+ CREATE CREDENTIALS' → 'OAuth client ID'"
  echo "   2. Application type: 'Web application'"
  echo "   3. Name: '$CLIENT_NAME'"
  echo "   4. Add redirect URIs:"
  for uri in "${REDIRECT_URIS[@]}"; do
    echo "      - $uri"
  done
  echo "   5. Click 'CREATE'"
  echo "   6. Copy Client ID and Client Secret"
  echo ""
  read -p "Paste Client ID: " CLIENT_ID
  read -p "Paste Client Secret: " CLIENT_SECRET
fi

# Save to .env.local
echo ""
echo "📋 Step 3: Saving Credentials"
echo "==============================="
echo ""

ENV_FILE=".env.local"
if [ ! -f "$ENV_FILE" ]; then
  touch "$ENV_FILE"
fi

# Update or add credentials
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
echo "📋 Step 4: Getting Refresh Token"
echo "================================="
echo ""

node get-gmail-refresh-token.js

echo ""
echo "✅ Setup Complete!"
echo ""
echo "📋 Next Steps:"
echo "   1. Test locally: npm run dev"
echo "   2. Add to Vercel: GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, GMAIL_REFRESH_TOKEN"
echo ""

