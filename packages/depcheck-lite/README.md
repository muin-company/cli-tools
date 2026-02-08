# @muin/depcheck-lite

[![npm version](https://img.shields.io/npm/v/@muin/depcheck-lite.svg)](https://www.npmjs.com/package/@muin/depcheck-lite)
[![npm downloads](https://img.shields.io/npm/dm/@muin/depcheck-lite.svg)](https://www.npmjs.com/package/@muin/depcheck-lite)
[![license](https://img.shields.io/npm/l/@muin/depcheck-lite.svg)](https://github.com/muin-company/cli-tools/blob/main/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/muin-company/cli-tools/blob/main/CONTRIBUTING.md)

Lightweight dependency checker - Find unused dependencies, missing dependencies, and outdated packages with an interactive CLI.

## Features

- 🔍 **Unused Dependencies** - Detect dependencies declared but never imported
- ⚠️ **Missing Dependencies** - Find imports without corresponding package.json entries
- 📦 **Outdated Packages** - Check for available updates with semver analysis
- 🎨 **Interactive Mode** - Visual UI with checkboxes to remove unused deps
- ⚡ **Fast Scanning** - Lightweight alternative to depcheck (~10x faster)
- 🎯 **Smart Detection** - Understands dynamic imports, require(), and TypeScript
- 📊 **Detailed Reports** - JSON, table, or summary output formats
- 🔧 **Auto-Fix** - Remove unused dependencies with one command
- 🚫 **Ignore Patterns** - Skip certain packages or directories
- 💾 **Cache Support** - Speed up repeated checks

## Installation

```bash
npm install -g @muin/depcheck-lite
```

Or use directly with npx:

```bash
npx @muin/depcheck-lite
```

## Quick Start

The fastest way to check your project:

```bash
cd your-project
depcheck-lite
```

Interactive mode with auto-fix:

```bash
depcheck-lite --interactive --fix
```

## Usage

### Interactive Mode (Recommended)

```bash
depcheck-lite --interactive
```

The interactive mode will:
1. Scan your project for dependencies
2. Show unused, missing, and outdated packages
3. Let you select which dependencies to remove
4. Apply changes to package.json
5. Optionally run npm install

### CLI Mode

```bash
# Basic scan (current directory)
depcheck-lite

# Scan specific directory
depcheck-lite ./packages/my-app

# Auto-remove unused dependencies
depcheck-lite --fix

# Check for outdated packages
depcheck-lite --check-outdated

# Output as JSON
depcheck-lite --json

# Ignore specific packages
depcheck-lite --ignore "react,lodash"

# Scan with custom ignore patterns
depcheck-lite --ignore-dirs "build,dist,coverage"
```

### Options

#### Scan Options
- `-d, --dir <path>` - Directory to check (default: current directory)
- `-i, --interactive` - Launch interactive mode with visual UI
- `--ignore <packages>` - Comma-separated list of packages to ignore
- `--ignore-dirs <dirs>` - Directories to skip (default: node_modules, dist, build)
- `--include-dev` - Check devDependencies (default: true)
- `--skip-missing` - Don't check for missing dependencies

#### Action Options
- `--fix` - Automatically remove unused dependencies
- `--check-outdated` - Check for outdated packages
- `--update` - Update outdated packages (interactive)
- `--dry-run` - Show what would be changed without modifying files

#### Output Options
- `-j, --json` - Output results as JSON
- `--format <type>` - Output format: `table`, `list`, `summary`, `json` (default: table)
- `-v, --verbose` - Show detailed scanning information
- `-q, --quiet` - Only show errors
- `--no-color` - Disable colored output

## Examples

### Example 1: Basic Dependency Check

**Project structure:**
```
my-app/
├── package.json
├── src/
│   ├── index.js
│   └── utils.js
└── node_modules/
```

**package.json:**
```json
{
  "dependencies": {
    "express": "^4.18.0",
    "lodash": "^4.17.21",
    "axios": "^1.4.0",
    "moment": "^2.29.4"
  }
}
```

**src/index.js:**
```javascript
const express = require('express');
const axios = require('axios');

// Using express and axios
```

**src/utils.js:**
```javascript
// No imports
```

**Command:**
```bash
depcheck-lite
```

**Output:**
```
╭────────────────────────────────────────────────────────╮
│  📦 Dependency Check - my-app                          │
╰────────────────────────────────────────────────────────╯

Scanning project...
✓ Found package.json
✓ Scanned 2 source files
✓ Analyzed 4 dependencies

Results:

🔴 Unused Dependencies (2):
  • lodash (^4.17.21)
    ├─ Declared in package.json
    └─ Never imported in code

  • moment (^2.29.4)
    ├─ Declared in package.json
    └─ Never imported in code

✅ Used Dependencies (2):
  • express (^4.18.0)
  • axios (^1.4.0)

Summary:
  Dependencies: 4 total
  ✓ Used: 2
  ✗ Unused: 2
  ⚠ Missing: 0

💡 Tip: Run with --fix to remove unused dependencies
💡 Tip: Run with --interactive for guided cleanup

Potential savings: ~2.4 MB (node_modules)
```

### Example 2: Interactive Mode with Auto-Fix

```bash
$ depcheck-lite --interactive

╭────────────────────────────────────────────────────────╮
│  📦 Dependency Check - Interactive Mode                │
╰────────────────────────────────────────────────────────╯

✓ Scanning project... (2 files)
✓ Analyzing dependencies...

Found 2 unused dependencies:

? Select dependencies to remove (Space to select, Enter to confirm):
  ◉ lodash (^4.17.21) - Last used: never
  ◉ moment (^2.29.4) - Last used: never
  ◯ Keep all unused dependencies

? Also check for outdated packages? (Y/n) y

Checking for updates...
✓ Checked 4 packages

Found 1 outdated dependency:

  • axios: ^1.4.0 → 1.6.2 (minor update available)

? Update outdated packages? (Y/n) y

? What would you like to do?
  ❯ 🗑️  Remove selected unused (2)
    📦 Update outdated (1)
    💾 Save changes to package.json
    ▶️  Run npm install
    ❌ Cancel

Removing dependencies...
✓ Removed lodash from package.json
✓ Removed moment from package.json

Updating dependencies...
✓ Updated axios to ^1.6.2

? Run npm install now? (Y/n) y

Running npm install...
✓ Dependencies installed

Summary:
  ✓ Removed 2 unused dependencies
  ✓ Updated 1 package
  💾 Saved ~2.4 MB

Your project is now optimized! 🎉
```

### Example 3: Detect Missing Dependencies

**src/app.js:**
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
```

**package.json:**
```json
{
  "dependencies": {
    "react": "^18.0.0"
  }
}
```

**Command:**
```bash
depcheck-lite
```

**Output:**
```
╭────────────────────────────────────────────────────────╮
│  📦 Dependency Check                                   │
╰────────────────────────────────────────────────────────╯

✓ Scanned 1 source files

Results:

⚠️  Missing Dependencies (2):
  • react-dom
    ├─ Imported in: src/app.js:2
    └─ Not declared in package.json
    └─ Install: npm install react-dom

  • lodash
    ├─ Imported in: src/app.js:3
    └─ Not declared in package.json
    └─ Install: npm install lodash

✅ Used Dependencies (1):
  • react (^18.0.0)

Summary:
  Dependencies: 1 declared
  ⚠ Missing: 2

❌ Your project may fail at runtime!

💡 Quick fix:
npm install react-dom lodash
```

### Example 4: Check Outdated Packages

**Command:**
```bash
depcheck-lite --check-outdated
```

**Output:**
```
╭────────────────────────────────────────────────────────╮
│  📦 Outdated Package Check                             │
╰────────────────────────────────────────────────────────╯

Checking npm registry...
✓ Checked 15 packages

Outdated Dependencies:

┌─────────────────┬──────────┬──────────┬──────────┬──────────┐
│ Package         │ Current  │ Wanted   │ Latest   │ Type     │
├─────────────────┼──────────┼──────────┼──────────┼──────────┤
│ express         │ 4.17.1   │ 4.18.2   │ 4.18.2   │ minor ⚠️  │
│ axios           │ 0.27.2   │ 0.27.2   │ 1.6.2    │ major 🔴 │
│ lodash          │ 4.17.20  │ 4.17.21  │ 4.17.21  │ patch ✅ │
│ typescript      │ 4.9.5    │ 4.9.5    │ 5.3.3    │ major 🔴 │
└─────────────────┴──────────┴──────────┴──────────┴──────────┘

Legend:
  ✅ patch - Safe to update (bug fixes only)
  ⚠️  minor - Usually safe (new features, backward compatible)
  🔴 major - Breaking changes (review changelog)

Summary:
  Total: 15 packages
  Up-to-date: 11
  Outdated: 4
    └─ Patch: 1
    └─ Minor: 1
    └─ Major: 2

💡 Update safe patches: npm update
💡 Update specific: npm install express@latest
💡 Interactive update: depcheck-lite --interactive --update
```

### Example 5: Monorepo Support

**Project structure:**
```
monorepo/
├── package.json
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
# Check all packages
depcheck-lite --workspaces

# Or check specific package
depcheck-lite --dir packages/app
```

**Output:**
```
╭────────────────────────────────────────────────────────╮
│  📦 Workspace Dependency Check                         │
╰────────────────────────────────────────────────────────╯

Scanning workspaces...
✓ Found 3 packages

┌─────────────────┬────────┬────────┬─────────┐
│ Package         │ Used   │ Unused │ Missing │
├─────────────────┼────────┼────────┼─────────┤
│ @mono/app       │ 8      │ 2      │ 1       │
│ @mono/lib       │ 12     │ 0      │ 0       │
│ @mono/utils     │ 5      │ 1      │ 0       │
└─────────────────┴────────┴────────┴─────────┘

Details:

@mono/app:
  🔴 Unused: lodash, moment
  ⚠️  Missing: react-router-dom

@mono/lib:
  ✅ All dependencies used

@mono/utils:
  🔴 Unused: axios

💡 Fix all: depcheck-lite --workspaces --fix
```

### Example 6: CI/CD Integration

**GitHub Actions workflow:**
```yaml
# .github/workflows/dependency-check.yml
name: Dependency Check

on: [pull_request]

jobs:
  depcheck:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Check dependencies
        run: npx @muin/depcheck-lite --json > depcheck-result.json
      
      - name: Fail if unused dependencies found
        run: |
          UNUSED=$(jq '.unused | length' depcheck-result.json)
          if [ "$UNUSED" -gt 0 ]; then
            echo "❌ Found $UNUSED unused dependencies!"
            jq '.unused' depcheck-result.json
            exit 1
          fi
          echo "✅ No unused dependencies"
      
      - name: Comment on PR
        if: failure()
        uses: actions/github-script@v6
        with:
          script: |
            const fs = require('fs');
            const result = JSON.parse(fs.readFileSync('depcheck-result.json'));
            const unused = result.unused.map(d => `- ${d.name}`).join('\n');
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: `## 📦 Dependency Check Failed\n\nUnused dependencies:\n${unused}\n\nRun \`depcheck-lite --fix\` to remove them.`
            });
```

**Output on PR:**
```
📦 Dependency Check Failed

Unused dependencies:
- lodash
- moment

Run `depcheck-lite --fix` to remove them.
```

### Example 7: Custom Ignore Patterns

**Command:**
```bash
# Ignore specific packages (keep even if unused)
depcheck-lite --ignore "webpack,@types/*"

# Ignore directories
depcheck-lite --ignore-dirs "build,dist,coverage,storybook"

# Ignore file patterns
depcheck-lite --ignore-patterns "*.test.js,*.spec.ts"
```

**.depcheckrc:**
```json
{
  "ignoreMatches": [
    "webpack",
    "@types/*",
    "eslint-*"
  ],
  "ignoreDirs": [
    "build",
    "dist",
    "coverage"
  ],
  "ignorePatterns": [
    "*.test.js",
    "*.spec.ts",
    "*.stories.tsx"
  ],
  "skipMissing": false,
  "includeDev": true
}
```

**Command:**
```bash
depcheck-lite
# Reads .depcheckrc automatically
```

### Example 8: JSON Output for Scripts

**Command:**
```bash
depcheck-lite --json > deps.json
```

**Output (deps.json):**
```json
{
  "dependencies": {
    "total": 15,
    "used": 12,
    "unused": 3,
    "missing": 1
  },
  "unused": [
    {
      "name": "lodash",
      "version": "^4.17.21",
      "type": "dependencies"
    },
    {
      "name": "moment",
      "version": "^2.29.4",
      "type": "dependencies"
    },
    {
      "name": "@types/jest",
      "version": "^29.0.0",
      "type": "devDependencies"
    }
  ],
  "used": [
    {
      "name": "express",
      "version": "^4.18.0",
      "files": ["src/server.js", "src/routes/index.js"]
    }
  ],
  "missing": [
    {
      "name": "react-router-dom",
      "importedIn": "src/App.tsx:5"
    }
  ],
  "outdated": [
    {
      "name": "axios",
      "current": "1.4.0",
      "wanted": "1.4.0",
      "latest": "1.6.2",
      "type": "minor"
    }
  ]
}
```

**Use in script:**
```bash
#!/bin/bash
depcheck-lite --json > result.json

UNUSED=$(jq '.dependencies.unused' result.json)

if [ "$UNUSED" -gt 0 ]; then
  echo "Warning: $UNUSED unused dependencies found"
  jq -r '.unused[].name' result.json
fi
```

### Example 9: Comparing Before/After

**Before cleanup:**
```bash
$ depcheck-lite

Dependencies: 25 total
✓ Used: 18
✗ Unused: 7
Total size: 45.2 MB
```

**Clean up:**
```bash
$ depcheck-lite --fix

Removing 7 unused dependencies...
✓ Removed lodash
✓ Removed moment
✓ Removed request
✓ Removed async
✓ Removed underscore
✓ Removed jquery
✓ Removed backbone

Running npm prune...
✓ Cleaned node_modules

Saved: 12.8 MB
```

**After cleanup:**
```bash
$ depcheck-lite

Dependencies: 18 total
✓ Used: 18
✗ Unused: 0
Total size: 32.4 MB

✅ All dependencies are being used!
```

## Supported Import Styles

| Import Style | Supported | Example |
|--------------|-----------|---------|
| ES6 import | ✅ | `import React from 'react'` |
| Named imports | ✅ | `import { useState } from 'react'` |
| Namespace imports | ✅ | `import * as fs from 'fs'` |
| CommonJS require | ✅ | `const express = require('express')` |
| Dynamic import | ✅ | `const mod = await import('module')` |
| TypeScript import | ✅ | `import type { User } from './types'` |
| Type-only imports | ✅ | `import type { Props } from 'react'` |
| Side-effect imports | ✅ | `import 'styles.css'` |
| Conditional require | ⚠️ | `if (dev) require('devtool')` - Detected but marked uncertain |
| Webpack require | ⚠️ | `require.context(...)` - Partial support |
| String templates | ❌ | `require(\`./\${name}\`)` - Cannot analyze dynamic strings |

## Use Cases

### 1. **Project Health Check**

Before releasing or deploying:

```bash
# Quick health check
depcheck-lite

# Fix all issues
depcheck-lite --fix --update
```

**Why:** Reduce bundle size, faster installs, fewer security vulnerabilities.

### 2. **CI/CD Quality Gate**

Block PRs with dependency issues:

```bash
# In CI pipeline
depcheck-lite --json > deps.json
if [ $(jq '.dependencies.unused' deps.json) -gt 0 ]; then
  echo "❌ PR blocked: unused dependencies"
  exit 1
fi
```

**Result:** Enforce clean dependencies across team.

### 3. **Monorepo Maintenance**

Keep all packages clean:

```bash
# Check all workspaces
depcheck-lite --workspaces --fix

# Or in Lerna/Nx script
lerna exec -- depcheck-lite --fix
```

**Impact:** Consistent dependencies, easier maintenance.

### 4. **Onboarding Legacy Projects**

Inherited a messy codebase?

```bash
# See the damage
depcheck-lite --verbose

# Clean up unused deps
depcheck-lite --fix

# Update outdated packages
depcheck-lite --check-outdated --update
```

**Before:** 50+ deps, 200MB node_modules  
**After:** 30 deps, 120MB node_modules

### 5. **Pre-commit Hook**

Keep dependencies clean automatically:

```bash
# .husky/pre-commit
#!/bin/sh
depcheck-lite --quiet || {
  echo "⚠️  Unused dependencies detected. Run: depcheck-lite --interactive"
  exit 1
}
```

### 6. **Bundle Size Optimization**

Reduce production bundle:

```bash
# Find unused deps
depcheck-lite --ignore-dev

# Remove them
depcheck-lite --fix --ignore-dev

# Rebuild
npm run build
```

**Result:** Smaller bundles, faster page loads.

### 7. **Security Audit Preparation**

Before running `npm audit`:

```bash
# Remove unused deps (fewer vulnerabilities to fix)
depcheck-lite --fix

# Update outdated
depcheck-lite --update

# Then audit
npm audit
```

**Why:** Fewer dependencies = smaller attack surface.

## Troubleshooting

### Issue: "False positive - package is marked unused but I'm using it"

**Cause:** Dynamic imports or non-standard usage patterns

**Solution:**
```bash
# Add to ignore list
depcheck-lite --ignore "my-package"

# Or create .depcheckrc
echo '{"ignoreMatches": ["my-package"]}' > .depcheckrc

# Common false positives:
# - Webpack loaders (css-loader, style-loader)
# - Babel plugins (@babel/plugin-*)
# - ESLint configs (eslint-config-*)
# - Type packages (@types/*)
```

### Issue: "Missing dependencies not detected"

**Cause:** Import uses alias or path mapping (TypeScript paths, Webpack aliases)

**Solution:**
```bash
# Check tsconfig.json or webpack.config.js for path mappings
# depcheck-lite doesn't resolve aliases by default

# Workaround: Resolve aliases manually
# Or use --verbose to see what's scanned
depcheck-lite --verbose

# Future versions will support tsconfig paths
```

### Issue: "Scan is very slow on large projects"

**Cause:** Scanning too many files (node_modules, build artifacts)

**Solution:**
```bash
# Ignore build directories
depcheck-lite --ignore-dirs "dist,build,coverage,storybook,.next"

# Use cache
depcheck-lite --cache

# Skip node_modules (default, but make sure)
depcheck-lite --ignore-dirs "node_modules"

# Limit depth
depcheck-lite --max-depth 5
```

### Issue: "--fix flag removes package I need"

**Cause:** Package used in non-standard way (config files, CLI, etc.)

**Solution:**
```bash
# Don't use --fix blindly! Review first:
depcheck-lite  # Review unused list

# Remove specific packages only:
npm uninstall lodash moment

# Or use interactive mode:
depcheck-lite --interactive
# Uncheck packages you want to keep
```

### Issue: "devDependencies marked as unused"

**Cause:** devDependencies are for build tools, not imported in code

**Solution:**
```bash
# This is expected! Dev deps are often not imported:
# - webpack, babel, typescript (used by CLI)
# - jest, mocha (test runners)
# - eslint, prettier (linters)

# Skip dev dependency check:
depcheck-lite --skip-dev

# Or ignore specific dev tools:
depcheck-lite --ignore "webpack,babel,eslint,prettier,jest"
```

### Issue: "Missing dependency error but package is installed"

**Cause:** Package installed but not in package.json (manual install, legacy)

**Solution:**
```bash
# Check what's actually installed
ls node_modules/ | grep package-name

# If installed but not in package.json:
npm install package-name --save

# If it's a peer dependency:
npm install package-name --save-peer
```

### Issue: "TypeScript type packages marked as unused"

**Cause:** Type packages (@types/*) are imported implicitly

**Solution:**
```bash
# Ignore all type packages by default
depcheck-lite --ignore "@types/*"

# Or in .depcheckrc:
{
  "ignoreMatches": ["@types/*"]
}

# Note: depcheck-lite v2+ will auto-ignore @types by default
```

### Issue: "Outdated check fails with network error"

**Cause:** npm registry unreachable or rate limiting

**Solution:**
```bash
# Use cache
depcheck-lite --check-outdated --use-cache

# Increase timeout
depcheck-lite --check-outdated --timeout 30000

# Skip outdated check
depcheck-lite

# Check manually with npm outdated
npm outdated
```

### Issue: "JSON output is empty"

**Cause:** No issues found (good!) or scan failed silently

**Solution:**
```bash
# Check exit code
depcheck-lite --json > result.json
echo $?  # 0 = success, 1 = errors

# Use verbose mode
depcheck-lite --json --verbose

# Check if package.json exists
ls package.json

# Check JSON validity
depcheck-lite --json | jq .
```

### Issue: "Interactive mode doesn't show anything"

**Cause:** Terminal doesn't support TTY or no unused deps found

**Solution:**
```bash
# Check if deps are clean
depcheck-lite  # Non-interactive first

# Force TTY
script -q /dev/null depcheck-lite --interactive

# Or use CLI mode
depcheck-lite --fix

# Check terminal
echo $TERM  # Should show terminal type
```

### Issue: "Permission denied when running --fix"

**Cause:** No write access to package.json or node_modules

**Solution:**
```bash
# Check permissions
ls -la package.json

# Fix permissions
chmod +w package.json

# Or run with sudo (not recommended)
sudo depcheck-lite --fix

# Better: Fix ownership
sudo chown -R $USER:$USER .
```

## Performance Tips

### Tip 1: Use Cache for Repeated Checks

```bash
# First run (slow)
depcheck-lite --cache

# Subsequent runs (fast - uses cache)
depcheck-lite --cache

# Cache stored in .depcheck-cache.json
# Invalidates automatically when files change
```

### Tip 2: Ignore Large Directories

```bash
# Skip unnecessary scanning
depcheck-lite --ignore-dirs "dist,build,.next,coverage,storybook,docs"

# Or in .depcheckrc:
{
  "ignoreDirs": ["dist", "build", ".next", "coverage"]
}
```

### Tip 3: Limit Depth for Deep Projects

```bash
# Only scan top 3 levels
depcheck-lite --max-depth 3

# Speeds up large monorepos significantly
```

### Tip 4: Use --skip-missing for Faster Checks

```bash
# Only check unused dependencies (fastest)
depcheck-lite --skip-missing

# Missing dependency check is slower (requires parsing all imports)
```

### Tip 5: Batch Monorepo Checks with Parallelization

```bash
# Install GNU parallel
brew install parallel

# Check all packages in parallel
ls packages | parallel 'cd packages/{} && depcheck-lite --quiet'

# Or with Lerna
lerna exec --parallel -- depcheck-lite --quiet
```

## FAQ

### Q: How is this different from the original `depcheck`?

A: `depcheck-lite` is designed to be:
- **Faster**: ~10x faster by avoiding unnecessary analysis
- **Lighter**: Fewer dependencies, smaller install size
- **Interactive**: Built-in UI for reviewing and fixing issues
- **Modern**: Supports latest ES6+, TypeScript, dynamic imports

Both tools have similar goals but different trade-offs. Use `depcheck` for more advanced analysis, `depcheck-lite` for speed and simplicity.

### Q: Can it detect dependencies used only in scripts (package.json)?

A: Not yet. Dependencies used in npm scripts (like `webpack`, `eslint`) are often not imported in code. It's on the roadmap. For now, use `--ignore` to skip these.

### Q: Will --fix break my project?

A: `--fix` only modifies package.json and runs `npm prune`. It won't delete source code. However, always:
1. Review unused list first
2. Use `--dry-run` to preview changes
3. Commit your changes before running --fix
4. Test your app after cleanup

### Q: Does it work with Yarn/pnpm?

A: Yes! It reads package.json (universal) and works with any package manager. Just use your package manager's commands after:
- npm: `npm install`
- Yarn: `yarn install`
- pnpm: `pnpm install`

### Q: Can I use this in a pre-commit hook?

A: Yes! But use `--quiet` mode to avoid blocking commits unnecessarily:
```bash
depcheck-lite --quiet || echo "⚠️  Unused dependencies detected"
```

Don't use `--fix` in pre-commit (too aggressive). Use it manually or in CI.

### Q: Why are peer dependencies marked as unused?

A: Peer dependencies are expected to be installed by the consumer, not imported in your code. This is normal. Ignore them:
```bash
depcheck-lite --ignore-peer-deps
```

### Q: How do I check only production dependencies?

A: Use `--skip-dev`:
```bash
depcheck-lite --skip-dev
```

This only checks `dependencies`, not `devDependencies`.

### Q: Can it fix missing dependencies automatically?

A: Not yet. It will show you what's missing and suggest the install command. Auto-install is risky (might install wrong versions). Manual install is safer.

### Q: Does it work with TypeScript?

A: Yes! It understands TypeScript imports, including type-only imports:
```typescript
import type { User } from './types';  // ✅ Detected
```

### Q: What about monorepos with workspaces?

A: Use `--workspaces` flag:
```bash
depcheck-lite --workspaces
```

Supports npm workspaces, Yarn workspaces, and Lerna.

### Q: Can I customize the output format?

A: Yes! Use `--format`:
```bash
depcheck-lite --format table   # Default
depcheck-lite --format list    # Simple list
depcheck-lite --format summary # Just counts
depcheck-lite --format json    # Machine-readable
```

## Roadmap

- [ ] **Automatic --fix for missing deps** - Install missing packages automatically
- [ ] **Path alias resolution** - Support TypeScript paths and Webpack aliases
- [ ] **Script dependency detection** - Check deps used in npm scripts
- [ ] **Duplicate dependency detection** - Find multiple versions of same package
- [ ] **Peer dependency validation** - Check peer dep compatibility
- [ ] **License checking** - Detect license issues
- [ ] **Security vulnerability detection** - Integrate with npm audit
- [ ] **Dependency graph visualization** - See how deps are used
- [ ] **Watch mode** - Continuously check during development
- [ ] **VS Code extension** - Check deps from editor
- [ ] **Git hooks integration** - Built-in Husky setup
- [ ] **Metrics tracking** - Track dependency trends over time
- [ ] **Team dashboard** - Visualize team's dependency health
- [ ] **AI-powered suggestions** - Recommend better alternatives

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history.

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](../../CONTRIBUTING.md) for guidelines.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/muin-company/cli-tools.git
cd cli-tools/packages/depcheck-lite

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

- [@muin/lockcheck](../lockcheck) - Validate package-lock.json integrity
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
- The [depcheck](https://github.com/depcheck/depcheck) project for inspiration
- All our [contributors](https://github.com/muin-company/cli-tools/graphs/contributors)

---

**Made with ❤️ by [MUIN](https://muin.company)** - Building AI-powered developer tools

[⬆ Back to top](#muindepcheck-lite)
