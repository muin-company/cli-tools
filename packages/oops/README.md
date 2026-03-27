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

### JSON output — machine-readable results

```bash
oops "TypeError: Assignment to constant variable" --json
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
