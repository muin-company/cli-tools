#!/bin/bash
# Bump version across all packages
# Usage: ./version-bump.sh [patch|minor|major] [package-name]

set -e

cd "$(dirname "$0")/.."

VERSION_TYPE=${1:-patch}
SPECIFIC_PACKAGE=$2

if [ -n "$SPECIFIC_PACKAGE" ]; then
  PACKAGES=("$SPECIFIC_PACKAGE")
else
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
fi

echo "🔢 Version bump: $VERSION_TYPE"
echo "================================"
echo ""

for pkg in "${PACKAGES[@]}"; do
  if [ -f "packages/$pkg/package.json" ]; then
    cd "packages/$pkg"
    
    OLD_VERSION=$(node -p "require('./package.json').version")
    npm version $VERSION_TYPE --no-git-tag-version --silent
    NEW_VERSION=$(node -p "require('./package.json').version")
    
    echo "  $pkg: $OLD_VERSION → $NEW_VERSION"
    
    cd ../..
  fi
done

echo ""
echo "================================"
echo "✅ Version bump complete!"
echo ""
echo "Next steps:"
echo "  git add -A"
echo "  git commit -m 'chore: bump versions ($VERSION_TYPE)'"
echo "  git push"
