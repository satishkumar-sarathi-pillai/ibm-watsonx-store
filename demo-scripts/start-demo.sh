#!/bin/bash
# ============================================================
# IBM WatsonX Store — Demo Launcher
# Prepares the repo state and prints the Bob trigger prompt
# Usage: bash demo-scripts/start-demo.sh
# ============================================================

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_DIR="$(dirname "$SCRIPT_DIR")"

cd "$REPO_DIR"

echo ""
echo "============================================================"
echo "  IBM WatsonX Store — Show & Tell Demo Launcher"
echo "============================================================"
echo ""

# Step 1 — Ensure we are on main and up to date
echo "▶ [1/3] Switching to main and pulling latest..."
git checkout main
git pull origin main
echo "  ✅ main is up to date"
echo ""

# Step 2 — Introduce the bugs
echo "▶ [2/3] Introducing intentional bugs..."
python3 "$SCRIPT_DIR/introduce-bugs.py"
echo ""

# Step 3 — Print the Bob trigger prompt
echo "▶ [3/3] Demo is ready!"
echo ""
echo "============================================================"
echo "  COPY THE FOLLOWING LINE AND PASTE INTO IBM BOB CHAT:"
echo "============================================================"
echo ""
echo "  @bob-demo-workflow"
echo ""
echo "  OR paste the full prompt from:"
echo "  demo-scripts/bob-demo-workflow.md"
echo ""
echo "  When Bob pauses at Step 4 for approval, type:"
echo "  APPROVED — proceed with fixes"
echo ""
echo "============================================================"
echo ""
