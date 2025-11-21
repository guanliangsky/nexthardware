#!/bin/bash

# Comprehensive Function Testing Script
# Run this to test all functions systematically

echo "╔══════════════════════════════════════════════════════════╗"
echo "║  🧪 COMPREHENSIVE FUNCTION TESTING                        ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if dev server is running
echo -e "${BLUE}Checking if dev server is running...${NC}"
if curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Dev server is running${NC}"
else
    echo -e "${RED}❌ Dev server is not running${NC}"
    echo -e "${YELLOW}Please run: npm run dev${NC}"
    exit 1
fi

echo ""
echo -e "${BLUE}Testing API endpoints...${NC}"
echo ""

# Test Newsletter API
echo -e "${BLUE}1. Testing Newsletter API...${NC}"
NEWSLETTER_RESPONSE=$(curl -s -X POST http://localhost:3000/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}' 2>&1)

if echo "$NEWSLETTER_RESPONSE" | grep -q "success\|Successfully"; then
    echo -e "${GREEN}✅ Newsletter API working${NC}"
else
    echo -e "${RED}❌ Newsletter API issue${NC}"
    echo "Response: $NEWSLETTER_RESPONSE"
fi

# Test Contact API
echo -e "${BLUE}2. Testing Contact API...${NC}"
CONTACT_RESPONSE=$(curl -s -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","subject":"Test","message":"Test message"}' 2>&1)

if echo "$CONTACT_RESPONSE" | grep -q "success\|Successfully\|sent"; then
    echo -e "${GREEN}✅ Contact API working${NC}"
else
    echo -e "${YELLOW}⚠️  Contact API response: $CONTACT_RESPONSE${NC}"
fi

# Test Admin Auth (should fail without password)
echo -e "${BLUE}3. Testing Admin Auth (should fail without password)...${NC}"
AUTH_RESPONSE=$(curl -s -X POST http://localhost:3000/api/admin/auth \
  -H "Content-Type: application/json" \
  -d '{"password":"wrong"}' 2>&1)

if echo "$AUTH_RESPONSE" | grep -q "Incorrect\|Unauthorized\|error"; then
    echo -e "${GREEN}✅ Admin Auth protection working${NC}"
else
    echo -e "${YELLOW}⚠️  Admin Auth response: $AUTH_RESPONSE${NC}"
fi

echo ""
echo -e "${BLUE}Testing pages...${NC}"
echo ""

# Test main page
echo -e "${BLUE}4. Testing main page...${NC}"
MAIN_PAGE=$(curl -s http://localhost:3000 2>&1)

if echo "$MAIN_PAGE" | grep -q "Where AI Meets Atoms"; then
    echo -e "${GREEN}✅ Main page loads${NC}"
else
    echo -e "${RED}❌ Main page issue${NC}"
fi

# Test contact section
if echo "$MAIN_PAGE" | grep -q 'id="contact"'; then
    echo -e "${GREEN}✅ Contact section present${NC}"
else
    echo -e "${RED}❌ Contact section missing${NC}"
fi

# Test admin page (should show login)
echo -e "${BLUE}5. Testing admin page...${NC}"
ADMIN_PAGE=$(curl -s http://localhost:3000/admin/subscribers 2>&1)

if echo "$ADMIN_PAGE" | grep -q "Admin Access\|password"; then
    echo -e "${GREEN}✅ Admin page protected${NC}"
else
    echo -e "${YELLOW}⚠️  Admin page response: ${ADMIN_PAGE:0:100}...${NC}"
fi

echo ""
echo -e "${GREEN}╔══════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║  ✅ FUNCTION TESTING COMPLETE                              ║${NC}"
echo -e "${GREEN}╚══════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${BLUE}Next steps:${NC}"
echo "1. Manually test forms in browser"
echo "2. Test admin login"
echo "3. Check Supabase database"
echo "4. Test mobile responsiveness"
echo ""

