#!/bin/bash

# GitHub to Vercel Auto-Deployment Setup Script
# This script helps you verify and complete the setup

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔══════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  GitHub → Vercel Auto-Deployment Setup Check            ║${NC}"
echo -e "${BLUE}╚══════════════════════════════════════════════════════════╝${NC}"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: Not in project directory${NC}"
    exit 1
fi

echo -e "${BLUE}📋 Checking current setup...${NC}"
echo ""

# Check Git remote
GIT_REMOTE=$(git remote get-url origin 2>/dev/null || echo "")
if [ -n "$GIT_REMOTE" ]; then
    echo -e "${GREEN}✅ Git remote configured:${NC} $GIT_REMOTE"
else
    echo -e "${RED}❌ Git remote not configured${NC}"
fi

# Check Vercel project
if [ -f ".vercel/project.json" ]; then
    VERCEL_PROJECT=$(cat .vercel/project.json | grep -o '"projectName":"[^"]*"' | cut -d'"' -f4)
    echo -e "${GREEN}✅ Vercel project linked:${NC} $VERCEL_PROJECT"
else
    echo -e "${YELLOW}⚠️  Vercel project not linked locally${NC}"
fi

# Check environment variables
if [ -f ".env.local" ]; then
    if grep -q "NEXT_PUBLIC_SUPABASE_URL" .env.local && grep -q "SUPABASE_SERVICE_ROLE_KEY" .env.local; then
        echo -e "${GREEN}✅ Environment variables configured${NC}"
    else
        echo -e "${YELLOW}⚠️  Some environment variables missing${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  .env.local not found${NC}"
fi

echo ""
echo -e "${BLUE}╔══════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  Setup Status                                           ║${NC}"
echo -e "${BLUE}╚══════════════════════════════════════════════════════════╝${NC}"
echo ""

echo -e "${YELLOW}📝 TO COMPLETE AUTO-DEPLOYMENT SETUP:${NC}"
echo ""
echo -e "1. ${BLUE}Connect GitHub to Vercel Account (One-time):${NC}"
echo -e "   → Go to: https://vercel.com/account/integrations"
echo -e "   → Click 'Add' under GitHub"
echo -e "   → Authorize Vercel to access your GitHub"
echo ""
echo -e "2. ${BLUE}Connect Repository to Project:${NC}"
echo -e "   → Go to: https://vercel.com/dashboard"
echo -e "   → Click your 'nexthardware' project"
echo -e "   → Settings → Git → Connect Git Repository"
echo -e "   → Select: guanliangsky/nexthardware"
echo ""
echo -e "3. ${BLUE}Test Auto-Deployment:${NC}"
echo -e "   → Make a small change"
echo -e "   → Run: ./git-push.sh 'Test auto-deploy'"
echo -e "   → Check Vercel dashboard for automatic deployment"
echo ""

echo -e "${GREEN}✅ WHY THIS SETUP MAKES SENSE:${NC}"
echo ""
echo -e "  ✅ ${BLUE}Version Control:${NC} Every change saved with history"
echo -e "  ✅ ${BLUE}Automatic Backup:${NC} Code safely stored in GitHub"
echo -e "  ✅ ${BLUE}Auto-Deploy:${NC} Push to GitHub = Deploy to Vercel"
echo -e "  ✅ ${BLUE}Rollback:${NC} Can revert to any previous version"
echo -e "  ✅ ${BLUE}Preview Deployments:${NC} Test changes before production"
echo -e "  ✅ ${BLUE}Team Collaboration:${NC} Multiple people can work together"
echo ""

echo -e "${BLUE}📊 WORKFLOW AFTER SETUP:${NC}"
echo ""
echo -e "  Local Code → git push → GitHub → Vercel (automatic!)"
echo ""

# Try to check if GitHub is connected via CLI
echo -e "${BLUE}🔍 Attempting to connect via CLI...${NC}"
if vercel git connect https://github.com/guanliangsky/nexthardware.git 2>&1 | grep -q "Connected"; then
    echo -e "${GREEN}✅ Successfully connected via CLI!${NC}"
else
    echo -e "${YELLOW}⚠️  CLI connection requires GitHub OAuth setup first${NC}"
    echo -e "   ${BLUE}→ Complete steps 1-2 above, then run this script again${NC}"
fi

echo ""

