#!/bin/bash

# Test Gmail API contact form
echo "🧪 Testing Gmail API Contact Form..."
echo ""

# Test contact form API
curl -X POST https://nexthardware.io/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Gmail API Test",
    "message": "This is a test message to verify Gmail API is working."
  }' \
  -w "\n\nHTTP Status: %{http_code}\n" \
  -s | jq . 2>/dev/null || cat

echo ""
echo "✅ Test complete! Check your email and Vercel logs."

