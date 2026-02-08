# CLI Tools Integration Guide

> **How to combine MUIN CLI tools for powerful development workflows**

This guide shows you how to integrate multiple MUIN CLI tools into your daily development workflow. While each tool is powerful on its own, combining them creates automation that saves hours of manual work.

## Table of Contents

- [Quick Start](#quick-start)
- [Common Workflows](#common-workflows)
  - [1. Project Setup & Initialization](#1-project-setup--initialization)
  - [2. API Integration Workflow](#2-api-integration-workflow)
  - [3. Pre-commit Quality Checks](#3-pre-commit-quality-checks)
  - [4. CI/CD Pipeline Integration](#4-cicd-pipeline-integration)
  - [5. Dependency Health Monitoring](#5-dependency-health-monitoring)
  - [6. Documentation Generation](#6-documentation-generation)
  - [7. Type Safety Workflow](#7-type-safety-workflow)
  - [8. Scheduled Task Management](#8-scheduled-task-management)
- [Shell Scripts](#shell-scripts)
- [GitHub Actions](#github-actions)
- [Performance Tips](#performance-tips)
- [Best Practices](#best-practices)

---

## Quick Start

Install all tools globally for easy access:

```bash
npm install -g @muin/json-to-types \
               @muin/curl-to-code \
               @muin/readme-gen \
               @muin/depcheck-lite \
               @muin/lockcheck \
               @muin/cron-explain
```

Verify installation:

```bash
json-to-types --version
curl-to-code --version
readme-gen --version
depcheck-lite --version
lockcheck --version
cron-explain --version
```

---

## Common Workflows

### 1. Project Setup & Initialization

**Scenario:** Starting a new project and need to set up dependencies, documentation, and verify everything works.

#### Workflow Steps

```bash
#!/bin/bash
# new-project-setup.sh

PROJECT_NAME=$1
TEMPLATE=${2:-library}  # cli, library, api, framework, monorepo

echo "🚀 Setting up new project: $PROJECT_NAME"

# 1. Create project directory
mkdir -p "$PROJECT_NAME" && cd "$PROJECT_NAME"

# 2. Initialize npm project
npm init -y

# 3. Install common dependencies
npm install typescript @types/node --save-dev

# 4. Generate comprehensive README
echo "📝 Generating README..."
readme-gen --template "$TEMPLATE" --auto

# 5. Check for any dependency issues
echo "🔍 Checking dependencies..."
depcheck-lite --interactive

# 6. Verify lock file integrity
echo "🔒 Verifying lock file..."
lockcheck --verify-integrity

echo "✅ Project setup complete!"
echo "Next steps:"
echo "  - Review README.md"
echo "  - Update package.json metadata"
echo "  - Add your code"
```

**Usage:**

```bash
chmod +x new-project-setup.sh
./new-project-setup.sh my-awesome-lib cli
```

**What this does:**
- Creates project structure
- Generates professional README with badges
- Validates dependencies from the start
- Ensures lock file consistency

---

### 2. API Integration Workflow

**Scenario:** You're integrating a third-party API. You have curl examples from their docs, need to convert them to code, and generate TypeScript types for responses.

#### Real-World Example: Stripe API Integration

**Step 1:** Test API endpoint with curl

```bash
curl https://api.stripe.com/v1/charges \
  -u sk_test_YOUR_KEY: \
  -d amount=2000 \
  -d currency=usd \
  -d source=tok_visa \
  -d description="Charge for test@example.com"
```

**Step 2:** Convert curl to production code

```bash
# Copy the curl command and convert it
pbpaste | curl-to-code --lang typescript --output src/stripe/create-charge.ts
```

Generates:

```typescript
// src/stripe/create-charge.ts
import fetch from 'node-fetch';

interface CreateChargeRequest {
  amount: number;
  currency: string;
  source: string;
  description?: string;
}

async function createCharge(data: CreateChargeRequest) {
  try {
    const response = await fetch('https://api.stripe.com/v1/charges', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        amount: data.amount.toString(),
        currency: data.currency,
        source: data.source,
        ...(data.description && { description: data.description }),
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating charge:', error);
    throw error;
  }
}

export { createCharge };
```

**Step 3:** Generate types from API response

```bash
# Save a sample response to response.json, then:
cat response.json | json-to-types --format zod --output src/stripe/charge-schema.ts
```

Generates:

```typescript
// src/stripe/charge-schema.ts
import { z } from 'zod';

export const ChargeSchema = z.object({
  id: z.string(),
  object: z.literal('charge'),
  amount: z.number(),
  currency: z.string(),
  description: z.string().nullable(),
  status: z.enum(['succeeded', 'pending', 'failed']),
  created: z.number(),
  // ... more fields
});

export type Charge = z.infer<typeof ChargeSchema>;
```

#### Complete Script

```bash
#!/bin/bash
# api-integration.sh - Automate API integration

API_NAME=$1
CURL_FILE=$2
RESPONSE_FILE=$3

echo "🔌 Integrating API: $API_NAME"

# 1. Convert curl to TypeScript
echo "📝 Generating TypeScript client..."
cat "$CURL_FILE" | curl-to-code --lang typescript --output "src/${API_NAME}/client.ts"

# 2. Generate types from response
echo "🎯 Generating Zod schema..."
cat "$RESPONSE_FILE" | json-to-types --format zod --output "src/${API_NAME}/schema.ts"

# 3. Check for missing dependencies
echo "🔍 Checking dependencies..."
depcheck-lite --check

# 4. Update README with API docs
echo "📖 Updating documentation..."
readme-gen --update-api

echo "✅ API integration complete!"
echo "Generated files:"
echo "  - src/${API_NAME}/client.ts"
echo "  - src/${API_NAME}/schema.ts"
```

**Usage:**

```bash
./api-integration.sh stripe stripe-curl.txt stripe-response.json
```

---

### 3. Pre-commit Quality Checks

**Scenario:** Before committing code, you want to ensure dependencies are clean, types are valid, and nothing is broken.

#### Git Pre-commit Hook

Create `.git/hooks/pre-commit`:

```bash
#!/bin/bash
# .git/hooks/pre-commit

echo "🔍 Running pre-commit checks..."

# 1. Check for unused dependencies
echo "📦 Checking dependencies..."
if ! depcheck-lite --unused-only; then
  echo "❌ Found unused dependencies. Run 'depcheck-lite --interactive --fix' to clean up."
  exit 1
fi

# 2. Verify lock file integrity
echo "🔒 Verifying lock file..."
if ! lockcheck --verify-integrity; then
  echo "❌ Lock file integrity check failed. Run 'npm install' to fix."
  exit 1
fi

# 3. Check if README needs updating
if git diff --cached --name-only | grep -q "package.json"; then
  echo "📝 package.json changed, consider updating README..."
  # Optionally auto-update:
  # readme-gen --update-install
fi

echo "✅ All pre-commit checks passed!"
```

Make it executable:

```bash
chmod +x .git/hooks/pre-commit
```

#### Alternative: Husky Integration

Install Husky:

```bash
npm install --save-dev husky
npx husky install
npx husky add .husky/pre-commit "npm run precommit"
```

Add to `package.json`:

```json
{
  "scripts": {
    "precommit": "depcheck-lite --unused-only && lockcheck --verify-integrity"
  }
}
```

---

### 4. CI/CD Pipeline Integration

**Scenario:** Automate quality checks in your CI/CD pipeline to catch issues before deployment.

#### GitHub Actions Workflow

Create `.github/workflows/quality-check.yml`:

```yaml
name: Quality Check

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  dependency-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install MUIN CLI Tools
        run: |
          npm install -g @muin/depcheck-lite @muin/lockcheck
      
      - name: Install dependencies
        run: npm ci
      
      - name: Check for unused dependencies
        run: depcheck-lite --unused-only --exit-code
      
      - name: Check for missing dependencies
        run: depcheck-lite --missing-only --exit-code
      
      - name: Verify lock file integrity
        run: lockcheck --verify-integrity --strict
      
      - name: Security scan
        run: lockcheck --security-only --exit-code
      
      - name: Check for outdated packages
        run: depcheck-lite --outdated --severity major
        continue-on-error: true

  documentation-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install readme-gen
        run: npm install -g @muin/readme-gen
      
      - name: Validate README
        run: |
          readme-gen --validate
          if [ $? -ne 0 ]; then
            echo "README is outdated. Run 'readme-gen --update' locally."
            exit 1
          fi

  type-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: TypeScript check
        run: npm run type-check
```

#### GitLab CI Integration

Create `.gitlab-ci.yml`:

```yaml
stages:
  - validate
  - test
  - deploy

variables:
  NODE_VERSION: "18"

dependency-check:
  stage: validate
  image: node:${NODE_VERSION}
  before_script:
    - npm install -g @muin/depcheck-lite @muin/lockcheck
  script:
    - depcheck-lite --unused-only --exit-code
    - depcheck-lite --missing-only --exit-code
    - lockcheck --verify-integrity --strict
  cache:
    paths:
      - node_modules/

security-scan:
  stage: validate
  image: node:${NODE_VERSION}
  before_script:
    - npm install -g @muin/lockcheck
  script:
    - lockcheck --security-only --exit-code
  allow_failure: true

readme-validation:
  stage: validate
  image: node:${NODE_VERSION}
  before_script:
    - npm install -g @muin/readme-gen
  script:
    - readme-gen --validate || echo "README needs update"
  allow_failure: true
```

---

### 5. Dependency Health Monitoring

**Scenario:** Regularly monitor project dependencies to prevent technical debt and security issues.

#### Automated Weekly Check

```bash
#!/bin/bash
# dependency-health-check.sh

PROJECT_DIR=$1
REPORT_FILE="${PROJECT_DIR}/dependency-report-$(date +%Y%m%d).md"

cd "$PROJECT_DIR" || exit 1

echo "# Dependency Health Report - $(date +%Y-%m-%d)" > "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

echo "## Unused Dependencies" >> "$REPORT_FILE"
depcheck-lite --unused-only --format markdown >> "$REPORT_FILE" 2>&1
echo "" >> "$REPORT_FILE"

echo "## Missing Dependencies" >> "$REPORT_FILE"
depcheck-lite --missing-only --format markdown >> "$REPORT_FILE" 2>&1
echo "" >> "$REPORT_FILE"

echo "## Outdated Packages" >> "$REPORT_FILE"
depcheck-lite --outdated --format markdown >> "$REPORT_FILE" 2>&1
echo "" >> "$REPORT_FILE"

echo "## Security Vulnerabilities" >> "$REPORT_FILE"
lockcheck --security-only --format markdown >> "$REPORT_FILE" 2>&1
echo "" >> "$REPORT_FILE"

echo "## Lock File Integrity" >> "$REPORT_FILE"
lockcheck --verify-integrity --format markdown >> "$REPORT_FILE" 2>&1

echo "✅ Report generated: $REPORT_FILE"

# Optionally send to Slack/Discord
if [ -n "$WEBHOOK_URL" ]; then
  curl -X POST "$WEBHOOK_URL" \
    -H 'Content-Type: application/json' \
    -d "{\"text\":\"Dependency health report available: $REPORT_FILE\"}"
fi
```

#### Cron Job Setup

```bash
# Explain the schedule first
cron-explain "0 9 * * MON"
# Output: Every Monday at 9:00 AM

# Add to crontab
crontab -e
# Add this line:
# 0 9 * * MON /path/to/dependency-health-check.sh /path/to/project
```

Or use the tool to generate the cron expression:

```bash
cron-explain --generate "every monday at 9am"
# Output: 0 9 * * 1
```

---

### 6. Documentation Generation

**Scenario:** Keep documentation synchronized with code changes automatically.

#### Auto-update on Changes

```bash
#!/bin/bash
# update-docs.sh

echo "📚 Updating documentation..."

# 1. Regenerate README
readme-gen --update-all

# 2. If package.json changed, update installation instructions
if git diff --name-only | grep -q "package.json"; then
  readme-gen --update-install
fi

# 3. If new API endpoints added, update API docs
if git diff --name-only | grep -q "src/api/"; then
  readme-gen --update-api
fi

# 4. Check for missing docs
missing_docs=$(readme-gen --check-missing)
if [ -n "$missing_docs" ]; then
  echo "⚠️  Missing documentation for:"
  echo "$missing_docs"
fi

echo "✅ Documentation updated!"
```

#### Watch Mode for Development

```bash
#!/bin/bash
# watch-docs.sh - Auto-update README when files change

echo "👀 Watching for changes..."

# Using fswatch (install: brew install fswatch)
fswatch -o package.json src/ | while read; do
  echo "📝 Changes detected, updating README..."
  readme-gen --update-all --silent
  echo "✅ README updated at $(date +%H:%M:%S)"
done
```

---

### 7. Type Safety Workflow

**Scenario:** Working with external APIs or JSON data and need to maintain type safety across your codebase.

#### API Response to Types Pipeline

```bash
#!/bin/bash
# api-to-types.sh

API_ENDPOINT=$1
OUTPUT_DIR=${2:-src/types}
TYPE_NAME=${3:-APIResponse}

echo "🎯 Fetching and generating types from: $API_ENDPOINT"

# 1. Fetch API response
RESPONSE=$(curl -s "$API_ENDPOINT")

# 2. Generate TypeScript interface
echo "$RESPONSE" | json-to-types \
  --format interface \
  --name "$TYPE_NAME" \
  --output "$OUTPUT_DIR/${TYPE_NAME}.ts"

# 3. Generate Zod schema for runtime validation
echo "$RESPONSE" | json-to-types \
  --format zod \
  --name "${TYPE_NAME}Schema" \
  --output "$OUTPUT_DIR/${TYPE_NAME}.schema.ts"

# 4. Generate Python types if needed
if [ -d "python/" ]; then
  echo "$RESPONSE" | json-to-types \
    --format pydantic \
    --name "$TYPE_NAME" \
    --output "python/types/${TYPE_NAME}.py"
fi

# 5. Check if new dependencies were added
depcheck-lite --missing-only

echo "✅ Types generated!"
echo "  - TypeScript: $OUTPUT_DIR/${TYPE_NAME}.ts"
echo "  - Zod: $OUTPUT_DIR/${TYPE_NAME}.schema.ts"
```

**Usage:**

```bash
./api-to-types.sh "https://api.github.com/users/octocat" src/github GitHubUser
```

#### Batch Convert JSON Files

```bash
#!/bin/bash
# batch-json-to-types.sh

JSON_DIR=$1
OUTPUT_DIR=${2:-src/types}

mkdir -p "$OUTPUT_DIR"

echo "🔄 Converting JSON files to TypeScript types..."

for json_file in "$JSON_DIR"/*.json; do
  filename=$(basename "$json_file" .json)
  type_name=$(echo "$filename" | sed -r 's/(^|_)([a-z])/\U\2/g')  # Convert to PascalCase
  
  echo "  → $filename → ${type_name}"
  
  cat "$json_file" | json-to-types \
    --format interface \
    --name "$type_name" \
    --output "$OUTPUT_DIR/${filename}.types.ts"
done

echo "✅ Converted $(find "$JSON_DIR" -name "*.json" | wc -l) files"
```

---

### 8. Scheduled Task Management

**Scenario:** Managing cron jobs across multiple servers and need to document what each job does.

#### Cron Documentation Generator

```bash
#!/bin/bash
# document-cron-jobs.sh

CRON_DOCS="docs/cron-jobs.md"

echo "# Cron Jobs Documentation" > "$CRON_DOCS"
echo "" >> "$CRON_DOCS"
echo "Generated on: $(date)" >> "$CRON_DOCS"
echo "" >> "$CRON_DOCS"

# Read crontab and explain each line
crontab -l | grep -v "^#" | while IFS= read -r line; do
  if [ -n "$line" ]; then
    # Extract schedule and command
    schedule=$(echo "$line" | awk '{print $1" "$2" "$3" "$4" "$5}')
    command=$(echo "$line" | cut -d' ' -f6-)
    
    # Get human-readable explanation
    explanation=$(cron-explain "$schedule")
    
    echo "## Job: $command" >> "$CRON_DOCS"
    echo "" >> "$CRON_DOCS"
    echo "**Schedule:** \`$schedule\`" >> "$CRON_DOCS"
    echo "" >> "$CRON_DOCS"
    echo "**Runs:** $explanation" >> "$CRON_DOCS"
    echo "" >> "$CRON_DOCS"
    echo "---" >> "$CRON_DOCS"
    echo "" >> "$CRON_DOCS"
  fi
done

echo "✅ Cron documentation generated: $CRON_DOCS"
```

#### Interactive Cron Setup

```bash
#!/bin/bash
# setup-maintenance-task.sh

echo "🕐 Setting up maintenance task"
echo ""

# 1. Describe what you want
read -p "Describe when to run (e.g., 'every day at 2am'): " description

# 2. Generate cron expression
cron_expr=$(cron-explain --generate "$description")

echo "Generated cron expression: $cron_expr"
echo ""

# 3. Verify it's correct
verification=$(cron-explain "$cron_expr")
echo "This will run: $verification"
echo ""

read -p "Is this correct? (y/n): " confirm
if [ "$confirm" != "y" ]; then
  echo "Cancelled"
  exit 0
fi

# 4. Add to crontab
read -p "Enter command to run: " command
(crontab -l 2>/dev/null; echo "$cron_expr $command") | crontab -

echo "✅ Cron job added!"
```

---

## Shell Scripts

### Master Automation Script

Combine all tools into a comprehensive project health check:

```bash
#!/bin/bash
# project-health.sh - Comprehensive project health check

set -e

PROJECT_DIR=${1:-.}
REPORT_DIR="$PROJECT_DIR/.health-reports"
TIMESTAMP=$(date +%Y%m%d-%H%M%S)

cd "$PROJECT_DIR"

mkdir -p "$REPORT_DIR"

echo "🏥 Running comprehensive health check..."
echo "Project: $PROJECT_DIR"
echo "Timestamp: $TIMESTAMP"
echo ""

# 1. Dependency Check
echo "📦 Checking dependencies..."
depcheck-lite --json > "$REPORT_DIR/deps-$TIMESTAMP.json"
UNUSED_COUNT=$(jq '.unused | length' "$REPORT_DIR/deps-$TIMESTAMP.json")
MISSING_COUNT=$(jq '.missing | length' "$REPORT_DIR/deps-$TIMESTAMP.json")

# 2. Lock File Validation
echo "🔒 Validating lock file..."
lockcheck --json > "$REPORT_DIR/lock-$TIMESTAMP.json"
LOCK_STATUS=$(jq -r '.status' "$REPORT_DIR/lock-$TIMESTAMP.json")

# 3. Documentation Check
echo "📝 Checking documentation..."
readme-gen --check > "$REPORT_DIR/docs-$TIMESTAMP.txt" 2>&1 || true

# 4. Generate Health Report
REPORT="$REPORT_DIR/health-$TIMESTAMP.md"

cat > "$REPORT" <<EOF
# Project Health Report

**Generated:** $(date)
**Project:** $(basename "$PROJECT_DIR")

## Summary

| Check | Status | Details |
|-------|--------|---------|
| Dependencies | $( [ "$UNUSED_COUNT" -eq 0 ] && echo "✅ Clean" || echo "⚠️ $UNUSED_COUNT unused" ) | Unused: $UNUSED_COUNT, Missing: $MISSING_COUNT |
| Lock File | $( [ "$LOCK_STATUS" = "valid" ] && echo "✅ Valid" || echo "❌ Invalid" ) | $LOCK_STATUS |
| Documentation | $( readme-gen --check >/dev/null 2>&1 && echo "✅ Up-to-date" || echo "⚠️ Needs update" ) | README validation |

## Recommendations

EOF

# Add recommendations based on findings
if [ "$UNUSED_COUNT" -gt 0 ]; then
  echo "- Run \`depcheck-lite --interactive --fix\` to remove unused dependencies" >> "$REPORT"
fi

if [ "$MISSING_COUNT" -gt 0 ]; then
  echo "- Run \`depcheck-lite --interactive --fix\` to install missing dependencies" >> "$REPORT"
fi

if [ "$LOCK_STATUS" != "valid" ]; then
  echo "- Run \`npm install\` to fix lock file" >> "$REPORT"
fi

if ! readme-gen --check >/dev/null 2>&1; then
  echo "- Run \`readme-gen --update-all\` to update documentation" >> "$REPORT"
fi

echo ""
echo "✅ Health check complete!"
echo "Report: $REPORT"
echo ""
cat "$REPORT"
```

---

## GitHub Actions

### Reusable Workflow

Create `.github/workflows/muin-tools.yml`:

```yaml
name: MUIN Tools

on:
  workflow_call:
    inputs:
      tools:
        description: 'Comma-separated list of tools to run'
        required: true
        type: string
      node-version:
        description: 'Node.js version'
        default: '18'
        type: string

jobs:
  run-tools:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: ${{ inputs.node-version }}
          cache: 'npm'
      
      - name: Install MUIN CLI Tools
        run: |
          IFS=',' read -ra TOOLS <<< "${{ inputs.tools }}"
          for tool in "${TOOLS[@]}"; do
            npm install -g "@muin/${tool}"
          done
      
      - name: Install project dependencies
        run: npm ci
      
      - name: Run depcheck-lite
        if: contains(inputs.tools, 'depcheck-lite')
        run: |
          depcheck-lite --unused-only --exit-code
          depcheck-lite --missing-only --exit-code
      
      - name: Run lockcheck
        if: contains(inputs.tools, 'lockcheck')
        run: |
          lockcheck --verify-integrity --strict
          lockcheck --security-only
      
      - name: Validate README
        if: contains(inputs.tools, 'readme-gen')
        run: readme-gen --validate
```

Use it in other workflows:

```yaml
# .github/workflows/pr-check.yml
name: PR Check

on:
  pull_request:
    branches: [main]

jobs:
  quality:
    uses: ./.github/workflows/muin-tools.yml
    with:
      tools: 'depcheck-lite,lockcheck,readme-gen'
      node-version: '20'
```

---

## Performance Tips

### 1. Run Checks in Parallel

```bash
#!/bin/bash
# parallel-checks.sh

# Run multiple checks simultaneously
depcheck-lite --unused-only &
PID1=$!

lockcheck --verify-integrity &
PID2=$!

readme-gen --validate &
PID3=$!

# Wait for all checks
wait $PID1 $PID2 $PID3

echo "✅ All checks complete!"
```

### 2. Cache Tool Installations

In CI/CD:

```yaml
- name: Cache MUIN tools
  uses: actions/cache@v3
  with:
    path: ~/.npm
    key: muin-tools-${{ runner.os }}-${{ hashFiles('**/package-lock.json') }}
```

### 3. Use JSON Output for Processing

```bash
# Fast processing with jq
depcheck-lite --json | jq -r '.unused[]' | while read pkg; do
  npm uninstall "$pkg"
done
```

### 4. Skip Heavy Checks in Development

```bash
# In package.json
{
  "scripts": {
    "precommit:fast": "depcheck-lite --unused-only",
    "precommit:full": "depcheck-lite && lockcheck --security-only"
  }
}
```

---

## Best Practices

### 1. Start Small
Don't integrate everything at once. Start with one workflow:
- **Week 1:** Add `depcheck-lite` to pre-commit
- **Week 2:** Add `lockcheck` to CI
- **Week 3:** Automate README updates
- **Week 4:** Full integration

### 2. Make It Visible
Add badges to your README:

```markdown
![Dependencies](https://img.shields.io/badge/dependencies-clean-green)
![Lock File](https://img.shields.io/badge/lockfile-verified-green)
```

### 3. Handle Failures Gracefully

```bash
# Don't fail CI on warnings
depcheck-lite --outdated || echo "⚠️ Some packages are outdated"

# Use exit codes properly
if ! lockcheck --verify-integrity; then
  echo "Fix: npm install"
  exit 1
fi
```

### 4. Document Your Workflows

Keep a `DEVELOPMENT.md` in your repo:

```markdown
# Development Workflow

## Before Committing
```bash
npm run precommit  # Runs depcheck-lite + lockcheck
```

## After Pulling
```bash
npm run postpull   # Runs npm install + lockcheck
```

## Weekly Maintenance
```bash
npm run health     # Full project health check
```
```

### 5. Team Collaboration

Share scripts in your repo:

```
scripts/
├── setup-new-dev.sh        # Onboarding script
├── pre-commit-check.sh     # Git hooks
├── weekly-maintenance.sh   # Cron job
└── api-integration.sh      # API workflow
```

### 6. Monitor and Iterate

Track metrics:
- How many unused dependencies removed?
- Security vulnerabilities caught?
- Documentation coverage improved?
- Time saved per week?

---

## Troubleshooting

### Common Issues

**Issue:** `depcheck-lite` reports false positives

```bash
# Create .depcheckrc.json
{
  "ignores": ["@types/*", "typescript"],
  "skip-missing": false
}
```

**Issue:** `lockcheck` fails after npm install

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
lockcheck --verify-integrity
```

**Issue:** `readme-gen` overwrites custom sections

```bash
# Use protected sections in README
<!-- MUIN-PROTECT:START -->
Custom content that won't be overwritten
<!-- MUIN-PROTECT:END -->
```

---

## Advanced Patterns

### Monorepo Integration

```bash
#!/bin/bash
# monorepo-check.sh

for package in packages/*; do
  echo "Checking $package..."
  cd "$package"
  
  depcheck-lite --unused-only
  lockcheck --verify-integrity
  
  cd ../..
done
```

### Multi-Language Projects

```bash
#!/bin/bash
# multi-lang-types.sh

# Generate types for both TypeScript and Python
cat api-response.json | json-to-types --format interface > src/types.ts
cat api-response.json | json-to-types --format pydantic > backend/types.py
cat api-response.json | json-to-types --format zod > src/schema.ts
```

---

## Examples Repository

Find complete examples at: https://github.com/muin-company/cli-tools-examples

Each example includes:
- Full source code
- Shell scripts
- GitHub Actions workflows
- Documentation

---

## Contributing

Found a useful workflow? Share it!

1. Create a gist or repo with your workflow
2. Open an issue with a link
3. We'll add it to this guide

---

## Resources

- **Main Repository:** https://github.com/muin-company/cli-tools
- **Issue Tracker:** https://github.com/muin-company/cli-tools/issues
- **Discussions:** https://github.com/muin-company/cli-tools/discussions

---

## License

MIT © MUIN Company

---

**Last Updated:** 2026-02-08

**Next Review:** Quarterly updates with new workflow patterns
