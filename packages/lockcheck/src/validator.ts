/**
 * Package version validator
 */

import * as semver from 'semver';
import { Mismatch } from './types';

export class PackageValidator {
  /**
   * Check if locked version satisfies package.json version range
   */
  static validateVersion(
    packageName: string,
    packageJsonVersion: string,
    lockFileVersion: string
  ): Mismatch | null {
    const satisfies = semver.satisfies(lockFileVersion, packageJsonVersion);

    if (!satisfies) {
      return {
        package: packageName,
        packageJsonVersion,
        lockFileVersion,
        satisfies: false
      };
    }

    return null;
  }

  /**
   * Find version mismatches between package.json and lock file
   */
  static findMismatches(
    packageJsonDeps: Record<string, string>,
    lockedPackages: Map<string, { version: string; integrity?: string }>
  ): Mismatch[] {
    const mismatches: Mismatch[] = [];

    for (const [pkgName, versionRange] of Object.entries(packageJsonDeps)) {
      const locked = lockedPackages.get(pkgName);

      if (locked) {
        const mismatch = this.validateVersion(pkgName, versionRange, locked.version);
        if (mismatch) {
          mismatches.push(mismatch);
        }
      }
    }

    return mismatches;
  }

  /**
   * Find missing packages (in package.json but not in lock file)
   */
  static findMissingPackages(
    packageJsonDeps: Record<string, string>,
    lockedPackages: Map<string, { version: string; integrity?: string }>
  ): string[] {
    const missing: string[] = [];

    for (const pkgName of Object.keys(packageJsonDeps)) {
      if (!lockedPackages.has(pkgName)) {
        missing.push(pkgName);
      }
    }

    return missing;
  }

  /**
   * Find extra packages (in lock file but not in package.json)
   * Note: This is not always an error due to transitive dependencies
   */
  static findExtraPackages(
    packageJsonDeps: Record<string, string>,
    lockedPackages: Map<string, { version: string; integrity?: string }>
  ): string[] {
    const extra: string[] = [];
    const declaredPackages = new Set(Object.keys(packageJsonDeps));

    for (const pkgName of lockedPackages.keys()) {
      // Only report if it's a top-level package not in package.json
      if (!declaredPackages.has(pkgName)) {
        // This could be a transitive dependency, which is normal
        // For MVP, we'll skip this check to avoid false positives
        // extra.push(pkgName);
      }
    }

    return extra;
  }
}
