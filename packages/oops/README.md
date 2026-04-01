# oops-explainer

> AI-powered error explainer, stack trace analyzer, and debugging assistant — paste an error, get a human-readable explanation and fix suggestions instantly.

![npm version](https://img.shields.io/npm/v/oops-explainer)
![license](https://img.shields.io/npm/l/oops-explainer)
![downloads](https://img.shields.io/npm/dm/oops-explainer)

**Keywords:** error explainer, bug debugger, stack trace analyzer, ai error solver, debugging assistant, error message decoder, crash analyzer, exception explainer, troubleshooting tool, developer productivity

Stop staring at cryptic error messages. `oops` uses AI to explain what went wrong and how to fix it — right in your terminal. Perfect for production debugging, CI failure analysis, legacy code troubleshooting, and learning.

---

## Table of Contents

- [Why oops?](#why-oops)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Usage](#usage)
- [Use Cases](#use-cases)
- [CI/CD Integration](#cicd-integration)
- [JSON Output & Automation](#json-output--automation)
- [Advanced Features](#advanced-features)
- [Comparison](#comparison)
- [Environment Variables](#environment-variables)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## Why oops?

**Before oops:**
1. Copy error message
2. Paste into Google / StackOverflow
3. Read 10 outdated threads
4. Try random solutions
5. Repeat

**With oops:**
1. `oops "your error message"`
2. Get instant explanation + fix
3. Done.

**Perfect for:**
- 🚨 Production error debugging
- 🤖 CI/CD failure analysis
- 📚 Legacy codebase troubleshooting
- 🎓 Learning (beginners understand errors faster)
- ⏱️ Saving time (no more StackOverflow rabbit holes)

---

## Installation

```bash
# Global install (recommended)
npm install -g oops-explainer

# Or use npx (no install needed)
npx oops-explainer "your error message here"

# Or add to your project
npm install --save-dev oops-explainer
```

---

## Quick Start

### 1️⃣ Basic error explanation

```bash
oops "Cannot read property 'x' of undefined"
```

**Output:**
```
🔍 Error Analysis

Error Type: TypeError
Explanation: You're trying to access property 'x' on a value that is undefined.
            This usually happens when an object hasn't been initialized or a
            function returned undefined instead of an object.

Root Cause: The object reference is undefined at the point where you try to
           access its property.

Solution:
  1. Add a check before accessing the property:
     if (obj && obj.x) { ... }
  
  2. Use optional chaining (ES2020+):
     obj?.x
  
  3. Ensure the object is properly initialized before use:
     const obj = { x: 42 };

  4. Check if the function/API call that returns this object is working correctly.
```

### 2️⃣ Analyze a stack trace

```bash
oops --stack "$(cat error.log)"
```

### 3️⃣ JSON output for automation

```bash
oops "TypeError: Assignment to constant variable" --json | jq .
```

---

## Usage

### Command-Line Interface

```bash
# Basic usage
oops "error message"

# Read from file
oops --file error.log

# Analyze stack trace
oops --stack "Error: ECONNREFUSED..."

# JSON output (CI/CD ready)
oops "error" --json

# Multilingual support
oops "エラー" --lang ja

# Custom AI model
oops "error" --model gpt-4o

# Verbose mode
oops "error" --verbose
```

### Options Reference

| Option | Alias | Type | Description |
|--------|-------|------|-------------|
| `--file <path>` | `-f` | string | Read error message from a file |
| `--stack <trace>` | `-s` | string | Analyze a full stack trace |
| `--json` | `-j` | boolean | Output results as JSON |
| `--lang <code>` | `-l` | string | Language for explanation (default: `en`) |
| `--model <name>` | `-m` | string | AI model to use (default: `gpt-4o-mini`) |
| `--verbose` | `-v` | boolean | Show detailed analysis |
| `--help` | `-h` | boolean | Show help |
| `--version` | | boolean | Show version |

### Supported Languages

- `en` — English (default)
- `ko` — Korean (한국어)
- `ja` — Japanese (日本語)
- `zh` — Chinese (中文)
- `es` — Spanish
- `fr` — French
- `de` — German
- `ru` — Russian

---

## Use Cases

### 🚨 1. Production Error Debugging

When your production app crashes, time is critical.

**Scenario:** Node.js server crash at 3 AM

```bash
# Server logs show:
# UnhandledPromiseRejectionWarning: Error: connect ETIMEDOUT 10.0.1.5:5432

oops "UnhandledPromiseRejectionWarning: Error: connect ETIMEDOUT 10.0.1.5:5432" --json
```

**Result:**
```json
{
  "error": "connect ETIMEDOUT 10.0.1.5:5432",
  "errorType": "Network/Database Error",
  "explanation": "Connection to PostgreSQL database at 10.0.1.5:5432 timed out. The database server is unreachable or not responding within the timeout period.",
  "solution": "1. Check database server status\n2. Verify network connectivity (firewall rules, security groups)\n3. Increase connection timeout in your database config\n4. Check for database overload (too many connections)",
  "rootCause": "Network timeout — the TCP connection attempt to the database server exceeded the timeout limit (usually 30-60 seconds)."
}
```

**Saved:** 15+ minutes of Googling + trial-and-error

---

### 🤖 2. CI/CD Failure Analysis

Automated builds fail. Your team needs to know why — fast.

**Scenario:** GitHub Actions build fails with cryptic error

```bash
# CI logs show:
# Error: Cannot find module '@babel/preset-env'

oops "Error: Cannot find module '@babel/preset-env'" --verbose
```

**Output:**
```
🔍 Error Analysis

Error Type: ModuleNotFoundError
Explanation: Node.js cannot locate the '@babel/preset-env' package. This is a
            dependency resolution issue.

Root Cause: The package is either:
           - Not installed (missing from node_modules)
           - Not listed in package.json dependencies
           - Installed in the wrong location (wrong workspace in monorepo)

Solution:
  1. Install the missing package:
     npm install --save-dev @babel/preset-env
  
  2. If using a monorepo, ensure you're in the correct workspace:
     npm install --workspace=packages/your-app @babel/preset-env
  
  3. Clear node_modules and reinstall:
     rm -rf node_modules package-lock.json
     npm install
  
  4. Check .npmrc for registry/scope misconfigurations

Context:
  - Common in CI environments when dependencies aren't cached
  - Often caused by outdated package-lock.json
  - May indicate package.json / lock file mismatch
```

**Saved:** 10+ minutes + reduced context switching for the team

---

### 📚 3. Legacy Code Troubleshooting

Maintaining old codebases means encountering unfamiliar errors.

**Scenario:** PHP 5.6 app throwing warnings

```bash
oops "PHP Warning: mysqli::real_escape_string() expects exactly 1 parameter, 0 given"
```

**Output:**
```
🔍 Error Analysis

Error Type: PHP Warning
Explanation: The mysqli::real_escape_string() method requires a string parameter
            to escape, but none was provided.

Root Cause: Missing argument in method call. In PHP 5.x, this is a common mistake
           when migrating from mysql_* functions to mysqli.

Solution:
  1. Check the function call and add the missing parameter:
     // Wrong:
     $escaped = $mysqli->real_escape_string();
     
     // Correct:
     $escaped = $mysqli->real_escape_string($user_input);
  
  2. Ensure you're passing the variable you want to escape
  
  3. If migrating from old mysql_* functions, note the signature change:
     mysql_real_escape_string($str)  →  $mysqli->real_escape_string($str)

Context:
  - This won't crash the script (it's a Warning, not an Error)
  - But it returns NULL, which may cause SQL injection vulnerabilities
  - Always escape user input before inserting into SQL queries
```

**Saved:** 20+ minutes (PHP 5.6 StackOverflow threads are often outdated)

---

### 🎓 4. Learning & Onboarding (Junior Developers)

New developers can understand errors independently, reducing interruptions.

**Scenario:** Junior dev encounters first `async/await` error

```bash
oops "SyntaxError: await is only valid in async function"
```

**Output:**
```
🔍 Error Analysis

Error Type: SyntaxError
Explanation: You used the 'await' keyword outside of an async function. In
            JavaScript, 'await' can only be used inside functions declared
            with the 'async' keyword.

Root Cause: JavaScript language constraint — 'await' pauses execution to wait
           for a Promise, which requires the function to be async.

Solution:
  1. Add 'async' to the function declaration:
     // Wrong:
     function fetchData() {
       const data = await fetch('/api');
     }
     
     // Correct:
     async function fetchData() {
       const data = await fetch('/api');
     }
  
  2. For arrow functions:
     const fetchData = async () => {
       const data = await fetch('/api');
     };
  
  3. For class methods:
     class MyClass {
       async fetchData() {
         const data = await fetch('/api');
       }
     }

Learning Note:
  - 'async' functions always return a Promise
  - 'await' can only be used inside 'async' functions (or top-level in modules)
  - This is part of ES2017 (ES8) async/await syntax
```

**Saved:** Senior developer's time + faster learning for junior

---

### ⏱️ 5. Batch Error Analysis (QA / Testing)

Process multiple errors from test runs or log files.

**Scenario:** Test suite fails with 20 different errors

```bash
# Extract unique errors from test log
grep "Error:" test.log | sort -u > errors.txt

# Analyze each error
while IFS= read -r line; do
  echo "Analyzing: $line"
  oops "$line" --json >> analysis.json
  echo "," >> analysis.json
done < errors.txt

# Wrap in JSON array
echo "[" > final.json
cat analysis.json >> final.json
echo "]" >> final.json

# Parse with jq
jq '.[] | {error: .error, solution: .solution}' final.json
```

**Result:** Bulk error explanations ready for the team

---

### 🔍 6. Stack Trace Deep Dive

Full stack trace analysis with root cause identification.

**Scenario:** React app crashes with deep stack trace

```bash
oops --stack "$(cat crash.log)" --verbose
```

**Example crash.log:**
```
Error: Cannot read property 'map' of undefined
    at ComponentList (http://localhost:3000/static/js/main.js:234:18)
    at renderWithHooks (react-dom.development.js:14985)
    at updateFunctionComponent (react-dom.development.js:17356)
    at beginWork (react-dom.development.js:19063)
    at HTMLUnknownElement.callCallback (react-dom.development.js:3945)
```

**Output:**
```
🔍 Stack Trace Analysis

Error: Cannot read property 'map' of undefined

Frame-by-Frame Analysis:
  1. ComponentList (main.js:234:18) ⚠️ LIKELY ROOT CAUSE
     → This is your application code. The error originates here.
     → Line 234 is trying to call .map() on undefined
     → Check what data is being passed to ComponentList
  
  2. renderWithHooks (react-dom.development.js:14985)
     → React internal — rendering functional component
     → Not your bug, React is just executing your component
  
  3. updateFunctionComponent (react-dom.development.js:17356)
     → React internal — updating component during render cycle
  
  4-5. React internals (beginWork, callCallback)
     → Standard React rendering pipeline

Root Cause:
  The ComponentList component expects an array to iterate over with .map(),
  but it's receiving undefined instead.

Solution:
  1. Add a default value or guard clause in ComponentList:
     function ComponentList({ items = [] }) {
       return items.map(item => <li>{item}</li>);
     }
  
  2. Or add a conditional render:
     function ComponentList({ items }) {
       if (!items) return null;
       return items.map(item => <li>{item}</li>);
     }
  
  3. Check the parent component passing data to ComponentList:
     - Is the API call succeeding?
     - Is the state initialized correctly?
     - Is there a race condition (rendering before data loads)?

Where to Look First:
  → main.js:234 (ComponentList function)
  → The parent component that renders <ComponentList items={...} />
  → Any API call or state management that provides the 'items' prop
```

**Saved:** 30+ minutes of manual stack trace parsing

---

### 🌐 7. Multilingual Support (Global Teams)

Teams with non-English speakers can get explanations in their language.

**Scenario:** Japanese developer encounters error

```bash
oops "TypeError: undefined is not an object" --lang ja
```

**Output (Japanese):**
```
🔍 エラー解析

エラータイプ: TypeError
説明: undefined の値をオブジェクトとして扱おうとしました。
     undefined には プロパティやメソッドが存在しないため、
     アクセスしようとするとエラーになります。

根本原因: オブジェクトが初期化されていない、または関数が
        undefined を返しています。

解決策:
  1. オブジェクトにアクセスする前に存在確認:
     if (obj) { obj.property }
  
  2. オプショナルチェーン演算子を使用 (ES2020+):
     obj?.property
  
  3. オブジェクトを正しく初期化:
     const obj = { property: value };
```

**Supported languages:** `en`, `ko`, `ja`, `zh`, `es`, `fr`, `de`, `ru`

---

## CI/CD Integration

### GitHub Actions

**Full Example: Auto-comment error analysis on PR**

```yaml
name: Test with Error Analysis
on: [pull_request]

jobs:
  test-and-analyze:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests and capture errors
        id: test
        continue-on-error: true
        run: |
          npm test 2>&1 | tee test-output.log
          echo "test_result=$?" >> $GITHUB_OUTPUT
      
      - name: Analyze errors with oops
        if: steps.test.outputs.test_result != '0'
        run: |
          npx oops-explainer --file test-output.log --json > analysis.json
        env:
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
      
      - name: Post analysis to PR
        if: steps.test.outputs.test_result != '0'
        uses: actions/github-script@v6
        with:
          script: |
            const fs = require('fs');
            const analysis = JSON.parse(fs.readFileSync('analysis.json', 'utf8'));
            
            const body = `## 🔍 Automated Error Analysis
            
            **Error:** \`${analysis.error}\`
            
            **Type:** ${analysis.errorType}
            
            **Explanation:**
            ${analysis.explanation}
            
            **Root Cause:**
            ${analysis.rootCause}
            
            **Suggested Fix:**
            \`\`\`
            ${analysis.solution}
            \`\`\`
            
            <sub>Powered by [oops-explainer](https://github.com/muin-company/cli-tools/tree/main/packages/oops)</sub>
            `;
            
            await github.rest.issues.createComment({
              owner: context.repo.owner,
              repo: context.repo.repo,
              issue_number: context.issue.number,
              body: body
            });
      
      - name: Fail if tests failed
        if: steps.test.outputs.test_result != '0'
        run: exit 1
```

**Minimal Example: Just analyze and log**

```yaml
- name: Analyze test failures
  if: failure()
  run: npx oops-explainer --file error.log
  env:
    OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
```

---

### GitLab CI

**Full Example: Save analysis as artifact**

```yaml
test:
  stage: test
  script:
    - npm test 2>&1 | tee test-output.log
  after_script:
    - |
      if [ -s test-output.log ]; then
        npx oops-explainer --file test-output.log --json > analysis.json
      fi
  artifacts:
    paths:
      - analysis.json
      - test-output.log
    when: on_failure
    expire_in: 1 week
  allow_failure: false

analyze:
  stage: report
  dependencies:
    - test
  script:
    - cat analysis.json | jq '.solution'
  when: on_failure
  only:
    - merge_requests
```

**With Slack notification:**

```yaml
notify-errors:
  stage: report
  dependencies:
    - test
  script:
    - |
      SOLUTION=$(cat analysis.json | jq -r '.solution')
      curl -X POST $SLACK_WEBHOOK_URL \
        -H 'Content-Type: application/json' \
        -d "{\"text\": \"🚨 Build failed!\n\nSolution:\n$SOLUTION\"}"
  when: on_failure
```

---

### Jenkins Pipeline

**Declarative Pipeline:**

```groovy
pipeline {
  agent any
  
  environment {
    OPENAI_API_KEY = credentials('openai-api-key')
  }
  
  stages {
    stage('Test') {
      steps {
        script {
          def testResult = sh(
            script: 'npm test 2>&1 | tee test-output.log',
            returnStatus: true
          )
          
          if (testResult != 0) {
            sh 'npx oops-explainer --file test-output.log --json > analysis.json'
            
            def analysis = readJSON file: 'analysis.json'
            
            echo """
            ═══════════════════════════════════════
            🔍 ERROR ANALYSIS
            ═══════════════════════════════════════
            Error: ${analysis.error}
            Type: ${analysis.errorType}
            
            Explanation:
            ${analysis.explanation}
            
            Solution:
            ${analysis.solution}
            ═══════════════════════════════════════
            """
            
            error("Tests failed — see analysis above")
          }
        }
      }
    }
  }
  
  post {
    failure {
      archiveArtifacts artifacts: 'analysis.json,test-output.log', allowEmptyArchive: true
    }
  }
}
```

**Scripted Pipeline:**

```groovy
node {
  withEnv(['OPENAI_API_KEY=credentials("openai-api-key")']) {
    stage('Test') {
      try {
        sh 'npm test'
      } catch (Exception e) {
        sh 'npm test 2>&1 | npx oops-explainer --json > analysis.json'
        def analysis = readJSON file: 'analysis.json'
        
        currentBuild.description = "Failed: ${analysis.error}"
        
        slackSend(
          color: 'danger',
          message: """
            Build Failed: ${env.JOB_NAME} #${env.BUILD_NUMBER}
            Error: ${analysis.error}
            Solution: ${analysis.solution}
            (<${env.BUILD_URL}|Open>)
          """
        )
        
        throw e
      }
    }
  }
}
```

---

### CircleCI

```yaml
version: 2.1

orbs:
  node: circleci/node@5.0

jobs:
  test:
    executor: node/default
    steps:
      - checkout
      - node/install-packages
      
      - run:
          name: Run tests
          command: npm test 2>&1 | tee test-output.log
          when: always
      
      - run:
          name: Analyze errors
          command: |
            if [ $? -ne 0 ]; then
              npx oops-explainer --file test-output.log --json > analysis.json
              cat analysis.json
            fi
          when: on_fail
          environment:
            OPENAI_API_KEY: $OPENAI_API_KEY
      
      - store_artifacts:
          path: analysis.json
          when: on_fail

workflows:
  test-and-analyze:
    jobs:
      - test
```

---

### Travis CI

```yaml
language: node_js
node_js:
  - '18'

script:
  - npm test 2>&1 | tee test-output.log

after_failure:
  - npx oops-explainer --file test-output.log --json > analysis.json
  - cat analysis.json | jq '.'

env:
  global:
    - secure: "encrypted_OPENAI_API_KEY_here"
```

---

## JSON Output & Automation

### JSON Schema

```json
{
  "error": "string (the original error message)",
  "errorType": "string (classification: TypeError, SyntaxError, etc.)",
  "explanation": "string (human-readable explanation)",
  "solution": "string (step-by-step fix suggestions)",
  "rootCause": "string (why this error occurred)",
  "context": {
    "file": "string | null (file path if detected)",
    "line": "number (line number if detected, 0 otherwise)",
    "column": "number | null (column if detected)",
    "codeSnippet": "string | null (code excerpt if available)"
  },
  "timestamp": "string (ISO 8601 timestamp)",
  "model": "string (AI model used)",
  "version": "string (oops-explainer version)"
}
```

---

### Parsing with jq

**Extract just the solution:**
```bash
oops "error" --json | jq -r '.solution'
```

**Get error type and root cause:**
```bash
oops "error" --json | jq '{type: .errorType, cause: .rootCause}'
```

**Filter by error type:**
```bash
oops "error" --json | jq 'select(.errorType == "TypeError")'
```

**Batch process multiple errors:**
```bash
cat errors.txt | while read line; do
  oops "$line" --json
done | jq -s '.' > all-analyses.json
```

---

### Automation Scripts

**Auto-fix script (proof of concept):**

```bash
#!/bin/bash
# auto-fix.sh — analyze error and suggest a fix

ERROR_MSG="$1"
OUTPUT=$(oops "$ERROR_MSG" --json)

SOLUTION=$(echo "$OUTPUT" | jq -r '.solution')
FILE=$(echo "$OUTPUT" | jq -r '.context.file')
LINE=$(echo "$OUTPUT" | jq -r '.context.line')

echo "🔍 Analysis complete"
echo ""
echo "Error: $ERROR_MSG"
echo ""
echo "Solution:"
echo "$SOLUTION"
echo ""

if [ "$FILE" != "null" ] && [ "$LINE" != "0" ]; then
  echo "📍 Location: $FILE:$LINE"
  echo ""
  echo "Opening in editor..."
  code --goto "$FILE:$LINE"
else
  echo "⚠️  Could not determine file location"
fi
```

**Usage:**
```bash
./auto-fix.sh "TypeError: Cannot read property 'x' of undefined"
```

---

**Slack notification script:**

```bash
#!/bin/bash
# notify-slack.sh — send error analysis to Slack

ERROR_MSG="$1"
SLACK_WEBHOOK="$2"

ANALYSIS=$(oops "$ERROR_MSG" --json)
ERROR=$(echo "$ANALYSIS" | jq -r '.error')
SOLUTION=$(echo "$ANALYSIS" | jq -r '.solution')

curl -X POST "$SLACK_WEBHOOK" \
  -H 'Content-Type: application/json' \
  -d "{
    \"text\": \"🚨 Error Detected\",
    \"attachments\": [{
      \"color\": \"danger\",
      \"fields\": [
        {\"title\": \"Error\", \"value\": \"$ERROR\", \"short\": false},
        {\"title\": \"Solution\", \"value\": \"$SOLUTION\", \"short\": false}
      ]
    }]
  }"

echo "✅ Sent to Slack"
```

**Usage:**
```bash
./notify-slack.sh "Error: ECONNREFUSED" "https://hooks.slack.com/services/YOUR/WEBHOOK/URL"
```

---

**Email report script:**

```bash
#!/bin/bash
# email-report.sh — email error analysis

ERROR_MSG="$1"
RECIPIENT="$2"

ANALYSIS=$(oops "$ERROR_MSG" --json)
EXPLANATION=$(echo "$ANALYSIS" | jq -r '.explanation')
SOLUTION=$(echo "$ANALYSIS" | jq -r '.solution')

SUBJECT="Error Analysis: $ERROR_MSG"
BODY="Explanation:\n$EXPLANATION\n\nSolution:\n$SOLUTION"

echo -e "$BODY" | mail -s "$SUBJECT" "$RECIPIENT"

echo "📧 Sent to $RECIPIENT"
```

**Usage:**
```bash
./email-report.sh "ReferenceError: x is not defined" "dev@example.com"
```

---

**CSV export for tracking:**

```bash
#!/bin/bash
# export-csv.sh — log errors to CSV

ERROR_MSG="$1"
CSV_FILE="error-log.csv"

ANALYSIS=$(oops "$ERROR_MSG" --json)
TIMESTAMP=$(echo "$ANALYSIS" | jq -r '.timestamp')
ERROR_TYPE=$(echo "$ANALYSIS" | jq -r '.errorType')
ROOT_CAUSE=$(echo "$ANALYSIS" | jq -r '.rootCause')

# Create CSV if it doesn't exist
if [ ! -f "$CSV_FILE" ]; then
  echo "timestamp,error_type,error_message,root_cause" > "$CSV_FILE"
fi

# Append row
echo "\"$TIMESTAMP\",\"$ERROR_TYPE\",\"$ERROR_MSG\",\"$ROOT_CAUSE\"" >> "$CSV_FILE"

echo "✅ Logged to $CSV_FILE"
```

**Usage:**
```bash
./export-csv.sh "SyntaxError: Unexpected token"
cat error-log.csv
```

---

## Advanced Features

### Custom AI Models

**Use a more powerful model:**
```bash
oops "complex error" --model gpt-4o
```

**Supported models:**
- `gpt-4o` — Most capable (slower, more expensive)
- `gpt-4o-mini` — Default (fast, cost-effective)
- `gpt-3.5-turbo` — Legacy (faster, less accurate)

**Set default model via environment variable:**
```bash
export OOPS_MODEL=gpt-4o
oops "error"
```

---

### Filtering & Context

**Add custom context:**
```bash
# Include extra information for better analysis
oops "Error: ENOENT: no such file or directory, open '/data/config.json'" \
  --verbose \
  --context "Running in Docker container, Alpine Linux"
```

---

### Batch Processing

**Process all errors from a log file:**

```bash
#!/bin/bash
# batch-analyze.sh

LOG_FILE="$1"

# Extract error lines (adjust grep pattern as needed)
grep -E "(Error|Exception|Fatal)" "$LOG_FILE" | while read -r line; do
  echo "Analyzing: $line"
  oops "$line" --json >> batch-results.json
  echo "" >> batch-results.json
done

echo "✅ Batch analysis complete → batch-results.json"
```

**Parse batch results:**
```bash
cat batch-results.json | jq -s 'group_by(.errorType) | map({type: .[0].errorType, count: length})'
```

**Output:**
```json
[
  {"type": "TypeError", "count": 12},
  {"type": "ReferenceError", "count": 5},
  {"type": "Network Error", "count": 3}
]
```

---

### Watch Mode (Live Monitoring)

**Monitor a log file for new errors:**

```bash
#!/bin/bash
# watch-errors.sh — tail log and auto-analyze new errors

LOG_FILE="$1"

tail -f "$LOG_FILE" | while read -r line; do
  if echo "$line" | grep -qE "(Error|Exception)"; then
    echo "🚨 Error detected!"
    oops "$line"
    echo "───────────────────────────────────────"
  fi
done
```

**Usage:**
```bash
./watch-errors.sh /var/log/app.log
```

---

### Pre-commit Hook

**Prevent commits with unhandled errors:**

```bash
#!/bin/bash
# .git/hooks/pre-commit

# Scan staged files for error patterns
ERRORS=$(git diff --cached --name-only | xargs grep -E "TODO.*error|FIXME.*bug" || true)

if [ -n "$ERRORS" ]; then
  echo "⚠️  Found error-related TODOs:"
  echo "$ERRORS"
  echo ""
  echo "Analyzing..."
  
  echo "$ERRORS" | while read -r line; do
    oops "$line"
  done
  
  echo ""
  read -p "Commit anyway? (y/N) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
  fi
fi
```

---

### VS Code Integration (Optional)

**Create a task in `.vscode/tasks.json`:**

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Explain Error",
      "type": "shell",
      "command": "oops",
      "args": ["${selectedText}"],
      "presentation": {
        "reveal": "always",
        "panel": "new"
      },
      "problemMatcher": []
    }
  ]
}
```

**Usage:**
1. Select an error message in VS Code
2. Open command palette (`Cmd+Shift+P` / `Ctrl+Shift+P`)
3. Run: `Tasks: Run Task` → `Explain Error`
4. Get instant analysis in a new terminal

---

### API Integration (Programmatic Usage)

**Use oops in Node.js:**

```javascript
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

async function analyzeError(errorMessage) {
  const { stdout } = await execPromise(
    `oops "${errorMessage}" --json`
  );
  return JSON.parse(stdout);
}

// Usage
(async () => {
  const analysis = await analyzeError("TypeError: x is not a function");
  console.log('Solution:', analysis.solution);
})();
```

**Use in a web server:**

```javascript
const express = require('express');
const { exec } = require('child_process');
const app = express();

app.use(express.json());

app.post('/analyze', (req, res) => {
  const { error } = req.body;
  
  exec(`oops "${error}" --json`, (err, stdout) => {
    if (err) {
      return res.status(500).json({ error: 'Analysis failed' });
    }
    res.json(JSON.parse(stdout));
  });
});

app.listen(3000, () => console.log('Error analyzer API running on :3000'));
```

**Test:**
```bash
curl -X POST http://localhost:3000/analyze \
  -H "Content-Type: application/json" \
  -d '{"error": "ReferenceError: foo is not defined"}'
```

---

## Comparison

### oops vs StackOverflow

| Aspect | StackOverflow | oops |
|--------|---------------|------|
| **Speed** | 5-30 minutes (search, read threads) | 5-10 seconds |
| **Relevance** | Hit-or-miss (outdated answers) | AI-tailored to your exact error |
| **Context** | Generic solutions | Specific to your stack/language |
| **Availability** | Requires internet + browsing | Works offline (with API key) |
| **Learning Curve** | Need to filter good/bad answers | Instant, curated response |
| **Automation** | Not possible | JSON output for CI/CD |

**When to use StackOverflow:**
- Complex architectural questions
- Community discussions
- Multiple perspectives needed

**When to use oops:**
- Quick debugging
- CI/CD automation
- Learning common error patterns
- Time-critical production issues

---

### oops vs ChatGPT (Manual)

| Aspect | ChatGPT (Manual) | oops |
|--------|------------------|------|
| **Workflow** | Copy error → open ChatGPT → paste → wait | One command |
| **Speed** | 30-60 seconds | 5-10 seconds |
| **Context Switching** | Leave terminal/IDE | Stay in terminal |
| **Automation** | Not possible | JSON output for scripts |
| **Privacy** | Manually control what you share | Controlled via CLI |
| **Batch Processing** | Copy-paste each error | Scripted batch analysis |

**When to use ChatGPT manually:**
- Complex multi-turn debugging conversations
- When you need to share full codebase context
- Exploratory problem-solving

**When to use oops:**
- Quick error lookup
- CI/CD pipelines
- Scripted workflows
- Terminal-first development

---

### oops vs GitHub Copilot

| Aspect | GitHub Copilot | oops |
|--------|----------------|------|
| **Focus** | Code completion + suggestions | Error explanation |
| **Trigger** | While typing code | After error occurs |
| **Output** | Code snippets | Explanations + solutions |
| **Availability** | IDE-only | Terminal + CI/CD |
| **Cost** | $10-20/month | Pay-per-use (OpenAI API) |
| **Offline** | Requires internet | Requires API access |

**Use together:**
- Copilot: Prevent errors while writing code
- oops: Explain errors when they happen

---

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `OPENAI_API_KEY` | OpenAI API key (**required**) | (none) |
| `OOPS_MODEL` | Default AI model | `gpt-4o-mini` |
| `OOPS_LANG` | Default language | `en` |
| `OOPS_TIMEOUT` | API timeout (seconds) | `30` |
| `OOPS_MAX_TOKENS` | Max response tokens | `1000` |

**Set in shell:**
```bash
export OPENAI_API_KEY="sk-..."
export OOPS_MODEL="gpt-4o"
export OOPS_LANG="ko"
```

**Set in CI (GitHub Actions):**
```yaml
env:
  OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
  OOPS_MODEL: "gpt-4o-mini"
```

**Set in Docker:**
```dockerfile
ENV OPENAI_API_KEY=sk-...
ENV OOPS_MODEL=gpt-4o-mini
```

---

## Troubleshooting

### "API key not found"

**Error:**
```
Error: OPENAI_API_KEY environment variable not set
```

**Solution:**
```bash
export OPENAI_API_KEY="sk-your-key-here"
```

Or create a `.env` file:
```bash
echo "OPENAI_API_KEY=sk-your-key-here" > .env
source .env
```

---

### "Rate limit exceeded"

**Error:**
```
Error: Rate limit reached for requests
```

**Solutions:**
1. **Wait a few seconds** and retry
2. **Upgrade your OpenAI plan** (higher rate limits)
3. **Add retry logic** in CI:
   ```bash
   for i in {1..3}; do
     oops "error" --json && break || sleep 5
   done
   ```

---

### "Model not found"

**Error:**
```
Error: The model 'gpt-5' does not exist
```

**Solution:**
Use a valid model name:
```bash
oops "error" --model gpt-4o
```

Supported models: `gpt-4o`, `gpt-4o-mini`, `gpt-3.5-turbo`

---

### "Request timeout"

**Error:**
```
Error: Request timed out after 30 seconds
```

**Solutions:**
1. **Increase timeout:**
   ```bash
   export OOPS_TIMEOUT=60
   oops "error"
   ```

2. **Use a faster model:**
   ```bash
   oops "error" --model gpt-4o-mini
   ```

3. **Check your network connection**

---

### "Invalid JSON output"

**Error:**
```
SyntaxError: Unexpected token < in JSON at position 0
```

**Cause:** API returned HTML (error page) instead of JSON

**Solutions:**
1. **Check API key** is valid
2. **Verify network access** to OpenAI API
3. **Check OpenAI status:** https://status.openai.com

---

### "Command not found: oops"

**Error:**
```
zsh: command not found: oops
```

**Solutions:**
1. **Global install:**
   ```bash
   npm install -g oops-explainer
   ```

2. **Add npm global bin to PATH:**
   ```bash
   export PATH="$PATH:$(npm root -g)/../bin"
   ```

3. **Use npx instead:**
   ```bash
   npx oops-explainer "error"
   ```

---

## How It Works

1. **Input:** You provide an error message (via CLI, file, or stdin)
2. **Preprocessing:** oops extracts key information (error type, stack trace, context)
3. **API Call:** Sends the error to OpenAI API with a specialized prompt
4. **Parsing:** AI returns structured explanation + solution
5. **Output:** Formatted text (default) or JSON (with `--json`)

**No data is stored.** Your errors are sent to OpenAI's API and not logged by oops.

---

## Examples Gallery

### Example 1: Python ImportError

```bash
oops "ImportError: No module named 'requests'"
```

**Output:**
```
🔍 Error Analysis

Error Type: ImportError
Explanation: Python cannot find the 'requests' module. It's either not installed
            or not in the Python path.

Root Cause: The requests library is not installed in your current Python environment.

Solution:
  1. Install requests:
     pip install requests
  
  2. If using a virtual environment, ensure it's activated:
     source venv/bin/activate
     pip install requests
  
  3. For Python 3:
     pip3 install requests
  
  4. Verify installation:
     python -c "import requests; print(requests.__version__)"
```

---

### Example 2: Docker Error

```bash
oops "docker: Error response from daemon: Conflict. The container name '/app' is already in use"
```

**Output:**
```
🔍 Error Analysis

Error Type: Docker Container Conflict
Explanation: A container with the name '/app' already exists and is either
            running or stopped. Docker doesn't allow duplicate container names.

Root Cause: You're trying to create a new container with a name that's already taken.

Solution:
  1. Remove the existing container:
     docker rm app
  
  2. Or stop and remove it:
     docker stop app && docker rm app
  
  3. Or use a different name:
     docker run --name app2 ...
  
  4. To force replace:
     docker rm -f app
     docker run --name app ...
```

---

### Example 3: Git Error

```bash
oops "fatal: refusing to merge unrelated histories"
```

**Output:**
```
🔍 Error Analysis

Error Type: Git Merge Error
Explanation: Git is refusing to merge two branches that don't share a common
            commit history. This usually happens when merging a new repository
            into an existing one.

Root Cause: The branches have completely separate commit histories (no common ancestor).

Solution:
  1. Force merge (if you're sure):
     git merge --allow-unrelated-histories origin/main
  
  2. Or rebase instead:
     git rebase origin/main
  
  3. If merging a new remote:
     git pull origin main --allow-unrelated-histories
  
  4. Caution: Review the merged result carefully — this can create conflicts.
```

---

### Example 4: SQL Error

```bash
oops "ERROR 1064 (42000): You have an error in your SQL syntax near 'WHERE id = 1' at line 1"
```

**Output:**
```
🔍 Error Analysis

Error Type: SQL Syntax Error
Explanation: MySQL detected a syntax error in your SQL query near the WHERE clause.

Root Cause: Likely a missing SELECT/UPDATE/DELETE keyword before WHERE, or a typo.

Solution:
  1. Check for missing keywords:
     ❌ WHERE id = 1
     ✅ SELECT * FROM users WHERE id = 1
  
  2. Common mistakes:
     - Missing FROM clause
     - Typo in keyword (e.g., "SLECT" instead of "SELECT")
     - Missing semicolon in previous statement
  
  3. Full example:
     SELECT name, email FROM users WHERE id = 1;
  
  4. Debug tip: Run your query in a SQL formatter/validator first.
```

---

### Example 5: Kubernetes Error

```bash
oops "Error: ImagePullBackOff"
```

**Output:**
```
🔍 Error Analysis

Error Type: Kubernetes Image Pull Error
Explanation: Kubernetes cannot pull the Docker image for your pod. This usually
            means the image doesn't exist, is private, or the registry is unreachable.

Root Cause: Image not found or authentication failed.

Solution:
  1. Check image name and tag:
     kubectl describe pod <pod-name> | grep Image
     Verify the image exists: docker pull <image-name>
  
  2. If using a private registry, add imagePullSecrets:
     kubectl create secret docker-registry regcred \
       --docker-server=<registry> \
       --docker-username=<user> \
       --docker-password=<pass>
     
     Then in your deployment:
     spec:
       imagePullSecrets:
         - name: regcred
  
  3. Check registry access:
     curl -I https://<registry>/v2/
  
  4. Inspect pod events:
     kubectl describe pod <pod-name>
```

---

### Example 6: React Native Error

```bash
oops "Invariant Violation: Element type is invalid: expected a string or a class/function but got: undefined"
```

**Output:**
```
🔍 Error Analysis

Error Type: React Component Error
Explanation: You're trying to render a component that doesn't exist or wasn't
            imported correctly.

Root Cause: Undefined component — usually caused by:
           - Incorrect import statement
           - Named export vs default export mismatch
           - Component file not found

Solution:
  1. Check your import:
     ❌ import { MyComponent } from './MyComponent';  // if it's a default export
     ✅ import MyComponent from './MyComponent';
  
  2. Verify the component is exported:
     export default function MyComponent() { ... }
  
  3. Check for typos in component name
  
  4. If using a library, ensure it's installed:
     npm install <package-name>
  
  5. Check that you're not importing from a non-existent path
```

---

### Example 7: Ruby Error

```bash
oops "undefined method 'map' for nil:NilClass (NoMethodError)"
```

**Output:**
```
🔍 Error Analysis

Error Type: NoMethodError
Explanation: You called the 'map' method on a nil value. nil doesn't have a 'map' method.

Root Cause: A variable expected to be an array is actually nil.

Solution:
  1. Add a nil check:
     if items
       items.map { |item| item.name }
     end
  
  2. Use safe navigation operator (Ruby 2.3+):
     items&.map { |item| item.name }
  
  3. Provide a default value:
     (items || []).map { |item| item.name }
  
  4. Debug: Check where the variable is assigned:
     puts items.inspect
```

---

## FAQ

**Q: Does oops store my errors?**  
A: No. Errors are sent to OpenAI's API for analysis and not logged by oops itself. Check OpenAI's privacy policy for their data handling.

**Q: Can I use oops offline?**  
A: No, it requires an internet connection to call the OpenAI API.

**Q: Is there a free tier?**  
A: oops itself is free (MIT license), but you pay for OpenAI API usage. Costs are ~$0.001-0.01 per error analysis (depending on model).

**Q: Can I self-host the AI model?**  
A: Not with the current version. oops uses OpenAI's API. Self-hosted LLM support may be added in the future.

**Q: Does it work with all programming languages?**  
A: Yes! oops is language-agnostic. It analyzes error text, regardless of source (Python, JavaScript, Go, Rust, etc.).

**Q: Can I contribute?**  
A: Absolutely! See [Contributing](#contributing).

**Q: What if the analysis is wrong?**  
A: AI isn't perfect. Use the analysis as a starting point, not gospel. If you find consistent issues, report them on GitHub.

---

## Contributing

We welcome contributions! Here's how:

1. **Report bugs:** Open an issue on [GitHub](https://github.com/muin-company/cli-tools/issues)
2. **Suggest features:** Open a discussion or issue
3. **Submit PRs:** Fork, branch, code, test, PR
4. **Improve docs:** README improvements are always appreciated

**Development:**
```bash
# Clone the repo
git clone https://github.com/muin-company/cli-tools.git
cd cli-tools/packages/oops

# Install dependencies
npm install

# Run locally
node bin/cli.js "test error"

# Run tests
npm test

# Lint
npm run lint
```

---

## License

MIT © [MUIN](https://muin.company)

---

## Related Tools

- **[roast](https://github.com/muin-company/cli-tools/tree/main/packages/roast)** — AI code review
- **[git-why](https://github.com/muin-company/cli-tools/tree/main/packages/git-why)** — AI commit message explainer
- **[codechat](https://github.com/muin-company/cli-tools/tree/main/packages/codechat)** — AI coding assistant

---

**Made with ❤️ by the MUIN team**

*일하는 AI, 누리는 인간* 🚀
