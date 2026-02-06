# @muin/curl-to-code

Convert curl commands to production-ready code in any language with an interactive CLI.

## Features

- 🎨 **Interactive Mode** - Step-by-step guided code generation
- 🌍 **Multi-Language** - Python, JavaScript (Fetch/Axios), Node.js, Go, PHP, Ruby
- ⚡ **Production-Ready** - Error handling, type annotations, best practices
- 👀 **Live Preview** - See generated code before saving
- 📋 **Copy to Clipboard** - Quick copy for instant use

## Installation

```bash
npm install -g @muin/curl-to-code
```

Or use directly with npx:

```bash
npx @muin/curl-to-code
```

## Usage

### Interactive Mode (Recommended)

```bash
curl-to-code --interactive
```

The interactive mode will guide you through:
1. curl command input
2. Language selection
3. Code options configuration
4. Live preview
5. Copy or save options

### CLI Mode

```bash
# Direct conversion
curl-to-code 'curl https://api.example.com/users' --lang python

# From clipboard (macOS)
pbpaste | curl-to-code --lang fetch --async --types

# With options
curl-to-code 'curl -X POST https://api.example.com/users -H "Content-Type: application/json" -d "{\"name\":\"John\"}"' \
  --lang axios --error-handling --output request.ts
```

### Options

- `-l, --lang <language>` - Target language (default: `fetch`)
  - `fetch` - JavaScript Fetch API
  - `axios` - JavaScript Axios
  - `node` - Node.js http/https
  - `python` - Python requests
  - `go` - Go net/http
  - `php` - PHP cURL
  - `ruby` - Ruby Net::HTTP
- `-i, --interactive` - Interactive mode with live preview
- `--error-handling` - Include error handling boilerplate
- `--async` - Use async/await (JavaScript/Node.js)
- `--types` - Add TypeScript types (JavaScript/Node.js)
- `-o, --output <file>` - Output file (default: stdout)

## Examples

### Example 1: Simple GET Request

**curl command:**
```bash
curl 'https://api.github.com/users/octocat'
```

**Command:**
```bash
curl-to-code 'curl https://api.github.com/users/octocat' --lang fetch --async
```

**Output:**
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
```

### Example 2: POST with Headers (Python)

**curl command:**
```bash
curl -X POST https://api.example.com/users \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer token123' \
  -d '{"name":"John","email":"john@example.com"}'
```

**Command:**
```bash
curl-to-code 'curl -X POST https://api.example.com/users -H "Content-Type: application/json" -H "Authorization: Bearer token123" -d "{\"name\":\"John\"}"' \
  --lang python --error-handling
```

**Output:**
```python
import requests
import json

try:
    response = requests.post(
        'https://api.example.com/users',
        headers={
            'Content-Type': 'application/json',
            'Authorization': 'Bearer token123',
        },
        json={"name":"John","email":"john@example.com"},
    )
    response.raise_for_status()
    data = response.json()
    print(data)
except requests.exceptions.RequestException as e:
    print(f"Request failed: {e}")
    raise
```

### Example 3: TypeScript with Axios

**Command:**
```bash
curl-to-code 'curl https://api.example.com/users' --lang axios --types --error-handling
```

**Output:**
```typescript
import axios from 'axios';

// TypeScript
interface ResponseBody {
  // Define your response type here
}

async function makeRequest(): Promise<ResponseBody> {
  try {
    const response = await axios<ResponseBody>({
      method: 'get',
      url: 'https://api.example.com/users',
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('API error:', error.response?.data);
      throw new Error(`Request failed: ${error.response?.status}`);
    }
    throw error;
  }
}
```

### Example 4: Go with Error Handling

**Command:**
```bash
curl-to-code 'curl -X POST https://api.example.com/data -H "Content-Type: application/json" -d "{\"key\":\"value\"}"' \
  --lang go --error-handling
```

**Output:**
```go
package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io"
    "net/http"
)

func main() {
    jsonData := []byte(`{"key":"value"}`)
    req, err := http.NewRequest("POST", "https://api.example.com/data", bytes.NewBuffer(jsonData))
    if err != nil {
        panic(err)
    }

    req.Header.Set("Content-Type", "application/json")

    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        panic(err)
    }
    defer resp.Body.Close()

    body, _ := io.ReadAll(resp.Body)
    fmt.Println(string(body))
}
```

### Example 5: Interactive Mode Demo

```bash
$ curl-to-code --interactive

🔧 curl to Code - Interactive Mode

? Paste your curl command: curl -X GET https://api.example.com/users -H "Authorization: Bearer token"

? Select target language:
  ❯ JavaScript (Fetch API)
    JavaScript (Axios)
    Node.js (http/https)
    Python (requests)
    Go (net/http)
    PHP (cURL)
    Ruby (Net::HTTP)

? Select code options:
  ◉ Include error handling
  ◉ Use async/await (JS/Node)
  ◉ Add TypeScript types

Preview:
──────────────────────────────────────────────────
async function makeRequest(): Promise<ResponseBody> {
  try {
    const response = await fetch('https://api.example.com/users', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer token',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json() as ResponseBody;
    return data;
  } catch (error) {
    console.error('Request failed:', error);
    throw error;
  }
}
──────────────────────────────────────────────────

? What would you like to do?
  ❯ 📋 Copy to clipboard
    💾 Save to file
    🔄 Regenerate with different options
    ❌ Exit

✓ Copied to clipboard!

Thanks for using curl-to-code! 🎉
```

## Supported curl Features

- ✅ HTTP methods (GET, POST, PUT, DELETE, etc.)
- ✅ Headers (`-H`)
- ✅ Request body (`-d`, `--data`, `--data-raw`)
- ✅ Authentication (`-u`)
- ✅ URL parsing with query params

## Use Cases

- 🔌 **API Integration** - Convert DevTools "Copy as cURL" to code
- 📝 **Documentation** - Generate code examples from curl commands
- 🧪 **Testing** - Quickly prototype API calls
- 🚀 **Rapid Development** - Skip writing boilerplate HTTP code
- 🎓 **Learning** - See how curl translates to different languages

## Why This Tool?

**Scenario:** You're debugging an API in Chrome DevTools.

**Before:**
1. Right-click → Copy as cURL
2. Manually rewrite in your language
3. Add error handling
4. Fix syntax errors
5. 10 minutes later...

**After:**
```bash
pbpaste | curl-to-code --lang python --interactive
```

5 seconds. Done. ✅

## Contributing

Contributions welcome! Please open an issue or PR.

## License

MIT © MUIN

---

**Made by [MUIN](https://muin.company)** - AI-powered developer tools
