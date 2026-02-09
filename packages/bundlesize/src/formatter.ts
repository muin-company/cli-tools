/**
 * Output formatting for bundlesize
 */

import chalk from 'chalk';
import { BundleAnalysis, CheckResult, CompareResult } from './types';
import { formatBytes, formatPercent, formatChange } from './utils';

/**
 * Format analysis result for console output
 */
export function formatAnalysis(analysis: BundleAnalysis, detailed: boolean = false): string {
  const lines: string[] = [];
  
  lines.push(chalk.bold('\n📊 Bundle Analysis: ') + chalk.cyan(analysis.filePath));
  lines.push('');
  
  // File size section
  lines.push('╭─────────────────────────────────────────────────────────╮');
  lines.push('│  ' + chalk.bold('File Size Analysis') + '                                     │');
  lines.push('├─────────────────────────────────────────────────────────┤');
  lines.push(`│  Original:      ${formatBytes(analysis.originalSize).padEnd(42)}│`);
  
  if (analysis.gzipSize > 0) {
    const gzipPercent = (analysis.gzipSize / analysis.originalSize * 100).toFixed(1);
    lines.push(`│  Gzipped:       ${formatBytes(analysis.gzipSize).padEnd(8)} (${gzipPercent}%)${' '.repeat(25)}│`);
  }
  
  if (analysis.brotliSize > 0) {
    const brotliPercent = (analysis.brotliSize / analysis.originalSize * 100).toFixed(1);
    lines.push(`│  Brotli:        ${formatBytes(analysis.brotliSize).padEnd(8)} (${brotliPercent}%)${' '.repeat(25)}│`);
  }
  
  lines.push('╰─────────────────────────────────────────────────────────╯');
  
  // Composition section (if available)
  if (detailed && analysis.composition) {
    lines.push('');
    lines.push('╭─────────────────────────────────────────────────────────╮');
    lines.push('│  ' + chalk.bold('Bundle Composition') + '                                     │');
    lines.push('├─────────────────────────────────────────────────────────┤');
    lines.push(`│  Your code:           ${formatBytes(analysis.composition.yourCode).padEnd(8)} (${analysis.composition.yourCodePercent.toFixed(1)}%)${' '.repeat(17)}│`);
    lines.push(`│  node_modules:        ${formatBytes(analysis.composition.nodeModules).padEnd(8)} (${analysis.composition.nodeModulesPercent.toFixed(1)}%)${' '.repeat(17)}│`);
    
    // Top dependencies
    if (analysis.dependencies && analysis.dependencies.length > 0) {
      lines.push('│                                                         │');
      lines.push('│  ' + chalk.bold('Top Dependencies:') + '                                      │');
      for (const dep of analysis.dependencies) {
        lines.push(`│  • ${dep.name.padEnd(20)} ${formatBytes(dep.size).padEnd(24)}│`);
      }
    }
    
    lines.push('╰─────────────────────────────────────────────────────────╯');
  }
  
  // Performance score section (if available)
  if (detailed && analysis.performanceScore !== undefined) {
    lines.push('');
    lines.push('╭─────────────────────────────────────────────────────────╮');
    
    const scoreColor = analysis.performanceScore >= 80 ? chalk.green :
                       analysis.performanceScore >= 60 ? chalk.yellow :
                       chalk.red;
    
    lines.push(`│  ${chalk.bold('Performance Score:')} ${scoreColor(analysis.performanceScore + '/100')}${' '.repeat(32)}│`);
    lines.push('├─────────────────────────────────────────────────────────┤');
    
    // Status indicators
    const sizeStatus = analysis.originalSize < 1024 * 1024 ? '✅' : '⚠️';
    const compressionStatus = (analysis.gzipSize / analysis.originalSize) < 0.4 ? '✅' : '⚠️';
    
    lines.push(`│  ${sizeStatus} Size:              ${analysis.originalSize < 1024 * 1024 ? 'Good (< 1MB)' : 'Large (> 1MB)'}${' '.repeat(21)}│`);
    lines.push(`│  ${compressionStatus} Compression:       ${(analysis.gzipSize / analysis.originalSize) < 0.4 ? 'Excellent' : 'Could improve'}${' '.repeat(17)}│`);
    
    // Recommendations
    if (analysis.recommendations && analysis.recommendations.length > 0) {
      lines.push('│                                                         │');
      lines.push('│  ' + chalk.bold('Recommendations:') + '                                       │');
      for (const rec of analysis.recommendations) {
        lines.push(`│  • ${rec.padEnd(53)}│`);
      }
    }
    
    lines.push('╰─────────────────────────────────────────────────────────╯');
  }
  
  lines.push('');
  return lines.join('\n');
}

