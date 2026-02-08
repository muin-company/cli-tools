# @muin/cron-explain

[![npm version](https://img.shields.io/npm/v/@muin/cron-explain.svg)](https://www.npmjs.com/package/@muin/cron-explain)
[![npm downloads](https://img.shields.io/npm/dm/@muin/cron-explain.svg)](https://www.npmjs.com/package/@muin/cron-explain)
[![license](https://img.shields.io/npm/l/@muin/cron-explain.svg)](https://github.com/muin-company/cli-tools/blob/main/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/muin-company/cli-tools/blob/main/CONTRIBUTING.md)

Finally understand and generate cron expressions in human language. Bidirectional conversion with visual preview.

## Features

- 🎨 **Interactive Mode** - Visual cron expression builder with real-time preview
- 🔄 **Bidirectional** - Explain cron expressions OR generate from natural language
- 👀 **Next Run Times** - See exactly when your cron will execute (next 10 occurrences)
- ⚙️ **Timezone Support** - Preview schedules in any timezone
- 📋 **Multiple Formats** - Human-readable, technical, and crontab-ready output
- 🛡️ **Validation** - Catch invalid cron expressions before they fail silently
- 🌍 **Common Presets** - Quick access to common schedules (hourly, daily, weekly, etc.)
- ⚡ **Fast & Lightweight** - No external dependencies, pure JavaScript

## Installation

```bash
npm install -g @muin/cron-explain
```

Or use directly with npx:

```bash
npx @muin/cron-explain
```

## Quick Start

### Explain a cron expression:

```bash
cron-explain "0 5 * * 1"
# Output: Every Monday at 5:00 AM
```

### Generate from natural language:

```bash
cron-explain "every day at 3pm"
# Output: 0 15 * * *
```

### Interactive mode (recommended):

```bash
cron-explain --interactive
```

## Usage

### Command-Line Interface

```bash
# Explain a cron expression
cron-explain "0 5 * * 1"
cron-explain "*/15 * * * *"
cron-explain "0 0 1 1 *"

# Generate from natural language
cron-explain "every monday at 5am"
cron-explain "every 15 minutes"
cron-explain "first day of every month"

# Show next run times
cron-explain "0 9 * * 1-5" --next 10

# Explain with timezone
cron-explain "0 9 * * *" --timezone "America/New_York"

# Validate expression
cron-explain "0 25 * * *" --validate
# Error: Invalid hour: 25

# Output in different formats
cron-explain "every monday at 5am" --format cron  # 0 5 * * 1
cron-explain "0 5 * * 1" --format human           # Every Monday at 5:00 AM
cron-explain "0 5 * * 1" --format verbose         # Detailed breakdown
```

### Options

- `<expression>` - Cron expression or natural language description
- `-i, --interactive` - Launch interactive mode with visual builder
- `-n, --next <count>` - Show next N execution times (default: 5)
- `-t, --timezone <tz>` - Timezone for execution times (default: system timezone)
- `-f, --format <type>` - Output format: `human`, `cron`, `verbose`, `json`
- `-v, --validate` - Validate expression and show errors
- `--examples` - Show common cron expression examples
- `--presets` - List available schedule presets

## Examples

### Example 1: Basic Explanations

```bash
$ cron-explain "0 5 * * 1"
Every Monday at 5:00 AM

$ cron-explain "*/15 * * * *"
Every 15 minutes

$ cron-explain "0 0 * * *"
Every day at midnight

$ cron-explain "0 9-17 * * 1-5"
Every hour from 9:00 AM to 5:00 PM, Monday through Friday

$ cron-explain "0 0 1 * *"
At midnight on the first day of every month

$ cron-explain "30 2 * * 0"
Every Sunday at 2:30 AM
```

### Example 2: Natural Language to Cron

```bash
$ cron-explain "every day at 3pm"
0 15 * * *
Description: Every day at 3:00 PM

$ cron-explain "every monday at 9am"
0 9 * * 1
Description: Every Monday at 9:00 AM

$ cron-explain "every 30 minutes"
*/30 * * * *
Description: Every 30 minutes

$ cron-explain "every hour between 9am and 5pm on weekdays"
0 9-17 * * 1-5
Description: Every hour from 9:00 AM to 5:00 PM, Monday through Friday

$ cron-explain "first day of every month at midnight"
0 0 1 * *
Description: At midnight on the first day of every month

$ cron-explain "last friday of every month at 5pm"
0 17 * * 5#4
Description: Every last Friday of the month at 5:00 PM
```

### Example 3: Next Execution Times

```bash
$ cron-explain "0 9 * * 1-5" --next 10

Expression: 0 9 * * 1-5
Description: Every weekday (Monday-Friday) at 9:00 AM
Timezone: America/Los_Angeles (PST)

Next 10 executions:
  1. Monday,    Feb 10, 2025 at 9:00 AM PST  (in 2 days)
  2. Tuesday,   Feb 11, 2025 at 9:00 AM PST  (in 3 days)
  3. Wednesday, Feb 12, 2025 at 9:00 AM PST  (in 4 days)
  4. Thursday,  Feb 13, 2025 at 9:00 AM PST  (in 5 days)
  5. Friday,    Feb 14, 2025 at 9:00 AM PST  (in 6 days)
  6. Monday,    Feb 17, 2025 at 9:00 AM PST  (in 9 days)
  7. Tuesday,   Feb 18, 2025 at 9:00 AM PST  (in 10 days)
  8. Wednesday, Feb 19, 2025 at 9:00 AM PST  (in 11 days)
  9. Thursday,  Feb 20, 2025 at 9:00 AM PST  (in 12 days)
 10. Friday,    Feb 21, 2025 at 9:00 AM PST  (in 13 days)
```

### Example 4: Timezone Conversions

```bash
$ cron-explain "0 9 * * *" --timezone "Europe/London"

Expression: 0 9 * * *
Description: Every day at 9:00 AM
Timezone: Europe/London (GMT)

Next execution: Tomorrow at 9:00 AM GMT

Equivalent in other timezones:
  - America/New_York: 4:00 AM EST
  - America/Los_Angeles: 1:00 AM PST
  - Asia/Tokyo: 6:00 PM JST
  - Australia/Sydney: 8:00 PM AEDT
```

### Example 5: Verbose Format

```bash
$ cron-explain "30 2 * * 0" --format verbose

╭─ Cron Expression Breakdown ──────────────────────────╮
│                                                       │
│  Expression: 30 2 * * 0                               │
│                                                       │
│  ┌───────────── minute (0 - 59)                       │
│  │ ┌─────────── hour (0 - 23)                         │
│  │ │ ┌───────── day of month (1 - 31)                 │
│  │ │ │ ┌─────── month (1 - 12)                        │
│  │ │ │ │ ┌───── day of week (0 - 6) (Sun - Sat)       │
│  │ │ │ │ │                                             │
│  30 2 * * 0                                            │
│  │  │ │ │ │                                            │
│  │  │ │ │ └─ Every Sunday                              │
│  │  │ │ └─── Every month                               │
│  │  │ └───── Every day of month                        │
│  │  └─────── At 2:00 AM                                │
│  └────────── At 30 minutes past the hour              │
│                                                       │
│  Human-readable: Every Sunday at 2:30 AM              │
│                                                       │
╰───────────────────────────────────────────────────────╯

Field Details:
  Minute:        30 (at 30 minutes past the hour)
  Hour:          2 (2:00 AM)
  Day of Month:  * (every day)
  Month:         * (every month)
  Day of Week:   0 (Sunday)

Special Patterns Detected: None
```

### Example 6: Interactive Mode

```bash
$ cron-explain --interactive

╭─────────────────────────────────────────────────────────────╮
│  ⏰ Cron Explain - Interactive Mode                         │
│  Build and understand cron expressions visually             │
╰─────────────────────────────────────────────────────────────╯

? What would you like to do?
  ❯ Build a cron expression
    Explain an existing expression
    Browse common presets

? Select frequency:
  ❯ Every minute
    Every hour
    Every day
    Every week
    Every month
    Custom schedule

? What time? (Use arrow keys or type)
  ┌──────────────────────────┐
  │   Hour: 09  ◀ ▶          │
  │ Minute: 00  ◀ ▶          │
  │                          │
  │   Format: AM/PM ◀ ▶      │
  └──────────────────────────┘

? Which days?
  ◉ Monday
  ◉ Tuesday
  ◉ Wednesday
  ◉ Thursday
  ◉ Friday
  ◯ Saturday
  ◯ Sunday

╭─── Preview ──────────────────────────────────────────╮
│                                                      │
│  Cron Expression: 0 9 * * 1-5                        │
│                                                      │
│  Human-readable: Every weekday at 9:00 AM            │
│                                                      │
│  Next 5 runs:                                        │
│    Mon Feb 10, 2025 at 9:00 AM                       │
│    Tue Feb 11, 2025 at 9:00 AM                       │
│    Wed Feb 12, 2025 at 9:00 AM                       │
│    Thu Feb 13, 2025 at 9:00 AM                       │
│    Fri Feb 14, 2025 at 9:00 AM                       │
│                                                      │
╰──────────────────────────────────────────────────────╯

? What would you like to do?
  ❯ 📋 Copy to clipboard
    💾 Save to crontab
    🔄 Modify schedule
    ✏️  Add a label/comment
    ❌ Exit

✓ Copied to clipboard: 0 9 * * 1-5

💡 Tip: Add this to your crontab:
    crontab -e
    # Then paste: 0 9 * * 1-5 /path/to/script.sh

Thanks for using cron-explain! ⏰
```

### Example 7: Common Presets

```bash
$ cron-explain --presets

╭─ Common Cron Presets ─────────────────────────────────╮
│                                                        │
│  @hourly      →  0 * * * *  (every hour)               │
│  @daily       →  0 0 * * *  (every day at midnight)    │
│  @weekly      →  0 0 * * 0  (every Sunday at midnight) │
│  @monthly     →  0 0 1 * *  (first of month)           │
│  @yearly      →  0 0 1 1 *  (Jan 1st at midnight)      │
│  @reboot      →  (at system startup)                   │
│                                                        │
│  Business Hours (9-5 weekdays):                        │
│    Start:     0 9 * * 1-5                              │
│    Every hr:  0 9-17 * * 1-5                           │
│    End:       0 17 * * 1-5                             │
│                                                        │
│  Maintenance Windows:                                  │
│    Late night: 0 2 * * *   (2 AM daily)                │
│    Weekend:    0 0 * * 6   (Sat midnight)              │
│    Monthly:    0 2 1 * *   (1st at 2 AM)               │
│                                                        │
│  Backups:                                              │
│    Hourly:    0 * * * *                                │
│    Daily:     0 1 * * *    (1 AM)                      │
│    Weekly:    0 2 * * 0    (Sun 2 AM)                  │
│                                                        │
╰────────────────────────────────────────────────────────╯
```

### Example 8: Validation

```bash
$ cron-explain "0 25 * * *" --validate

❌ Invalid cron expression: 0 25 * * *

Errors found:
  • Hour value 25 is out of range (must be 0-23)

Did you mean:
  0 23 * * * → Every day at 11:00 PM
  0 5 * * *  → Every day at 5:00 AM

Tip: Use --interactive mode to build valid expressions

$ cron-explain "*/90 * * * *" --validate

⚠️  Warning: This cron expression may not work as expected

Issues:
  • Interval '*/90' for minutes will only match at minute 0
  • Consider using '0 */1 * * *' for hourly execution instead

Suggestion: For "every 90 minutes", consider scheduling:
  0 0,1,3,4,6,7,9,10,12,13,15,16,18,19,21,22 * * *
```

### Example 9: JSON Output for Automation

```bash
$ cron-explain "0 9 * * 1-5" --format json --next 3

{
  "expression": "0 9 * * 1-5",
  "description": "Every weekday (Monday-Friday) at 9:00 AM",
  "fields": {
    "minute": "0",
    "hour": "9",
    "dayOfMonth": "*",
    "month": "*",
    "dayOfWeek": "1-5"
  },
  "interpretation": {
    "minute": "At 0 minutes past the hour",
    "hour": "At 9:00 AM",
    "dayOfMonth": "Every day of the month",
    "month": "Every month",
    "dayOfWeek": "Monday through Friday"
  },
  "nextRuns": [
    {
      "timestamp": "2025-02-10T09:00:00-08:00",
      "formatted": "Monday, Feb 10, 2025 at 9:00 AM PST",
      "fromNow": "in 2 days"
    },
    {
      "timestamp": "2025-02-11T09:00:00-08:00",
      "formatted": "Tuesday, Feb 11, 2025 at 9:00 AM PST",
      "fromNow": "in 3 days"
    },
    {
      "timestamp": "2025-02-12T09:00:00-08:00",
      "formatted": "Wednesday, Feb 12, 2025 at 9:00 AM PST",
      "fromNow": "in 4 days"
    }
  ],
  "timezone": "America/Los_Angeles",
  "valid": true,
  "warnings": []
}
```

## Supported Cron Syntax

### Standard Fields

```
┌───────────── minute (0 - 59)
│ ┌─────────── hour (0 - 23)
│ │ ┌───────── day of month (1 - 31)
│ │ │ ┌─────── month (1 - 12)
│ │ │ │ ┌───── day of week (0 - 6) (Sunday=0 or 7)
│ │ │ │ │
* * * * *
```

### Special Characters

| Character | Meaning | Example |
|-----------|---------|---------|
| `*` | Any value | `* * * * *` = every minute |
| `,` | Value list | `0 9,17 * * *` = 9am and 5pm |
| `-` | Range | `0 9-17 * * *` = 9am to 5pm |
| `/` | Step values | `*/15 * * * *` = every 15 min |
| `#` | Nth occurrence | `0 0 * * 1#2` = 2nd Monday |
| `L` | Last | `0 0 L * *` = last day of month |

### Month Names

Both numbers and names are supported:
```bash
0 0 1 jan *    # January 1st
0 0 1 1 *      # Same thing
0 0 * jun-aug * # June through August
```

### Day of Week Names

```bash
0 9 * * mon     # Every Monday
0 9 * * 1       # Same thing
0 9 * * mon-fri # Weekdays
```

### Special Keywords

| Keyword | Equivalent | Description |
|---------|------------|-------------|
| `@hourly` | `0 * * * *` | Every hour |
| `@daily` | `0 0 * * *` | Every day at midnight |
| `@weekly` | `0 0 * * 0` | Every Sunday |
| `@monthly` | `0 0 1 * *` | First of month |
| `@yearly` | `0 0 1 1 *` | January 1st |
| `@annually` | `0 0 1 1 *` | Same as @yearly |
| `@reboot` | N/A | At system boot |

## Common Use Cases

### 1. **Understanding Existing Crontabs**

The most common use case - decode cryptic cron expressions:

```bash
# From your crontab
crontab -l | grep "backup" | cut -d' ' -f1-5 | cron-explain
# Output: Every Sunday at 2:00 AM

# Quick lookup
cron-explain "30 4 1,15 * *"
# Output: At 4:30 AM on the 1st and 15th of every month
```

### 2. **Creating New Cron Jobs**

Build cron expressions without memorizing syntax:

```bash
# Natural language input
cron-explain "every day at 3am" > /tmp/schedule
cat /tmp/schedule  # 0 3 * * *

# Add to crontab
echo "0 3 * * * /path/to/backup.sh" | crontab -

# Or use interactive mode
cron-explain --interactive
# Walk through visual builder, then copy output
```

### 3. **Debugging Schedules**

See when jobs will actually run:

```bash
# Check if your job will run when you expect
cron-explain "0 2 * * 6" --next 10
# Shows next 10 Saturdays at 2 AM

# Verify timezone issues
cron-explain "0 9 * * *" --timezone "UTC" --next 5
# See UTC times vs your local time
```

### 4. **Documentation**

Generate human-readable schedules for documentation:

```bash
# For your README
echo "Deployment schedule:" > README.md
cron-explain "0 2 * * 0" >> README.md
# Output: Every Sunday at 2:00 AM

# For team wiki
for job in $(crontab -l | cut -d' ' -f1-5); do
  echo "$job → $(cron-explain "$job")"
done
```

### 5. **CI/CD Integration**

Validate cron expressions in your pipeline:

```bash
# In your CI script
if ! cron-explain "$CRON_SCHEDULE" --validate; then
  echo "Invalid cron expression!"
  exit 1
fi

# Or get JSON output for processing
cron-explain "$CRON_SCHEDULE" --format json | jq '.valid'
```

### 6. **Learning Cron Syntax**

Educational tool for understanding cron:

```bash
# See examples
cron-explain --examples

# Try different patterns
cron-explain "*/5 * * * *"   # Every 5 minutes
cron-explain "0 */2 * * *"   # Every 2 hours
cron-explain "0 0 */2 * *"   # Every 2 days

# Use verbose mode to learn
cron-explain "30 2 * * 0" --format verbose
```

## Why This Tool?

### The Problem

Cron expressions are powerful but cryptic...

**Without cron-explain:**

```cron
0 5 * * 1
```
- What does this mean? 🤔
- When does it run next?
- Is it Monday or Sunday (0 vs 1)?
- Is it 5am or 5pm?
- Will it run this week?
- How do I create a similar schedule?

**With cron-explain:**

```bash
$ cron-explain "0 5 * * 1"

Every Monday at 5:00 AM

Next 5 runs:
  Mon Feb 10, 2025 at 5:00 AM (in 2 days)
  Mon Feb 17, 2025 at 5:00 AM (in 9 days)
  Mon Feb 24, 2025 at 5:00 AM (in 16 days)
  ...
```

**10 seconds. Crystal clear. ✅**

### The Benefits

- ⏱️ **Save 5-10 minutes** every time you need to understand/create a cron
- 🐛 **Fewer bugs** - See exactly when jobs run before deploying
- 🧠 **Learning tool** - Understand cron syntax without googling
- 🌍 **Timezone aware** - No more "why didn't my job run?" mysteries
- ✅ **Validation** - Catch errors before they cause outages

## Common Gotchas & Troubleshooting

### Issue: "0 vs 7 for Sunday - which is correct?"

**Cause:** Both are valid! Sunday can be 0 or 7

**Solution:**
```bash
# These are identical:
cron-explain "0 0 * * 0"  # Sunday (0)
cron-explain "0 0 * * 7"  # Sunday (7)
# Both output: Every Sunday at midnight

# Recommendation: Use 0 for consistency
```

### Issue: "My cron runs every minute instead of daily"

**Cause:** Missing fields or incorrect wildcard usage

**Solution:**
```bash
# Wrong: Only specifying hour
0 * * *      # ❌ This is invalid (missing day of week field)

# Wrong: Too many wildcards
* * * * *    # ❌ Every minute!

# Correct: Daily at specific time
0 9 * * *    # ✅ Every day at 9 AM

# Validate before using:
cron-explain "* * * * *" --validate
# Warning: This runs every minute!
```

### Issue: "*/15 for every 15 minutes doesn't work"

**Cause:** Step values only work at intervals that divide evenly

**Solution:**
```bash
# This works (15 divides into 60):
*/15 * * * *  # ✅ At :00, :15, :30, :45

# This doesn't (7 doesn't divide into 60):
*/7 * * * *   # ❌ Only runs at :00!

# See what it actually does:
cron-explain "*/7 * * * *" --next 5
# Shows: Only at minute 0

# For irregular intervals, list explicitly:
0,7,14,21,28,35,42,49,56 * * * *  # Every 7 minutes
```

### Issue: "Daylight Saving Time causes missed jobs"

**Cause:** Clock changes during DST transitions

**Solution:**
```bash
# Problem: Job scheduled at 2 AM during DST transition
0 2 * * *     # May run twice or not at all

# Solution 1: Use UTC timezone
cron-explain "0 2 * * *" --timezone UTC
# Runs at consistent absolute time

# Solution 2: Avoid 2-3 AM window
0 1 * * *     # Run at 1 AM (before DST change)
0 4 * * *     # Run at 4 AM (after DST change)

# Check DST impact:
cron-explain "0 2 * * *" --next 30 --timezone "America/New_York"
# Look for gaps or duplicates
```

### Issue: "Month ranges don't work as expected"

**Cause:** Confusion between month numbers and names

**Solution:**
```bash
# Wrong: Months are 1-12, not 0-11
0 0 1 0 *     # ❌ Invalid: month 0

# Correct: January is 1
0 0 1 1 *     # ✅ January 1st

# Use names to avoid confusion:
0 0 1 jan *   # ✅ Clearer
0 0 1 jan-mar *  # ✅ Jan through March

# Validate month numbers:
cron-explain "0 0 1 0 *" --validate
# Error: Month 0 is invalid
```

### Issue: "Last day of month scheduling is tricky"

**Cause:** Different months have different last days

**Solution:**
```bash
# Don't use 31 (won't run in shorter months):
0 0 31 * *    # ❌ Skips Feb, Apr, Jun, Sep, Nov

# Use 'L' for last day (if supported):
0 0 L * *     # ✅ Last day of every month

# Or use day ranges:
0 0 28-31 * * # ⚠️  Runs on last 4 days

# Best approach: Multiple days
0 0 1 * *     # First of month
0 0 15 * *    # Middle of month

# Check behavior:
cron-explain "0 0 31 * *" --next 12
# See which months are skipped
```

### Issue: "Combination of day-of-month AND day-of-week"

**Cause:** Both are OR, not AND

**Solution:**
```bash
# This runs when EITHER condition is true:
0 0 13 * 5    # ❌ Runs on 13th OR Friday (not 13th + Friday)

# Output: "At midnight on the 13th OR on Friday"

# For "Friday the 13th", you need advanced syntax:
# Use separate jobs or scripting logic

# Verify behavior:
cron-explain "0 0 13 * 5" --next 30
# See both 13th AND Fridays listed
```

### Issue: "Job runs on wrong timezone"

**Cause:** Cron uses system timezone, may not match your location

**Solution:**
```bash
# Check system timezone
timedatectl status

# Preview in your timezone:
cron-explain "0 9 * * *" --timezone "America/Los_Angeles"

# Set timezone in cron (if supported):
TZ="America/Los_Angeles"
0 9 * * * /path/to/script.sh

# Or use UTC and convert in script:
0 17 * * *  # 17:00 UTC = 9:00 AM PST
```

### Issue: "@hourly doesn't work in my cron"

**Cause:** Special keywords require vixie-cron or similar

**Solution:**
```bash
# Not all cron implementations support keywords:
@hourly /path/to/script.sh  # May not work

# Use standard syntax instead:
0 * * * * /path/to/script.sh  # ✅ Works everywhere

# Check if your cron supports it:
cron-explain "@hourly"
# Tool will show equivalent: 0 * * * *
```

### Issue: "Command not found" when running cron job

**Cause:** Different PATH in cron environment

**Solution:**
```bash
# Cron has minimal PATH
# Test what your job will see:
* * * * * env > /tmp/cron-env.txt
# Compare with: env > /tmp/shell-env.txt

# Fix: Use absolute paths in cron:
0 9 * * * /usr/local/bin/python3 /home/user/script.py

# Or set PATH in crontab:
PATH=/usr/local/bin:/usr/bin:/bin
0 9 * * * python3 /home/user/script.py

# This is shell/scripting, not cron-explain issue
```

## Real-World Workflows

### Workflow 1: Production Deployment Checklist

Deploy cron jobs safely to production:

```bash
#!/bin/bash
# scripts/deploy-cron.sh - Safe cron deployment workflow

CRON_FILE="config/production.crontab"
STAGING_CRONTAB="config/staging.crontab"

echo "🔍 Step 1: Validate all cron expressions"
while IFS= read -r line; do
  # Skip comments and empty lines
  [[ "$line" =~ ^#.*$ ]] || [[ -z "$line" ]] && continue
  
  # Extract cron expression (first 5 fields)
  cron_expr=$(echo "$line" | awk '{print $1,$2,$3,$4,$5}')
  
  if ! cron-explain "$cron_expr" --validate 2>/dev/null; then
    echo "❌ Invalid cron: $line"
    exit 1
  fi
  
  echo "✅ Valid: $cron_expr → $(cron-explain "$cron_expr")"
done < "$CRON_FILE"

echo ""
echo "📅 Step 2: Check for scheduling conflicts"
# Extract all cron expressions and check overlap
cron-explain "$cron_expr" --next 100 --format json | \
  jq -r '.nextRuns[].timestamp' > /tmp/schedule.txt

# Detect jobs running at same time
duplicates=$(sort /tmp/schedule.txt | uniq -d | wc -l)
if [ "$duplicates" -gt 10 ]; then
  echo "⚠️  Warning: $duplicates time slots have multiple jobs"
  echo "   Consider spreading them out for better load distribution"
fi

echo ""
echo "🌍 Step 3: Preview in production timezone"
while IFS= read -r line; do
  [[ "$line" =~ ^#.*$ ]] || [[ -z "$line" ]] && continue
  cron_expr=$(echo "$line" | awk '{print $1,$2,$3,$4,$5}')
  command=$(echo "$line" | cut -d' ' -f6-)
  
  echo ""
  echo "Job: $command"
  cron-explain "$cron_expr" --timezone "UTC" --next 3
done < "$CRON_FILE"

echo ""
echo "🚀 Step 4: Deploy to staging first"
scp "$CRON_FILE" staging:/tmp/new.crontab
ssh staging "crontab /tmp/new.crontab && crontab -l"

echo ""
read -p "✋ Staging deployed. Check logs. Deploy to prod? (y/N) " -n 1 -r
if [[ $REPLY =~ ^[Yy]$ ]]; then
  scp "$CRON_FILE" production:/tmp/new.crontab
  ssh production "crontab /tmp/new.crontab"
  echo "✅ Production crontab updated!"
else
  echo "❌ Deployment cancelled"
  exit 1
fi
```

**Safety checklist:**
- ✅ Validate syntax
- ✅ Check for conflicts
- ✅ Verify timezone
- ✅ Test in staging
- ✅ Monitor first run

### Workflow 2: Monitoring & Alerting Integration

Ensure cron jobs run on schedule:

```bash
#!/bin/bash
# scripts/cron-monitor.sh - Monitor cron execution

CRON_SCHEDULE="0 2 * * *"  # Your backup job
ALERT_EMAIL="ops@example.com"
ALERT_SLACK="https://hooks.slack.com/services/YOUR/WEBHOOK"

# 1. Calculate when job should have run
EXPECTED_RUN=$(cron-explain "$CRON_SCHEDULE" --next 1 --format json | \
  jq -r '.nextRuns[0].timestamp')

# 2. Check if it actually ran (look for log entry)
LAST_RUN=$(grep "backup completed" /var/log/backup.log | tail -1 | cut -d' ' -f1-3)
LAST_RUN_TS=$(date -d "$LAST_RUN" +%s)
EXPECTED_TS=$(date -d "$EXPECTED_RUN" +%s)

# 3. Alert if missed
TIME_DIFF=$(($(date +%s) - EXPECTED_TS))
if [ $TIME_DIFF -gt 3600 ] && [ $LAST_RUN_TS -lt $EXPECTED_TS ]; then
  # Job didn't run!
  MESSAGE="🚨 Cron job missed: Expected at $EXPECTED_RUN, last run was $LAST_RUN"
  
  # Email alert
  echo "$MESSAGE" | mail -s "Cron Failure Alert" "$ALERT_EMAIL"
  
  # Slack alert
  curl -X POST "$ALERT_SLACK" \
    -H 'Content-Type: application/json' \
    -d "{\"text\":\"$MESSAGE\"}"
fi

# 4. Log next run time for visibility
NEXT_RUN=$(cron-explain "$CRON_SCHEDULE" --next 1)
echo "$(date): Next scheduled run: $NEXT_RUN" >> /var/log/cron-monitor.log
```

**Run this monitor every hour:**
```cron
0 * * * * /scripts/cron-monitor.sh
```

### Workflow 3: Dynamic Cron Generation

Generate cron schedules programmatically:

```python
#!/usr/bin/env python3
# scripts/generate-maintenance-windows.py
"""
Generate staggered maintenance windows for multi-region deployments
"""

import subprocess
import json
from datetime import datetime, timedelta

# Regions and their preferred maintenance windows (local time)
REGIONS = {
    "us-east": {"hour": 2, "timezone": "America/New_York"},
    "eu-west": {"hour": 3, "timezone": "Europe/London"},
    "ap-south": {"hour": 4, "timezone": "Asia/Tokyo"},
}

def generate_cron(region, config):
    """Generate cron expression for region's maintenance window"""
    # Convert local time to UTC
    hour = config["hour"]
    timezone = config["timezone"]
    
    # Generate cron expression
    cron_expr = f"0 {hour} * * 0"  # Every Sunday at specified hour
    
    # Use cron-explain to verify and show in UTC
    result = subprocess.run(
        ["cron-explain", cron_expr, "--timezone", timezone, "--format", "json"],
        capture_output=True,
        text=True
    )
    
    schedule = json.loads(result.stdout)
    
    return {
        "region": region,
        "local_time": f"{hour}:00 {timezone}",
        "cron": cron_expr,
        "description": schedule["description"],
        "next_run": schedule["nextRuns"][0]["formatted"]
    }

# Generate schedules
print("# Maintenance Window Cron Schedule")
print("# Generated:", datetime.now().isoformat())
print()

for region, config in REGIONS.items():
    schedule = generate_cron(region, config)
    print(f"# {region.upper()}: {schedule['description']}")
    print(f"# Local time: {schedule['local_time']}")
    print(f"# Next run: {schedule['next_run']}")
    print(f"{schedule['cron']} /scripts/maintenance.sh {region}")
    print()
```

**Output:**
```cron
# Maintenance Window Cron Schedule
# Generated: 2025-02-08T10:30:00

# US-EAST: Every Sunday at 2:00 AM
# Local time: 2:00 America/New_York
# Next run: Sunday, Feb 09, 2025 at 7:00 AM UTC
0 2 * * 0 /scripts/maintenance.sh us-east

# EU-WEST: Every Sunday at 3:00 AM
# Local time: 3:00 Europe/London
# Next run: Sunday, Feb 09, 2025 at 3:00 AM UTC
0 3 * * 0 /scripts/maintenance.sh eu-west

# AP-SOUTH: Every Sunday at 4:00 AM
# Local time: 4:00 Asia/Tokyo
# Next run: Sunday, Feb 09, 2025 at 7:00 PM UTC (Sat)
0 4 * * 0 /scripts/maintenance.sh ap-south
```

### Workflow 4: Cron Documentation Auto-Generation

Keep your cron jobs documented:

```bash
#!/bin/bash
# scripts/document-crons.sh - Auto-generate cron documentation

OUTPUT="docs/CRON_JOBS.md"

cat > "$OUTPUT" << 'EOF'
# Cron Jobs Documentation

Auto-generated from production crontab.
Last updated: $(date)

---

EOF

crontab -l | while IFS= read -r line; do
  # Handle comments
  if [[ "$line" =~ ^#.*$ ]]; then
    echo "$line" >> "$OUTPUT"
    continue
  fi
  
  # Skip empty lines
  [[ -z "$line" ]] && continue
  
  # Parse cron expression and command
  cron_expr=$(echo "$line" | awk '{print $1,$2,$3,$4,$5}')
  command=$(echo "$line" | cut -d' ' -f6-)
  
  # Get human-readable explanation
  explanation=$(cron-explain "$cron_expr")
  
  # Get next 3 run times
  next_runs=$(cron-explain "$cron_expr" --next 3 --format json | \
    jq -r '.nextRuns[].formatted' | sed 's/^/  - /')
  
  # Append to documentation
  cat >> "$OUTPUT" << EODOC

## $(basename "$command")

**Schedule:** \`$cron_expr\`

**Description:** $explanation

**Command:** \`$command\`

**Next 3 runs:**
$next_runs

---

EODOC
done

echo "✅ Documentation generated: $OUTPUT"

# Commit to git
git add "$OUTPUT"
git commit -m "docs: Update cron jobs documentation [auto-generated]"
```

**Run this weekly:**
```cron
0 9 * * 1 /scripts/document-crons.sh
```

## Advanced Tips & Tricks

### Tip 1: Testing Cron Schedules Before Deployment

Dry-run your cron schedules:

```bash
#!/bin/bash
# Test cron schedule without waiting

CRON_SCHEDULE="*/5 * * * *"  # Every 5 minutes
COMMAND="/path/to/script.sh"

echo "Testing cron: $CRON_SCHEDULE"
cron-explain "$CRON_SCHEDULE" --next 5

# Simulate next 5 runs instantly
for i in {1..5}; do
  echo ""
  echo "=== Simulated run #$i at $(date) ==="
  $COMMAND
  echo "Exit code: $?"
  sleep 1  # Instead of waiting full interval
done
```

### Tip 2: Cron to systemd Timer Conversion

Migrate from cron to systemd timers:

```bash
#!/bin/bash
# Convert cron expression to systemd timer

CRON_EXPR="0 3 * * *"
SERVICE_NAME="backup"

# Get explanation
DESCRIPTION=$(cron-explain "$CRON_EXPR")

# Generate systemd timer unit
cat > "/etc/systemd/system/${SERVICE_NAME}.timer" << EOF
[Unit]
Description=$DESCRIPTION
Requires=${SERVICE_NAME}.service

[Timer]
# Original cron: $CRON_EXPR
OnCalendar=daily
# More precise: OnCalendar=*-*-* 03:00:00
Persistent=true

[Install]
WantedBy=timers.target
EOF

echo "✅ Created ${SERVICE_NAME}.timer"
echo "💡 Enable with: systemctl enable --now ${SERVICE_NAME}.timer"
echo "📅 Check schedule: systemctl list-timers"
```

### Tip 3: Overlap Detection

Prevent long-running jobs from overlapping:

```bash
#!/bin/bash
# Prevent concurrent runs of the same cron job

LOCKFILE="/var/lock/backup.lock"
CRON_SCHEDULE="0 */6 * * *"  # Every 6 hours

# Check if previous run is still going
if [ -f "$LOCKFILE" ]; then
  # How long has it been running?
  LOCK_AGE=$(($(date +%s) - $(stat -f %m "$LOCKFILE")))
  
  # Get expected interval from cron
  INTERVAL=$(cron-explain "$CRON_SCHEDULE" --next 2 --format json | \
    jq -r '(.nextRuns[1].timestamp | fromdateiso8601) - (.nextRuns[0].timestamp | fromdateiso8601)')
  
  if [ $LOCK_AGE -gt $INTERVAL ]; then
    echo "⚠️  Previous run exceeded interval ($LOCK_AGE > $INTERVAL seconds)"
    echo "🚨 Possible stuck process! Check logs."
    # Send alert
  else
    echo "ℹ️  Previous run still in progress (${LOCK_AGE}s). Skipping."
  fi
  exit 0
fi

# Acquire lock
touch "$LOCKFILE"
trap "rm -f $LOCKFILE" EXIT

# Run your job
/path/to/backup.sh
```

### Tip 4: Holiday and Business Day Handling

Skip jobs on holidays:

```bash
#!/bin/bash
# scripts/business-days-only.sh

CRON_SCHEDULE="0 9 * * 1-5"  # Weekdays at 9 AM
HOLIDAYS_FILE="/etc/holidays.txt"  # List of YYYY-MM-DD dates

# Check if today is a holiday
TODAY=$(date +%Y-%m-%d)
if grep -q "^$TODAY$" "$HOLIDAYS_FILE"; then
  echo "🎉 Today is a holiday ($TODAY). Skipping job."
  exit 0
fi

# Check next run isn't on a holiday
NEXT_RUN=$(cron-explain "$CRON_SCHEDULE" --next 1 --format json | \
  jq -r '.nextRuns[0].timestamp' | cut -d'T' -f1)

if grep -q "^$NEXT_RUN$" "$HOLIDAYS_FILE"; then
  echo "📅 Next run ($NEXT_RUN) is a holiday. Consider rescheduling."
fi

# Run job
/path/to/script.sh
```

### Tip 5: Intelligent Retry Mechanism

Retry failed cron jobs with exponential backoff:

```bash
#!/bin/bash
# Cron job wrapper with retry logic

CRON_SCHEDULE="0 2 * * *"
MAX_RETRIES=3
RETRY_DELAY=300  # 5 minutes

function run_with_retry() {
  local attempt=1
  
  while [ $attempt -le $MAX_RETRIES ]; do
    echo "Attempt $attempt/$MAX_RETRIES at $(date)"
    
    if /path/to/job.sh; then
      echo "✅ Success on attempt $attempt"
      return 0
    fi
    
    if [ $attempt -lt $MAX_RETRIES ]; then
      delay=$((RETRY_DELAY * attempt))
      echo "⚠️  Failed. Retrying in ${delay}s..."
      sleep $delay
    fi
    
    ((attempt++))
  done
  
  echo "❌ Failed after $MAX_RETRIES attempts"
  
  # Alert ops team
  NEXT_RUN=$(cron-explain "$CRON_SCHEDULE" --next 1)
  echo "Next scheduled run: $NEXT_RUN" | \
    mail -s "Cron Job Failed: $(basename $0)" ops@example.com
  
  return 1
}

run_with_retry
```

### Tip 6: Cron Visualization Dashboard

Generate a visual schedule:

```bash
#!/bin/bash
# scripts/cron-dashboard.sh - Generate HTML visualization

OUTPUT="dashboard/cron-schedule.html"
mkdir -p dashboard

cat > "$OUTPUT" << 'EOHTML'
<!DOCTYPE html>
<html>
<head>
  <title>Cron Schedule Dashboard</title>
  <style>
    body { font-family: monospace; padding: 20px; }
    .job { margin: 20px 0; padding: 15px; background: #f5f5f5; border-left: 4px solid #4CAF50; }
    .next-runs { margin-left: 20px; }
    .timeline { margin: 20px 0; }
  </style>
</head>
<body>
  <h1>🕐 Cron Schedule Dashboard</h1>
  <p>Generated: $(date)</p>
EOHTML

crontab -l | while IFS= read -r line; do
  [[ "$line" =~ ^#.*$ ]] || [[ -z "$line" ]] && continue
  
  cron_expr=$(echo "$line" | awk '{print $1,$2,$3,$4,$5}')
  command=$(echo "$line" | cut -d' ' -f6-)
  description=$(cron-explain "$cron_expr")
  next_runs=$(cron-explain "$cron_expr" --next 5 --format json | \
    jq -r '.nextRuns[] | "    <li>\(.formatted) <em>(\(.fromNow))</em></li>"')
  
  cat >> "$OUTPUT" << EOJOB
  <div class="job">
    <h3>$(basename "$command")</h3>
    <p><strong>Schedule:</strong> <code>$cron_expr</code></p>
    <p><strong>Description:</strong> $description</p>
    <p><strong>Next 5 runs:</strong></p>
    <ul class="next-runs">
$next_runs
    </ul>
  </div>
EOJOB
done

cat >> "$OUTPUT" << 'EOFHTML'
</body>
</html>
EOFHTML

echo "✅ Dashboard generated: $OUTPUT"
open "$OUTPUT"  # macOS; use xdg-open on Linux
```

### Tip 7: Audit Trail for Cron Changes

Track who changed what in crontab:

```bash
#!/bin/bash
# /usr/local/bin/crontab-wrapper
# Wrap crontab command to log changes

AUDIT_LOG="/var/log/crontab-changes.log"
ORIGINAL_CRONTAB="/tmp/crontab.before.$$"
NEW_CRONTAB="/tmp/crontab.after.$$"

# Backup current crontab
crontab -l > "$ORIGINAL_CRONTAB" 2>/dev/null || touch "$ORIGINAL_CRONTAB"

# Run original crontab command
/usr/bin/crontab "$@"
EXIT_CODE=$?

# Capture new crontab
crontab -l > "$NEW_CRONTAB" 2>/dev/null || touch "$NEW_CRONTAB"

# Log changes
if ! diff -q "$ORIGINAL_CRONTAB" "$NEW_CRONTAB" > /dev/null 2>&1; then
  cat >> "$AUDIT_LOG" << EOLOG
================================================================================
Date: $(date)
User: $(whoami)
Host: $(hostname)
Command: crontab $@

Changes:
$(diff -u "$ORIGINAL_CRONTAB" "$NEW_CRONTAB")

New schedule breakdown:
EOLOG

  # Explain all new cron expressions
  grep -v '^#' "$NEW_CRONTAB" | while read line; do
    [[ -z "$line" ]] && continue
    cron_expr=$(echo "$line" | awk '{print $1,$2,$3,$4,$5}')
    echo "  $cron_expr → $(cron-explain "$cron_expr")" >> "$AUDIT_LOG"
  done
  
  echo "" >> "$AUDIT_LOG"
fi

# Cleanup
rm -f "$ORIGINAL_CRONTAB" "$NEW_CRONTAB"

exit $EXIT_CODE
```

**Install:**
```bash
sudo mv /usr/bin/crontab /usr/bin/crontab.real
sudo ln -s /usr/local/bin/crontab-wrapper /usr/bin/crontab
```

## Performance Tips

### Tip 1: Understand Step Values Performance

```bash
# Efficient: Runs at predictable times
*/15 * * * *   # Every 15 minutes (:00, :15, :30, :45)

# Inefficient: Non-divisible step
*/13 * * * *   # Only at :00 (wastes cron checks)

# Check actual execution times:
cron-explain "*/13 * * * *" --next 10
```

### Tip 2: Batch Jobs Instead of High Frequency

```bash
# Instead of every minute (1440 runs/day):
* * * * * /path/to/check.sh

# Consider every 5 minutes (288 runs/day):
*/5 * * * * /path/to/check.sh

# Or queue-based approach (run when needed):
# Use inotify, message queue, or webhook instead
```

### Tip 3: Spread Load Across Time

```bash
# Don't schedule everything at midnight:
0 0 * * * backup1.sh
0 0 * * * backup2.sh
0 0 * * * backup3.sh

# Spread them out:
0 0 * * * backup1.sh
30 0 * * * backup2.sh
0 1 * * * backup3.sh

# Visualize with:
cron-explain "0 0 * * *" --next 5
cron-explain "30 0 * * *" --next 5
cron-explain "0 1 * * *" --next 5
```

### Tip 8: Resource-Aware Scheduling

Schedule resource-intensive jobs during off-peak hours:

```bash
#!/bin/bash
# Auto-schedule based on system load

CRON_SCHEDULE="0 */2 * * *"  # Try every 2 hours
LOAD_THRESHOLD=2.0

# Check current load
CURRENT_LOAD=$(uptime | awk -F'load average:' '{print $2}' | awk '{print $1}' | tr -d ',')

if (( $(echo "$CURRENT_LOAD > $LOAD_THRESHOLD" | bc -l) )); then
  echo "⏸️  System load too high ($CURRENT_LOAD > $LOAD_THRESHOLD). Deferring."
  
  # Calculate next low-load window (historically 3-5 AM)
  DEFER_TO="0 3 * * *"
  NEXT_WINDOW=$(cron-explain "$DEFER_TO" --next 1)
  echo "📅 Will retry at $NEXT_WINDOW"
  
  exit 0
fi

# Proceed with job
/path/to/heavy-job.sh
```

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history.

## Roadmap

- [ ] Support for extended cron syntax (seconds field)
- [ ] More natural language patterns
- [ ] Visual calendar view of schedule
- [ ] Conflict detection (overlapping jobs)
- [ ] Integration with crontab editing
- [ ] Web UI for visual builder
- [ ] Export to systemd timers
- [ ] Support for Quartz cron syntax
- [ ] Mobile app for quick cron checks

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](../../CONTRIBUTING.md) for guidelines.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/muin-company/cli-tools.git
cd cli-tools/packages/cron-explain

# Install dependencies
npm install

# Build
npm run build

# Test
npm test

# Run locally
node dist/cli.js "0 9 * * 1-5"
```

## FAQ

**Q: Does this modify my crontab?**  
A: No! It only reads and explains. Use `--save` flag if you want to add to crontab (coming soon).

**Q: Can it explain non-standard cron formats?**  
A: Currently supports standard 5-field cron. Support for 6-field (seconds) coming soon.

**Q: What about Windows Task Scheduler?**  
A: Not supported. This is specifically for Unix/Linux cron syntax.

**Q: Can I use this in scripts?**  
A: Yes! Use `--format json` for machine-readable output.

**Q: Does it support all cron implementations?**  
A: Supports standard cron syntax (vixie-cron, ISC cron, etc.). Some advanced features may vary.

**Q: Can it generate code to calculate cron times?**  
A: Not yet, but you can use `--format json` and parse the `nextRuns` array.

**Q: Is there an API or library version?**  
A: Not yet, but it's planned. Follow [@muin_company](https://twitter.com/muin_company) for updates.

## License

MIT © [MUIN](https://muin.company)

## Related Projects

- [@muin/curl-to-code](../curl-to-code) - Convert curl commands to code
- [@muin/json-to-types](../json-to-types) - Convert JSON to TypeScript/Zod/Python types
- [cron-parser](https://github.com/harrisiirak/cron-parser) - Low-level cron parsing library
- [More MUIN tools](https://muin.company/tools)

## Support

- 🐛 [Report a bug](https://github.com/muin-company/cli-tools/issues/new?template=bug_report.md)
- 💡 [Request a feature](https://github.com/muin-company/cli-tools/issues/new?template=feature_request.md)
- 💬 [Join our Discord](https://discord.gg/muin)
- 🐦 [Follow us on Twitter](https://twitter.com/muin_company)

## Acknowledgments

- Inspired by [crontab.guru](https://crontab.guru/) - Great web tool for cron
- Built with [cron-parser](https://github.com/harrisiirak/cron-parser)
- Uses [chalk](https://github.com/chalk/chalk) for colored output
- Timezone support via [moment-timezone](https://momentjs.com/timezone/)

---

**Made with ❤️ by [MUIN](https://muin.company)** - Building AI-powered developer tools

[⬆ Back to top](#muincron-explain)
