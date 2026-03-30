<div align="center">

# 🛡️ portguard

**Stop EADDRINUSE errors before they start**

[![npm version](https://img.shields.io/npm/v/portguard?color=blue&label=npm)](https://www.npmjs.com/package/portguard)
[![npm downloads](https://img.shields.io/npm/dm/portguard?color=green)](https://www.npmjs.com/package/portguard)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

<br/>

*Instantly check what's using your ports — and kill it if needed.*

[Quick Start](#quick-start) • [Use Cases](#use-cases) • [API](#usage) • [Why portguard?](#why-portguard)

</div>

---

## The Problem

You know this drill:

```
Error: listen EADDRINUSE: address already in use :::3000
    at Server.setupListenHandle [as _listen2]
```

Now you're:
1. Googling "kill process on port" for the 100th time
2. Copy-pasting `lsof -ti:3000 | xargs kill -9`
3. Hoping you didn't just kill something important
4. Still not sure what was using that port

**There's a better way.**

---

## Quick Start

**30 seconds from install to success:**

```bash
# 1. Install (or skip with npx)
npm install -g portguard

# 2. Check what's using port 3000
portguard 3000

# 3. Kill it if needed
portguard 3000 --kill

# Done. Start your server.
```

**No install needed?** Use instantly with `npx`:

```bash
npx portguard 3000
```

---

## Use Cases

### 🚀 "Port 3000 already in use" — Fixed

The most common dev frustration. One command solves it:

```bash
portguard 3000 --kill && npm start
```

**Before portguard:**
```bash
lsof -ti:3000 | xargs kill -9  # Who's on this port? 🤷
# Hope nothing breaks...
npm start
```

**After portguard:**
```bash
portguard 3000 --kill  # Shows process, asks confirmation, kills safely
npm start
```

### 🔧 Dev Server Conflicts

Running multiple projects? Ports clash. portguard shows **all** conflicts at once:

```bash
portguard 3000,3001,8080,5432
```

```
✅ Port 3000: free
🔴 Port 3001: in-use — node (PID 23456, mj)
✅ Port 8080: free
🔴 Port 5432: in-use — postgres (PID 789, _postgres)
```

Now you know **exactly** what's blocking what.

### 🏗️ CI/CD Port Management

Stop test failures from port conflicts:

```bash
# In your CI pipeline (e.g., GitHub Actions)
- name: Clean ports before tests
  run: portguard 3000,5432,6379 --kill

- name: Start services
  run: docker-compose up -d
```

**JSON output** for scripting:

```bash
portguard 3000,8080 --json | jq '.[] | select(.status == "in-use")'
```

### 🐛 Debugging Mystery Processes

"What the hell is using port 8080?!"

```bash
portguard 8080
```

```
🔴 Port 8080: in-use — java (PID 99999, root)
```

Ah. That zombie Tomcat from three sprints ago. Mystery solved.

### 👀 Monitoring During Development

Keep an eye on critical ports in real-time:

```bash
portguard 3000,3001,5432 --watch --interval 5
```

```
🔍 Watching ports: 3000, 3001, 5432  (every 5s, Ctrl+C to stop)

[06:30:15]
  ✅ Port 3000: free
  🔴 Port 3001: in-use — node (PID 12345, mj)
  🔴 Port 5432: in-use — postgres (PID 789, _postgres)
```

---

## Usage

### Check a single port

```bash
portguard 3000
```

**Output:**
- `✅ Port 3000: free` — Ready to use
- `🔴 Port 3000: in-use — node (PID 12345, mj)` — Occupied

### Check multiple ports

```bash
portguard 3000,8080,5432
```

Comma-separated, no spaces. Check as many as you need.

### Kill processes on a port

```bash
portguard 3000 --kill
```

**Safe by default:**
- Shows **what** will be killed (command, PID, user)
- Asks for confirmation (unless `--force`)
- Uses SIGTERM first, SIGKILL as fallback

### JSON output

Perfect for scripts and CI/CD:

```bash
portguard 3000 --json
```

```json
[
  {
    "port": 3000,
    "status": "in-use",
    "processes": [
      {
        "command": "node",
        "pid": 12345,
        "user": "mj"
      }
    ]
  }
]
```

### Watch mode

Continuously monitor ports:

```bash
portguard 3000,8080 --watch
```

With custom interval:

```bash
portguard 3000 --watch --interval 10  # Check every 10 seconds
```

Press `Ctrl+C` to stop.

---

## Options

| Option | Description |
|--------|-------------|
| `--json` | Output results as JSON (for scripting) |
| `--kill` | Kill processes using the specified ports |
| `--watch` | Continuously monitor ports |
| `--interval N` | Watch interval in seconds (default: 2) |
| `-h, --help` | Show help message |
| `-v, --version` | Show version number |

---

## Why portguard?

### vs Manual `lsof` Commands

**Manual way:**
```bash
lsof -ti:3000  # What's the syntax again?
lsof -ti:3000 | xargs kill -9  # Hope this works...
```

**Problems:**
- ❌ Have to remember `lsof` flags
- ❌ No process details (what *is* PID 12345?)
- ❌ No safety checks (oops, killed production DB)
- ❌ Can't check multiple ports at once

**portguard:**
```bash
portguard 3000 --kill
```

- ✅ Human-readable output
- ✅ Shows command name, PID, user
- ✅ Safe confirmation prompts
- ✅ Check multiple ports: `3000,8080,5432`

---

### vs `kill-port`

**kill-port** only kills. That's it.

```bash
kill-port 3000  # Blindly kills. What was it? 🤷
```

**portguard** detects **first**, kills **second**:

```bash
portguard 3000  # Check first
# 🔴 Port 3000: in-use — node (PID 12345, mj)

portguard 3000 --kill  # Then decide
```

**Key differences:**

| Feature | portguard | kill-port |
|---------|-----------|-----------|
| **Detect** without killing | ✅ | ❌ |
| **Show process details** | ✅ Command, PID, user | ❌ |
| **Safe confirmation** | ✅ | ❌ |
| **Multiple ports** | ✅ `3000,8080,5432` | ❌ One at a time |
| **Watch mode** | ✅ | ❌ |
| **JSON output** | ✅ CI/CD ready | ❌ |

**portguard = kill-port + detection + safety + flexibility**

---

### vs Nothing (Manual Chaos)

**The old way:**

1. Get `EADDRINUSE` error
2. Google "how to kill process on port mac"
3. Try three StackOverflow answers
4. Finally find the right `lsof` incantation
5. Copy-paste, hope for the best
6. **10 minutes wasted**

**With portguard:**

```bash
portguard 3000 --kill && npm start
```

**Done in 10 seconds.**

---

## Installation

### Global install (recommended)

```bash
npm install -g portguard
```

Now `portguard` works anywhere:

```bash
portguard 3000
```

### Use without installing

```bash
npx portguard 3000
```

Slightly slower (downloads on first run), but zero setup.

### Add to your project

```bash
npm install --save-dev portguard
```

Then in `package.json`:

```json
{
  "scripts": {
    "clean-ports": "portguard 3000,8080 --kill",
    "prestart": "portguard 3000 --kill"
  }
}
```

Now `npm start` auto-cleans ports. 🎉

---

## How It Works

1. **Queries `lsof`** (macOS/Linux built-in tool)
2. **Parses process info** (command, PID, user)
3. **Presents human-readable results**
4. **Optionally kills** with confirmation

**Zero npm dependencies.** Uses only Node.js built-ins and OS tools.

---

## Requirements

- **Node.js** ≥ 18
- **Operating System:** macOS or Linux
- **Tool:** `lsof` (pre-installed on macOS/Linux)

**Windows:** Not supported (yet). `lsof` is Unix-only. Contributions welcome!

---

## Real-World Examples

### Example 1: React dev server conflict

```bash
$ npm start
Error: listen EADDRINUSE :::3000

$ portguard 3000
🔴 Port 3000: in-use — node (PID 45678, mj)

$ portguard 3000 --kill
🔴 Port 3000: in-use — node (PID 45678, mj) → killed

$ npm start
✓ Ready on http://localhost:3000
```

### Example 2: Multi-service stack

```bash
$ portguard 3000,4000,5432,6379

✅ Port 3000: free
🔴 Port 4000: in-use — node (PID 12345, mj)
🔴 Port 5432: in-use — postgres (PID 789, _postgres)
✅ Port 6379: free
```

Now you know:
- Frontend port (3000): available ✅
- Backend port (4000): need to kill old dev server 🔴
- Postgres (5432): running (leave it alone) 🔴
- Redis (6379): not started yet ✅

### Example 3: CI/CD integration

```yaml
# .github/workflows/test.yml
- name: Setup test environment
  run: |
    portguard 3000,5432 --kill || true
    docker-compose up -d
    sleep 5

- name: Run tests
  run: npm test
```

No more random test failures from port conflicts.

---

## Tips & Tricks

### Alias for convenience

Add to your `.zshrc` or `.bashrc`:

```bash
alias pg='portguard'
alias pgk='portguard --kill'
```

Now:

```bash
pg 3000        # Check
pgk 3000       # Kill
```

### Pre-start hook

Never worry about ports again:

```json
{
  "scripts": {
    "prestart": "portguard 3000 --kill",
    "start": "next dev"
  }
}
```

`npm start` now auto-cleans port 3000.

### Check common dev ports

```bash
portguard 3000,3001,4000,5000,8000,8080
```

One command to rule them all.

---

## Troubleshooting

### "command not found: lsof"

`lsof` is pre-installed on macOS/Linux. If missing (rare), install:

**macOS:** Already included
**Ubuntu/Debian:** `sudo apt-get install lsof`
**Arch:** `sudo pacman -S lsof`

### "Operation not permitted"

Some processes require elevated permissions to kill. Try:

```bash
sudo portguard 3000 --kill
```

### Watch mode not updating

Default interval is 2 seconds. Increase if needed:

```bash
portguard 3000 --watch --interval 5
```

---

## Contributing

Contributions welcome! Check [CONTRIBUTING.md](../../CONTRIBUTING.md) for guidelines.

**Ideas for contributions:**
- Windows support (using `netstat` instead of `lsof`)
- Interactive mode (TUI to select which processes to kill)
- Port range support (`3000-3010`)
- Process filtering by command name

---

## License

MIT © [MUIN](https://muin.company)

---

## Related Tools

Part of the **[cli-tools](https://github.com/muin-company/cli-tools)** monorepo:

- **[kill-by-name](../kill-by-name)** — Kill processes by name
- **[ports-in-use](../ports-in-use)** — List all open ports

**More tools coming soon.** Star the repo to follow updates! ⭐

---

<div align="center">

Made with 💪 by AI-powered developers at [MUIN](https://muin.company)

*"Port conflicts? Not on my watch."* 🛡️

</div>
