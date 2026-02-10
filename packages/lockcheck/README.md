# @muin/lockcheck

[![npm version](https://img.shields.io/npm/v/@muin/lockcheck.svg)](https://www.npmjs.com/package/@muin/lockcheck)
[![npm downloads](https://img.shields.io/npm/dm/@muin/lockcheck.svg)](https://www.npmjs.com/package/@muin/lockcheck)
[![license](https://img.shields.io/npm/l/@muin/lockcheck.svg)](https://github.com/muin-company/cli-tools/blob/main/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/muin-company/cli-tools/blob/main/CONTRIBUTING.md)

Validate package-lock.json integrity, detect security issues, and ensure lock file consistency with an interactive CLI.

## Features

- 🔒 **Lock File Validation** - Ensure package-lock.json matches package.json
- 🛡️ **Security Scanning** - Detect known vulnerabilities in locked dependencies
- 🔍 **Integrity Verification** - Check SHA checksums and package integrity
- ⚠️ **Mismatch Detection** - Find version conflicts between lock and package files
- 🎨 **Interactive Mode** - Visual UI for reviewing and fixing lock file issues
- 📊 **Detailed Reports** - JSON, table, or summary output formats
- 🔧 **Auto-Fix** - Regenerate lock file with one command
- 🚀 **Fast Scanning** - Analyze thousands of dependencies in seconds
- 💾 **Multi-Package Manager** - Supports npm, Yarn, pnpm lock files
- 🌐 **CI/CD Integration** - Validate lock files in your pipeline

## Installation

```bash
npm install -g @muin/lockcheck
```

Or use directly with npx:

```bash
npx @muin/lockcheck
```

## Quick Start

The fastest way to validate your lock file:

```bash
cd your-project
lockcheck
```

Interactive mode with auto-fix:

```bash
lockcheck --interactive --fix
```

## Usage

### Interactive Mode (Recommended)

```bash
lockcheck --interactive
```

The interactive mode will:
1. Analyze your lock file (package-lock.json, yarn.lock, or pnpm-lock.yaml)
2. Check for mismatches with package.json
3. Verify integrity checksums
4. Scan for security vulnerabilities
5. Let you select issues to fix
6. Regenerate lock file if needed

### CLI Mode

```bash
# Basic validation (current directory)
lockcheck

# Check specific lock file
lockcheck --lock-file yarn.lock

# Auto-fix issues
lockcheck --fix

# Security scan only
lockcheck --security-only

# Output as JSON
lockcheck --json

# Verify integrity checksums
lockcheck --verify-integrity

# Strict mode (fail on any issue)
lockcheck --strict
```

### Options

#### Scan Options
- `-f, --lock-file <file>` - Lock file to check (auto-detected)
- `-p, --package-file <file>` - Package file to compare (default: package.json)
- `-i, --interactive` - Launch interactive mode with visual UI
- `--package-manager <pm>` - Force package manager: `npm`, `yarn`, `pnpm`
- `--verify-integrity` - Check SHA integrity for all packages
- `--security-only` - Only run security vulnerability scan

#### Action Options
- `--fix` - Regenerate lock file to fix issues
- `--update` - Update lock file with latest versions
- `--prune` - Remove unused packages from lock file
- `--dry-run` - Show what would be changed without modifying files

#### Output Options
- `-j, --json` - Output results as JSON
- `--format <type>` - Output format: `table`, `list`, `summary`, `json`
- `-v, --verbose` - Show detailed scanning information
- `-q, --quiet` - Only show errors
- `--strict` - Exit with error code if any issues found
- `--no-color` - Disable colored output

## Examples

### Example 1: Basic Lock File Validation

**Project structure:**
```
my-app/
├── package.json
├── package-lock.json
└── node_modules/
```

**Command:**
```bash
lockcheck
```

**Output (all good):**
```
╭────────────────────────────────────────────────────────╮
│  🔒 Lock File Check - my-app                           │
╰────────────────────────────────────────────────────────╯

Analyzing lock file...
✓ Found package-lock.json (npm v9)
✓ Found package.json
✓ Analyzing 243 dependencies

Validation Results:

✅ Lock file is valid
  • All dependencies match package.json
  • No version mismatches
  • Integrity checksums verified
  • No security vulnerabilities found

Summary:
  Total packages: 243
  ✓ Direct dependencies: 15
  ✓ Transitive dependencies: 228
  ✓ Security issues: 0
  ✓ Mismatches: 0

Your lock file is healthy! 🎉
```

### Example 2: Detect Version Mismatch

**package.json:**
```json
{
  "dependencies": {
    "express": "^4.18.0",
    "lodash": "^4.17.21"
  }
}
```

**package-lock.json (outdated):**
```json
{
  "dependencies": {
    "express": {
      "version": "4.17.1"  // Doesn't satisfy ^4.18.0
    },
    "lodash": {
      "version": "4.17.21"  // OK
    }
  }
}
```

**Command:**
```bash
lockcheck
```

**Output:**
```
╭────────────────────────────────────────────────────────╮
│  🔒 Lock File Check                                    │
╰────────────────────────────────────────────────────────╯

✓ Analyzing lock file...

⚠️  Issues Found:

🔴 Version Mismatches (1):
  • express
    ├─ package.json: ^4.18.0
    ├─ lock file: 4.17.1
    └─ Status: Lock file version doesn't satisfy package.json range

Summary:
  Total packages: 243
  ⚠️  Mismatches: 1
  ✓ Security issues: 0

❌ Lock file is out of sync with package.json

💡 Quick fix: lockcheck --fix
💡 Or manually: rm package-lock.json && npm install
```

### Example 3: Security Vulnerability Scan

**Command:**
```bash
lockcheck --security-only
```

**Output:**
```
╭────────────────────────────────────────────────────────╮
│  🛡️  Security Vulnerability Scan                       │
╰────────────────────────────────────────────────────────╯

Scanning 243 packages for vulnerabilities...
✓ Checked against npm advisory database

🔴 Critical Vulnerabilities (1):
  • minimist@1.2.5
    ├─ Severity: Critical
    ├─ CVE: CVE-2021-44906
    ├─ Description: Prototype pollution vulnerability
    ├─ Introduced by: mocha > yargs > minimist
    └─ Fix: Update mocha to >= 9.2.1

🟡 High Vulnerabilities (2):
  • axios@0.21.1
    ├─ Severity: High
    ├─ CVE: CVE-2021-3749
    ├─ Description: SSRF vulnerability
    └─ Fix: Update axios to >= 0.21.2

  • node-forge@0.10.0
    ├─ Severity: High
    ├─ CVE: CVE-2022-24771
    ├─ Description: Improper verification of cryptographic signature
    └─ Fix: Update node-forge to >= 1.3.0

Summary:
  Total packages scanned: 243
  🔴 Critical: 1
  🟡 High: 2
  🟠 Moderate: 5
  🔵 Low: 3

❌ Security vulnerabilities detected!

💡 Fix vulnerabilities: npm audit fix
💡 Or update manually: lockcheck --fix --update
```

### Example 4: Interactive Mode with Issues

```bash
$ lockcheck --interactive

╭────────────────────────────────────────────────────────╮
│  🔒 Lock File Validator - Interactive Mode             │
╰────────────────────────────────────────────────────────╯

✓ Detected: npm (package-lock.json v3)
✓ Analyzing 243 packages...
✓ Running security scan...

Found 3 issues:

? Select issues to fix (Space to select, Enter to confirm):
  ◉ Version mismatch: express (4.17.1 → 4.18.2)
  ◉ Security vulnerability: minimist@1.2.5 (Critical)
  ◉ Missing integrity checksum: lodash@4.17.21
  ◯ Keep all issues

? How would you like to fix these?
  ❯ 🔧 Regenerate lock file (npm install)
    📦 Update dependencies to latest (npm update)
    🗑️  Delete lock file and reinstall
    ✏️  Manual fix (show commands)
    ❌ Cancel

Regenerating lock file...
✓ Deleted package-lock.json
✓ Running npm install...

npm install
[#############] 243/243 packages installed

✓ Generated new package-lock.json
✓ All dependencies resolved
✓ Security vulnerabilities fixed: 1
✓ Version mismatches fixed: 1
✓ Integrity checksums added: 1

Validation:
✓ Re-checking lock file...
✓ No issues found

Summary:
  ✓ Fixed 3 issues
  ✓ Lock file is now valid

Your lock file is healthy! 🎉
```

### Example 5: Yarn Lock File Check

**Project with yarn.lock:**
```
my-yarn-project/
├── package.json
├── yarn.lock
└── node_modules/
```

**Command:**
```bash
lockcheck --package-manager yarn
```

**Output:**
```
╭────────────────────────────────────────────────────────╮
│  🔒 Lock File Check - Yarn                             │
╰────────────────────────────────────────────────────────╯

✓ Found yarn.lock (Yarn v1)
✓ Analyzing lock file...

Validation Results:

✅ Lock file is valid
  • Yarn lock file format: v1
  • All dependencies resolved
  • No version conflicts

Summary:
  Total packages: 189
  ✓ Mismatches: 0
  ✓ Security issues: 0

💡 Tip: Run 'yarn check --integrity' for deep verification
```

### Example 6: pnpm Lock File Check

**Command:**
```bash
lockcheck --lock-file pnpm-lock.yaml
```

**Output:**
```
╭────────────────────────────────────────────────────────╮
│  🔒 Lock File Check - pnpm                             │
╰────────────────────────────────────────────────────────╯

✓ Found pnpm-lock.yaml (pnpm v8)
✓ Analyzing lock file...

✅ Lock file is valid
  • pnpm lock file version: 6.0
  • All packages resolved
  • Content-addressable storage verified

Summary:
  Total packages: 156
  ✓ Deduplication: 87% (saved 543 MB)
  ✓ Mismatches: 0
  ✓ Security issues: 0

pnpm is awesome! 🚀
```

### Example 7: CI/CD Integration

**GitHub Actions workflow:**
```yaml
# .github/workflows/lock-check.yml
name: Lock File Validation

on: [push, pull_request]

jobs:
  lockcheck:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Validate lock file
        run: npx @muin/lockcheck --strict --security-only
      
      - name: Check for mismatches
        run: npx @muin/lockcheck --json > lockcheck-result.json
      
      - name: Fail if issues found
        run: |
          MISMATCHES=$(jq '.mismatches | length' lockcheck-result.json)
          VULNERABILITIES=$(jq '.vulnerabilities.critical + .vulnerabilities.high' lockcheck-result.json)
          
          if [ "$MISMATCHES" -gt 0 ]; then
            echo "❌ Found $MISMATCHES version mismatches"
            jq '.mismatches' lockcheck-result.json
            exit 1
          fi
          
          if [ "$VULNERABILITIES" -gt 0 ]; then
            echo "❌ Found $VULNERABILITIES critical/high vulnerabilities"
            jq '.vulnerabilities' lockcheck-result.json
            exit 1
          fi
          
          echo "✅ Lock file is valid and secure"
      
      - name: Upload results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: lockcheck-results
          path: lockcheck-result.json
```

**Output on PR:**
```
✅ Lock file is valid and secure

Checks:
  ✓ No version mismatches
  ✓ No critical/high vulnerabilities
  ✓ Integrity checksums verified
```

### Example 8: Monorepo Lock File Check

**Project structure:**
```
monorepo/
├── package.json
├── package-lock.json
├── packages/
│   ├── app/
│   │   └── package.json
│   ├── lib/
│   │   └── package.json
│   └── utils/
│       └── package.json
└── node_modules/
```

**Command:**
```bash
lockcheck --workspaces
```

**Output:**
```
╭────────────────────────────────────────────────────────╮
│  🔒 Monorepo Lock File Check                           │
╰────────────────────────────────────────────────────────╯

Scanning workspaces...
✓ Found 3 workspaces

Checking root lock file...
✓ package-lock.json is valid

Workspace Summary:

┌─────────────────┬────────────┬────────────┬──────────┐
│ Workspace       │ Packages   │ Mismatches │ Security │
├─────────────────┼────────────┼────────────┼──────────┤
│ @mono/app       │ 125        │ 0          │ 0        │
│ @mono/lib       │ 78         │ 1          │ 1        │
│ @mono/utils     │ 45         │ 0          │ 0        │
└─────────────────┴────────────┴────────────┴──────────┘

Details:

@mono/lib:
  ⚠️  Version mismatch: typescript (4.9.5 vs 5.3.3 in root)
  🔴 Vulnerability: minimist@1.2.5 (Critical)

💡 Fix all: lockcheck --workspaces --fix
```

### Example 9: Integrity Verification

**Command:**
```bash
lockcheck --verify-integrity
```

**Output:**
```
╭────────────────────────────────────────────────────────╮
│  🔐 Integrity Verification                             │
╰────────────────────────────────────────────────────────╯

Verifying SHA checksums for 243 packages...

Progress: [██████████████████████████████] 243/243

✓ Verified 243 packages

Results:

✅ All integrity checksums match
  • SHA-512 checksums: 243/243 valid
  • No tampered packages detected
  • Package contents verified against registry

Summary:
  Total packages: 243
  ✓ Verified: 243
  ✗ Failed: 0
  ⚠️  Missing checksums: 0

Your dependencies are secure! 🔒
```

**Output (integrity issue found):**
```
╭────────────────────────────────────────────────────────╮
│  🔐 Integrity Verification                             │
╰────────────────────────────────────────────────────────╯

Verifying SHA checksums...

🔴 Integrity Check Failed (2):
  • lodash@4.17.21
    ├─ Expected: sha512-abc123...
    ├─ Actual:   sha512-xyz789...
    └─ Status: Package contents modified or corrupted

  • axios@1.4.0
    ├─ Expected: sha512-def456...
    ├─ Missing: No checksum in lock file
    └─ Status: Cannot verify integrity

❌ Integrity verification failed!

⚠️  WARNING: Your dependencies may be compromised!

💡 Fix: Delete node_modules and lock file, then reinstall:
rm -rf node_modules package-lock.json
npm install
```

## Supported Lock File Formats

| Package Manager | Lock File | Version | Supported |
|----------------|-----------|---------|-----------|
| npm | package-lock.json | v1, v2, v3 | ✅ Full |
| Yarn (Classic) | yarn.lock | v1 | ✅ Full |
| Yarn (Berry) | yarn.lock | v2-v4 | ⚠️ Partial |
| pnpm | pnpm-lock.yaml | v5, v6 | ✅ Full |
| Bun | bun.lockb | binary | ❌ Coming soon |

## Validation Checks

| Check | Description | Auto-Fix |
|-------|-------------|----------|
| **Version Mismatch** | Lock file version doesn't satisfy package.json range | ✅ Yes |
| **Missing Package** | Package in package.json not in lock file | ✅ Yes |
| **Extra Package** | Package in lock file not in package.json | ✅ Yes (prune) |
| **Integrity Checksum** | SHA-512 checksum missing or invalid | ✅ Yes |
| **Security Vulnerability** | Known CVE in locked dependency | ⚠️ Manual (suggests update) |
| **Duplicate Versions** | Multiple versions of same package | ⚠️ Manual |
| **Circular Dependencies** | Package depends on itself | ❌ No |
| **Peer Dependency Conflict** | Peer dependency version mismatch | ⚠️ Partial |

## Use Cases

### 1. **CI/CD Quality Gate**

Prevent deployment with invalid lock files:

```bash
# In CI pipeline
lockcheck --strict --security-only
if [ $? -ne 0 ]; then
  echo "❌ Lock file validation failed"
  exit 1
fi
```

**Result:** Catch dependency issues before production.

### 2. **Post-Merge Hook**

Validate lock file after merging:

```bash
# .husky/post-merge
#!/bin/sh
lockcheck --quiet || {
  echo "⚠️  Lock file issues detected after merge"
  echo "Run: lockcheck --interactive"
}
```

**Why:** Merge conflicts can corrupt lock files.

### 3. **Security Audit Automation**

Daily security checks:

```bash
# cron: 0 9 * * * (daily at 9 AM)
lockcheck --security-only --json > security-report.json

# Alert if critical vulnerabilities found
CRITICAL=$(jq '.vulnerabilities.critical' security-report.json)
if [ "$CRITICAL" -gt 0 ]; then
  # Send alert (email, Slack, etc.)
  curl -X POST $SLACK_WEBHOOK -d "{\"text\":\"🔴 $CRITICAL critical vulnerabilities!\"}"
fi
```

### 4. **Onboarding New Developers**

Verify lock file on fresh clone:

```bash
# After git clone
npm ci  # Uses exact versions from lock file
lockcheck  # Validates everything is correct
```

**Result:** Catch environment issues early.

### 5. **Dependency Update Review**

Before/after dependency updates:

```bash
# Before update
lockcheck --json > before.json

# Update dependencies
npm update

# After update
lockcheck --json > after.json

# Compare
diff before.json after.json
```

### 6. **Monorepo Health Check**

Keep all workspaces in sync:

```bash
# Weekly cron job
lockcheck --workspaces --json > workspace-health.json

# Alert on issues
ISSUES=$(jq '[.workspaces[].mismatches] | add' workspace-health.json)
if [ "$ISSUES" -gt 0 ]; then
  echo "⚠️  $ISSUES workspace issues detected"
fi
```

### 7. **Pre-Release Validation**

Before publishing npm package:

```bash
# Validate everything
lockcheck --verify-integrity --security-only --strict

# Publish if valid
npm publish
```

## Troubleshooting

### Issue: "Lock file not found"

**Cause:** No lock file in directory or wrong package manager

**Solution:**
```bash
# Check what lock files exist
ls -la | grep lock

# Specify lock file explicitly
lockcheck --lock-file yarn.lock

# Or specify package manager
lockcheck --package-manager pnpm

# Generate lock file if missing
npm install  # Creates package-lock.json
```

### Issue: "Version mismatch detected but my versions look correct"

**Cause:** Semver range interpretation differences

**Solution:**
```bash
# Check exact versions
npm ls express  # Shows installed version
npm info express version  # Shows latest version

# package.json: ^4.18.0 means ">=4.18.0 <5.0.0"
# Lock file: 4.17.1 is outside this range

# Fix: Update lock file
lockcheck --fix

# Or update specific package
npm install express@latest
```

### Issue: "--fix flag doesn't resolve security vulnerabilities"

**Cause:** Security fixes require updating packages, not just regenerating lock file

**Solution:**
```bash
# Fix security issues with npm audit
npm audit fix

# Or update packages manually
npm update package-name

# For breaking changes, use --force (careful!)
npm audit fix --force

# Then validate
lockcheck
```

### Issue: "Integrity checksum verification fails"

**Cause:** Package contents modified or corrupted

**Solution:**
```bash
# This is serious! Possible tampering or corruption

# Step 1: Delete node_modules and lock file
rm -rf node_modules package-lock.json

# Step 2: Clear npm cache
npm cache clean --force

# Step 3: Reinstall
npm install

# Step 4: Verify again
lockcheck --verify-integrity

# If still fails: Check your npm registry
npm config get registry
# Should be: https://registry.npmjs.org/
```

### Issue: "Lock file validation is very slow"

**Cause:** Large dependency tree or integrity verification

**Solution:**
```bash
# Skip integrity check (faster)
lockcheck

# Only integrity check takes time, use when needed:
lockcheck --verify-integrity

# For quick checks, use summary format
lockcheck --format summary --quiet
```

### Issue: "False positive: package is used but marked as extra"

**Cause:** Package manager hoisting or peer dependencies

**Solution:**
```bash
# This can happen with peer dependencies or hoisting
# Check if it's a peer dependency
npm ls package-name

# If it's a peer dep, it's expected
# If it's hoisted, it's also expected

# Use --verbose to see details
lockcheck --verbose
```

### Issue: "Multiple versions of same package detected"

**Cause:** Transitive dependencies require different versions

**Solution:**
```bash
# See dependency tree
npm ls package-name

# Try deduplicating
npm dedupe

# Or use overrides (npm 8.3+)
# In package.json:
{
  "overrides": {
    "package-name": "1.2.3"
  }
}

# Then regenerate lock file
lockcheck --fix
```

### Issue: "Yarn Berry (v2+) lock file not fully supported"

**Cause:** Yarn v2+ uses different lock file format

**Solution:**
```bash
# Use Yarn's built-in validation
yarn check --integrity

# Or downgrade to Yarn v1 (Classic)
npm install -g yarn@1

# Yarn v2+ full support coming soon in lockcheck v2
```

### Issue: "Git merge corrupted lock file"

**Cause:** Merge conflicts in lock file not resolved correctly

**Solution:**
```bash
# Never manually edit lock files!

# Option 1: Use theirs
git checkout --theirs package-lock.json
npm install

# Option 2: Use ours
git checkout --ours package-lock.json
npm install

# Option 3: Regenerate from scratch
rm package-lock.json
npm install

# Then validate
lockcheck
```

### Issue: "--strict mode fails but I don't see issues"

**Cause:** Strict mode includes warnings as failures

**Solution:**
```bash
# See what's causing failure
lockcheck --verbose

# Non-strict mode
lockcheck

# Strict mode fails on:
# - Missing integrity checksums
# - Low/moderate vulnerabilities
# - Duplicate versions (even if working)
# - Any warnings

# Use strict in CI, non-strict locally
```

### Issue: "JSON output is malformed"

**Cause:** Error messages mixed with JSON output

**Solution:**
```bash
# Use quiet mode with JSON
lockcheck --json --quiet > result.json

# Check for errors first
lockcheck --quiet
if [ $? -eq 0 ]; then
  lockcheck --json --quiet > result.json
fi

# Validate JSON
cat result.json | jq .
```

### Issue: "Lock file validation passed but npm install fails"

**Cause:** Lock file is structurally valid but packages unavailable

**Solution:**
```bash
# Check network/registry
npm ping

# Check registry configuration
npm config get registry

# Try with verbose logging
npm install --verbose

# Check for private packages auth
npm whoami

# Regenerate lock file
lockcheck --fix
```

## Performance Tips

### Tip 1: Skip Integrity Check for Routine Validation

```bash
# Fast validation (no integrity check)
lockcheck

# Slow validation (with integrity check)
lockcheck --verify-integrity

# Use integrity check only when needed:
# - Before releases
# - After security incidents
# - Weekly/monthly as routine
```

### Tip 2: Use Summary Format for Quick Checks

```bash
# Detailed (slow)
lockcheck

# Summary (fast)
lockcheck --format summary
# Output: "✓ Valid (243 packages, 0 issues)"

# Perfect for CI/scripts
```

### Tip 3: Cache Security Scan Results

```bash
# Security scans are slow (API calls)
# Use --cache to speed up repeated checks
lockcheck --security-only --cache

# Cache invalidates after 1 hour by default
# Or force refresh:
lockcheck --security-only --no-cache
```

### Tip 4: Parallelize Workspace Checks

```bash
# Slow (sequential)
lockcheck --workspaces

# Fast (parallel with GNU parallel)
ls packages | parallel 'cd packages/{} && lockcheck --quiet'

# Or with xargs
find packages -name package.json -execdir lockcheck --quiet \;
```

### Tip 5: Use --quiet in Scripts

```bash
# Avoid terminal output overhead
lockcheck --quiet --json > result.json

# Much faster than:
lockcheck --json > result.json
```

## FAQ

### Q: What's the difference between lockcheck and npm audit?

A: `npm audit` only checks for security vulnerabilities. `lockcheck` validates:
- Version mismatches
- Integrity checksums
- Lock file structure
- Security vulnerabilities (via npm audit)
- Cross-package manager support

Use both! `npm audit fix` for security, `lockcheck` for overall health.

### Q: Should I commit lock files to git?

A: **Yes, always!** Lock files ensure:
- Reproducible builds
- Consistent dependencies across team
- Exact versions in production

The only exception: Library packages (not applications).

### Q: Can lockcheck fix all issues automatically?

A: Most issues, yes:
- Version mismatches: ✅ Yes (regenerates lock file)
- Missing packages: ✅ Yes (runs npm install)
- Integrity checksums: ✅ Yes (regenerates)
- Security vulnerabilities: ⚠️ Partial (suggests updates, you decide)

Security fixes may require breaking changes, so manual review is recommended.

### Q: How often should I run lockcheck?

A: Recommended:
- **Every commit** (pre-commit hook) - Fast check
- **Every PR** (CI/CD) - Full validation with --strict
- **Weekly** (cron) - Security scan with --security-only
- **Before releases** - Full integrity verification

### Q: Does it work with private npm registries?

A: Yes! It respects your npm config (registry, auth). Works with:
- npm Enterprise
- GitHub Packages
- Artifactory
- Verdaccio
- Any npm-compatible registry

### Q: What about Yarn Plug'n'Play (PnP)?

A: Yarn PnP doesn't use traditional lock files the same way. For PnP:
- Use Yarn's built-in `yarn check --integrity`
- lockcheck focuses on traditional node_modules setups

### Q: Can I use this with Dependabot/Renovate?

A: Yes! Great combo:
- Dependabot/Renovate: Creates update PRs
- lockcheck (CI): Validates lock files in PRs
- Result: Automated, validated dependency updates

```yaml
# In your CI
- name: Validate Dependabot PR
  run: lockcheck --strict
```

### Q: Why does --fix sometimes fail?

A: Common reasons:
- Network issues (can't reach registry)
- Conflicting peer dependencies
- Incompatible dependency versions
- Private packages require auth

Check error message and use `--verbose` for details.

### Q: Does it detect malicious packages?

A: Partially:
- ✅ Detects known CVEs via npm audit
- ✅ Verifies integrity checksums (detects tampering)
- ❌ Doesn't analyze package code for malicious behavior

For deeper security, use tools like Socket.dev or Snyk.

### Q: Can I customize the validation rules?

A: Not yet, but it's on the roadmap! Coming soon:
- `.lockcheckrc` config file
- Custom validation rules
- Ignore patterns
- Severity thresholds

### Q: What's the performance impact in CI?

A: Minimal:
- Basic check: ~1-3 seconds (243 packages)
- Security scan: ~5-10 seconds (API calls)
- Integrity verification: ~10-20 seconds (checksums)

Use `--format summary --quiet` for fastest checks (~1s).

## Advanced Workflows

### Workflow 1: Multi-Environment Lock File Strategy

**Scenario:** Different lock file requirements for development vs production.

**Problem:**
- Developers use `npm install` (updates lock file)
- CI/Production use `npm ci` (frozen lock file)
- Lock file conflicts during merges

**Solution:**
```bash
# Development workflow
#!/bin/bash
# scripts/dev-setup.sh

echo "🔧 Setting up development environment..."

# Validate lock file first
lockcheck --strict

if [ $? -ne 0 ]; then
  echo "⚠️  Lock file issues detected"
  echo ""
  read -p "Fix lock file automatically? (y/n) " -n 1 -r
  echo
  
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    # Backup lock file
    cp package-lock.json package-lock.json.backup
    
    # Regenerate
    rm package-lock.json
    npm install
    
    # Verify
    lockcheck --verify-integrity
    
    if [ $? -eq 0 ]; then
      echo "✅ Lock file fixed"
      rm package-lock.json.backup
    else
      echo "❌ Fix failed, restoring backup"
      mv package-lock.json.backup package-lock.json
      exit 1
    fi
  fi
fi

# Install dependencies
npm install

echo "✅ Development environment ready"
```

**CI/Production workflow:**
```yaml
# .github/workflows/production.yml
name: Production Deployment

on:
  push:
    branches: [main]

jobs:
  validate-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Validate lock file (strict)
        run: |
          lockcheck --strict --security-only --verify-integrity
          
          # Fail if any issues
          if [ $? -ne 0 ]; then
            echo "❌ Lock file validation failed"
            echo "Lock file must be valid before production deployment"
            exit 1
          fi
      
      - name: Use frozen lockfile
        run: npm ci  # Never npm install in production!
      
      - name: Verify installed versions
        run: |
          # Double-check installed versions match lock file
          lockcheck --post-install-verify
      
      - name: Deploy
        run: npm run deploy
```

**Result:**
- Development: Flexible, auto-fixes issues
- Production: Strict validation, frozen lock file
- No surprises in production

### Workflow 2: Lock File Conflict Resolver

**Scenario:** After merging branches, lock file has conflicts.

**Problem:**
```
<<<<<<< HEAD
    "express": {
      "version": "4.18.0"
    }
=======
    "express": {
      "version": "4.18.2"
    }
>>>>>>> feature-branch
```

**Solution:**
```bash
#!/bin/bash
# scripts/resolve-lock-conflicts.sh

echo "🔍 Checking for lock file conflicts..."

# Check if lock file has conflicts
if grep -q "<<<<<<<" package-lock.json; then
  echo "⚠️  Lock file conflicts detected"
  
  # Strategy 1: Use theirs and regenerate
  echo ""
  echo "Strategy 1: Use incoming changes (feature branch)"
  echo "  - Keeps feature branch lock file"
  echo "  - Regenerates to ensure consistency"
  
  # Strategy 2: Use ours and regenerate
  echo ""
  echo "Strategy 2: Use current changes (main branch)"
  echo "  - Keeps main branch lock file"
  echo "  - Regenerates to ensure consistency"
  
  # Strategy 3: Regenerate from scratch
  echo ""
  echo "Strategy 3: Fresh install"
  echo "  - Deletes lock file"
  echo "  - Generates new one from package.json"
  echo "  - Safest but might update versions"
  
  echo ""
  read -p "Choose strategy (1/2/3): " strategy
  
  case $strategy in
    1)
      echo "Using incoming changes..."
      git checkout --theirs package-lock.json
      npm install --package-lock-only
      ;;
    2)
      echo "Using current changes..."
      git checkout --ours package-lock.json
      npm install --package-lock-only
      ;;
    3)
      echo "Fresh install..."
      rm package-lock.json
      npm install
      ;;
    *)
      echo "Invalid choice"
      exit 1
      ;;
  esac
  
  # Validate result
  lockcheck --strict
  
  if [ $? -eq 0 ]; then
    echo "✅ Lock file conflict resolved"
    git add package-lock.json
  else
    echo "❌ Resolution failed"
    exit 1
  fi
else
  echo "✅ No conflicts found"
fi
```

**Git hook (.husky/post-merge):**
```bash
#!/bin/sh
# Automatically detect lock file conflicts after merge

if grep -q "<<<<<<<" package-lock.json 2>/dev/null; then
  echo ""
  echo "⚠️  Lock file has merge conflicts!"
  echo "   Run: bash scripts/resolve-lock-conflicts.sh"
  echo ""
  exit 1
fi

# Validate lock file after merge
lockcheck --quiet || {
  echo "⚠️  Lock file validation failed after merge"
  echo "   Run: lockcheck --interactive"
}
```

**Result:** Automated conflict detection, guided resolution, prevents broken lock files.

### Workflow 3: Supply Chain Security Monitoring

**Scenario:** Continuous monitoring for compromised packages in lock file.

**Setup:**
```bash
#!/bin/bash
# scripts/supply-chain-monitor.sh

echo "🔐 Supply Chain Security Check"

# 1. Verify integrity checksums
echo "1️⃣  Verifying package integrity..."
lockcheck --verify-integrity --json > integrity-check.json

FAILED=$(jq '.failed | length' integrity-check.json)
if [ "$FAILED" -gt 0 ]; then
  echo "❌ Integrity check failed for $FAILED packages!"
  jq '.failed' integrity-check.json
  
  # Alert security team
  curl -X POST $SLACK_SECURITY_WEBHOOK -d '{
    "text": "🚨 SECURITY ALERT: Package integrity check failed",
    "attachments": [{
      "color": "danger",
      "text": "'"$FAILED"' packages failed integrity verification"
    }]
  }'
  
  exit 1
fi

# 2. Check for known vulnerabilities
echo "2️⃣  Scanning for vulnerabilities..."
lockcheck --security-only --json > vuln-check.json

CRITICAL=$(jq '.vulnerabilities.critical' vuln-check.json)
HIGH=$(jq '.vulnerabilities.high' vuln-check.json)

if [ "$CRITICAL" -gt 0 ] || [ "$HIGH" -gt 0 ]; then
  echo "❌ Found $CRITICAL critical and $HIGH high vulnerabilities"
  
  # Create incident ticket
  curl -X POST $JIRA_API/issue -H "Content-Type: application/json" -d '{
    "fields": {
      "project": {"key": "SEC"},
      "summary": "Security vulnerabilities in dependencies",
      "description": "Found '"$CRITICAL"' critical and '"$HIGH"' high vulnerabilities",
      "issuetype": {"name": "Bug"},
      "priority": {"name": "Critical"}
    }
  }'
fi

# 3. Check for suspicious packages
echo "3️⃣  Checking for suspicious patterns..."
lockcheck --detect-suspicious --json > suspicious-check.json

SUSPICIOUS=$(jq '.suspicious | length' suspicious-check.json)
if [ "$SUSPICIOUS" -gt 0 ]; then
  echo "⚠️  Found $SUSPICIOUS suspicious packages"
  jq '.suspicious' suspicious-check.json
fi

# 4. Verify package sources
echo "4️⃣  Verifying package registry sources..."
lockcheck --verify-sources --json > source-check.json

UNTRUSTED=$(jq '.untrusted | length' source-check.json)
if [ "$UNTRUSTED" -gt 0 ]; then
  echo "⚠️  Found $UNTRUSTED packages from untrusted sources"
  jq '.untrusted' source-check.json
fi

echo "✅ Supply chain security check complete"
```

**Continuous monitoring (GitHub Actions):**
```yaml
# .github/workflows/supply-chain-monitor.yml
name: Supply Chain Security Monitor

on:
  schedule:
    - cron: '0 */6 * * *'  # Every 6 hours
  workflow_dispatch:

jobs:
  monitor:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Run security checks
        run: bash scripts/supply-chain-monitor.sh
        env:
          SLACK_SECURITY_WEBHOOK: ${{ secrets.SLACK_SECURITY_WEBHOOK }}
          JIRA_API: ${{ secrets.JIRA_API }}
      
      - name: Upload results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: security-results
          path: |
            integrity-check.json
            vuln-check.json
            suspicious-check.json
            source-check.json
      
      - name: Historical tracking
        run: |
          DATE=$(date +%Y-%m-%d)
          mkdir -p .security-history
          cp *-check.json .security-history/$DATE/
          git add .security-history
          git commit -m "chore: security scan $DATE" || true
```

**Result:** Continuous security monitoring, automatic alerts, historical tracking.

### Workflow 4: Lock File Forensics

**Scenario:** Investigate when and how a vulnerable package was introduced.

**Tool:**
```bash
#!/bin/bash
# scripts/lock-forensics.sh

PACKAGE=$1

if [ -z "$PACKAGE" ]; then
  echo "Usage: $0 <package-name>"
  exit 1
fi

echo "🔍 Lock File Forensics: $PACKAGE"
echo ""

# 1. When was it introduced?
echo "1️⃣  Finding when $PACKAGE was added..."
FIRST_COMMIT=$(git log --all --oneline --diff-filter=A -- package-lock.json | \
  grep -B 1 "$PACKAGE" | head -1 | awk '{print $1}')

if [ -n "$FIRST_COMMIT" ]; then
  echo "   First appearance: $FIRST_COMMIT"
  git show $FIRST_COMMIT --stat
else
  echo "   Not found in git history (may be in initial commit)"
fi

# 2. Version history
echo ""
echo "2️⃣  Version history..."
git log --all --oneline -- package-lock.json | while read commit; do
  COMMIT_SHA=$(echo $commit | awk '{print $1}')
  VERSION=$(git show $COMMIT_SHA:package-lock.json | \
    jq -r ".packages.\"node_modules/$PACKAGE\".version" 2>/dev/null)
  
  if [ -n "$VERSION" ] && [ "$VERSION" != "null" ]; then
    DATE=$(git show -s --format=%ci $COMMIT_SHA)
    AUTHOR=$(git show -s --format=%an $COMMIT_SHA)
    echo "   $DATE | $VERSION | $AUTHOR | $COMMIT_SHA"
  fi
done | head -10

# 3. Dependency path (why was it installed?)
echo ""
echo "3️⃣  Dependency path (what requires $PACKAGE)..."
npm ls $PACKAGE 2>/dev/null || echo "   Direct dependency"

# 4. Check for known vulnerabilities in historical versions
echo ""
echo "4️⃣  Vulnerability history..."
npm audit --json | jq -r ".vulnerabilities.\"$PACKAGE\" // empty"

# 5. Check if still needed
echo ""
echo "5️⃣  Current status..."
depcheck-lite --json | jq -r ".unused[] | select(.name == \"$PACKAGE\") | \"⚠️  Currently UNUSED\""

# 6. Suggest action
echo ""
echo "6️⃣  Recommendation:"
if npm audit --json | jq -e ".vulnerabilities.\"$PACKAGE\"" > /dev/null 2>&1; then
  echo "   ❌ VULNERABLE - Update or remove immediately"
  echo "   Run: npm update $PACKAGE"
elif depcheck-lite --json | jq -e ".unused[] | select(.name == \"$PACKAGE\")" > /dev/null 2>&1; then
  echo "   🗑️  UNUSED - Safe to remove"
  echo "   Run: npm uninstall $PACKAGE"
else
  echo "   ✅ USED and secure - No action needed"
fi
```

**Usage:**
```bash
# Investigate a specific package
bash scripts/lock-forensics.sh minimist

# Output:
# 🔍 Lock File Forensics: minimist
# 
# 1️⃣  Finding when minimist was added...
#    First appearance: a3f2b1c
#    Author: john@example.com
#    Date: 2021-03-15
# 
# 2️⃣  Version history...
#    2021-03-15 | 1.2.5 | John Doe | a3f2b1c
#    2022-01-10 | 1.2.6 | Jane Smith | f7d3e2a
# 
# 3️⃣  Dependency path...
#    mocha > yargs > minimist
# 
# 4️⃣  Vulnerability history...
#    CVE-2021-44906 (Critical): Prototype pollution
# 
# 5️⃣  Current status...
#    Used by mocha (devDependency)
# 
# 6️⃣  Recommendation:
#    ❌ VULNERABLE - Update or remove immediately
#    Run: npm update mocha
```

**Result:** Complete forensic analysis, understand dependency history, informed decisions.

## Pro Tips & Tricks

### Tip 1: Lock File Diff Visualization

```bash
# Compare lock files between branches
git diff main feature-branch -- package-lock.json

# But it's hard to read. Use lockcheck:
lockcheck diff --base main --current feature-branch --format visual

# Output (visual treemap):
# ┌────────────────────────────────────────┐
# │ Added (3)        │ Updated (5)         │
# │ • new-package    │ • express 4.17→4.18 │
# │ • another-pkg    │ • axios 0.27→1.4    │
# │ • third-pkg      │ ...                 │
# └────────────────────────────────────────┘
# │ Removed (2)      │ Unchanged (235)     │
# │ • old-package    │ ...                 │
# │ • legacy-pkg     │                     │
# └────────────────────────────────────────┘

# JSON format for scripting
lockcheck diff --base main --current HEAD --json > diff.json
jq '.added[] | .name' diff.json
```

### Tip 2: Lock File as Documentation

```bash
# Extract dependency info for documentation
lockcheck export --format markdown > DEPENDENCIES.md

# Generates:
# # Project Dependencies
# 
# ## Production Dependencies (15)
# 
# | Package | Version | Description |
# |---------|---------|-------------|
# | express | 4.18.2 | Web framework |
# | axios | 1.4.0 | HTTP client |
# ...
# 
# ## Development Dependencies (28)
# ...
# 
# Last updated: 2024-02-09

# Commit to repository
git add DEPENDENCIES.md
git commit -m "docs: update dependency documentation"
```

### Tip 3: Pre-release Lock File Snapshot

```bash
# Before releasing, snapshot lock file state
lockcheck snapshot --tag v1.2.3 --save

# Stored in .lockcheck-snapshots/v1.2.3.json

# Later, compare with snapshot
lockcheck compare --snapshot v1.2.3

# Output:
# Comparing current lock file with snapshot v1.2.3
# 
# Changes:
#   ✅ 5 packages updated (patch/minor)
#   ⚠️  2 packages updated (major)
#   ❌ 1 security vulnerability introduced
# 
# Recommendation: Review major updates before release
```

### Tip 4: Lock File Health Score

```bash
# Get overall health score (0-100)
SCORE=$(lockcheck health --json | jq '.score')

echo "Lock file health: $SCORE/100"

# Factors:
# - No version mismatches (+20)
# - No security vulnerabilities (+30)
# - All integrity checksums present (+20)
# - No duplicate versions (+15)
# - Recent updates (+15)

# Use in CI
if [ "$SCORE" -lt 80 ]; then
  echo "⚠️  Lock file health below threshold"
  lockcheck health --verbose
fi
```

### Tip 5: Automated Lock File Optimization

```bash
# Optimize lock file (dedupe, clean, etc.)
lockcheck optimize

# What it does:
# 1. Removes duplicate package versions
# 2. Cleans up orphaned entries
# 3. Sorts for minimal git diffs
# 4. Validates integrity

# Before:
# - Size: 2.4 MB
# - Packages: 1,243 (358 duplicates)
# - Git diff: 450 lines

# After:
# - Size: 1.8 MB (↓25%)
# - Packages: 885 (no duplicates)
# - Git diff: 12 lines
```

### Tip 6: Lock File Test Matrix

```bash
# Test lock file compatibility across Node versions
# .github/workflows/lock-test.yml

strategy:
  matrix:
    node: [16, 18, 20]
    os: [ubuntu-latest, windows-latest, macos-latest]

steps:
  - uses: actions/setup-node@v3
    with:
      node-version: ${{ matrix.node }}
  
  - name: Test lock file
    run: |
      npm ci
      lockcheck --verify-integrity
      npm test

# Ensures lock file works across environments
```

### Tip 7: Lock File Rollback

```bash
# Oh no, new lock file breaks everything!

# Quick rollback
lockcheck rollback

# What it does:
# 1. Finds last working lock file in git history
# 2. Restores it
# 3. Runs npm ci
# 4. Validates

# Or manual:
git log --oneline -- package-lock.json | head -5
# Find last good commit
git checkout abc123 -- package-lock.json
npm ci
```

### Tip 8: Lock File Metrics Over Time

```bash
# Track lock file metrics
#!/bin/bash
# scripts/track-lock-metrics.sh

DATE=$(date +%Y-%m-%d)
METRICS=$(lockcheck analyze --json)

echo "$DATE,$(echo $METRICS | jq -r '.size'),$(echo $METRICS | jq -r '.packages'),$(echo $METRICS | jq -r '.vulnerabilities')" \
  >> .lock-metrics.csv

# Visualize
gnuplot << EOF
set datafile separator ","
set xdata time
set timefmt "%Y-%m-%d"
set format x "%m/%d"
set terminal png size 1000,400
set output "lock-metrics.png"
set multiplot layout 1,3
set title "Lock File Size"
plot ".lock-metrics.csv" using 1:2 with lines
set title "Package Count"
plot ".lock-metrics.csv" using 1:3 with lines
set title "Vulnerabilities"
plot ".lock-metrics.csv" using 1:4 with lines
EOF
```

### Tip 9: Lock File Documentation Generator

```bash
# Generate human-readable lock file summary
lockcheck explain --interactive

# Interactive mode:
# ? What do you want to know about your lock file?
#   > What is express used for?
#     express@4.18.2
#     └─ Used by: src/server.js, src/routes/api.js
#     └─ Dependencies: 57 packages
#     └─ Description: Fast, unopinionated web framework
# 
#   > Why is minimist version 1.2.5 installed?
#     minimist@1.2.5
#     └─ Required by: mocha@9.2.0
#     └─ Version constraint: >=1.2.0
#     └─ ⚠️  Known vulnerability: CVE-2021-44906
# 
#   > Show me all packages using lodash
#     lodash@4.17.21
#     └─ Used by:
#        • src/utils/helpers.js
#        • src/services/data-processor.js
#        • node_modules/async/lib/internal.js
```

### Tip 10: Lock File as CI Cache Key

```bash
# Use lock file hash as cache key (better than package.json)
# .github/workflows/ci.yml

- uses: actions/cache@v3
  with:
    path: node_modules
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
    restore-keys: |
      ${{ runner.os }}-node-

# Why better than package.json:
# - package.json: ^1.0.0 (range, could install 1.0.1 or 1.0.9)
# - package-lock.json: exact version (1.0.5)
# - More accurate cache, fewer CI failures

# Pro tip: Include Node version too
key: ${{ runner.os }}-node-${{ matrix.node }}-${{ hashFiles('**/package-lock.json') }}
```

## Roadmap

- [ ] **Bun lockb support** - Support Bun's binary lock file format
- [ ] **Yarn Berry full support** - Complete Yarn v2-v4 validation
- [ ] **Custom validation rules** - `.lockcheckrc` config file
- [ ] **Dependency graph visualization** - See dependency tree
- [ ] **Lock file diff tool** - Compare lock files between branches
- [ ] **Auto-fix peer dependencies** - Resolve peer dep conflicts
- [ ] **License compliance check** - Validate package licenses
- [ ] **Supply chain security** - Detect suspicious dependencies
- [ ] **GitHub Integration** - Lock file validation GitHub App
- [ ] **VS Code extension** - Validate lock files in editor
- [ ] **Watch mode** - Continuously validate during development
- [ ] **Historical analysis** - Track lock file changes over time
- [ ] **Benchmark mode** - Compare install times before/after updates
- [ ] **Merge conflict resolver** - Auto-resolve lock file conflicts

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history.

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](../../CONTRIBUTING.md) for guidelines.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/muin-company/cli-tools.git
cd cli-tools/packages/lockcheck

# Install dependencies
npm install

# Build
npm run build

# Test
npm test

# Run locally
node dist/cli.js
```

## License

MIT © [MUIN](https://muin.company)

## Related Projects

- [@muin/depcheck-lite](../depcheck-lite) - Find unused dependencies
- [@muin/readme-gen](../readme-gen) - Generate professional README files
- [@muin/curl-to-code](../curl-to-code) - Convert curl to code in any language
- [More MUIN tools](https://muin.company/tools)

## Support

- 🐛 [Report a bug](https://github.com/muin-company/cli-tools/issues/new?template=bug_report.md)
- 💡 [Request a feature](https://github.com/muin-company/cli-tools/issues/new?template=feature_request.md)
- 💬 [Join our Discord](https://discord.gg/muin)
- 🐦 [Follow us on Twitter](https://twitter.com/muin_company)
- 📧 [Email support](mailto:support@muin.company)

## Acknowledgments

Special thanks to:
- The npm, Yarn, and pnpm teams for creating lock file formats
- The [npm audit](https://docs.npmjs.com/cli/v8/commands/npm-audit) team for security scanning
- All our [contributors](https://github.com/muin-company/cli-tools/graphs/contributors)

---

**Made with ❤️ by [MUIN](https://muin.company)** - Building AI-powered developer tools

[⬆ Back to top](#muinlockcheck)
