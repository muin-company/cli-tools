# MUIN CLI Tools

Interactive CLI tools for developers.

## Packages

### [@muin/json-to-types](./packages/json-to-types)

Convert JSON to TypeScript, Zod, Python types with interactive CLI.

**Features:**
- Interactive mode with live preview
- Multiple output formats (TS Interface/Type, Zod, Python TypedDict/Pydantic)
- Smart type inference (dates, nested objects, optional fields)
- Copy to clipboard or save to file

**Installation:**
```bash
npm install -g @muin/json-to-types
```

**Usage:**
```bash
json-to-types --interactive
echo '{"name":"John"}' | json-to-types
```

### [@muin/curl-to-code](./packages/curl-to-code)

Convert curl commands to production-ready code in any language.

**Features:**
- Interactive mode with live preview
- Multi-language support (Python, JS, Node, Go, PHP, Ruby)
- Production-ready code with error handling
- TypeScript types support

**Installation:**
```bash
npm install -g @muin/curl-to-code
```

**Usage:**
```bash
curl-to-code --interactive
pbpaste | curl-to-code --lang python
```

### [@muin/readme-gen](./packages/readme-gen)

Generate professional, comprehensive README files from your project.

**Features:**
- Interactive mode with smart project detection
- Pre-built templates (CLI, Library, API, Framework, Monorepo)
- Auto-generates badges, Installation, Usage, API docs
- Multi-language support (EN, KO, JA, ZH)

**Installation:**
```bash
npm install -g @muin/readme-gen
```

**Usage:**
```bash
readme-gen --interactive
readme-gen --auto
```

### [@muin/depcheck-lite](./packages/depcheck-lite)

Find unused dependencies, missing dependencies, and outdated packages.

**Features:**
- Detect unused dependencies
- Find missing dependencies
- Check for outdated packages
- Interactive mode with auto-fix

**Installation:**
```bash
npm install -g @muin/depcheck-lite
```

**Usage:**
```bash
depcheck-lite
depcheck-lite --interactive --fix
```

### [@muin/lockcheck](./packages/lockcheck)

Validate package-lock.json integrity and ensure lock file consistency.

**Features:**
- Lock file validation (npm, Yarn, pnpm)
- Integrity checksum verification
- Security vulnerability scanning
- Version mismatch detection

**Installation:**
```bash
npm install -g @muin/lockcheck
```

**Usage:**
```bash
lockcheck
lockcheck --verify-integrity --security-only
```

### [@muin/cron-explain](./packages/cron-explain)

Understand and generate cron expressions with natural language.

**Features:**
- Convert cron to human-readable text
- Generate cron from natural language
- Interactive mode with validation

**Installation:**
```bash
npm install -g @muin/cron-explain
```

**Usage:**
```bash
cron-explain "0 9 * * 1"
```

## Development

```bash
# Install dependencies
cd packages/json-to-types && npm install
cd packages/curl-to-code && npm install

# Build
npm run build

# Test
node dist/cli.js --help
```

## License

MIT © MUIN
