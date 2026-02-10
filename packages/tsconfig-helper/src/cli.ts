#!/usr/bin/env node

/**
 * CLI entry point for tsconfig-helper
 */

import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import { TSConfigParser } from './parser';
import { TSConfigValidator } from './validator';
import { TSConfigRecommender } from './recommender';
import { DisplayUtils, FileUtils } from './utils';
import { ProjectType, StrictnessLevel } from './types';

const program = new Command();

program
  .name('tsconfig-helper')
  .description('Validate, optimize, and understand your TypeScript configuration')
  .version('1.0.0');

/**
 * Validate command
 */
program
  .command('validate')
  .description('Validate tsconfig.json')
  .option('-c, --config <file>', 'Config file path', 'tsconfig.json')
  .option('--strict', 'Enable strict validation (fail on warnings)')
  .option('--fix', 'Auto-fix common issues')
  .action((options) => {
    const spinner = ora('Validating configuration...').start();

    try {
      const config = TSConfigParser.parse(options.config);
      const result = TSConfigValidator.validate(config);

      spinner.stop();

      console.log(DisplayUtils.formatValidationResults(result));

      if (!result.valid) {
        process.exit(1);
      }

      if (options.strict && result.warnings.length > 0) {
        console.log(chalk.yellow('\n⚠️  Strict mode: Warnings found'));
        process.exit(1);
      }

      console.log(chalk.green('\n✅ Configuration is valid!'));
    } catch (error) {
      spinner.fail('Validation failed');
      console.error(chalk.red((error as Error).message));
      process.exit(1);
    }
  });

/**
 * Recommend command
 */
program
  .command('recommend')
  .description('Get recommendations for your project')
  .option('-p, --project-type <type>', 'Project type (react, node, library, vue, next)')
  .option('-s, --strictness <level>', 'Strictness level (loose, recommended, strict, ultra)')
  .option('-c, --config <file>', 'Existing config file to analyze', 'tsconfig.json')
  .action((options) => {
    const spinner = ora('Generating recommendations...').start();

    try {
      const projectType = (options.projectType || 'vanilla') as ProjectType;
      const strictness = (options.strictness || 'recommended') as StrictnessLevel;

      const recommendation = TSConfigRecommender.recommend({
        projectType,
        strictness,
      });

      spinner.succeed('Recommendations generated');

      console.log(chalk.cyan.bold('\n🎯 Recommended Configuration\n'));
      console.log(DisplayUtils.formatConfig(recommendation.config));

      console.log(chalk.cyan.bold('\n📖 Explanation\n'));
      recommendation.explanation.forEach(({ option, reason }) => {
        console.log(`  ${chalk.bold(option)}`);
        console.log(`    ${chalk.dim('→')} ${reason}\n`);
      });
    } catch (error) {
      spinner.fail('Failed to generate recommendations');
      console.error(chalk.red((error as Error).message));
      process.exit(1);
    }
  });

/**
 * Init command
 */
program
  .command('init')
  .description('Initialize a new tsconfig.json')
  .option('--preset <name>', 'Use preset (react, node, library, vue, next)')
  .option('--overwrite', 'Overwrite existing tsconfig.json')
  .action((options) => {
    const configPath = 'tsconfig.json';

    if (FileUtils.exists(configPath) && !options.overwrite) {
      console.error(chalk.red('❌ tsconfig.json already exists. Use --overwrite to replace it.'));
      process.exit(1);
    }

    const spinner = ora('Creating tsconfig.json...').start();

    try {
      const preset = options.preset || 'vanilla';
      const config = TSConfigRecommender.getPreset(preset);

      if (FileUtils.exists(configPath)) {
        FileUtils.backup(configPath);
      }

      TSConfigParser.write(configPath, config);

      spinner.succeed('tsconfig.json created successfully!');

      console.log(chalk.cyan.bold('\n📄 Generated Configuration\n'));
      console.log(DisplayUtils.formatConfig(config));
      console.log(chalk.green('\n✅ Configuration saved to tsconfig.json'));
    } catch (error) {
      spinner.fail('Failed to create tsconfig.json');
      console.error(chalk.red((error as Error).message));
      process.exit(1);
    }
  });

