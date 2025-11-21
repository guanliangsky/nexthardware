#!/bin/bash

# Contact Form Test Script
# Tests the contact form API with Supabase integration

set -e

BASE_URL="http://localhost:3000"
API_URL="${BASE_URL}/api/contact"

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔══════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  🧪 CONTACT FORM API TESTING                              ║${NC}"
echo -e "${BLUE}╚══════════════════════════════════════════════════════════╝${NC}\n"

# Test 1: Valid submission
echo -e "${YELLOW}Test 1: Valid contact form submission${NC}"
RESPONSE=$(curl -s -X POST "${API_URL}" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Subject",
    "message": "This is a test message from the test engineer."
  }')

if echo "$RESPONSE" | grep -q "successfully"; then
  echo -e "${GREEN}✅ PASS: Valid submission successful${NC}"
  echo "   Response: $RESPONSE"
else
  echo -e "${RED}❌ FAIL: Valid submission failed${NC}"
  echo "   Response: $RESPONSE"
fi
echo ""

# Test 2: Missing required fields
echo -e "${YELLOW}Test 2: Missing required field (name)${NC}"
RESPONSE=$(curl -s -X POST "${API_URL}" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "message": "Test message"
  }')

if echo "$RESPONSE" | grep -q "required"; then
  echo -e "${GREEN}✅ PASS: Correctly rejected missing name${NC}"
else
  echo -e "${RED}❌ FAIL: Should reject missing name${NC}"
  echo "   Response: $RESPONSE"
fi
echo ""

# Test 3: Invalid email format
echo -e "${YELLOW}Test 3: Invalid email format${NC}"
RESPONSE=$(curl -s -X POST "${API_URL}" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "invalid-email",
    "message": "Test message"
  }')

if echo "$RESPONSE" | grep -q "Invalid email"; then
  echo -e "${GREEN}✅ PASS: Correctly rejected invalid email${NC}"
else
  echo -e "${RED}❌ FAIL: Should reject invalid email${NC}"
  echo "   Response: $RESPONSE"
fi
echo ""

# Test 4: Missing message
echo -e "${YELLOW}Test 4: Missing required field (message)${NC}"
RESPONSE=$(curl -s -X POST "${API_URL}" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com"
  }')

if echo "$RESPONSE" | grep -q "required"; then
  echo -e "${GREEN}✅ PASS: Correctly rejected missing message${NC}"
else
  echo -e "${RED}❌ FAIL: Should reject missing message${NC}"
  echo "   Response: $RESPONSE"
fi
echo ""

# Test 5: Empty subject (should work - subject is optional)
echo -e "${YELLOW}Test 5: Optional subject field${NC}"
RESPONSE=$(curl -s -X POST "${API_URL}" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test2@example.com",
    "message": "Test message without subject"
  }')

if echo "$RESPONSE" | grep -q "successfully"; then
  echo -e "${GREEN}✅ PASS: Optional subject works correctly${NC}"
else
  echo -e "${RED}❌ FAIL: Should accept message without subject${NC}"
  echo "   Response: $RESPONSE"
fi
echo ""

echo -e "${BLUE}╔══════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  ✅ API TESTS COMPLETE                                    ║${NC}"
echo -e "${BLUE}╚══════════════════════════════════════════════════════════╝${NC}\n"

echo -e "${YELLOW}Next: Check Supabase database for stored messages...${NC}"

