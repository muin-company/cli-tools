/**
 * File scanner and import detector
 */

import * as fs from 'fs';
import * as path from 'path';
import { ImportInfo, ScanOptions } from './types';

const DEFAULT_IGNORE_DIRS = [
  'node_modules',
  'dist',
  'build',
  'coverage',
  '.next',
  '.nuxt',
  'out',
  '.cache'
];

const SOURCE_EXTENSIONS = [
  '.js',
  '.jsx',
  '.ts',
  '.tsx',
  '.mjs',
  '.cjs',
  '.vue',
  '.svelte'
];

/**
 * Scan directory for source files
 */
export function scanDirectory(dir: string, options: ScanOptions): string[] {
  const ignoreDirs = [...DEFAULT_IGNORE_DIRS, ...(options.ignoreDirs || [])];
  const files: string[] = [];

  function scan(currentDir: string) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      
      if (entry.isDirectory()) {
        // Skip ignored directories
        if (ignoreDirs.includes(entry.name)) {
          continue;
        }
        // Skip hidden directories
        if (entry.name.startsWith('.')) {
          continue;
        }
        scan(fullPath);
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name);
        if (SOURCE_EXTENSIONS.includes(ext)) {
          files.push(fullPath);
        }
      }
    }
  }

  scan(dir);
  return files;
}

/**
 * Extract imports from file content
 * Detects:
 * - ES6 imports: import ... from 'package'
 * - CommonJS: require('package')
 * - Dynamic imports: import('package')
 */
export function extractImports(filePath: string, content: string): ImportInfo[] {
  const imports: ImportInfo[] = [];
  const lines = content.split('\n');

  // Regex patterns for different import styles
  const patterns = [
    // ES6 imports: import ... from 'package'
    /import\s+(?:(?:[\w*{}\s,]+)\s+from\s+)?['"]([^'"]+)['"]/g,
    // CommonJS: require('package')
    /require\s*\(\s*['"]([^'"]+)['"]\s*\)/g,
    // Dynamic import: import('package')
    /import\s*\(\s*['"]([^'"]+)['"]\s*\)/g,
    // TypeScript type imports: import type ... from 'package'
    /import\s+type\s+(?:[\w*{}\s,]+)\s+from\s+['"]([^'"]+)['"]/g,
  ];

  lines.forEach((line, lineIndex) => {
    // Skip comments
    if (line.trim().startsWith('//') || line.trim().startsWith('*')) {
      return;
    }

    for (const pattern of patterns) {
      let match;
      while ((match = pattern.exec(line)) !== null) {
        const importPath = match[1];
        const packageName = extractPackageName(importPath);
        
        if (packageName) {
          imports.push({
            packageName,
            file: filePath,
            line: lineIndex + 1,
          });
        }
      }
      // Reset regex state
      pattern.lastIndex = 0;
    }
  });

  return imports;
}

/**
 * Extract package name from import path
 * Examples:
 * - 'react' -> 'react'
 * - 'react/jsx-runtime' -> 'react'
 * - '@babel/core' -> '@babel/core'
 * - '@babel/core/lib/utils' -> '@babel/core'
 * - './relative' -> null
 * - '../parent' -> null
 */
function extractPackageName(importPath: string): string | null {
  // Skip relative imports
  if (importPath.startsWith('.') || importPath.startsWith('/')) {
    return null;
  }

  // Skip built-in Node.js modules
  const builtinModules = [
    'fs', 'path', 'http', 'https', 'crypto', 'util', 'stream',
    'events', 'buffer', 'process', 'os', 'child_process', 'url',
    'querystring', 'assert', 'zlib', 'net', 'tls', 'dgram'
  ];
  if (builtinModules.includes(importPath)) {
    return null;
  }

  // Handle scoped packages (@scope/package)
  if (importPath.startsWith('@')) {
    const parts = importPath.split('/');
    if (parts.length >= 2) {
      return `${parts[0]}/${parts[1]}`;
    }
    return importPath;
  }

  // Regular package
  const parts = importPath.split('/');
  return parts[0];
}

/**
 * Scan files and collect all imports
 */
export function collectImports(files: string[], options: ScanOptions): Map<string, Set<string>> {
  const packageFiles = new Map<string, Set<string>>();

  for (const file of files) {
    try {
      const content = fs.readFileSync(file, 'utf-8');
      const imports = extractImports(file, content);

      for (const imp of imports) {
        if (!packageFiles.has(imp.packageName)) {
          packageFiles.set(imp.packageName, new Set());
        }
        packageFiles.get(imp.packageName)!.add(file);
      }

      if (options.verbose) {
        console.log(`✓ Scanned ${path.relative(options.dir, file)}`);
      }
    } catch (error) {
      if (options.verbose) {
        console.warn(`⚠ Failed to scan ${file}: ${error}`);
      }
    }
  }

  return packageFiles;
}
