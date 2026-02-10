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

## API Reference

### Command Line Interface

#### `bundlesize analyze <file>`

Analyze bundle size and composition.

**Arguments:**
- `<file>` - Path to bundle file(s). Supports glob patterns.

**Options:**
- `--show-duplicates` - Highlight duplicate dependencies
- `--include-sourcemap` - Include source map analysis (requires .map file)
- `--json` - Output as JSON
- `--cache` - Cache source map parsing for faster subsequent runs
- `--no-compress` - Skip compression calculations (faster)
- `--verbose` - Show detailed output including all files

**Examples:**
```bash
# Basic analysis
bundlesize analyze dist/main.js

# Multiple files with glob
bundlesize analyze "dist/**/*.js"

# JSON output for scripting
bundlesize analyze dist/main.js --json | jq '.size'

# With duplicates and source map
bundlesize analyze dist/main.js --show-duplicates --include-sourcemap
```

**Exit Codes:**
- `0` - Success
- `1` - Analysis error (file not found, parse error)

---

#### `bundlesize check <file>`

Check bundle size against limits.

**Arguments:**
- `<file>` - Path to bundle file(s)

**Options:**
- `--max-size <size>` - Maximum allowed size (e.g., `200kb`, `1.5mb`, `500000`)
- `--max-gzip <size>` - Maximum gzipped size
- `--max-brotli <size>` - Maximum brotli compressed size
- `--fail-on-increase` - Fail if size increased from baseline (requires tracking)
- `--threshold <percent>` - Fail if size increase exceeds percentage (default: 5)
- `--gzip-level <1-9>` - Compression level for gzip (default: 6)

**Examples:**
```bash
# Check against absolute limit
bundlesize check dist/main.js --max-size 300kb

# Check gzipped size
bundlesize check dist/main.js --max-gzip 100kb

# Fail on any increase
bundlesize check dist/main.js --fail-on-increase

# Allow 10% growth
bundlesize check dist/main.js --threshold 10
```

**Exit Codes:**
- `0` - All checks passed
- `1` - Size limit exceeded or threshold exceeded

---

#### `bundlesize compare <file>`

Compare bundle with baseline.

**Arguments:**
- `<file>` - Path to bundle file

**Options:**
- `--base <branch|tag|commit>` - Baseline reference (default: `main`)
- `--show-diff` - Show file-by-file differences
- `--json` - Output as JSON
- `--format <type>` - Output format: `text`, `json`, `markdown`, `html`

**Examples:**
```bash
# Compare with main branch
bundlesize compare dist/main.js --base main

# Compare with specific tag
bundlesize compare dist/main.js --base v1.0.0

# Detailed diff
bundlesize compare dist/main.js --base main --show-diff

# Markdown output for PR comments
bundlesize compare dist/main.js --base main --format markdown
```

**Exit Codes:**
- `0` - Comparison successful
- `1` - Comparison failed (baseline not found)

---

#### `bundlesize report <file>`

Generate detailed report.

**Arguments:**
- `<file>` - Path to bundle file

**Options:**
- `-f, --format <type>` - Report format: `text`, `json`, `html`, `markdown`
- `-o, --output <file>` - Write report to file
- `--include-sourcemap` - Include source map analysis
- `--show-duplicates` - Highlight duplicate dependencies

**Examples:**
```bash
# HTML report
bundlesize report dist/main.js --format html --output report.html

# JSON for processing
bundlesize report dist/main.js --format json > report.json

# Markdown for docs
bundlesize report dist/main.js --format markdown --output BUNDLE_SIZE.md
```

**Exit Codes:**
- `0` - Report generated successfully
- `1` - Report generation failed

---

#### `bundlesize track <file>`

Track size over time.

**Arguments:**
- `<file>` - Path to bundle file(s)

**Options:**
- `--save` - Save to tracking database
- `--commit-baseline` - Update baseline (usually on main branch)
- `--branch <name>` - Track for specific branch

**Examples:**
```bash
# Track current build
bundlesize track dist/main.js --save

# Update baseline after merge
bundlesize track dist/main.js --save --commit-baseline

# Track feature branch separately
bundlesize track dist/main.js --save --branch feature-x
```

