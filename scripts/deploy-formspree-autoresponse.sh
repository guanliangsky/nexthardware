#!/bin/bash

# Formspree Auto Response Deployment Script
# This script deploys the autoresponse configuration to Formspree

set -e

echo "🚀 Formspree Auto Response Deployment"
echo "======================================"
echo ""

# Check if formspree CLI is installed
if ! command -v formspree &> /dev/null; then
    echo "❌ Formspree CLI not found. Installing..."
    npm install -g @formspree/cli
fi

# Check if formspree.json exists
if [ ! -f "formspree.json" ]; then
    echo "❌ formspree.json not found!"
    exit 1
fi

echo "📄 Configuration file ready:"
cat formspree.json | jq '.' 2>/dev/null || cat formspree.json
echo ""

# Check for deploy key
if [ -z "$FORMSPREE_DEPLOY_KEY" ]; then
    echo "⚠️  FORMSPREE_DEPLOY_KEY not set"
    echo ""
    echo "📋 To get your deploy key:"
    echo "   1. Go to https://formspree.io/forms"
    echo "   2. Click on your form (xankagkj)"
    echo "   3. Go to 'Settings' tab"
    echo "   4. Copy the 'Deploy Key'"
    echo ""
    echo "Then run:"
    echo "   export FORMSPREE_DEPLOY_KEY='your-deploy-key-here'"
    echo "   ./scripts/deploy-formspree-autoresponse.sh"
    echo ""
    echo "Or use inline:"
    echo "   formspree deploy -k <your-deploy-key>"
    echo ""
    exit 1
fi

echo "✅ Deploy key found"
echo ""
echo "🚀 Deploying configuration..."
formspree deploy

echo ""
echo "✅ Auto Response configured!"
echo ""
echo "📧 Test it:"
echo "   1. Register a new member at /register"
echo "   2. Check the member's email inbox"
echo "   3. Should receive welcome email with Discord link"
echo ""


