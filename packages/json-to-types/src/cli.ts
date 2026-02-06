#!/usr/bin/env node

import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import * as fs from 'fs';
import { convertJSON, TypeOutput, OutputFormat } from './converter';

const program = new Command();

program
  .name('json-to-types')
  .description('Convert JSON to TypeScript, Zod, Python types')
  .version('1.0.0');

program
  .argument('[file]', 'JSON file to convert (or stdin)')
  .option('-t, --type <format>', 'Output format: ts-interface, ts-type, zod, python-typed, python-pydantic', 'ts-interface')
  .option('-i, --interactive', 'Interactive mode with live preview')
  .option('--optional', 'Make all fields optional')
  .option('--readonly', 'Make all fields readonly')
  .option('--exact', 'Use exact types (string literals instead of string)')
  .option('-o, --output <file>', 'Output file (default: stdout)')
  .action(async (file, options) => {
    try {
      // Read JSON input
      let jsonInput: string;
      
      if (file) {
        jsonInput = fs.readFileSync(file, 'utf-8');
      } else if (!process.stdin.isTTY) {
        // Read from stdin
        jsonInput = await readStdin();
      } else if (options.interactive) {
        // Interactive mode will ask for input
        jsonInput = '';
      } else {
        console.error(chalk.red('Error: No input provided. Use a file argument, pipe JSON, or --interactive mode.'));
        process.exit(1);
      }

      if (options.interactive) {
        await interactiveMode(jsonInput);
      } else {
        const result = convertJSON(jsonInput, {
          format: options.type as OutputFormat,
          optional: options.optional,
          readonly: options.readonly,
          exact: options.exact,
        });

        if (options.output) {
          fs.writeFileSync(options.output, result);
          console.log(chalk.green(`✓ Types written to ${options.output}`));
        } else {
          console.log(result);
        }
      }
    } catch (error: any) {
      console.error(chalk.red('Error:'), error?.message || error);
      process.exit(1);
    }
  });

async function readStdin(): Promise<string> {
  const chunks: Buffer[] = [];
  
  for await (const chunk of process.stdin) {
    chunks.push(chunk);
  }
  
  return Buffer.concat(chunks).toString('utf-8');
}

async function interactiveMode(initialJson: string) {
  console.log(chalk.bold.cyan('\n🔧 JSON to Types - Interactive Mode\n'));

  // Step 1: Get JSON input if not provided
  let jsonInput = initialJson;
  
  if (!jsonInput) {
    const { json } = await inquirer.prompt([
      {
        type: 'editor',
        name: 'json',
        message: 'Paste your JSON (will open your editor):',
        validate: (input) => {
          try {
            JSON.parse(input);
            return true;
          } catch {
            return 'Invalid JSON. Please check syntax.';
          }
        },
      },
    ]);
    jsonInput = json;
  }

  // Validate JSON
  try {
    JSON.parse(jsonInput);
  } catch (error: any) {
    console.error(chalk.red('Invalid JSON:'), error?.message || error);
    process.exit(1);
  }

  // Step 2: Select output format
  const { format } = await inquirer.prompt([
    {
      type: 'list',
      name: 'format',
      message: 'Select output format:',
      choices: [
        { name: 'TypeScript Interface', value: 'ts-interface' },
        { name: 'TypeScript Type', value: 'ts-type' },
        { name: 'Zod Schema', value: 'zod' },
        { name: 'Python TypedDict', value: 'python-typed' },
        { name: 'Python Pydantic', value: 'python-pydantic' },
      ],
      default: 'ts-interface',
    },
  ]);

  // Step 3: Configure options
  const { options } = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'options',
      message: 'Select type options:',
      choices: [
        { name: 'Make all fields optional', value: 'optional' },
        { name: 'Make all fields readonly (TypeScript only)', value: 'readonly', disabled: !format.startsWith('ts') },
        { name: 'Use exact types (string literals)', value: 'exact' },
      ],
    },
  ]);

  const config = {
    format: format as OutputFormat,
    optional: options.includes('optional'),
    readonly: options.includes('readonly'),
    exact: options.includes('exact'),
  };

  // Step 4: Generate preview
  console.log(chalk.dim('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'));
  console.log(chalk.bold('Preview:\n'));

  const spinner = ora('Generating types...').start();
  
  try {
    const result = convertJSON(jsonInput, config);
    spinner.succeed('Types generated!');
    
    console.log(chalk.dim('─'.repeat(50)));
    console.log(result);
    console.log(chalk.dim('─'.repeat(50)));
    
    // Step 5: Copy or save
    const { action } = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: '\nWhat would you like to do?',
        choices: [
          { name: '📋 Copy to clipboard', value: 'copy' },
          { name: '💾 Save to file', value: 'save' },
          { name: '🔄 Regenerate with different options', value: 'regenerate' },
          { name: '❌ Exit', value: 'exit' },
        ],
      },
    ]);

    if (action === 'copy') {
      const { exec } = require('child_process');
      exec('pbcopy', (error: any, stdout: any, stderr: any) => {
        if (!error) {
          console.log(chalk.green('\n✓ Copied to clipboard!'));
        } else {
          console.log(chalk.yellow('\n⚠ Could not copy to clipboard. Please copy manually.'));
        }
      }).stdin.end(result);
    } else if (action === 'save') {
      const { filename } = await inquirer.prompt([
        {
          type: 'input',
          name: 'filename',
          message: 'Output filename:',
          default: `types.${format.includes('python') ? 'py' : 'ts'}`,
        },
      ]);
      
      fs.writeFileSync(filename, result);
      console.log(chalk.green(`\n✓ Types saved to ${filename}`));
    } else if (action === 'regenerate') {
      await interactiveMode(jsonInput);
      return;
    }
  } catch (error: any) {
    spinner.fail('Generation failed');
    console.error(chalk.red('Error:'), error?.message || error);
    process.exit(1);
  }
  
  console.log(chalk.dim('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'));
  console.log(chalk.cyan('Thanks for using json-to-types! 🎉\n'));
}

program.parse();
