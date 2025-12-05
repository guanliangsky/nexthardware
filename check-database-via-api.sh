#!/bin/bash

echo "╔══════════════════════════════════════════════════════════╗"
echo "║  🔍 CHECKING DATABASE VIA SUPABASE API                   ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo ""

# Check if we can access Supabase
if [ -f .env.local ]; then
    source .env.local
    SUPABASE_URL="$NEXT_PUBLIC_SUPABASE_URL"
    SUPABASE_KEY="$SUPABASE_SERVICE_ROLE_KEY"
    
    if [ -z "$SUPABASE_URL" ] || [ -z "$SUPABASE_KEY" ]; then
        echo "❌ Supabase credentials not found in .env.local"
        exit 1
    fi
    
    echo "✅ Supabase credentials found"
    echo "   URL: ${SUPABASE_URL:0:30}..."
    echo ""
    echo "📊 Querying contact_messages table..."
    echo ""
    
    # Query via REST API
    RESPONSE=$(curl -s -X POST \
      "${SUPABASE_URL}/rest/v1/contact_messages?select=*&order=created_at.desc&limit=5" \
      -H "apikey: ${SUPABASE_KEY}" \
      -H "Authorization: Bearer ${SUPABASE_KEY}" \
      -H "Content-Type: application/json" \
      -H "Prefer: return=representation" 2>&1)
    
    if echo "$RESPONSE" | grep -q "error\|Error"; then
        echo "❌ Error querying database:"
        echo "$RESPONSE" | head -5
    else
        echo "$RESPONSE" | jq . 2>/dev/null || echo "$RESPONSE"
    fi
else
    echo "❌ .env.local not found"
    exit 1
fi

