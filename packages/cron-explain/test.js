#!/usr/bin/env node
'use strict';

const { explainCron, parseCron, naturalToCron, validate } = require('./index.js');

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    passed++;
    console.log(`  ✓ ${name}`);
  } catch (e) {
    failed++;
    console.log(`  ✗ ${name}`);
    console.log(`    ${e.message}`);
  }
}

function eq(actual, expected) {
  if (actual !== expected) {
    throw new Error(`Expected "${expected}", got "${actual}"`);
  }
}

console.log('\n🧪 cron-explain tests\n');

// ── Explain tests ──
console.log('Explain:');

test('every minute', () => eq(explainCron('* * * * *'), 'Every minute'));
test('every hour', () => eq(explainCron('0 * * * *'), 'Every hour'));
test('daily midnight', () => eq(explainCron('0 0 * * *'), 'Every day at midnight'));
test('every 15 min', () => eq(explainCron('*/15 * * * *'), 'Every 15 minutes'));
test('every 5 min', () => eq(explainCron('*/5 * * * *'), 'Every 5 minutes'));
test('monday 9am', () => {
  const r = explainCron('0 9 * * 1');
  if (!r.includes('9:00 AM') || !r.includes('Monday')) throw new Error(`Got: ${r}`);
});
test('weekdays', () => {
  const r = explainCron('0 9 * * 1-5');
  if (!r.includes('Monday through Friday')) throw new Error(`Got: ${r}`);
});
test('monthly 1st', () => eq(explainCron('0 0 1 * *'), 'At midnight on the 1st of every month'));
test('yearly', () => eq(explainCron('0 0 1 1 *'), 'Once a year, at midnight on January 1st'));

// ── Natural language tests ──
console.log('\nNatural Language → Cron:');

test('every 5 minutes', () => eq(naturalToCron('every 5 minutes'), '*/5 * * * *'));
test('every minute', () => eq(naturalToCron('every minute'), '* * * * *'));
test('every hour', () => eq(naturalToCron('every hour'), '0 * * * *'));
test('every day at 3pm', () => eq(naturalToCron('every day at 3pm'), '0 15 * * *'));
test('every monday at 9am', () => eq(naturalToCron('every monday at 9am'), '0 9 * * 1'));
test('every weekday at 9am', () => eq(naturalToCron('every weekday at 9am'), '0 9 * * 1-5'));

// ── Validate tests ──
console.log('\nValidation:');

test('valid expression', () => {
  const r = validate('0 9 * * 1');
  if (!r.valid) throw new Error('Should be valid');
});
test('invalid hour 25', () => {
  const r = validate('0 25 * * *');
  if (r.valid) throw new Error('Should be invalid');
});

// ── Presets ──
console.log('\nPresets:');

test('@daily', () => eq(explainCron('@daily'), 'Every day at midnight'));
test('@hourly', () => eq(explainCron('@hourly'), 'Every hour'));
test('@yearly', () => eq(explainCron('@yearly'), 'Once a year, at midnight on January 1st'));

console.log(`\n${passed} passed, ${failed} failed\n`);
process.exit(failed > 0 ? 1 : 0);
