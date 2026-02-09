import {
  parsePackageJson,
  detectProjectType,
  extractRepoUrl,
  extractAuthorName,
  getNpmPackageName,
} from './parser.js';
import { generateReadme, writeReadme } from './generator.js';
import { ReadmeContext, ReadmeConfig, ProjectType } from './types.js';

export interface GenerateOptions {
  projectPath?: string;
  projectType?: ProjectType;
  output?: string;
  dryRun?: boolean;
}

export async function generate(options: GenerateOptions = {}): Promise<string> {
  const projectPath = options.projectPath || process.cwd();
  
  // Parse package.json
  const metadata = parsePackageJson(projectPath);
  
  // Detect or use provided project type
  const projectType = options.projectType || detectProjectType(metadata);
  
  // Extract additional metadata
  const authorName = extractAuthorName(metadata);
  const repoUrl = extractRepoUrl(metadata);
  const npmPackageName = getNpmPackageName(metadata);
  
  // Create config (default values for now)
  const config: ReadmeConfig = {
    projectType,
    includeBadges: true,
    includeTOC: false,
    includeInstallation: true,
    includeUsage: true,
    includeContributing: true,
    includeLicense: true,
  };
  
  // Build context
  const context: ReadmeContext = {
    metadata,
    projectType,
    config,
    authorName,
    repoUrl,
    npmPackageName,
  };
  
  // Generate README content
  const content = generateReadme(context);
  
  // Write to file unless dry run
  if (!options.dryRun) {
    const outputPath = options.output || projectPath;
    writeReadme(content, outputPath);
  }
  
  return content;
}

// Export all utilities for library usage
export * from './types.js';
export * from './parser.js';
export * from './generator.js';
