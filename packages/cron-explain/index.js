#!/usr/bin/env node

'use strict';

// ── Constants ──────────────────────────────────────────────────────────────────

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const DAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['', 'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];

const PRESETS = {
  '@yearly':   '0 0 1 1 *',
  '@annually': '0 0 1 1 *',
  '@monthly':  '0 0 1 * *',
  '@weekly':   '0 0 * * 0',
  '@daily':    '0 0 * * *',
  '@midnight': '0 0 * * *',
  '@hourly':   '0 * * * *',
};

// ── Cron Parser ────────────────────────────────────────────────────────────────

function parseCronField(field, min, max) {
  const values = new Set();

  for (const part of field.split(',')) {
    const stepMatch = part.match(/^(.+)\/(\d+)$/);
    let range = stepMatch ? stepMatch[1] : part;
    const step = stepMatch ? parseInt(stepMatch[2], 10) : 1;

    if (range === '*') {
      for (let i = min; i <= max; i += step) values.add(i);
    } else if (range.includes('-')) {
      const [start, end] = range.split('-').map(Number);
      if (isNaN(start) || isNaN(end) || start < min || end > max || start > end) {
        throw new Error(`Invalid range: ${range} (valid: ${min}-${max})`);
      }
      for (let i = start; i <= end; i += step) values.add(i);
    } else {
      const num = parseInt(range, 10);
      if (isNaN(num) || num < min || num > max) {
        throw new Error(`Invalid value: ${range} (valid: ${min}-${max})`);
      }
      if (step === 1) {
        values.add(num);
      } else {
        for (let i = num; i <= max; i += step) values.add(i);
      }
    }
  }

  return [...values].sort((a, b) => a - b);
}

function parseCron(expr) {
  expr = expr.trim();
  if (PRESETS[expr.toLowerCase()]) expr = PRESETS[expr.toLowerCase()];

  const parts = expr.split(/\s+/);
  if (parts.length < 5 || parts.length > 6) {
    throw new Error(`Invalid cron expression: expected 5 fields, got ${parts.length}`);
  }

  const [minF, hourF, domF, monF, dowF] = parts;

  return {
    raw: expr,
    minute: parseCronField(minF, 0, 59),
    hour: parseCronField(hourF, 0, 23),
    dayOfMonth: parseCronField(domF, 1, 31),
    month: parseCronField(monF, 1, 12),
    dayOfWeek: parseCronField(dowF, 0, 7).map(d => d === 7 ? 0 : d), // normalize 7 → 0
    fields: { min: minF, hour: hourF, dom: domF, mon: monF, dow: dowF },
  };
}

// ── Explain ────────────────────────────────────────────────────────────────────

function formatTime(hour, minute) {
  const h = hour % 12 || 12;
  const ampm = hour < 12 ? 'AM' : 'PM';
  const m = minute.toString().padStart(2, '0');
  return `${h}:${m} ${ampm}`;
}

function explainCron(expr) {
  const cron = parseCron(expr);
  const f = cron.fields;
  const parts = [];

  // Special presets
  const raw = cron.raw;
  if (raw === '* * * * *') return 'Every minute';
  if (raw === '0 * * * *') return 'Every hour';
  if (raw === '0 0 * * *') return 'Every day at midnight';
  if (raw === '0 0 1 1 *') return 'Once a year, at midnight on January 1st';
  if (raw === '0 0 1 * *') return 'At midnight on the 1st of every month';

  // Frequency
  if (f.min.startsWith('*/')) {
    parts.push(`Every ${f.min.slice(2)} minutes`);
  } else if (f.hour.startsWith('*/')) {
    const minDesc = cron.minute[0] === 0 ? '' : ` at minute ${cron.minute[0]}`;
    parts.push(`Every ${f.hour.slice(2)} hours${minDesc}`);
  } else {
    // Time description
    if (cron.hour.length === 1 && cron.minute.length === 1) {
      parts.push(`At ${formatTime(cron.hour[0], cron.minute[0])}`);
    } else if (f.hour.includes('-') && cron.minute.length === 1 && cron.minute[0] === 0) {
      const [start, end] = f.hour.split('-').map(Number);
      parts.push(`Every hour from ${formatTime(start, 0)} to ${formatTime(end, 0)}`);
    } else if (cron.hour.length > 1) {
      const times = cron.hour.map(h => formatTime(h, cron.minute[0] || 0));
      parts.push(`At ${times.join(', ')}`);
    } else {
      parts.push(`At minute ${cron.minute.join(', ')} of hour ${cron.hour.join(', ')}`);
    }
  }

  // Day of week
  if (f.dow !== '*') {
    const uniqueDays = [...new Set(cron.dayOfWeek)].sort((a, b) => a - b);
    if (uniqueDays.length === 5 && uniqueDays[0] === 1 && uniqueDays[4] === 5) {
      parts.push('Monday through Friday');
    } else if (uniqueDays.length === 2 && uniqueDays[0] === 0 && uniqueDays[1] === 6) {
      parts.push('on weekends');
    } else if (f.dow.includes('-')) {
      const [start, end] = f.dow.split('-').map(Number);
      parts.push(`${DAYS[start]} through ${DAYS[end]}`);
    } else {
      const dayNames = uniqueDays.map(d => DAYS[d]);
      if (dayNames.length === 1) {
        parts.push(`every ${dayNames[0]}`);
      } else {
        parts.push(`on ${dayNames.join(', ')}`);
      }
    }
  }

  // Day of month
  if (f.dom !== '*') {
    if (cron.dayOfMonth.length === 1) {
      const d = cron.dayOfMonth[0];
      const suffix = d === 1 ? 'st' : d === 2 ? 'nd' : d === 3 ? 'rd' : 'th';
      parts.push(`on the ${d}${suffix}`);
    } else {
      parts.push(`on days ${cron.dayOfMonth.join(', ')}`);
    }
  }

  // Month
  if (f.mon !== '*') {
    if (cron.month.length === 1) {
      parts.push(`in ${MONTHS[cron.month[0]]}`);
    } else {
      parts.push(`in ${cron.month.map(m => MONTHS[m]).join(', ')}`);
    }
  }

  return parts.join(', ');
}

// ── Natural Language → Cron ────────────────────────────────────────────────────

function naturalToCron(text) {
  const t = text.toLowerCase().trim();

  // every N minutes
  let m = t.match(/every\s+(\d+)\s+minutes?/);
  if (m) return `*/${m[1]} * * * *`;

  // every minute
  if (/every\s+minute/.test(t)) return '* * * * *';

  // every N hours
  m = t.match(/every\s+(\d+)\s+hours?/);
  if (m) return `0 */${m[1]} * * *`;

  // every hour
  if (/every\s+hour/.test(t)) return '0 * * * *';

  // Parse time
  function parseTime(str) {
    const tm = str.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/i);
    if (!tm) return null;
    let h = parseInt(tm[1], 10);
    const min = tm[2] ? parseInt(tm[2], 10) : 0;
    if (tm[3]) {
      if (tm[3].toLowerCase() === 'pm' && h !== 12) h += 12;
      if (tm[3].toLowerCase() === 'am' && h === 12) h = 0;
    }
    return { hour: h, minute: min };
  }

  // Parse day
  function parseDay(str) {
    const dayMap = { sun: 0, sunday: 0, mon: 1, monday: 1, tue: 2, tuesday: 2,
      wed: 3, wednesday: 3, thu: 4, thursday: 4, fri: 5, friday: 5, sat: 6, saturday: 6 };
    for (const [name, num] of Object.entries(dayMap)) {
      if (str.includes(name)) return num;
    }
    return null;
  }

  const time = parseTime(t);
  const day = parseDay(t);

  // "every weekday at TIME"
  if (/weekday/.test(t) && time) return `${time.minute} ${time.hour} * * 1-5`;

  // "every DAY at TIME"
  if (day !== null && time) return `${time.minute} ${time.hour} * * ${day}`;

  // "every day at TIME"
  if (/every\s+day/.test(t) && time) return `${time.minute} ${time.hour} * * *`;

  // "at TIME" (daily)
  if (time && !day) return `${time.minute} ${time.hour} * * *`;

  // "first day of every month at TIME"
  if (/first\s+day.*month/.test(t) && time) return `${time.minute} ${time.hour} 1 * *`;

  return null;
}

