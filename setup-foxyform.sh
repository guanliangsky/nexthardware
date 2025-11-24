#!/bin/bash

echo ""
echo "🦊 FoxyForm Setup Helper"
echo "========================"
echo ""
echo "This script will help you add your FoxyForm code to environment variables."
echo ""
echo "📋 Steps:"
echo "1. Go to https://www.foxyform.com/"
echo "2. Create your form (Name, Email, Subject, Message)"
echo "3. Set target email: liangoptics@gmail.com"
echo "4. Copy the generated HTML code"
echo ""
read -p "Press Enter when you have your FoxyForm code ready..."

echo ""
echo "📋 Paste your FoxyFORM HTML code below:"
echo "(Paste the entire code, then press Enter, then Ctrl+D to finish)"
echo ""

# Read multiline input
FOXYFORM_CODE=$(cat)

# Escape the code for .env file (replace newlines with \n)
ESCAPED_CODE=$(echo "$FOXYFORM_CODE" | sed ':a;N;$!ba;s/\n/\\n/g' | sed 's/"/\\"/g')

# Add to .env.local
ENV_FILE=".env.local"

if [ -f "$ENV_FILE" ]; then
  # Remove existing NEXT_PUBLIC_FOXYFORM_CODE if it exists
  sed -i.bak '/^NEXT_PUBLIC_FOXYFORM_CODE=/d' "$ENV_FILE"
fi

# Add the new code
echo "NEXT_PUBLIC_FOXYFORM_CODE=\"$ESCAPED_CODE\"" >> "$ENV_FILE"

echo ""
echo "✅ FoxyForm code added to .env.local"
echo ""
echo "📋 Next steps:"
echo "1. Add to Vercel: vercel env add NEXT_PUBLIC_FOXYFORM_CODE production"
echo "2. Deploy: vercel --prod"
echo ""
echo "💡 When adding to Vercel, paste the same code you just added."
echo ""