**Exit Codes:**
- `0` - Tracking successful
- `1` - Tracking failed (disk write error)

---

#### `bundlesize history <file>`

Show size history.

**Arguments:**
- `<file>` - Path to bundle file

**Options:**
- `--period <days>` - Show history for last N days (default: 30)
- `--format <type>` - Output format: `text`, `json`, `html`
- `--chart` - Show ASCII chart

**Examples:**
```bash
# Last 30 days
bundlesize history dist/main.js

# Last 7 days with chart
bundlesize history dist/main.js --period 7 --chart

# JSON output
bundlesize history dist/main.js --format json
```

**Exit Codes:**
- `0` - History retrieved
- `1` - No tracking data found

---

#### `bundlesize treemap <file>`

Generate treemap visualization.

**Arguments:**
- `<file>` - Path to bundle file

**Options:**
- `--source-map` - Use source map for accurate attribution
- `--interactive` - Launch interactive treemap (terminal UI)
- `--output <file>` - Save as HTML (interactive web version)

**Examples:**
```bash
# ASCII treemap in terminal
bundlesize treemap dist/main.js

# Interactive terminal UI
bundlesize treemap dist/main.js --interactive

# HTML treemap
bundlesize treemap dist/main.js --output treemap.html
```

**Exit Codes:**
- `0` - Treemap generated
- `1` - Source map required but not found

---

### Configuration File (`.bundlesizerc.json`)

```json
{
  "files": [
    {
      "path": "dist/main.js",
      "maxSize": "300kb",
      "maxGzip": "100kb",
      "maxBrotli": "90kb"
    }
  ],
  "threshold": 5,
  "failOnIncrease": false,
  "compression": "both",
  "gzipLevel": 6,
  "ci": {
    "trackHistory": true,
    "commentOnPR": true,
    "failOnExceed": true,
    "githubToken": "${GITHUB_TOKEN}"
  },
  "ignore": [
    "*.map",
    "*.LICENSE.txt"
  ],
  "baseBranch": "main"
}
```

**Options:**

- **files** (array): List of bundles to check
  - **path** (string): Glob pattern for bundle files
  - **maxSize** (string): Maximum size (e.g., `300kb`, `1.5mb`)
  - **maxGzip** (string): Maximum gzipped size
  - **maxBrotli** (string): Maximum brotli size

- **threshold** (number): Percentage increase allowed (default: `5`)

- **failOnIncrease** (boolean): Fail if any size increase detected

- **compression** (string): Compression to check: `gzip`, `brotli`, `both`

- **gzipLevel** (number): Gzip compression level 1-9 (default: `6`)

- **ci** (object): CI/CD integration settings
  - **trackHistory** (boolean): Save size history
  - **commentOnPR** (boolean): Post results as PR comment
  - **failOnExceed** (boolean): Fail CI on size exceed
  - **githubToken** (string): GitHub token for PR comments

- **ignore** (array): Patterns to ignore

- **baseBranch** (string): Default branch for comparison (default: `main`)

---

### JavaScript API

#### Installation

```bash
npm install @muin/bundlesize
```

#### Usage

```javascript
const { analyzeBundleSize, checkSize, compareBundles } = require('@muin/bundlesize');

// Analyze
const analysis = await analyzeBundleSize('dist/main.js', {
  includeDuplicates: true,
  includeSourceMap: true
});

console.log(analysis.size); // Original size in bytes
console.log(analysis.gzipSize); // Gzipped size
console.log(analysis.brotliSize); // Brotli size
console.log(analysis.dependencies); // Dependency breakdown

// Check against limits
const checkResult = await checkSize('dist/main.js', {
  maxSize: 300 * 1024, // 300 KB in bytes
  maxGzip: 100 * 1024
});

if (!checkResult.passed) {
  console.error('Size limit exceeded!');
  process.exit(1);
}

// Compare with baseline
const comparison = await compareBundles({
  current: 'dist/main.js',
  base: 'main' // git branch/tag/commit
});

console.log(`Size changed by ${comparison.percentChange}%`);
```

#### API Methods

##### `analyzeBundleSize(filePath, options)`

Analyze a bundle file.

