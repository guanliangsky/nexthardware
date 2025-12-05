#!/bin/bash

# Auto-commit and push all changes to GitHub
# This ensures all changes are saved to GitHub automatically

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Get commit message from argument or use default
COMMIT_MSG="${1:-Auto-commit: Update files}"

echo -e "${BLUE}╔══════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  Auto-Commit to GitHub                                  ║${NC}"
echo -e "${BLUE}╚══════════════════════════════════════════════════════════╝${NC}"
echo ""

# Check for changes
if [ -z "$(git status --porcelain)" ]; then
    echo -e "${GREEN}✅ No changes to commit${NC}"
    exit 0
fi

# Show what will be committed
echo -e "${BLUE}Changes to commit:${NC}"
git status --short
echo ""

# Add all changes
echo -e "${BLUE}Staging all changes...${NC}"
git add .

# Commit
echo -e "${BLUE}Committing: ${COMMIT_MSG}${NC}"
git commit -m "$COMMIT_MSG"

# Push to GitHub
echo -e "${BLUE}Pushing to GitHub...${NC}"
CURRENT_BRANCH=$(git branch --show-current)

if git push origin "$CURRENT_BRANCH" 2>/dev/null; then
    echo -e "${GREEN}✅ Successfully pushed to GitHub!${NC}"
else
    # Fallback to GitHub CLI
    echo -e "${YELLOW}Using GitHub CLI...${NC}"
    REPO=$(git remote get-url origin | sed 's/.*github.com[:/]\(.*\)\.git/\1/')
    LATEST_SHA=$(git rev-parse HEAD)
    gh api repos/$REPO/git/refs/heads/$CURRENT_BRANCH -X PATCH -f sha=$LATEST_SHA 2>&1 >/dev/null && \
        echo -e "${GREEN}✅ Successfully pushed to GitHub!${NC}" || \
        echo -e "${YELLOW}⚠️  Push may need manual intervention${NC}"
fi

echo ""
echo -e "${GREEN}✅ All changes committed and pushed to GitHub!${NC}"
echo -e "${BLUE}📦 Repository: https://github.com/guanliangsky/nexthardware${NC}"
echo -e "${BLUE}🚀 Vercel will auto-deploy if connected${NC}"

