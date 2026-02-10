#!/bin/bash
# Pre-publish verification script for MUIN CLI tools
# Usage: ./pre-publish-check.sh <package-name>

set -e

PACKAGE=$1

if [ -z "$PACKAGE" ]; then
  echo "Usage: ./pre-publish-check.sh <package-name>"
  echo ""
  echo "Available packages:"
  ls -1 packages/ | grep -v "^\."
  exit 1
fi

cd "packages/$PACKAGE" || { echo "Package not found: $PACKAGE"; exit 1; }

echo ""
echo "🔍 Pre-publish checklist for @muin/$PACKAGE"
echo "==========================================="
echo ""

ERRORS=0

# 1. package.json validation
echo -n "✓ package.json: "
if node -e "
  const pkg = require('./package.json');
  const checks = {
    'name': pkg.name && pkg.name.startsWith('@muin/'),
    'version': pkg.version && /^\d+\.\d+\.\d+/.test(pkg.version),
    'description': pkg.description && pkg.description.length > 10,
    'main': pkg.main === 'dist/index.js',
    'bin': pkg.bin && Object.keys(pkg.bin).length > 0,
    'license': pkg.license === 'MIT',
    'author': !!pkg.author
  };
  const failed = Object.entries(checks).filter(([k, v]) => !v);
  if (failed.length) {
    console.log('ISSUES FOUND');
    failed.forEach(([k]) => console.log('  ⚠️ Missing/invalid: ' + k));
    process.exit(1);
  }
  console.log('PASS ✅');
" 2>/dev/null; then
  :
else
  ERRORS=$((ERRORS + 1))
fi

# 2. LICENSE check
echo -n "✓ LICENSE: "
if [ -f LICENSE ]; then
  echo "PRESENT ✅"
else
  echo "MISSING ⚠️  (run: cp ../../LICENSE .)"
  ERRORS=$((ERRORS + 1))
fi

# 3. README check
echo -n "✓ README.md: "
if [ -f README.md ]; then
  lines=$(wc -l < README.md)
  if [ "$lines" -gt 100 ]; then
    echo "$lines lines ✅"
  else
    echo "$lines lines ⚠️ (consider expanding)"
  fi
else
  echo "MISSING ❌"
  ERRORS=$((ERRORS + 1))
fi

# 4. Build check
echo -n "✓ Build: "
if [ -d dist ] && [ -f dist/cli.js ]; then
  echo "OK (dist/ exists) ✅"
else
  echo "MISSING - running build..."
  if npm run build 2>/dev/null; then
    if [ -f dist/cli.js ]; then
      echo "  ✓ Build successful ✅"
    else
      echo "  ❌ dist/cli.js not created"
      ERRORS=$((ERRORS + 1))
    fi
  else
    echo "  ❌ Build failed"
    ERRORS=$((ERRORS + 1))
  fi
fi

# 5. CLI execution check
echo -n "✓ CLI works: "
if [ -f dist/cli.js ] && node dist/cli.js --help > /dev/null 2>&1; then
  echo "OK ✅"
else
  echo "FAIL ❌"
  ERRORS=$((ERRORS + 1))
fi

# 6. Shebang check
echo -n "✓ Shebang: "
if [ -f dist/cli.js ] && head -1 dist/cli.js | grep -q "#!/usr/bin/env node"; then
  echo "OK ✅"
else
  echo "MISSING ⚠️"
fi

# 7. Package size
echo -n "✓ Package size: "
size=$(npm pack --dry-run 2>&1 | grep -E "package size|total files" | head -1)
echo "$size"

# 8. Security audit
echo -n "✓ Security: "
if npm audit --production 2>&1 | grep -q "found 0 vulnerabilities"; then
  echo "0 vulnerabilities ✅"
else
  echo "⚠️ Check npm audit"
fi

echo ""
echo "==========================================="
if [ "$ERRORS" -eq 0 ]; then
  echo "✅ Pre-publish check complete! Ready to publish."
  echo ""
  echo "To publish:"
  echo "  npm publish --access public"
else
  echo "⚠️ Found $ERRORS issue(s). Please fix before publishing."
fi
echo ""
