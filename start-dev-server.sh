#!/bin/bash

echo "╔══════════════════════════════════════════════════════════╗"
echo "║  🚀 STARTING DEV SERVER                                   ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo ""

# Kill any existing servers
pkill -f "next dev" 2>/dev/null
sleep 1

# Clean build cache
rm -rf .next

echo "✅ Cleaned build cache"
echo "✅ Stopped old servers"
echo ""
echo "🚀 Starting dev server..."
echo ""

# Start dev server
npm run dev

