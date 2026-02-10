import * as fs from 'fs';
import * as path from 'path';
import { PackageMetadata, ProjectType } from './types.js';

export function parsePackageJson(projectPath: string = process.cwd()): PackageMetadata {
  const packageJsonPath = path.join(projectPath, 'package.json');
  
  if (!fs.existsSync(packageJsonPath)) {
    throw new Error(`package.json not found in ${projectPath}`);
  }

  const content = fs.readFileSync(packageJsonPath, 'utf-8');
  const pkg = JSON.parse(content);

  return pkg as PackageMetadata;
}

export function detectProjectType(metadata: PackageMetadata): ProjectType {
  const hasBin = metadata.bin && Object.keys(metadata.bin).length > 0;
  const hasMain = Boolean(metadata.main);
  
  // If it has bin entries, it's CLI or hybrid
  if (hasBin && hasMain) {
    return 'hybrid';
  } else if (hasBin) {
    return 'cli';
  } else {
    return 'library';
  }
}

export function extractRepoUrl(metadata: PackageMetadata): string | undefined {
  if (!metadata.repository) return undefined;
  
  if (typeof metadata.repository === 'string') {
    return metadata.repository;
  }
  
  if (metadata.repository.url) {
    // Clean up git+ prefix and .git suffix
    return metadata.repository.url
      .replace(/^git\+/, '')
      .replace(/\.git$/, '');
  }
  
  return undefined;
}

export function extractAuthorName(metadata: PackageMetadata): string {
  if (!metadata.author) return 'Author';
  
  if (typeof metadata.author === 'string') {
    // Parse "Name <email>" format
    const match = metadata.author.match(/^([^<]+)/);
    return match ? match[1].trim() : metadata.author;
  }
  
  return metadata.author.name || 'Author';
}

export function getNpmPackageName(metadata: PackageMetadata): string | undefined {
  return metadata.name;
}
