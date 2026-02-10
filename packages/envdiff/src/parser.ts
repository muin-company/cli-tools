/**
 * Parser for .env files
 */

import * as fs from 'fs';
import * as path from 'path';
import { EnvFile, EnvVariable } from './types';

/**
 * Parse a .env file and extract variables
 */
export function parseEnvFile(filePath: string): EnvFile {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const variables = new Map<string, EnvVariable>();

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    
    // Skip empty lines and comments
    if (!trimmed || trimmed.startsWith('#')) {
      return;
    }

    // Parse KEY=VALUE format
    const match = trimmed.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
    if (match) {
      const [, key, rawValue] = match;
      
      // Handle quoted values
      let value = rawValue.trim();
      if ((value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }

      variables.set(key, {
        key,
        value,
        line: index + 1,
      });
    }
  });

  return {
    path: path.resolve(filePath),
    variables,
  };
}

/**
 * Check if a variable key suggests it contains a secret
 */
export function isLikelySecret(key: string): boolean {
  const secretPatterns = [
    /secret/i,
    /key/i,
    /token/i,
    /password/i,
    /pwd/i,
    /credential/i,
    /auth/i,
  ];

  return secretPatterns.some(pattern => pattern.test(key));
}

/**
 * Mask a value for display
 */
export function maskValue(value: string, key: string, shouldMask: boolean = true): string {
  if (!shouldMask) {
    return value;
  }

  if (isLikelySecret(key)) {
    if (value.length <= 4) {
      return '***';
    }
    return value.slice(0, 4) + '*'.repeat(Math.min(6, value.length - 4));
  }

  // Mask long values
  if (value.length > 50) {
    return value.slice(0, 30) + '...' + value.slice(-10);
  }

  return value;
}
