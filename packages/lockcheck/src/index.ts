/**
 * @muin/lockcheck - Lock file validator
 * Main entry point
 */

import * as path from 'path';
import { LockFileParser } from './parser';
import { PackageValidator } from './validator';
import { IntegrityChecker } from './integrity';
import { LockCheckOptions, ValidationResult } from './types';

export class LockCheck {
  /**
   * Validate lock file
   */
  static validate(options: LockCheckOptions = {}): ValidationResult {
    const cwd = process.cwd();

    // Find or use specified lock file
    const lockFilePath = options.lockFile
      ? path.resolve(cwd, options.lockFile)
      : LockFileParser.findLockFile(cwd);

    if (!lockFilePath) {
      throw new Error('No lock file found. Run npm install first.');
    }

    // Find or use specified package.json
    const packageJsonPath = options.packageFile
      ? path.resolve(cwd, options.packageFile)
      : path.join(cwd, 'package.json');

    // Parse files
    const lockFile = LockFileParser.parseLockFile(lockFilePath);
    const packageJson = LockFileParser.parsePackageJson(packageJsonPath);

    // Get all packages
    const packageJsonDeps = LockFileParser.getAllDependencies(packageJson);
    const lockedPackages = LockFileParser.getAllPackages(lockFile);

    // Validate versions
    const mismatches = PackageValidator.findMismatches(packageJsonDeps, lockedPackages);
    const missingPackages = PackageValidator.findMissingPackages(packageJsonDeps, lockedPackages);
    const extraPackages = PackageValidator.findExtraPackages(packageJsonDeps, lockedPackages);

    // Check integrity if requested
    let integrityIssues: ValidationResult['integrityIssues'] = [];
    if (options.verifyIntegrity) {
      integrityIssues = IntegrityChecker.checkIntegrity(lockedPackages);
    }

    // Determine if valid
    const valid = mismatches.length === 0 && 
                  missingPackages.length === 0 &&
                  (options.verifyIntegrity ? integrityIssues.length === 0 : true);

    return {
      valid,
      mismatches,
      integrityIssues,
      extraPackages,
      missingPackages,
      totalPackages: lockedPackages.size
    };
  }
}

// Export types and utilities
export * from './types';
export { LockFileParser } from './parser';
export { PackageValidator } from './validator';
export { IntegrityChecker } from './integrity';
