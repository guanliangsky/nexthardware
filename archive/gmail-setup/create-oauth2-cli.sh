#!/bin/bash

# Create OAuth2 Credentials via Google Cloud CLI
# This uses the Google Cloud REST API

set -e

PROJECT_ID="next-hardware-email"
CLIENT_NAME="Next Hardware Email Client"
REDIRECT_URIS=(
  "http://localhost:3000/api/auth/gmail/callback"
  "https://nexthardware.io/api/auth/gmail/callback"
)

echo "🔐 Creating OAuth2 Credentials via CLI"
echo "======================================="
echo ""
echo "Project: $PROJECT_ID"
echo "Client Name: $CLIENT_NAME"
echo ""

# Check if authenticated
if ! gcloud auth list --filter=status:ACTIVE --format="value(account)" | grep -q .; then
  echo "❌ Error: Not authenticated with gcloud"
  echo "   Run: gcloud auth login"
  exit 1
fi

# Get access token
echo "📋 Getting access token..."
ACCESS_TOKEN=$(gcloud auth print-access-token)

# Check if OAuth Consent Screen is configured
echo "📋 Checking OAuth Consent Screen..."
CONSENT_SCREEN=$(curl -s -H "Authorization: Bearer $ACCESS_TOKEN" \
  "https://iap.googleapis.com/v1/projects/$PROJECT_ID/iap_oauth_clients" \
  2>/dev/null || echo "")

# Note: Creating OAuth2 clients requires the OAuth Consent Screen to be configured first
# This is typically done via the web UI

echo ""
echo "⚠️  IMPORTANT: OAuth2 client creation via CLI requires:"
echo "   1. OAuth Consent Screen configured (usually done via web UI)"
echo "   2. Proper API permissions"
echo ""
echo "📋 The easiest way is actually via the web UI:"
echo ""
echo "   1. Go to: https://console.cloud.google.com/apis/credentials?project=$PROJECT_ID"
echo "   2. Click '+ CREATE CREDENTIALS' → 'OAuth client ID'"
echo "   3. If asked, configure consent screen first"
echo "   4. Fill in the details"
echo "   5. Copy Client ID and Client Secret"
echo ""
echo "💡 Then we can automate getting the refresh token via CLI!"
echo ""
echo "Would you like to:"
echo "  A) Use web UI (recommended - 2 minutes)"
echo "  B) Try CLI method (more complex, requires consent screen setup)"
echo ""
read -p "Choose (A/B): " choice

if [[ "$choice" == "A" || "$choice" == "a" ]]; then
  echo ""
  echo "✅ Opening Google Cloud Console..."
  open "https://console.cloud.google.com/apis/credentials?project=$PROJECT_ID"
  echo ""
  echo "📋 After creating OAuth2 credentials:"
  echo "   1. Copy the Client ID"
  echo "   2. Copy the Client Secret"
  echo "   3. Come back here and we'll get the refresh token via CLI!"
  echo ""
elif [[ "$choice" == "B" || "$choice" == "b" ]]; then
  echo ""
  echo "📋 Attempting to create OAuth2 client via API..."
  echo "   (This requires OAuth Consent Screen to be configured first)"
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
  
  # Create OAuth2 client via REST API
  RESPONSE=$(curl -s -X POST \
    -H "Authorization: Bearer $ACCESS_TOKEN" \
    -H "Content-Type: application/json" \
    -d "{
      \"name\": \"$CLIENT_NAME\",
      \"type\": \"WEB_APPLICATION\",
      \"redirectUris\": $REDIRECT_URIS_JSON
    }" \
    "https://iamcredentials.googleapis.com/v1/projects/$PROJECT_ID/oauthClients" 2>&1)
  
  if echo "$RESPONSE" | grep -q "clientId"; then
    echo "✅ OAuth2 client created successfully!"
    echo "$RESPONSE" | jq '.' 2>/dev/null || echo "$RESPONSE"
  else
    echo "❌ Error creating OAuth2 client:"
    echo "$RESPONSE"
    echo ""
    echo "💡 This usually means:"
    echo "   1. OAuth Consent Screen not configured (do this via web UI first)"
    echo "   2. Missing API permissions"
    echo ""
    echo "   Recommendation: Use Option A (web UI) instead"
  fi
fi

