/**
 * depcheck-lite types
 */

export interface PackageJson {
  name?: string;
  version?: string;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
  scripts?: Record<string, string>;
}

export interface Dependency {
  name: string;
  version: string;
  type: 'dependencies' | 'devDependencies' | 'peerDependencies';
}

export interface UnusedDependency extends Dependency {
  // Empty for now, can add metadata later
}

export interface UsedDependency extends Dependency {
  files: string[];
}

export interface AnalysisResult {
  dependencies: {
    total: number;
    used: number;
    unused: number;
    missing: number;
  };
  unused: UnusedDependency[];
  used: UsedDependency[];
  missing?: MissingDependency[];
}

export interface MissingDependency {
  name: string;
  importedIn: string;
}

export interface ScanOptions {
  dir: string;
  ignoreDirs?: string[];
  ignorePackages?: string[];
  includeDev?: boolean;
  verbose?: boolean;
}

export interface ImportInfo {
  packageName: string;
  file: string;
  line: number;
}
