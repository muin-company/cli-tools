/**
 * Bundle size checking logic
 */

import { analyzeBundle } from './analyzer';
import { parseSizeString } from './utils';
import { CheckResult, CheckOptions } from './types';

/**
 * Check bundle size against limits
 */
export async function checkBundleSize(
  filePath: string,
  options: CheckOptions
): Promise<CheckResult> {
  // Analyze the bundle
  const analysis = await analyzeBundle(filePath);
  
  const result: CheckResult = {
    passed: true,
    bundle: filePath,
    checks: {},
  };
  
  // Check original size
  if (options.maxSize) {
    const limit = parseSizeString(options.maxSize);
    const passed = analysis.originalSize <= limit;
    
    result.checks.original = {
      value: analysis.originalSize,
      limit,
      passed,
    };
    
    if (!passed) {
      result.passed = false;
    }
  }
  
  // Check gzipped size
  if (options.maxGzip) {
    const limit = parseSizeString(options.maxGzip);
    const passed = analysis.gzipSize <= limit;
    
    result.checks.gzip = {
      value: analysis.gzipSize,
      limit,
      passed,
    };
    
    if (!passed) {
      result.passed = false;
    }
  }
  
  // Check brotli size
  if (options.maxBrotli) {
    const limit = parseSizeString(options.maxBrotli);
    const passed = analysis.brotliSize <= limit;
    
    result.checks.brotli = {
      value: analysis.brotliSize,
      limit,
      passed,
    };
    
    if (!passed) {
      result.passed = false;
    }
  }
  
  return result;
}
