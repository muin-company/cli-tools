/**
 * TypeScript configuration types and interfaces
 */

export interface CompilerOptions {
  [key: string]: any;
  target?: string;
  module?: string;
  lib?: string[];
  jsx?: string;
  strict?: boolean;
  esModuleInterop?: boolean;
  skipLibCheck?: boolean;
  forceConsistentCasingInFileNames?: boolean;
  moduleResolution?: string;
  resolveJsonModule?: boolean;
  isolatedModules?: boolean;
  noEmit?: boolean;
}

export interface TSConfig {
  compilerOptions?: CompilerOptions;
  include?: string[];
  exclude?: string[];
  extends?: string;
  files?: string[];
  references?: Array<{ path: string }>;
}

export interface ValidationIssue {
  type: 'error' | 'warning' | 'suggestion';
  option?: string;
  message: string;
  recommendation?: string;
  impact?: string;
  fix?: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationIssue[];
  warnings: ValidationIssue[];
  suggestions: ValidationIssue[];
}

export type ProjectType = 'react' | 'node' | 'library' | 'vue' | 'next' | 'express' | 'vanilla';
export type StrictnessLevel = 'loose' | 'recommended' | 'strict' | 'ultra';

export interface RecommendationOptions {
  projectType?: ProjectType;
  strictness?: StrictnessLevel;
  features?: string[];
}

export interface Recommendation {
  config: TSConfig;
  explanation: Array<{
    option: string;
    reason: string;
  }>;
}
