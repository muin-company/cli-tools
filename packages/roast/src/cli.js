#!/usr/bin/env node

import meow from 'meow';
import { roastFile, roastStdin } from './index.js';

const cli = meow(`
  Usage
    $ roast <file>            Roast a file
    $ cat file | roast        Roast from stdin
    $ roast --diff            Roast your staged git diff

  Options
    --level, -l       Roast intensity: mild | medium | brutal  [default: brutal]
    --model, -m       AI model to use                          [default: gpt-4o-mini]
    --lang            Override language detection
    --output-lang     Output language: en | ko | ja | es | fr | de  [default: en]
    --diff            Roast staged git changes
    --json            Output as JSON
    --no-color        Disable colored output

  Examples
    $ roast app.js
    $ roast --level mild utils.py
    $ roast app.js --output-lang ko
    $ git diff --staged | roast --diff --output-lang ja
`, {
  importMeta: import.meta,
  flags: {
    level: { type: 'string', shortFlag: 'l', default: 'brutal' },
    model: { type: 'string', shortFlag: 'm', default: 'gpt-4o-mini' },
    lang: { type: 'string' },
    outputLang: { type: 'string', default: 'en' },
    diff: { type: 'boolean', default: false },
    json: { type: 'boolean', default: false },
    color: { type: 'boolean', default: true },
  }
});

const [file] = cli.input;

// Validate output language
const validOutputLangs = ['en', 'ko', 'ja', 'es', 'fr', 'de'];
if (!validOutputLangs.includes(cli.flags.outputLang)) {
  console.error(`Invalid --output-lang: ${cli.flags.outputLang}`);
  console.error(`Valid options: ${validOutputLangs.join(', ')}`);
  process.exit(1);
}

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