// ── Next Runs ──────────────────────────────────────────────────────────────────

function getNextRuns(expr, count = 5, tz = undefined) {
  const cron = parseCron(expr);
  const runs = [];
  const now = new Date();
  const check = new Date(now);

  // Start from next minute
  check.setSeconds(0, 0);
  check.setMinutes(check.getMinutes() + 1);

  const maxIter = 525960; // ~1 year of minutes
  for (let i = 0; i < maxIter && runs.length < count; i++) {
    const month = check.getMonth() + 1;
    const dom = check.getDate();
    const dow = check.getDay();
    const hour = check.getHours();
    const minute = check.getMinutes();

    if (cron.month.includes(month) &&
        cron.dayOfMonth.includes(dom) &&
        cron.dayOfWeek.includes(dow) &&
        cron.hour.includes(hour) &&
        cron.minute.includes(minute)) {
      runs.push(new Date(check));
    }

    check.setMinutes(check.getMinutes() + 1);
  }

  return runs;
}

function formatDate(date) {
  const dayName = DAYS[date.getDay()];
  const monthName = MONTHS[date.getMonth() + 1];
  const day = date.getDate();
  const year = date.getFullYear();
  const time = formatTime(date.getHours(), date.getMinutes());
  return `${dayName}, ${monthName} ${day}, ${year} at ${time}`;
}

