#!/bin/bash
# Prepare all packages for publishing
# This script copies LICENSE files, installs dependencies, and builds all packages

set -e

cd "$(dirname "$0")/.."

echo "🚀 Preparing all MUIN CLI packages for publishing"
echo "=================================================="
echo ""

PACKAGES=(
  "json-to-types"
  "curl-to-code"
  "depcheck-lite"
  "lockcheck"
  "envdiff"
  "bundlesize"
  "tsconfig-helper"
  "readme-gen"
)

for pkg in "${PACKAGES[@]}"; do
  if [ -f "packages/$pkg/package.json" ]; then
    echo "=== Preparing $pkg ==="
    cd "packages/$pkg"
    
    # Copy LICENSE if missing
    if [ ! -f LICENSE ]; then
      echo "  → Copying LICENSE"
      cp ../../LICENSE .
    fi
    
    # Install dependencies
    echo "  → Installing dependencies"
    npm install --silent
    
    # Build
    echo "  → Building"
    npm run build --silent
    
    # Verify
    if [ -f dist/cli.js ]; then
      echo "  ✅ Build successful"
    else
      echo "  ⚠️ Build issue - dist/cli.js not found"
    fi
    
    cd ../..
    echo ""
  else
    echo "=== Skipping $pkg (no package.json) ==="
    echo ""
  fi
done

echo "=================================================="
echo "✅ All packages prepared!"
echo ""
echo "To check a specific package:"
echo "  ./scripts/pre-publish-check.sh <package-name>"
echo ""
echo "To publish all:"
echo "  for pkg in packages/*/; do (cd \$pkg && npm publish --access public); done"
