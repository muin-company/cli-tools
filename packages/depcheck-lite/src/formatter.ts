/**
 * Output formatter
 */

import { AnalysisResult } from './types';

/**
 * Print result in table format (MVP)
 */
export function printTable(result: AnalysisResult, projectName?: string): void {
  const { dependencies, unused, used } = result;

  // Header
  const headerText = `📦 Dependency Check${projectName ? ` - ${projectName}` : ''}`;
  const headerPadding = Math.max(0, 54 - headerText.length);
  
  console.log('\n╭────────────────────────────────────────────────────────╮');
  console.log(`│  ${headerText}${' '.repeat(headerPadding)}│`);
  console.log('╰────────────────────────────────────────────────────────╯\n');

  // Results
  console.log('Results:\n');

  // Unused dependencies
  if (unused.length > 0) {
    console.log(`🔴 Unused Dependencies (${unused.length}):`);
    for (const dep of unused) {
      console.log(`  • ${dep.name} (${dep.version})`);
      console.log(`    ├─ Declared in package.json`);
      console.log(`    └─ Never imported in code\n`);
    }
  } else {
    console.log('✅ No unused dependencies found!\n');
  }

  // Used dependencies summary
  if (used.length > 0) {
    console.log(`✅ Used Dependencies (${used.length}):`);
    // Show first 5, then summary
    const showCount = Math.min(5, used.length);
    for (let i = 0; i < showCount; i++) {
      const dep = used[i];
      console.log(`  • ${dep.name} (${dep.version})`);
    }
    if (used.length > 5) {
      console.log(`  ... and ${used.length - 5} more\n`);
    } else {
      console.log('');
    }
  }

  // Summary
  console.log('Summary:');
  console.log(`  Dependencies: ${dependencies.total} total`);
  console.log(`  ✓ Used: ${dependencies.used}`);
  console.log(`  ✗ Unused: ${dependencies.unused}`);
  console.log(`  ⚠ Missing: ${dependencies.missing}`);

  // Tips
  if (unused.length > 0) {
    console.log('\n💡 Tip: Run with --fix to remove unused dependencies');
    console.log('💡 Tip: Run with --interactive for guided cleanup');
    
    // Estimate savings (rough estimate: 100KB per package)
    const estimatedSavings = unused.length * 0.1;
    console.log(`\nPotential savings: ~${estimatedSavings.toFixed(1)} MB (node_modules)`);
  }

  console.log('');
}

/**
 * Print result in JSON format
 */
export function printJson(result: AnalysisResult): void {
  console.log(JSON.stringify(result, null, 2));
}

/**
 * Print result in simple list format
 */
export function printList(result: AnalysisResult): void {
  console.log('\nUnused Dependencies:');
  if (result.unused.length === 0) {
    console.log('  (none)');
  } else {
    result.unused.forEach(dep => {
      console.log(`  - ${dep.name}@${dep.version}`);
    });
  }
  
  console.log('\nUsed Dependencies:');
  if (result.used.length === 0) {
    console.log('  (none)');
  } else {
    result.used.forEach(dep => {
      console.log(`  - ${dep.name}@${dep.version}`);
    });
  }
  
  console.log('');
}

/**
 * Print summary only
 */
export function printSummary(result: AnalysisResult): void {
  const { dependencies } = result;
  
  console.log('\nDependency Summary:');
  console.log(`  Total: ${dependencies.total}`);
  console.log(`  Used: ${dependencies.used}`);
  console.log(`  Unused: ${dependencies.unused}`);
  
  if (dependencies.unused > 0) {
    console.log(`\n⚠️  ${dependencies.unused} unused dependencies detected`);
  } else {
    console.log(`\n✅ All dependencies are being used`);
  }
  console.log('');
}