**Parameters:**
- `filePath` (string): Path to bundle file
- `options` (object):
  - `includeDuplicates` (boolean): Detect duplicate dependencies
  - `includeSourceMap` (boolean): Parse source map for accurate breakdown
  - `cache` (boolean): Cache parsed source maps
  - `compress` (boolean): Calculate compressed sizes (default: true)

**Returns:** Promise<Analysis>

```typescript
interface Analysis {
  size: number; // bytes
  gzipSize: number;
  brotliSize: number;
  dependencies: Dependency[];
  duplicates: Duplicate[];
  recommendations: Recommendation[];
}
```

##### `checkSize(filePath, limits)`

Check if bundle meets size limits.

**Parameters:**
- `filePath` (string): Path to bundle file
- `limits` (object):
  - `maxSize` (number): Max size in bytes
  - `maxGzip` (number): Max gzipped size in bytes
  - `maxBrotli` (number): Max brotli size in bytes
  - `threshold` (number): Allowed increase percentage

**Returns:** Promise<CheckResult>

```typescript
interface CheckResult {
  passed: boolean;
  exceeded: {
    size?: number;
    gzip?: number;
    brotli?: number;
  };
  message: string;
}
```

##### `compareBundles(options)`

Compare current bundle with baseline.

**Parameters:**
- `options` (object):
  - `current` (string): Current bundle path
  - `base` (string): Git ref (branch/tag/commit) for baseline
  - `showDiff` (boolean): Include file-by-file diff

**Returns:** Promise<Comparison>

```typescript
interface Comparison {
  current: Analysis;
  base: Analysis;
  diff: number; // size difference in bytes
  percentChange: number;
  fileDiff?: FileDiff[];
}
```

##### `trackSize(filePath, options)`

Track bundle size over time.

**Parameters:**
- `filePath` (string): Path to bundle file
- `options` (object):
  - `save` (boolean): Save to database
  - `branch` (string): Branch name

**Returns:** Promise<void>

##### `generateReport(filePath, options)`

Generate a detailed report.

**Parameters:**
- `filePath` (string): Path to bundle file
- `options` (object):
  - `format` (string): `text` | `json` | `html` | `markdown`
  - `outputPath` (string): Where to save report

**Returns:** Promise<string>

---

## More Examples

### Example 10: Monorepo with Multiple Bundles

**Project Structure:**
```
my-monorepo/
├── packages/
│   ├── web-app/
│   │   └── dist/
│   │       ├── main.js
│   │       └── vendors.js
│   ├── admin-panel/
│   │   └── dist/
│   │       └── admin.js
│   └── mobile-app/
│       └── dist/
│           └── mobile.js
└── .bundlesizerc.json
```

**.bundlesizerc.json:**
```json
{
  "files": [
    {
      "path": "packages/web-app/dist/main.js",
      "maxSize": "300kb",
      "maxGzip": "100kb",
      "name": "Web App - Main"
    },
    {
      "path": "packages/web-app/dist/vendors.js",
      "maxSize": "500kb",
      "maxGzip": "150kb",
      "name": "Web App - Vendors"
    },
    {
      "path": "packages/admin-panel/dist/admin.js",
      "maxSize": "400kb",
      "name": "Admin Panel"
    },
    {
      "path": "packages/mobile-app/dist/mobile.js",
      "maxSize": "200kb",
      "name": "Mobile App"
    }
  ],
  "threshold": 3,
  "ci": {
    "trackHistory": true,
    "commentOnPR": true
  }
}
```

**Command:**
```bash
bundlesize check
```

**Output:**
```
📊 Bundle Size Check - Monorepo

╭─────────────────────────────────────────────────────────────────╮
│  Package: web-app                                               │
├─────────────────────────────────────────────────────────────────┤
│  ✅ main.js          247 KB / 300 KB  (82%)                     │
│  ✅ vendors.js       438 KB / 500 KB  (88%)                     │
│  Total:             685 KB                                      │
╰─────────────────────────────────────────────────────────────────╯

╭─────────────────────────────────────────────────────────────────╮
│  Package: admin-panel                                           │
├─────────────────────────────────────────────────────────────────┤
│  ✅ admin.js         356 KB / 400 KB  (89%)                     │
╰─────────────────────────────────────────────────────────────────╯

╭─────────────────────────────────────────────────────────────────╮
│  Package: mobile-app                                            │
├─────────────────────────────────────────────────────────────────┤
│  ✅ mobile.js        167 KB / 200 KB  (84%)                     │
╰─────────────────────────────────────────────────────────────────╯

✅ All bundles within size limits!
Total across all packages: 1,208 KB
```

