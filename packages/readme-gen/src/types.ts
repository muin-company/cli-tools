export interface PackageMetadata {
  name: string;
  version: string;
  description?: string;
  author?: string | { name: string; email?: string };
  license?: string;
  repository?: string | { type: string; url: string };
  homepage?: string;
  bugs?: string | { url: string };
  keywords?: string[];
  bin?: Record<string, string>;
  main?: string;
  engines?: { node?: string };
  scripts?: Record<string, string>;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
}

export type ProjectType = 'cli' | 'library' | 'hybrid';

export interface ReadmeConfig {
  projectType: ProjectType;
  includeBadges: boolean;
  includeTOC: boolean;
  includeInstallation: boolean;
  includeUsage: boolean;
  includeContributing: boolean;
  includeLicense: boolean;
}

export interface ReadmeContext {
  metadata: PackageMetadata;
  projectType: ProjectType;
  config: ReadmeConfig;
  authorName: string;
  repoUrl?: string;
  npmPackageName?: string;
}