function relativeTime(date) {
  const diff = date - new Date();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `in ${mins} minutes`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `in ${hours} hours`;
  const days = Math.floor(hours / 24);
  return `in ${days} days`;
}

// ── Validate ───────────────────────────────────────────────────────────────────

function validate(expr) {
  try {
    parseCron(expr);
    return { valid: true, errors: [] };
  } catch (e) {
    return { valid: false, errors: [e.message] };
  }
}

// ── Verbose Format ─────────────────────────────────────────────────────────────

function verboseFormat(expr) {
  const cron = parseCron(expr);
  const f = cron.fields;
  const lines = [];
  lines.push(`Expression: ${expr}`);
  lines.push('');
  lines.push('┌───────────── minute (0-59)');
  lines.push('│ ┌─────────── hour (0-23)');
  lines.push('│ │ ┌───────── day of month (1-31)');
  lines.push('│ │ │ ┌─────── month (1-12)');
  lines.push('│ │ │ │ ┌───── day of week (0-7, Sun=0 or 7)');
  lines.push(`${f.min} ${f.hour} ${f.dom} ${f.mon} ${f.dow}`);
  lines.push('');
  lines.push(`Minute:       ${f.min === '*' ? 'every minute' : `at minute ${cron.minute.join(', ')}`}`);
  lines.push(`Hour:         ${f.hour === '*' ? 'every hour' : `at hour ${cron.hour.join(', ')}`}`);
  lines.push(`Day of Month: ${f.dom === '*' ? 'every day' : `on day ${cron.dayOfMonth.join(', ')}`}`);
  lines.push(`Month:        ${f.mon === '*' ? 'every month' : cron.month.map(m => MONTHS[m]).join(', ')}`);
  const uniqueDow = [...new Set(cron.dayOfWeek)].sort((a, b) => a - b);
  lines.push(`Day of Week:  ${f.dow === '*' ? 'every day' : uniqueDow.map(d => DAYS[d]).join(', ')}`);
  lines.push('');
  lines.push(`Summary: ${explainCron(expr)}`);
  return lines.join('\n');
}

// ── CLI ────────────────────────────────────────────────────────────────────────

function showHelp() {
  console.log(`
cron-explain - Explain cron expressions in human language

Usage:
  cron-explain <expression>              Explain a cron expression
  cron-explain "<natural language>"      Convert natural language to cron
  cron-explain <expression> --next [N]   Show next N run times (default: 5)
  cron-explain <expression> --validate   Validate expression
  cron-explain <expression> --verbose    Show detailed breakdown
  cron-explain <expression> --json       Output as JSON
  cron-explain --examples                Show common examples
  cron-explain --help                    Show this help

Options:
  -n, --next [count]    Show next N execution times (default: 5)
  -v, --validate        Validate expression and show errors
  -f, --format <type>   Output format: human, cron, verbose, json
  --verbose             Detailed field-by-field breakdown
  --json                Output as JSON
  --examples            Show common cron expression examples
  -h, --help            Show help

Examples:
  cron-explain "0 9 * * 1"          → Every Monday at 9:00 AM
  cron-explain "*/15 * * * *"       → Every 15 minutes
  cron-explain "every day at 3pm"   → 0 15 * * *
  cron-explain "0 9 * * 1-5" -n 10  → Show next 10 weekday 9AM runs
`);
}

