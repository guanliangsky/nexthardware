#!/bin/bash

# Add reCAPTCHA Environment Variables to Vercel
# Usage: ./add-recaptcha-env.sh

echo "╔══════════════════════════════════════════════════════════╗"
echo "║  🤖 Adding reCAPTCHA Environment Variables to Vercel      ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Please install it first:"
    echo "   npm i -g vercel"
    exit 1
fi

# Get keys from user
echo "📋 Please provide your reCAPTCHA keys:"
echo ""
read -p "Site Key (NEXT_PUBLIC_RECAPTCHA_SITE_KEY): " SITE_KEY
read -p "Secret Key (RECAPTCHA_SECRET_KEY): " SECRET_KEY

if [ -z "$SITE_KEY" ] || [ -z "$SECRET_KEY" ]; then
    echo "❌ Both keys are required!"
    exit 1
fi

echo ""
echo "🔧 Adding environment variables to Vercel..."
echo ""

# Add Site Key
vercel env add NEXT_PUBLIC_RECAPTCHA_SITE_KEY production <<< "$SITE_KEY" <<< "y" <<< "y" <<< "y"
vercel env add NEXT_PUBLIC_RECAPTCHA_SITE_KEY preview <<< "$SITE_KEY" <<< "y"
vercel env add NEXT_PUBLIC_RECAPTCHA_SITE_KEY development <<< "$SITE_KEY" <<< "y"

# Add Secret Key
vercel env add RECAPTCHA_SECRET_KEY production <<< "$SECRET_KEY" <<< "y" <<< "y" <<< "y"
vercel env add RECAPTCHA_SECRET_KEY preview <<< "$SECRET_KEY" <<< "y"
vercel env add RECAPTCHA_SECRET_KEY development <<< "$SECRET_KEY" <<< "y"

echo ""
echo "✅ Environment variables added!"
echo ""
echo "📋 Next steps:"
echo "1. Redeploy your site (or wait for next git push)"
echo "2. Test the contact form"
echo "3. Check browser console for reCAPTCHA loading"
echo ""
echo "🎉 reCAPTCHA is now configured!"

