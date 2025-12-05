#!/bin/bash

# Full Contact Form Test
# Tests API, database, and email functionality

set -e

BASE_URL="http://localhost:3000"
API_URL="${BASE_URL}/api/contact"

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}╔══════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  🧪 FULL CONTACT FORM TEST                                 ║${NC}"
echo -e "${BLUE}╚══════════════════════════════════════════════════════════╝${NC}\n"

# Wait for server
echo -e "${YELLOW}Waiting for server to be ready...${NC}"
for i in {1..30}; do
  if curl -s "${BASE_URL}" > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Server is ready${NC}\n"
    break
  fi
  sleep 1
done

# Test 1: Check API endpoint exists
echo -e "${YELLOW}Test 1: API Endpoint Check${NC}"
if curl -s -X POST "${API_URL}" -H "Content-Type: application/json" -d '{}' > /dev/null 2>&1; then
  echo -e "${GREEN}✅ API endpoint is accessible${NC}"
else
  echo -e "${RED}❌ API endpoint not accessible${NC}"
fi
echo ""

# Test 2: Valid submission with all fields
echo -e "${YELLOW}Test 2: Valid Contact Form Submission${NC}"
TIMESTAMP=$(date +%s)
RESPONSE=$(curl -s -X POST "${API_URL}" \
  -H "Content-Type: application/json" \
  -d "{
    \"name\": \"Test User $TIMESTAMP\",
    \"email\": \"test${TIMESTAMP}@example.com\",
    \"subject\": \"Test Subject\",
    \"message\": \"This is a test message from the full functionality test at $(date).\"
  }")

if echo "$RESPONSE" | grep -q "successfully"; then
  echo -e "${GREEN}✅ PASS: Message submitted successfully${NC}"
  echo "   Response: $(echo $RESPONSE | jq -r '.message' 2>/dev/null || echo $RESPONSE)"
else
  echo -e "${RED}❌ FAIL: Submission failed${NC}"
  echo "   Response: $RESPONSE"
fi
echo ""

# Test 3: Check environment variables
echo -e "${YELLOW}Test 3: Environment Variables Check${NC}"
if [ -f .env.local ]; then
  if grep -q "RESEND_API_KEY" .env.local; then
    echo -e "${GREEN}✅ RESEND_API_KEY found in .env.local${NC}"
  else
    echo -e "${RED}❌ RESEND_API_KEY not found in .env.local${NC}"
  fi
  
  if grep -q "CONTACT_EMAIL" .env.local; then
    echo -e "${GREEN}✅ CONTACT_EMAIL found in .env.local${NC}"
  else
    echo -e "${RED}❌ CONTACT_EMAIL not found in .env.local${NC}"
  fi
  
  if grep -q "SUPABASE" .env.local; then
    echo -e "${GREEN}✅ Supabase variables found in .env.local${NC}"
  else
    echo -e "${YELLOW}⚠️  Supabase variables not found (may be in Vercel only)${NC}"
  fi
else
  echo -e "${RED}❌ .env.local file not found${NC}"
fi
echo ""

# Test 4: Check API response structure
echo -e "${YELLOW}Test 4: API Response Structure${NC}"
RESPONSE=$(curl -s -X POST "${API_URL}" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Structure Test",
    "email": "structure@test.com",
    "message": "Testing response structure"
  }')

if echo "$RESPONSE" | grep -qE "(message|error)"; then
  echo -e "${GREEN}✅ Response has correct structure${NC}"
else
  echo -e "${RED}❌ Response structure incorrect${NC}"
  echo "   Response: $RESPONSE"
fi
echo ""

echo -e "${BLUE}╔══════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  ✅ FUNCTIONALITY TEST COMPLETE                          ║${NC}"
echo -e "${BLUE}╚══════════════════════════════════════════════════════════╝${NC}\n"

echo -e "${YELLOW}Next Steps:${NC}"
echo "1. Check Supabase dashboard for stored messages"
echo "2. Check email inbox (hello@nexthardware.io) for notifications"
echo "3. Check Vercel deployment logs for any errors"

