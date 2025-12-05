#!/bin/bash

# Formspree Auto Response Setup Script
# This script helps configure Formspree autoresponse via CLI

set -e

echo "🚀 Formspree Auto Response Setup"
echo "================================"
echo ""

# Check if formspree CLI is installed
if ! command -v formspree &> /dev/null; then
    echo "📦 Installing Formspree CLI..."
    npm install -g @formspree/cli
    echo "✅ Formspree CLI installed"
else
    echo "✅ Formspree CLI already installed"
fi

echo ""
echo "📋 Configuration file: formspree.json"
echo ""

# Check if formspree.json exists
if [ ! -f "formspree.json" ]; then
    echo "❌ formspree.json not found!"
    echo "   Please create formspree.json with your form configuration."
    exit 1
fi

echo "📄 Current formspree.json content:"
cat formspree.json | jq '.' 2>/dev/null || cat formspree.json
echo ""

# Check if user is logged in
echo "🔐 Checking Formspree authentication..."
if ! formspree whoami &> /dev/null; then
    echo "⚠️  Not logged in to Formspree"
    echo ""
    echo "Please login:"
    echo "   formspree login"
    echo ""
    read -p "Press Enter after you've logged in, or Ctrl+C to cancel..."
else
    echo "✅ Logged in to Formspree"
    formspree whoami
fi

echo ""
echo "🚀 Deploying configuration..."
echo ""

# Deploy the configuration
formspree deploy

echo ""
echo "✅ Auto Response configured!"
echo ""
echo "📧 Test it:"
echo "   1. Register a new member at /register"
echo "   2. Check the member's email inbox"
echo "   3. Should receive welcome email with Discord link"
echo ""


