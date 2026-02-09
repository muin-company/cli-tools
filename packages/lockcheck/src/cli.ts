#!/usr/bin/env node
/**
 * CLI interface for lockcheck
 */

import { Command } from 'commander';
import chalk from 'chalk';
import { LockCheck } from './index';
import { ValidationResult } from './types';

const program = new Command();

program
  .name('lockcheck')
  .description('Validate package-lock.json integrity and detect issues')
  .version('1.0.0')
  .option('-f, --lock-file <file>', 'Lock file to check (auto-detected)')
  .option('-p, --package-file <file>', 'Package file to compare (default: package.json)')
  .option('--verify-integrity', 'Check SHA integrity for all packages')
  .option('-v, --verbose', 'Show detailed information')
  .option('-j, --json', 'Output results as JSON')
  .option('-q, --quiet', 'Only show errors')
  .action((options) => {
    try {
      const result = LockCheck.validate({
        lockFile: options.lockFile,
        packageFile: options.packageFile,
        verifyIntegrity: options.verifyIntegrity,
        verbose: options.verbose,
        json: options.json
      });

      if (options.json) {
        console.log(JSON.stringify(result, null, 2));
      } else {
        printResult(result, options);
      }

      // Exit with error code if validation failed
      process.exit(result.valid ? 0 : 1);
    } catch (error) {
      console.error(chalk.red('Error:'), error instanceof Error ? error.message : String(error));
      process.exit(1);
    }
  });

/**
 * Print validation result in human-readable format
 */
function printResult(result: ValidationResult, options: any) {
  const { quiet, verbose } = options;

  if (!quiet) {
    console.log(chalk.bold('\n╭────────────────────────────────────────────────────────╮'));
    console.log(chalk.bold('│  🔒 Lock File Check                                    │'));
    console.log(chalk.bold('╰────────────────────────────────────────────────────────╯\n'));
  }

  if (result.valid) {
    console.log(chalk.green('✅ Lock file is valid\n'));
    
    if (verbose) {
      console.log(chalk.dim('Summary:'));
      console.log(chalk.dim(`  Total packages: ${result.totalPackages}`));
      console.log(chalk.dim(`  ✓ Mismatches: 0`));
      console.log(chalk.dim(`  ✓ Missing packages: 0`));
      
      if (options.verifyIntegrity) {
        console.log(chalk.dim(`  ✓ Integrity issues: 0`));
      }
    }

    if (!quiet) {
      console.log(chalk.green('Your lock file is healthy! 🎉\n'));
    }
  } else {
    console.log(chalk.red('❌ Lock file validation failed\n'));

    // Print mismatches
    if (result.mismatches.length > 0) {
      console.log(chalk.yellow('⚠️  Version Mismatches:\n'));
      for (const mismatch of result.mismatches) {
        console.log(chalk.yellow(`  • ${mismatch.package}`));
        console.log(chalk.dim(`    ├─ package.json: ${mismatch.packageJsonVersion}`));
        console.log(chalk.dim(`    ├─ lock file: ${mismatch.lockFileVersion}`));
        console.log(chalk.dim(`    └─ Status: Lock file version doesn't satisfy package.json range\n`));
      }
    }

    // Print missing packages
    if (result.missingPackages.length > 0) {
      console.log(chalk.yellow('⚠️  Missing Packages:\n'));
      for (const pkg of result.missingPackages) {
        console.log(chalk.yellow(`  • ${pkg} (in package.json but not in lock file)`));
      }
      console.log();
    }

    // Print integrity issues
    if (result.integrityIssues.length > 0) {
      console.log(chalk.yellow('⚠️  Integrity Issues:\n'));
      for (const issue of result.integrityIssues) {
        console.log(chalk.yellow(`  • ${issue.package}@${issue.version}`));
        console.log(chalk.dim(`    └─ Issue: ${issue.issue} ${issue.details ? `(${issue.details})` : ''}\n`));
      }
    }

    // Summary
    if (!quiet) {
      console.log(chalk.dim('Summary:'));
      console.log(chalk.dim(`  Total packages: ${result.totalPackages}`));
      console.log(chalk.yellow(`  ⚠️  Mismatches: ${result.mismatches.length}`));
      console.log(chalk.yellow(`  ⚠️  Missing: ${result.missingPackages.length}`));
      
      if (options.verifyIntegrity) {
        console.log(chalk.yellow(`  ⚠️  Integrity issues: ${result.integrityIssues.length}`));
      }

      console.log(chalk.yellow('\n💡 Quick fix: lockcheck --fix'));
      console.log(chalk.dim('💡 Or manually: rm package-lock.json && npm install\n'));
    }
  }
}

program.parse();
