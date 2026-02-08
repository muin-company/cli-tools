# @muin/bundlesize

[![npm version](https://img.shields.io/npm/v/@muin/bundlesize.svg)](https://www.npmjs.com/package/@muin/bundlesize)
[![npm downloads](https://img.shields.io/npm/dm/@muin/bundlesize.svg)](https://www.npmjs.com/package/@muin/bundlesize)
[![license](https://img.shields.io/npm/l/@muin/bundlesize.svg)](https://github.com/muin-company/cli-tools/blob/main/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/muin-company/cli-tools/blob/main/CONTRIBUTING.md)

Keep your JavaScript bundles in check with interactive size analysis and tracking.

## Features

- 📊 **Bundle Analysis** - Deep analysis of bundle composition and dependencies
- 🎯 **Size Tracking** - Track bundle size changes across builds
- 🚨 **Size Limits** - Set maximum size limits with CI integration
- 📈 **Historical Trends** - Track size evolution over time
- 🔍 **File Explorer** - Interactive file-by-file breakdown
- 🎨 **Visualization** - Beautiful charts and treemaps
- ⚡ **Performance Score** - Bundle health scoring
- 🔄 **Git Integration** - Automatic commit-to-commit comparison
- 📦 **Multi-Bundle** - Support for multiple bundles in one project
- 🤖 **CI/CD Ready** - GitHub Actions, GitLab CI, CircleCI support

## Installation

```bash
npm install -g @muin/bundlesize
```

Or use directly with npx:

```bash
npx @muin/bundlesize
```

## Quick Start

The fastest way to get started:

```bash
# Analyze current bundle
bundlesize analyze dist/main.js

# Interactive mode
bundlesize --interactive

# Set size limits
bundlesize check dist/main.js --max-size 200kb
```

## Usage

### Interactive Mode (Recommended)

```bash
bundlesize --interactive
```

The interactive mode provides:
1. Bundle selection (auto-detect or manual)
2. Analysis type selection (size, composition, treemap)
3. Comparison options (vs previous build, vs branch, vs tag)
4. Export options (JSON, HTML report, PNG chart)
5. CI configuration wizard

### CLI Mode

```bash
# Analyze a single bundle
bundlesize analyze dist/bundle.js

# Check against size limit
bundlesize check dist/bundle.js --max-size 250kb

# Compare with previous build
bundlesize compare dist/bundle.js --base main

# Generate report
bundlesize report dist/bundle.js --format html --output report.html

# Track size history
bundlesize track dist/bundle.js --save

# Show treemap visualization
bundlesize treemap dist/bundle.js
```

### Options

#### Analysis Commands
- `analyze <file>` - Analyze bundle size and composition
- `check <file>` - Check bundle size against limits
- `compare <file>` - Compare bundle with baseline
- `report <file>` - Generate detailed report
- `track <file>` - Track size over time
- `treemap <file>` - Generate treemap visualization

#### Global Options
- `-i, --interactive` - Launch interactive mode
- `-c, --config <file>` - Use configuration file (default: `.bundlesizerc.json`)
- `-q, --quiet` - Suppress non-error output
- `-v, --verbose` - Show detailed output
- `--no-color` - Disable colored output

#### Check Options
- `--max-size <size>` - Maximum allowed size (e.g., 200kb, 1.5mb)
- `--max-gzip <size>` - Maximum gzipped size
- `--max-brotli <size>` - Maximum brotli compressed size
- `--fail-on-increase` - Fail if size increased from baseline
- `--threshold <percent>` - Fail if size increase exceeds percentage

#### Compare Options
- `--base <branch|tag|commit>` - Baseline for comparison (default: `main`)
- `--show-diff` - Show file-by-file differences
- `--json` - Output comparison as JSON

#### Report Options
- `-f, --format <type>` - Report format: `text`, `json`, `html`, `markdown`
- `-o, --output <file>` - Write report to file
- `--include-sourcemap` - Include source map analysis
- `--show-duplicates` - Highlight duplicate dependencies

## Examples

### Example 1: Basic Bundle Analysis

**Command:**
```bash
bundlesize analyze dist/main.js
```

**Output:**
```
📊 Bundle Analysis: dist/main.js

╭─────────────────────────────────────────────────────────╮
│  File Size Analysis                                     │
├─────────────────────────────────────────────────────────┤
│  Original:      847.2 KB                                │
│  Gzipped:       251.3 KB  (29.7%)                       │
│  Brotli:        223.8 KB  (26.4%)                       │
╰─────────────────────────────────────────────────────────╯

╭─────────────────────────────────────────────────────────╮
│  Bundle Composition                                     │
├─────────────────────────────────────────────────────────┤
│  Your code:           247.2 KB  (29.2%)                 │
│  node_modules:        600.0 KB  (70.8%)                 │
│                                                         │
│  Top Dependencies:                                      │
│  • react                157.3 KB                        │
│  • lodash               112.4 KB                        │
│  • moment                98.7 KB                        │
│  • axios                 45.2 KB                        │
│  • chart.js              38.9 KB                        │
╰─────────────────────────────────────────────────────────╯

╭─────────────────────────────────────────────────────────╮
│  Performance Score: 72/100                              │
├─────────────────────────────────────────────────────────┤
│  ✅ Size:              Good (< 1MB)                     │
│  ⚠️  Dependencies:     Consider tree-shaking            │
│  ✅ Compression:       Excellent (70% reduction)        │
│  ⚠️  Duplicates:       3 duplicate packages found       │
│                                                         │
│  Recommendations:                                       │
│  • Replace moment with date-fns (89KB → 13KB)          │
│  • Use lodash-es for tree-shaking                      │
│  • Remove duplicate versions of react-dom              │
╰─────────────────────────────────────────────────────────╯
```

### Example 2: Size Limit Check (CI Integration)

**Command:**
```bash
bundlesize check dist/main.js --max-size 300kb --max-gzip 100kb
```

**Output (Success):**
```
✅ Bundle size check passed!

dist/main.js
  Original: 247.2 KB  ✅ (limit: 300 KB)
  Gzipped:   73.8 KB  ✅ (limit: 100 KB)

All bundles are within size limits.
```

**Output (Failure):**
```
❌ Bundle size check failed!

dist/main.js
  Original: 847.2 KB  ❌ (limit: 300 KB, exceeded by 547.2 KB)
  Gzipped:  251.3 KB  ❌ (limit: 100 KB, exceeded by 151.3 KB)

1 bundle exceeds size limits.
Command exited with code 1
```

### Example 3: Compare with Previous Build

**Command:**
```bash
bundlesize compare dist/main.js --base main --show-diff
```

**Output:**
```
📊 Bundle Comparison: current vs main

╭─────────────────────────────────────────────────────────╮
│  Overall Changes                                        │
├─────────────────────────────────────────────────────────┤
│  Base (main):       823.5 KB                            │
│  Current:           847.2 KB                            │
│  Change:            +23.7 KB  (+2.9%)  ⚠️               │
│                                                         │
│  Gzipped:                                               │
│  Base:              245.1 KB                            │
│  Current:           251.3 KB                            │
│  Change:            +6.2 KB   (+2.5%)  ⚠️               │
╰─────────────────────────────────────────────────────────╯

╭─────────────────────────────────────────────────────────╮
│  File-by-File Changes                                   │
├─────────────────────────────────────────────────────────┤
│  ✅ vendors.js        -12.3 KB  (tree-shaking improved)│
│  ⚠️  main.js          +18.7 KB  (new features)          │
│  ⚠️  utils.js         +8.9 KB   (added dependencies)    │
│  ❌ polyfills.js      +8.4 KB   (new polyfills)         │
╰─────────────────────────────────────────────────────────╯

╭─────────────────────────────────────────────────────────╮
│  Dependency Changes                                     │
├─────────────────────────────────────────────────────────┤
│  Added:                                                 │
│  • chart.js          38.9 KB                            │
│  • date-fns          12.4 KB                            │
│                                                         │
│  Updated:                                               │
│  • react             16.8.6 → 17.0.2  (+14.2 KB)       │
│  • axios             0.21.1 → 0.24.0  (+2.1 KB)        │
│                                                         │
│  Removed:                                               │
│  • moment            -98.7 KB  ✅                       │
╰─────────────────────────────────────────────────────────╯

⚠️  Bundle size increased by 2.9% (threshold: 5%)
```

### Example 4: Configuration File

**`.bundlesizerc.json`:**
```json
{
  "files": [
    {
      "path": "dist/main.js",
      "maxSize": "300kb",
      "maxGzip": "100kb",
      "maxBrotli": "90kb"
    },
    {
      "path": "dist/vendors.js",
      "maxSize": "500kb",
      "maxGzip": "150kb"
    },
    {
      "path": "dist/polyfills.js",
      "maxSize": "50kb"
    }
  ],
  "threshold": 5,
  "failOnIncrease": false,
  "compression": "both",
  "ci": {
    "trackHistory": true,
    "commentOnPR": true,
    "failOnExceed": true
  }
}
```

**Command:**
```bash
bundlesize check
```

**Output:**
```
✅ Bundle size check passed!

Checked 3 bundles:
  ✅ dist/main.js       247.2 KB / 300 KB  (82.4%)
  ✅ dist/vendors.js    438.7 KB / 500 KB  (87.7%)
  ✅ dist/polyfills.js   42.1 KB /  50 KB  (84.2%)

All bundles within limits. Total: 728.0 KB
```

### Example 5: Generate HTML Report

**Command:**
```bash
bundlesize report dist/main.js --format html --output report.html --include-sourcemap
```

**Output:**
```
📄 Generating bundle report...

✅ Report generated: report.html

Report includes:
  • Bundle size breakdown
  • Dependency treemap
  • Source map analysis
  • Duplicate detection
  • Performance recommendations

Open report.html in your browser to view.
```

**Generated HTML Report Contents:**
- Interactive treemap of bundle contents
- Pie chart of dependency sizes
- Timeline of size changes (if tracked)
- Detailed file-by-file breakdown
- List of potential optimizations
- Compression analysis

### Example 6: Treemap Visualization

**Command:**
```bash
bundlesize treemap dist/main.js
```

**Output (ASCII treemap):**
```
📊 Bundle Treemap: dist/main.js (847.2 KB)

┌─────────────────────────────────────────────────────────┐
│                    node_modules (600 KB)                │
│  ┌──────────────┐  ┌───────────┐  ┌──────────┐         │
│  │              │  │           │  │          │         │
│  │    react     │  │  lodash   │  │  moment  │         │
│  │              │  │           │  │          │         │
│  │   157 KB     │  │  112 KB   │  │   99 KB  │         │
│  │              │  │           │  │          │         │
│  └──────────────┘  └───────────┘  └──────────┘         │
│  ┌──────┐  ┌──────┐  ┌──────────────────────┐         │
│  │axios │  │chart │  │      others          │         │
│  │ 45KB │  │ 39KB │  │      148 KB          │         │
│  └──────┘  └──────┘  └──────────────────────┘         │
│                                                         │
│                   Your Code (247 KB)                    │
│  ┌─────────────────────────────┐  ┌─────────────────┐  │
│  │                             │  │                 │  │
│  │       components/           │  │    utils/       │  │
│  │         189 KB              │  │     58 KB       │  │
│  │                             │  │                 │  │
│  └─────────────────────────────┘  └─────────────────┘  │
└─────────────────────────────────────────────────────────┘

Click any section to drill down.
Use arrow keys to navigate, 'q' to quit.
```

### Example 7: Track Size History

**Command:**
```bash
# Track first build
bundlesize track dist/main.js --save

# After some commits...
bundlesize track dist/main.js --save

# View history
bundlesize history dist/main.js
```

**Output:**
```
📈 Size History: dist/main.js

Date          Commit   Size      Gzip     Change
─────────────────────────────────────────────────────────
2026-02-08    a3f2b1   847 KB    251 KB   +23.7 KB (+2.9%)
2026-02-07    c9e4d2   823 KB    245 KB   -12.3 KB (-1.5%)
2026-02-06    f7a8b3   836 KB    249 KB   +45.2 KB (+5.7%)
2026-02-05    d4c1e6   791 KB    235 KB   -5.8 KB  (-0.7%)
2026-02-04    b2f9a4   797 KB    237 KB   +2.1 KB  (+0.3%)

╭─────────────────────────────────────────────────────────╮
│  Trend Analysis (Last 30 days)                         │
├─────────────────────────────────────────────────────────┤
│  Average size:        812 KB                            │
│  Smallest:            791 KB  (2026-02-05)              │
│  Largest:             847 KB  (today)                   │
│  Net change:          +50 KB  (+6.3%)                   │
│  Growth rate:         +1.67 KB/day                      │
│                                                         │
│  📊 Visual Trend:                                       │
│  850 KB ▲                                          •    │
│  825 KB │               •                               │
│  800 KB │     •               •         •               │
│  775 KB │                                               │
│  750 KB └──────────────────────────────────────────────▶│
│         30d    24d    18d    12d     6d     today       │
╰─────────────────────────────────────────────────────────╯
```

### Example 8: Multi-Bundle Project

**Command:**
```bash
bundlesize analyze dist/*.js
```

**Output:**
```
📊 Multi-Bundle Analysis: 4 bundles found

╭─────────────────────────────────────────────────────────╮
│  Bundle Summary                                         │
├─────────────────────────────────────────────────────────┤
│  main.js          847.2 KB  (251.3 KB gzipped)          │
│  vendors.js       438.7 KB  (127.4 KB gzipped)          │
│  polyfills.js      42.1 KB  ( 13.2 KB gzipped)          │
│  runtime.js         8.4 KB  (  3.1 KB gzipped)          │
│  ────────────────────────────────────────────────       │
│  Total:         1,336.4 KB  (395.0 KB gzipped)          │
╰─────────────────────────────────────────────────────────╯

╭─────────────────────────────────────────────────────────╮
│  Code Splitting Efficiency                              │
├─────────────────────────────────────────────────────────┤
│  Shared code:         438.7 KB  (32.8%)  ✅             │
│  Initial load:        897.7 KB  (67.2%)                 │
│  Lazy-loadable:         0.0 KB  (0.0%)   ⚠️             │
│                                                         │
│  Recommendations:                                       │
│  • Consider code-splitting for large components         │
│  • Move non-critical code to lazy-loaded chunks         │
│  • Target initial load < 200 KB (gzipped)               │
╰─────────────────────────────────────────────────────────╯

╭─────────────────────────────────────────────────────────╮
│  Duplicate Code Analysis                                │
├─────────────────────────────────────────────────────────┤
│  Found 3 duplicate dependencies across bundles:         │
│                                                         │
│  • react-dom       2 versions  (156 KB wasted)          │
│    - v17.0.2 in main.js                                 │
│    - v16.14.0 in vendors.js                             │
│                                                         │
│  • lodash          2 versions  (45 KB wasted)           │
│    - v4.17.21 in main.js                                │
│    - v4.17.20 in vendors.js                             │
│                                                         │
│  • core-js         2 versions  (23 KB wasted)           │
│    - v3.25.0 in main.js                                 │
│    - v3.24.1 in polyfills.js                            │
│                                                         │
│  Total wasted:     224 KB  (16.8% of total bundle)      │
╰─────────────────────────────────────────────────────────╯
```

### Example 9: CI/CD Integration (GitHub Actions)

**`.github/workflows/bundlesize.yml`:**
```yaml
name: Bundle Size Check

on:
  pull_request:
    branches: [main]

jobs:
  check-size:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Check bundle size
        run: npx @muin/bundlesize check --fail-on-increase

      - name: Upload size report
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: bundle-size-report
          path: .bundlesize-report.json
```

**Command:**
```bash
bundlesize check --fail-on-increase
```

**PR Comment Output:**
```markdown
## 📊 Bundle Size Report

### Summary
- **Total Size:** 1,336.4 KB → 1,360.1 KB (+23.7 KB, +1.8%)
- **Gzipped:** 395.0 KB → 401.2 KB (+6.2 KB, +1.6%)

### Changes by Bundle
| Bundle | Before | After | Change | Status |
|--------|--------|-------|--------|--------|
| main.js | 847.2 KB | 870.9 KB | +23.7 KB (+2.8%) | ⚠️ |
| vendors.js | 438.7 KB | 438.7 KB | 0 KB | ✅ |
| polyfills.js | 42.1 KB | 42.1 KB | 0 KB | ✅ |
| runtime.js | 8.4 KB | 8.4 KB | 0 KB | ✅ |

### Size Limits
✅ All bundles within size limits

### Recommendations
- main.js increased by 2.8%. Consider reviewing recent changes.
- Total bundle still within acceptable range.

---
<sub>Generated by @muin/bundlesize | [View Details](./report.html)</sub>
```

## Supported Bundle Formats

| Format | Supported | Notes |
|--------|-----------|-------|
| JavaScript (ES6) | ✅ | Full support with source maps |
| CommonJS | ✅ | Node.js bundles |
| UMD | ✅ | Universal modules |
| Webpack | ✅ | Includes stats analysis |
| Rollup | ✅ | Includes treemap |
| Parcel | ✅ | Auto-detected |
| Vite | ✅ | Modern build tool |
| esbuild | ✅ | Fast bundler support |
| TypeScript | ✅ | Via compiled output |

## Common Use Cases

### 1. **Prevent Bundle Bloat in CI**
The most common use case - automatically fail CI if bundles grow too large:

**Setup:**
```bash
# Add to package.json
{
  "scripts": {
    "test:size": "bundlesize check --fail-on-exceed"
  }
}

# In CI
npm run build
npm run test:size
```

**Benefits:**
- Catch accidental large dependency additions
- Enforce size budgets across team
- Get instant feedback on PRs

### 2. **Track Size Evolution**
Monitor how your bundle size changes over time:

```bash
# In CI/CD pipeline after every build
bundlesize track dist/*.js --save

# Generate monthly report
bundlesize history --period 30d --format html --output size-report.html
```

**Benefits:**
- Identify size creep early
- Visualize impact of optimizations
- Share trends with stakeholders

### 3. **Dependency Audit**
Find and eliminate large dependencies:

```bash
bundlesize analyze dist/main.js --show-duplicates
```

**Real Example:**
```
Found: moment.js (98.7 KB)
Recommendation: Replace with date-fns (13 KB) → Save 85.7 KB
Action: npm uninstall moment && npm install date-fns
Result: Bundle size reduced from 847 KB → 761 KB (-10%)
```

### 4. **Code Splitting Optimization**
Analyze and optimize code splitting:

```bash
bundlesize analyze dist/*.js --visualize
```

**Insights:**
- Which bundles share code (duplication)
- What's in the critical path (initial load)
- Opportunities for lazy loading

### 5. **PR Review Automation**
Automatically comment on PRs with size impact:

```yaml
# GitHub Actions
- name: Compare bundle size
  run: |
    bundlesize compare --base origin/main --format markdown > size-comment.md
    gh pr comment ${{ github.event.pull_request.number }} -F size-comment.md
```

**Benefits:**
- Reviewers see size impact immediately
- No manual checking needed
- Historical context in PR discussion

### 6. **Performance Budget Enforcement**
Set performance budgets and enforce them:

```json
{
  "budgets": {
    "initial": "200kb",
    "total": "500kb",
    "scripts": "300kb",
    "styles": "50kb"
  }
}
```

```bash
bundlesize check --budget
```

### 7. **Webpack Bundle Analysis Integration**
Compare against webpack-bundle-analyzer output:

```bash
# Generate webpack stats
webpack --profile --json > stats.json

# Analyze with bundlesize
bundlesize analyze --webpack-stats stats.json --interactive
```

**Benefits:**
- Use familiar webpack ecosystem
- Deeper source map analysis
- Integration with existing tooling

## Why This Tool?

### The Problem

**Scenario:** You add a "simple" date picker library...

```bash
npm install react-datepicker
```

**What actually happened:**
- Added: react-datepicker (45 KB)
- Also added: moment.js (98 KB) ← Hidden dependency!
- Also added: popper.js (20 KB)
- Also added: react-onclickoutside (8 KB)
- **Total impact: 171 KB for a date picker** 😱

**Without bundlesize:** You discover this in production 3 weeks later when users complain about slow load times.

**With bundlesize:** CI fails immediately:
```
❌ Bundle size increased by 171 KB (+20%)
  Exceeds threshold of 5%
  
  New dependency: react-datepicker (+171 KB total)
  Consider: react-day-picker (12 KB) as alternative
```

### The Benefits

- 🚨 **Catch issues early** - Before they reach production
- 💰 **Save money** - Smaller bundles = lower CDN costs
- ⚡ **Faster sites** - Better user experience
- 🎯 **Enforce budgets** - No more bundle bloat
- 📊 **Data-driven decisions** - Know the true cost of dependencies
- 🤝 **Team alignment** - Everyone sees size impact

## Common Gotchas & Troubleshooting

### Issue: "Cannot find bundle file"

**Cause:** Bundle path is incorrect or build hasn't run

**Solution:**
```bash
# Check if file exists
ls -lh dist/main.js

# Make sure to build first
npm run build
bundlesize analyze dist/main.js

# Use glob patterns for multiple files
bundlesize analyze "dist/**/*.js"
```

### Issue: Gzip size seems wrong

**Cause:** Different gzip compression levels

**Solution:**
```bash
# bundlesize uses gzip -6 by default (Node.js zlib default)
# To match nginx (gzip -9):
bundlesize analyze dist/main.js --gzip-level 9

# Or check actual gzipped size:
gzip -c dist/main.js | wc -c
```

### Issue: Size differs from webpack stats

**Cause:** Source maps included or different compression

**Solution:**
```bash
# Exclude source maps
bundlesize analyze dist/main.js --exclude "*.map"

# Use webpack stats directly
bundlesize analyze --webpack-stats stats.json

# Compare both:
bundlesize analyze dist/main.js --verbose
```

### Issue: CI fails on main branch

**Cause:** Baseline not updated after merge

**Solution:**
```bash
# Update baseline after merging to main
bundlesize track dist/*.js --save --commit-baseline

# Or in CI:
if [ "$BRANCH" = "main" ]; then
  bundlesize track --save
fi
```

### Issue: Too many false positives on size increases

**Cause:** Threshold too strict

**Solution:**
```json
// .bundlesizerc.json
{
  "threshold": 10,  // Allow 10% increase (default: 5%)
  "failOnIncrease": false,  // Warn only
  "maxSize": "300kb"  // Hard limit
}
```

### Issue: Duplicate dependencies not detected

**Cause:** Different import paths or hoisting

**Solution:**
```bash
# Use verbose mode to see all dependencies
bundlesize analyze dist/main.js --show-duplicates --verbose

# Check node_modules structure
npm ls --depth=0

# Use npm dedupe
npm dedupe
npm run build
bundlesize analyze dist/main.js
```

### Issue: Report generation fails

**Cause:** Missing dependencies or file permissions

**Solution:**
```bash
# Install optional dependencies for HTML reports
npm install -g puppeteer

# Check write permissions
bundlesize report dist/main.js --output /tmp/report.html

# Use different format
bundlesize report dist/main.js --format json > report.json
```

### Issue: Treemap visualization not showing

**Cause:** Source maps not available

**Solution:**
```bash
# Enable source maps in webpack/rollup/vite
// webpack.config.js
module.exports = {
  devtool: 'source-map',  // or 'hidden-source-map' for production
};

# Then analyze
bundlesize treemap dist/main.js --source-map
```

### Issue: Historical tracking data lost

**Cause:** .bundlesize-cache.json not committed or ignored

**Solution:**
```bash
# Check .gitignore - should NOT ignore cache file
cat .gitignore | grep bundlesize

# Remove from .gitignore if present
echo "!.bundlesize-cache.json" >> .gitignore

# Commit the cache
git add .bundlesize-cache.json
git commit -m "chore: track bundle size history"
```

### Issue: Comparison with wrong baseline

**Cause:** Git branch or tag not specified correctly

**Solution:**
```bash
# Specify exact branch
bundlesize compare dist/main.js --base origin/main

# Or use a specific commit
bundlesize compare dist/main.js --base abc123

# Or compare with a tag
bundlesize compare dist/main.js --base v1.0.0

# Check available baselines
git branch -r
git tag
```

### Issue: CI comment bot not working (GitHub)

**Cause:** Missing permissions or token

**Solution:**
```yaml
# .github/workflows/bundlesize.yml
permissions:
  contents: read
  pull-requests: write  # Required for commenting

- name: Comment PR
  run: bundlesize compare --comment
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## Performance Tips

### Tip 1: Use Configuration File

Instead of passing options every time:

```bash
# Slow (repeat options)
bundlesize check dist/main.js --max-size 300kb --max-gzip 100kb
bundlesize check dist/vendors.js --max-size 500kb

# Fast (use config)
bundlesize check  # Reads .bundlesizerc.json
```

### Tip 2: Batch Analysis

Analyze multiple bundles at once:

```bash
# Instead of:
bundlesize analyze dist/main.js
bundlesize analyze dist/vendors.js
bundlesize analyze dist/polyfills.js

# Do:
bundlesize analyze dist/*.js
```

### Tip 3: Cache Source Maps

Source map parsing is slow, cache it:

```bash
# First run: slow (parses source maps)
bundlesize analyze dist/main.js --cache

# Subsequent runs: fast (uses cache)
bundlesize analyze dist/main.js --cache
```

### Tip 4: Skip Compression for Speed

When you only need raw size:

```bash
# Faster
bundlesize analyze dist/main.js --no-compress

# Slower (computes gzip + brotli)
bundlesize analyze dist/main.js
```

### Tip 5: Use JSON Output for Automation

Parse output programmatically:

```bash
# Get size as JSON
SIZE=$(bundlesize analyze dist/main.js --json | jq '.size')

# Use in scripts
if [ "$SIZE" -gt 300000 ]; then
  echo "Bundle too large!"
  exit 1
fi
```

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history.

## Roadmap

### v1.1.0 (Next)
- [ ] VS Code extension with inline size annotations
- [ ] Real-time bundle watcher during development
- [ ] Budget calculator (suggest limits based on metrics)
- [ ] Network waterfall simulation

### v1.2.0
- [ ] Support for CSS bundle analysis
- [ ] Image asset optimization recommendations
- [ ] Web Worker bundle analysis
- [ ] Service Worker cache strategy analysis

### v2.0.0
- [ ] Machine learning-based size predictions
- [ ] Automated dependency replacement suggestions
- [ ] Integration with Lighthouse budgets
- [ ] Multi-project dashboard (team view)
- [ ] Time-travel debugging (compare any two points)

### Future Ideas
- [ ] Browser extension for runtime analysis
- [ ] Slack/Discord notifications for size changes
- [ ] Integration with npm package registry (show size before install)
- [ ] A/B testing impact analysis (size vs conversion rate)

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](../../CONTRIBUTING.md) for guidelines.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/muin-company/cli-tools.git
cd cli-tools/packages/bundlesize

# Install dependencies
npm install

# Build
npm run build

# Test
npm test

# Run locally
node dist/cli.js analyze example/bundle.js
```

### Adding New Features

See [docs/contributing.md](../../docs/contributing.md) for detailed guides on:
- Adding new report formats
- Supporting new bundlers
- Implementing custom analysis rules
- Writing tests

## FAQ

**Q: How does bundlesize calculate gzipped size?**  
A: Uses Node.js `zlib` with default compression (level 6), matching most CDNs and servers. You can customize with `--gzip-level`.

**Q: Can I use this with non-JavaScript bundles?**  
A: Currently focuses on JS bundles. CSS support is planned for v1.2.0. For other assets, use `--raw-size` mode.

**Q: Does this work with server-side bundles (Node.js)?**  
A: Yes! Works with any JavaScript bundle, client or server-side.

**Q: How accurate is the dependency breakdown?**  
A: Requires source maps for accurate attribution. Without source maps, uses heuristics (90%+ accurate for webpack bundles).

**Q: Can I track bundles from multiple branches?**  
A: Yes, use `--branch` flag: `bundlesize track dist/main.js --branch feature-x`. Data is stored per branch.

**Q: What's the difference between maxSize and threshold?**  
A: `maxSize` is an absolute limit (hard fail). `threshold` is a percentage increase tolerance (soft fail).

**Q: Does this slow down my CI builds?**  
A: Minimal impact - typically 2-5 seconds. Use `--no-compress` for instant results.

**Q: Can I compare against production deployed bundles?**  
A: Yes! Use `--base-url`: `bundlesize compare dist/main.js --base-url https://cdn.example.com/v1.0/main.js`

**Q: How do I ignore certain files from analysis?**  
A: Use `.bundlesizeignore` (same format as .gitignore) or `--exclude` pattern.

**Q: What happens if my bundle has no source map?**  
A: Basic analysis still works (size, compression). Dependency breakdown requires source maps.

## License

MIT © [MUIN](https://muin.company)

## Related Projects

- [@muin/envdiff](../envdiff) - Compare environment files and configurations
- [@muin/tsconfig-helper](../tsconfig-helper) - Validate and optimize TypeScript configs
- [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer) - Detailed webpack analysis
- [size-limit](https://github.com/ai/size-limit) - Similar tool with different approach
- [More MUIN tools](https://muin.company/tools)

## Support

- 🐛 [Report a bug](https://github.com/muin-company/cli-tools/issues/new?template=bug_report.md)
- 💡 [Request a feature](https://github.com/muin-company/cli-tools/issues/new?template=feature_request.md)
- 💬 [Join our Discord](https://discord.gg/muin)
- 🐦 [Follow us on Twitter](https://twitter.com/muin_company)

---

**Made with ❤️ by [MUIN](https://muin.company)** - Building AI-powered developer tools

[⬆ Back to top](#muin/bundlesize)
