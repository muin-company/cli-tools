# 🛠️ MUIN CLI Tools

**10 developer CLI tools** in one monorepo — from brutally honest AI code reviews to smart dependency checks. All installable via npm.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## Overview

| Tool | Description | Install |
|------|-------------|---------|
| 🔥 [roast](./packages/roast) | Gordon Ramsay AI code reviews | `npm i -g roast-cli` |
| 📐 [json-to-types](./packages/json-to-types) | JSON → TS / Zod / Python types | `npm i -g @muin/json-to-types` |
| 🔄 [curl-to-code](./packages/curl-to-code) | curl → production-ready code | `npm i -g @muin/curl-to-code` |
| 📦 [bundlesize](./packages/bundlesize) | Bundle size analysis & tracking | `npm i -g @muin/bundlesize` |
| 🔑 [envdiff](./packages/envdiff) | Compare .env files & detect drift | `npm i -g @muin/envdiff` |
| ⚙️ [tsconfig-helper](./packages/tsconfig-helper) | Validate & optimize tsconfig | `npm i -g @muin/tsconfig-helper` |
| 📝 [readme-gen](./packages/readme-gen) | Auto-generate README files | `npm i -g @muin/readme-gen` |
| 🔍 [depcheck-lite](./packages/depcheck-lite) | Find unused/missing deps | `npm i -g @muin/depcheck-lite` |
| 🔒 [lockcheck](./packages/lockcheck) | Validate lock file integrity | `npm i -g @muin/lockcheck` |
| ⏰ [cron-explain](./packages/cron-explain) | Cron ↔ human-readable text | `npm i -g @muin/cron-explain` |

---

## Packages

### 🔥 [roast](./packages/roast) — **NEW**

Gordon Ramsay meets your IDE. Brutally honest, hilariously harsh AI code reviews from your terminal.

**Features:**
- Three intensity levels: mild → medium → brutal (Gordon Ramsay mode)
- Supports any programming language
- Actionable feedback hidden in every insult
- CI integration with JSON output

**Installation:**
```bash
npm install -g roast-cli
```

**Usage:**
```bash
roast app.js                    # Brutal by default
roast --level mild utils.py     # Be gentle
git diff --staged | roast --diff  # Roast your changes
```

---

### [@muin/json-to-types](./packages/json-to-types)

Convert JSON to TypeScript, Zod, Python types with interactive CLI.

**Features:**
- Interactive mode with live preview
- Multiple output formats (TS Interface/Type, Zod, Python TypedDict/Pydantic)
- Smart type inference (dates, nested objects, optional fields)
- Copy to clipboard or save to file

**Installation:**
```bash
npm install -g @muin/json-to-types
```

**Usage:**
```bash
json-to-types --interactive
echo '{"name":"John"}' | json-to-types
```

### [@muin/curl-to-code](./packages/curl-to-code)

Convert curl commands to production-ready code in any language.

**Features:**
- Interactive mode with live preview
- Multi-language support (Python, JS, Node, Go, PHP, Ruby)
- Production-ready code with error handling
- TypeScript types support

**Installation:**
```bash
npm install -g @muin/curl-to-code
```

**Usage:**
```bash
curl-to-code --interactive
pbpaste | curl-to-code --lang python
```

### [@muin/bundlesize](./packages/bundlesize)

Keep your JavaScript bundles in check with interactive size analysis and tracking.

**Features:**
- Bundle size analysis and tracking
- Size limit enforcement with CI integration
- Historical trends and comparison
- Treemap visualization
- Multi-bundle support

**Installation:**
```bash
npm install -g @muin/bundlesize
```

**Usage:**
```bash
bundlesize analyze dist/main.js
bundlesize check dist/main.js --max-size 200kb
```

### [@muin/envdiff](./packages/envdiff)

Compare environment files, detect missing variables, and ensure configuration consistency.

**Features:**
- Smart comparison of .env files
- Missing variable detection
- Secret detection and validation
- Multi-environment support
- Sync and template generation

**Installation:**
```bash
npm install -g @muin/envdiff
```

**Usage:**
```bash
envdiff .env.local .env.production
envdiff check .env --require .env.example
```

### [@muin/tsconfig-helper](./packages/tsconfig-helper)

Validate, optimize, and understand your TypeScript configuration with intelligent recommendations.

**Features:**
- Config validation and recommendations
- Interactive wizard for perfect configs
- Preset templates for common setups
- Migration assistant for TypeScript upgrades
- Strictness level checking

**Installation:**
```bash
npm install -g @muin/tsconfig-helper
```

**Usage:**
```bash
tsconfig-helper validate
tsconfig-helper recommend --project-type react
```

### [@muin/readme-gen](./packages/readme-gen)

Generate professional, comprehensive README files from your project.

**Features:**
- Interactive mode with smart project detection
- Pre-built templates (CLI, Library, API, Framework, Monorepo)
- Auto-generates badges, Installation, Usage, API docs
- Multi-language support (EN, KO, JA, ZH)

**Installation:**
```bash
npm install -g @muin/readme-gen
```

**Usage:**
```bash
readme-gen --interactive
readme-gen --auto
```

### [@muin/depcheck-lite](./packages/depcheck-lite)

Find unused dependencies, missing dependencies, and outdated packages.

**Features:**
- Detect unused dependencies
- Find missing dependencies
- Check for outdated packages
- Interactive mode with auto-fix

**Installation:**
```bash
npm install -g @muin/depcheck-lite
```

**Usage:**
```bash
depcheck-lite
depcheck-lite --interactive --fix
```

### [@muin/lockcheck](./packages/lockcheck)

Validate package-lock.json integrity and ensure lock file consistency.

**Features:**
- Lock file validation (npm, Yarn, pnpm)
- Integrity checksum verification
- Security vulnerability scanning
- Version mismatch detection

**Installation:**
```bash
npm install -g @muin/lockcheck
```

**Usage:**
```bash
lockcheck
lockcheck --verify-integrity --security-only
```

### [@muin/cron-explain](./packages/cron-explain)

Understand and generate cron expressions with natural language.

**Features:**
- Convert cron to human-readable text
- Generate cron from natural language
- Interactive mode with validation

**Installation:**
```bash
npm install -g @muin/cron-explain
```

**Usage:**
```bash
cron-explain "0 9 * * 1"
```

## Development

```bash
# Install dependencies
cd packages/json-to-types && npm install
cd packages/curl-to-code && npm install

# Build
npm run build

# Test
node dist/cli.js --help
```

## License

MIT © MUIN
