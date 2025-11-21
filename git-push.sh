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

# Push to current branch
echo -e "\n${BLUE}Pushing to origin/${CURRENT_BRANCH}...${NC}"
git push origin "$CURRENT_BRANCH"

echo -e "\n${GREEN}✅ Successfully pushed to GitHub!${NC}"
echo -e "${BLUE}Your changes will auto-deploy to Vercel.${NC}"

