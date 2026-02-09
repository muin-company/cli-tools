/**
 * Compression utilities for bundle size calculation
 */

import { gzipSync, brotliCompressSync } from 'zlib';

/**
 * Calculate gzipped size of content
 */
export function calculateGzipSize(content: Buffer, level: number = 6): number {
  const compressed = gzipSync(content, { level });
  return compressed.length;
}

/**
 * Calculate brotli compressed size of content
 */
export function calculateBrotliSize(content: Buffer): number {
  const compressed = brotliCompressSync(content);
  return compressed.length;
}

/**
 * Calculate compression ratio
 */
export function calculateCompressionRatio(original: number, compressed: number): number {
  return ((compressed / original) * 100);
}

/**
 * Get compression efficiency rating
 */
export function getCompressionEfficiency(ratio: number): string {
  if (ratio < 30) return 'Excellent';
  if (ratio < 40) return 'Very Good';
  if (ratio < 50) return 'Good';
  if (ratio < 60) return 'Fair';
  return 'Poor';
}
