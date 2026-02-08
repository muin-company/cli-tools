# @muin/envdiff

[![npm version](https://img.shields.io/npm/v/@muin/envdiff.svg)](https://www.npmjs.com/package/@muin/envdiff)
[![npm downloads](https://img.shields.io/npm/dm/@muin/envdiff.svg)](https://www.npmjs.com/package/@muin/envdiff)
[![license](https://img.shields.io/npm/l/@muin/envdiff.svg)](https://github.com/muin-company/cli-tools/blob/main/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/muin-company/cli-tools/blob/main/CONTRIBUTING.md)

Compare environment files, detect missing variables, and ensure configuration consistency across environments.

## Features

- 🔍 **Smart Comparison** - Deep comparison of .env files with intelligent diff
- 🚨 **Missing Variables** - Detect missing or extra variables between environments
- 🔐 **Secret Detection** - Identify exposed secrets and sensitive data
- ✅ **Validation** - Validate env var formats (URLs, emails, ports, etc.)
- 📊 **Multi-Environment** - Compare dev, staging, production simultaneously
- 🎨 **Beautiful Output** - Color-coded, table-formatted diffs
- 🔄 **Sync Mode** - Auto-sync variables across environments
- 📝 **Template Generation** - Generate .env.example from actual .env
- 🤖 **CI Integration** - Fail CI if required variables are missing
- 📦 **Multiple Formats** - Support for .env, JSON, YAML, and more

## Installation

```bash
npm install -g @muin/envdiff
```

Or use directly with npx:

```bash
npx @muin/envdiff
```

## Quick Start

```bash
# Compare two env files
envdiff .env.local .env.production

# Interactive mode
envdiff --interactive

# Check for missing variables
envdiff check .env --require .env.example

# Generate .env.example from .env
envdiff generate .env --output .env.example
```

## Usage

### Interactive Mode (Recommended)

```bash
envdiff --interactive
```

The interactive mode provides:
1. File selection (auto-detect or manual)
2. Comparison mode (diff, missing, secrets, validate)
3. Output format selection (table, json, markdown)
4. Sync wizard for applying changes
5. Template generation options

### CLI Mode

```bash
# Basic comparison
envdiff .env.local .env.production

# Check for missing variables
envdiff check .env --require .env.example

# Validate environment file
envdiff validate .env

# Find secrets/sensitive data
envdiff secrets .env

# Sync variables from source to target
envdiff sync .env.local .env.staging --dry-run

# Generate template file
envdiff generate .env --output .env.example --mask-values

# Compare multiple environments
envdiff compare .env.dev .env.staging .env.prod
```

### Options

#### Global Options
- `-i, --interactive` - Launch interactive mode
- `-f, --format <type>` - Output format: `table`, `json`, `markdown`, `text`
- `-q, --quiet` - Suppress non-error output
- `-v, --verbose` - Show detailed output
- `--no-color` - Disable colored output

#### Comparison Options
- `-k, --keys-only` - Compare only keys (ignore values)
- `-s, --show-values` - Show actual values (default: masked)
- `--ignore-comments` - Skip comment-only differences
- `--ignore-case` - Case-insensitive key comparison

#### Check Options
- `-r, --require <file>` - Required variables template file
- `--strict` - Fail on any difference
- `--allow-extra` - Allow extra variables not in template

#### Validation Options
- `--validate-urls` - Check if URL variables are valid
- `--validate-emails` - Check email format
- `--validate-ports` - Check port numbers (1-65535)
- `--validate-booleans` - Check boolean values (true/false/1/0)

#### Secret Detection Options
- `--detect-secrets` - Scan for exposed secrets
- `--secret-patterns <file>` - Custom regex patterns for secrets
- `--entropy-threshold <num>` - High-entropy string threshold (default: 4.5)

#### Sync Options
- `--dry-run` - Preview changes without applying
- `--merge` - Merge instead of replace
- `--backup` - Create backup before syncing

## Examples

### Example 1: Basic Diff Comparison

**.env.local:**
```bash
DATABASE_URL=postgres://localhost:5432/dev
API_KEY=sk_test_1234567890
NODE_ENV=development
DEBUG=true
PORT=3000
```

**.env.production:**
```bash
DATABASE_URL=postgres://prod-db.example.com:5432/prod
API_KEY=sk_live_abcdefghij
NODE_ENV=production
# DEBUG is intentionally removed
PORT=8080
CACHE_ENABLED=true
```

**Command:**
```bash
envdiff .env.local .env.production
```

**Output:**
```
🔍 Environment Diff: .env.local → .env.production

╭─────────────────────────────────────────────────────────────────╮
│  Summary                                                        │
├─────────────────────────────────────────────────────────────────┤
│  Total variables:        5 → 5                                  │
│  Modified:               4                                      │
│  Added:                  1  (CACHE_ENABLED)                     │
│  Removed:                1  (DEBUG)                             │
│  Unchanged:              1  (NODE_ENV key)                      │
╰─────────────────────────────────────────────────────────────────╯

╭─────────────────────────────────────────────────────────────────╮
│  Differences                                                    │
├─────────────────────────────────────────────────────────────────┤
│  Variable          │ .env.local        │ .env.production      │
│  ──────────────────┼───────────────────┼────────────────────  │
│  DATABASE_URL      │ postgres://...    │ postgres://...       │
│                    │ localhost:5432    │ prod-db.exam...      │
│                    │ /dev              │ /prod                │
│                    │                   │                      │
│  API_KEY           │ sk_test_******    │ sk_live_******       │
│                    │                   │                      │
│  NODE_ENV          │ development       │ production           │
│                    │                   │                      │
│  PORT              │ 3000              │ 8080                 │
│                    │                   │                      │
│  DEBUG             │ true              │ [REMOVED]            │
│                    │                   │                      │
│  CACHE_ENABLED     │ [NOT SET]         │ true                 │
╰─────────────────────────────────────────────────────────────────╯

⚠️  1 variable removed, 1 variable added
ℹ️  Use --show-values to see full values (secrets will be masked)
```

### Example 2: Check for Missing Required Variables

**.env.example:**
```bash
DATABASE_URL=
API_KEY=
REDIS_URL=
SMTP_HOST=
SMTP_PORT=
NODE_ENV=
```

**.env:**
```bash
DATABASE_URL=postgres://localhost:5432/dev
API_KEY=sk_test_1234
NODE_ENV=development
```

**Command:**
```bash
envdiff check .env --require .env.example --strict
```

**Output:**
```
❌ Environment Check Failed

╭─────────────────────────────────────────────────────────────────╮
│  Missing Required Variables                                     │
├─────────────────────────────────────────────────────────────────┤
│  ❌ REDIS_URL          Required by .env.example                │
│  ❌ SMTP_HOST          Required by .env.example                │
│  ❌ SMTP_PORT          Required by .env.example                │
╰─────────────────────────────────────────────────────────────────╯

╭─────────────────────────────────────────────────────────────────╮
│  Present Variables                                              │
├─────────────────────────────────────────────────────────────────┤
│  ✅ DATABASE_URL       Set                                      │
│  ✅ API_KEY            Set                                      │
│  ✅ NODE_ENV           Set                                      │
╰─────────────────────────────────────────────────────────────────╯

Summary: 3/6 required variables present (50%)

Fix this issue:
  1. Copy missing variables from .env.example
  2. Set appropriate values for your environment
  3. Run: envdiff check .env --require .env.example

Command exited with code 1
```

### Example 3: Secret Detection

**.env:**
```bash
DATABASE_URL=postgres://user:password123@localhost:5432/db
AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
STRIPE_SECRET_KEY=sk_live_EXAMPLE_KEY_NOT_REAL_DO_NOT_USE
API_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.EXAMPLE_TOKEN_NOT_REAL
GITHUB_TOKEN=ghp_EXAMPLE_TOKEN_1234567890_NOT_REAL
```

**Command:**
```bash
envdiff secrets .env
```

**Output:**
```
🔐 Secret Detection Report

╭─────────────────────────────────────────────────────────────────╮
│  Detected Secrets (5 found)                                     │
├─────────────────────────────────────────────────────────────────┤
│  Variable               │ Type           │ Risk   │ Issue      │
│  ───────────────────────┼────────────────┼────────┼──────────  │
│  DATABASE_URL           │ Database Creds │ 🔴 HIGH │ Password  │
│                         │                │        │ in URL     │
│                         │                │        │            │
│  AWS_SECRET_ACCESS_KEY  │ AWS Credential │ 🔴 HIGH │ Live key  │
│                         │                │        │ detected   │
│                         │                │        │            │
│  STRIPE_SECRET_KEY      │ Stripe Live    │ 🔴 HIGH │ Live mode │
│                         │                │        │ secret     │
│                         │                │        │            │
│  API_TOKEN              │ JWT Token      │ 🟡 MED  │ Long-lived│
│                         │                │        │ token      │
│                         │                │        │            │
│  GITHUB_TOKEN           │ GitHub PAT     │ 🟡 MED  │ Personal  │
│                         │                │        │ token      │
╰─────────────────────────────────────────────────────────────────╯

╭─────────────────────────────────────────────────────────────────╮
│  Recommendations                                                │
├─────────────────────────────────────────────────────────────────┤
│  1. DATABASE_URL: Use separate env vars for credentials         │
│     - Split into: DB_HOST, DB_USER, DB_PASS                     │
│                                                                 │
│  2. AWS_SECRET_ACCESS_KEY: Rotate this key immediately          │
│     - This appears to be exposed in version control             │
│     - Use AWS Secrets Manager or SSM Parameter Store            │
│                                                                 │
│  3. STRIPE_SECRET_KEY: Never commit live keys to git            │
│     - Use test keys (sk_test_...) for development               │
│     - Store live keys in secure vault (1Password, AWS Secrets)  │
│                                                                 │
│  4. API_TOKEN: Consider short-lived tokens instead              │
│     - Rotate tokens regularly (max 90 days)                     │
│     - Use OAuth refresh tokens if possible                      │
│                                                                 │
│  5. GITHUB_TOKEN: Use GitHub App installation tokens            │
│     - Limit scope to minimum required permissions              │
│     - Set expiration dates on personal access tokens            │
╰─────────────────────────────────────────────────────────────────╯

🔒 Security Score: 2/10 (Critical issues found)

Next steps:
  1. Add .env to .gitignore (if not already)
  2. Check git history: git log --all --full-history -- .env
  3. Rotate all exposed secrets immediately
  4. Use a secret management service for production
```

### Example 4: Validation

**.env:**
```bash
DATABASE_URL=not-a-valid-url
API_PORT=99999
DEBUG=yes
EMAIL=invalid-email
REDIS_URL=redis://localhost:6379
NODE_ENV=production
```

**Command:**
```bash
envdiff validate .env --validate-urls --validate-ports --validate-emails --validate-booleans
```

**Output:**
```
🔎 Validation Report

╭─────────────────────────────────────────────────────────────────╮
│  Validation Errors (3 found)                                    │
├─────────────────────────────────────────────────────────────────┤
│  Variable       │ Value           │ Issue                       │
│  ───────────────┼─────────────────┼─────────────────────────    │
│  DATABASE_URL   │ not-a-valid-url │ ❌ Invalid URL format       │
│                 │                 │ Expected: protocol://...    │
│                 │                 │                             │
│  API_PORT       │ 99999           │ ❌ Invalid port number      │
│                 │                 │ Must be 1-65535             │
│                 │                 │                             │
│  EMAIL          │ invalid-email   │ ❌ Invalid email format     │
│                 │                 │ Missing @ or domain         │
╰─────────────────────────────────────────────────────────────────╯

╭─────────────────────────────────────────────────────────────────╮
│  Validation Warnings (1 found)                                  │
├─────────────────────────────────────────────────────────────────┤
│  Variable       │ Value           │ Issue                       │
│  ───────────────┼─────────────────┼─────────────────────────    │
│  DEBUG          │ yes             │ ⚠️  Non-standard boolean    │
│                 │                 │ Recommended: true/false     │
╰─────────────────────────────────────────────────────────────────╯

╭─────────────────────────────────────────────────────────────────╮
│  Valid Variables (2 passed)                                     │
├─────────────────────────────────────────────────────────────────┤
│  ✅ REDIS_URL       Valid URL (redis://localhost:6379)         │
│  ✅ NODE_ENV        Valid value (production)                   │
╰─────────────────────────────────────────────────────────────────╯

Summary: 2/6 variables passed validation (33%)

Fix these issues to pass validation.
Command exited with code 1
```

### Example 5: Multi-Environment Comparison

**Command:**
```bash
envdiff compare .env.dev .env.staging .env.production
```

**Output:**
```
📊 Multi-Environment Comparison

╭─────────────────────────────────────────────────────────────────────────────╮
│  Variable Matrix                                                            │
├─────────────────────────────────────────────────────────────────────────────┤
│  Variable          │ Development  │ Staging      │ Production   │ Status    │
│  ──────────────────┼──────────────┼──────────────┼──────────────┼───────────│
│  DATABASE_URL      │ localhost    │ stage-db     │ prod-db      │ ✅ All set│
│  API_KEY           │ sk_test_***  │ sk_test_***  │ sk_live_***  │ ✅ All set│
│  NODE_ENV          │ development  │ staging      │ production   │ ✅ All set│
│  DEBUG             │ true         │ false        │ false        │ ✅ All set│
│  PORT              │ 3000         │ 3000         │ 8080         │ ✅ All set│
│  CACHE_ENABLED     │ false        │ true         │ true         │ ✅ All set│
│  REDIS_URL         │ [NOT SET]    │ redis://...  │ redis://...  │ ⚠️  Missing│
│  CDN_URL           │ [NOT SET]    │ [NOT SET]    │ cdn.exam...  │ ⚠️  Partial│
│  SENTRY_DSN        │ [NOT SET]    │ https://...  │ https://...  │ ⚠️  Partial│
╰─────────────────────────────────────────────────────────────────────────────╯

╭─────────────────────────────────────────────────────────────────╮
│  Environment Summary                                            │
├─────────────────────────────────────────────────────────────────┤
│  Development   (6 variables):  6 set, 3 missing from others    │
│  Staging       (8 variables):  8 set, 1 missing from dev       │
│  Production    (9 variables):  9 set, 2 missing from dev       │
╰─────────────────────────────────────────────────────────────────╯

╭─────────────────────────────────────────────────────────────────╮
│  Recommendations                                                │
├─────────────────────────────────────────────────────────────────┤
│  1. Add REDIS_URL to development environment                    │
│     - Needed for local cache testing                            │
│                                                                 │
│  2. Consider adding CDN_URL to dev/staging                      │
│     - For testing asset delivery                                │
│                                                                 │
│  3. Add SENTRY_DSN to development (optional)                    │
│     - Helps catch errors in dev before production               │
╰─────────────────────────────────────────────────────────────────╯
```

### Example 6: Template Generation

**Command:**
```bash
envdiff generate .env --output .env.example --mask-values
```

**.env:**
```bash
DATABASE_URL=postgres://user:password@localhost:5432/mydb
API_KEY=sk_live_1234567890abcdef
SMTP_USER=noreply@example.com
SMTP_PASS=secret123
PORT=3000
```

**Generated .env.example:**
```bash
# Generated from .env on 2026-02-08
# Copy this file to .env and fill in your actual values

# Database connection URL
DATABASE_URL=

# API authentication key
API_KEY=

# SMTP email configuration
SMTP_USER=
SMTP_PASS=

# Application port
PORT=3000
```

**Command with hints:**
```bash
envdiff generate .env --output .env.example --keep-structure
```

**Generated .env.example (with hints):**
```bash
# Generated from .env on 2026-02-08

# Database connection URL (format: postgres://user:pass@host:port/db)
DATABASE_URL=postgres://user:password@localhost:5432/mydb

# API authentication key (format: sk_*)
API_KEY=sk_live_YOUR_KEY_HERE

# SMTP email configuration
SMTP_USER=your-email@example.com
SMTP_PASS=your-smtp-password

# Application port (default: 3000)
PORT=3000
```

### Example 7: Sync Environments

**Command (dry run):**
```bash
envdiff sync .env.production .env.staging --dry-run
```

**Output:**
```
🔄 Sync Preview: .env.production → .env.staging

╭─────────────────────────────────────────────────────────────────╮
│  Changes to be applied                                          │
├─────────────────────────────────────────────────────────────────┤
│  Action  │ Variable          │ Current      │ New Value         │
│  ────────┼───────────────────┼──────────────┼───────────────    │
│  UPDATE  │ DATABASE_URL      │ stage-db...  │ prod-db...        │
│  UPDATE  │ REDIS_URL         │ local redis  │ prod redis        │
│  ADD     │ CDN_URL           │ [NOT SET]    │ cdn.example...    │
│  REMOVE  │ DEBUG_VERBOSE     │ true         │ [WILL REMOVE]     │
╰─────────────────────────────────────────────────────────────────╯

⚠️  This is a DRY RUN. No changes will be applied.

Summary:
  • 2 variables will be updated
  • 1 variable will be added
  • 1 variable will be removed

To apply these changes, run:
  envdiff sync .env.production .env.staging --backup
```

**Command (apply):**
```bash
envdiff sync .env.production .env.staging --backup
```

**Output:**
```
🔄 Syncing environments...

✅ Backup created: .env.staging.backup.2026-02-08-160445

Applying changes:
  ✅ Updated DATABASE_URL
  ✅ Updated REDIS_URL
  ✅ Added CDN_URL
  ✅ Removed DEBUG_VERBOSE

✅ Sync complete!

.env.staging has been updated with 4 changes.
Backup available at: .env.staging.backup.2026-02-08-160445

Review changes:
  git diff .env.staging
```

### Example 8: Interactive Mode Flow

**Command:**
```bash
envdiff --interactive
```

**Output:**
```
╭─────────────────────────────────────────────────────────╮
│  🔧 envdiff - Environment Configuration Manager         │
│  Compare, validate, and sync .env files                 │
╰─────────────────────────────────────────────────────────╯

? What would you like to do?
  ❯ Compare two environment files
    Check for missing variables
    Validate environment file
    Detect secrets and sensitive data
    Sync environments
    Generate .env.example template
    Multi-environment comparison

? Select first file:
  ❯ .env
    .env.local
    .env.development
    .env.production
    .env.staging
    Browse for file...

? Select second file:
    .env
    .env.local
  ❯ .env.production
    .env.staging
    Browse for file...

? What do you want to see?
  ◉ Show differences
  ◉ Show missing variables
  ◯ Show unchanged variables
  ◉ Detect secrets

? Output format:
  ❯ Table (pretty-printed)
    JSON (for scripts)
    Markdown (for docs)
    Text (plain)

? Value display:
  ❯ Masked (hide secrets)
    Full values (show all)
    Keys only (ignore values)

╭─── Comparison Results ──────────────────────────────────╮
│  [Results displayed here as shown in previous examples] │
╰─────────────────────────────────────────────────────────╯

? What would you like to do next?
  ❯ Save report to file
    Sync the differences
    Generate .env.example
    Start a new comparison
    Exit

? Save as:
  report.md  ✅ Saved!

Thanks for using envdiff! 🎉
```

### Example 9: CI/CD Integration

**.github/workflows/env-check.yml:**
```yaml
name: Environment Check

on:
  pull_request:
    paths:
      - '.env.example'
      - '.env.**'

jobs:
  check-env:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Check required variables
        run: npx @muin/envdiff check .env.example --require .env.example --strict

      - name: Detect secrets
        run: npx @muin/envdiff secrets .env.example --fail-on-secrets

      - name: Validate format
        run: npx @muin/envdiff validate .env.example --validate-urls --validate-ports
```

**Command:**
```bash
envdiff check .env.example --require .env.example --strict
```

**Output (success):**
```
✅ Environment check passed!

All required variables are documented in .env.example
No secrets detected
All values pass validation

Safe to merge.
```

**Output (failure):**
```
❌ Environment check failed!

Issues found:
  • 3 required variables missing from .env.example
  • 1 potential secret detected (STRIPE_SECRET_KEY)
  • 2 validation errors

See details above. Fix these issues before merging.
Command exited with code 1
```

## Supported File Formats

| Format | Extension | Support | Notes |
|--------|-----------|---------|-------|
| Dotenv | `.env` | ✅ Full | Standard format |
| JSON | `.json` | ✅ Full | Nested objects supported |
| YAML | `.yaml`, `.yml` | ✅ Full | Nested structure |
| TOML | `.toml` | ✅ Full | Common for Rust/Go projects |
| Properties | `.properties` | ✅ Full | Java-style |
| XML | `.xml` | ⚠️ Partial | Flat structure only |
| ini | `.ini` | ✅ Full | Classic config format |

## Common Use Cases

### 1. **Prevent Missing Env Vars in Production**
Most common production outage cause - missing environment variable:

**Setup:**
```bash
# In CI/CD before deploy
envdiff check .env.production --require .env.example --strict
```

**Real scenario:**
```
Developer adds new feature requiring STRIPE_WEBHOOK_SECRET
❌ Forgot to add to production .env
❌ Deploy succeeds
❌ Feature breaks in production
✅ With envdiff: CI fails immediately
```

### 2. **Onboarding New Developers**
Help new team members set up their environment:

```bash
# Generate template with hints
envdiff generate .env.production --output .env.example --keep-structure

# New developer checks what's missing
envdiff check .env --require .env.example
```

**Output:**
```
❌ Missing: DATABASE_URL, REDIS_URL, API_KEY
ℹ️  Copy .env.example to .env and fill in these values
```

### 3. **Audit Environment Security**
Regular security audits of environment files:

```bash
# Weekly cron job
envdiff secrets .env.* --detect-secrets --entropy-threshold 4.0
```

**Catches:**
- Accidentally committed API keys
- Hardcoded passwords
- JWT tokens in plaintext
- AWS credentials

### 4. **Deployment Validation**
Before deploying to production:

```bash
# Validate production config
envdiff validate .env.production --validate-urls --validate-ports

# Compare with staging
envdiff compare .env.staging .env.production
```

**Catches:**
- Wrong database URLs
- Test API keys in production
- Missing required variables
- Port conflicts

### 5. **Multi-Environment Consistency**
Ensure all environments have required variables:

```bash
envdiff compare .env.dev .env.staging .env.production --keys-only
```

**Use case:**
```
Added FEATURE_FLAG_NEW_UI to dev and staging
❌ Forgot to add to production
✅ envdiff shows: "FEATURE_FLAG_NEW_UI missing from production"
```

### 6. **Generate Documentation**
Auto-generate environment variable documentation:

```bash
envdiff generate .env --format markdown --output ENV_VARS.md
```

**Generates:**
```markdown
# Environment Variables

## Required Variables

- `DATABASE_URL` - Database connection string (postgres://...)
- `API_KEY` - Third-party API authentication
- `REDIS_URL` - Redis cache connection

## Optional Variables

- `DEBUG` - Enable debug logging (default: false)
- `PORT` - Server port (default: 3000)
```

### 7. **Config Migration**
Migrate from old config format to new:

```bash
# Old: config.json
# New: .env

envdiff convert config.json --to dotenv --output .env
```

## Why This Tool?

### The Problem

**Scenario 1: The Friday Deploy**

You deploy to production on Friday afternoon...

```bash
git push production main
# Deploy succeeds ✅
# App crashes immediately ❌
```

**Error logs:**
```
Error: Environment variable STRIPE_WEBHOOK_SECRET is not defined
```

**What happened:**
- Added STRIPE_WEBHOOK_SECRET to .env.local last week
- Works fine in development
- Forgot to add to production .env
- No validation before deploy
- Production is down

**Time to fix:** 30 minutes (emergency fix + rollback + hotfix)

**With envdiff:**
```bash
# In CI before deploy
envdiff check .env.production --require .env.example --strict
❌ Missing: STRIPE_WEBHOOK_SECRET
🚫 Deploy blocked

# Fix before it reaches production
```

**Time saved:** 30 minutes + stress + potential revenue loss

---

**Scenario 2: The Security Breach**

Developer accidentally commits `.env` to git...

```bash
git add .
git commit -m "Quick fix"
git push
```

**.env contains:**
```
AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCY
STRIPE_SECRET_KEY=sk_live_51H8aBcDeFgHiJkLmNo
```

**What happened:**
- Secrets exposed in git history
- Public repo → secrets leaked to internet
- Need to rotate ALL secrets
- Potential unauthorized access

**Cost:** Hours of work + security risk + possible data breach

**With envdiff:**
```bash
# Pre-commit hook
envdiff secrets .env --fail-on-secrets
❌ Detected 2 high-risk secrets in .env
🚫 Commit blocked

Detected secrets:
  • AWS_SECRET_ACCESS_KEY
  • STRIPE_SECRET_KEY (LIVE MODE!)

Add .env to .gitignore before committing.
```

**Crisis averted:** 100% of security breach prevented

### The Benefits

- 🚨 **Prevent outages** - Catch missing variables before deploy
- 🔒 **Security** - Detect secrets before they leak
- ⏱️ **Save time** - Automated checking vs manual verification
- 👥 **Team alignment** - Everyone has the same required vars
- 📝 **Documentation** - Auto-generated variable documentation
- 🔄 **Consistency** - Ensure dev/staging/prod parity

## Common Gotchas & Troubleshooting

### Issue: "Cannot parse .env file"

**Cause:** Invalid .env syntax or special characters

**Solution:**
```bash
# Check syntax
cat .env

# Common issues:
# ❌ Unquoted values with spaces
API_KEY=my key here

# ✅ Quote values with spaces
API_KEY="my key here"

# ❌ Unescaped special characters
PASSWORD=my$password

# ✅ Use quotes to escape
PASSWORD='my$password'

# Validate syntax
envdiff validate .env --check-syntax
```

### Issue: False positive secret detection

**Cause:** High entropy threshold or pattern match

**Solution:**
```bash
# Increase entropy threshold
envdiff secrets .env --entropy-threshold 5.0

# Ignore specific patterns
echo "EXAMPLE_TOKEN" >> .envdiff-ignore
envdiff secrets .env

# Use custom patterns
envdiff secrets .env --secret-patterns custom-patterns.json
```

### Issue: Multi-line values not working

**Cause:** .env format doesn't support multi-line well

**Solution:**
```bash
# ❌ Multi-line in .env (doesn't work)
PRIVATE_KEY=-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQ...
-----END PRIVATE KEY-----

# ✅ Use escaped newlines
PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQ...\n-----END PRIVATE KEY-----"

# ✅ Or use a file reference
PRIVATE_KEY_PATH=/path/to/key.pem

# ✅ Or use JSON format instead
envdiff compare config.json config.production.json
```

### Issue: Variables not detected as different

**Cause:** Whitespace or invisible characters

**Solution:**
```bash
# Show invisible characters
cat -A .env

# Trim whitespace
envdiff compare .env.local .env.prod --ignore-whitespace

# Show character-by-character diff
envdiff compare .env.local .env.prod --verbose
```

### Issue: Sync overwrites important values

**Cause:** No backup or wrong sync direction

**Solution:**
```bash
# ❌ Dangerous - no backup
envdiff sync .env.dev .env.production

# ✅ Always use --dry-run first
envdiff sync .env.dev .env.production --dry-run

# ✅ Create backup
envdiff sync .env.dev .env.production --backup

# ✅ Merge instead of replace
envdiff sync .env.dev .env.production --merge

# ✅ Manual review
envdiff compare .env.dev .env.production > diff.txt
# Review diff.txt before syncing
```

### Issue: Template generation includes secrets

**Cause:** Not using --mask-values flag

**Solution:**
```bash
# ❌ Exposes values
envdiff generate .env --output .env.example

# ✅ Mask all values
envdiff generate .env --output .env.example --mask-values

# ✅ Keep structure but hide secrets
envdiff generate .env --output .env.example --mask-secrets

# Check before committing
envdiff secrets .env.example --fail-on-secrets
```

### Issue: Comments get lost during sync

**Cause:** Sync replaces entire file

**Solution:**
```bash
# Use merge mode to preserve comments
envdiff sync .env.source .env.target --merge --preserve-comments

# Or manually copy comments
envdiff compare .env.source .env.target --show-comments > diff.txt
# Review and manually edit
```

### Issue: CI fails but variables look the same

**Cause:** Different variable names (case sensitivity)

**Solution:**
```bash
# Check exact key names
envdiff compare .env.example .env --verbose

# Common issue:
# .env.example has: database_url
# .env has: DATABASE_URL

# Use case-insensitive mode
envdiff check .env --require .env.example --ignore-case

# Or fix the naming:
envdiff check .env --require .env.example --suggest-fixes
```

### Issue: JSON/YAML files not recognized

**Cause:** Need explicit format specification

**Solution:**
```bash
# Auto-detect usually works
envdiff compare config.json config.prod.json

# Explicitly specify format
envdiff compare config.yaml config.prod.yaml --format yaml

# Convert between formats
envdiff convert config.json --to dotenv --output .env
```

### Issue: Nested variables in JSON not compared

**Cause:** Dotenv doesn't support nesting

**Solution:**
```bash
# Use JSON mode for nested comparison
envdiff compare config.json config.prod.json --format json

# Or flatten for .env comparison
envdiff compare config.json --flatten --to dotenv
# Converts:
# { "db": { "host": "localhost" } }
# To: DB_HOST=localhost
```

### Issue: Too many false warnings

**Cause:** Checking development vs production

**Solution:**
```bash
# Ignore expected differences
echo "DEBUG" >> .envdiff-ignore
echo "CACHE_ENABLED" >> .envdiff-ignore

# Or use environment-specific checks
envdiff check .env.production --require .env.example --allow-extra

# Only check critical variables
envdiff check .env.production --require critical-vars.txt
```

## Performance Tips

### Tip 1: Cache validation results

```bash
# First run: slow (validates everything)
envdiff validate .env --cache

# Subsequent runs: fast (uses cache)
envdiff validate .env --cache

# Clear cache when env changes
envdiff validate .env --clear-cache
```

### Tip 2: Compare keys only for speed

```bash
# Faster - ignores values
envdiff compare .env.local .env.prod --keys-only

# Slower - compares values and validates
envdiff compare .env.local .env.prod --show-values --validate
```

### Tip 3: Use JSON output for scripting

```bash
# Parse in scripts
MISSING=$(envdiff check .env --require .env.example --format json | jq '.missing | length')

if [ "$MISSING" -gt 0 ]; then
  echo "Missing $MISSING variables"
  exit 1
fi
```

### Tip 4: Batch validation

```bash
# Instead of multiple commands
envdiff validate .env --validate-urls
envdiff validate .env --validate-ports
envdiff validate .env --validate-emails

# Do once
envdiff validate .env --validate-all
```

### Tip 5: Skip expensive operations

```bash
# Skip secret detection for speed
envdiff compare .env.local .env.prod --no-secret-detection

# Skip validation
envdiff compare .env.local .env.prod --no-validation

# Fastest possible comparison
envdiff compare .env.local .env.prod --keys-only --no-validation --no-secret-detection
```

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history.

## Roadmap

### v1.1.0 (Next)
- [ ] VS Code extension for inline .env validation
- [ ] Auto-fix common issues (suggest commands)
- [ ] Integration with secret managers (AWS Secrets, 1Password, Vault)
- [ ] Browser-based GUI for non-technical users

### v1.2.0
- [ ] Kubernetes ConfigMap/Secret comparison
- [ ] Docker Compose env file support
- [ ] Terraform variable file comparison
- [ ] Environment variable precedence analysis

### v2.0.0
- [ ] Real-time sync across environments
- [ ] Collaborative environment management (team mode)
- [ ] Encrypted environment files
- [ ] Change history and rollback
- [ ] Integration with CI platforms (GitHub Actions, GitLab CI)

### Future Ideas
- [ ] AI-powered secret detection (ML model)
- [ ] Auto-generate variable descriptions from code usage
- [ ] Dependency graph (which code uses which vars)
- [ ] Cost calculator (cloud resource variables)
- [ ] Variable usage analytics

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](../../CONTRIBUTING.md) for guidelines.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/muin-company/cli-tools.git
cd cli-tools/packages/envdiff

# Install dependencies
npm install

# Build
npm run build

# Test
npm test

# Run locally
node dist/cli.js .env.example .env
```

## FAQ

**Q: Does this tool expose my secrets in output?**  
A: No, all secret values are masked by default. Use `--show-values` only when needed (never in CI).

**Q: Can I use this with Kubernetes?**  
A: Yes! Export ConfigMap/Secret to file, then compare. Direct K8s support coming in v1.2.0.

**Q: What about encrypted .env files?**  
A: Decrypt first, then compare. Native encryption support planned for v2.0.

**Q: Can this detect all types of secrets?**  
A: Detects common patterns (AWS keys, API tokens, JWTs). Use `--secret-patterns` for custom patterns.

**Q: Is there a GUI version?**  
A: Use `--interactive` for TUI. Web GUI coming in v1.1.0.

**Q: Can I compare more than two files?**  
A: Yes! Use `envdiff compare .env.* ` for multi-file comparison.

**Q: How do I ignore specific variables?**  
A: Create `.envdiff-ignore` file (gitignore syntax) or use `--ignore` flag.

**Q: Does this work with monorepos?**  
A: Yes! Specify paths: `envdiff compare apps/api/.env packages/web/.env`

**Q: Can I run this in CI without installing?**  
A: Yes! `npx @muin/envdiff check .env --require .env.example`

**Q: What's the difference between check and validate?**  
A: `check` compares against a template. `validate` checks value formats (URLs, ports, etc.).

## License

MIT © [MUIN](https://muin.company)

## Related Projects

- [@muin/bundlesize](../bundlesize) - Track JavaScript bundle sizes
- [@muin/tsconfig-helper](../tsconfig-helper) - Validate TypeScript configurations
- [dotenv](https://github.com/motdotla/dotenv) - Load .env files
- [envinfo](https://github.com/tabrindle/envinfo) - System environment info
- [More MUIN tools](https://muin.company/tools)

## Support

- 🐛 [Report a bug](https://github.com/muin-company/cli-tools/issues/new?template=bug_report.md)
- 💡 [Request a feature](https://github.com/muin-company/cli-tools/issues/new?template=feature_request.md)
- 💬 [Join our Discord](https://discord.gg/muin)
- 🐦 [Follow us on Twitter](https://twitter.com/muin_company)

---

**Made with ❤️ by [MUIN](https://muin.company)** - Building AI-powered developer tools

[⬆ Back to top](#muin/envdiff)
