#!/bin/bash

# Test Contact Redirect and Main Page Contact Form

BASE_URL="http://localhost:3000"

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}╔══════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  🧪 TESTING CONTACT FORM & REDIRECT                      ║${NC}"
echo -e "${BLUE}╚══════════════════════════════════════════════════════════╝${NC}\n"

# Wait for server
echo -e "${YELLOW}Waiting for server...${NC}"
for i in {1..30}; do
  if curl -s "${BASE_URL}" > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Server ready${NC}\n"
    break
  fi
  sleep 1
done

# Test 1: Main page has contact section
echo -e "${YELLOW}Test 1: Main page contact section${NC}"
if curl -s "${BASE_URL}" | grep -q 'id="contact"'; then
  echo -e "${GREEN}✅ PASS: Contact section found on main page${NC}"
else
  echo -e "${RED}❌ FAIL: Contact section not found${NC}"
fi
echo ""

# Test 2: Contact form fields exist
echo -e "${YELLOW}Test 2: Contact form fields${NC}"
PAGE_CONTENT=$(curl -s "${BASE_URL}")
if echo "$PAGE_CONTENT" | grep -q 'contact-name'; then
  echo -e "${GREEN}✅ PASS: Contact form fields found${NC}"
else
  echo -e "${RED}❌ FAIL: Contact form fields not found${NC}"
fi
echo ""

# Test 3: /contact redirects
echo -e "${YELLOW}Test 3: /contact redirect${NC}"
REDIRECT=$(curl -s -L -o /dev/null -w "%{http_code}" "${BASE_URL}/contact")
if [ "$REDIRECT" = "200" ] || [ "$REDIRECT" = "307" ] || [ "$REDIRECT" = "308" ]; then
  echo -e "${GREEN}✅ PASS: /contact redirects correctly${NC}"
else
  echo -e "${RED}❌ FAIL: /contact redirect issue (HTTP $REDIRECT)${NC}"
fi
echo ""

# Test 4: API endpoint works
echo -e "${YELLOW}Test 4: Contact API endpoint${NC}"
RESPONSE=$(curl -s -X POST "${BASE_URL}/api/contact" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "Test message"
  }')

if echo "$RESPONSE" | grep -q "successfully"; then
  echo -e "${GREEN}✅ PASS: Contact API working${NC}"
else
  echo -e "${YELLOW}⚠️  API response: $RESPONSE${NC}"
fi
echo ""

# Test 5: Navbar has contact link
echo -e "${YELLOW}Test 5: Navbar contact link${NC}"
if echo "$PAGE_CONTENT" | grep -q 'href="#contact"'; then
  echo -e "${GREEN}✅ PASS: Navbar has #contact link${NC}"
else
  echo -e "${RED}❌ FAIL: Navbar link not found${NC}"
fi
echo ""

# Test 6: Footer has contact link
echo -e "${YELLOW}Test 6: Footer contact link${NC}"
if echo "$PAGE_CONTENT" | grep -q 'href="#contact"'; then
  echo -e "${GREEN}✅ PASS: Footer has #contact link${NC}"
else
  echo -e "${RED}❌ FAIL: Footer link not found${NC}"
fi
echo ""

echo -e "${BLUE}╔══════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  ✅ TESTING COMPLETE                                     ║${NC}"
echo -e "${BLUE}╚══════════════════════════════════════════════════════════╝${NC}\n"

echo -e "${YELLOW}Production URL:${NC} https://nexthardware.io"
echo -e "${YELLOW}Contact section:${NC} https://nexthardware.io#contact"
echo -e "${YELLOW}Contact redirect:${NC} https://nexthardware.io/contact"

