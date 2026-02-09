/**
 * Utility functions for formatting and display
 */

import chalk from 'chalk';
import { ValidationIssue, ValidationResult } from './types';

export class DisplayUtils {
  /**
   * Format validation results
   */
  static formatValidationResults(result: ValidationResult): string {
    const lines: string[] = [];

    // Header
    lines.push(chalk.cyan.bold('\n🔍 Validation Results\n'));

    // Summary
    const status = result.valid ? chalk.green('✅ Valid') : chalk.red('❌ Invalid');
    lines.push(`Status: ${status}`);
    lines.push(`Errors: ${result.errors.length}`);
    lines.push(`Warnings: ${result.warnings.length}`);
    lines.push(`Suggestions: ${result.suggestions.length}\n`);

    // Errors
    if (result.errors.length > 0) {
      lines.push(chalk.red.bold('Errors:'));
      result.errors.forEach(error => {
        lines.push(this.formatIssue(error));
      });
      lines.push('');
    }

    // Warnings
    if (result.warnings.length > 0) {
      lines.push(chalk.yellow.bold('Warnings:'));
      result.warnings.forEach(warning => {
        lines.push(this.formatIssue(warning));
      });
      lines.push('');
    }

    // Suggestions
    if (result.suggestions.length > 0) {
      lines.push(chalk.blue.bold('Suggestions:'));
      result.suggestions.forEach(suggestion => {
        lines.push(this.formatIssue(suggestion));
      });
      lines.push('');
    }

    return lines.join('\n');
  }

  /**
   * Format a single validation issue
   */
  private static formatIssue(issue: ValidationIssue): string {
    const lines: string[] = [];
    const icon = issue.type === 'error' ? '❌' : issue.type === 'warning' ? '⚠️' : '💡';
    
    lines.push(`  ${icon} ${issue.option ? chalk.bold(issue.option) + ': ' : ''}${issue.message}`);
    
    if (issue.recommendation) {
      lines.push(`     ${chalk.dim('→')} ${issue.recommendation}`);
    }
    
    if (issue.impact) {
      lines.push(`     ${chalk.dim('Impact:')} ${issue.impact}`);
    }
    
    if (issue.fix) {
      lines.push(`     ${chalk.dim('Fix:')} ${issue.fix}`);
    }

    return lines.join('\n');
  }

  /**
   * Format config as JSON
   */
  static formatConfig(config: any, indent = 2): string {
    return JSON.stringify(config, null, indent);
  }

  /**
   * Create a box around text
   */
  static box(title: string, content: string[]): string {
    const maxLength = Math.max(title.length, ...content.map(l => l.length));
    const width = Math.min(maxLength + 4, 80);

    const top = '╭' + '─'.repeat(width - 2) + '╮';
    const bottom = '╰' + '─'.repeat(width - 2) + '╯';
    const titleLine = '│ ' + chalk.bold(title) + ' '.repeat(width - title.length - 3) + '│';

    const lines = [top, titleLine];
    
    content.forEach(line => {
      const padding = ' '.repeat(Math.max(0, width - line.length - 3));
      lines.push(`│ ${line}${padding}│`);
    });

    lines.push(bottom);

    return lines.join('\n');
  }

  /**
   * Format strictness level with stars
   */
  static formatStrictness(level: number): string {
    const stars = '⭐'.repeat(level) + '☆'.repeat(5 - level);
    const labels = ['Minimal', 'Loose', 'Moderate', 'Strict', 'Ultra-Strict'];
    return `${stars} (${level}/5) - ${labels[level] || 'Unknown'}`;
  }

  /**
   * Create a progress bar
   */
  static progressBar(current: number, total: number, width = 20): string {
    const percentage = Math.round((current / total) * 100);
    const filled = Math.round((current / total) * width);
    const empty = width - filled;

    const bar = '█'.repeat(filled) + '░'.repeat(empty);
    return `[${bar}] ${percentage}%`;
  }

  /**
   * Format comparison diff
   */
  static formatDiff(key: string, value1: any, value2: any): string {
    const v1 = JSON.stringify(value1);
    const v2 = JSON.stringify(value2);

    if (v1 === v2) {
      return chalk.dim(`  ${key}: ${v1}`);
    }

    return `  ${chalk.bold(key)}:\n    ${chalk.red(`- ${v1}`)}\n    ${chalk.green(`+ ${v2}`)}`;
  }
}

export class FileUtils {
  /**
   * Check if file exists
   */
  static exists(filePath: string): boolean {
    const fs = require('fs');
    return fs.existsSync(filePath);
  }

  /**
   * Create backup of file
   */
  static backup(filePath: string): string {
    const fs = require('fs');
    const timestamp = new Date().toISOString().split('T')[0].replace(/-/g, '');
    const backupPath = `${filePath}.backup.${timestamp}`;
    
    if (fs.existsSync(filePath)) {
      fs.copyFileSync(filePath, backupPath);
    }
    
    return backupPath;
  }
}
