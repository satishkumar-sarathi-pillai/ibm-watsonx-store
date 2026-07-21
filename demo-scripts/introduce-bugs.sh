#!/bin/bash
# ============================================================
# IBM WatsonX Store — Demo Script: INTRODUCE BUGS
# Applies 4 intentional UI failures for Show & Tell demo
# Usage: bash demo-scripts/introduce-bugs.sh
# ============================================================

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_DIR="$(dirname "$SCRIPT_DIR")"

cd "$REPO_DIR"

echo ""
echo "🐛 Introducing intentional bugs for demo..."
echo ""

git apply "$SCRIPT_DIR/introduce-bugs.patch"

echo "✅ Bugs introduced successfully!"
echo ""
echo "Changes applied:"
echo "  • LoginPage.jsx        → Button label: 'Sign in' changed to 'Login'"
echo "  • OrderConfirmPage.jsx → Heading: 'Order confirmed' changed to 'Thank you'"
echo "  • RegisterPage.jsx     → Post-register redirect: '/login' changed to '/store'"
echo "  • StorePage.jsx        → Hero heading: 'Latest Phones & Deals' changed to 'Our Phones'"
echo ""
echo "▶️  Run tests now:  npm run test:e2e"
echo ""