/**
 * Explain command
 */
program
  .command('explain <option>')
  .description('Explain a TypeScript compiler option')
  .action((option) => {
    const explanations: { [key: string]: { description: string; example: string } } = {
      strict: {
        description: 'Enable all strict type-checking options',
        example: 'Includes strictNullChecks, noImplicitAny, strictFunctionTypes, etc.',
      },
      target: {
        description: 'Set the JavaScript language version for emitted JavaScript',
        example: 'ES2020, ES2021, ESNext',
      },
      module: {
        description: 'Specify what module code is generated',
        example: 'CommonJS, ESNext, AMD',
      },
      jsx: {
        description: 'Specify JSX code generation',
        example: 'react, react-jsx, preserve',
      },
      esModuleInterop: {
        description: 'Emit additional JavaScript to ease support for importing CommonJS modules',
        example: 'Enables default imports from modules with no default export',
      },
      skipLibCheck: {
        description: 'Skip type checking of declaration files',
        example: 'Speeds up compilation by skipping .d.ts files',
      },
    };

    const info = explanations[option];

    if (!info) {
      console.log(chalk.yellow(`⚠️  No explanation found for "${option}"`));
      console.log(chalk.dim('\nAvailable options: ' + Object.keys(explanations).join(', ')));
      return;
    }

    console.log(chalk.cyan.bold(`\n📖 ${option}\n`));
    console.log(chalk.bold('Description:'));
    console.log(`  ${info.description}\n`);
    console.log(chalk.bold('Example:'));
    console.log(`  ${info.example}\n`);
  });

/**
 * Strictness command
 */
program
  .command('strictness')
  .description('Check strictness level of configuration')
  .option('-c, --config <file>', 'Config file path', 'tsconfig.json')
  .action((options) => {
    try {
      const config = TSConfigParser.parse(options.config);
      const strictness = TSConfigValidator.checkStrictness(config.compilerOptions || {});

      console.log(chalk.cyan.bold('\n🎚️  TypeScript Strictness Analysis\n'));
      console.log(`Overall Strictness: ${DisplayUtils.formatStrictness(strictness.level)}\n`);

      console.log(chalk.green.bold('Enabled Checks:'));
      strictness.enabled.forEach(check => {
        console.log(`  ✅ ${check}`);
      });

      console.log(chalk.yellow.bold('\nDisabled Checks:'));
      strictness.disabled.forEach(check => {
        console.log(`  ❌ ${check}`);
      });

      console.log();
    } catch (error) {
      console.error(chalk.red((error as Error).message));
      process.exit(1);
    }
  });

/**
 * Compare command
 */
program
  .command('compare <file1> <file2>')
  .description('Compare two tsconfig files')
  .option('--show-diff', 'Show detailed differences')
  .action((file1, file2, options) => {
    try {
      const config1 = TSConfigParser.parse(file1);
      const config2 = TSConfigParser.parse(file2);

      console.log(chalk.cyan.bold(`\n📊 Comparing: ${file1} ↔ ${file2}\n`));

      const opts1 = config1.compilerOptions || {};
      const opts2 = config2.compilerOptions || {};

      const allKeys = new Set([...Object.keys(opts1), ...Object.keys(opts2)]);

      let diffCount = 0;

      allKeys.forEach(key => {
        const v1 = opts1[key];
        const v2 = opts2[key];

        if (JSON.stringify(v1) !== JSON.stringify(v2)) {
          diffCount++;
          if (options.showDiff) {
            console.log(DisplayUtils.formatDiff(key, v1, v2));
          } else {
            console.log(`  ${chalk.yellow('≠')} ${chalk.bold(key)}: ${JSON.stringify(v1)} → ${JSON.stringify(v2)}`);
          }
        }
      });

      if (diffCount === 0) {
        console.log(chalk.green('✅ Configurations are identical'));
      } else {
        console.log(chalk.yellow(`\n⚠️  Found ${diffCount} difference(s)`));
      }
    } catch (error) {
      console.error(chalk.red((error as Error).message));
      process.exit(1);
    }
  });

program.parse(process.argv);

// Show help if no command provided
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
