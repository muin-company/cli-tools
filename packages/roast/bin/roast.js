#!/usr/bin/env node

import { program } from 'commander';
import { roastFile } from '../lib/roast.js';
import chalk from 'chalk';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packageJson = JSON.parse(readFileSync(join(__dirname, '../package.json'), 'utf-8'));

program
  .name('roast')
  .description('AI code reviewer that roasts your code (with love)')
  .version(packageJson.version)
  .argument('<file>', 'code file to roast')
  .option('-s, --serious', 'serious mode (professional review)')
  .option('--severity <level>', 'roast severity: mild, medium, harsh', 'medium')
  .option('-m, --model <model>', 'AI model to use', 'claude-sonnet-4-5-20250929')
  .option('--no-color', 'disable colors')
  .action(async (file, options) => {
    try {
      // Validate severity level
      const validSeverities = ['mild', 'medium', 'harsh'];
      if (options.severity && !validSeverities.includes(options.severity)) {
        console.error(chalk.red(`Invalid severity level: ${options.severity}`));
        console.error(chalk.gray(`Valid options: ${validSeverities.join(', ')}`));
        process.exit(1);
      }
      await roastFile(file, options);
    } catch (error) {
      console.error(chalk.red('💥 Error:'), error.message);
      process.exit(1);
    }
  });

program.parse();
