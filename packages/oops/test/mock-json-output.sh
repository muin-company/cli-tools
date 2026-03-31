#!/bin/bash
# Mock JSON output test without API call
# Shows what actual output looks like

echo "📋 Example JSON Output (v1.1.0)"
echo ""

cat << 'EOF'
{
  "error": "TypeError: Cannot read property 'name' of undefined",
  "errorType": "TypeError",
  "explanation": "You tried to access the 'name' property on an undefined value. This typically happens when an object you expected to exist is actually undefined.",
  "solution": "1. Check if the object exists before accessing properties: `if (obj && obj.name)`\n2. Use optional chaining: `obj?.name`\n3. Verify that the object is properly initialized before use\n4. Add null/undefined checks at the source",
  "rootCause": "JavaScript allows accessing properties on undefined, but throws a TypeError when you try to read from it. This usually indicates missing data from an API, database, or uninitialized variable.",
  "context": {
    "file": "/app/user-service.js",
    "line": 127,
    "column": 15,
    "codeSnippet": "const userName = user.name"
  },
  "timestamp": "2026-03-31T10:35:00.000Z",
  "model": "gpt-4o-mini",
  "version": "1.1.0"
}
EOF

echo ""
echo "✅ This is the format CI/CD pipelines receive"
echo ""
