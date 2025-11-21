#!/bin/bash
echo "Testing contact API endpoint..."
echo ""
echo "Sending test request..."
RESPONSE=$(curl -s -X POST https://nexthardware.io/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"API Test","email":"test@example.com","subject":"API Debug","message":"Testing if API sends email"}')

echo "Response: $RESPONSE"
echo ""
echo "Check Vercel logs for email sending status..."