function showExamples() {
  const examples = [
    ['* * * * *', 'Every minute'],
    ['*/5 * * * *', 'Every 5 minutes'],
    ['0 * * * *', 'Every hour'],
    ['0 */2 * * *', 'Every 2 hours'],
    ['0 0 * * *', 'Every day at midnight'],
    ['0 9 * * *', 'Every day at 9:00 AM'],
    ['0 9 * * 1-5', 'Every weekday at 9:00 AM'],
    ['0 0 * * 0', 'Every Sunday at midnight'],
    ['0 0 1 * *', 'First day of every month'],
    ['0 0 1 1 *', 'Once a year (Jan 1)'],
    ['30 2 * * 0', 'Every Sunday at 2:30 AM'],
    ['0 9,17 * * *', 'At 9 AM and 5 PM every day'],
  ];

  console.log('\nCommon Cron Expressions:\n');
  for (const [expr, desc] of examples) {
    console.log(`  ${expr.padEnd(18)} ${desc}`);
  }
  console.log('');
}

function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    showHelp();
    process.exit(0);
  }

  if (args.includes('--examples')) {
    showExamples();
    process.exit(0);
  }

  // Collect expression (non-flag args joined)
  const flags = new Set();
  const positional = [];
  let nextCount = 5;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--next' || arg === '-n') {
      flags.add('next');
      if (args[i + 1] && !args[i + 1].startsWith('-')) {
        nextCount = parseInt(args[++i], 10) || 5;
      }
    } else if (arg === '--validate' || arg === '-v') {
      flags.add('validate');
    } else if (arg === '--verbose') {
      flags.add('verbose');
    } else if (arg === '--json') {
      flags.add('json');
    } else if (arg === '--format' || arg === '-f') {
      if (args[i + 1]) flags.add(args[++i]);
    } else {
      positional.push(arg);
    }
  }

  const input = positional.join(' ');
  if (!input) {
    console.error('Error: No expression provided. Use --help for usage.');
    process.exit(1);
  }

  // Try as cron expression first
  let isCron = false;
  let cronExpr = input;

  try {
    parseCron(input);
    isCron = true;
  } catch {
    // Try natural language
    const generated = naturalToCron(input);
    if (generated) {
      cronExpr = generated;
      if (!flags.has('json')) {
        console.log(`${generated}`);
        console.log(`Description: ${explainCron(generated)}`);
      }
    } else {
      console.error(`Error: Could not parse "${input}" as a cron expression or natural language.`);
      console.error('Use --help for usage and --examples for common expressions.');
      process.exit(1);
    }
  }

  // Validate mode
  if (flags.has('validate')) {
    const result = validate(cronExpr);
    if (result.valid) {
      console.log('✓ Valid cron expression');
      console.log(`  ${explainCron(cronExpr)}`);
    } else {
      console.error('✗ Invalid cron expression');
      result.errors.forEach(e => console.error(`  ${e}`));
      process.exit(1);
    }
    return;
  }

  // JSON output
  if (flags.has('json')) {
    const cron = parseCron(cronExpr);
    const output = {
      expression: cronExpr,
      description: explainCron(cronExpr),
      fields: cron.fields,
      valid: true,
    };
    if (flags.has('next')) {
      output.nextRuns = getNextRuns(cronExpr, nextCount).map(d => d.toISOString());
    }
    console.log(JSON.stringify(output, null, 2));
    return;
  }

  // Verbose
  if (flags.has('verbose')) {
    console.log(verboseFormat(cronExpr));
    if (flags.has('next')) {
      console.log(`\nNext ${nextCount} executions:`);
      getNextRuns(cronExpr, nextCount).forEach((d, i) => {
        console.log(`  ${(i + 1).toString().padStart(2)}. ${formatDate(d)}  (${relativeTime(d)})`);
      });
    }
    return;
  }

  // Default: explain
  if (isCron) {
    console.log(explainCron(cronExpr));
  }

  // Next runs
  if (flags.has('next')) {
    console.log(`\nNext ${nextCount} executions:`);
    getNextRuns(cronExpr, nextCount).forEach((d, i) => {
      console.log(`  ${(i + 1).toString().padStart(2)}. ${formatDate(d)}  (${relativeTime(d)})`);
    });
  }
}

// ── Exports (for programmatic use) ─────────────────────────────────────────────

module.exports = { explainCron, parseCron, naturalToCron, getNextRuns, validate };

// ── Run ────────────────────────────────────────────────────────────────────────

if (require.main === module) {
  main();
}
