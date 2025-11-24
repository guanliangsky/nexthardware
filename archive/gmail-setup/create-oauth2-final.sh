#!/bin/bash

# Final attempt: Create OAuth2 client using Google Cloud Console API
# Note: This requires OAuth consent screen to be configured first

PROJECT_ID="next-hardware-email"
CLIENT_NAME="Next Hardware Email Client"

echo "🔐 Creating OAuth2 Client (Final Attempt)"
echo "=========================================="
echo ""

# Check if OAuth consent screen is configured
echo "📋 IMPORTANT: OAuth2 client creation via API requires:"
echo "   1. OAuth Consent Screen must be configured first"
echo "   2. This is typically done via web UI"
echo ""

# Try to check consent screen status
ACCESS_TOKEN=$(gcloud auth print-access-token 2>/dev/null)

if [ -z "$ACCESS_TOKEN" ]; then
  echo "❌ Not authenticated. Run: gcloud auth login"
  exit 1
fi

echo "📋 Checking OAuth Consent Screen status..."
CONSENT_CHECK=$(curl -s -H "Authorization: Bearer $ACCESS_TOKEN" \
  "https://oauth2.googleapis.com/v1/projects/$PROJECT_ID/oauthConsentScreen" 2>&1)

if echo "$CONSENT_CHECK" | grep -q "error\|404\|not found"; then
  echo "⚠️  OAuth Consent Screen not configured"
  echo ""
  echo "📋 You need to configure it first:"
  echo "   1. Go to: https://console.cloud.google.com/apis/credentials/consent?project=$PROJECT_ID"
  echo "   2. Choose 'External' → Fill in details → Save"
  echo ""
  echo "   OR let me open it for you..."
  read -p "Open consent screen page? (y/n): " open_consent
  
  if [ "$open_consent" = "y" ] || [ "$open_consent" = "Y" ]; then
    open "https://console.cloud.google.com/apis/credentials/consent?project=$PROJECT_ID"
    echo ""
    echo "📋 After configuring consent screen, come back and we'll create the OAuth2 client"
  fi
  exit 0
fi

echo "✅ OAuth Consent Screen appears to be configured"
echo ""

# Unfortunately, Google doesn't provide a public REST API for creating OAuth2 clients
# The web UI is the standard way
echo "❌ Unfortunately, Google Cloud doesn't provide a public REST API"
echo "   for creating OAuth2 clients. The web UI is the standard method."
echo ""
echo "💡 However, I can help automate the rest:"
echo "   1. You create OAuth2 client via web UI (2 minutes)"
echo "   2. I'll automatically get the refresh token via CLI"
echo ""
echo "📋 Let's do it the hybrid way:"
echo ""

# Open the credentials page
open "https://console.cloud.google.com/apis/credentials?project=$PROJECT_ID"

echo "📋 In the browser:"
echo "   1. Click '+ CREATE CREDENTIALS' → 'OAuth client ID'"
echo "   2. Application type: 'Web application'"
echo "   3. Name: '$CLIENT_NAME'"
echo "   4. Add redirect URIs:"
echo "      - http://localhost:3000/api/auth/gmail/callback"
echo "      - https://nexthardware.io/api/auth/gmail/callback"
echo "   5. Click 'CREATE'"
echo "   6. Copy Client ID and Client Secret"
echo ""
read -p "Press Enter when you have Client ID and Secret..."

echo ""
echo "📋 Adding credentials..."
./add-oauth-credentials.sh

