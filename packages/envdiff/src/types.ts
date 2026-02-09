/**
 * Types for envdiff
 */

export interface EnvVariable {
  key: string;
  value: string;
  line: number;
}

export interface EnvFile {
  path: string;
  variables: Map<string, EnvVariable>;
}

export enum DiffType {
  ADDED = 'added',
  REMOVED = 'removed',
  MODIFIED = 'modified',
  UNCHANGED = 'unchanged',
}

export interface Difference {
  key: string;
  type: DiffType;
  leftValue?: string;
  rightValue?: string;
  leftLine?: number;
  rightLine?: number;
}

export interface ComparisonResult {
  left: EnvFile;
  right: EnvFile;
  differences: Difference[];
  summary: {
    total: number;
    added: number;
    removed: number;
    modified: number;
    unchanged: number;
  };
}

export interface CompareOptions {
  showValues?: boolean;
  keysOnly?: boolean;
  maskSecrets?: boolean;
}