/**
 * Format check result
 */
export function formatCheckResult(result: CheckResult): string {
  const lines: string[] = [];
  
  if (result.passed) {
    lines.push(chalk.green('\n✅ Bundle size check passed!\n'));
  } else {
    lines.push(chalk.red('\n❌ Bundle size check failed!\n'));
  }
  
  lines.push(chalk.cyan(result.bundle));
  
  if (result.checks.original) {
    const status = result.checks.original.passed ? chalk.green('✅') : chalk.red('❌');
    const value = formatBytes(result.checks.original.value);
    const limit = formatBytes(result.checks.original.limit);
    
    if (result.checks.original.passed) {
      lines.push(`  Original: ${value}  ${status} (limit: ${limit})`);
    } else {
      const exceeded = formatBytes(result.checks.original.value - result.checks.original.limit);
      lines.push(`  Original: ${value}  ${status} (limit: ${limit}, exceeded by ${exceeded})`);
    }
  }
  
  if (result.checks.gzip) {
    const status = result.checks.gzip.passed ? chalk.green('✅') : chalk.red('❌');
    const value = formatBytes(result.checks.gzip.value);
    const limit = formatBytes(result.checks.gzip.limit);
    
    if (result.checks.gzip.passed) {
      lines.push(`  Gzipped:  ${value}  ${status} (limit: ${limit})`);
    } else {
      const exceeded = formatBytes(result.checks.gzip.value - result.checks.gzip.limit);
      lines.push(`  Gzipped:  ${value}  ${status} (limit: ${limit}, exceeded by ${exceeded})`);
    }
  }
  
  lines.push('');
  
  if (!result.passed) {
    lines.push(chalk.red('Bundle exceeds size limits.'));
  } else {
    lines.push(chalk.green('All bundles are within size limits.'));
  }
  
  lines.push('');
  return lines.join('\n');
}

/**
 * Format comparison result
 */
export function formatComparison(result: CompareResult): string {
  const lines: string[] = [];
  
  lines.push(chalk.bold('\n📊 Bundle Comparison\n'));
  
  lines.push('╭─────────────────────────────────────────────────────────╮');
  lines.push('│  ' + chalk.bold('Overall Changes') + '                                        │');
  lines.push('├─────────────────────────────────────────────────────────┤');
  lines.push(`│  Base:              ${formatBytes(result.base.originalSize).padEnd(42)}│`);
  lines.push(`│  Current:           ${formatBytes(result.current.originalSize).padEnd(42)}│`);
  
  const diffStr = formatChange(result.changes.originalDiff);
  const percentStr = formatChange(result.changes.originalPercent);
  const changeColor = result.changes.originalDiff > 0 ? chalk.yellow : chalk.green;
  
  lines.push(`│  Change:            ${changeColor(formatBytes(Math.abs(result.changes.originalDiff)))} (${percentStr.replace(/\.\d+/, (m) => m.substring(0, 2))}%)${' '.repeat(20)}│`);
  lines.push('│                                                         │');
  
  if (result.current.gzipSize > 0) {
    lines.push('│  ' + chalk.bold('Gzipped:') + '                                                │');
    lines.push(`│  Base:              ${formatBytes(result.base.gzipSize).padEnd(42)}│`);
    lines.push(`│  Current:           ${formatBytes(result.current.gzipSize).padEnd(42)}│`);
    
    const gzipDiffStr = formatChange(result.changes.gzipDiff);
    const gzipPercentStr = formatChange(result.changes.gzipPercent);
    const gzipColor = result.changes.gzipDiff > 0 ? chalk.yellow : chalk.green;
    
    lines.push(`│  Change:            ${gzipColor(formatBytes(Math.abs(result.changes.gzipDiff)))} (${gzipPercentStr.replace(/\.\d+/, (m) => m.substring(0, 2))}%)${' '.repeat(20)}│`);
  }
  
  lines.push('╰─────────────────────────────────────────────────────────╯');
  
  // Status message
  const status = result.changes.originalPercent > 0 ? '⚠️' : '✅';
  const message = result.changes.originalPercent > 0 
    ? `Bundle size increased by ${Math.abs(result.changes.originalPercent).toFixed(1)}%`
    : `Bundle size decreased by ${Math.abs(result.changes.originalPercent).toFixed(1)}%`;
  
  lines.push('');
  lines.push(`${status}  ${message}`);
  lines.push('');
  
  return lines.join('\n');
}

/**
 * Format as JSON
 */
export function formatAsJson(data: any): string {
  return JSON.stringify(data, null, 2);
}
