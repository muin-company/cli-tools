/**
 * Validate TypeScript configuration
 */

import { TSConfig, ValidationResult, ValidationIssue, CompilerOptions } from './types';

export class TSConfigValidator {
  /**
   * Validate a TypeScript configuration
   */
  static validate(config: TSConfig): ValidationResult {
    const errors: ValidationIssue[] = [];
    const warnings: ValidationIssue[] = [];
    const suggestions: ValidationIssue[] = [];

    const options = config.compilerOptions || {};

    // Check for errors
    errors.push(...this.checkErrors(options));
    
    // Check for warnings
    warnings.push(...this.checkWarnings(options));
    
    // Check for suggestions
    suggestions.push(...this.checkSuggestions(options));

    return {
      valid: errors.length === 0,
      errors,
      warnings,
      suggestions,
    };
  }

  /**
   * Check for configuration errors
   */
  private static checkErrors(options: CompilerOptions): ValidationIssue[] {
    const errors: ValidationIssue[] = [];

    // Check for deprecated options
    if ('importsNotUsedAsValues' in options) {
      errors.push({
        type: 'error',
        option: 'importsNotUsedAsValues',
        message: 'This option is deprecated in TypeScript 5.0+',
        recommendation: 'Use "verbatimModuleSyntax" instead',
        fix: 'Remove "importsNotUsedAsValues" and add "verbatimModuleSyntax": true',
      });
    }

    if ('preserveValueImports' in options) {
      errors.push({
        type: 'error',
        option: 'preserveValueImports',
        message: 'This option is deprecated in TypeScript 5.0+',
        recommendation: 'Use "verbatimModuleSyntax" instead',
        fix: 'Remove "preserveValueImports" and add "verbatimModuleSyntax": true',
      });
    }

    // Check for conflicting options
    if (options.module === 'ES6' || options.module === 'ES2015') {
      errors.push({
        type: 'error',
        option: 'module',
        message: 'Use "ESNext" or "ES2020" instead of "ES6" or "ES2015"',
        recommendation: 'module: "ESNext"',
      });
    }

    return errors;
  }

  /**
   * Check for configuration warnings
   */
  private static checkWarnings(options: CompilerOptions): ValidationIssue[] {
    const warnings: ValidationIssue[] = [];

    // Check target
    if (options.target && ['ES3', 'ES5', 'ES2015'].includes(options.target)) {
      warnings.push({
        type: 'warning',
        option: 'target',
        message: `Target "${options.target}" is very old`,
        recommendation: 'Use "ES2020" or newer for modern features',
        impact: 'Missing modern features, larger output',
      });
    }

    // Check esModuleInterop
    if (options.esModuleInterop === false) {
      warnings.push({
        type: 'warning',
        option: 'esModuleInterop',
        message: 'esModuleInterop is disabled',
        recommendation: 'Set to true for better CommonJS/ESM compatibility',
        impact: 'Makes importing CommonJS modules harder',
      });
    }

    // Check skipLibCheck
    if (options.skipLibCheck === false) {
      warnings.push({
        type: 'warning',
        option: 'skipLibCheck',
        message: 'skipLibCheck is disabled',
        recommendation: 'Enable for faster builds',
        impact: 'Slower type checking',
      });
    }

    // Check strict mode
    if (!options.strict) {
      warnings.push({
        type: 'warning',
        option: 'strict',
        message: 'Strict mode is not enabled',
        recommendation: 'Enable strict mode for better type safety',
        impact: 'Missing important type checks',
      });
    }

    return warnings;
  }

  /**
   * Check for configuration suggestions
   */
  private static checkSuggestions(options: CompilerOptions): ValidationIssue[] {
    const suggestions: ValidationIssue[] = [];

    // Suggest moduleResolution
    if (!options.moduleResolution) {
      suggestions.push({
        type: 'suggestion',
        option: 'moduleResolution',
        message: 'Consider adding "moduleResolution"',
        recommendation: '"moduleResolution": "bundler" for modern bundlers',
      });
    }

    // Suggest resolveJsonModule
    if (!options.resolveJsonModule) {
      suggestions.push({
        type: 'suggestion',
        option: 'resolveJsonModule',
        message: 'Consider enabling JSON imports',
        recommendation: '"resolveJsonModule": true',
      });
    }

    // Suggest isolatedModules
    if (!options.isolatedModules) {
      suggestions.push({
        type: 'suggestion',
        option: 'isolatedModules',
        message: 'Consider enabling for better Babel/bundler compatibility',
        recommendation: '"isolatedModules": true',
      });
    }

    // Suggest noEmit for bundler projects
    if (options.moduleResolution === 'bundler' && options.noEmit !== true) {
      suggestions.push({
        type: 'suggestion',
        option: 'noEmit',
        message: 'Consider "noEmit": true if using a bundler',
        recommendation: 'Let the bundler handle transpilation',
      });
    }

    // Suggest additional strict checks
    if (options.strict && !options.noUnusedLocals) {
      suggestions.push({
        type: 'suggestion',
        option: 'noUnusedLocals',
        message: 'Consider enabling "noUnusedLocals"',
        recommendation: 'Catch unused variables',
      });
    }

    if (options.strict && !options.noUnusedParameters) {
      suggestions.push({
        type: 'suggestion',
        option: 'noUnusedParameters',
        message: 'Consider enabling "noUnusedParameters"',
        recommendation: 'Catch unused function parameters',
      });
    }

    return suggestions;
  }

  /**
   * Check strictness level (0-5)
   */
  static checkStrictness(options: CompilerOptions): {
    level: number;
    enabled: string[];
    disabled: string[];
  } {
    const strictChecks = [
      'strict',
      'strictNullChecks',
      'noImplicitAny',
      'strictFunctionTypes',
      'strictBindCallApply',
      'strictPropertyInitialization',
      'noUnusedLocals',
      'noUnusedParameters',
      'noImplicitReturns',
      'noFallthroughCasesInSwitch',
      'noUncheckedIndexedAccess',
      'exactOptionalPropertyTypes',
    ];

    const enabled = strictChecks.filter(check => options[check] === true);
    const disabled = strictChecks.filter(check => !options[check]);

    const level = Math.round((enabled.length / strictChecks.length) * 5);

    return { level, enabled, disabled };
  }
}
