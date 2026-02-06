# Testing Guide

## json-to-types

### Basic Tests

**Test 1: Simple JSON**
```bash
echo '{"name":"John","age":30}' | node packages/json-to-types/dist/cli.js
```

Expected:
```typescript
interface Root {
  name: string;
  age: number;
}
```

**Test 2: Nested Objects**
```bash
echo '{"user":{"id":123,"profile":{"name":"John"}}}' | node packages/json-to-types/dist/cli.js
```

Expected:
```typescript
interface Profile {
  name: string;
}

interface User {
  id: number;
  profile: Profile;
}

interface Root {
  user: User;
}
```

**Test 3: Date Detection**
```bash
echo '{"createdAt":"2025-02-06T10:30:00Z"}' | node packages/json-to-types/dist/cli.js
```

Expected:
```typescript
interface Root {
  createdAt: Date;
}
```

**Test 4: Zod Schema**
```bash
echo '{"name":"John","age":30}' | node packages/json-to-types/dist/cli.js --type zod
```

Expected:
```typescript
import { z } from 'zod';

const rootSchema = z.object({
  name: z.string(),
  age: z.number(),
});

type Root = z.infer<typeof rootSchema>;
```

**Test 5: Python Pydantic**
```bash
echo '{"name":"John","age":30}' | node packages/json-to-types/dist/cli.js --type python-pydantic
```

Expected:
```python
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class Root(BaseModel):
    name: str
    age: int
```

## curl-to-code

### Basic Tests

**Test 1: Simple GET**
```bash
node packages/curl-to-code/dist/cli.js 'curl https://api.github.com/users/octocat' --lang python
```

Expected:
```python
import requests

response = requests.get(
    'https://api.github.com/users/octocat',
)
response.raise_for_status()
data = response.json()
print(data)
```

**Test 2: POST with JSON**
```bash
node packages/curl-to-code/dist/cli.js 'curl -X POST https://api.example.com/users -H "Content-Type: application/json" -d "{\"name\":\"John\",\"age\":30}"' --lang python
```

Expected:
```python
import requests
import json

response = requests.post(
    'https://api.example.com/users',
    headers={
        'Content-Type': 'application/json',
    },
    json={"name":"John","age":30},
)
response.raise_for_status()
data = response.json()
print(data)
```

**Test 3: Fetch with TypeScript**
```bash
node packages/curl-to-code/dist/cli.js 'curl https://api.example.com/data' --lang fetch --async --types
```

Expected:
```typescript
async function makeRequest(): Promise<ResponseBody> {
  const response = await fetch('https://api.example.com/data', {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json() as ResponseBody;
  return data;
}
```

**Test 4: Axios with Error Handling**
```bash
node packages/curl-to-code/dist/cli.js 'curl https://api.example.com/users' --lang axios --async --error-handling
```

**Test 5: Go**
```bash
node packages/curl-to-code/dist/cli.js 'curl https://api.example.com/data' --lang go
```

## Interactive Mode Tests

### json-to-types Interactive

```bash
cd packages/json-to-types
node dist/cli.js --interactive
```

Steps:
1. Paste JSON: `{"name":"John","age":30}`
2. Select format: TypeScript Interface
3. Select options: (none)
4. Verify preview shows correct types
5. Choose "Exit"

### curl-to-code Interactive

```bash
cd packages/curl-to-code
node dist/cli.js --interactive
```

Steps:
1. Paste curl: `curl https://api.example.com/users`
2. Select language: JavaScript (Fetch API)
3. Select options: Include error handling, Use async/await
4. Verify preview shows correct code
5. Choose "Exit"

## Edge Cases

### json-to-types

**Empty Array**
```bash
echo '{"tags":[]}' | node packages/json-to-types/dist/cli.js
```

**Null Values**
```bash
echo '{"email":null}' | node packages/json-to-types/dist/cli.js
```

**Optional Fields**
```bash
echo '{"name":"John"}' | node packages/json-to-types/dist/cli.js --optional
```

### curl-to-code

**Headers with Special Characters**
```bash
node packages/curl-to-code/dist/cli.js 'curl https://api.example.com -H "Authorization: Bearer abc:123"' --lang python
```

**Multiple Headers**
```bash
node packages/curl-to-code/dist/cli.js 'curl https://api.example.com -H "Content-Type: application/json" -H "X-API-Key: secret"' --lang fetch
```

**Authentication**
```bash
node packages/curl-to-code/dist/cli.js 'curl https://api.example.com -u user:pass' --lang python
```

## All Tests Passing ✅

Both tools have been tested and are working correctly with:
- Basic input/output
- Multiple formats/languages
- Interactive mode
- Edge cases
- Complex nested structures
