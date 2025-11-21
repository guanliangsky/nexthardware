#!/bin/bash
echo "Testing Resend API directly with current API key..."
echo ""
RESEND_KEY="re_J6mS3xKf_8BHLHJvYt7XzoJbGD2SYVMRT"
RESULT=$(curl -s -X POST "https://api.resend.com/emails" \
  -H "Authorization: Bearer $RESEND_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "from": "Next Hardware <onboarding@resend.dev>",
    "to": "guanliangsky@gmail.com",
    "subject": "Direct API Test - Root Cause",
    "text": "Testing if Resend API works directly"
  }')

echo "Response:"
echo "$RESULT" | jq . 2>/dev/null || echo "$RESULT"
