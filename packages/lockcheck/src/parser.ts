/**
 * Lock file parser
 */

import * as fs from 'fs';
import * as path from 'path';
import { PackageLock, PackageJson } from './types';

export class LockFileParser {
  /**
   * Find lock file in directory
   */
  static findLockFile(dir: string = process.cwd()): string | null {
    const candidates = [
      'package-lock.json',
      'yarn.lock',
      'pnpm-lock.yaml'
    ];

    for (const file of candidates) {
      const fullPath = path.join(dir, file);
      if (fs.existsSync(fullPath)) {
        return fullPath;
      }
    }

    return null;
  }

  /**
   * Parse package-lock.json
   */
  static parseLockFile(filePath: string): PackageLock {
    if (!fs.existsSync(filePath)) {
      throw new Error(`Lock file not found: ${filePath}`);
    }

    const content = fs.readFileSync(filePath, 'utf-8');
    
    try {
      const lockFile = JSON.parse(content) as PackageLock;
      
      if (!lockFile.lockfileVersion) {
        throw new Error('Invalid lock file format: missing lockfileVersion');
      }

      return lockFile;
    } catch (error) {
      throw new Error(`Failed to parse lock file: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Parse package.json
   */
  static parsePackageJson(filePath: string): PackageJson {
    if (!fs.existsSync(filePath)) {
      throw new Error(`Package file not found: ${filePath}`);
    }

    const content = fs.readFileSync(filePath, 'utf-8');
    
    try {
      return JSON.parse(content) as PackageJson;
    } catch (error) {
      throw new Error(`Failed to parse package.json: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Get all dependencies from package.json
   */
  static getAllDependencies(packageJson: PackageJson): Record<string, string> {
    return {
      ...packageJson.dependencies,
      ...packageJson.devDependencies,
      ...packageJson.peerDependencies,
      ...packageJson.optionalDependencies
    };
  }

  /**
   * Get all packages from lock file (handles both v1 and v2/v3 formats)
   */
  static getAllPackages(lockFile: PackageLock): Map<string, { version: string; integrity?: string }> {
    const packages = new Map<string, { version: string; integrity?: string }>();

    // Lock file version 2 or 3 (npm v7+)
    if (lockFile.packages) {
      for (const [pkgPath, info] of Object.entries(lockFile.packages)) {
        if (pkgPath === '' || !info.version) continue; // Skip root
        
        // Extract package name from path (node_modules/package-name)
        const match = pkgPath.match(/node_modules\/([^/]+)$/);
        if (match && info.version) {
          const pkgName = match[1];
          packages.set(pkgName, {
            version: info.version,
            integrity: info.integrity
          });
        }
      }
    }

    // Lock file version 1 (npm v5-v6)
    if (lockFile.dependencies) {
      for (const [pkgName, info] of Object.entries(lockFile.dependencies)) {
        if (info.version) {
          packages.set(pkgName, {
            version: info.version,
            integrity: info.integrity
          });
        }
      }
    }

    return packages;
  }
}
