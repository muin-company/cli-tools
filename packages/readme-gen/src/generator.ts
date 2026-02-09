import * as fs from 'fs';
import * as path from 'path';
import { ReadmeContext, ProjectType } from './types.js';
import { generateCliTemplate } from './templates/cli.js';
import { generateLibraryTemplate } from './templates/library.js';
import { generateHybridTemplate } from './templates/hybrid.js';

export function generateReadme(ctx: ReadmeContext): string {
  switch (ctx.projectType) {
    case 'cli':
      return generateCliTemplate(ctx);
    case 'library':
      return generateLibraryTemplate(ctx);
    case 'hybrid':
      return generateHybridTemplate(ctx);
    default:
      return generateLibraryTemplate(ctx);
  }
}

export function writeReadme(content: string, projectPath: string = process.cwd()): void {
  const readmePath = path.join(projectPath, 'README.md');
  
  // Backup existing README if it exists
  if (fs.existsSync(readmePath)) {
    const backupPath = path.join(projectPath, 'README.md.backup');
    fs.copyFileSync(readmePath, backupPath);
    console.log(`✓ Backed up existing README to README.md.backup`);
  }
  
  fs.writeFileSync(readmePath, content, 'utf-8');
  console.log(`✓ Generated README.md`);
}
