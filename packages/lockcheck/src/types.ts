/**
 * Core types for lockcheck
 */

export interface PackageLock {
  name?: string;
  version?: string;
  lockfileVersion: number;
  packages?: Record<string, PackageInfo>;
  dependencies?: Record<string, LegacyPackageInfo>;
}

export interface PackageInfo {
  version?: string;
  resolved?: string;
  integrity?: string;
  dev?: boolean;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
}

export interface LegacyPackageInfo {
  version: string;
  resolved?: string;
  integrity?: string;
  dev?: boolean;
  requires?: Record<string, string>;
  dependencies?: Record<string, LegacyPackageInfo>;
}

export interface PackageJson {
  name?: string;
  version?: string;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
  optionalDependencies?: Record<string, string>;
}

export interface ValidationResult {
  valid: boolean;
  mismatches: Mismatch[];
  integrityIssues: IntegrityIssue[];
  extraPackages: string[];
  missingPackages: string[];
  totalPackages: number;
}

export interface Mismatch {
  package: string;
  packageJsonVersion: string;
  lockFileVersion: string;
  satisfies: boolean;
}

export interface IntegrityIssue {
  package: string;
  version: string;
  issue: 'missing' | 'invalid';
  details?: string;
}

export interface LockCheckOptions {
  lockFile?: string;
  packageFile?: string;
  verifyIntegrity?: boolean;
  verbose?: boolean;
  json?: boolean;
}
