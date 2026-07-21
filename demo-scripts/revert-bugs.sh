#!/bin/bash
# ============================================================
# IBM WatsonX Store — Demo Script: REVERT BUGS
# Restores all 4 files to their clean passing state
# Usage: bash demo-scripts/revert-bugs.sh
# ============================================================

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_DIR="$(dirname "$SCRIPT_DIR")"

cd "$REPO_DIR"

echo ""
echo "🔧 Reverting intentional bugs — restoring clean code..."
echo ""

git apply "$SCRIPT_DIR/revert-bugs.patch"

echo "✅ All bugs reverted successfully!"
echo ""
echo "Changes restored:"
echo "  • LoginPage.jsx        → Button label restored to 'Sign in'"
echo "  • OrderConfirmPage.jsx → Heading restored to 'Order confirmed'"
echo "  • RegisterPage.jsx     → Post-register redirect restored to '/login'"
echo "  • StorePage.jsx        → Hero heading restored to 'Latest Phones & Deals'"
echo ""
echo "▶️  Run tests now:  npm run test:e2e"
echo ""
