/**
 * Bundle analysis logic
 */

import { readFileBuffer, getFileSize, extractDependencies, detectBundleType, calculatePercent } from './utils';
import { calculateGzipSize, calculateBrotliSize } from './compressor';
import { BundleAnalysis, AnalyzeOptions, DependencyInfo, BundleComposition } from './types';

/**
 * Analyze a bundle file
 */
export async function analyzeBundle(
  filePath: string,
  options: AnalyzeOptions = {}
): Promise<BundleAnalysis> {
  // Read file
  const buffer = readFileBuffer(filePath);
  const originalSize = buffer.length;
  
  // Calculate compressed sizes
  let gzipSize = 0;
  let brotliSize = 0;
  
  if (!options.noCompress) {
    gzipSize = calculateGzipSize(buffer);
    brotliSize = calculateBrotliSize(buffer);
  }
  
  const analysis: BundleAnalysis = {
    filePath,
    originalSize,
    gzipSize,
    brotliSize,
  };
  
  // Add composition analysis if requested
  if (options.includeComposition) {
    const content = buffer.toString('utf-8');
    analysis.composition = analyzeComposition(content, originalSize);
    analysis.dependencies = analyzeDependencies(content, originalSize);
    analysis.performanceScore = calculatePerformanceScore(analysis);
    analysis.recommendations = generateRecommendations(analysis);
  }
  
  return analysis;
}

/**
 * Analyze bundle composition (your code vs node_modules)
 * This is a simplified heuristic - real implementation would use source maps
 */
function analyzeComposition(content: string, totalSize: number): BundleComposition {
  // Simple heuristic: count 'node_modules' occurrences in comments/paths
  const nodeModulesMatches = content.match(/node_modules/g) || [];
  const hasNodeModules = nodeModulesMatches.length > 0;
  
  // Rough estimation: if we find node_modules, assume 60-70% is dependencies
  // In real implementation, this would use source maps
  const nodeModulesPercent = hasNodeModules ? 65 : 10;
  const yourCodePercent = 100 - nodeModulesPercent;
  
  return {
    nodeModules: Math.round(totalSize * nodeModulesPercent / 100),
    yourCode: Math.round(totalSize * yourCodePercent / 100),
    nodeModulesPercent,
    yourCodePercent,
  };
}

/**
 * Analyze top dependencies
 */
function analyzeDependencies(content: string, totalSize: number): DependencyInfo[] {
  const deps = extractDependencies(content);
  
  // Simulate dependency sizes (in real implementation, would analyze actual bundle)
  const commonSizes: Record<string, number> = {
    'react': 157300,
    'react-dom': 156000,
    'lodash': 112400,
    'moment': 98700,
    'axios': 45200,
    'chart.js': 38900,
    'date-fns': 13000,
  };
  
  return deps.slice(0, 5).map(name => {
    const size = commonSizes[name] || Math.floor(Math.random() * 50000 + 10000);
    return {
      name,
      size,
      percent: calculatePercent(size, totalSize),
    };
  });
}

/**
 * Calculate performance score (0-100)
 */
function calculatePerformanceScore(analysis: BundleAnalysis): number {
  let score = 100;
  
  // Size penalty
  if (analysis.originalSize > 1024 * 1024) { // > 1MB
    score -= 30;
  } else if (analysis.originalSize > 512 * 1024) { // > 512KB
    score -= 15;
  } else if (analysis.originalSize > 300 * 1024) { // > 300KB
    score -= 5;
  }
  
  // Compression efficiency
  const compressionRatio = analysis.gzipSize / analysis.originalSize;
  if (compressionRatio > 0.5) { // < 50% compression
    score -= 10;
  } else if (compressionRatio > 0.4) {
    score -= 5;
  }
  
  return Math.max(0, Math.min(100, score));
}

/**
 * Generate optimization recommendations
 */
function generateRecommendations(analysis: BundleAnalysis): string[] {
  const recommendations: string[] = [];
  
  // Size-based recommendations
  if (analysis.originalSize > 500 * 1024) {
    recommendations.push('Consider code splitting to reduce bundle size');
  }
  
  // Compression recommendations
  const compressionRatio = analysis.gzipSize / analysis.originalSize;
  if (compressionRatio > 0.5) {
    recommendations.push('Enable tree-shaking to improve compression ratio');
  }
  
  // Dependency recommendations
  if (analysis.dependencies) {
    for (const dep of analysis.dependencies) {
      if (dep.name === 'moment' && dep.size > 90000) {
        recommendations.push('Replace moment with date-fns (89KB → 13KB)');
      }
      if (dep.name === 'lodash' && dep.size > 100000) {
        recommendations.push('Use lodash-es for tree-shaking');
      }
    }
  }
  
  return recommendations;
}

/**
 * Compare two bundle analyses
 */
export function compareBundles(
  base: BundleAnalysis,
  current: BundleAnalysis
): {
  originalDiff: number;
  originalPercent: number;
  gzipDiff: number;
  gzipPercent: number;
  brotliDiff: number;
  brotliPercent: number;
} {
  return {
    originalDiff: current.originalSize - base.originalSize,
    originalPercent: calculatePercent(
      current.originalSize - base.originalSize,
      base.originalSize
    ),
    gzipDiff: current.gzipSize - base.gzipSize,
    gzipPercent: calculatePercent(
      current.gzipSize - base.gzipSize,
      base.gzipSize
    ),
    brotliDiff: current.brotliSize - base.brotliSize,
    brotliPercent: calculatePercent(
      current.brotliSize - base.brotliSize,
      base.brotliSize
    ),
  };
}
