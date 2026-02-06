#!/usr/bin/env node

import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import * as fs from 'fs';
import { convertCurl, CodeLanguage, ConversionOptions } from './converter';

const program = new Command();

program
  .name('curl-to-code')
  .description('Convert curl commands to production-ready code')
  .version('1.0.0');

program
  .argument('[curl-command]', 'curl command to convert (or stdin)')
  .option('-l, --lang <language>', 'Target language: python, javascript, node, fetch, axios, go, php, ruby', 'fetch')
  .option('-i, --interactive', 'Interactive mode with language selection and preview')
  .option('--error-handling', 'Include error handling boilerplate')
  .option('--async', 'Use async/await (JavaScript/Node.js)')
  .option('--types', 'Add TypeScript types (JavaScript/Node.js)')
  .option('-o, --output <file>', 'Output file (default: stdout)')
  .action(async (curlCommand, options) => {
    try {
      // Read curl command
      let curlInput: string;
      
      if (curlCommand) {
        curlInput = curlCommand;
      } else if (!process.stdin.isTTY) {
        // Read from stdin
        curlInput = await readStdin();
      } else if (options.interactive) {
        // Interactive mode will ask for input
        curlInput = '';
      } else {
        console.error(chalk.red('Error: No curl command provided. Use an argument, pipe input, or --interactive mode.'));
        process.exit(1);
      }

      if (options.interactive) {
        await interactiveMode(curlInput);
      } else {
        const result = convertCurl(curlInput, {
          language: options.lang as CodeLanguage,
          errorHandling: options.errorHandling,
          async: options.async,
          types: options.types,
        });

        if (options.output) {
          fs.writeFileSync(options.output, result);
          console.log(chalk.green(`✓ Code written to ${options.output}`));
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

async function interactiveMode(initialCurl: string) {
  console.log(chalk.bold.cyan('\n🔧 curl to Code - Interactive Mode\n'));

  // Step 1: Get curl command if not provided
  let curlInput = initialCurl;
  
  if (!curlInput) {
    const { curl } = await inquirer.prompt([
      {
        type: 'input',
        name: 'curl',
        message: 'Paste your curl command:',
        validate: (input) => {
          if (!input.trim().startsWith('curl')) {
            return 'Command must start with "curl"';
          }
          return true;
        },
      },
    ]);
    curlInput = curl;
  }

  // Validate curl command
  if (!curlInput.trim().startsWith('curl')) {
    console.error(chalk.red('Error: Invalid curl command'));
    process.exit(1);
  }

  // Step 2: Select language
  const { language } = await inquirer.prompt([
    {
      type: 'list',
      name: 'language',
      message: 'Select target language:',
      choices: [
        { name: 'JavaScript (Fetch API)', value: 'fetch' },
        { name: 'JavaScript (Axios)', value: 'axios' },
        { name: 'Node.js (http/https)', value: 'node' },
        { name: 'Python (requests)', value: 'python' },
        { name: 'Go (net/http)', value: 'go' },
        { name: 'PHP (cURL)', value: 'php' },
        { name: 'Ruby (Net::HTTP)', value: 'ruby' },
      ],
      default: 'fetch',
    },
  ]);

  // Step 3: Configure options
  const { options } = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'options',
      message: 'Select code options:',
      choices: [
        { name: 'Include error handling', value: 'errorHandling' },
        { name: 'Use async/await (JS/Node)', value: 'async', disabled: !['fetch', 'axios', 'node'].includes(language) },
        { name: 'Add TypeScript types', value: 'types', disabled: !['fetch', 'axios', 'node'].includes(language) },
      ],
    },
  ]);

  const config: ConversionOptions = {
    language: language as CodeLanguage,
    errorHandling: options.includes('errorHandling'),
    async: options.includes('async'),
    types: options.includes('types'),
  };

  // Step 4: Generate preview
  console.log(chalk.dim('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'));
  console.log(chalk.bold('Preview:\n'));

  const spinner = ora('Generating code...').start();
  
  try {
    const result = convertCurl(curlInput, config);
    spinner.succeed('Code generated!');
    
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
      const extensions: { [key: string]: string } = {
        python: 'py',
        javascript: 'js',
        node: 'js',
        fetch: config.types ? 'ts' : 'js',
        axios: config.types ? 'ts' : 'js',
        go: 'go',
        php: 'php',
        ruby: 'rb',
      };
      
      const { filename } = await inquirer.prompt([
        {
          type: 'input',
          name: 'filename',
          message: 'Output filename:',
          default: `request.${extensions[language] || 'txt'}`,
        },
      ]);
      
      fs.writeFileSync(filename, result);
      console.log(chalk.green(`\n✓ Code saved to ${filename}`));
    } else if (action === 'regenerate') {
      await interactiveMode(curlInput);
      return;
    }
  } catch (error: any) {
    spinner.fail('Generation failed');
    console.error(chalk.red('Error:'), error?.message || error);
    process.exit(1);
  }
  
  console.log(chalk.dim('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'));
  console.log(chalk.cyan('Thanks for using curl-to-code! 🎉\n'));
}

program.parse();
