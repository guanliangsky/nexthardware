#!/bin/bash

# Create OAuth2 Client via Google Cloud API
# This uses the Identity Platform API

set -e

PROJECT_ID="next-hardware-email"
CLIENT_NAME="Next Hardware Email Client"
REDIRECT_URI_1="http://localhost:3000/api/auth/gmail/callback"
REDIRECT_URI_2="https://nexthardware.io/api/auth/gmail/callback"

echo "🔐 Creating OAuth2 Client via API"
echo "=================================="
echo ""
echo "Project: $PROJECT_ID"
echo "Client Name: $CLIENT_NAME"
echo ""

# Check authentication
if ! gcloud auth list --filter=status:ACTIVE --format="value(account)" | grep -q .; then
  echo "❌ Not authenticated. Logging in..."
  gcloud auth login
fi

# Set project
echo "📋 Setting project..."
gcloud config set project $PROJECT_ID >/dev/null 2>&1 || {
  echo "⚠️  Could not set project. Continuing anyway..."
}

# Enable required APIs
echo "📋 Enabling required APIs..."
gcloud services enable identitytoolkit.googleapis.com --project=$PROJECT_ID >/dev/null 2>&1 || true
gcloud services enable iap.googleapis.com --project=$PROJECT_ID >/dev/null 2>&1 || true

# Get access token
echo "📋 Getting access token..."
ACCESS_TOKEN=$(gcloud auth print-access-token)

# Get project number (needed for some APIs)
PROJECT_NUMBER=$(gcloud projects describe $PROJECT_ID --format="value(projectNumber)" 2>/dev/null || echo "")

echo "📋 Attempting to create OAuth2 client..."
echo ""

# Try method 1: Identity Platform API
echo "Trying Identity Platform API..."
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"displayName\": \"$CLIENT_NAME\",
    \"type\": \"WEB\",
    \"allowedRedirectUris\": [
      \"$REDIRECT_URI_1\",
      \"$REDIRECT_URI_2\"
    ]
  }" \
  "https://identitytoolkit.googleapis.com/v2/projects/$PROJECT_ID/oauthClients" 2>&1)

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | sed '$d')

if [ "$HTTP_CODE" = "200" ]; then
  CLIENT_ID=$(echo "$BODY" | grep -o '"clientId":"[^"]*"' | cut -d'"' -f4 || echo "")
  CLIENT_SECRET=$(echo "$BODY" | grep -o '"clientSecret":"[^"]*"' | cut -d'"' -f4 || echo "")
  
  if [ -n "$CLIENT_ID" ]; then
    echo "✅ OAuth2 client created successfully!"
    echo ""
    echo "Client ID: $CLIENT_ID"
    if [ -n "$CLIENT_SECRET" ]; then
      echo "Client Secret: $CLIENT_SECRET"
    fi
    echo ""
    
    # Save to .env.local
    ENV_FILE=".env.local"
    if [ ! -f "$ENV_FILE" ]; then
      touch "$ENV_FILE"
    fi
    
    if grep -q "^GMAIL_CLIENT_ID=" "$ENV_FILE"; then
      sed -i '' "s|^GMAIL_CLIENT_ID=.*|GMAIL_CLIENT_ID=$CLIENT_ID|" "$ENV_FILE"
    else
      echo "GMAIL_CLIENT_ID=$CLIENT_ID" >> "$ENV_FILE"
    fi
    
    if [ -n "$CLIENT_SECRET" ]; then
      if grep -q "^GMAIL_CLIENT_SECRET=" "$ENV_FILE"; then
        sed -i '' "s|^GMAIL_CLIENT_SECRET=.*|GMAIL_CLIENT_SECRET=$CLIENT_SECRET|" "$ENV_FILE"
      else
        echo "GMAIL_CLIENT_SECRET=$CLIENT_SECRET" >> "$ENV_FILE"
      fi
    fi
    
    echo "✅ Credentials saved to .env.local"
    echo ""
    echo "📋 Next: Getting refresh token..."
    echo ""
    node get-gmail-refresh-token.js
    exit 0
  fi
fi

# If method 1 failed, try alternative approach
echo "⚠️  Method 1 failed. Trying alternative..."
echo "Response: $BODY"
echo ""

# Try using gcloud alpha commands if available
if gcloud alpha iap oauth-clients create --help >/dev/null 2>&1; then
  echo "Trying gcloud alpha command..."
  # This might work for some projects
  gcloud alpha iap oauth-clients create \
    --display-name="$CLIENT_NAME" \
    --redirect-uris="$REDIRECT_URI_1,$REDIRECT_URI_2" \
    --project=$PROJECT_ID 2>&1 || echo "gcloud alpha method also failed"
fi

echo ""
echo "❌ Could not create OAuth2 client via API"
echo ""
echo "💡 This is normal - OAuth2 client creation via API is complex"
echo "   and requires the OAuth consent screen to be configured first."
echo ""
echo "📋 Recommended: Use web UI (it's actually faster):"
echo "   1. Go to: https://console.cloud.google.com/apis/credentials?project=$PROJECT_ID"
echo "   2. Click '+ CREATE CREDENTIALS' → 'OAuth client ID'"
echo "   3. Follow the prompts"
echo ""
echo "   OR run: ./add-oauth-credentials.sh (after creating via web UI)"
echo ""

