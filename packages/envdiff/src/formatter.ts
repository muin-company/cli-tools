/**
 * Formatter for comparison results
 */

import chalk from 'chalk';
import { ComparisonResult, DiffType, CompareOptions } from './types';
import { maskValue } from './parser';
import * as path from 'path';

/**
 * Format comparison result as a colored table
 */
export function formatComparison(
  result: ComparisonResult,
  options: CompareOptions = {}
): string {
  const lines: string[] = [];
  const leftName = path.basename(result.left.path);
  const rightName = path.basename(result.right.path);

  // Header
  lines.push('');
  lines.push(chalk.bold.cyan('🔍 Environment Diff:'), chalk.cyan(`${leftName} → ${rightName}`));
  lines.push('');

  // Summary box
  lines.push(chalk.gray('╭─────────────────────────────────────────────────────────────╮'));
  lines.push(chalk.gray('│') + chalk.bold('  Summary') + ' '.repeat(52) + chalk.gray('│'));
  lines.push(chalk.gray('├─────────────────────────────────────────────────────────────┤'));
  
  const { summary } = result;
  lines.push(
    chalk.gray('│') +
    '  Total variables:        ' +
    chalk.white(`${summary.total}`) +
    ' '.repeat(34 - String(summary.total).length) +
    chalk.gray('│')
  );

  if (summary.modified > 0) {
    lines.push(
      chalk.gray('│') +
      '  Modified:               ' +
      chalk.yellow(`${summary.modified}`) +
      ' '.repeat(34 - String(summary.modified).length) +
      chalk.gray('│')
    );
  }

  if (summary.added > 0) {
    lines.push(
      chalk.gray('│') +
      '  Added:                  ' +
      chalk.green(`${summary.added}`) +
      ' '.repeat(34 - String(summary.added).length) +
      chalk.gray('│')
    );
  }

  if (summary.removed > 0) {
    lines.push(
      chalk.gray('│') +
      '  Removed:                ' +
      chalk.red(`${summary.removed}`) +
      ' '.repeat(34 - String(summary.removed).length) +
      chalk.gray('│')
    );
  }

  if (summary.unchanged > 0) {
    lines.push(
      chalk.gray('│') +
      '  Unchanged:              ' +
      chalk.gray(`${summary.unchanged}`) +
      ' '.repeat(34 - String(summary.unchanged).length) +
      chalk.gray('│')
    );
  }

  lines.push(chalk.gray('╰─────────────────────────────────────────────────────────────╯'));
  lines.push('');

  // Show differences only if there are changes
  const changesOnly = result.differences.filter(
    d => d.type !== DiffType.UNCHANGED
  );

  if (changesOnly.length === 0) {
    lines.push(chalk.green('✅ No differences found - files are identical!'));
    lines.push('');
    return lines.join('\n');
  }

  // Differences table
  lines.push(chalk.gray('╭─────────────────────────────────────────────────────────────╮'));
  lines.push(chalk.gray('│') + chalk.bold('  Differences') + ' '.repeat(48) + chalk.gray('│'));
  lines.push(chalk.gray('├─────────────────────────────────────────────────────────────┤'));
  
  changesOnly.forEach((diff, index) => {
    const shouldMask = options.maskSecrets !== false;
    
    // Variable name with status
    let status = '';
    let keyColor = chalk.white;
    
    switch (diff.type) {
      case DiffType.ADDED:
        status = chalk.green('[ADDED]');
        keyColor = chalk.green;
        break;
      case DiffType.REMOVED:
        status = chalk.red('[REMOVED]');
        keyColor = chalk.red;
        break;
      case DiffType.MODIFIED:
        status = chalk.yellow('[MODIFIED]');
        keyColor = chalk.yellow;
        break;
    }

    lines.push(chalk.gray('│') + ' '.repeat(61) + chalk.gray('│'));
    lines.push(
      chalk.gray('│') +
      '  ' +
      keyColor.bold(diff.key) +
      '  ' +
      status +
      ' '.repeat(Math.max(0, 58 - diff.key.length - status.length)) +
      chalk.gray('│')
    );

    // Values
    if (diff.type === DiffType.REMOVED) {
      const leftDisplay = options.showValues
        ? maskValue(diff.leftValue || '', diff.key, shouldMask)
        : '[REMOVED]';
      lines.push(
        chalk.gray('│') +
        '  ' +
        chalk.red(`- ${leftDisplay}`) +
        ' '.repeat(Math.max(0, 59 - leftDisplay.length)) +
        chalk.gray('│')
      );
    } else if (diff.type === DiffType.ADDED) {
      const rightDisplay = options.showValues
        ? maskValue(diff.rightValue || '', diff.key, shouldMask)
        : '[ADDED]';
      lines.push(
        chalk.gray('│') +
        '  ' +
        chalk.green(`+ ${rightDisplay}`) +
        ' '.repeat(Math.max(0, 59 - rightDisplay.length)) +
        chalk.gray('│')
      );
    } else if (diff.type === DiffType.MODIFIED) {
      const leftDisplay = maskValue(diff.leftValue || '', diff.key, shouldMask);
      const rightDisplay = maskValue(diff.rightValue || '', diff.key, shouldMask);
      
      lines.push(
        chalk.gray('│') +
        '  ' +
        chalk.red(`- ${leftDisplay}`) +
        ' '.repeat(Math.max(0, 59 - leftDisplay.length)) +
        chalk.gray('│')
      );
      lines.push(
        chalk.gray('│') +
        '  ' +
        chalk.green(`+ ${rightDisplay}`) +
        ' '.repeat(Math.max(0, 59 - rightDisplay.length)) +
        chalk.gray('│')
      );
    }
  });

  lines.push(chalk.gray('╰─────────────────────────────────────────────────────────────╯'));
  lines.push('');

  // Footer hints
  if (summary.removed > 0 || summary.added > 0) {
    lines.push(chalk.yellow('⚠️  ') + ` ${summary.removed} variable(s) removed, ${summary.added} variable(s) added`);
  }
  
  if (!options.showValues) {
    lines.push(chalk.gray('ℹ️  Use --show-values to see full values'));
  }
  
  if (options.maskSecrets !== false) {
    lines.push(chalk.gray('ℹ️  Secrets are automatically masked (use --no-mask to disable)'));
  }

  lines.push('');
  return lines.join('\n');
}

/**
 * Format as JSON
 */
export function formatAsJson(result: ComparisonResult): string {
  return JSON.stringify(
    {
      left: result.left.path,
      right: result.right.path,
      summary: result.summary,
      differences: result.differences.map(d => ({
        key: d.key,
        type: d.type,
        leftValue: d.leftValue,
        rightValue: d.rightValue,
      })),
    },
    null,
    2
  );
}
