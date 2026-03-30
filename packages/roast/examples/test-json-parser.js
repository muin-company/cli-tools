#!/usr/bin/env node

/**
 * Test JSON parser without calling AI API
 * Uses mock review text to verify parsing logic
 */

import { parseReviewToJSON } from './lib/json-parser.js';

const MOCK_REVIEW = `🔥 CODE ROAST 🔥

🚨 **SQL Injection vulnerability** - Line 2
Direct string interpolation in SQL query without sanitization. This is a textbook SQL injection waiting to happen.

\`\`\`javascript
const query = \`SELECT * FROM users WHERE id = \${userInput}\`;
\`\`\`

💡 Use parameterized queries or an ORM. If you must use raw SQL, at least sanitize the input.

⚠️ **Closure issue in loop** - Lines 5-10
Using \`var\` in a loop with \`setTimeout\` will cause all closures to share the same \`i\` reference. Classic JavaScript gotcha.

💡 Use \`let\` instead of \`var\`, or use an IIFE to capture the loop variable.

🔥 **Callback hell detected** - Lines 13-23
You've got nested callbacks deeper than Inception. Even callback hell has standards.

💡 Use async/await or Promises. It's 2026, not 2012.

⚠️ **Missing error handling** - Line 26
Your async function has no try-catch. One network hiccup and your app crashes.

💡 Wrap async calls in try-catch or use .catch() on promises.

✨ **Clean function decomposition** - Lines 32-34
Nice job with this reduce function. Clean, functional, readable. This is the way.`;

const metadata = {
  filePath: 'test.js',
  fileName: 'test.js',
  language: 'JavaScript',
  mode: 'roast',
  severity: 'medium',
  model: 'claude-sonnet-4-5-20250929',
  code: '// test code here'
};

console.log('Testing JSON parser...\n');

const result = parseReviewToJSON(MOCK_REVIEW, metadata);

console.log(JSON.stringify(result, null, 2));

// Validation
console.log('\n--- Validation ---');
console.log(`✓ Total issues: ${result.summary.total_issues}`);
console.log(`✓ Critical: ${result.summary.critical_count}`);
console.log(`✓ Warnings: ${result.summary.warning_count}`);
console.log(`✓ Suggestions: ${result.summary.suggestion_count}`);
console.log(`✓ Compliments: ${result.summary.compliment_count}`);
console.log(`✓ Roasts: ${result.summary.roast_count}`);

// Check for specific issues
const hasSQLInjection = result.issues.some(i => i.title.includes('SQL Injection'));
const hasClosureIssue = result.issues.some(i => i.title.includes('Closure'));
const hasCallbackHell = result.issues.some(i => i.title.includes('Callback') || i.title.includes('hell'));
const hasCompliment = result.issues.some(i => i.type === 'compliment');

console.log(`\nIssue detection:`);
console.log(`  ${hasSQLInjection ? '✅' : '❌'} SQL Injection found`);
console.log(`  ${hasClosureIssue ? '✅' : '❌'} Closure issue found`);
console.log(`  ${hasCallbackHell ? '✅' : '❌'} Callback hell found`);
console.log(`  ${hasCompliment ? '✅' : '❌'} Compliment found`);

// Line number extraction
const issuesWithLines = result.issues.filter(i => i.line_number !== null);
console.log(`\nLine number extraction: ${issuesWithLines.length}/${result.issues.length} issues`);
issuesWithLines.forEach(i => {
  console.log(`  - ${i.title}: Line ${i.line_number}`);
});