### Example 11: Progressive Web App (PWA) Analysis

**Command:**
```bash
bundlesize analyze dist/*.js --show-duplicates
```

**Output:**
```
📊 PWA Bundle Analysis

╭─────────────────────────────────────────────────────────────────╮
│  Bundle Overview                                                │
├─────────────────────────────────────────────────────────────────┤
│  app.js           423 KB  (124 KB gzipped)                      │
│  vendor.js        567 KB  (168 KB gzipped)                      │
│  sw.js             12 KB  (  4 KB gzipped)                      │
│  polyfills.js      89 KB  ( 28 KB gzipped)                      │
│  ─────────────────────────────────────────────────────────────  │
│  Total:         1,091 KB  (324 KB gzipped)                      │
╰─────────────────────────────────────────────────────────────────╯

╭─────────────────────────────────────────────────────────────────╮
│  Loading Strategy Analysis                                      │
├─────────────────────────────────────────────────────────────────┤
│  Critical path (app + vendor):      990 KB  (292 KB gzipped)   │
│  Service worker (cacheable):         12 KB  (  4 KB gzipped)   │
│  Polyfills (conditional):            89 KB  ( 28 KB gzipped)   │
│                                                                 │
│  First Load Time Estimate:                                     │
│  • Fast 3G (400 KB/s):    ~730ms                                │
│  • Slow 3G (50 KB/s):   ~5.8 seconds                            │
│  • 4G (2 MB/s):           ~146ms                                │
╰─────────────────────────────────────────────────────────────────╯

╭─────────────────────────────────────────────────────────────────╮
│  Duplicate Dependencies                                         │
├─────────────────────────────────────────────────────────────────┤
│  ⚠️  @babel/runtime appears in both app.js and vendor.js       │
│     • app.js: 45 KB                                             │
│     • vendor.js: 45 KB                                          │
│     • Wasted: 45 KB (use shared chunk)                          │
│                                                                 │
│  ⚠️  regenerator-runtime duplicated                            │
│     • Wasted: 12 KB                                             │
╰─────────────────────────────────────────────────────────────────╯

╭─────────────────────────────────────────────────────────────────╮
│  PWA-Specific Recommendations                                   │
├─────────────────────────────────────────────────────────────────┤
│  1. Code Splitting                                              │
│     Current: All code in 2 bundles                              │
│     Recommended: Split by route                                 │
│     Potential savings: ~200 KB on initial load                  │
│                                                                 │
│  2. Service Worker Optimization                                 │
│     • sw.js is small ✅                                         │
│     • Consider inlining into HTML (<5KB)                        │
│                                                                 │
│  3. Critical CSS                                                │
│     • No CSS bundles detected                                   │
│     • Ensure critical CSS is inlined                            │
│                                                                 │
│  4. Dynamic Imports                                             │
│     • Use React.lazy() for route-based splitting                │
│     • Target: <200 KB per route                                 │
╰─────────────────────────────────────────────────────────────────╯
```

### Example 12: Bundle Budget Enforcement (Real CI Example)

**.github/workflows/size-check.yml:**
```yaml
name: Bundle Size Check

on:
  pull_request:
    paths:
      - 'src/**'
      - 'package.json'

jobs:
  check-size:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0  # Needed for comparison
      
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Check bundle size
        run: |
          npx @muin/bundlesize check \
            --fail-on-increase \
            --threshold 5 \
            > size-check.txt
        continue-on-error: true
        id: size-check
      
      - name: Compare with main
        run: |
          npx @muin/bundlesize compare dist/main.js \
            --base origin/main \
            --format markdown \
            > size-comparison.md
      
      - name: Comment PR
        uses: actions/github-script@v6
        with:
          script: |
            const fs = require('fs');
            const comparison = fs.readFileSync('size-comparison.md', 'utf8');
            
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: comparison
            });
      
      - name: Fail if exceeded
        if: steps.size-check.outcome == 'failure'
        run: |
          cat size-check.txt
          exit 1
```

