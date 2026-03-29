#!/usr/bin/env node

import meow from 'meow';
import { roastFile, roastStdin } from './index.js';

const cli = meow(`
  Usage
    $ roast <file>            Roast a file
    $ cat file | roast        Roast from stdin
    $ roast --diff            Roast your staged git diff

  Options
    --level, -l    Roast intensity: mild | medium | brutal  [default: brutal]
    --model, -m    AI model to use                          [default: gpt-4o-mini]
    --lang         Override language detection
    --diff         Roast staged git changes
    --json         Output as JSON
    --no-color     Disable colored output

  Examples
    $ roast app.js
    $ roast --level mild utils.py
    $ git diff --staged | roast --diff
`, {
  importMeta: import.meta,
  flags: {
    level: { type: 'string', shortFlag: 'l', default: 'brutal' },
    model: { type: 'string', shortFlag: 'm', default: 'gpt-4o-mini' },
    lang: { type: 'string' },
    diff: { type: 'boolean', default: false },
    json: { type: 'boolean', default: false },
    color: { type: 'boolean', default: true },
  }
});

const [file] = cli.input;

if (!file && process.stdin.isTTY && !cli.flags.diff) {
  cli.showHelp();
}

try {
  if (file) {
    await roastFile(file, cli.flags);
  } else {
    await roastStdin(cli.flags);
  }
} catch (err) {
  console.error(err.message);
  process.exit(1);
}
