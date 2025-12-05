#!/bin/bash

# Verify Auto-Deployment Setup
# Run this after completing the dashboard setup steps

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}╔══════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  Verifying Auto-Deployment Setup                       ║${NC}"
echo -e "${BLUE}╚══════════════════════════════════════════════════════════╝${NC}"
echo ""

# Check if GitHub is connected via Vercel CLI
echo -e "${BLUE}Checking GitHub connection...${NC}"
if vercel git connect https://github.com/guanliangsky/nexthardware.git 2>&1 | grep -q "Connected\|already connected"; then
    echo -e "${GREEN}✅ GitHub connected to Vercel!${NC}"
    CONNECTED=true
else
    # Try to check via project info
    PROJECT_INFO=$(vercel project ls 2>&1 | grep nexthardware)
    if echo "$PROJECT_INFO" | grep -q "nexthardware"; then
        echo -e "${YELLOW}⚠️  GitHub connection status unclear${NC}"
        echo -e "${BLUE}   Please check in Vercel dashboard:${NC}"
        echo -e "${BLUE}   → https://vercel.com/dashboard → nexthardware → Settings → Git${NC}"
        CONNECTED=false
    else
        echo -e "${RED}❌ Could not verify connection${NC}"
        CONNECTED=false
    fi
fi

echo ""
echo -e "${BLUE}📋 Manual Verification Steps:${NC}"
echo ""
echo -e "1. Go to: ${BLUE}https://vercel.com/dashboard${NC}"
echo -e "2. Click your ${BLUE}nexthardware${NC} project"
echo -e "3. Go to: ${BLUE}Settings → Git${NC}"
echo -e "4. Check if you see:"
echo -e "   ${GREEN}✅ 'Connected to GitHub'${NC}"
echo -e "   ${GREEN}✅ Repository: guanliangsky/nexthardware${NC}"
echo -e "   ${GREEN}✅ Branch: nexthardware${NC}"

echo ""
echo -e "${BLUE}🧪 Test Auto-Deployment:${NC}"
echo ""
echo -e "1. Make a small change to any file"
echo -e "2. Run: ${BLUE}./git-push.sh 'Test auto-deploy'${NC}"
echo -e "3. Check Vercel dashboard for automatic deployment"
echo -e "4. You should see a new deployment appear automatically!"

echo ""
if [ "$CONNECTED" = true ]; then
    echo -e "${GREEN}✅ Setup appears complete!${NC}"
    echo -e "${BLUE}Try pushing a change to test auto-deployment.${NC}"
else
    echo -e "${YELLOW}⚠️  Please complete the dashboard setup steps first.${NC}"
    echo -e "${BLUE}See AUTO_DEPLOY_SETUP.md for detailed instructions.${NC}"
fi

echo ""