**PR Comment Result:**
```markdown
## 📊 Bundle Size Report

### Summary
- **Current:** 847.2 KB (251.3 KB gzipped)
- **Previous:** 823.5 KB (245.1 KB gzipped)
- **Difference:** +23.7 KB (+2.9%)
- **Status:** ⚠️ Increased but within threshold (5%)

### Changes by File
| File | Before | After | Change |
|------|--------|-------|--------|
| main.js | 823.5 KB | 847.2 KB | +23.7 KB (+2.9%) |

### What Changed
**Added dependencies:**
- chart.js (+38.9 KB)

**Removed dependencies:**
- moment (-98.7 KB) ✅

**Net change:** +23.7 KB

### Recommendations
- Bundle size increased but old dependency (moment) was removed
- New dependency (chart.js) is justified for charting feature
- Consider lazy loading chart.js if not used on every page

### Action Required
✅ No action needed - change is acceptable
```

### Example 13: Serverless Function Optimization

**Scenario:** AWS Lambda has 50MB deployment package limit.

**Command:**
```bash
bundlesize analyze .serverless/my-function.zip --show-duplicates
```

**Output:**
```
📦 Serverless Function Analysis: my-function

╭─────────────────────────────────────────────────────────────────╮
│  Deployment Package Size                                        │
├─────────────────────────────────────────────────────────────────┤
│  Compressed (.zip):        8.4 MB  / 50 MB limit  (17%)         │
│  Uncompressed:            34.7 MB  / 250 MB limit (14%)         │
│                                                                 │
│  Status: ✅ Well within Lambda limits                          │
╰─────────────────────────────────────────────────────────────────╯

╭─────────────────────────────────────────────────────────────────╮
│  Package Contents                                               │
├─────────────────────────────────────────────────────────────────┤
│  node_modules/           32.1 MB  (92.5%)                       │
│  Your code:               2.6 MB  ( 7.5%)                       │
│  ────────────────────────────────────────────────────────────   │
│  Top dependencies:                                              │
│  • aws-sdk              12.3 MB  (included in Lambda by default!)│
│  • lodash                4.7 MB  (use lodash-es: 500 KB)        │
│  • moment                2.1 MB  (use date-fns: 150 KB)         │
│  • axios                 1.4 MB                                 │
│  • uuid                  0.9 MB                                 │
╰─────────────────────────────────────────────────────────────────╯

╭─────────────────────────────────────────────────────────────────╮
│  🚀 Lambda-Specific Optimizations                               │
├─────────────────────────────────────────────────────────────────┤
│  1. Remove aws-sdk from bundle                                  │
│     Impact: -12.3 MB (-36%)                                     │
│     How: Add to externals in webpack.config.js                  │
│                                                                 │
│     module.exports = {                                          │
│       externals: ['aws-sdk']                                    │
│     }                                                           │
│                                                                 │
│  2. Replace lodash with lodash-es                               │
│     Impact: -4.2 MB (-12%)                                      │
│     How: npm install lodash-es                                  │
│          import { map } from 'lodash-es'                        │
│                                                                 │
│  3. Replace moment with date-fns                                │
│     Impact: -1.95 MB (-6%)                                      │
│     How: npm uninstall moment && npm install date-fns           │
│                                                                 │
│  Total potential savings: -18.45 MB (-54% reduction!)           │
│  New size: ~16 MB uncompressed (4 MB compressed)                │
╰─────────────────────────────────────────────────────────────────╯

╭─────────────────────────────────────────────────────────────────╮
│  Cold Start Impact                                              │
├─────────────────────────────────────────────────────────────────┤
│  Current (34.7 MB):    ~450ms cold start                        │
│  Optimized (16 MB):    ~200ms cold start                        │
│                                                                 │
│  Improvement: -250ms faster cold starts                         │
╰─────────────────────────────────────────────────────────────────╯
```

### Example 14: Tree-Shaking Analysis

**Command:**
```bash
bundlesize analyze dist/main.js --tree-shaking-report
```

