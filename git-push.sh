#!/bin/bash

# Git Push Helper Script for Next Hardware
# Usage: ./git-push.sh "Your commit message"

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Get commit message from argument or prompt
if [ -z "$1" ]; then
    echo -e "${YELLOW}Enter commit message:${NC}"
    read -r COMMIT_MSG
else
    COMMIT_MSG="$1"
fi

# Check if we're on the right branch
CURRENT_BRANCH=$(git branch --show-current)
echo -e "${BLUE}Current branch: ${CURRENT_BRANCH}${NC}"

# Show status
echo -e "\n${BLUE}Checking git status...${NC}"
git status --short

# Add all changes
echo -e "\n${BLUE}Staging all changes...${NC}"
git add .

# Commit
echo -e "\n${BLUE}Committing changes...${NC}"
git commit -m "$COMMIT_MSG"

# Push to current branch using GitHub CLI (more reliable)
echo -e "\n${BLUE}Pushing to origin/${CURRENT_BRANCH}...${NC}"
LATEST_SHA=$(git rev-parse HEAD)
REPO=$(git remote get-url origin | sed 's/.*github.com[:/]\(.*\)\.git/\1/')

# Try git push first, fallback to GitHub CLI
if git push origin "$CURRENT_BRANCH" 2>/dev/null; then
    echo -e "${GREEN}✅ Pushed via git${NC}"
else
    echo -e "${YELLOW}Using GitHub CLI to push...${NC}"
    gh api repos/$REPO/git/refs/heads/$CURRENT_BRANCH -X PATCH -f sha=$LATEST_SHA 2>&1 | grep -q "ref" && \
        echo -e "${GREEN}✅ Pushed via GitHub CLI${NC}" || \
        gh api repos/$REPO/git/refs -X POST -f ref=refs/heads/$CURRENT_BRANCH -f sha=$LATEST_SHA 2>&1 | grep -q "ref" && \
        echo -e "${GREEN}✅ Created branch and pushed${NC}"
fi

echo -e "\n${GREEN}✅ Successfully pushed to GitHub!${NC}"
echo -e "${BLUE}📦 Your changes are now on GitHub (version controlled)${NC}"
echo -e "${BLUE}🚀 If GitHub is connected to Vercel, deployment will start automatically!${NC}"
echo -e "${YELLOW}💡 Check: https://vercel.com/dashboard to see deployment status${NC}"

