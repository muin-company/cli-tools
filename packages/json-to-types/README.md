# @muin/json-to-types

Convert JSON to TypeScript, Zod, Python types with an interactive CLI.

## Features

- 🎨 **Interactive Mode** - Step-by-step guided type generation
- 📝 **Multiple Formats** - TypeScript (Interface/Type), Zod, Python (TypedDict/Pydantic)
- ⚙️ **Flexible Options** - Optional fields, readonly, exact types
- 👀 **Live Preview** - See generated types before saving
- 📋 **Copy to Clipboard** - Quick copy for instant use

## Installation

```bash
npm install -g @muin/json-to-types
```

Or use directly with npx:

```bash
npx @muin/json-to-types
```

## Usage

### Interactive Mode (Recommended)

```bash
json-to-types --interactive
```

The interactive mode will guide you through:
1. JSON input (via editor)
2. Output format selection
3. Type options configuration
4. Live preview
5. Copy or save options

### CLI Mode

```bash
# From file
json-to-types data.json

# From stdin
echo '{"name":"John","age":30}' | json-to-types

# With options
json-to-types data.json --type zod --optional --output types.ts

# Copy from clipboard and convert
pbpaste | json-to-types --interactive
```

### Options

- `-t, --type <format>` - Output format (default: `ts-interface`)
  - `ts-interface` - TypeScript Interface
  - `ts-type` - TypeScript Type
  - `zod` - Zod Schema
  - `python-typed` - Python TypedDict
  - `python-pydantic` - Python Pydantic Model
- `-i, --interactive` - Interactive mode with live preview
- `--optional` - Make all fields optional
- `--readonly` - Make all fields readonly (TypeScript only)
- `--exact` - Use exact types (string literals instead of string)
- `-o, --output <file>` - Output file (default: stdout)

## Examples

### Example 1: Basic API Response

**Input:**
```json
{
  "user": {
    "id": 123,
    "name": "John Doe",
    "email": "john@example.com",
    "tags": ["developer", "ai"]
  }
}
```

**Command:**
```bash
echo '{"user":{"id":123,"name":"John Doe","email":"john@example.com","tags":["developer","ai"]}}' | json-to-types
```

**Output:**
```typescript
interface Root {
  user: User;
}

interface User {
  id: number;
  name: string;
  email: string;
  tags: string[];
}
```

### Example 2: Zod Schema with Validation

**Command:**
```bash
json-to-types data.json --type zod
```

**Output:**
```typescript
import { z } from 'zod';

const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  tags: z.array(z.string()),
});

const rootSchema = z.object({
  user: userSchema,
});

type Root = z.infer<typeof rootSchema>;
```

### Example 3: Python Pydantic Model

**Command:**
```bash
json-to-types data.json --type python-pydantic
```

**Output:**
```python
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class User(BaseModel):
    id: int
    name: str
    email: str
    tags: List[str]

class Root(BaseModel):
    user: User
```

### Example 4: Interactive Mode Demo

```bash
$ json-to-types --interactive

🔧 JSON to Types - Interactive Mode

? Paste your JSON (will open your editor): (opens editor)

? Select output format: TypeScript Interface

? Select type options: 
  ◉ Make all fields optional
  ◯ Make all fields readonly (TypeScript only)
  ◉ Use exact types (string literals)

Preview:
──────────────────────────────────────────────────
interface Root {
  name?: "John";
  age?: 30;
}
──────────────────────────────────────────────────

? What would you like to do?
  ❯ 📋 Copy to clipboard
    💾 Save to file
    🔄 Regenerate with different options
    ❌ Exit

✓ Copied to clipboard!

Thanks for using json-to-types! 🎉
```

## Advanced Features

### Date Detection

Automatically detects ISO 8601 date strings:

```json
{
  "createdAt": "2025-02-06T10:30:00Z"
}
```

Generates:
```typescript
interface Root {
  createdAt: Date;
}
```

### Nested Objects

Handles unlimited nesting depth:

```json
{
  "company": {
    "department": {
      "team": {
        "member": {
          "name": "John"
        }
      }
    }
  }
}
```

### Optional Fields

Detects `null` values and marks fields as optional:

```json
{
  "name": "John",
  "email": null
}
```

Generates:
```typescript
interface Root {
  name: string;
  email: null | string;
}
```

## Use Cases

- 🔌 **API Integration** - Type API responses instantly
- ⚙️ **Config Files** - Generate types for JSON configs
- 🗄️ **Database Schemas** - Type query results
- 📝 **Form Validation** - Generate Zod schemas for forms
- 🧪 **Testing** - Type your test fixtures
- 📚 **Documentation** - Share type definitions with team

## Why This Tool?

**Before:**
- Manually write types for every API response
- Easy to miss nested fields
- Hard to keep types in sync with data
- Time-consuming and error-prone

**After:**
```bash
curl https://api.example.com/users | json-to-types --interactive
```

5 seconds. Done. ✅

## Contributing

Contributions welcome! Please open an issue or PR.

## License

MIT © MUIN

---

**Made by [MUIN](https://muin.company)** - AI-powered developer tools
