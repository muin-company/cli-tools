# @muin/json-to-types

[![npm version](https://img.shields.io/npm/v/@muin/json-to-types.svg)](https://www.npmjs.com/package/@muin/json-to-types)
[![npm downloads](https://img.shields.io/npm/dm/@muin/json-to-types.svg)](https://www.npmjs.com/package/@muin/json-to-types)
[![license](https://img.shields.io/npm/l/@muin/json-to-types.svg)](https://github.com/muin-company/cli-tools/blob/main/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/muin-company/cli-tools/blob/main/CONTRIBUTING.md)

Convert JSON to TypeScript, Zod, Python types with an interactive CLI.

## Features

- 🎨 **Interactive Mode** - Step-by-step guided type generation with visual preview
- 📝 **Multiple Formats** - TypeScript (Interface/Type), Zod schemas, Python (TypedDict/Pydantic)
- ⚙️ **Smart Inference** - Detects dates, optional fields, nested structures, arrays
- 🔄 **Flexible Options** - Optional fields, readonly, exact types, naming conventions
- 👀 **Live Preview** - See generated types with syntax highlighting before saving
- 📋 **Copy to Clipboard** - Quick copy for instant use
- 🌳 **Deep Nesting** - Handles unlimited nesting depth with intelligent type extraction
- 🛡️ **Type Safety** - Generates production-ready, type-safe code

## Installation

```bash
npm install -g @muin/json-to-types
```

Or use directly with npx:

```bash
npx @muin/json-to-types
```

## Quick Start

The fastest way to get started is with interactive mode:

```bash
json-to-types --interactive
```

Or pipe JSON directly:

```bash
echo '{"name":"John","age":30}' | json-to-types
```

Or convert from file:

```bash
json-to-types data.json --type zod
```

## Usage

### Interactive Mode (Recommended)

```bash
json-to-types --interactive
```

The interactive mode will guide you through:
1. JSON input via editor or paste
2. Output format selection from visual menu
3. Type options configuration with checkboxes
4. Live preview with syntax highlighting
5. Copy to clipboard or save to file
6. Option to regenerate with different settings

### CLI Mode

```bash
# From file
json-to-types data.json

# From stdin
echo '{"name":"John","age":30}' | json-to-types

# From clipboard (macOS)
pbpaste | json-to-types --type zod

# With options
json-to-types data.json --type python-pydantic --optional --output types.py

# Multiple files
json-to-types user.json post.json comment.json --type ts-interface --output types.ts
```

### Options

#### Required Arguments
- Positional: `<file>` - JSON file path(s) to convert (or via stdin)

#### Output Format Options
- `-t, --type <format>` - Output format (default: `ts-interface`)
  - `ts-interface` - TypeScript Interface (clean, extendable)
  - `ts-type` - TypeScript Type alias (more flexible)
  - `zod` - Zod validation schema (runtime validation)
  - `python-typed` - Python TypedDict (simple typing)
  - `python-pydantic` - Python Pydantic models (validation + parsing)
  - `json-schema` - JSON Schema (OpenAPI compatible)

#### Type Generation Options
- `-i, --interactive` - Launch interactive mode with visual UI
- `--optional` - Make all fields optional (useful for partial updates)
- `--readonly` - Make all fields readonly (TypeScript/immutability)
- `--exact` - Use exact literal types instead of primitive types
- `--naming <style>` - Naming convention for types: `pascal`, `camel`, `snake`
- `--prefix <string>` - Add prefix to generated type names
- `--suffix <string>` - Add suffix to generated type names (default: none)
- `-o, --output <file>` - Write output to file instead of stdout
- `--no-comments` - Exclude explanatory comments from generated code
- `--flatten` - Flatten nested objects into separate type definitions

## Examples

### Example 1: Basic API Response

**Input JSON:**
```json
{
  "user": {
    "id": 123,
    "name": "John Doe",
    "email": "john@example.com",
    "tags": ["developer", "ai"],
    "isActive": true
  },
  "timestamp": "2025-02-08T10:30:00Z"
}
```

**Command:**
```bash
json-to-types user.json
```

**Output (TypeScript Interface):**
```typescript
interface Root {
  user: User;
  timestamp: Date;
}

interface User {
  id: number;
  name: string;
  email: string;
  tags: string[];
  isActive: boolean;
}
```

### Example 2: Zod Schema with Runtime Validation

**Command:**
```bash
json-to-types user.json --type zod
```

**Output:**
```typescript
import { z } from 'zod';

// User schema
const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(), // Inferred from pattern
  tags: z.array(z.string()),
  isActive: z.boolean(),
});

// Root schema
const rootSchema = z.object({
  user: userSchema,
  timestamp: z.coerce.date(),
});

// TypeScript types inferred from schemas
type Root = z.infer<typeof rootSchema>;
type User = z.infer<typeof userSchema>;

// Export for use in your application
export { rootSchema, userSchema, Root, User };

// Usage example:
// const validated = rootSchema.parse(jsonData);
// if (!validated) { throw new Error('Invalid data'); }
```

### Example 3: Python Pydantic Model

**Command:**
```bash
json-to-types user.json --type python-pydantic
```

**Output:**
```python
from pydantic import BaseModel, EmailStr, Field
from typing import List
from datetime import datetime

class User(BaseModel):
    """User model generated from JSON"""
    id: int = Field(..., description="User ID")
    name: str = Field(..., min_length=1)
    email: EmailStr  # Email validation included
    tags: List[str] = Field(default_factory=list)
    is_active: bool = Field(default=True, alias='isActive')
    
    class Config:
        # Allow population by field name or alias
        populate_by_name = True

class Root(BaseModel):
    """Root model generated from JSON"""
    user: User
    timestamp: datetime
    
    class Config:
        # Enable JSON encoding for datetime
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }

# Usage example:
# data = Root.model_validate(json_data)
# if data.user.is_active:
#     print(f"Active user: {data.user.name}")
```

### Example 4: Optional Fields for Partial Updates

**Input:**
```json
{
  "id": 1,
  "title": "Update Post",
  "content": "New content",
  "published": false
}
```

**Command:**
```bash
json-to-types post.json --optional --readonly
```

**Output:**
```typescript
interface Post {
  readonly id?: number;
  readonly title?: string;
  readonly content?: string;
  readonly published?: boolean;
}

// Usage for partial updates:
// const updates: Post = { title: "New Title" };
// await updatePost(postId, updates);
```

### Example 5: Exact/Literal Types

**Command:**
```bash
json-to-types config.json --exact
```

**Input:**
```json
{
  "env": "production",
  "region": "us-east-1",
  "retryAttempts": 3
}
```

**Output:**
```typescript
interface Config {
  env: "production";      // Literal type instead of string
  region: "us-east-1";    // Literal type instead of string
  retryAttempts: 3;       // Literal type instead of number
}

// This prevents typos at compile time:
// const config: Config = { env: "prod" };  // ❌ Error!
// const config: Config = { env: "production" };  // ✅ OK
```

### Example 6: Complex Nested Structure

**Input:**
```json
{
  "company": {
    "name": "MUIN",
    "departments": [
      {
        "name": "Engineering",
        "teams": [
          {
            "name": "Backend",
            "members": [
              {
                "name": "Alice",
                "role": "Senior Engineer",
                "skills": ["Go", "Kubernetes"]
              }
            ]
          }
        ]
      }
    ]
  }
}
```

**Command:**
```bash
json-to-types company.json --flatten
```

**Output:**
```typescript
interface Company {
  name: string;
  departments: Department[];
}

interface Department {
  name: string;
  teams: Team[];
}

interface Team {
  name: string;
  members: Member[];
}

interface Member {
  name: string;
  role: string;
  skills: string[];
}

interface Root {
  company: Company;
}
```

### Example 7: Interactive Mode Demo

```bash
$ json-to-types --interactive

╭──────────────────────────────────────────────────────────╮
│  📝 JSON to Types - Interactive Mode                     │
│  Convert JSON to type-safe interfaces and schemas        │
╰──────────────────────────────────────────────────────────╯

? How would you like to provide JSON?
  ❯ Paste directly
    Open in editor ($EDITOR)
    Read from clipboard

(You paste JSON here)

? Select output format:
  ❯ TypeScript Interface - Clean, extendable
    TypeScript Type - More flexible
    Zod Schema - Runtime validation
    Python Pydantic - Validation + parsing
    Python TypedDict - Simple typing
    JSON Schema - OpenAPI compatible

? Select type options (Space to select, Enter to confirm):
  ◯ Make all fields optional
  ◯ Make all fields readonly
  ◉ Use exact literal types
  ◉ Add descriptive comments
  ◯ Flatten nested objects

? Name for the root interface: ApiResponse

╭─── Preview ─────────────────────────────────────────────╮
│ /**                                                      │
│  * API response type                                     │
│  * Generated from JSON with @muin/json-to-types         │
│  */                                                      │
│ interface ApiResponse {                                  │
│   user: User;                                            │
│   timestamp: Date;                                       │
│ }                                                        │
│                                                          │
│ interface User {                                         │
│   id: number;                                            │
│   name: "John Doe";  // Exact literal type              │
│   email: string;                                         │
│   tags: string[];                                        │
│ }                                                        │
╰──────────────────────────────────────────────────────────╯

? What would you like to do?
  ❯ 📋 Copy to clipboard
    💾 Save to file
    🔄 Regenerate with different options
    ✏️  Edit JSON input
    🌐 Try different output format
    ❌ Exit

✓ Copied to clipboard!

💡 Tip: Use --type zod for runtime validation
    json-to-types data.json --type zod

Thanks for using json-to-types! 🎉
Visit https://muin.company/tools for more
```

### Example 8: Multiple Files to Single Output

**Command:**
```bash
json-to-types user.json post.json comment.json --output models.ts
```

**Output:**
```typescript
// Generated from user.json
interface User {
  id: number;
  name: string;
  email: string;
}

// Generated from post.json
interface Post {
  id: number;
  title: string;
  content: string;
  authorId: number;
}

// Generated from comment.json
interface Comment {
  id: number;
  postId: number;
  userId: number;
  text: string;
  createdAt: Date;
}
```

### Example 9: JSON Schema for OpenAPI

**Command:**
```bash
json-to-types user.json --type json-schema
```

**Output:**
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "User",
  "type": "object",
  "properties": {
    "id": {
      "type": "integer",
      "description": "User ID"
    },
    "name": {
      "type": "string",
      "minLength": 1
    },
    "email": {
      "type": "string",
      "format": "email"
    },
    "tags": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "isActive": {
      "type": "boolean"
    }
  },
  "required": ["id", "name", "email", "tags", "isActive"]
}
```

## Advanced Features

### Smart Type Inference

The tool intelligently infers types beyond simple JSON primitives:

| JSON Value | Inferred Type | Example |
|------------|---------------|---------|
| `"2025-02-08T10:30:00Z"` | `Date` | ISO 8601 dates |
| `"john@example.com"` | `EmailStr` (Pydantic) | Email pattern |
| `"https://example.com"` | `HttpUrl` (Pydantic) | URL pattern |
| `"550e8400-e29b-41d4-a716-446655440000"` | `UUID` | UUID pattern |
| `null` | `T \| null` | Nullable fields |
| `[1, 2, 3]` | `number[]` | Homogeneous arrays |
| `[1, "a", true]` | `(number \| string \| boolean)[]` | Mixed arrays |

### Naming Convention Support

Convert between different naming styles automatically:

```bash
# Input JSON (snake_case)
{"user_name": "John", "created_at": "2025-02-08"}

# Output with --naming pascal
interface UserData {
  UserName: string;
  CreatedAt: Date;
}

# Output with --naming camel
interface UserData {
  userName: string;
  createdAt: Date;
}
```

### Type Prefixing/Suffixing

Avoid naming collisions with custom prefixes/suffixes:

```bash
json-to-types user.json --prefix API --suffix DTO
```

```typescript
interface APIUserDTO {
  id: number;
  name: string;
}
```

## Common Use Cases

### 1. **API Response Typing**
The most common use case - type your API responses instantly:

```bash
# Fetch API response and generate types
curl https://api.example.com/users/1 | json-to-types --type ts-interface

# Or save the response first
curl https://api.example.com/users/1 > user.json
json-to-types user.json --output src/types/user.ts
```

### 2. **Form Validation with Zod**
Generate Zod schemas for form validation:

```bash
# From your form structure
json-to-types form-structure.json --type zod --output src/schemas/form.ts
```

```typescript
import { formSchema } from './schemas/form';

function handleSubmit(data: unknown) {
  const validated = formSchema.parse(data);
  // validated is now type-safe!
}
```

### 3. **Database Query Results**
Type your database query results:

```bash
# Export query result as JSON
psql -d mydb -c "SELECT * FROM users LIMIT 1" --json > user.json
json-to-types user.json --type ts-interface --output src/types/db.ts
```

### 4. **Config Files**
Generate types for JSON configuration files:

```bash
json-to-types config/settings.json --exact --readonly --output src/types/config.ts
```

### 5. **Test Fixtures**
Type your test data:

```bash
# Generate types for all test fixtures
for file in tests/fixtures/*.json; do
  json-to-types "$file" --output "tests/types/$(basename $file .json).ts"
done
```

### 6. **API Documentation**
Generate JSON Schemas for API documentation:

```bash
# For OpenAPI/Swagger
json-to-types examples/request.json --type json-schema > docs/schemas/request.json
```

### 7. **Migration from JavaScript**
Add types to existing JavaScript projects:

```bash
# Find all JSON files in your project
find src -name "*.json" -type f | while read file; do
  json-to-types "$file" --output "${file%.json}.d.ts"
done
```

## Why This Tool?

### The Problem

You're working with an API response...

**Before json-to-types:**
1. Copy JSON response from DevTools
2. Manually create interface in your code
3. Type out each field (typos happen!)
4. Forget to handle nested objects properly
5. Miss optional fields
6. Incorrect types for dates/arrays
7. 15-20 minutes of tedious work 😓
8. Types drift out of sync with actual data

**After json-to-types:**
```bash
curl https://api.example.com/data | json-to-types --interactive
```

**10 seconds. Done. Perfect types. ✅**

### The Benefits

- ⏱️ **Save 15-20 minutes per type definition**
- 🐛 **Fewer bugs** - Accurate types prevent runtime errors
- 🔄 **Stay in sync** - Regenerate when API changes
- 📚 **Learning tool** - See how JSON maps to types
- ✅ **100% accuracy** - No manual typing errors
- 🛡️ **Type safety** - Catch errors at compile time

## Common Gotchas & Troubleshooting

### Issue: "Command not found: json-to-types"

**Cause:** Package not installed globally or npx cache issue

**Solution:**
```bash
# Reinstall globally
npm uninstall -g @muin/json-to-types
npm install -g @muin/json-to-types

# Or clear npx cache
npx clear-npx-cache
npx @muin/json-to-types --help

# Verify installation
which json-to-types
npm list -g @muin/json-to-types
```

### Issue: "Unexpected token" when parsing JSON

**Cause:** Invalid JSON input (common mistakes: trailing commas, single quotes, comments)

**Solution:**
```bash
# Invalid JSON (trailing comma):
# { "name": "John", "age": 30, }

# Valid JSON:
# { "name": "John", "age": 30 }

# Use a JSON validator first
cat data.json | jq empty  # Will show errors if invalid

# Or let the tool validate with better error messages
json-to-types --interactive
# Paste JSON → tool will show exactly where the error is
```

### Issue: Generated types are too generic (all fields are `any`)

**Cause:** Empty arrays or null values in sample JSON

**Solution:**
```bash
# Problem: Empty array doesn't show type
{
  "items": []  # Generated as: items: any[]
}

# Solution 1: Provide sample with data
{
  "items": [{ "id": 1, "name": "Sample" }]
  # Generated as: items: Item[]
}

# Solution 2: Manually specify type after generation
# Or provide multiple samples
json-to-types sample1.json sample2.json sample3.json
```

### Issue: Date strings not recognized as Date type

**Cause:** Non-standard date format

**Solution:**
```bash
# Recognized formats:
"2025-02-08T10:30:00Z"        # ISO 8601 ✅
"2025-02-08"                   # ISO Date ✅
"2025-02-08 10:30:00"          # SQL DateTime ✅

# NOT recognized:
"02/08/2025"                   # US format ❌
"8th February 2025"            # Written format ❌

# Workaround: Add --no-inference flag (coming soon)
# Or manually change string to Date in generated code
```

### Issue: TypeScript types fail to compile

**Cause:** Circular references or very deep nesting

**Solution:**
```typescript
// Problem: Circular reference
interface User {
  friends: User[];  // References itself
}

// Solution 1: Use type instead of interface
type User = {
  friends: User[];  // TypeScript handles this better with types
}

// Solution 2: Add depth limit (coming soon)
json-to-types data.json --max-depth 5

// Solution 3: Flatten the structure
json-to-types data.json --flatten
```

### Issue: Zod schema fails validation with actual data

**Cause:** Sample JSON doesn't represent all possible values

**Solution:**
```typescript
// Generated schema (from sample):
const userSchema = z.object({
  role: z.literal("admin")  // Only saw "admin" in sample
});

// Actual data has multiple roles:
// { role: "user" }  // ❌ Validation fails!

// Solution 1: Provide multiple samples
json-to-types admin.json user.json guest.json --type zod

// Solution 2: Manually update generated schema
const userSchema = z.object({
  role: z.enum(["admin", "user", "guest"])  // All possible values
});

// Solution 3: Use string instead of literal (less type-safe)
const userSchema = z.object({
  role: z.string()
});
```

### Issue: Python Pydantic fields with invalid names

**Cause:** JSON keys are Python reserved keywords

**Solution:**
```python
# Problem: JSON key is Python keyword
{ "class": "A", "from": "NYC" }

# Generated code uses alias:
class Data(BaseModel):
    class_: str = Field(alias='class')
    from_: str = Field(alias='from')
    
    class Config:
        populate_by_name = True

# Usage (both work):
data = Data(class_="A", from_="NYC")
data = Data(**{"class": "A", "from": "NYC"})
```

### Issue: Optional fields marked as required

**Cause:** Tool saw field in sample, assumed it's always present

**Solution:**
```bash
# If you know some fields are optional:
json-to-types data.json --optional  # Makes ALL fields optional

# Or manually edit generated code:
# Before:
interface User {
  email: string;
}

# After:
interface User {
  email?: string;  # Add ? for optional
}

# Or use Zod with optional:
const userSchema = z.object({
  email: z.string().optional()
});
```

### Issue: Array types are too specific

**Cause:** Array had mixed types in sample

**Solution:**
```typescript
// Problem: Sample had [1, "a", true]
// Generated: (number | string | boolean)[]

// If you know it should be string[]:
// Option 1: Provide better sample
{ "items": ["a", "b", "c"] }

// Option 2: Manually fix generated type
items: string[]  // Instead of (number | string | boolean)[]
```

### Issue: Large JSON file causes memory issues

**Cause:** Tool loads entire file into memory

**Solution:**
```bash
# For very large files (>100MB):
# Option 1: Use jq to extract a sample
jq '.[0]' huge-array.json | json-to-types

# Option 2: Split into smaller files
jq -c '.[]' huge-array.json | head -5 | json-to-types

# Option 3: Increase Node.js memory
NODE_OPTIONS="--max-old-space-size=4096" json-to-types huge.json
```

### Issue: Generated code has naming conflicts

**Cause:** JSON keys conflict with TypeScript/Python keywords

**Solution:**
```bash
# Use prefix/suffix to avoid conflicts
json-to-types data.json --prefix API --suffix Model

# Before:
interface User { ... }

# After:
interface APIUserModel { ... }

# Or use naming convention
json-to-types data.json --naming pascal
```

## Performance Tips

### Tip 1: Use the Right Output Format

- **Quick typing**: `ts-interface` (lightest, fastest)
- **Runtime validation**: `zod` (adds validation logic)
- **Python projects**: `python-pydantic` (includes validation)
- **API docs**: `json-schema` (OpenAPI compatible)
- **Simple Python**: `python-typed` (no extra deps)

### Tip 2: Batch Process Multiple Files

```bash
# Process all JSON files in a directory
find ./api-responses -name "*.json" | while read file; do
  json-to-types "$file" --output "./types/$(basename $file .json).ts"
done

# Or use xargs for parallel processing
find ./api-responses -name "*.json" | xargs -P 4 -I {} \
  json-to-types {} --output "./types/{}.ts"
```

### Tip 3: Create Aliases for Common Operations

```bash
# Add to ~/.bashrc or ~/.zshrc
alias j2t='json-to-types --interactive'
alias j2z='json-to-types --type zod'
alias j2p='json-to-types --type python-pydantic'

# Usage
pbpaste | j2t
curl https://api.example.com/data | j2z
```

### Tip 4: Integrate with Your Editor

```bash
# VS Code: Add to tasks.json
{
  "label": "Generate Types from JSON",
  "type": "shell",
  "command": "json-to-types ${file} --output ${fileDirname}/${fileBasenameNoExtension}.ts"
}

# Vim: Add to .vimrc
command! J2T !json-to-types % --output %:r.ts
```

## Comparison with Alternatives

| Feature | @muin/json-to-types | quicktype | json2ts | transform.tools |
|---------|---------------------|-----------|---------|-----------------|
| Interactive mode | ✅ Yes | ❌ No | ❌ No | ⚠️ Web only |
| TypeScript | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes |
| Zod schemas | ✅ Yes | ❌ No | ❌ No | ⚠️ Limited |
| Python Pydantic | ✅ Yes | ✅ Yes | ❌ No | ❌ No |
| Clipboard support | ✅ Yes | ❌ No | ❌ No | ✅ Yes |
| Optional fields | ✅ Configurable | ⚠️ Auto-detect | ❌ No | ⚠️ Auto-detect |
| CLI | ✅ Yes | ✅ Yes | ✅ Yes | ❌ No |
| Exact types | ✅ Yes | ❌ No | ❌ No | ❌ No |
| Live preview | ✅ Yes | ❌ No | ❌ No | ✅ Yes |
| Naming styles | ✅ Yes | ✅ Yes | ❌ No | ❌ No |

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history.

## Roadmap

- [ ] Support for more output formats (Rust, Go structs, Java classes)
- [ ] JSON Schema validation before conversion
- [ ] Merge types from multiple JSON samples
- [ ] GraphQL schema generation
- [ ] Protobuf message definitions
- [ ] VS Code extension with inline preview
- [ ] Watch mode for auto-regeneration
- [ ] Custom type transformers/plugins
- [ ] Support for JSON5 and JSONC (comments)
- [ ] Integration with OpenAPI/Swagger tools

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](../../CONTRIBUTING.md) for guidelines.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/muin-company/cli-tools.git
cd cli-tools/packages/json-to-types

# Install dependencies
npm install

# Build
npm run build

# Test
npm test

# Run locally
node dist/cli.js data.json --type ts-interface
```

### Adding a New Output Format

See [docs/adding-formats.md](../../docs/adding-formats.md) for a guide on adding new output formats.

## FAQ

**Q: Can I convert code back to JSON?**  
A: Not directly, but you can use the types for runtime validation with Zod/Pydantic, which can generate sample data.

**Q: Does it handle large JSON files?**  
A: Yes, but very large files (>100MB) may need Node.js memory increase. See troubleshooting above.

**Q: Can I customize the generated code?**  
A: Yes! Use `--prefix`, `--suffix`, `--naming`, and other options. Or edit the output after generation.

**Q: What about circular references?**  
A: The tool detects and handles most circular refs. Complex cases may need manual adjustment.

**Q: Is there a web version?**  
A: Try it online at [tools.muin.company/json-to-types](https://tools.muin.company/json-to-types)

**Q: Can I use it in my build pipeline?**  
A: Absolutely! It's designed for CI/CD integration. See "Performance Tips" above.

**Q: Does it work with JSON5 (comments, trailing commas)?**  
A: Not yet, but it's on the roadmap. Use standard JSON for now.

**Q: How do I type API responses with pagination?**  
A: Provide a sample with pagination structure, or manually wrap the generated type:
```typescript
interface PaginatedResponse<T> {
  data: T[];
  page: number;
  totalPages: number;
}
type UserList = PaginatedResponse<User>;
```

## License

MIT © [MUIN](https://muin.company)

## Related Projects

- [@muin/curl-to-code](../curl-to-code) - Convert curl commands to code in any language
- [@muin/cron-explain](../cron-explain) - Understand and generate cron expressions
- [More MUIN tools](https://muin.company/tools)

## Support

- 🐛 [Report a bug](https://github.com/muin-company/cli-tools/issues/new?template=bug_report.md)
- 💡 [Request a feature](https://github.com/muin-company/cli-tools/issues/new?template=feature_request.md)
- 💬 [Join our Discord](https://discord.gg/muin)
- 🐦 [Follow us on Twitter](https://twitter.com/muin_company)

## Acknowledgments

- Inspired by [quicktype](https://github.com/quicktype/quicktype)
- Built with [TypeScript](https://www.typescriptlang.org/)
- Uses [Zod](https://github.com/colinhacks/zod) for schema generation
- Uses [Pydantic](https://pydantic-docs.helpmanual.io/) patterns for Python

---

**Made with ❤️ by [MUIN](https://muin.company)** - Building AI-powered developer tools

[⬆ Back to top](#muinjson-to-types)
