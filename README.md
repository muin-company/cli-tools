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
