#!/usr/bin/env node

/**
 * envdiff CLI - Compare environment files
 */

import { Command } from 'commander';
import chalk from 'chalk';
import { parseEnvFile } from './parser';
import { compareEnvFiles } from './comparator';
import { formatComparison, formatAsJson } from './formatter';
import { CompareOptions } from './types';

const program = new Command();

program
  .name('envdiff')
  .description('Compare environment files, detect missing variables, and ensure configuration consistency')
  .version('1.0.0');

// Main compare command
program
  .argument('<file1>', 'First .env file')
  .argument('<file2>', 'Second .env file')
  .option('-s, --show-values', 'Show actual values (default: masked)', false)
  .option('-k, --keys-only', 'Compare only keys (ignore values)', false)
  .option('--no-mask', 'Disable secret masking', false)
  .option('-f, --format <type>', 'Output format: table, json', 'table')
  .option('-q, --quiet', 'Suppress non-error output', false)
  .action((file1: string, file2: string, options) => {
    try {
      if (!options.quiet) {
        console.log(chalk.dim('Parsing environment files...'));
      }

      // Parse files
      const leftEnv = parseEnvFile(file1);
      const rightEnv = parseEnvFile(file2);

      if (!options.quiet) {
        console.log(chalk.dim(`  ✓ ${file1}: ${leftEnv.variables.size} variables`));
        console.log(chalk.dim(`  ✓ ${file2}: ${rightEnv.variables.size} variables`));
      }

      // Compare
      const compareOptions: CompareOptions = {
        showValues: options.showValues,
        keysOnly: options.keysOnly,
        maskSecrets: options.mask,
      };

      const result = compareEnvFiles(leftEnv, rightEnv, compareOptions);

      // Format output
      if (options.format === 'json') {
        console.log(formatAsJson(result));
      } else {
        console.log(formatComparison(result, compareOptions));
      }

      // Exit with error code if there are differences
      const hasChanges = result.summary.added > 0 ||
                        result.summary.removed > 0 ||
                        result.summary.modified > 0;
      
      process.exit(hasChanges ? 1 : 0);
    } catch (error) {
      console.error(chalk.red('Error:'), error instanceof Error ? error.message : String(error));
      process.exit(1);
    }
  });

// Check command (for future implementation)
program
  .command('check <file>')
  .description('Check environment file for missing required variables')
  .option('-r, --require <file>', 'Required variables template file')
  .action((file: string, options) => {
    console.log(chalk.yellow('⚠️  `check` command not yet implemented'));
    console.log(chalk.dim('This feature is planned for a future release.'));
    process.exit(0);
  });

// Validate command placeholder
program
  .command('validate <file>')
  .description('Validate environment file format and values')
  .action((file: string) => {
    console.log(chalk.yellow('⚠️  `validate` command not yet implemented'));
    console.log(chalk.dim('This feature is planned for a future release.'));
    process.exit(0);
  });

// Secrets command placeholder
program
  .command('secrets <file>')
  .description('Detect secrets and sensitive data')
  .action((file: string) => {
    console.log(chalk.yellow('⚠️  `secrets` command not yet implemented'));
    console.log(chalk.dim('This feature is planned for a future release.'));
    process.exit(0);
  });

// Show help if no arguments
if (process.argv.length < 3) {
  program.help();
}

program.parse();
