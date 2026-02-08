# @muin/curl-to-code

[![npm version](https://img.shields.io/npm/v/@muin/curl-to-code.svg)](https://www.npmjs.com/package/@muin/curl-to-code)
[![npm downloads](https://img.shields.io/npm/dm/@muin/curl-to-code.svg)](https://www.npmjs.com/package/@muin/curl-to-code)
[![license](https://img.shields.io/npm/l/@muin/curl-to-code.svg)](https://github.com/muin-company/cli-tools/blob/main/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/muin-company/cli-tools/blob/main/CONTRIBUTING.md)

Convert curl commands to production-ready code in any language with an interactive CLI.

## Features

- 🎨 **Interactive Mode** - Step-by-step guided code generation
- 🌍 **Multi-Language** - Python, JavaScript (Fetch/Axios), Node.js, Go, PHP, Ruby
- ⚡ **Production-Ready** - Error handling, type annotations, best practices
- 👀 **Live Preview** - See generated code before saving
- 📋 **Copy to Clipboard** - Quick copy for instant use
- 🔄 **Bidirectional** - Convert curl to code and back again
- 🛡️ **Type-Safe** - TypeScript support for JavaScript outputs

## Installation

```bash
npm install -g @muin/curl-to-code
```

Or use directly with npx:

```bash
npx @muin/curl-to-code
```

## Quick Start

The fastest way to get started is with interactive mode:

```bash
curl-to-code --interactive
```

Or pipe a curl command directly:

```bash
echo 'curl https://api.github.com/users/octocat' | curl-to-code --lang python
```

## Usage

### Interactive Mode (Recommended)

```bash
curl-to-code --interactive
```

The interactive mode will guide you through:
1. curl command input (paste or type)
2. Language selection from visual menu
3. Code options configuration with checkboxes
4. Live preview with syntax highlighting
5. Copy to clipboard or save to file

### CLI Mode

```bash
# Direct conversion
curl-to-code 'curl https://api.example.com/users' --lang python

# From clipboard (macOS)
pbpaste | curl-to-code --lang fetch --async --types

# From file
cat request.txt | curl-to-code --lang go

# With all options
curl-to-code 'curl -X POST https://api.example.com/users -H "Content-Type: application/json" -d "{\"name\":\"John\"}"' \
  --lang axios \
  --error-handling \
  --async \
  --types \
  --output request.ts
```

### Options

#### Required Arguments
- Positional: `<curl_command>` - The curl command to convert (or via stdin)

#### Output Options
- `-l, --lang <language>` - Target language (default: `fetch`)
  - `fetch` - JavaScript Fetch API (modern browsers)
  - `axios` - JavaScript Axios library
  - `node` - Node.js http/https modules
  - `python` - Python requests library
  - `go` - Go net/http package
  - `php` - PHP cURL library
  - `ruby` - Ruby Net::HTTP class

#### Code Generation Options
- `-i, --interactive` - Launch interactive mode with visual UI
- `--error-handling` - Include try/catch blocks and error logging
- `--async` - Use async/await pattern (JavaScript/Node.js only)
- `--types` - Add TypeScript type definitions (JavaScript/Node.js only)
- `-o, --output <file>` - Write output to file instead of stdout
- `--no-comments` - Exclude explanatory comments from generated code

## Examples

### Example 1: Simple GET Request

**Input curl command:**
```bash
curl 'https://api.github.com/users/octocat'
```

**Command:**
```bash
curl-to-code 'curl https://api.github.com/users/octocat' --lang fetch --async
```

**Output (JavaScript Fetch):**
```javascript
async function makeRequest() {
  const response = await fetch('https://api.github.com/users/octocat', {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

// Usage
makeRequest()
  .then(data => console.log(data))
  .catch(error => console.error('Request failed:', error));
```

### Example 2: POST with Headers (Python)

**Input curl command:**
```bash
curl -X POST https://api.example.com/users \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer token123' \
  -d '{"name":"John","email":"john@example.com"}'
```

**Command:**
```bash
curl-to-code 'curl -X POST https://api.example.com/users -H "Content-Type: application/json" -H "Authorization: Bearer token123" -d "{\"name\":\"John\",\"email\":\"john@example.com\"}"' \
  --lang python --error-handling
```

**Output (Python):**
```python
import requests
import json
from typing import Dict, Any

def make_request() -> Dict[str, Any]:
    """
    POST request to https://api.example.com/users
    Created with @muin/curl-to-code
    """
    url = 'https://api.example.com/users'
    
    headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer token123',
    }
    
    payload = {
        "name": "John",
        "email": "john@example.com"
    }
    
    try:
        response = requests.post(
            url,
            headers=headers,
            json=payload,
            timeout=30  # 30 second timeout
        )
        response.raise_for_status()  # Raises HTTPError for bad status codes
        return response.json()
    except requests.exceptions.Timeout:
        print("Request timed out")
        raise
    except requests.exceptions.HTTPError as e:
        print(f"HTTP error occurred: {e}")
        print(f"Response body: {response.text}")
        raise
    except requests.exceptions.RequestException as e:
        print(f"Request failed: {e}")
        raise

if __name__ == "__main__":
    result = make_request()
    print(json.dumps(result, indent=2))
```

### Example 3: TypeScript with Axios

**Command:**
```bash
curl-to-code 'curl https://api.example.com/users/123' --lang axios --types --error-handling
```

**Output (TypeScript + Axios):**
```typescript
import axios, { AxiosError } from 'axios';

// Define your expected response type here
interface User {
  id: number;
  name: string;
  email: string;
  // Add more fields as needed
}

async function makeRequest(): Promise<User> {
  try {
    const response = await axios<User>({
      method: 'get',
      url: 'https://api.example.com/users/123',
      timeout: 5000, // 5 second timeout
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        // Server responded with error status
        console.error('API error:', axiosError.response.status, axiosError.response.data);
        throw new Error(`Request failed with status ${axiosError.response.status}`);
      } else if (axiosError.request) {
        // Request made but no response received
        console.error('No response received:', axiosError.request);
        throw new Error('No response from server');
      }
    }
    // Something else went wrong
    console.error('Request setup failed:', error);
    throw error;
  }
}

// Usage
makeRequest()
  .then(user => console.log(user))
  .catch(error => console.error('Failed to fetch user:', error));
```

### Example 4: Go with Error Handling

**Command:**
```bash
curl-to-code 'curl -X POST https://api.example.com/data -H "Content-Type: application/json" -d "{\"key\":\"value\"}"' \
  --lang go --error-handling
```

**Output (Go):**
```go
package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io"
    "log"
    "net/http"
    "time"
)

type RequestBody struct {
    Key string `json:"key"`
}

type ResponseBody struct {
    // Define your response structure here
}

func makeRequest() (*ResponseBody, error) {
    url := "https://api.example.com/data"
    
    payload := RequestBody{
        Key: "value",
    }
    
    jsonData, err := json.Marshal(payload)
    if err != nil {
        return nil, fmt.Errorf("failed to marshal JSON: %w", err)
    }
    
    req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
    if err != nil {
        return nil, fmt.Errorf("failed to create request: %w", err)
    }
    
    req.Header.Set("Content-Type", "application/json")
    
    client := &http.Client{
        Timeout: 30 * time.Second,
    }
    
    resp, err := client.Do(req)
    if err != nil {
        return nil, fmt.Errorf("request failed: %w", err)
    }
    defer resp.Body.Close()
    
    if resp.StatusCode < 200 || resp.StatusCode >= 300 {
        body, _ := io.ReadAll(resp.Body)
        return nil, fmt.Errorf("HTTP error %d: %s", resp.StatusCode, string(body))
    }
    
    var result ResponseBody
    if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
        return nil, fmt.Errorf("failed to decode response: %w", err)
    }
    
    return &result, nil
}

func main() {
    result, err := makeRequest()
    if err != nil {
        log.Fatalf("Request failed: %v", err)
    }
    
    fmt.Printf("Success: %+v\n", result)
}
```

### Example 5: Interactive Mode Demo

```bash
$ curl-to-code --interactive

╭─────────────────────────────────────────────────────────╮
│  🔧 curl to Code - Interactive Mode                     │
│  Convert curl commands to production-ready code         │
╰─────────────────────────────────────────────────────────╯

? Paste your curl command (or press Enter to use editor): 
curl -X GET https://api.example.com/users -H "Authorization: Bearer token"

? Select target language:
  ❯ JavaScript (Fetch API) - Modern browser standard
    JavaScript (Axios) - Popular HTTP client
    Node.js (http/https) - Built-in Node.js modules
    Python (requests) - Simple and elegant
    Go (net/http) - High performance
    PHP (cURL) - Classic PHP approach
    Ruby (Net::HTTP) - Ruby standard library

? Select code options (Space to select, Enter to confirm):
  ◉ Include error handling
  ◉ Use async/await (JS/Node)
  ◉ Add TypeScript types
  ◯ Add explanatory comments

╭─── Preview ─────────────────────────────────────────────╮
│ async function makeRequest(): Promise<any> {            │
│   try {                                                 │
│     const response = await fetch(                       │
│       'https://api.example.com/users',                  │
│       {                                                 │
│         method: 'GET',                                  │
│         headers: {                                      │
│           'Authorization': 'Bearer token',              │
│         },                                              │
│       }                                                 │
│     );                                                  │
│                                                         │
│     if (!response.ok) {                                 │
│       throw new Error(`HTTP ${response.status}`);       │
│     }                                                   │
│                                                         │
│     const data = await response.json();                 │
│     return data;                                        │
│   } catch (error) {                                     │
│     console.error('Request failed:', error);            │
│     throw error;                                        │
│   }                                                     │
│ }                                                       │
╰─────────────────────────────────────────────────────────╯

? What would you like to do?
  ❯ 📋 Copy to clipboard
    💾 Save to file
    🔄 Regenerate with different options
    ✏️  Edit curl command
    ❌ Exit

✓ Copied to clipboard!

Thanks for using curl-to-code! 🎉
Visit https://muin.company for more developer tools
```

### Example 6: Complex Request with Authentication

**Input:**
```bash
curl 'https://api.stripe.com/v1/charges' \
  -u 'sk_test_xxx:' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'amount=2000' \
  -d 'currency=usd' \
  -d 'source=tok_visa'
```

**Command:**
```bash
curl-to-code 'curl https://api.stripe.com/v1/charges -u "sk_test_xxx:" -H "Content-Type: application/x-www-form-urlencoded" -d "amount=2000" -d "currency=usd" -d "source=tok_visa"' \
  --lang node --async --types --error-handling
```

**Output (Node.js + TypeScript):**
```typescript
import https from 'https';

interface ChargeResponse {
  id: string;
  amount: number;
  currency: string;
  // Add more fields from Stripe API
}

async function createCharge(): Promise<ChargeResponse> {
  return new Promise((resolve, reject) => {
    const postData = new URLSearchParams({
      amount: '2000',
      currency: 'usd',
      source: 'tok_visa',
    }).toString();

    const options = {
      hostname: 'api.stripe.com',
      port: 443,
      path: '/v1/charges',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData),
        'Authorization': 'Basic ' + Buffer.from('sk_test_xxx:').toString('base64'),
      },
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
            resolve(JSON.parse(data));
          } else {
            reject(new Error(`HTTP ${res.statusCode}: ${data}`));
          }
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      reject(new Error(`Request failed: ${error.message}`));
    });

    req.write(postData);
    req.end();
  });
}

// Usage
createCharge()
  .then(charge => console.log('Charge created:', charge))
  .catch(error => console.error('Failed to create charge:', error));
```

## Supported curl Features

| Feature | Supported | Example |
|---------|-----------|---------|
| HTTP Methods | ✅ | `-X POST`, `-X GET`, etc. |
| Headers | ✅ | `-H "Authorization: Bearer token"` |
| Request Body (JSON) | ✅ | `-d '{"key":"value"}'`, `--data '...'` |
| Request Body (Form) | ✅ | `-d 'key=value'` |
| Request Body (Raw) | ✅ | `--data-raw '...'` |
| Basic Auth | ✅ | `-u username:password` |
| Query Parameters | ✅ | Extracted from URL |
| File Upload | ⚠️ | Partial support |
| Cookies | ⚠️ | Partial support |
| Proxy Settings | ❌ | Coming soon |
| SSL/TLS Options | ❌ | Coming soon |

## Common Use Cases

### 1. **API Integration from DevTools**
The most common use case! Testing APIs in Chrome/Firefox DevTools:

```bash
# In DevTools Network tab: Right-click → Copy → Copy as cURL
# Then paste into terminal:
pbpaste | curl-to-code --interactive
```

### 2. **Documentation Generation**
Generate code examples for your API documentation:

```bash
# Create examples in all supported languages
for lang in fetch python go ruby php; do
  curl-to-code 'curl https://api.example.com/v1/users' \
    --lang $lang \
    --error-handling \
    --output "examples/users-${lang}.md"
done
```

### 3. **Testing & Debugging**
Quickly prototype API calls without writing boilerplate:

```bash
# From Postman export or API spec
curl-to-code 'curl https://api.example.com/test' --lang python
# Run immediately: python - | your-curl-here
```

### 4. **Learning Different Languages**
See how the same request is made across languages:

```bash
# Compare implementations
curl-to-code 'curl https://api.example.com/data' --lang fetch > js.txt
curl-to-code 'curl https://api.example.com/data' --lang python > py.txt
curl-to-code 'curl https://api.example.com/data' --lang go > go.txt
diff js.txt py.txt
```

### 5. **CI/CD Integration**
Generate test fixtures in your build pipeline:

```bash
# In your build script
cat api-requests.txt | while read curl_cmd; do
  echo "$curl_cmd" | curl-to-code --lang $TARGET_LANG >> tests/fixtures.${EXT}
done
```

## Why This Tool?

### The Problem

You're debugging an API in Chrome DevTools...

**Before curl-to-code:**
1. Right-click → "Copy as cURL" ✅
2. Open your code editor
3. Manually rewrite the request in your language
4. Add error handling
5. Add type definitions
6. Fix syntax errors
7. Test it
8. 10-15 minutes later... 😓

**After curl-to-code:**
```bash
pbpaste | curl-to-code --lang python --interactive
```

**5 seconds. Done. ✅**

### The Benefits

- ⏱️ **Save 10+ minutes per API integration**
- 🐛 **Fewer bugs** - Generated code includes error handling
- 📚 **Learning tool** - See best practices across languages
- 🔄 **Consistency** - Same patterns across your codebase
- 🚀 **Faster prototyping** - Test APIs immediately

## Common Gotchas & Troubleshooting

### Issue: "Command not found: curl-to-code"

**Cause:** Package not installed globally or npx cache issue

**Solution:**
```bash
# Try reinstalling globally
npm uninstall -g @muin/curl-to-code
npm install -g @muin/curl-to-code

# Or clear npx cache
npx clear-npx-cache
npx @muin/curl-to-code --help

# Check your PATH includes npm global bin
npm config get prefix
# Should be in your PATH
```

### Issue: Clipboard paste not working in interactive mode

**Cause:** Different clipboard commands per OS

**Solution:**
```bash
# macOS: Use pbpaste
pbpaste | curl-to-code --lang python

# Linux: Install xclip
sudo apt-get install xclip
xclip -selection clipboard -o | curl-to-code --lang python

# Windows (PowerShell): Use Get-Clipboard
Get-Clipboard | curl-to-code --lang python

# Or use --interactive and manually paste when prompted
curl-to-code --interactive
```

### Issue: Special characters in curl command not parsing correctly

**Cause:** Shell escaping issues

**Solution:**
```bash
# Wrong: Unquoted special characters
curl-to-code curl https://api.example.com?key=$value

# Right: Single quotes around entire command
curl-to-code 'curl https://api.example.com?key=$value'

# Right: Use heredoc for complex commands
curl-to-code <<'EOF'
curl -X POST https://api.example.com/data \
  -H 'Content-Type: application/json' \
  -d '{"special": "chars$here"}'
EOF

# Best: Use interactive mode (no escaping needed)
curl-to-code --interactive
```

### Issue: Generated TypeScript code has type errors

**Cause:** The tool generates placeholder types that need customization

**Solution:**
```typescript
// Generated code (placeholder):
interface ResponseBody {
  // Define your response type here
}

// Replace with actual API response type:
interface ResponseBody {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

// Or use a type assertion if you don't care about types:
const data = await response.json() as any;
```

### Issue: Python code fails with ModuleNotFoundError: requests

**Cause:** The `requests` library is not installed

**Solution:**
```bash
# Install requests library
pip install requests

# Or use Python's built-in urllib (coming soon)
curl-to-code 'curl https://api.example.com' --lang python --no-deps
```

### Issue: Generated code hangs/times out

**Cause:** No timeout specified in the original curl (curl has no timeout by default)

**Solution:**
```bash
# Add timeout to curl command
curl-to-code 'curl --max-time 10 https://slow-api.example.com' --lang python

# Or manually add timeout to generated code:
# Python: requests.get(url, timeout=30)
# JavaScript: fetch(url, { signal: AbortSignal.timeout(5000) })
# Go: client := &http.Client{ Timeout: 30 * time.Second }
```

### Issue: Form data (-d) not being parsed correctly

**Cause:** Mixing JSON and form-encoded data

**Solution:**
```bash
# JSON data: Use proper Content-Type
curl-to-code 'curl -X POST https://api.example.com -H "Content-Type: application/json" -d "{\"key\":\"value\"}"'

# Form data: Don't include Content-Type (defaults to form-encoded)
curl-to-code 'curl -X POST https://api.example.com -d "key=value&foo=bar"'

# Multiple -d flags for form data
curl-to-code 'curl -X POST https://api.example.com -d "key=value" -d "foo=bar"'
```

### Issue: Authentication header not working

**Cause:** Incorrect encoding of credentials

**Solution:**
```bash
# Basic Auth: Use -u flag (automatically base64 encodes)
curl-to-code 'curl -u "username:password" https://api.example.com'

# Bearer Token: Use Authorization header
curl-to-code 'curl -H "Authorization: Bearer YOUR_TOKEN" https://api.example.com'

# API Key in header
curl-to-code 'curl -H "X-API-Key: YOUR_KEY" https://api.example.com'
```

### Issue: Output file not created with --output flag

**Cause:** Invalid file path or no write permissions

**Solution:**
```bash
# Check directory exists
mkdir -p output/
curl-to-code 'curl https://api.example.com' --lang python --output output/request.py

# Check permissions
chmod +w output/

# Use absolute path
curl-to-code 'curl https://api.example.com' --lang python --output ~/projects/request.py
```

### Issue: Generated Go code won't compile

**Cause:** Missing imports or incorrect package structure

**Solution:**
```go
// Generated code may need module initialization
// Create a proper Go module first:
mkdir my-request && cd my-request
go mod init my-request

// Then save generated code:
curl-to-code 'curl https://api.example.com' --lang go --output main.go

// Install dependencies if needed:
go get github.com/some/package

// Run:
go run main.go
```

## Real-World Workflows

### Workflow 1: Building a Complete API Client

Generate a full-featured SDK from your API documentation:

```bash
#!/bin/bash
# scripts/generate-api-client.sh

API_DOCS="https://api.example.com"
OUTPUT_DIR="src/api"
LANG="typescript"

# 1. Extract curl commands from API docs (Postman/Swagger export)
# Assuming you have a collection.json from Postman

# 2. Generate client methods
mkdir -p "$OUTPUT_DIR"

# Users endpoint
curl-to-code "curl $API_DOCS/v1/users -H 'Authorization: Bearer TOKEN'" \
  --lang "$LANG" --async --types --error-handling \
  --output "$OUTPUT_DIR/users.ts"

# Posts endpoint
curl-to-code "curl -X POST $API_DOCS/v1/posts -H 'Content-Type: application/json' -d '{\"title\":\"test\"}'" \
  --lang "$LANG" --async --types --error-handling \
  --output "$OUTPUT_DIR/posts.ts"

# 3. Create client wrapper
cat > "$OUTPUT_DIR/client.ts" << 'EOF'
import { getUsers } from './users';
import { createPost } from './posts';

export class APIClient {
  constructor(private apiKey: string) {}
  
  users = {
    list: () => getUsers(this.apiKey),
    // ... more methods
  };
  
  posts = {
    create: (data) => createPost(this.apiKey, data),
    // ... more methods
  };
}

export default APIClient;
EOF

echo "✅ API client generated in $OUTPUT_DIR"
```

**Result:** A production-ready, typed API client with:
- Error handling
- TypeScript types
- Organized by resource
- Easy to extend

### Workflow 2: CI/CD Integration Testing

Auto-generate integration tests from curl commands:

```bash
#!/bin/bash
# .github/workflows/api-tests.yml

# Extract curl commands from your API tests
CURL_COMMANDS=$(grep -r "curl " tests/api/*.sh)

# Generate test code for each
echo "$CURL_COMMANDS" | while read -r curl_cmd; do
  # Extract test name from comment
  test_name=$(echo "$curl_cmd" | sed 's/.*# \(.*\)/\1/')
  
  # Generate test code
  echo "$curl_cmd" | curl-to-code --lang python --error-handling > "tests/generated/${test_name}.py"
  
  # Add test wrapper
  cat >> "tests/generated/${test_name}.py" << 'EOF'

def test_api_endpoint():
    """Auto-generated integration test"""
    result = make_request()
    assert result is not None
    assert 'id' in result
    print(f"✅ Test passed: {test_name}")
EOF
done

# Run generated tests
pytest tests/generated/
```

**Benefits:**
- Curl commands in docs become executable tests
- Changes to API automatically update test code
- No manual test maintenance

### Workflow 3: Multi-Language SDK Generation

Create SDKs in multiple languages from a single curl reference:

```bash
#!/bin/bash
# scripts/generate-sdks.sh

CURL_REF="curl -X POST https://api.example.com/payment \
  -H 'Authorization: Bearer sk_test_xxx' \
  -H 'Content-Type: application/json' \
  -d '{\"amount\":1000,\"currency\":\"usd\"}'"

# Generate for each language
for lang in python fetch axios go php ruby; do
  mkdir -p "sdks/$lang"
  
  echo "$CURL_REF" | curl-to-code --lang "$lang" --error-handling \
    > "sdks/$lang/payment.${EXT[$lang]}"
  
  echo "✅ Generated $lang SDK"
done

# Create documentation with examples
cat > README.md << 'EOF'
# Payment API SDKs

## Python
'''python
$(cat sdks/python/payment.py)
'''

## JavaScript (Fetch)
'''javascript
$(cat sdks/fetch/payment.js)
'''

## Go
'''go
$(cat sdks/go/payment.go)
'''
EOF
```

**Use case:** Open-source projects, API documentation, developer onboarding

### Workflow 4: DevTools to Production Code

The fastest path from debugging to deployment:

```text
1. In Chrome DevTools Network tab:
   - Test your API request
   - Right-click → Copy → Copy as cURL

2. Paste into terminal:
   pbpaste | curl-to-code --interactive

3. Interactive wizard:
   - Select language (TypeScript)
   - Enable async/await ✓
   - Enable types ✓
   - Enable error handling ✓

4. Output goes to clipboard

5. Paste into your codebase:
   // src/api/newEndpoint.ts
   <paste here>

6. Refine and test:
   - Add to API client class
   - Write unit tests
   - Deploy!

Total time: 30 seconds 🚀
```

## Advanced Tips & Tricks

### Tip 1: Environment-Aware Code Generation

Generate code with environment variables:

```bash
# Development environment
export API_BASE="http://localhost:3000"
curl-to-code "curl $API_BASE/users" --lang python > dev_client.py

# Production environment
export API_BASE="https://api.production.com"
curl-to-code "curl $API_BASE/users" --lang python > prod_client.py

# Or use template replacement
curl-to-code "curl https://api.example.com/users" --lang fetch | \
  sed 's|https://api.example.com|${process.env.API_BASE}|g' > client.ts
```

### Tip 2: Chain with Other Tools

Combine with json-to-types for end-to-end type safety:

```bash
# 1. Convert curl to code
curl-to-code "curl https://api.github.com/users/octocat" \
  --lang typescript --async --output api.ts

# 2. Fetch sample response and generate types
curl https://api.github.com/users/octocat | \
  json-to-types --type zod --output types.ts

# 3. Combine them
cat > github-client.ts << 'EOF'
import { userSchema } from './types';
import { fetchUser as fetchUserRaw } from './api';

export async function fetchUser(username: string) {
  const data = await fetchUserRaw(username);
  return userSchema.parse(data); // Runtime validation!
}
EOF
```

### Tip 3: Smart Authentication Handling

Externalize credentials for security:

```bash
# Bad: Hardcoded credentials in curl
curl-to-code "curl -H 'Authorization: Bearer sk_live_REAL_KEY' ..." 

# Good: Replace with env var in generated code
curl-to-code "curl -H 'Authorization: Bearer TOKEN' ..." --lang python | \
  sed 's/TOKEN/${os.environ["API_KEY"]}/g'

# Better: Create a wrapper script
cat > generate-with-auth.sh << 'EOF'
#!/bin/bash
curl-to-code "$@" | sed -E \
  -e 's/(Bearer|Basic) [A-Za-z0-9_-]+/\1 ${process.env.API_KEY}/g' \
  -e 's/password=[^&"'\'']+/password=${process.env.PASSWORD}/g'
EOF

# Usage
pbpaste | ./generate-with-auth.sh --lang fetch
```

### Tip 4: Request/Response Mocking

Generate mock servers from curl commands:

```bash
# Generate request code
curl-to-code "curl https://api.example.com/users" --lang node > client.js

# Create mock server
cat > mock-server.js << 'EOF'
const express = require('express');
const app = express();

// Extracted from curl command
app.get('/users', (req, res) => {
  res.json([
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" }
  ]);
});

app.listen(3000, () => console.log('Mock server on :3000'));
EOF

# Test client against mock
node mock-server.js &
node client.js
```

### Tip 5: Rate Limiting & Retry Logic

Add production-grade resilience to generated code:

```typescript
// After generating with curl-to-code, enhance with:
import pRetry from 'p-retry';
import pThrottle from 'p-throttle';

const throttled = pThrottle({
  limit: 10,        // 10 requests
  interval: 1000    // per second
});

async function robustApiCall() {
  return pRetry(
    throttled(async () => {
      // <paste generated code here>
      const response = await fetch('...');
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    }),
    {
      retries: 3,
      onFailedAttempt: err => {
        console.log(`Attempt ${err.attemptNumber} failed. Retrying...`);
      }
    }
  );
}
```

### Tip 6: OpenAPI/Swagger Integration

Generate curl from OpenAPI, then convert to code:

```bash
# 1. Install openapi-to-curl (hypothetical tool)
npm install -g openapi-to-curl

# 2. Extract curl commands from OpenAPI spec
openapi-to-curl swagger.json > curls.txt

# 3. Convert all to code
cat curls.txt | while read -r curl_cmd; do
  endpoint=$(echo "$curl_cmd" | grep -oP '(?<=/api/)[^?]+')
  echo "$curl_cmd" | curl-to-code --lang typescript --output "api/${endpoint}.ts"
done
```

### Tip 7: Code Coverage for Generated Code

Track which API endpoints have generated clients:

```bash
#!/bin/bash
# List all API endpoints
API_ENDPOINTS=$(curl https://api.example.com/swagger.json | jq -r '.paths | keys[]')

# List generated clients
GENERATED=$(ls src/api/*.ts | xargs -n1 basename | sed 's/.ts$//')

# Find missing
echo "Missing clients:"
comm -23 <(echo "$API_ENDPOINTS" | sort) <(echo "$GENERATED" | sort)

# Auto-generate missing
for endpoint in $(comm -23 <(echo "$API_ENDPOINTS" | sort) <(echo "$GENERATED" | sort)); do
  echo "Generating $endpoint..."
  curl-to-code "curl https://api.example.com$endpoint" \
    --lang typescript --output "src/api/${endpoint}.ts"
done
```

## Performance Tips

### Tip 1: Use the Right Language for Your Use Case

- **Quick scripts**: Python (simple, readable)
- **Frontend apps**: Fetch or Axios (runs in browser)
- **Backend services**: Node.js or Go (high performance)
- **Legacy systems**: PHP or Ruby (integrate with existing code)

### Tip 2: Batch Processing

Process multiple curl commands efficiently:

```bash
# From a file with one curl command per line
cat requests.txt | xargs -I {} curl-to-code '{}' --lang python >> output.py

# Or use a loop for different languages
while IFS= read -r curl_cmd; do
  echo "$curl_cmd" | curl-to-code --lang python
done < requests.txt
```

### Tip 3: Template for Repeated Requests

Save frequently used options:

```bash
# Create an alias
alias c2c-api='curl-to-code --lang typescript --async --types --error-handling'

# Usage
echo 'curl https://api.example.com/users' | c2c-api
```

### Tip 8: Caching Generated Code

Avoid regenerating unchanged endpoints:

```bash
#!/bin/bash
# Cache curl → code mappings

CACHE_DIR=".curl-cache"
mkdir -p "$CACHE_DIR"

function cached_curl_to_code() {
  local curl_cmd="$1"
  local hash=$(echo "$curl_cmd" | md5sum | cut -d' ' -f1)
  local cache_file="$CACHE_DIR/$hash.ts"
  
  if [[ -f "$cache_file" ]]; then
    echo "📦 Using cached: $cache_file"
    cat "$cache_file"
  else
    echo "🔄 Generating new..."
    echo "$curl_cmd" | curl-to-code --lang typescript > "$cache_file"
    cat "$cache_file"
  fi
}

# Usage
cached_curl_to_code "curl https://api.example.com/users"
```

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history.

## Roadmap

- [ ] Support for GraphQL queries
- [ ] WebSocket conversion
- [ ] gRPC support
- [ ] More languages (Rust, Kotlin, Swift)
- [ ] VS Code extension
- [ ] Browser extension (convert from DevTools directly)
- [ ] Cloud function templates (AWS Lambda, Google Cloud Functions)
- [ ] Postman collection import
- [ ] OpenAPI spec generation from curl commands

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](../../CONTRIBUTING.md) for guidelines.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/muin-company/cli-tools.git
cd cli-tools/packages/curl-to-code

# Install dependencies
npm install

# Build
npm run build

# Test
npm test

# Run locally
node dist/cli.js 'curl https://api.example.com' --lang python
```

### Adding a New Language

See [docs/adding-languages.md](../../docs/adding-languages.md) for a guide on adding new language support.

## FAQ

**Q: Can I convert code back to curl?**  
A: Not yet, but it's on the roadmap! Star the repo to track progress.

**Q: Does it work with authenticated APIs?**  
A: Yes! It supports Basic Auth (`-u`), Bearer tokens, and custom headers.

**Q: What about file uploads?**  
A: Partial support. Multipart form data is coming soon.

**Q: Can I customize the generated code?**  
A: The tool generates templates. You can edit the output or contribute custom generators.

**Q: Is there a VS Code extension?**  
A: Not yet, but it's planned. Follow [@muin_company](https://twitter.com/muin_company) for updates.

**Q: How accurate is the conversion?**  
A: Very accurate for standard HTTP requests. Complex edge cases may need manual tweaking.

## License

MIT © [MUIN](https://muin.company)

## Related Projects

- [@muin/json-to-types](../json-to-types) - Convert JSON to TypeScript/Zod/Python types
- [@muin/cron-explain](../cron-explain) - Understand and generate cron expressions
- [More MUIN tools](https://muin.company/tools)

## Support

- 🐛 [Report a bug](https://github.com/muin-company/cli-tools/issues/new?template=bug_report.md)
- 💡 [Request a feature](https://github.com/muin-company/cli-tools/issues/new?template=feature_request.md)
- 💬 [Join our Discord](https://discord.gg/muin)
- 🐦 [Follow us on Twitter](https://twitter.com/muin_company)

---

**Made with ❤️ by [MUIN](https://muin.company)** - Building AI-powered developer tools

[⬆ Back to top](#muin/curl-to-code)
