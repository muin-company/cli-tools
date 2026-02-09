#!/usr/bin/env node

/**
 * depcheck-lite CLI
 */

import * as path from 'path';
import { analyzeDependencies } from './analyzer';
import { printTable, printJson, printList, printSummary } from './formatter';
import { ScanOptions } from './types';

interface CliOptions extends ScanOptions {
  format?: 'table' | 'json' | 'list' | 'summary';
  json?: boolean;
  quiet?: boolean;
}

function printHelp(): void {
  console.log(`
depcheck-lite - Lightweight dependency checker

Usage:
  depcheck-lite [options] [directory]

Options:
  -h, --help              Show this help message
  -v, --verbose           Show detailed scanning information
  -q, --quiet             Only show errors
  -j, --json              Output results as JSON
  --format <type>         Output format: table, list, summary, json (default: table)
  --ignore <packages>     Comma-separated list of packages to ignore
  --ignore-dirs <dirs>    Directories to skip (comma-separated)
  --skip-dev              Don't check devDependencies
  
Examples:
  depcheck-lite                           # Check current directory
  depcheck-lite ./my-project              # Check specific directory
  depcheck-lite --json                    # Output as JSON
  depcheck-lite --ignore "webpack,babel"  # Ignore specific packages
  depcheck-lite --verbose                 # Show detailed output

For more information, visit:
  https://github.com/muin-company/cli-tools/tree/main/packages/depcheck-lite
`);
}

function parseArgs(): CliOptions {
  const args = process.argv.slice(2);
  const options: CliOptions = {
    dir: process.cwd(),
    includeDev: true,
    verbose: false,
    quiet: false,
    format: 'table',
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    switch (arg) {
      case '-h':
      case '--help':
        printHelp();
        process.exit(0);
        break;

      case '-v':
      case '--verbose':
        options.verbose = true;
        break;

      case '-q':
      case '--quiet':
        options.quiet = true;
        break;

      case '-j':
      case '--json':
        options.json = true;
        options.format = 'json';
        break;

      case '--format':
        i++;
        if (i < args.length) {
          const format = args[i];
          if (['table', 'json', 'list', 'summary'].includes(format)) {
            options.format = format as 'table' | 'json' | 'list' | 'summary';
          } else {
            console.error(`Invalid format: ${format}`);
            process.exit(1);
          }
        }
        break;

      case '--ignore':
        i++;
        if (i < args.length) {
          options.ignorePackages = args[i].split(',').map(s => s.trim());
        }
        break;

      case '--ignore-dirs':
        i++;
        if (i < args.length) {
          options.ignoreDirs = args[i].split(',').map(s => s.trim());
        }
        break;

      case '--skip-dev':
        options.includeDev = false;
        break;

      case '-d':
      case '--dir':
        i++;
        if (i < args.length) {
          options.dir = path.resolve(args[i]);
        }
        break;

      default:
        // Treat as directory if no flag
        if (!arg.startsWith('-')) {
          options.dir = path.resolve(arg);
        } else {
          console.error(`Unknown option: ${arg}`);
          console.log('Use --help for usage information');
          process.exit(1);
        }
    }
  }

  return options;
}

async function main(): Promise<void> {
  try {
    const options = parseArgs();

    if (!options.quiet && options.format !== 'json') {
      console.log('Scanning project...');
    }

    // Analyze dependencies
    const result = analyzeDependencies(options);

    // Print results based on format
    if (options.quiet) {
      // Only print if there are issues
      if (result.unused.length > 0) {
        console.log(`${result.unused.length} unused dependencies found`);
        process.exit(1);
      }
    } else {
      // Get project name from package.json
      const fs = require('fs');
      const pkgPath = path.join(options.dir, 'package.json');
      let projectName: string | undefined;
      try {
        const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
        projectName = pkg.name;
      } catch {
        // Ignore
      }

      switch (options.format) {
        case 'json':
          printJson(result);
          break;
        case 'list':
          printList(result);
          break;
        case 'summary':
          printSummary(result);
          break;
        case 'table':
        default:
          printTable(result, projectName);
          break;
      }
    }

    // Exit with error code if unused dependencies found
    if (result.unused.length > 0) {
      process.exit(1);
    }

  } catch (error) {
    console.error('Error:', error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

// Run CLI
main();
