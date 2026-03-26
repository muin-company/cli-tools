#!/usr/bin/env node

// Quick test script to verify the CLI works
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

console.log('🧪 Testing roast CLI...\n');

async function test() {
  // Check if ANTHROPIC_API_KEY is set
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('❌ ANTHROPIC_API_KEY not set');
    console.log('Set it with: export ANTHROPIC_API_KEY="your-key-here"');
    process.exit(1);
  }

  try {
    // Test version
    const { stdout: version } = await execAsync('node bin/roast.js --version');
    console.log('✅ Version:', version.trim());

    // Test help
    const { stdout: help } = await execAsync('node bin/roast.js --help');
    console.log('✅ Help command works');

    console.log('\n📝 To test actual roasting, run:');
    console.log('   node bin/roast.js examples/bubble-sort.js');
    console.log('   node bin/roast.js --serious examples/sql-injection.py');
    console.log('   node bin/roast.js examples/bad-react.jsx');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
}

test();
