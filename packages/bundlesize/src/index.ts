/**
 * @muin/bundlesize - Bundle size analysis and tracking
 * 
 * Main exports for programmatic usage
 */

export { analyzeBundle, compareBundles } from './analyzer';
export { checkBundleSize } from './checker';
export { calculateGzipSize, calculateBrotliSize } from './compressor';
export {
  formatAnalysis,
  formatCheckResult,
  formatComparison,
  formatAsJson,
} from './formatter';
export {
  formatBytes,
  parseSizeString,
  getFileSize,
  isJavaScriptFile,
} from './utils';

export type {
  BundleAnalysis,
  BundleComposition,
  DependencyInfo,
  SizeLimits,
  CheckResult,
  CompareResult,
  AnalyzeOptions,
  CheckOptions,
  CompareOptions,
  ReportOptions,
  BundleSizeConfig,
} from './types';
