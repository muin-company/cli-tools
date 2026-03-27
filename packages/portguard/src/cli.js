#!/usr/bin/env node

import { execSync } from 'child_process';
import { parseArgs } from 'util';

const { values, positionals } = parseArgs({
  options: {
    json: { type: 'boolean', default: false },
    kill: { type: 'boolean', default: false },
    watch: { type: 'boolean', default: false },
    interval: { type: 'string', default: '2' },
    help: { type: 'boolean', short: 'h', default: false },
    version: { type: 'boolean', short: 'v', default: false },
  },
  allowPositionals: true,
  strict: false,
});

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(readFileSync(join(__dirname, '..', 'package.json'), 'utf8'));

if (values.version) {
  console.log(pkg.version);
  process.exit(0);
}

if (values.help || positionals.length === 0) {
  console.log(`
  ${pkg.name} v${pkg.version}
  ${pkg.description}

  Usage:
    portguard <port[,port,...]> [options]

  Options:
    --json         Output results as JSON
    --kill         Kill processes using the specified ports
    --watch        Continuously monitor ports
    --interval N   Watch interval in seconds (default: 2)
    -h, --help     Show this help
    -v, --version  Show version

  Examples:
    portguard 3000
    portguard 3000,8080,5432
    portguard 3000 --json
    portguard 3000 --kill
    portguard 3000 --watch
`);
  process.exit(0);
}

// Parse ports
const ports = positionals[0].split(',').map(p => parseInt(p.trim(), 10)).filter(p => !isNaN(p));

function checkPort(port) {
  try {
    const lsof = process.platform === 'darwin' ? '/usr/sbin/lsof' : 'lsof';
    const output = execSync(`${lsof} -i :${port} -P -n -sTCP:LISTEN 2>/dev/null`, { encoding: 'utf8' });
    const lines = output.trim().split('\n').slice(1); // skip header
    const procs = lines.map(line => {
      const parts = line.split(/\s+/);
      return { command: parts[0], pid: parseInt(parts[1], 10), user: parts[2] };
    });
    return { port, status: 'in-use', processes: procs };
  } catch {
    return { port, status: 'free', processes: [] };
  }
}

function killPort(port) {
  const result = checkPort(port);
  if (result.status === 'free') return { ...result, killed: false, message: `Port ${port} is already free` };
  const pids = [...new Set(result.processes.map(p => p.pid))];
  for (const pid of pids) {
    try { execSync(`kill -9 ${pid} 2>/dev/null`); } catch {}
  }
  return { ...result, killed: true, message: `Killed ${pids.length} process(es) on port ${port}` };
}

function formatResult(r) {
  const icon = r.status === 'free' ? '✅' : '🔴';
  let line = `${icon} Port ${r.port}: ${r.status}`;
  if (r.processes.length > 0) {
    const procs = r.processes.map(p => `${p.command} (PID ${p.pid}, ${p.user})`).join(', ');
    line += ` — ${procs}`;
  }
  if (r.killed) line += ` → killed`;
  if (r.message && r.killed === false) line += '';
  return line;
}

function run() {
  const results = ports.map(port => values.kill ? killPort(port) : checkPort(port));

  if (values.json) {
    console.log(JSON.stringify(results, null, 2));
  } else {
    results.forEach(r => console.log(formatResult(r)));
  }
}

if (values.watch) {
  const interval = parseInt(values.interval, 10) * 1000 || 2000;
  const clear = () => process.stdout.write('\x1Bc');
  const tick = () => {
    clear();
    console.log(`🔍 Watching ports: ${ports.join(', ')}  (every ${interval / 1000}s, Ctrl+C to stop)\n`);
    run();
  };
  tick();
  setInterval(tick, interval);
} else {
  run();
}
