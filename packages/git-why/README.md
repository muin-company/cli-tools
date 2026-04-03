<div align="center">

<a href="https://www.producthunt.com/posts/git-why?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-git&#0045;why" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=git-why&theme=light" alt="git&#0045;why - Understand&#0032;git&#0032;commits&#0032;with&#0032;AI | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a>

# 🔍 git-why

**Git blame tells you *who*. git-why tells you *WHY*.**

[![npm version](https://img.shields.io/npm/v/git-why?color=blue&label=npm)](https://www.npmjs.com/package/git-why)
[![npm downloads/week](https://img.shields.io/npm/dw/git-why.svg)](https://www.npmjs.com/package/git-why)
[![npm downloads/month](https://img.shields.io/npm/dm/git-why.svg)](https://www.npmjs.com/package/git-why)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/node/v/git-why.svg)](https://nodejs.org)

<br/>

<img src="./demo.gif" alt="git-why demo" width="700"/>

<br/>

*AI-powered git history explainer. Understand the "why" behind any line of code.*

</div>

---

## Keywords

git blame alternative · git history analysis · commit context · AI code archaeology · git history explainer · code context analysis · commit message analyzer · git diff analysis · technical debt investigation · legacy code understanding

---

## The Problem

You open a file. Line 87 has a bizarre regex. The variable name makes no sense. There's a try-catch wrapping a single assignment.

You run `git blame`. Now you know *who* wrote it and *when*. Congratulations — you still have no idea **why**.

You could dig through commit messages, PRs, and Slack history. Or you could:

```bash
git-why src/validators.js:87
```

## What It Does

`git-why` analyzes git blame, commit messages, and diffs — then uses AI to explain the reasoning behind the code. It turns raw git history into a human-readable narrative.

```
📖 Git History Explanation
────────────────────────────────────────────────

This unusual email regex was added after discovering that
RFC 5322 validation rejected corporate emails with + signs
(e.g., "user+tag@company.com").

The commented-out "strict mode" was an attempted fix that
broke too many legitimate addresses in production — kept as
documentation of what NOT to do.

────────────────────────────────────────────────
```

Think of it as having a senior developer explain the archaeological layers of your codebase — except they actually read all the commit messages.

## Quick Start

```bash
export ANTHROPIC_API_KEY="sk-ant-..."   # Get key at console.anthropic.com
npx git-why src/auth.js:42             # Explain why line 42 exists
```

Or install globally:

```bash
npm install -g git-why
```

## Usage

```bash
git-why src/auth.js:42              # Explain a specific line
git-why src/auth.js:42-58           # Explain a range
git-why --function validateUser src/auth.js  # Explain a function
git-why src/auth.js                 # Explain an entire file
git-why src/auth.js src/utils.js    # Multiple files at once
git-why --verbose src/cache.js:67   # Full commit details
git-why --json src/config.js:15     # JSON output for scripts
```

## Examples

### 1. Understanding mysterious code

You find a 200-line payment handler full of null checks and retry logic. Before you "clean it up":

```bash
$ git-why --function handlePayment src/payment.js
```
```
📖 Git History Explanation
────────────────────────────────────────────────

This payment handler accumulated defensive checks over time
due to several production incidents:

1. The null check for `amount` — added after undefined amounts
   caused Stripe to charge $0.00, creating accounting chaos.

2. The retry logic — payment webhooks occasionally fail due to
   network timeouts. Immediate retries succeed 90% of the time.
   Without this, users saw "payment failed" despite successful charges.

3. The database transaction wrapper — added after a race condition
   where duplicate form submissions created multiple charges.

Each "ugly" part solved a real production problem.

────────────────────────────────────────────────
```

Now you know the landmines *before* you refactor.

### 2. Code review context

Reviewing a PR with suspicious-looking changes:

```bash
$ git-why src/api/rate-limiter.js:42
```
```
📖 Git History Explanation
────────────────────────────────────────────────

This Redis-based rate limiter replaced an in-memory solution
after the app scaled to multiple servers.

The 60-second window / 100 request limit was chosen based on
actual API usage patterns — 99% of legitimate users make fewer
than 50 requests/minute, but bots exceed 200/minute.

The sliding window algorithm (vs fixed window) prevents the
"reset boundary exploit" where users could make 200 requests
in 2 seconds by timing requests around the minute boundary.

────────────────────────────────────────────────
```

### 3. Onboarding to a legacy codebase

New to the team. Everything looks like spaghetti:

```bash
$ git-why src/legacy/parser.js
```
```
📖 Git History Explanation
────────────────────────────────────────────────

This parser handles data from an old third-party API
(deprecated 2024). It remains because:

1. 200+ customers still use the legacy integration
2. Migration is phased over 2 years
3. New code should use src/parsers/v2/ instead

The unusual regex patterns handle malformed XML from the old
vendor (who never fixed their output despite bug reports).

DO NOT refactor — this code is intentionally defensive and
will be removed entirely in Q4 2026.

────────────────────────────────────────────────
18 commits across 3 years, 4 contributors
```

### 4. Verbose mode — full commit details

```bash
$ git-why --verbose src/cache.js:67
```
```
📖 Git History Explanation
────────────────────────────────────────────────

This cache invalidation is intentionally aggressive after
a production bug where stale data persisted for hours.

────────────────────────────────────────────────
Commits analyzed:

f3a7b2c1 - 2026-01-20 14:45
  Alice Wong — Fix cache invalidation for nested relationships

  Original implementation only cleared exact keys:
  - cache.del(`user:${id}`)

  But didn't clear related keys like user:{id}:posts,
  user:{id}:settings — leading to stale data bugs.

d4e9c8b7 - 2025-11-12 09:23
  Bob Smith — Add Redis caching layer

────────────────────────────────────────────────
```

### 5. JSON output for automation

```bash
$ git-why --json src/config.js:15 | jq -r '.explanation'
```

Pipe to scripts, CI pipelines, or documentation generators:

```bash
# Generate history docs for core files
for file in src/core/*.js; do
  git-why "$file" --json | jq -r '.explanation' >> docs/architecture-decisions.md
done
```

## Use Cases

### 🐛 Debugging Production Bugs

**The scenario:** A customer reports intermittent 500 errors. You trace it to a 3-year-old try-catch block that swallows exceptions silently.

```bash
git-why src/api/webhook-handler.js:156
```

**Result:** Discover that the silent error handling was added during a critical outage — webhooks from a third-party were occasionally malformed, crashing the entire service. The swallowed errors were meant as a temporary hotfix... that never got reverted.

**Value:** You now know to fix it properly (validate webhook payloads) instead of just removing the try-catch and re-introducing the original crash.

### 🧹 Refactoring Legacy Code

**The scenario:** You inherit a 2000-line "God class" and want to split it up. But which parts are safe to move?

```bash
git-why src/services/UserService.js
```

**Result:** Learn that the seemingly random method groupings actually correspond to different migrations:
- Lines 1-500: Original v1 implementation (stable, heavily tested)
- Lines 501-1200: OAuth integration (tightly coupled to passport.js, don't separate)
- Lines 1201-2000: Admin features (can be extracted to separate AdminService)

**Value:** Refactor with confidence. You know what's load-bearing and what's modular.

### 📚 Onboarding New Developers

**The scenario:** Junior dev asks "Why do we have three different date formatting functions?"

```bash
git-why src/utils/dates.js:15,42,89
```

**Result:** 
- formatDateISO (line 15): Added for API responses (backend expects ISO 8601)
- formatDateDisplay (line 42): Added for UI (users want "Jan 5, 2026")
- formatDateLegacy (line 89): Added for old reports export (Excel compatibility)

**Value:** New team member understands the *reasons* behind apparent duplication instead of thinking "this team writes sloppy code."

### 🔍 Investigating Technical Debt

**The scenario:** Performance audit reveals a 200ms database query running on every page load. Why wasn't it cached?

```bash
git-why --verbose src/models/User.js:234
```

**Result:** Original implementation DID have caching (2 years ago). It was removed after a bug where cached user roles persisted after permission changes — leading to a security vulnerability. The comment explaining this was deleted in a later "cleanup" commit.

**Value:** Now you know the cache needs cache invalidation logic, not just blindly re-adding caching.

### 🚀 Code Review Preparation

**The scenario:** You're about to submit a PR that removes 100 lines of "dead code." Want to be sure it's actually dead.

```bash
git-why src/integrations/slack-notifier.js
```

**Result:** That "dead" code handles Slack API rate limiting (429 errors). The function is only called during traffic spikes — which you've never seen in local dev. Removing it would cause production outages during launches.

**Value:** PR disasters averted. You keep the rate limiting code and add a test for it instead.

## Advanced Usage

### Multiple Files at Once

Analyze related files in one go:

```bash
git-why src/auth/*.js
```

Or specific lines across multiple files:

```bash
git-why src/api/routes.js:42 src/middleware/auth.js:15 src/models/User.js:89
```

**Use case:** Understanding a cross-file feature (e.g., authentication flow spanning routes, middleware, and models).

### Function-Level Analysis

Explain an entire function's history without specifying line numbers:

```bash
git-why --function calculateDiscount src/pricing.js
```

**How it works:** Parses the AST to find function boundaries, then analyzes all commits that touched those lines.

**Use case:** Understanding business logic evolution (e.g., "Why does this discount calculation have 7 edge cases?").

### Combining with Git Commands

#### Explain your staged changes

```bash
git diff --cached --name-only | xargs -I {} git-why {}
```

**Use case:** Pre-commit review — understand what you're about to change.

#### Explain files changed in a PR

```bash
git diff main --name-only | xargs git-why
```

**Use case:** Reviewing a PR branch before pushing.

#### Explain only modified lines in a file

```bash
git diff main src/app.js | grep '^@@' | awk '{print $3}' | cut -d',' -f1 | tr -d '+' | xargs -I {} git-why src/app.js:{}
```

**Use case:** Focus only on lines that changed, not the entire file.

### Range Analysis

Analyze a block of code:

```bash
git-why src/parser.js:42-156
```

**Use case:** Understanding a complex algorithm or state machine that spans multiple lines.

### Verbose Mode for Deep Dives

```bash
git-why --verbose src/config.js:15
```

**Outputs:**
- Full commit messages (not just summaries)
- Commit hashes and timestamps
- Author names
- Full diff context

**Use case:** When the summary isn't enough — you need the raw archaeology.

## CI/CD Integration

### GitHub Actions - Automatic PR Context

Add context to every PR automatically:

```yaml
# .github/workflows/git-why.yml
name: Add History Context to PR

on:
  pull_request:
    types: [opened, synchronize]

jobs:
  context:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0  # Full history needed
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      
      - name: Install git-why
        run: npm install -g git-why
      
      - name: Get changed files
        id: changed-files
        uses: tj-actions/changed-files@v44
      
      - name: Analyze changed files
        if: steps.changed-files.outputs.any_changed == 'true'
        run: |
          echo "# 📖 Code History Context" > context.md
          echo "" >> context.md
          for file in ${{ steps.changed-files.outputs.all_changed_files }}; do
            if [[ "$file" =~ \.(js|ts|py|go|java|rb|php)$ ]]; then
              echo "## $file" >> context.md
              echo "" >> context.md
              git-why "$file" --json | jq -r '.explanation' >> context.md
              echo "" >> context.md
            fi
          done
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
      
      - name: Comment on PR
        uses: actions/github-script@v7
        with:
          script: |
            const fs = require('fs');
            const context = fs.readFileSync('context.md', 'utf8');
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: context
            });
```

**Result:** Every PR gets an automatic comment explaining the history of changed code.

### GitLab CI - Block PRs Touching Critical Code

Require manual approval if changes touch historically problematic files:

```yaml
# .gitlab-ci.yml
history-check:
  stage: validate
  image: node:20
  before_script:
    - npm install -g git-why
  script:
    - |
      CRITICAL_FILES="src/payment/* src/auth/* src/database/*"
      CHANGED_FILES=$(git diff --name-only $CI_MERGE_REQUEST_DIFF_BASE_SHA)
      
      for pattern in $CRITICAL_FILES; do
        for file in $CHANGED_FILES; do
          if [[ "$file" == $pattern ]]; then
            echo "🚨 Critical file changed: $file"
            git-why "$file" --json > "history-$file.json"
            
            # Check if file has 10+ commits (historically problematic)
            COMMIT_COUNT=$(git log --oneline "$file" | wc -l)
            if [ "$COMMIT_COUNT" -gt 10 ]; then
              echo "⚠️ High-churn file ($COMMIT_COUNT commits) — manual review required"
              exit 1
            fi
          fi
        done
      done
  artifacts:
    paths:
      - history-*.json
  only:
    - merge_requests
```

### CircleCI - Generate Architecture Decision Records

Auto-document why code exists:

```yaml
# .circleci/config.yml
version: 2.1

jobs:
  document-history:
    docker:
      - image: cimg/node:20.0
    steps:
      - checkout
      - run:
          name: Install git-why
          command: npm install -g git-why
      - run:
          name: Generate ADRs
          command: |
            mkdir -p docs/architecture
            for file in src/core/*.js src/services/*.js; do
              filename=$(basename "$file" .js)
              echo "# ADR: $filename" > "docs/architecture/$filename-history.md"
              echo "" >> "docs/architecture/$filename-history.md"
              git-why "$file" --json | jq -r '.explanation' >> "docs/architecture/$filename-history.md"
            done
      - persist_to_workspace:
          root: docs
          paths:
            - architecture
      - store_artifacts:
          path: docs/architecture

workflows:
  document:
    jobs:
      - document-history:
          filters:
            branches:
              only: main
```

## JSON Output

### Schema

```json
{
  "file": "src/auth.js",
  "lines": "42-58",
  "commits": [
    {
      "hash": "f3a7b2c1",
      "author": "Alice Wong",
      "date": "2026-01-20T14:45:00Z",
      "message": "Fix cache invalidation for nested relationships",
      "summary": "Original implementation only cleared exact keys..."
    }
  ],
  "explanation": "This cache invalidation is intentionally aggressive after a production bug...",
  "model": "claude-sonnet-4-5-20250929",
  "timestamp": "2026-03-30T12:00:00Z"
}
```

### Programmatic Usage

```javascript
const { execSync } = require('child_process');

function explainCode(file, lines) {
  const output = execSync(`git-why ${file}:${lines} --json`, {
    encoding: 'utf8'
  });
  return JSON.parse(output);
}

// Example: Check if a file has complex history
const history = explainCode('src/payment.js', '42-89');
if (history.commits.length > 10) {
  console.log('⚠️ High-churn code — review carefully');
}
```

### Integration with Documentation Tools

```bash
# Generate markdown docs from git history
git-why src/core/*.js --json | jq -r '
  "# \(.file)\n\n\(.explanation)\n\n" +
  "**Commits:** \(.commits | length)\n" +
  "**Last changed:** \(.commits[0].date)\n\n---\n"
' > docs/code-history.md
```

## Performance Tips

### For Large Repositories

**Problem:** Running `git-why` on files with 1000+ commits can be slow.

**Solutions:**

1. **Limit commit depth:**
   ```bash
   git-why src/huge-file.js --max-commits 50
   ```
   Only analyze the most recent 50 commits instead of all history.

2. **Use line ranges instead of full files:**
   ```bash
   git-why src/huge-file.js:42-58  # Fast
   git-why src/huge-file.js        # Slow
   ```

3. **Cache git blame results:**
   ```bash
   git blame src/file.js > /tmp/blame-cache.txt
   git-why src/file.js --blame-cache /tmp/blame-cache.txt
   ```

4. **Parallelize multiple files:**
   ```bash
   # Instead of sequential:
   git-why file1.js file2.js file3.js
   
   # Parallel (faster):
   ls src/*.js | xargs -P 4 -I {} git-why {}
   ```

### Reducing API Costs

**Problem:** Each `git-why` call costs ~$0.01 with Claude Sonnet.

**Solutions:**

1. **Batch related files:**
   ```bash
   git-why src/auth/*.js  # One API call
   ```
   vs.
   ```bash
   for file in src/auth/*.js; do git-why "$file"; done  # Multiple calls
   ```

2. **Use caching for repeated analysis:**
   ```bash
   git-why src/file.js > /tmp/git-why-cache.txt
   # Re-use cached result later
   ```

3. **Target specific lines, not entire files:**
   ```bash
   git-why src/large-file.js:42  # Cheaper
   git-why src/large-file.js     # Expensive
   ```

### Optimizing CI Pipelines

```yaml
# Only run git-why on files that actually changed
- name: Selective analysis
  run: |
    git diff --name-only $BASE_SHA | \
    grep -E '\.(js|ts|py)$' | \
    head -n 10 | \
    xargs git-why
```

**Result:** Analyze max 10 files per PR (avoid $10 CI bills on large PRs).

## Troubleshooting

### "No commits found for this line"

**Cause:** Line is too new (not in git history) or git blame failed.

**Solutions:**
- Run `git add` to stage the file
- Check file exists: `git ls-files src/file.js`
- Try a different line number

### "API key not found"

**Cause:** Missing `ANTHROPIC_API_KEY` environment variable.

**Fix:**
```bash
export ANTHROPIC_API_KEY="sk-ant-..."
echo 'export ANTHROPIC_API_KEY="sk-ant-..."' >> ~/.zshrc
```

### "Rate limit exceeded"

**Cause:** Too many API calls in a short period.

**Solutions:**
- Add delays between calls: `git-why file1.js && sleep 2 && git-why file2.js`
- Switch to a higher-tier API plan
- Use `--max-commits` to reduce tokens sent

### "git: command not found"

**Cause:** Not in a git repository.

**Fix:**
```bash
cd /path/to/git/repo
git-why src/file.js
```

### Verbose mode shows no commits

**Cause:** File was renamed and git history was lost.

**Solutions:**
```bash
# Follow renames
git log --follow src/file.js

# Manual history lookup
git log --all --full-history -- src/file.js
```

### JSON output is malformed

**Cause:** AI response included markdown formatting.

**Fix:**
- Retry (AI responses vary)
- Open an issue with the specific file/line
- Use `--verbose` to see raw output

## vs git-blame

| Feature | git-why | git-blame |
|---------|---------|-----------|
| **Shows who** | ✅ | ✅ |
| **Shows when** | ✅ | ✅ |
| **Shows why** | ✅ | ❌ |
| **Human-readable narrative** | ✅ | ❌ |
| **Connects multiple commits** | ✅ | ❌ |
| **Explains business logic** | ✅ | ❌ |
| **Function-level analysis** | ✅ | ❌ |
| **Works offline** | ❌ | ✅ |
| **Cost** | ~$0.01/file | Free |
| **Speed** | 2-5 seconds | <1 second |

**Use `git-blame` when:**
- You just need author/date info quickly
- Working offline
- Scripting (no API dependency)

**Use `git-why` when:**
- You need to understand *reasoning*
- Reviewing unfamiliar code
- Investigating technical debt
- Onboarding to a legacy codebase
- Pre-refactoring analysis

### Side-by-Side Example

**git-blame output:**
```
f3a7b2c1 (Alice Wong 2026-01-20 14:45:00) const cache = new Redis();
d4e9c8b7 (Bob Smith   2025-11-12 09:23:15) cache.del(`user:${id}`);
a1b2c3d4 (Alice Wong 2026-01-20 14:47:30) cache.del(`user:${id}:*`);
```

**What you learn:** Three people touched this code. Three different timestamps. 🤷

**git-why output:**
```
📖 Git History Explanation
────────────────────────────────────────────────

This cache invalidation evolved through three stages:

1. Initial implementation (Bob, Nov 2025): Simple key-based
   cache clearing. Worked for basic user data.

2. Production bug (Alice, Jan 2026): Users reported stale
   profile data. Issue: nested cache keys (user:123:posts)
   weren't cleared. Alice added wildcard pattern clearing.

3. Performance fix (Alice, same day): Wildcard clearing was
   too slow. Switched to explicit nested key deletion.

Why it looks complex: Each iteration fixed a real bug.
────────────────────────────────────────────────
```

**What you learn:** The *story*. You now understand the code's evolution and won't make the same mistakes.

## vs Alternatives

| Tool | What it does | Best for |
|------|-------------|----------|
| **git-blame** | Shows author/date per line | Quick authorship lookup |
| **git log** | Shows commit history | Browsing chronological changes |
| **tig** | Interactive git log TUI | Manual history exploration |
| **GitHub Blame UI** | Web-based git blame | Casual users (non-technical) |
| **GitLens (VS Code)** | Inline git blame in editor | Active development |
| **git-why** | AI-powered *why* explainer | Understanding reasoning |

**git-why is the only tool that:**
- Synthesizes multiple commits into a narrative
- Explains *business reasoning* behind code
- Works across your entire codebase (not just open files)
- Generates explanations for documentation

## Integration

### Git Alias

```bash
git config --global alias.why '!f() { git-why "$@"; }; f'
```

Now use as a native git command:

```bash
git why src/auth.js:42
git why --function handlePayment src/payment.js
```

### VS Code Task

Add to `.vscode/tasks.json`:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "git-why: Explain Current Line",
      "type": "shell",
      "command": "git-why ${relativeFile}:${lineNumber}",
      "presentation": {
        "reveal": "always",
        "panel": "new"
      }
    },
    {
      "label": "git-why: Explain Current File",
      "type": "shell",
      "command": "git-why ${relativeFile}",
      "presentation": {
        "reveal": "always",
        "panel": "new"
      }
    }
  ]
}
```

**Usage:** `Cmd+Shift+P` → "Run Task" → "git-why: Explain Current Line"

### Shell Function

Add to `~/.zshrc` or `~/.bashrc`:

```bash
# Explain current file
gwhy() {
  git-why "$@"
}

# Explain with verbose output
gwhyv() {
  git-why --verbose "$@"
}

# Explain and copy to clipboard (macOS)
gwhyc() {
  git-why "$@" | pbcopy
  echo "✅ Explanation copied to clipboard"
}
```

### Pre-commit Hook

Auto-explain staged changes before committing:

```bash
# .git/hooks/pre-commit
#!/bin/bash

echo "🔍 Analyzing staged changes..."
git diff --cached --name-only | while read file; do
  if [[ "$file" =~ \.(js|ts|py|go)$ ]]; then
    echo "📖 $file:"
    git-why "$file" | head -n 10
    echo ""
  fi
done

read -p "Proceed with commit? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  exit 1
fi
```

### Vim/Neovim Integration

Add to `.vimrc` or `init.vim`:

```vim
" Explain current line
nnoremap <leader>gw :!git-why %:<C-r>=line(".")<CR><CR>

" Explain current file
nnoremap <leader>gW :!git-why %<CR>
```

### Raycast Script Command

Create `git-why-current-file.sh`:

```bash
#!/bin/bash

# Required parameters:
# @raycast.schemaVersion 1
# @raycast.title Explain Current File
# @raycast.mode fullOutput

# Optional parameters:
# @raycast.packageName Git Why

# Get current file from clipboard or prompt
file=$(pbpaste)
git-why "$file"
```

## Requirements

- **Node.js** ≥ 18
- **Git** ≥ 2.0 (with commit history)
- **Anthropic API key** (get one at [console.anthropic.com](https://console.anthropic.com))

## Limitations

- ❌ Requires internet (API call to Claude)
- ❌ Doesn't follow file renames (yet — use `git log --follow` manually)
- ❌ Can't explain deleted code (analyze before deletion)
- ❌ Binary files not supported
- ❌ AI explanations may occasionally misinterpret context
- ❌ Cost: ~$0.01 per file (negligible for most use cases)

## Roadmap

- [ ] Support file renames (`git log --follow`)
- [ ] Local model support (Ollama, LM Studio)
- [ ] Cached explanations (avoid re-analyzing unchanged files)
- [ ] Interactive TUI mode (browse file history visually)
- [ ] VS Code extension
- [ ] Compare mode (explain differences between two commits)
- [ ] Team mode (share explanations across team members)

## Featured On

Read the launch article on Dev.to: **[4 CLI Tools Every Developer Needs (That You've Never Heard Of)](https://dev.to/mjmuin/4-cli-tools-every-developer-needs-that-youve-never-heard-of-318b)**

## Also From MUIN

Love `git-why`? Check out our other developer CLI tools:

- **[roast-cli](https://www.npmjs.com/package/roast-cli)** — AI code reviews with Gordon Ramsay energy. Understand the *why* with `git-why`, then get brutally honest feedback with `roast`.
- **[oops-ai](https://www.npmjs.com/package/oops-ai)** — Pipe any error to AI for instant fixes. When `git-why` reveals the landmines, `oops` helps defuse them.
- **[portguard](https://www.npmjs.com/package/portguard)** — Monitor and kill zombie processes hogging your ports.

## Contributing

Found a bug? Have an idea? PRs welcome.

```bash
git clone https://github.com/muin-company/cli-tools.git
cd cli-tools/packages/git-why
npm install
node src/cli.js src/cli.js:1
```

## License

MIT

## Credits

Built with [Anthropic Claude](https://anthropic.com), [Commander.js](https://github.com/tj/commander.js), and [Chalk](https://github.com/chalk/chalk).

---

**Built by [MUIN](https://muin.company)** — *일하는 AI, 누리는 인간*

🔍 Good code tells you what. Great code tells you why.
