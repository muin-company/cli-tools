#!/usr/bin/env node

/**
 * bundlesize CLI - Bundle size analysis and tracking
 */

import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import { analyzeBundle, compareBundles } from './analyzer';
import { checkBundleSize } from './checker';
import { formatAnalysis, formatCheckResult, formatComparison, formatAsJson } from './formatter';
import { AnalyzeOptions, CheckOptions, CompareOptions } from './types';

const program = new Command();

program
  .name('bundlesize')
  .description('Keep your JavaScript bundles in check with interactive size analysis and tracking')
  .version('1.0.0');

// Analyze command
program
  .command('analyze <file>')
  .description('Analyze bundle size and composition')
  .option('-v, --verbose', 'Show detailed output', false)
  .option('--no-compress', 'Skip compression calculation', false)
  .option('--json', 'Output as JSON', false)
  .action(async (file: string, options) => {
    const spinner = ora('Analyzing bundle...').start();
    
    try {
      const analyzeOptions: AnalyzeOptions = {
        includeComposition: options.verbose,
        verbose: options.verbose,
        noCompress: !options.compress,
      };
      
      const analysis = await analyzeBundle(file, analyzeOptions);
      spinner.succeed('Analysis complete');
      
      if (options.json) {
        console.log(formatAsJson(analysis));
      } else {
        console.log(formatAnalysis(analysis, options.verbose));
      }
    } catch (error) {
      spinner.fail('Analysis failed');
      console.error(chalk.red('Error:'), error instanceof Error ? error.message : error);
      process.exit(1);
    }
  });

// Check command
program
  .command('check <file>')
  .description('Check bundle size against limits')
  .option('--max-size <size>', 'Maximum allowed size (e.g., 200kb, 1.5mb)')
  .option('--max-gzip <size>', 'Maximum gzipped size')
  .option('--max-brotli <size>', 'Maximum brotli compressed size')
  .option('--fail-on-increase', 'Fail if size increased from baseline', false)
  .option('--threshold <percent>', 'Fail if size increase exceeds percentage')
  .option('--json', 'Output as JSON', false)
  .action(async (file: string, options) => {
    if (!options.maxSize && !options.maxGzip && !options.maxBrotli) {
      console.error(chalk.red('Error: At least one size limit must be specified'));
      console.error(chalk.dim('Use --max-size, --max-gzip, or --max-brotli'));
      process.exit(1);
    }
    
    const spinner = ora('Checking bundle size...').start();
    
    try {
      const checkOptions: CheckOptions = {
        maxSize: options.maxSize,
        maxGzip: options.maxGzip,
        maxBrotli: options.maxBrotli,
        failOnIncrease: options.failOnIncrease,
        threshold: options.threshold ? parseFloat(options.threshold) : undefined,
      };
      
      const result = await checkBundleSize(file, checkOptions);
      spinner.stop();
      
      if (options.json) {
        console.log(formatAsJson(result));
      } else {
        console.log(formatCheckResult(result));
      }
      
      if (!result.passed) {
        process.exit(1);
      }
    } catch (error) {
      spinner.fail('Check failed');
      console.error(chalk.red('Error:'), error instanceof Error ? error.message : error);
      process.exit(1);
    }
  });

// Compare command
program
  .command('compare <file>')
  .description('Compare bundle with baseline')
  .option('--base <file>', 'Baseline file for comparison')
  .option('--show-diff', 'Show file-by-file differences', false)
  .option('--json', 'Output comparison as JSON', false)
  .action(async (file: string, options) => {
    if (!options.base) {
      console.error(chalk.red('Error: --base option is required'));
      console.error(chalk.dim('Example: bundlesize compare dist/main.js --base dist/main.baseline.js'));
      process.exit(1);
    }
    
    const spinner = ora('Comparing bundles...').start();
    
    try {
      spinner.text = 'Analyzing baseline...';
      const baseAnalysis = await analyzeBundle(options.base);
      
      spinner.text = 'Analyzing current bundle...';
      const currentAnalysis = await analyzeBundle(file);
      
      const changes = compareBundles(baseAnalysis, currentAnalysis);
      
      const compareResult = {
        bundle: file,
        base: baseAnalysis,
        current: currentAnalysis,
        changes,
      };
      
      spinner.succeed('Comparison complete');
      
      if (options.json) {
        console.log(formatAsJson(compareResult));
      } else {
        console.log(formatComparison(compareResult));
      }
    } catch (error) {
      spinner.fail('Comparison failed');
      console.error(chalk.red('Error:'), error instanceof Error ? error.message : error);
      process.exit(1);
    }
  });

// Report command
program
  .command('report <file>')
  .description('Generate detailed report')
  .option('-f, --format <type>', 'Report format: text, json, markdown', 'text')
  .option('-o, --output <file>', 'Write report to file')
  .action(async (file: string, options) => {
    const spinner = ora('Generating report...').start();
    
    try {
      const analysis = await analyzeBundle(file, { 
        includeComposition: true,
        verbose: true,
      });
      
      spinner.succeed('Report generated');
      
      if (options.format === 'json') {
        const output = formatAsJson(analysis);
        console.log(output);
      } else {
        const output = formatAnalysis(analysis, true);
        console.log(output);
      }
      
      if (options.output) {
        console.log(chalk.dim(`\n(File output not yet implemented)`));
      }
    } catch (error) {
      spinner.fail('Report generation failed');
      console.error(chalk.red('Error:'), error instanceof Error ? error.message : error);
      process.exit(1);
    }
  });

// Track command (placeholder)
program
  .command('track <file>')
  .description('Track size over time')
  .option('--save', 'Save to history', false)
  .action(async (file: string, options) => {
    console.log(chalk.yellow('Track command not yet implemented'));
    console.log(chalk.dim('This will track bundle size changes over time'));
  });

// Treemap command (placeholder)
program
  .command('treemap <file>')
  .description('Generate treemap visualization')
  .action(async (file: string) => {
    console.log(chalk.yellow('Treemap command not yet implemented'));
    console.log(chalk.dim('This will generate an interactive treemap visualization'));
  });

// Interactive mode (placeholder)
program
  .option('-i, --interactive', 'Launch interactive mode', false)
  .action((options) => {
    if (options.interactive) {
      console.log(chalk.yellow('Interactive mode not yet implemented'));
      console.log(chalk.dim('This will launch an interactive CLI wizard'));
    }
  });

// Parse arguments
program.parse(process.argv);

// Show help if no command provided
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
