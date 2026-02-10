#!/usr/bin/env node

import { program } from 'commander';
import { generate } from './index.js';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read package.json for version
let version = '1.0.0';
try {
  const pkg = JSON.parse(readFileSync(join(__dirname, '../package.json'), 'utf-8'));
  version = pkg.version;
} catch (e) {
  // Use default version if can't read package.json
}

program
  .name('readme-gen')
  .description('Generate professional README files from your package.json')
  .version(version)
  .option('-p, --path <path>', 'Project path (defaults to current directory)', process.cwd())
  .option('-t, --type <type>', 'Project type: cli, library, or hybrid (auto-detected if not specified)')
  .option('-o, --output <path>', 'Output directory (defaults to project path)')
  .option('--dry-run', 'Preview README without writing to file', false)
  .action(async (options) => {
    try {
      console.log('🚀 Generating README...\n');
      
      const content = await generate({
        projectPath: options.path,
        projectType: options.type,
        output: options.output,
        dryRun: options.dryRun,
      });
      
      if (options.dryRun) {
        console.log('\n📄 Preview:\n');
        console.log('─'.repeat(80));
        console.log(content);
        console.log('─'.repeat(80));
      } else {
        console.log('\n✨ README.md has been generated successfully!');
      }
    } catch (error) {
      console.error('❌ Error:', error instanceof Error ? error.message : String(error));
      process.exit(1);
    }
  });

program.parse();
