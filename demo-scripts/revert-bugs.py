#!/usr/bin/env python3
# ============================================================
# IBM WatsonX Store — Demo Script: REVERT BUGS
# Restores all 4 files to their clean passing state
# Usage: python3 demo-scripts/revert-bugs.py
# ============================================================

import os
import sys

REPO_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

CHANGES = [
    (
        "src/pages/LoginPage.jsx",
        "<><ArrowRight size={18} /> Login</>",
        "<><ArrowRight size={18} /> Sign in</>",
        "Button label restored: 'Login' → 'Sign in'"
    ),
    (
        "src/pages/OrderConfirmPage.jsx",
        "<h1>Thank you</h1>",
        "<h1>Order Confirmed</h1>",
        "Heading restored: 'Thank you' → 'Order Confirmed'"
    ),
    (
        "src/pages/RegisterPage.jsx",
        "navigate('/store');",
        "navigate('/login');",
        "Post-register redirect restored: '/store' → '/login'"
    ),
    (
        "src/pages/StorePage.jsx",
        "<h1>Our Phones</h1>",
        "<h1>Latest Phones</h1>",
        "Hero heading restored: 'Our Phones' → 'Latest Phones'"
    ),
]

print("\n🔧 Reverting intentional bugs — restoring clean code...\n")

errors = []
for filepath, old, new, description in CHANGES:
    full_path = os.path.join(REPO_DIR, filepath)
    with open(full_path, "r") as f:
        content = f.read()
    if old not in content:
        if new in content:
            print(f"⚠️  Already clean — skipping: {filepath}")
        else:
            errors.append(f"❌ Could not find expected string in {filepath}")
        continue
    with open(full_path, "w") as f:
        f.write(content.replace(old, new, 1))
    print(f"  ✅ {filepath}")
    print(f"     {description}")

if errors:
    print()
    for e in errors:
        print(e)
    sys.exit(1)

print("\n✅ All bugs reverted — code is clean!")
print("\n▶️  Run tests now:  npm run test:e2e\n")
