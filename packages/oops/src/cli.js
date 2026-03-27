#!/usr/bin/env node

import meow from 'meow';
import { explainError } from './index.js';

const cli = meow(`
  Usage
    $ oops <error-message>
    $ oops --file <path>

  Options
    --file, -f     Read error from a file
    --stack, -s    Analyze a full stack trace
    --json, -j     Output as JSON
    --lang, -l     Language for explanation (default: en)
    --model, -m    AI model to use (default: gpt-4o-mini)
    --verbose, -v  Show detailed analysis

  Examples
    $ oops "Cannot read property 'x' of undefined"
    $ oops --file error.log
    $ oops --stack "Error: ECONNREFUSED..."
    $ oops "error" --json
    $ oops "エラー" --lang ja
`, {
  importMeta: import.meta,
  flags: {
    file: { type: 'string', shortFlag: 'f' },
    stack: { type: 'string', shortFlag: 's' },
    json: { type: 'boolean', shortFlag: 'j', default: false },
    lang: { type: 'string', shortFlag: 'l', default: 'en' },
    model: { type: 'string', shortFlag: 'm', default: 'gpt-4o-mini' },
    verbose: { type: 'boolean', shortFlag: 'v', default: false },
  },
});

async function main() {
  let errorMessage = cli.input.join(' ');

  if (cli.flags.file) {
    const { readFileSync } = await import('node:fs');
    errorMessage = readFileSync(cli.flags.file, 'utf-8').trim();
  } else if (cli.flags.stack) {
    errorMessage = cli.flags.stack;
  }

  if (!errorMessage) {
    cli.showHelp();
    return;
  }

  await explainError(errorMessage, cli.flags);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
