/**
 * Type definitions for bundlesize
 */

export interface BundleAnalysis {
  filePath: string;
  originalSize: number;
  gzipSize: number;
  brotliSize: number;
  composition?: BundleComposition;
  dependencies?: DependencyInfo[];
  performanceScore?: number;
  recommendations?: string[];
}

export interface BundleComposition {
  yourCode: number;
  nodeModules: number;
  yourCodePercent: number;
  nodeModulesPercent: number;
}

export interface DependencyInfo {
  name: string;
  size: number;
  percent: number;
}

export interface SizeLimits {
  maxSize?: string;
  maxGzip?: string;
  maxBrotli?: string;
}

export interface CheckResult {
  passed: boolean;
  bundle: string;
  checks: {
    original?: { value: number; limit: number; passed: boolean };
    gzip?: { value: number; limit: number; passed: boolean };
    brotli?: { value: number; limit: number; passed: boolean };
  };
}

export interface CompareResult {
  bundle: string;
  base: BundleAnalysis;
  current: BundleAnalysis;
  changes: {
    originalDiff: number;
    originalPercent: number;
    gzipDiff: number;
    gzipPercent: number;
  };
}

export interface AnalyzeOptions {
  includeComposition?: boolean;
  showDuplicates?: boolean;
  verbose?: boolean;
  noCompress?: boolean;
}

export interface CheckOptions extends SizeLimits {
  failOnIncrease?: boolean;
  threshold?: number;
}

export interface CompareOptions {
  base?: string;
  showDiff?: boolean;
  json?: boolean;
}

export interface ReportOptions {
  format?: 'text' | 'json' | 'html' | 'markdown';
  output?: string;
  includeSourcemap?: boolean;
  showDuplicates?: boolean;
}

export interface BundleSizeConfig {
  files?: Array<{
    path: string;
    maxSize?: string;
    maxGzip?: string;
    maxBrotli?: string;
  }>;
  threshold?: number;
  failOnIncrease?: boolean;
  compression?: 'gzip' | 'brotli' | 'both';
  ci?: {
    trackHistory?: boolean;
    commentOnPR?: boolean;
    failOnExceed?: boolean;
  };
}
