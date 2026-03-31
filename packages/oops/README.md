# oops-cli

> AI-powered error message explainer — paste an error, get a human-readable explanation and fix suggestions.

![npm version](https://img.shields.io/npm/v/oops-cli)
![license](https://img.shields.io/npm/l/oops-cli)

Stop staring at cryptic error messages. `oops` uses AI to explain what went wrong and how to fix it — right in your terminal.

## Installation

```bash
# Global install
npm install -g oops-cli

# Or run directly with npx
npx oops-cli "your error message here"
```

## Usage

### Basic — explain an error message

```bash
oops "Cannot read property 'x' of undefined"
```

### From a file — read errors from a log file

```bash
oops --file error.log
```

### Stack trace — analyze a full stack trace

```bash
oops --stack "Error: ECONNREFUSED 127.0.0.1:5432
    at TCPConnectWrap.afterConnect [as oncomplete] (net.js:1141:16)"
```

### JSON output — machine-readable results (CI/CD ready)

```bash
oops "TypeError: Assignment to constant variable" --json
```

**Example output:**
```json
{
  "error": "TypeError: Assignment to constant variable",
  "errorType": "TypeError",
  "explanation": "You tried to reassign a value to a constant variable declared with `const`.",
  "solution": "Use `let` instead of `const` if the variable needs to be reassigned, or avoid reassigning the constant.",
  "rootCause": "JavaScript constants are immutable references and cannot be reassigned after declaration.",
  "context": {
    "file": null,
    "line": 0,
    "column": null,
    "codeSnippet": null
  },
  "timestamp": "2026-03-31T10:30:00.000Z",
  "model": "gpt-4o-mini",
  "version": "1.1.0"
}
```

### Language — get explanations in another language

```bash
oops "エラー: 接続がタイムアウトしました" --lang ja
```

## Options

| Option | Alias | Description |
|--------|-------|-------------|
| `--file <path>` | `-f` | Read error message from a file |
| `--stack <trace>` | `-s` | Analyze a full stack trace |
| `--json` | `-j` | Output results as JSON |
| `--lang <code>` | `-l` | Language for explanation (default: `en`) |
| `--model <name>` | `-m` | AI model to use (default: `gpt-4o-mini`) |
| `--verbose` | `-v` | Show detailed analysis |
| `--help` | `-h` | Show help |
| `--version` | | Show version |

## Use Cases

### 🐛 Error Debugging
Paste any error message and get an instant, plain-English explanation with suggested fixes. No more copying errors into Google.

### 📚 Stack Trace Analysis
Feed `oops` a full stack trace and it identifies the root cause, explains each frame, and suggests where to look first.

### 🎓 New Developer Onboarding
Junior developers can understand error messages independently, reducing interruptions for senior team members.

### 🤖 CI/CD Integration
Use `--json` mode to integrate error analysis into your continuous integration pipeline:

**GitHub Actions Example:**
```yaml
name: Error Analysis
on: [push]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run tests and capture errors
        id: test
        continue-on-error: true
        run: npm test 2>&1 | tee error.log
      
      - name: Analyze errors with oops
        if: failure()
        run: |
          npx oops-cli --file error.log --json > analysis.json
          cat analysis.json
        env:
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
      
      - name: Post analysis to PR
        if: failure()
        uses: actions/github-script@v6
        with:
          script: |
            const fs = require('fs');
            const analysis = JSON.parse(fs.readFileSync('analysis.json', 'utf8'));
            await github.rest.issues.createComment({
              owner: context.repo.owner,
              repo: context.repo.repo,
              issue_number: context.issue.number,
              body: `## 🔍 Error Analysis\n\n**Error:** ${analysis.error}\n\n**Explanation:** ${analysis.explanation}\n\n**Solution:** ${analysis.solution}`
            });
```

**Jenkins Pipeline:**
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
          try {
            sh 'npm test'
          } catch (Exception e) {
            sh 'npm test 2>&1 | npx oops-cli --json > analysis.json'
            def analysis = readJSON file: 'analysis.json'
            echo "Error: ${analysis.error}"
            echo "Solution: ${analysis.solution}"
            error("Tests failed - see analysis above")
          }
        }
      }
    }
  }
}
```

**GitLab CI:**
```yaml
test:
  script:
    - npm test 2>&1 | tee error.log || true
    - |
      if [ -s error.log ]; then
        npx oops-cli --file error.log --json > analysis.json
        cat analysis.json
      fi
  artifacts:
    paths:
      - analysis.json
    when: on_failure
```

## How It Works

`oops` sends your error message to an AI model (OpenAI by default) and returns:
1. **What happened** — plain-language explanation
2. **Why it happened** — common causes
3. **How to fix it** — actionable steps

## Environment Variables

| Variable | Description |
|----------|-------------|
| `OPENAI_API_KEY` | OpenAI API key (required) |
| `OOPS_MODEL` | Default model override |
| `OOPS_LANG` | Default language override |

## License

MIT © [MUIN](https://muin.company)
