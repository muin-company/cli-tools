/**
 * Integrity checker for lock file packages
 */

import { IntegrityIssue } from './types';

export class IntegrityChecker {
  /**
   * Validate integrity checksums in lock file
   */
  static checkIntegrity(
    lockedPackages: Map<string, { version: string; integrity?: string }>
  ): IntegrityIssue[] {
    const issues: IntegrityIssue[] = [];

    for (const [pkgName, info] of lockedPackages.entries()) {
      // Check if integrity field exists
      if (!info.integrity) {
        issues.push({
          package: pkgName,
          version: info.version,
          issue: 'missing',
          details: 'No integrity checksum found'
        });
        continue;
      }

      // Validate integrity format (should be sha512- or sha1- prefix)
      if (!this.isValidIntegrityFormat(info.integrity)) {
        issues.push({
          package: pkgName,
          version: info.version,
          issue: 'invalid',
          details: `Invalid integrity format: ${info.integrity}`
        });
      }
    }

    return issues;
  }

  /**
   * Check if integrity string has valid format
   */
  private static isValidIntegrityFormat(integrity: string): boolean {
    // Valid formats: sha512-..., sha1-..., etc.
    // Can also have multiple hashes separated by space
    const hashes = integrity.split(/\s+/);
    
    for (const hash of hashes) {
      if (!hash.match(/^(sha\d+)-[A-Za-z0-9+/=]+$/)) {
        return false;
      }
    }

    return true;
  }

  /**
   * Get integrity statistics
   */
  static getIntegrityStats(
    lockedPackages: Map<string, { version: string; integrity?: string }>
  ): { total: number; withIntegrity: number; missing: number } {
    let withIntegrity = 0;
    let missing = 0;

    for (const info of lockedPackages.values()) {
      if (info.integrity) {
        withIntegrity++;
      } else {
        missing++;
      }
    }

    return {
      total: lockedPackages.size,
      withIntegrity,
      missing
    };
  }
}
