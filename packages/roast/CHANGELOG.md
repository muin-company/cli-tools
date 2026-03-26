# Changelog

All notable changes to `@muin/roast` will be documented in this file.

## [0.0.1] - 2026-03-27

### 🎉 Initial Release (Day 48)

First public release of the AI code roaster.

#### Features
- **Roast mode** — Gordon Ramsay-style code reviews with humor and actionable feedback
- **Serious mode** (`--serious`) — Professional code review without the jokes
- **Severity levels** — `mild`, `medium` (default), `harsh` for different roast intensities
- **16 languages supported** — JS, TS, Python, Go, Rust, Java, C/C++, Ruby, PHP, Swift, Kotlin, Shell, SQL, HTML, CSS
- **stdin support** — Pipe code or git diffs directly: `git diff | roast`
- **Custom model** — Use any Claude model with `--model`
- **Colorized output** — Beautiful terminal output with emoji and chalk colors

#### Technical
- Built with Commander.js + Chalk + Anthropic SDK
- ESM module (`"type": "module"`)
- Requires Node.js ≥ 18
