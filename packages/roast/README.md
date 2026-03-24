<div align="center">

# 🔥 roast

**Gordon Ramsay meets your IDE.**

Brutally honest, hilariously harsh AI code reviews — from your terminal.

[![npm version](https://img.shields.io/npm/v/roast-cli?color=red&label=npm)](https://www.npmjs.com/package/roast-cli)
[![npm downloads](https://img.shields.io/npm/dm/roast-cli.svg)](https://www.npmjs.com/package/roast-cli)
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
npx roast-cli app.js       # Roast any file instantly
```

> Requires `OPENAI_API_KEY` env var. Get one at [platform.openai.com](https://platform.openai.com/api-keys).

Or install globally:

```bash
npm install -g roast-cli
```

## Usage

```bash
# Roast a file (default: brutal mode)
roast server.js

# Be gentle about it
roast --level mild utils.py

# Medium spice
roast --level medium handler.go

# Roast your staged git changes
git diff --staged | roast --diff

# Pipe from anywhere
cat spaghetti.rb | roast

# JSON output for CI integration
roast --json src/index.ts

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

## Configuration

### Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `OPENAI_API_KEY` | ✅ | — | Your OpenAI API key |
| `ROAST_MODEL` | | `gpt-4o-mini` | Default model |
| `ROAST_LEVEL` | | `brutal` | Default roast intensity |

### Supported Models

Any OpenAI-compatible model works:

- `gpt-4o-mini` — Fast & cheap (default)
- `gpt-4o` — Smarter roasts
- `gpt-4-turbo` — Premium burns
- Any OpenAI-compatible API (Ollama, Together, etc.)

## Use Cases

- **Pre-PR self-review** — Roast your own code before teammates do. Catch embarrassing patterns early.
- **Team Friday fun** — Run `roast --level harsh` on the week's worst PR. Winner gets bragging rights.
- **Onboarding** — New devs roast legacy code to learn what NOT to do (and laugh while doing it).
- **CI gate** — Auto-roast PRs in GitHub Actions. Real feedback, not just lint warnings.
- **Learning tool** — Students get memorable feedback that sticks (nobody forgets being called out by Gordon Ramsay).

## CI Integration

Add roast to your PR pipeline for code review with personality:

```yaml
# .github/workflows/roast.yml
- name: Roast PR changes
  run: |
    git diff origin/main...HEAD -- '*.js' '*.ts' | roast --diff --json
  env:
    OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
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
- **[oops](https://www.npmjs.com/package/@mj-muin/oops-cli)** — Pipe any error to AI for instant fixes. When `roast` hurts your feelings and you break something, `oops` picks up the pieces.
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
