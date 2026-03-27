<div align="center">

# 🛡️ portguard

**Instantly check what's using your ports — and kill it if needed.**

[![npm version](https://img.shields.io/npm/v/portguard?color=blue&label=npm)](https://www.npmjs.com/package/portguard)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/node/v/portguard.svg)](https://nodejs.org)

<br/>

*"Port 3000 is already in use" — never again.*

</div>

---

## The Problem

You run `npm start` and get:

```
Error: listen EADDRINUSE: address already in use :::3000
```

Now you're googling `lsof` flags for the 100th time. Or worse — blindly killing processes.

## The Solution

```bash
portguard 3000
```

That's it. See what's using it. Kill it if you want. Move on.

## Installation

```bash
# Use instantly (no install)
npx portguard 3000

# Or install globally
npm install -g portguard
```

**Zero dependencies.** Uses Node.js built-ins and `lsof` (available on macOS/Linux).

## Usage

### Check a port

```bash
portguard 3000
# ✅ Port 3000: free
# 🔴 Port 3000: in-use — node (PID 12345, mj)
```

### Check multiple ports

```bash
portguard 3000,8080,5432
# ✅ Port 3000: free
# 🔴 Port 8080: in-use — node (PID 23456, mj)
# 🔴 Port 5432: in-use — postgres (PID 789, _postgres)
```

### JSON output

```bash
portguard 3000 --json
```

```json
[
  {
    "port": 3000,
    "status": "in-use",
    "processes": [
      { "command": "node", "pid": 12345, "user": "mj" }
    ]
  }
]
```

### Kill processes on a port

```bash
portguard 3000 --kill
# 🔴 Port 3000: in-use — node (PID 12345, mj) → killed
```

### Watch mode

```bash
portguard 3000,8080 --watch
# 🔍 Watching ports: 3000, 8080  (every 2s, Ctrl+C to stop)
```

## Options

| Option | Description |
|--------|-------------|
| `--json` | Output results as JSON |
| `--kill` | Kill processes using the specified ports |
| `--watch` | Continuously monitor ports |
| `--interval N` | Watch interval in seconds (default: 2) |
| `-h, --help` | Show help |
| `-v, --version` | Show version |

## Use Cases

### 🚀 Dev server conflicts

Port 3000 still running from yesterday's session? Check and kill in one command.

```bash
portguard 3000 --kill && npm start
```

### 🔧 CI/CD port cleanup

Ensure ports are free before starting services in your pipeline.

```bash
portguard 3000,5432,6379 --json | jq '.[] | select(.status == "in-use")'
```

### 🐛 Debugging

Find the mystery process hogging a port.

```bash
portguard 8080
# 🔴 Port 8080: in-use — java (PID 99999, root)
# Ah, it's that zombie Tomcat again.
```

### 👀 Monitoring

Keep an eye on critical ports during development.

```bash
portguard 3000,3001,5432 --watch --interval 5
```

## Requirements

- **Node.js** ≥ 18
- **macOS or Linux** (uses `lsof`)

## License

MIT © [MUIN](https://muin.company)
