/**
 * Utility functions for bundlesize
 */

import { readFileSync, statSync, existsSync } from 'fs';
import { resolve } from 'path';

/**
 * Format bytes to human-readable size
 */
export function formatBytes(bytes: number, decimals: number = 1): string {
  if (bytes === 0) return '0 B';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * Parse size string (e.g., "200kb", "1.5mb") to bytes
 */
export function parseSizeString(size: string): number {
  const match = size.match(/^([\d.]+)\s*(b|kb|mb|gb)?$/i);
  if (!match) {
    throw new Error(`Invalid size format: ${size}`);
  }
  
  const value = parseFloat(match[1]);
  const unit = (match[2] || 'b').toLowerCase();
  
  const multipliers: Record<string, number> = {
    'b': 1,
    'kb': 1024,
    'mb': 1024 * 1024,
    'gb': 1024 * 1024 * 1024,
  };
  
  return value * (multipliers[unit] || 1);
}

/**
 * Read file and return buffer
 */
export function readFileBuffer(filePath: string): Buffer {
  const resolvedPath = resolve(filePath);
  
  if (!existsSync(resolvedPath)) {
    throw new Error(`File not found: ${filePath}`);
  }
  
  return readFileSync(resolvedPath);
}

/**
 * Get file size
 */
export function getFileSize(filePath: string): number {
  const resolvedPath = resolve(filePath);
  
  if (!existsSync(resolvedPath)) {
    throw new Error(`File not found: ${filePath}`);
  }
  
  const stats = statSync(resolvedPath);
  return stats.size;
}

/**
 * Calculate percentage
 */
export function calculatePercent(value: number, total: number): number {
  if (total === 0) return 0;
  return (value / total) * 100;
}

/**
 * Format percentage
 */
export function formatPercent(percent: number, decimals: number = 1): string {
  return percent.toFixed(decimals) + '%';
}

/**
 * Format change with sign
 */
export function formatChange(value: number): string {
  const sign = value > 0 ? '+' : '';
  return `${sign}${value}`;
}

/**
 * Check if file is JavaScript
 */
export function isJavaScriptFile(filePath: string): boolean {
  return /\.(js|mjs|cjs)$/i.test(filePath);
}

/**
 * Detect bundle type from content
 */
export function detectBundleType(content: string): 'esm' | 'cjs' | 'umd' | 'unknown' {
  // Simple heuristics
  if (content.includes('export ') || content.includes('import ')) {
    return 'esm';
  }
  if (content.includes('module.exports') || content.includes('require(')) {
    return 'cjs';
  }
  if (content.includes('(function (root, factory)') || content.includes('define.amd')) {
    return 'umd';
  }
  return 'unknown';
}

/**
 * Extract top-level dependencies from bundle (simple heuristic)
 */
export function extractDependencies(content: string): string[] {
  const deps: Set<string> = new Set();
  
  // Match require('package') and import from 'package'
  const requireRegex = /require\(['"]([^'"]+)['"]\)/g;
  const importRegex = /import .+ from ['"]([^'"]+)['"]/g;
  
  let match;
  while ((match = requireRegex.exec(content)) !== null) {
    const dep = match[1];
    if (!dep.startsWith('.') && !dep.startsWith('/')) {
      deps.add(dep.split('/')[0]); // Get package name
    }
  }
  
  while ((match = importRegex.exec(content)) !== null) {
    const dep = match[1];
    if (!dep.startsWith('.') && !dep.startsWith('/')) {
      deps.add(dep.split('/')[0]);
    }
  }
  
  return Array.from(deps);
}
