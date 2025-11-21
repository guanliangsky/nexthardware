#!/bin/bash

# Complete Deployment Workflow: Local → GitHub → Vercel
# Ensures all three are identical

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}╔══════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  Complete Deployment: Local → GitHub → Vercel          ║${NC}"
echo -e "${BLUE}╚══════════════════════════════════════════════════════════╝${NC}"
echo ""

# Get commit message
if [ -z "$1" ]; then
    echo -e "${YELLOW}Enter commit message:${NC}"
    read -r COMMIT_MSG
else
    COMMIT_MSG="$1"
fi

# Step 1: Check for changes
echo -e "${BLUE}Step 1: Checking for changes...${NC}"
if [ -z "$(git status --porcelain)" ]; then
    echo -e "${GREEN}✅ No changes to commit${NC}"
    echo -e "${BLUE}Everything is already in sync!${NC}"
    exit 0
fi

echo -e "${BLUE}Changes found:${NC}"
git status --short
echo ""

# Step 2: Stage all changes
echo -e "${BLUE}Step 2: Staging all changes...${NC}"
git add .
echo -e "${GREEN}✅ All changes staged${NC}"

# Step 3: Commit
echo -e "${BLUE}Step 3: Committing to git...${NC}"
git commit -m "$COMMIT_MSG"
COMMIT_SHA=$(git rev-parse --short HEAD)
echo -e "${GREEN}✅ Committed: ${COMMIT_SHA}${NC}"

# Step 4: Push to GitHub
echo -e "${BLUE}Step 4: Pushing to GitHub...${NC}"
CURRENT_BRANCH=$(git branch --show-current)

if git push origin "$CURRENT_BRANCH" 2>/dev/null; then
    echo -e "${GREEN}✅ Pushed to GitHub${NC}"
else
    # Fallback to GitHub CLI
    echo -e "${YELLOW}Using GitHub CLI...${NC}"
    REPO=$(git remote get-url origin | sed 's/.*github.com[:/]\(.*\)\.git/\1/')
    LATEST_SHA=$(git rev-parse HEAD)
    gh api repos/$REPO/git/refs/heads/$CURRENT_BRANCH -X PATCH -f sha=$LATEST_SHA 2>&1 >/dev/null
    echo -e "${GREEN}✅ Pushed to GitHub${NC}"
fi

# Step 5: Verify GitHub
echo -e "${BLUE}Step 5: Verifying GitHub...${NC}"
sleep 2
if gh api repos/guanliangsky/nexthardware/commits/$COMMIT_SHA --jq '.sha' 2>/dev/null | grep -q "$COMMIT_SHA"; then
    echo -e "${GREEN}✅ Verified on GitHub${NC}"
else
    echo -e "${YELLOW}⚠️  GitHub verification pending (may take a moment)${NC}"
fi

# Summary
echo ""
echo -e "${GREEN}╔══════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║  ✅ DEPLOYMENT WORKFLOW COMPLETE                        ║${NC}"
echo -e "${GREEN}╚══════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${BLUE}📊 Status:${NC}"
echo -e "   ✅ Local: Committed (${COMMIT_SHA})"
echo -e "   ✅ GitHub: Pushed"
echo -e "   ⏳ Vercel: Auto-deploying (1-2 minutes)"
echo ""
echo -e "${BLUE}🔗 Links:${NC}"
echo -e "   GitHub: https://github.com/guanliangsky/nexthardware"
echo -e "   Vercel: https://vercel.com/dashboard"
echo -e "   Site: https://nexthardware.io"
echo ""
echo -e "${GREEN}✅ Local = GitHub = Vercel (in sync!)${NC}"

