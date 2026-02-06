const { convertCurl } = require('./dist/index.js');

const curlCmd = 'curl -X POST https://api.example.com/users -H "Content-Type: application/json" -d "{\\"name\\":\\"John\\",\\"age\\":30}"';

console.log('Input:', curlCmd);
console.log('\n--- Parsing ---\n');

// We need to debug parseCurl, but it's not exported. Let's add a debug version in converter
