#!/bin/bash

# Helper script to encode Gmail service account JSON for Vercel
# This creates a base64-encoded string that you can paste into Vercel environment variables

echo "🔐 Gmail Credentials Encoder for Vercel"
echo "========================================"
echo ""

# Check if credentials file exists
CREDENTIALS_FILE="credentials/gmail-service-account.json"

if [ ! -f "$CREDENTIALS_FILE" ]; then
    echo "❌ Error: $CREDENTIALS_FILE not found!"
    echo ""
    echo "Make sure you have:"
    echo "  1. Downloaded the JSON file from Google Cloud Console"
    echo "  2. Placed it in: credentials/gmail-service-account.json"
    exit 1
fi

echo "✅ Found credentials file: $CREDENTIALS_FILE"
echo ""
echo "📋 Encoding to base64..."
echo ""

# Encode the file
ENCODED=$(cat "$CREDENTIALS_FILE" | base64)

echo "✅ Encoded successfully!"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📋 Copy the text below and paste it into Vercel:"
echo ""
echo "   Environment Variable Name: GMAIL_SERVICE_ACCOUNT_JSON_BASE64"
echo "   Value: (paste the encoded string below)"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "$ENCODED"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📝 Steps to add to Vercel:"
echo "  1. Go to: https://vercel.com/dashboard"
echo "  2. Select your project: nexthardware"
echo "  3. Go to: Settings → Environment Variables"
echo "  4. Click: Add New"
echo "  5. Name: GMAIL_SERVICE_ACCOUNT_JSON_BASE64"
echo "  6. Value: (paste the encoded string above)"
echo "  7. Environments: Select all (Production, Preview, Development)"
echo "  8. Click: Save"
echo ""
echo "✅ Done! After adding, Vercel will auto-redeploy."
echo ""

