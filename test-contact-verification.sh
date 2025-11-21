#!/bin/bash

echo "╔══════════════════════════════════════════════════════════╗"
echo "║  📧 CONTACT FORM VERIFICATION TEST                       ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Generate unique test email
TIMESTAMP=$(date +%s)
TEST_EMAIL="test.contact.$TIMESTAMP@example.com"
TEST_NAME="Test User $(date +%H:%M:%S)"

echo -e "${BLUE}1. Sending test contact form submission...${NC}"
echo -e "   Name: $TEST_NAME"
echo -e "   Email: $TEST_EMAIL"
echo ""

RESPONSE=$(curl -s -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d "{
    \"name\": \"$TEST_NAME\",
    \"email\": \"$TEST_EMAIL\",
    \"subject\": \"Contact Form Test - $(date)\",
    \"message\": \"This is an automated test to verify the contact form is working correctly. Timestamp: $(date)\"
  }")

echo -e "${BLUE}API Response:${NC}"
echo "$RESPONSE" | jq . 2>/dev/null || echo "$RESPONSE"
echo ""

if echo "$RESPONSE" | grep -q "success\|Successfully\|sent"; then
    echo -e "${GREEN}✅ Contact form submission successful!${NC}"
    echo ""
    echo -e "${BLUE}2. Next steps to verify:${NC}"
    echo -e "   ${YELLOW}a) Check Supabase database:${NC}"
    echo -e "      - Go to Supabase Dashboard"
    echo -e "      - Table: contact_messages"
    echo -e "      - Look for email: $TEST_EMAIL"
    echo ""
    echo -e "   ${YELLOW}b) Check Resend dashboard:${NC}"
    echo -e "      - Go to https://resend.com/emails"
    echo -e "      - Look for email to: hello@nexthardware.io"
    echo -e "      - Subject: Contact Form Test"
    echo ""
    echo -e "   ${YELLOW}c) Check your inbox:${NC}"
    echo -e "      - hello@nexthardware.io"
    echo -e "      - Should receive notification email"
    echo ""
else
    echo -e "${RED}❌ Contact form submission failed${NC}"
    echo -e "${YELLOW}Check the error message above${NC}"
fi

echo ""
echo -e "${BLUE}3. To check database via Supabase CLI:${NC}"
echo -e "   ${YELLOW}supabase db remote query \"SELECT * FROM contact_messages WHERE email = '$TEST_EMAIL' ORDER BY created_at DESC LIMIT 1;\"${NC}"

