<div align="center">

# 🔥 roast

**Gordon Ramsay meets your IDE.**

Brutally honest, hilariously harsh AI code reviews — from your terminal.

[![npm version](https://img.shields.io/npm/v/roast-cli?color=red&label=npm)](https://www.npmjs.com/package/roast-cli)
[![npm downloads/week](https://img.shields.io/npm/dw/roast-cli.svg)](https://www.npmjs.com/package/roast-cli)
[![npm downloads/month](https://img.shields.io/npm/dm/roast-cli.svg)](https://www.npmjs.com/package/roast-cli)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/node/v/roast-cli.svg)](https://nodejs.org)

<br/>

<img src="./demo.gif" alt="roast demo" width="700"/>

<br/>

*Your linter tells you what's wrong. Roast tells you why you should be ashamed.*

</div>

---

## The Problem

Code review tools are **boring**. ESLint tells you to add a semicolon. TypeScript yells about types. SonarQube generates a 47-page PDF nobody reads.

Meanwhile, your actual code problems — pyramid of doom, god functions, cargo-cult patterns — slide right through.

**You don't need another linter. You need someone who cares enough to be mean about it.**

## The Solution

`roast` sends your code to an AI with the personality of a furious celebrity chef. You get back:

- 🔪 **Savage but accurate** feedback on real code smells
- 🎭 **Three intensity levels** — from gentle nudge to Gordon Ramsay meltdown  
- 📝 **Actionable fixes** hidden inside every insult
- 🌍 **Any language** — JS, Python, Go, Rust, Java, you name it

## Quick Start

```bash
npx roast-cli app.js       # Roast any file instantly (no install needed!)
```

> Requires an AI provider API key (see [Configuration](#configuration) below).

Or install globally:

```bash
# NPM
npm install -g roast-cli

# Yarn
yarn global add roast-cli

# PNPM
pnpm add -g roast-cli

# Verify installation
roast --version
```

## Usage

```bash
# Roast a file (default: medium severity)
roast server.js

# Be gentle about it
roast --severity mild utils.py

# Medium spice (default)
roast --severity medium handler.go

# Gordon Ramsay mode 🔥
roast --severity harsh spaghetti.js

# Roast in Korean (or any supported language)
roast app.js --output-lang ko

# Roast your staged git changes in Japanese
git diff --staged | roast --diff --output-lang ja

# Pipe from anywhere
cat spaghetti.rb | roast

# JSON output for CI/CD integration (machine-readable)
roast app.js --json | jq '.summary'

# Serious mode (professional review, no roasting)
roast --serious production.py

# Use a specific model
roast --model gpt-4o legacy-code.java
```

## Roast Levels

| Level | Vibe | Best For |
|-------|------|----------|
| `--severity mild` | Friendly mentor | New devs, PRs you want to keep diplomatic |
| `--severity medium` | Sarcastic senior dev | Team code reviews, your own code |
| `--severity harsh` | Gordon Ramsay 🔥 | Entertainment, humbling yourself, Fridays |

## Examples

### `--severity mild` — Friendly Mentor

<img src="./assets/screenshots/roast-mild.png" alt="roast mild example" width="700"/>

### `--severity medium` — Sarcastic Senior Dev

<img src="./assets/screenshots/roast-medium.png" alt="roast medium example" width="700"/>

### `--severity harsh` — Gordon Ramsay Mode 🔥

<img src="./assets/screenshots/roast-brutal.png" alt="roast brutal example" width="700"/>

## Before → After

<table>
<tr>
<td width="50%">

**Before: Your linter output** 😴
```
src/app.js
  3:5  warning  Unexpected var  no-var
  5:22 warning  Use === instead  eqeqeq
  12:1 warning  Missing semicol  semi
  
✖ 3 problems (0 errors, 3 warnings)
```

*Technically correct. Emotionally empty.*

</td>
<td width="50%">

**After: `roast src/app.js`** 🔥
```
🔪 Using var in 2026 is like bringing
a flip phone to a tech conference. WHY?!

🔪 == true? If you have to ask a boolean
whether it's true, you have trust issues.

🔪 No semicolons AND no consistency?
Pick a style. ANY style. Please.

Rating: 3/10 — Your code works despite
itself. Barely.
```

*You'll actually remember this feedback.*

</td>
</tr>
</table>

## Multilingual Support (v1.1.0+)

`roast` can output in multiple languages using the `--output-lang` flag:

```bash
# Korean — 한국어로 욕먹기
roast app.js --output-lang ko
# Output: "🔥 2026년에 var를 쓰다니... 플로피 디스크로 코딩하시나요?"

# Japanese — 日本語で叱られる
roast app.js --output-lang ja
# Output: "🔥 varを使うとは...まるで昭和のコードだな！"

# Spanish — Insultos en español
roast app.js --output-lang es
# Output: "🔥 ¿var en 2026? ¡Esto es una reliquia!"

# French — Critiques françaises
roast app.js --output-lang fr
# Output: "🔥 var? C'est du code préhistorique!"

# German — Deutsche Kritik
roast app.js --output-lang de
# Output: "🔥 var im Jahr 2026? Das ist museumswürdig!"

# English (default)
roast app.js --output-lang en
```

**The AI maintains the same roasting personality in each language** — Gordon Ramsay screams in any tongue with culturally-adapted insults.

## Configuration

### Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `ANTHROPIC_API_KEY` | One required | — | Anthropic API key (Claude models, recommended) |
| `OPENAI_API_KEY` | One required | — | OpenAI API key (GPT models) |
| `ROAST_MODEL` | | Auto-detect | Default model (overrides auto-detection) |
| `ROAST_SEVERITY` | | `medium` | Default severity (`mild`, `medium`, `harsh`) |

**Setup your API key:**

```bash
# Anthropic (recommended) — Get one at console.anthropic.com
export ANTHROPIC_API_KEY="sk-ant-..."

# Or OpenAI — Get one at platform.openai.com
export OPENAI_API_KEY="sk-..."

# Add to your shell profile for persistence (~/.zshrc, ~/.bashrc)
echo 'export ANTHROPIC_API_KEY="sk-ant-..."' >> ~/.zshrc
```

### Supported Models

**Anthropic (recommended):**
- `claude-sonnet-4-5-20250929` — Best quality/speed balance (default if ANTHROPIC_API_KEY set)
- `claude-opus-4-6` — Highest quality roasts
- `claude-haiku-3-5-20241022` — Fast & cheap

**OpenAI:**
- `gpt-4o-mini` — Fast & cheap (default if OPENAI_API_KEY set)
- `gpt-4o` — Smarter roasts
- `gpt-4-turbo` — Premium burns

**Custom/Local:**
- Any OpenAI-compatible API (Ollama, Together, LocalAI, etc.)
- Set `OPENAI_BASE_URL` to your endpoint

## Use Cases

- **Pre-PR self-review** — Roast your own code before teammates do. Catch embarrassing patterns early.
- **Team Friday fun** — Run `roast --level harsh` on the week's worst PR. Winner gets bragging rights.
- **Onboarding** — New devs roast legacy code to learn what NOT to do (and laugh while doing it).
- **CI gate** — Auto-roast PRs in GitHub Actions. Real feedback, not just lint warnings.
- **Learning tool** — Students get memorable feedback that sticks (nobody forgets being called out by Gordon Ramsay).

## CI/CD Integration (v1.2.0+)

### JSON Output for Automation

Get machine-readable output for CI/CD pipelines using the `--json` flag:

```bash
roast src/app.js --json
```

**Output schema:**

```json
{
  "version": "1.2.0",
  "timestamp": "2026-03-30T12:00:00Z",
  "file_path": "src/app.js",
  "file_name": "app.js",
  "language": "JavaScript",
  "mode": "roast",
  "severity": "medium",
  "model": "claude-sonnet-4-5-20250929",
  "summary": {
    "total_issues": 5,
    "critical_count": 1,
    "warning_count": 2,
    "suggestion_count": 0,
    "compliment_count": 1,
    "roast_count": 1,
    "has_security_issues": true,
    "has_performance_issues": false,
    "has_bugs": false
  },
  "issues": [
    {
      "id": "issue-1",
      "type": "critical",
      "severity": "high",
      "category": "security",
      "title": "SQL Injection vulnerability",
      "description": "Direct string interpolation in SQL query without sanitization...",
      "code_snippet": "const query = `SELECT * FROM users WHERE id = ${userId}`;",
      "line_number": 42,
      "suggestion": "Use parameterized queries or an ORM..."
    }
  ],
  "raw_review": "🔥 CODE ROAST 🔥\n\n🚨 SQL Injection..."
}
```

### JSON Schema Documentation

**Top-level fields:**

| Field | Type | Description |
|-------|------|-------------|
| `version` | string | roast-cli version |
| `timestamp` | ISO 8601 | When the review was generated |
| `file_path` | string | Full path to the reviewed file |
| `file_name` | string | File name only |
| `language` | string | Detected programming language |
| `mode` | string | `"roast"` or `"serious"` |
| `severity` | string | `"mild"`, `"medium"`, or `"harsh"` |
| `model` | string | AI model used for the review |
| `summary` | object | Aggregated statistics (see below) |
| `issues` | array | List of detected issues (see below) |
| `raw_review` | string | Full human-readable review text |

**Summary object:**

| Field | Type | Description |
|-------|------|-------------|
| `total_issues` | number | Total number of issues found |
| `critical_count` | number | Critical severity issues |
| `warning_count` | number | Warning severity issues |
| `suggestion_count` | number | Suggestions for improvement |
| `compliment_count` | number | Positive highlights |
| `roast_count` | number | Roast-style comments |
| `has_security_issues` | boolean | Any security vulnerabilities detected |
| `has_performance_issues` | boolean | Any performance problems detected |
| `has_bugs` | boolean | Any bugs detected |

**Issue object:**

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique issue identifier |
| `type` | string | `"critical"`, `"warning"`, `"suggestion"`, `"compliment"`, `"roast"` |
| `severity` | string | `"high"`, `"medium"`, `"low"` |
| `category` | string | `"security"`, `"performance"`, `"bug"`, `"style"`, `"best-practice"` |
| `title` | string | Short issue description |
| `description` | string | Detailed explanation |
| `code_snippet` | string (optional) | Problematic code |
| `line_number` | number (optional) | Line where issue occurs |
| `suggestion` | string (optional) | How to fix it |

### GitHub Actions Example

Add roast to your PR pipeline:

```yaml
# .github/workflows/roast.yml
name: Roast PR

on:
  pull_request:
    paths:
      - '**.js'
      - '**.ts'
      - '**.py'
      - '**.go'
      - '**.java'

jobs:
  roast:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      
      - name: Install roast-cli
        run: npm install -g roast-cli
      
      - name: Get changed files
        id: changed-files
        uses: tj-actions/changed-files@v44
        with:
          files: |
            **.js
            **.ts
            **.py
            **.go
            **.java
      
      - name: Roast changed files
        if: steps.changed-files.outputs.any_changed == 'true'
        run: |
          for file in ${{ steps.changed-files.outputs.all_changed_files }}; do
            echo "🔥 Roasting $file"
            roast "$file" --json --severity medium > "roast-$(echo $file | tr '/' '-').json"
          done
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
      
      - name: Check for critical issues
        run: |
          CRITICAL=$(cat roast-*.json | jq -s 'map(.summary.critical_count) | add')
          if [ "$CRITICAL" -gt 0 ]; then
            echo "❌ Found $CRITICAL critical issues"
            cat roast-*.json | jq '.issues[] | select(.type == "critical")'
            exit 1
          fi
          echo "✅ No critical issues found"
      
      - name: Upload roast reports
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: roast-reports
          path: roast-*.json
```

### GitLab CI Example

```yaml
# .gitlab-ci.yml
roast:
  stage: test
  image: node:20
  before_script:
    - npm install -g roast-cli
  script:
    - |
      for file in $(git diff --name-only --diff-filter=ACMR $CI_MERGE_REQUEST_DIFF_BASE_SHA | grep -E '\.(js|ts|py)$'); do
        echo "🔥 Roasting $file"
        roast "$file" --json --severity medium > "roast-${file//\//-}.json"
      done
    - |
      CRITICAL=$(cat roast-*.json | jq -s 'map(.summary.critical_count) | add')
      if [ "$CRITICAL" -gt 0 ]; then
        echo "❌ Found $CRITICAL critical issues"
        exit 1
      fi
  artifacts:
    when: always
    paths:
      - roast-*.json
  only:
    - merge_requests
```

### CircleCI Example

```yaml
# .circleci/config.yml
version: 2.1

jobs:
  roast:
    docker:
      - image: cimg/node:20.0
    steps:
      - checkout
      - run:
          name: Install roast-cli
          command: npm install -g roast-cli
      - run:
          name: Roast changed files
          command: |
            git diff --name-only HEAD~1 | grep -E '\.(js|ts|py)$' | while read file; do
              echo "🔥 Roasting $file"
              roast "$file" --json > "roast-${file//\//-}.json"
            done
      - run:
          name: Check for critical issues
          command: |
            CRITICAL=$(cat roast-*.json | jq -s 'map(.summary.critical_count) | add')
            if [ "$CRITICAL" -gt 0 ]; then
              echo "❌ Found $CRITICAL critical issues"
              exit 1
            fi
      - store_artifacts:
          path: roast-*.json

workflows:
  main:
    jobs:
      - roast
```

## vs Alternatives

| Tool | What it does | Vibe |
|------|-------------|------|
| ESLint | Rule-based linting | 🤖 "Line 12: missing semicolon" |
| SonarQube | Enterprise code quality | 📊 47-page PDF |
| CodeRabbit | AI PR review | 🐰 Polite suggestions |
| **roast** | **AI code roasting** | **🔥 "This code is DISGUSTING!"** |

`roast` isn't a replacement for your linter. It's the brutal honesty your linter is too polite to give you. Use both.

## FAQ

**Q: Does it actually help?**  
A: Yes. Every roast contains real, actionable feedback. The humor makes you actually read it.

**Q: Will it hurt my feelings?**  
A: Use `--level mild` if you're emotionally fragile. No judgment. Actually, a little judgment.

**Q: How much does it cost?**  
A: ~$0.001 per roast with `gpt-4o-mini`. Mass roasting your entire codebase costs less than a coffee.

**Q: Can I use it with Ollama / local models?**  
A: Set `OPENAI_BASE_URL` to your local endpoint. Works with any OpenAI-compatible API.

## Featured On

Read the launch article on Dev.to: **[4 CLI Tools Every Developer Needs (That You've Never Heard Of)](https://dev.to/mjmuin/4-cli-tools-every-developer-needs-that-youve-never-heard-of-318b)**

## Also From MUIN

Love `roast`? Check out our other developer CLI tools:

- **[git-why](https://www.npmjs.com/package/git-why)** — AI-powered git history explainer. `roast` tells you what's wrong; `git-why` tells you *why* it got that way.
- **[oops-ai](https://www.npmjs.com/package/oops-ai)** — Pipe any error to AI for instant fixes. When `roast` hurts your feelings and you break something, `oops` picks up the pieces.
- **[portguard](https://www.npmjs.com/package/portguard)** — Monitor and kill zombie processes hogging your ports. Because roasted code still needs to run somewhere.

## Contributing

Found a bug? Want a new roast persona? PRs welcome.

```bash
git clone https://github.com/muin-company/cli-tools.git
cd cli-tools/packages/roast
npm install
node src/cli.js examples/bad.js
```

## License

MIT © [MUIN](https://muin.company)

---

<div align="center">

**Built by [MUIN](https://muin.company)** — *AI가 일하고, 인간이 누린다.*

🔥 Stop writing bad code. Or don't — we'll roast it either way.

</div>
