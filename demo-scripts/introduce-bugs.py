#!/usr/bin/env python3
# ============================================================
# IBM WatsonX Store — Demo Script: INTRODUCE BUGS
# Applies 4 intentional UI failures for Show & Tell demo
# Usage: python3 demo-scripts/introduce-bugs.py
# ============================================================

import os
import sys

REPO_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

CHANGES = [
    (
        "src/pages/LoginPage.jsx",
        "<><ArrowRight size={18} /> Sign in</>",
        "<><ArrowRight size={18} /> Login</>",
        "Button label: 'Sign in' → 'Login'"
    ),
    (
        "src/pages/OrderConfirmPage.jsx",
        "<h1>Order Confirmed</h1>",
        "<h1>Thank you</h1>",
        "Heading: 'Order Confirmed' → 'Thank you'"
    ),
    (
        "src/pages/RegisterPage.jsx",
        "navigate('/login');",
        "navigate('/store');",
        "Post-register redirect: '/login' → '/store'"
    ),
    (
        "src/pages/StorePage.jsx",
        "<h1>Latest Phones</h1>",
        "<h1>Our Phones</h1>",
        "Hero heading: 'Latest Phones' → 'Our Phones'"
    ),
]

print("\n🐛 Introducing intentional bugs for demo...\n")

errors = []
for filepath, old, new, description in CHANGES:
    full_path = os.path.join(REPO_DIR, filepath)
    with open(full_path, "r") as f:
        content = f.read()
    if old not in content:
        if new in content:
            print(f"⚠️  Already buggy — skipping: {filepath}")
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

print("\n✅ All bugs introduced successfully!")
print("\n▶️  Run tests now:  npm run test:e2e\n")