**Output:**
```
🌳 Tree-Shaking Analysis

╭─────────────────────────────────────────────────────────────────╮
│  Tree-Shaking Effectiveness                                     │
├─────────────────────────────────────────────────────────────────┤
│  Overall Score: 67/100  (Moderate)                              │
│                                                                 │
│  Unused code detected: 124 KB (15% of bundle)                   │
│  Well tree-shaken: 712 KB (85%)                                 │
╰─────────────────────────────────────────────────────────────────╯

╭─────────────────────────────────────────────────────────────────╮
│  Libraries Not Tree-Shakeable                                   │
├─────────────────────────────────────────────────────────────────┤
│  ❌ lodash (112 KB)                                             │
│     Issue: CommonJS format, imports entire library              │
│     Fix: Use lodash-es instead                                  │
│                                                                 │
│  ❌ moment (98 KB)                                              │
│     Issue: Includes all locales (unused)                        │
│     Fix: Use moment-locales-webpack-plugin                      │
│           OR replace with date-fns                              │
│                                                                 │
│  ❌ rxjs (67 KB imported, 23 KB unused)                         │
│     Issue: Some operators imported but not used                 │
│     Used:   map, filter, switchMap                              │
│     Unused: mergeMap, concat, combineLatest                     │
│     Fix: Remove unused imports                                  │
╰─────────────────────────────────────────────────────────────────╯

╭─────────────────────────────────────────────────────────────────╮
│  Well Tree-Shaken Libraries ✅                                  │
├─────────────────────────────────────────────────────────────────┤
│  ✅ react (only hooks used are included)                        │
│  ✅ date-fns (only imported functions included)                 │
│  ✅ ramda (tree-shakeable by default)                           │
╰─────────────────────────────────────────────────────────────────╯

╭─────────────────────────────────────────────────────────────────╮
│  Optimization Steps                                             │
├─────────────────────────────────────────────────────────────────┤
│  1. Replace lodash with lodash-es:                              │
│     npm uninstall lodash && npm install lodash-es               │
│     Change: import _ from 'lodash'                              │
│     To:     import { map, filter } from 'lodash-es'             │
│     Savings: ~70 KB                                             │
│                                                                 │
│  2. Remove unused rxjs imports:                                 │
│     Remove: import { mergeMap, concat } from 'rxjs/operators'   │
│     Savings: ~23 KB                                             │
│                                                                 │
│  3. Replace moment with date-fns:                               │
│     npm uninstall moment && npm install date-fns                │
│     Savings: ~85 KB                                             │
│                                                                 │
│  Total potential savings: ~178 KB (-21% bundle size)            │
╰─────────────────────────────────────────────────────────────────╯
```

### Example 15: Webpack Plugin Integration

**webpack.config.js:**
```javascript
const BundleSizePlugin = require('@muin/bundlesize/webpack-plugin');

module.exports = {
  // ... other config
  plugins: [
    new BundleSizePlugin({
      // Maximum sizes
      maxSize: '300kb',
      maxGzip: '100kb',
      
      // Fail build if exceeded
      failOnExceed: true,
      
      // Allow 5% growth
      threshold: 5,
      
      // Track history
      trackHistory: true,
      
      // Generate report
      report: {
        enabled: true,
        format: 'html',
        output: 'bundle-report.html'
      },
      
      // Warnings
      warnOnDuplicates: true,
      warnOnLargeDependencies: {
        threshold: '50kb'
      },
      
      // Exclude from size calc
      exclude: [
        /\.map$/,
        /LICENSE\.txt$/
      ]
    })
  ]
};
```

**Build Output:**
```
webpack 5.75.0 compiled with 1 warning in 8432 ms

⚠️  Bundle Size Warning

dist/main.js: 287 KB (97 KB gzipped)
  Status: ✅ Within limit (300 KB)
  
dist/vendor.js: 445 KB (132 KB gzipped)
  Status: ⚠️  Close to limit (500 KB)
  
Warnings:
  • lodash (112 KB) - Consider using lodash-es
  • Duplicate dependency: core-js appears in 2 bundles (34 KB wasted)

📊 Report generated: bundle-report.html
📈 Size tracked: .bundlesize-cache.json
```

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
