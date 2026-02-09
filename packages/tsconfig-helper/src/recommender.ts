/**
 * Generate recommendations for TypeScript configuration
 */

import { TSConfig, ProjectType, StrictnessLevel, Recommendation, RecommendationOptions } from './types';

export class TSConfigRecommender {
  /**
   * Generate recommended config based on project type
   */
  static recommend(options: RecommendationOptions): Recommendation {
    const projectType = options.projectType || 'vanilla';
    const strictness = options.strictness || 'recommended';

    const config = this.getBaseConfig(projectType, strictness);
    const explanation = this.getExplanation(projectType, strictness);

    return { config, explanation };
  }

  /**
   * Get base configuration for project type
   */
  private static getBaseConfig(projectType: ProjectType, strictness: StrictnessLevel): TSConfig {
    const base = this.getCommonConfig(strictness);

    switch (projectType) {
      case 'react':
        return this.getReactConfig(base);
      case 'node':
        return this.getNodeConfig(base);
      case 'library':
        return this.getLibraryConfig(base);
      case 'vue':
        return this.getVueConfig(base);
      case 'next':
        return this.getNextConfig(base);
      default:
        return base;
    }
  }

  /**
   * Common configuration for all project types
   */
  private static getCommonConfig(strictness: StrictnessLevel): TSConfig {
    const base: TSConfig = {
      compilerOptions: {
        target: 'ES2020',
        module: 'ESNext',
        moduleResolution: 'bundler',
        esModuleInterop: true,
        skipLibCheck: true,
        forceConsistentCasingInFileNames: true,
        resolveJsonModule: true,
      },
    };

    // Add strictness options
    if (strictness === 'recommended' || strictness === 'strict' || strictness === 'ultra') {
      base.compilerOptions!.strict = true;
      base.compilerOptions!.noUnusedLocals = true;
      base.compilerOptions!.noUnusedParameters = true;
      base.compilerOptions!.noFallthroughCasesInSwitch = true;
    }

    if (strictness === 'strict' || strictness === 'ultra') {
      base.compilerOptions!.noImplicitReturns = true;
      base.compilerOptions!.noUncheckedIndexedAccess = true;
    }

    if (strictness === 'ultra') {
      base.compilerOptions!.exactOptionalPropertyTypes = true;
      base.compilerOptions!.noPropertyAccessFromIndexSignature = true;
    }

    return base;
  }

  /**
   * React-specific configuration
   */
  private static getReactConfig(base: TSConfig): TSConfig {
    return {
      ...base,
      compilerOptions: {
        ...base.compilerOptions,
        lib: ['ES2020', 'DOM', 'DOM.Iterable'],
        jsx: 'react-jsx',
        isolatedModules: true,
        noEmit: true,
      },
      include: ['src'],
      exclude: ['node_modules', 'dist'],
    };
  }

  /**
   * Node.js-specific configuration
   */
  private static getNodeConfig(base: TSConfig): TSConfig {
    return {
      ...base,
      compilerOptions: {
        ...base.compilerOptions,
        lib: ['ES2020'],
        module: 'CommonJS',
        moduleResolution: 'node',
        outDir: './dist',
        rootDir: './src',
      },
      include: ['src'],
      exclude: ['node_modules', 'dist'],
    };
  }

  /**
   * Library-specific configuration
   */
  private static getLibraryConfig(base: TSConfig): TSConfig {
    return {
      ...base,
      compilerOptions: {
        ...base.compilerOptions,
        lib: ['ES2020'],
        declaration: true,
        declarationMap: true,
        sourceMap: true,
        outDir: './dist',
        rootDir: './src',
        removeComments: false,
      },
      include: ['src'],
      exclude: ['node_modules', 'dist', '**/*.spec.ts', '**/*.test.ts'],
    };
  }

  /**
   * Vue-specific configuration
   */
  private static getVueConfig(base: TSConfig): TSConfig {
    return {
      ...base,
      compilerOptions: {
        ...base.compilerOptions,
        lib: ['ES2020', 'DOM', 'DOM.Iterable'],
        jsx: 'preserve',
        isolatedModules: true,
        noEmit: true,
      },
      include: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.vue'],
      exclude: ['node_modules', 'dist'],
    };
  }

  /**
   * Next.js-specific configuration
   */
  private static getNextConfig(base: TSConfig): TSConfig {
    return {
      ...base,
      compilerOptions: {
        ...base.compilerOptions,
        lib: ['ES2020', 'DOM', 'DOM.Iterable'],
        jsx: 'preserve',
        isolatedModules: true,
        noEmit: true,
        incremental: true,
        plugins: [{ name: 'next' }],
      },
      include: ['next-env.d.ts', '**/*.ts', '**/*.tsx', '.next/types/**/*.ts'],
      exclude: ['node_modules'],
    };
  }

  /**
   * Get explanation for recommended config
   */
  private static getExplanation(projectType: ProjectType, strictness: StrictnessLevel): Array<{ option: string; reason: string }> {
    const common = [
      { option: 'target: ES2020', reason: 'Modern JavaScript features with broad support' },
      { option: 'esModuleInterop: true', reason: 'Better CommonJS/ESM compatibility' },
      { option: 'skipLibCheck: true', reason: 'Faster type checking' },
    ];

    if (projectType === 'react') {
      common.push(
        { option: 'jsx: react-jsx', reason: 'New JSX transform (React 17+)' },
        { option: 'isolatedModules: true', reason: 'Required for Vite/esbuild' },
        { option: 'noEmit: true', reason: 'Bundler handles transpilation' }
      );
    }

    if (projectType === 'node') {
      common.push(
        { option: 'module: CommonJS', reason: 'Standard for Node.js' },
        { option: 'moduleResolution: node', reason: 'Node.js module resolution' }
      );
    }

    if (projectType === 'library') {
      common.push(
        { option: 'declaration: true', reason: 'Generate .d.ts files for consumers' },
        { option: 'declarationMap: true', reason: 'Enable go-to-definition in consumers' },
        { option: 'sourceMap: true', reason: 'Enable debugging' }
      );
    }

    if (strictness !== 'loose') {
      common.push({ option: 'strict: true', reason: 'Catch more bugs at compile time' });
    }

    return common;
  }

  /**
   * Get preset configurations
   */
  static getPreset(name: string): TSConfig {
    const presets: { [key: string]: TSConfig } = {
      react: this.getReactConfig(this.getCommonConfig('recommended')),
      node: this.getNodeConfig(this.getCommonConfig('recommended')),
      library: this.getLibraryConfig(this.getCommonConfig('recommended')),
      vue: this.getVueConfig(this.getCommonConfig('recommended')),
      next: this.getNextConfig(this.getCommonConfig('recommended')),
    };

    return presets[name] || this.getCommonConfig('recommended');
  }
}
