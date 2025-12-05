#!/bin/bash
# Test Resend API directly

RESEND_API_KEY="re_J6mS3xKf_8BHLHJvYt7XzoJbGD2SYVMRT"
CONTACT_EMAIL="hello@nexthardware.io"

echo "Testing Resend API directly..."
echo ""

curl -X POST "https://api.resend.com/emails" \
  -H "Authorization: Bearer $RESEND_API_KEY" \
  -H "Content-Type: application/json" \
  -d "{
    \"from\": \"Next Hardware <noreply@nexthardware.io>\",
    \"to\": \"$CONTACT_EMAIL\",
    \"subject\": \"Direct Resend Test - $(date +%Y-%m-%d\ %H:%M:%S)\",
    \"html\": \"<h2>Direct Resend Test</h2><p>This is a direct test of the Resend API.</p><p>If you receive this, Resend is working!</p>\",
    \"text\": \"Direct Resend Test - This is a direct test of the Resend API.\"
  }" | jq . 2>/dev/null || echo "Error or no jq installed"
