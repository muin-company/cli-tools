/**
 * Dependency analyzer
 */

import * as fs from 'fs';
import * as path from 'path';
import { PackageJson, Dependency, AnalysisResult, UsedDependency, UnusedDependency, ScanOptions } from './types';
import { scanDirectory, collectImports } from './scanner';

/**
 * Read and parse package.json
 */
export function readPackageJson(dir: string): PackageJson {
  const pkgPath = path.join(dir, 'package.json');
  
  if (!fs.existsSync(pkgPath)) {
    throw new Error(`package.json not found in ${dir}`);
  }

  const content = fs.readFileSync(pkgPath, 'utf-8');
  return JSON.parse(content);
}

/**
 * Get all dependencies from package.json
 */
export function getAllDependencies(pkg: PackageJson, includeDev = true): Dependency[] {
  const deps: Dependency[] = [];

  // Add production dependencies
  if (pkg.dependencies) {
    for (const [name, version] of Object.entries(pkg.dependencies)) {
      deps.push({ name, version, type: 'dependencies' });
    }
  }

  // Add dev dependencies if requested
  if (includeDev && pkg.devDependencies) {
    for (const [name, version] of Object.entries(pkg.devDependencies)) {
      deps.push({ name, version, type: 'devDependencies' });
    }
  }

  return deps;
}

/**
 * Analyze dependencies usage
 */
export function analyzeDependencies(options: ScanOptions): AnalysisResult {
  // Read package.json
  const pkg = readPackageJson(options.dir);
  const allDeps = getAllDependencies(pkg, options.includeDev);

  if (options.verbose) {
    console.log(`\n📦 Found ${allDeps.length} dependencies in package.json`);
  }

  // Scan source files
  if (options.verbose) {
    console.log(`\n🔍 Scanning source files...`);
  }
  const sourceFiles = scanDirectory(options.dir, options);
  
  if (options.verbose) {
    console.log(`\n✓ Found ${sourceFiles.length} source files`);
  }

  // Collect imports
  if (options.verbose) {
    console.log(`\n📖 Analyzing imports...`);
  }
  const imports = collectImports(sourceFiles, options);

  // Determine used vs unused
  const used: UsedDependency[] = [];
  const unused: UnusedDependency[] = [];
  const ignoreSet = new Set(options.ignorePackages || []);

  for (const dep of allDeps) {
    // Skip ignored packages
    if (ignoreSet.has(dep.name)) {
      continue;
    }

    const files = imports.get(dep.name);
    if (files && files.size > 0) {
      used.push({
        ...dep,
        files: Array.from(files),
      });
    } else {
      unused.push({
        ...dep,
      });
    }
  }

  return {
    dependencies: {
      total: allDeps.length,
      used: used.length,
      unused: unused.length,
      missing: 0, // Not implemented in MVP
    },
    unused,
    used,
  };
}

/**
 * Format size in human-readable format
 */
export function formatSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}
