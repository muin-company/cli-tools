/**
 * Parse and load tsconfig.json files
 */

import * as fs from 'fs';
import * as path from 'path';
import { TSConfig } from './types';

export class TSConfigParser {
  /**
   * Parse tsconfig.json file with comments support
   */
  static parse(filePath: string): TSConfig {
    const absolutePath = path.resolve(filePath);
    
    if (!fs.existsSync(absolutePath)) {
      throw new Error(`Config file not found: ${absolutePath}`);
    }

    const content = fs.readFileSync(absolutePath, 'utf-8');
    
    try {
      // Remove comments (basic implementation)
      const cleanedContent = this.removeComments(content);
      const config = JSON.parse(cleanedContent);
      
      return config;
    } catch (error) {
      throw new Error(`Failed to parse ${filePath}: ${(error as Error).message}`);
    }
  }

  /**
   * Remove JSON comments (single-line and multi-line)
   */
  private static removeComments(content: string): string {
    // Remove single-line comments
    let result = content.replace(/\/\/.*$/gm, '');
    
    // Remove multi-line comments
    result = result.replace(/\/\*[\s\S]*?\*\//g, '');
    
    return result;
  }

  /**
   * Resolve extended configs
   */
  static resolveExtends(config: TSConfig, basePath: string): TSConfig {
    if (!config.extends) {
      return config;
    }

    const extendsPath = this.resolveExtendsPath(config.extends, basePath);
    const baseConfig = this.parse(extendsPath);
    const resolvedBase = this.resolveExtends(baseConfig, path.dirname(extendsPath));

    // Merge configs (compilerOptions, include, exclude)
    return {
      ...resolvedBase,
      ...config,
      compilerOptions: {
        ...resolvedBase.compilerOptions,
        ...config.compilerOptions,
      },
    };
  }

  /**
   * Resolve extends path (handles npm packages and relative paths)
   */
  private static resolveExtendsPath(extendsValue: string, basePath: string): string {
    // Handle relative paths
    if (extendsValue.startsWith('./') || extendsValue.startsWith('../')) {
      return path.resolve(basePath, extendsValue);
    }

    // Handle npm package (e.g., "@tsconfig/node18")
    // Simple implementation: try node_modules
    const nodeModulesPath = path.join(basePath, 'node_modules', extendsValue, 'tsconfig.json');
    if (fs.existsSync(nodeModulesPath)) {
      return nodeModulesPath;
    }

    // Fallback: treat as relative
    return path.resolve(basePath, extendsValue);
  }

  /**
   * Write tsconfig.json with formatting
   */
  static write(filePath: string, config: TSConfig): void {
    const content = JSON.stringify(config, null, 2);
    fs.writeFileSync(filePath, content, 'utf-8');
  }
}
