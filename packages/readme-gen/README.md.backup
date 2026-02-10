# @muin/readme-gen

[![npm version](https://img.shields.io/npm/v/@muin/readme-gen.svg)](https://www.npmjs.com/package/@muin/readme-gen)
[![npm downloads](https://img.shields.io/npm/dm/@muin/readme-gen.svg)](https://www.npmjs.com/package/@muin/readme-gen)
[![license](https://img.shields.io/npm/l/@muin/readme-gen.svg)](https://github.com/muin-company/cli-tools/blob/main/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/muin-company/cli-tools/blob/main/CONTRIBUTING.md)

Generate professional, comprehensive README files from your project with an interactive CLI.

## Features

- 🎨 **Interactive Mode** - Guided README generation with smart defaults
- 🔍 **Auto-Detection** - Analyzes your project structure, package.json, git history
- 📋 **Templates** - Pre-built templates for different project types (npm, CLI, API, library)
- 🎯 **Smart Sections** - Auto-generates Installation, Usage, API docs, Contributing
- 🖼️ **Badge Generation** - npm, build status, coverage, PRs welcome, license badges
- 📊 **Stats Integration** - Pulls GitHub stars, contributors, downloads from npm
- 🔄 **Live Preview** - See your README before saving
- ✨ **Markdown Linting** - Ensures proper formatting and structure
- 🌐 **Multi-Language** - Supports i18n README generation (EN, KO, JA, ZH)

## Installation

```bash
npm install -g @muin/readme-gen
```

Or use directly with npx:

```bash
npx @muin/readme-gen
```

## Quick Start

The fastest way to generate a README is with interactive mode:

```bash
readme-gen --interactive
```

Or auto-generate from your project:

```bash
cd your-project
readme-gen --auto
```

## Usage

### Interactive Mode (Recommended)

```bash
readme-gen --interactive
```

The interactive mode will guide you through:
1. Project detection and analysis
2. Template selection (CLI tool, Library, API, Framework, etc.)
3. Section customization with checkboxes
4. Badge configuration
5. Live preview with syntax highlighting
6. Save to file or clipboard

### CLI Mode

```bash
# Auto-generate from current directory
readme-gen --auto

# Use a specific template
readme-gen --template cli --name "my-tool" --description "Does awesome stuff"

# Update existing README
readme-gen --update README.md --add-badges --add-contributing

# Generate from package.json
readme-gen --from-package package.json

# Multi-language generation
readme-gen --lang ko --output README.ko.md
```

### Options

#### Generation Mode
- `-i, --interactive` - Launch interactive mode with visual UI (default)
- `-a, --auto` - Auto-generate from project analysis
- `-u, --update <file>` - Update existing README file
- `-t, --template <type>` - Use template: `cli`, `library`, `api`, `framework`, `monorepo`

#### Project Information
- `-n, --name <name>` - Project name (auto-detected from package.json)
- `-d, --description <desc>` - Project description
- `--author <name>` - Author name
- `--repo <url>` - GitHub repository URL

#### Sections
- `--add-badges` - Add npm/build/coverage badges
- `--add-installation` - Add installation section
- `--add-usage` - Add usage examples
- `--add-api` - Generate API documentation from code
- `--add-contributing` - Add contributing guidelines
- `--add-license` - Add license section
- `--add-changelog` - Add changelog section
- `--add-roadmap` - Add roadmap section
- `--add-faq` - Add FAQ section
- `--add-troubleshooting` - Add troubleshooting section

#### Output Options
- `-o, --output <file>` - Output file path (default: README.md)
- `-l, --lang <language>` - Language code: `en`, `ko`, `ja`, `zh` (default: en)
- `--no-preview` - Skip live preview
- `--no-lint` - Skip markdown linting
- `-f, --force` - Overwrite existing file without prompting

## Examples

### Example 1: Auto-Generate from Project

**Project structure:**
```
my-cli-tool/
├── package.json
├── src/
│   ├── cli.ts
│   └── index.ts
├── bin/
│   └── my-cli
└── tests/
```

**Command:**
```bash
cd my-cli-tool
readme-gen --auto
```

**Output (README.md):**
```markdown
# my-cli-tool

[![npm version](https://img.shields.io/npm/v/my-cli-tool.svg)](https://www.npmjs.com/package/my-cli-tool)
[![npm downloads](https://img.shields.io/npm/dm/my-cli-tool.svg)](https://www.npmjs.com/package/my-cli-tool)
[![license](https://img.shields.io/npm/l/my-cli-tool.svg)](https://github.com/user/my-cli-tool/blob/main/LICENSE)

A powerful CLI tool for developers.

## Installation

```bash
npm install -g my-cli-tool
```

## Usage

```bash
my-cli --help
```

## Features

- Fast and efficient
- Easy to use
- Well tested

## API

See [API.md](./API.md) for detailed API documentation.

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

MIT © Your Name
```

**Terminal output:**
```bash
✓ Detected project type: CLI tool
✓ Analyzed package.json
✓ Found 2 source files
✓ Generated Installation section
✓ Generated Usage section
✓ Generated Features section (3 features detected)
✓ Added badges (npm, downloads, license)
✓ Linted markdown (0 issues)

✨ README.md generated successfully! (127 lines)

Suggestions:
  - Add examples with --add-usage
  - Add API docs with --add-api
  - Add troubleshooting with --add-troubleshooting
```

### Example 2: Interactive Mode with Full Options

```bash
$ readme-gen --interactive

╭─────────────────────────────────────────────────────────╮
│  📝 README Generator - Interactive Mode                 │
│  Create professional README files in minutes            │
╰─────────────────────────────────────────────────────────╯

✓ Analyzing project...
  → Found package.json
  → Detected TypeScript project
  → Found Git repository
  → 15 commits, 2 contributors

? Project name: awesome-api
? Short description: A RESTful API framework for Node.js
? Author: Jane Doe <jane@example.com>
? License: MIT
? GitHub repo: https://github.com/jane/awesome-api

? Select project type:
  ○ CLI Tool
  ○ Library/Package
  ● RESTful API
  ○ Web Framework
  ○ Monorepo

? Select sections to include (Space to select, Enter to confirm):
  ◉ Installation
  ◉ Quick Start
  ◉ Usage Examples
  ◉ API Reference
  ◉ Configuration
  ◉ Authentication
  ◉ Error Handling
  ◉ Performance Tips
  ◉ Troubleshooting
  ◉ FAQ
  ◉ Contributing
  ◉ Changelog
  ◉ License

? Badge style:
  ● shields.io (standard)
  ○ flat-square
  ○ for-the-badge
  ○ minimal

? Include additional badges:
  ◉ npm version
  ◉ npm downloads
  ◉ build status
  ◉ coverage
  ◉ license
  ◉ PRs welcome
  ◯ GitHub stars
  ◯ Dependencies status

╭─── Live Preview ────────────────────────────────────────╮
│ # awesome-api                                           │
│                                                         │
│ [![npm version](...)  [![downloads](...)  [...]        │
│                                                         │
│ A RESTful API framework for Node.js                    │
│                                                         │
│ ## Features                                             │
│                                                         │
│ - 🚀 Fast and lightweight                               │
│ - 🔒 Built-in authentication                            │
│ - 📊 Request logging and monitoring                     │
│ - 🔄 Auto-reload in development                         │
│ - ✅ TypeScript support                                 │
│                                                         │
│ ## Installation                                         │
│                                                         │
│ ```bash                                                 │
│ npm install awesome-api                                 │
│ ```                                                     │
│                                                         │
│ ## Quick Start                                          │
│                                                         │
│ ```javascript                                           │
│ const { createApp } = require('awesome-api');           │
│                                                         │
│ const app = createApp();                                │
│                                                         │
│ app.get('/hello', (req, res) => {                       │
│   res.json({ message: 'Hello World!' });                │
│ });                                                     │
│                                                         │
│ app.listen(3000);                                       │
│ ```                                                     │
│ ...                                                     │
╰─────────────────────────────────────────────────────────╯

? What would you like to do?
  ❯ 💾 Save to README.md
    📋 Copy to clipboard
    ✏️  Edit sections
    🔄 Regenerate with different template
    🌐 Generate in another language (i18n)
    ❌ Cancel

✓ Saved to README.md (487 lines)

✨ README generated successfully!

Next steps:
  - Review and customize your README
  - Add screenshots or GIFs to examples
  - Generate API docs: readme-gen --add-api
  - Create i18n versions: readme-gen --lang ko

Thanks for using readme-gen! 🎉
```

### Example 3: Update Existing README with Sections

**Before (README.md):**
```markdown
# my-project

Does cool stuff.

## Usage

Run `my-project start`.
```

**Command:**
```bash
readme-gen --update README.md \
  --add-badges \
  --add-installation \
  --add-contributing \
  --add-troubleshooting \
  --add-faq
```

**After (README.md):**
```markdown
# my-project

[![npm version](https://img.shields.io/npm/v/my-project.svg)](https://www.npmjs.com/package/my-project)
[![npm downloads](https://img.shields.io/npm/dm/my-project.svg)](https://www.npmjs.com/package/my-project)
[![license](https://img.shields.io/npm/l/my-project.svg)](https://github.com/user/my-project/blob/main/LICENSE)

Does cool stuff.

## Installation

```bash
npm install -g my-project
```

## Usage

Run `my-project start`.

## Troubleshooting

### Issue: Command not found

**Solution:**
```bash
npm install -g my-project
```

### Issue: Permission denied

**Solution:**
```bash
sudo npm install -g my-project
```

## FAQ

**Q: How do I get started?**  
A: Run `my-project --help` to see available commands.

**Q: Where can I get help?**  
A: Open an issue on GitHub or check our documentation.

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## License

MIT
```

**Terminal output:**
```bash
✓ Loaded existing README.md
✓ Added badges section
✓ Added Installation section
✓ Preserved existing Usage section
✓ Added Troubleshooting section (2 common issues)
✓ Added FAQ section (2 questions)
✓ Added Contributing section
✓ Linted markdown (0 issues)

✨ README.md updated! (+67 lines, 153 total)
```

### Example 4: Generate README from package.json

**package.json:**
```json
{
  "name": "@acme/validator",
  "version": "2.1.0",
  "description": "Schema validation library with TypeScript support",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "bin": {
    "validate": "./bin/cli.js"
  },
  "scripts": {
    "test": "jest",
    "build": "tsc"
  },
  "keywords": ["validation", "schema", "typescript"],
  "author": "ACME Corp",
  "license": "Apache-2.0",
  "repository": {
    "type": "git",
    "url": "https://github.com/acme/validator"
  }
}
```

**Command:**
```bash
readme-gen --from-package package.json --template library --add-api
```

**Output (README.md - partial):**
```markdown
# @acme/validator

[![npm version](https://img.shields.io/npm/v/@acme/validator.svg)](https://www.npmjs.com/package/@acme/validator)
[![npm downloads](https://img.shields.io/npm/dm/@acme/validator.svg)](https://www.npmjs.com/package/@acme/validator)
[![license](https://img.shields.io/npm/l/@acme/validator.svg)](https://github.com/acme/validator/blob/main/LICENSE)

Schema validation library with TypeScript support

## Installation

```bash
npm install @acme/validator
```

## Usage

```javascript
const { validate } = require('@acme/validator');

const schema = {
  name: 'string',
  age: 'number',
  email: 'email'
};

const result = validate(data, schema);
```

## CLI Usage

The package includes a CLI tool:

```bash
npx validate schema.json data.json
```

## API Reference

### `validate(data, schema)`

Validates data against a schema.

**Parameters:**
- `data` (any) - The data to validate
- `schema` (Schema) - The validation schema

**Returns:** ValidationResult

**Example:**
```javascript
const result = validate({ name: 'John' }, { name: 'string' });
if (result.valid) {
  console.log('Valid!');
}
```

## Keywords

`validation`, `schema`, `typescript`

## License

Apache-2.0 © ACME Corp
```

### Example 5: Multi-Language README Generation

Generate READMEs in multiple languages:

```bash
# Generate English version
readme-gen --auto --output README.md

# Generate Korean version
readme-gen --lang ko --output README.ko.md

# Generate Japanese version
readme-gen --lang ja --output README.ja.md

# Generate Chinese version
readme-gen --lang zh --output README.zh.md
```

**Output structure:**
```
your-project/
├── README.md (English)
├── README.ko.md (Korean)
├── README.ja.md (Japanese)
└── README.zh.md (Chinese)
```

**README.ko.md example:**
```markdown
# 내-프로젝트

[![npm 버전](https://img.shields.io/npm/v/my-project.svg)](...)

멋진 기능을 제공하는 CLI 도구입니다.

## 설치

```bash
npm install -g my-project
```

## 사용법

```bash
my-project --help
```

## 기여하기

기여를 환영합니다! [CONTRIBUTING.md](./CONTRIBUTING.md)를 참조하세요.
```

### Example 6: Generate API Documentation from Code

**Source code (src/api.ts):**
```typescript
/**
 * Fetches user data from the API
 * @param userId - The user ID to fetch
 * @returns User object with profile data
 * @throws {NotFoundError} When user doesn't exist
 */
export async function getUser(userId: string): Promise<User> {
  // ...
}

/**
 * Creates a new user account
 * @param data - User registration data
 * @returns Created user with ID
 */
export async function createUser(data: UserInput): Promise<User> {
  // ...
}
```

**Command:**
```bash
readme-gen --add-api --scan src/
```

**Output (API section added to README):**
```markdown
## API Reference

### `getUser(userId)`

Fetches user data from the API

**Parameters:**
- `userId` (string) - The user ID to fetch

**Returns:** Promise<User> - User object with profile data

**Throws:**
- NotFoundError - When user doesn't exist

**Example:**
```typescript
const user = await getUser('123');
console.log(user.name);
```

### `createUser(data)`

Creates a new user account

**Parameters:**
- `data` (UserInput) - User registration data

**Returns:** Promise<User> - Created user with ID

**Example:**
```typescript
const newUser = await createUser({
  name: 'John Doe',
  email: 'john@example.com'
});
```
```

### Example 7: Monorepo README Generation

**Project structure:**
```
my-monorepo/
├── packages/
│   ├── core/
│   ├── cli/
│   └── utils/
├── package.json
└── lerna.json
```

**Command:**
```bash
readme-gen --template monorepo --auto
```

**Output (README.md):**
```markdown
# my-monorepo

A collection of awesome packages.

## Packages

### [@scope/core](./packages/core)

Core functionality and APIs.

```bash
npm install @scope/core
```

### [@scope/cli](./packages/cli)

Command-line interface.

```bash
npm install -g @scope/cli
```

### [@scope/utils](./packages/utils)

Utility functions and helpers.

```bash
npm install @scope/utils
```

## Development

```bash
# Install dependencies
npm install

# Build all packages
npm run build

# Run tests
npm test
```

## Publishing

```bash
lerna publish
```
```

### Example 8: Template Comparison

Generate READMEs with different templates:

```bash
# CLI tool template
readme-gen --template cli --name my-tool

# Library template
readme-gen --template library --name my-lib

# API template
readme-gen --template api --name my-api

# Framework template
readme-gen --template framework --name my-framework
```

Each template includes sections specific to that project type:

| Template | Unique Sections |
|----------|----------------|
| CLI | Usage Examples, Commands, Options, Configuration |
| Library | API Reference, TypeScript Types, Integration Examples |
| API | Endpoints, Authentication, Rate Limiting, Error Codes |
| Framework | Getting Started, Architecture, Plugins, Middleware |
| Monorepo | Package List, Workspace Scripts, Publishing |

### Example 9: Batch README Generation

Generate READMEs for multiple projects:

```bash
# Create a script
cat > generate-readmes.sh <<'EOF'
#!/bin/bash
for dir in packages/*; do
  cd "$dir"
  readme-gen --auto --force
  cd ../..
done
EOF

chmod +x generate-readmes.sh
./generate-readmes.sh
```

**Output:**
```bash
Generating README for packages/core...
✓ README.md generated (234 lines)

Generating README for packages/cli...
✓ README.md generated (189 lines)

Generating README for packages/utils...
✓ README.md generated (156 lines)

Total: 3 READMEs generated
```

## Supported Features

| Feature | Supported | Description |
|---------|-----------|-------------|
| Auto-detection | ✅ | Analyzes project structure and package.json |
| Templates | ✅ | CLI, Library, API, Framework, Monorepo |
| Badges | ✅ | npm, build, coverage, license, custom |
| Code scanning | ✅ | Generates API docs from JSDoc/TSDoc comments |
| Interactive mode | ✅ | Guided setup with live preview |
| Multi-language | ✅ | EN, KO, JA, ZH support |
| Markdown linting | ✅ | Ensures proper formatting |
| Update existing | ✅ | Preserves manual edits while adding sections |
| Git integration | ⚠️ | Partial (detects repo, reads history) |
| Screenshot embed | ⚠️ | Manual (prompts for paths) |
| Video embed | ❌ | Coming soon |

## Use Cases

### 1. **Open Source Project Launch**

You're publishing your first npm package:

```bash
# After coding your package
readme-gen --interactive

# Follow prompts, get professional README
# Add examples, badges, contributing guidelines
# Ready to publish!
```

**Before:** 15 minutes writing README  
**After:** 2 minutes with readme-gen

### 2. **Internal Tool Documentation**

Your team has 10 internal CLI tools with no docs:

```bash
# Batch generate for all tools
for tool in tools/*; do
  cd "$tool"
  readme-gen --auto --add-troubleshooting --add-faq
  cd ..
done
```

**Result:** Consistent documentation across all tools in minutes.

### 3. **Freelance Developer Portfolio**

Show professionalism with polished READMEs:

```bash
# For each portfolio project
cd project-1 && readme-gen --add-badges --add-roadmap
cd project-2 && readme-gen --add-badges --add-roadmap
```

**Impact:** Clients see professional documentation = more trust.

### 4. **Hackathon Speed**

Need a README fast during a hackathon:

```bash
readme-gen --auto --no-preview --force
```

**Time saved:** 20+ minutes to focus on coding.

### 5. **Monorepo Maintenance**

Keep all package READMEs in sync:

```bash
# Update all packages with new Contributing section
for pkg in packages/*; do
  cd "$pkg"
  readme-gen --update README.md --add-contributing
  cd ../..
done
```

### 6. **Localization for Global Users**

Your library has international users:

```bash
# Generate READMEs in 4 languages
readme-gen --lang en --output README.md
readme-gen --lang ko --output README.ko.md
readme-gen --lang ja --output README.ja.md
readme-gen --lang zh --output README.zh.md
```

**Benefit:** Broader adoption from non-English developers.

### 7. **Onboarding New Contributors**

Make it easy for contributors to get started:

```bash
readme-gen --update README.md \
  --add-contributing \
  --add-troubleshooting \
  --add-faq
```

**Result:** Fewer "how do I..." questions in issues.

---

## Advanced Workflows

### Workflow 1: Monorepo Documentation Automation

**Scenario:** Managing a monorepo with 20+ packages. Need consistent, up-to-date READMEs across all packages.

**Challenge:** Manually maintaining documentation for each package is time-consuming and leads to inconsistencies.

**Solution:**
```bash
#!/bin/bash
# monorepo-docs-sync.sh - Automated README generation and synchronization

MONOREPO_ROOT="."
PACKAGES_DIR="packages"
TEMPLATE_DIR=".readme-templates"

mkdir -p "$TEMPLATE_DIR"

echo "📚 Monorepo Documentation Automation"
echo "======================================"
echo ""

# Step 1: Create shared template configuration
echo "📋 Step 1: Creating shared template configuration..."

cat > "$TEMPLATE_DIR/shared-config.json" <<'EOF'
{
  "organization": "your-org",
  "author": "Your Team",
  "license": "MIT",
  "badges": {
    "npm": true,
    "build": true,
    "coverage": true,
    "license": true
  },
  "sections": {
    "installation": true,
    "usage": true,
    "api": true,
    "contributing": true,
    "license": true
  },
  "style": {
    "badgeStyle": "flat-square",
    "toc": true,
    "emoji": true
  }
}
EOF

# Step 2: Detect package type and apply appropriate template
echo ""
echo "🔍 Step 2: Analyzing packages..."

SUMMARY_FILE="docs/package-summary.md"
mkdir -p docs

{
  echo "# Monorepo Package Documentation"
  echo ""
  echo "Generated: $(date)"
  echo ""
  echo "| Package | Type | Version | Status |"
  echo "|---------|------|---------|--------|"
} > "$SUMMARY_FILE"

for pkg_dir in "$PACKAGES_DIR"/*; do
  if [ ! -d "$pkg_dir" ]; then
    continue
  fi
  
  pkg_name=$(basename "$pkg_dir")
  echo "  → Processing $pkg_name..."
  
  cd "$pkg_dir" || continue
  
  # Detect package type from package.json
  if [ -f "package.json" ]; then
    has_bin=$(grep -c '"bin"' package.json || echo "0")
    has_types=$(grep -c '"types"' package.json || echo "0")
    is_private=$(grep -c '"private": true' package.json || echo "0")
    
    if [ "$is_private" -gt 0 ]; then
      pkg_type="private"
      template="internal"
    elif [ "$has_bin" -gt 0 ]; then
      pkg_type="cli"
      template="cli"
    elif [ "$has_types" -gt 0 ]; then
      pkg_type="library"
      template="library"
    else
      pkg_type="utility"
      template="library"
    fi
    
    version=$(grep -o '"version": "[^"]*"' package.json | cut -d'"' -f4)
    
    # Generate README with appropriate template
    if [ "$is_private" -eq 0 ]; then
      readme-gen \
        --template "$template" \
        --auto \
        --add-badges \
        --add-installation \
        --add-usage \
        --add-api \
        --add-contributing \
        --force \
        --output README.md
      
      readme_status="✅ Generated"
    else
      # Private packages get minimal README
      readme-gen \
        --auto \
        --output README.md \
        --force
      
      readme_status="ℹ️ Internal"
    fi
    
    # Add to summary
    echo "| [$pkg_name](./$PACKAGES_DIR/$pkg_name) | $pkg_type | $version | $readme_status |" >> "../../$SUMMARY_FILE"
  else
    echo "| $pkg_name | unknown | - | ⚠️ No package.json |" >> "../../$SUMMARY_FILE"
  fi
  
  cd - >/dev/null
done

# Step 3: Generate root README that lists all packages
echo ""
echo "📝 Step 3: Generating monorepo root README..."

{
  echo "# Your Monorepo Name"
  echo ""
  echo "A collection of awesome packages for [your purpose]."
  echo ""
  echo "## Packages"
  echo ""
  
  for pkg_dir in "$PACKAGES_DIR"/*; do
    if [ ! -d "$pkg_dir" ]; then
      continue
    fi
    
    pkg_name=$(basename "$pkg_dir")
    
    if [ -f "$pkg_dir/package.json" ]; then
      desc=$(grep -o '"description": "[^"]*"' "$pkg_dir/package.json" | cut -d'"' -f4)
      version=$(grep -o '"version": "[^"]*"' "$pkg_dir/package.json" | cut -d'"' -f4)
      
      echo "### [$pkg_name](./$PACKAGES_DIR/$pkg_name)"
      echo ""
      echo "$desc"
      echo ""
      echo "\`\`\`bash"
      echo "npm install @your-org/$pkg_name"
      echo "\`\`\`"
      echo ""
      echo "**Version:** $version"
      echo ""
    fi
  done
  
  echo "## Development"
  echo ""
  echo "\`\`\`bash"
  echo "# Install dependencies"
  echo "npm install"
  echo ""
  echo "# Build all packages"
  echo "npm run build"
  echo ""
  echo "# Run tests"
  echo "npm test"
  echo "\`\`\`"
  echo ""
  echo "## Documentation"
  echo ""
  echo "- [Package Summary](./docs/package-summary.md) - Overview of all packages"
  echo "- Individual package READMEs in \`packages/*/README.md\`"
  echo ""
  echo "## Contributing"
  echo ""
  echo "See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines."
  echo ""
  echo "## License"
  echo ""
  echo "MIT"
  
} > README.md

# Step 4: Validate all READMEs
echo ""
echo "✅ Step 4: Validating generated READMEs..."

validation_errors=0

for pkg_dir in "$PACKAGES_DIR"/*; do
  if [ ! -f "$pkg_dir/README.md" ]; then
    echo "  ❌ Missing README: $pkg_dir"
    validation_errors=$((validation_errors + 1))
  else
    # Check for common issues
    if ! grep -q "## Installation" "$pkg_dir/README.md" 2>/dev/null; then
      echo "  ⚠️  $pkg_dir: Missing Installation section"
    fi
    
    if ! grep -q "## Usage" "$pkg_dir/README.md" 2>/dev/null; then
      echo "  ⚠️  $pkg_dir: Missing Usage section"
    fi
  fi
done

# Step 5: Check for consistency
echo ""
echo "🔍 Step 5: Checking documentation consistency..."

# Ensure all public packages have required sections
required_sections=("Installation" "Usage" "API" "Contributing" "License")

for pkg_dir in "$PACKAGES_DIR"/*; do
  if [ -f "$pkg_dir/package.json" ] && ! grep -q '"private": true' "$pkg_dir/package.json"; then
    pkg_name=$(basename "$pkg_dir")
    
    for section in "${required_sections[@]}"; do
      if ! grep -q "## $section" "$pkg_dir/README.md" 2>/dev/null; then
        echo "  ⚠️  $pkg_name: Missing required section: $section"
      fi
    done
  fi
done

# Summary
echo ""
echo "======================================"
echo "✅ Documentation automation complete!"
echo ""
echo "📊 Summary:"
total_packages=$(find "$PACKAGES_DIR" -maxdepth 1 -type d | tail -n +2 | wc -l | tr -d ' ')
public_packages=$(find "$PACKAGES_DIR" -name "package.json" -exec grep -L '"private": true' {} \; | wc -l | tr -d ' ')

echo "   - Total packages: $total_packages"
echo "   - Public packages: $public_packages"
echo "   - Private packages: $((total_packages - public_packages))"
echo "   - Validation errors: $validation_errors"
echo ""
echo "📁 Generated files:"
echo "   - Root README.md"
echo "   - docs/package-summary.md"
echo "   - packages/*/README.md (x$total_packages)"
echo ""
echo "🚀 Next steps:"
echo "   1. Review generated READMEs"
echo "   2. Customize as needed"
echo "   3. Commit changes: git add . && git commit -m 'docs: update READMEs'"
echo "   4. Set up CI to auto-generate on releases"
```

**CI Integration (GitHub Actions):**
```yaml
# .github/workflows/docs.yml
name: Auto-update Documentation

on:
  push:
    branches: [main]
    paths:
      - 'packages/*/package.json'
      - 'packages/*/src/**'

jobs:
  update-docs:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Install readme-gen
        run: npm install -g @muin/readme-gen
      
      - name: Generate READMEs
        run: |
          chmod +x ./scripts/monorepo-docs-sync.sh
          ./scripts/monorepo-docs-sync.sh
      
      - name: Commit changes
        run: |
          git config user.name "Documentation Bot"
          git config user.email "bot@example.com"
          git add .
          git diff --staged --quiet || git commit -m "docs: auto-update READMEs"
          git push
```

**Benefits:**
- Consistent documentation across all packages
- Automatic updates when packages change
- Type-specific templates (CLI, library, etc.)
- Validation ensures quality
- Saves hours of manual work

---

### Workflow 2: Multi-Language Documentation Pipeline

**Scenario:** Open-source project with international users. Need READMEs in English, Korean, Japanese, and Chinese.

**Challenge:** Manually maintaining 4 versions of documentation is unsustainable and leads to translation drift.

**Solution:**
```bash
#!/bin/bash
# multilang-docs.sh - Automated multi-language documentation pipeline

LANGUAGES=("en" "ko" "ja" "zh")
SOURCE_LANG="en"
PROJECT_NAME=$(grep -o '"name": "[^"]*"' package.json | cut -d'"' -f4 || echo "my-project")

echo "🌍 Multi-Language Documentation Pipeline"
echo "========================================="
echo ""

# Step 1: Generate master English README
echo "📝 Step 1: Generating master English README..."

readme-gen \
  --auto \
  --add-badges \
  --add-installation \
  --add-usage \
  --add-api \
  --add-examples \
  --add-troubleshooting \
  --add-faq \
  --add-contributing \
  --output README.md \
  --lang en

if [ $? -ne 0 ]; then
  echo "❌ Failed to generate English README"
  exit 1
fi

# Step 2: Extract content structure
echo ""
echo "📊 Step 2: Analyzing README structure..."

{
  echo "# README Structure"
  echo ""
  grep "^##" README.md | while read line; do
    echo "- $line"
  done
} > .readme-structure.txt

# Step 3: Generate localized versions
echo ""
echo "🌏 Step 3: Generating localized READMEs..."

for lang in "${LANGUAGES[@]}"; do
  if [ "$lang" == "$SOURCE_LANG" ]; then
    continue
  fi
  
  echo "  → Generating $lang version..."
  
  readme-gen \
    --lang "$lang" \
    --auto \
    --add-badges \
    --add-installation \
    --add-usage \
    --add-api \
    --add-examples \
    --add-troubleshooting \
    --add-faq \
    --add-contributing \
    --output "README.$lang.md"
  
  if [ $? -eq 0 ]; then
    echo "     ✅ README.$lang.md created"
  else
    echo "     ⚠️  Failed to generate $lang version (tool may not support this language yet)"
    
    # Fallback: Create placeholder with link to English version
    {
      echo "# $PROJECT_NAME"
      echo ""
      echo "> ⚠️ This language is not fully supported yet. Please refer to [English README](./README.md)."
      echo ""
      echo "**Available languages:**"
      for l in "${LANGUAGES[@]}"; do
        if [ -f "README.$l.md" ]; then
          echo "- [$l](./README.$l.md)"
        fi
      done
    } > "README.$lang.md"
  fi
done

# Step 4: Add language switcher to all READMEs
echo ""
echo "🔀 Step 4: Adding language switcher..."

add_language_switcher() {
  local file=$1
  local current_lang=$2
  
  # Create language switcher
  switcher="**Languages:** "
  for lang in "${LANGUAGES[@]}"; do
    if [ "$lang" == "$current_lang" ]; then
      switcher="$switcher **$lang** |"
    else
      readme_file="README.md"
      [ "$lang" != "en" ] && readme_file="README.$lang.md"
      switcher="$switcher [$lang](./$readme_file) |"
    fi
  done
  switcher="${switcher% |}"  # Remove trailing |
  
  # Insert at top of file (after title)
  if [ -f "$file" ]; then
    # Create temp file with switcher
    {
      head -1 "$file"  # Title
      echo ""
      echo "$switcher"
      echo ""
      tail -n +2 "$file"  # Rest of content
    } > "$file.tmp"
    
    mv "$file.tmp" "$file"
  fi
}

# Add to English README
add_language_switcher "README.md" "en"

# Add to localized READMEs
for lang in "${LANGUAGES[@]}"; do
  if [ "$lang" != "en" ] && [ -f "README.$lang.md" ]; then
    add_language_switcher "README.$lang.md" "$lang"
  fi
done

# Step 5: Validate translations
echo ""
echo "✅ Step 5: Validating translations..."

validation_report=".translation-validation.md"

{
  echo "# Translation Validation Report"
  echo ""
  echo "Generated: $(date)"
  echo ""
  
  # Compare section counts
  echo "## Section Counts"
  echo ""
  echo "| Language | Sections | Status |"
  echo "|----------|----------|--------|"
  
  en_sections=$(grep -c "^##" README.md)
  echo "| en | $en_sections | ✅ Master |"
  
  for lang in "${LANGUAGES[@]}"; do
    if [ "$lang" != "en" ] && [ -f "README.$lang.md" ]; then
      lang_sections=$(grep -c "^##" "README.$lang.md")
      
      if [ "$lang_sections" -eq "$en_sections" ]; then
        status="✅ Complete"
      elif [ "$lang_sections" -gt 0 ]; then
        status="⚠️ Partial ($lang_sections/$en_sections)"
      else
        status="❌ Empty"
      fi
      
      echo "| $lang | $lang_sections | $status |"
    fi
  done
  
  echo ""
  echo "## File Sizes"
  echo ""
  
  for file in README*.md; do
    size=$(wc -c < "$file" | tr -d ' ')
    lines=$(wc -l < "$file" | tr -d ' ')
    echo "- $file: $lines lines, $size bytes"
  done
  
  echo ""
  echo "## Missing Translations"
  echo ""
  
  for lang in "${LANGUAGES[@]}"; do
    readme_file="README.md"
    [ "$lang" != "en" ] && readme_file="README.$lang.md"
    
    if [ ! -f "$readme_file" ]; then
      echo "- ❌ Missing $lang translation"
    fi
  done
  
} > "$validation_report"

cat "$validation_report"

# Step 6: Generate translation checklist
echo ""
echo "📋 Step 6: Creating translation maintenance checklist..."

{
  echo "# Translation Maintenance Checklist"
  echo ""
  echo "When updating documentation:"
  echo ""
  echo "## English (Master)"
  echo "- [ ] Update README.md"
  echo "- [ ] Review changes"
  echo "- [ ] Run \`./multilang-docs.sh\` to propagate"
  echo ""
  
  for lang in "${LANGUAGES[@]}"; do
    if [ "$lang" != "en" ]; then
      echo "## $lang Translation"
      echo "- [ ] Review auto-generated README.$lang.md"
      echo "- [ ] Verify technical terms are correct"
      echo "- [ ] Check code examples (should remain in English)"
      echo "- [ ] Validate links and formatting"
      echo ""
    fi
  done
  
  echo "## Validation"
  echo "- [ ] All languages have same section structure"
  echo "- [ ] Language switcher works on all pages"
  echo "- [ ] No broken links"
  echo "- [ ] Commit all README*.md files together"
  
} > .translation-checklist.md

# Summary
echo ""
echo "========================================="
echo "✅ Multi-language documentation complete!"
echo ""
echo "📄 Generated files:"
for file in README*.md; do
  echo "   - $file"
done
echo ""
echo "📊 Validation report: $validation_report"
echo "📋 Maintenance checklist: .translation-checklist.md"
echo ""
echo "🌍 Supported languages: ${LANGUAGES[@]}"
echo ""
echo "🚀 Next steps:"
echo "   1. Review all generated READMEs"
echo "   2. Verify translations (use native speakers if possible)"
echo "   3. Commit all README*.md files"
echo "   4. Set up CI to auto-update on changes"
```

**CI Integration for Translation Sync:**
```yaml
# .github/workflows/translate-docs.yml
name: Sync Documentation Translations

on:
  push:
    branches: [main]
    paths:
      - 'README.md'

jobs:
  translate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Install readme-gen
        run: npm install -g @muin/readme-gen
      
      - name: Generate translations
        run: |
          chmod +x ./scripts/multilang-docs.sh
          ./scripts/multilang-docs.sh
      
      - name: Create Pull Request
        uses: peter-evans/create-pull-request@v5
        with:
          commit-message: "docs: sync translations with master README"
          title: "Auto-update documentation translations"
          body: |
            This PR automatically updates translated READMEs to match the master English version.
            
            Please review:
            - Technical term translations
            - Cultural appropriateness
            - Formatting and links
          branch: docs/auto-translate
          labels: documentation, automation
```

**Benefits:**
- Reach international audience
- Consistent documentation across languages
- Automated synchronization
- Quality validation
- Reduced manual translation effort

---

### Workflow 3: README-Driven API Documentation

**Scenario:** Building an API server. Want README, API docs, and interactive examples to stay synchronized automatically.

**Challenge:** API changes frequently. Manually updating README, OpenAPI spec, and examples leads to outdated documentation.

**Solution:**
```bash
#!/bin/bash
# api-docs-sync.sh - Synchronized API documentation pipeline

API_DIR="src/api"
DOCS_DIR="docs"
EXAMPLES_DIR="examples"

mkdir -p "$DOCS_DIR" "$EXAMPLES_DIR"

echo "🔄 API Documentation Synchronization"
echo "===================================="
echo ""

# Step 1: Extract API routes from code
echo "📡 Step 1: Analyzing API routes..."

{
  echo "# API Routes"
  echo ""
  echo "Auto-extracted from \`$API_DIR\`"
  echo ""
  echo "| Method | Path | Handler | File |"
  echo "|--------|------|---------|------|"
  
  # Find all route definitions (example for Express)
  grep -rn "app\.\(get\|post\|put\|delete\|patch\)" "$API_DIR" | while read line; do
    file=$(echo "$line" | cut -d: -f1)
    method=$(echo "$line" | grep -o "app\.\w*" | cut -d. -f2 | tr '[:lower:]' '[:upper:]')
    path=$(echo "$line" | grep -o "'/[^']*'" | tr -d "'")
    handler=$(echo "$line" | grep -o "(\w*)" | tr -d '()')
    
    echo "| $method | $path | $handler | $(basename $file) |"
  done
  
} > "$DOCS_DIR/api-routes.md"

# Step 2: Generate OpenAPI spec from code comments
echo ""
echo "📄 Step 2: Generating OpenAPI specification..."

{
  echo "openapi: 3.0.0"
  echo "info:"
  echo "  title: $(grep -o '"name": "[^"]*"' package.json | cut -d'"' -f4 || echo "API")"
  echo "  version: $(grep -o '"version": "[^"]*"' package.json | cut -d'"' -f4 || echo "1.0.0")"
  echo "  description: Auto-generated API documentation"
  echo "paths:"
  
  # Parse JSDoc comments for OpenAPI annotations
  # (This is simplified - use swagger-jsdoc or similar in production)
  grep -rA 10 "@openapi" "$API_DIR" | while read line; do
    echo "  # $line"
  done
  
} > "$DOCS_DIR/openapi.yaml"

# Step 3: Generate interactive examples
echo ""
echo "💻 Step 3: Creating interactive examples..."

# For each endpoint, create a curl example
{
  echo "# API Examples"
  echo ""
  echo "Copy-paste curl commands to test the API."
  echo ""
  
  grep -rn "app\.\(get\|post\|put\|delete\)" "$API_DIR" | while read line; do
    method=$(echo "$line" | grep -o "app\.\w*" | cut -d. -f2 | tr '[:lower:]' '[:upper:]')
    path=$(echo "$line" | grep -o "'/[^']*'" | tr -d "'")
    
    echo "## $method $path"
    echo ""
    echo '```bash'
    
    case $method in
      GET)
        echo "curl -X GET http://localhost:3000$path"
        ;;
      POST)
        echo "curl -X POST http://localhost:3000$path \\"
        echo "  -H 'Content-Type: application/json' \\"
        echo "  -d '{\"key\": \"value\"}'"
        ;;
      PUT|PATCH)
        echo "curl -X $method http://localhost:3000$path \\"
        echo "  -H 'Content-Type: application/json' \\"
        echo "  -d '{\"key\": \"updated_value\"}'"
        ;;
      DELETE)
        echo "curl -X DELETE http://localhost:3000$path"
        ;;
    esac
    
    echo '```'
    echo ""
  done
  
} > "$EXAMPLES_DIR/api-examples.md"

# Step 4: Generate comprehensive README with API docs
echo ""
echo "📝 Step 4: Generating README with API documentation..."

readme-gen \
  --auto \
  --template api \
  --add-badges \
  --add-installation \
  --add-usage \
  --add-api \
  --output README.md \
  --force

# Append API-specific sections
{
  echo ""
  echo "## API Reference"
  echo ""
  echo "### Endpoints"
  echo ""
  cat "$DOCS_DIR/api-routes.md" | tail -n +5  # Skip header
  echo ""
  echo "### Interactive Examples"
  echo ""
  echo "See [examples/api-examples.md](./examples/api-examples.md) for curl commands."
  echo ""
  echo "### OpenAPI Specification"
  echo ""
  echo "Full OpenAPI 3.0 spec available at [docs/openapi.yaml](./docs/openapi.yaml)"
  echo ""
  echo "You can also:"
  echo "- View in Swagger UI: \`npm run swagger\`"
  echo "- Generate client SDKs: \`openapi-generator generate -i docs/openapi.yaml -g javascript\`"
  echo ""
  
} >> README.md

# Step 5: Generate Postman collection
echo ""
echo "📬 Step 5: Creating Postman collection..."

{
  echo "{"
  echo "  \"info\": {"
  echo "    \"name\": \"$(grep -o '"name": "[^"]*"' package.json | cut -d'"' -f4) API\","
  echo "    \"schema\": \"https://schema.getpostman.com/json/collection/v2.1.0/collection.json\""
  echo "  },"
  echo "  \"item\": ["
  
  first=true
  grep -rn "app\.\(get\|post\|put\|delete\)" "$API_DIR" | while read line; do
    method=$(echo "$line" | grep -o "app\.\w*" | cut -d. -f2 | tr '[:lower:]' '[:upper:]')
    path=$(echo "$line" | grep -o "'/[^']*'" | tr -d "'")
    
    [ "$first" = false ] && echo "    ,"
    first=false
    
    echo "    {"
    echo "      \"name\": \"$method $path\","
    echo "      \"request\": {"
    echo "        \"method\": \"$method\","
    echo "        \"url\": \"http://localhost:3000$path\""
    echo "      }"
    echo "    }"
  done
  
  echo "  ]"
  echo "}"
  
} > "$DOCS_DIR/postman-collection.json"

# Step 6: Create API changelog
echo ""
echo "📰 Step 6: Tracking API changes..."

if [ -f "$DOCS_DIR/api-changelog.md" ]; then
  # Compare with previous version
  diff "$DOCS_DIR/api-routes.md" "$DOCS_DIR/.api-routes.prev" > /tmp/api-diff || true
  
  if [ -s /tmp/api-diff ]; then
    {
      echo "## $(date +%Y-%m-%d)"
      echo ""
      echo "### Changes"
      echo ""
      grep "^>" /tmp/api-diff | sed 's/^> /- Added: /'
      grep "^<" /tmp/api-diff | sed 's/^< /- Removed: /'
      echo ""
    } | cat - "$DOCS_DIR/api-changelog.md" > /tmp/api-changelog-new
    
    mv /tmp/api-changelog-new "$DOCS_DIR/api-changelog.md"
  fi
else
  {
    echo "# API Changelog"
    echo ""
    echo "## $(date +%Y-%m-%d)"
    echo ""
    echo "- Initial API documentation"
  } > "$DOCS_DIR/api-changelog.md"
fi

cp "$DOCS_DIR/api-routes.md" "$DOCS_DIR/.api-routes.prev"

# Summary
echo ""
echo "===================================="
echo "✅ API documentation sync complete!"
echo ""
echo "📁 Generated files:"
echo "   - README.md (with API reference)"
echo "   - docs/api-routes.md"
echo "   - docs/openapi.yaml"
echo "   - docs/postman-collection.json"
echo "   - docs/api-changelog.md"
echo "   - examples/api-examples.md"
echo ""
echo "🔗 Quick links:"
echo "   - Swagger UI: npm run swagger"
echo "   - Postman: Import docs/postman-collection.json"
echo "   - Examples: cat examples/api-examples.md"
echo ""
echo "🚀 Next steps:"
echo "   1. Review generated documentation"
echo "   2. Add JSDoc @openapi comments to routes"
echo "   3. Run this script after API changes"
echo "   4. Commit all docs together with code"
```

**Pre-commit Hook:**
```bash
#!/bin/bash
# .git/hooks/pre-commit

# Auto-update API docs before committing
if git diff --staged --name-only | grep -q "^src/api/"; then
  echo "🔄 API files changed, updating documentation..."
  ./scripts/api-docs-sync.sh
  
  # Stage updated docs
  git add README.md docs/ examples/
  
  echo "✅ API documentation updated and staged"
fi
```

**Benefits:**
- Single source of truth (code)
- Documentation always in sync
- Multiple export formats (README, OpenAPI, Postman)
- Automatic changelog tracking
- Interactive examples for testing

---
## Troubleshooting

### Issue: "No package.json found"

**Cause:** Running in directory without package.json

**Solution:**
```bash
# Initialize package.json first
npm init -y

# Then generate README
readme-gen --auto

# Or specify project details manually
readme-gen --name "my-project" --description "Does cool stuff"
```

### Issue: Generated README is too short

**Cause:** Not enough project information detected

**Solution:**
```bash
# Use interactive mode for more control
readme-gen --interactive

# Or add sections manually
readme-gen --auto \
  --add-usage \
  --add-api \
  --add-troubleshooting \
  --add-faq \
  --add-roadmap

# Or use a template
readme-gen --template cli --add-all-sections
```

### Issue: Badges showing "undefined" values

**Cause:** Missing package.json fields (name, version, repository)

**Solution:**
```json
// Ensure package.json has these fields:
{
  "name": "my-package",
  "version": "1.0.0",
  "repository": {
    "type": "git",
    "url": "https://github.com/user/my-package"
  },
  "license": "MIT"
}
```

Then regenerate:
```bash
readme-gen --auto --force
```

### Issue: API docs not generating

**Cause:** No JSDoc/TSDoc comments in source code

**Solution:**
```typescript
// Add JSDoc comments to your functions:
/**
 * Calculates the sum of two numbers
 * @param a - First number
 * @param b - Second number
 * @returns Sum of a and b
 * @example
 * ```typescript
 * const result = add(2, 3); // 5
 * ```
 */
export function add(a: number, b: number): number {
  return a + b;
}
```

Then:
```bash
readme-gen --add-api --scan src/
```

### Issue: Interactive mode not showing choices

**Cause:** Terminal doesn't support TTY or incompatible shell

**Solution:**
```bash
# Check terminal compatibility
echo $TERM

# Try forcing TTY
script -q /dev/null readme-gen --interactive

# Or use CLI mode instead
readme-gen --auto --add-all-sections
```

### Issue: Markdown lint errors

**Cause:** Custom content violates markdown rules

**Solution:**
```bash
# Skip linting
readme-gen --auto --no-lint

# Or fix specific issues:
# - Use --- for horizontal rules (not ***)
# - Ensure blank lines around code blocks
# - Use consistent list markers (- not *)
# - Close all code fences
```

### Issue: Overwriting custom content

**Cause:** Using --force without --update mode

**Solution:**
```bash
# Wrong: Overwrites entire file
readme-gen --auto --force

# Right: Updates while preserving content
readme-gen --update README.md --add-badges --add-faq

# Or backup first
cp README.md README.backup.md
readme-gen --auto --force
# Review and merge manually
```

### Issue: Multi-language generation fails

**Cause:** Language pack not installed

**Solution:**
```bash
# Install language packs
npm install -g @muin/readme-gen-lang-ko
npm install -g @muin/readme-gen-lang-ja
npm install -g @muin/readme-gen-lang-zh

# Or use English template with manual translation
readme-gen --auto --output README.template.md
# Translate manually
```

### Issue: Template not found

**Cause:** Invalid template name

**Solution:**
```bash
# List available templates
readme-gen --list-templates

# Output:
# Available templates:
#   - cli (CLI tools and command-line applications)
#   - library (npm packages and libraries)
#   - api (RESTful APIs and web services)
#   - framework (web frameworks and platforms)
#   - monorepo (multi-package repositories)

# Use exact name
readme-gen --template cli
```

### Issue: Very slow generation

**Cause:** Scanning large directory or many files

**Solution:**
```bash
# Limit scan depth
readme-gen --auto --max-depth 2

# Exclude directories
readme-gen --auto --ignore "node_modules,dist,build"

# Skip code scanning
readme-gen --auto --no-api-scan

# Use cache
readme-gen --auto --use-cache
```

### Issue: Preview not showing

**Cause:** Terminal size too small or colors disabled

**Solution:**
```bash
# Resize terminal (minimum 80x24)
# Or disable preview
readme-gen --auto --no-preview

# Check terminal capabilities
tput colors  # Should show 256

# Enable color support
export FORCE_COLOR=1
readme-gen --interactive
```

### Issue: Git repository not detected

**Cause:** Not a git repository or .git folder missing

**Solution:**
```bash
# Initialize git
git init
git remote add origin https://github.com/user/repo.git

# Or specify repo manually
readme-gen --auto --repo https://github.com/user/repo
```

## Performance Tips

### Tip 1: Use Templates for Similar Projects

If you maintain multiple projects of the same type:

```bash
# Generate a template once
readme-gen --template cli --output .readme-template.md

# Reuse for other projects
for project in cli-tool-*; do
  cd "$project"
  cp ../.readme-template.md README.md
  # Customize with sed/awk
  sed -i "s/PROJECT_NAME/$project/g" README.md
  cd ..
done
```

### Tip 2: Cache API Analysis Results

Avoid re-scanning code on every run:

```bash
# Generate API docs once
readme-gen --add-api --scan src/ --cache-api .api-cache.json

# Reuse cached data
readme-gen --update README.md --api-from-cache .api-cache.json
```

### Tip 3: Batch Processing with Parallel

Speed up monorepo README generation:

```bash
# Install GNU parallel
brew install parallel  # macOS
sudo apt install parallel  # Linux

# Generate in parallel
ls packages | parallel 'cd packages/{} && readme-gen --auto --force'
```

### Tip 4: Pre-commit Hook for Auto-Updates

Keep README in sync with code changes:

```bash
# .husky/pre-commit
#!/bin/sh
readme-gen --update README.md --add-api --no-preview
git add README.md
```

### Tip 5: Use Environment Variables for Defaults

Set defaults to avoid repetitive flags:

```bash
# In your shell profile (~/.zshrc or ~/.bashrc)
export README_GEN_AUTHOR="Jane Doe <jane@example.com>"
export README_GEN_LICENSE="MIT"
export README_GEN_TEMPLATE="cli"

# Now just run:
readme-gen --auto
```

## FAQ

### Q: Can readme-gen analyze my code and generate examples?

A: Yes! Use `--add-api` to scan source files for JSDoc/TSDoc comments. It generates API documentation with function signatures, parameters, and examples. For more advanced code analysis (usage examples from tests), that's on the roadmap.

### Q: Will it overwrite my manually edited README?

A: Only if you use `--force`. By default, readme-gen prompts before overwriting. Use `--update` mode to preserve manual edits while adding new sections. It's smart about merging.

### Q: Does it work with TypeScript projects?

A: Absolutely! readme-gen understands TypeScript and will generate proper type documentation. Use `--add-api --scan src/` to extract types from `.ts` files.

### Q: Can I customize the templates?

A: Yes! Templates are stored in `~/.readme-gen/templates/`. You can edit them or create new ones. Use `readme-gen --template custom-template` to use your template. Full template API docs: `readme-gen --help-templates`.

### Q: How do I add screenshots?

A: Interactive mode prompts for screenshot paths. Or manually add after generation:
```bash
readme-gen --auto
# Then edit README.md and add:
# ![Screenshot](./screenshots/demo.png)
```

Auto-screenshot detection is on the roadmap.

### Q: What's the difference between --auto and --interactive?

A: `--auto` analyzes your project and generates a README instantly with minimal prompts. `--interactive` guides you through every option with menus and previews. Use `--auto` for quick generation, `--interactive` for full control.

### Q: Can I use this for non-npm projects?

A: Yes! While it works best with npm projects (reads package.json), you can use it for any project:
```bash
readme-gen --name "My Python Project" --description "..." --template library
```

### Q: How do I contribute a new language translation?

A: Translations are in `i18n/*.json` files. Fork the repo, add your language file (e.g., `i18n/es.json`), and submit a PR. See [CONTRIBUTING.md](../../CONTRIBUTING.md#adding-translations).

### Q: Does it support GitHub-flavored markdown?

A: Yes! All generated markdown is GitHub-flavored (GFM) with support for tables, task lists, code fencing, and emoji. It's tested against GitHub's markdown renderer.

### Q: Can I integrate this into my CI/CD?

A: Absolutely! Example GitHub Action:
```yaml
- name: Generate README
  run: |
    npx @muin/readme-gen --auto --force
    git diff --exit-code README.md || (echo "README outdated!" && exit 1)
```

## Roadmap

- [ ] **Advanced Code Analysis** - Generate examples from test files
- [ ] **Screenshot Auto-Detection** - Find images in docs/ and embed automatically
- [ ] **Video Embed Support** - Add demo videos (YouTube, Loom, etc.)
- [ ] **AI-Powered Descriptions** - Generate feature descriptions from code
- [ ] **Diagram Generation** - Auto-create architecture diagrams (Mermaid)
- [ ] **More Templates** - React component, VS Code extension, Electron app
- [ ] **Custom Sections** - Plugin system for adding custom README sections
- [ ] **Theme Support** - Different visual styles (minimal, detailed, corporate)
- [ ] **README Linter** - Check existing READMEs for best practices
- [ ] **Migration Tool** - Convert from other doc formats (AsciiDoc, reStructuredText)
- [ ] **VS Code Extension** - Generate READMEs from VS Code
- [ ] **Web UI** - Browser-based README generator
- [ ] **Changelog Auto-Generation** - Generate from git commit history
- [ ] **Dependency Graph** - Visualize package dependencies
- [ ] **SEO Optimization** - Add meta tags and keywords for discoverability

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history.

## Contributing

We love contributions! Whether it's:
- 🐛 Bug reports
- 💡 Feature requests
- 📝 Documentation improvements
- 🌍 Translations
- 🎨 New templates
- 🔧 Code contributions

Please see [CONTRIBUTING.md](../../CONTRIBUTING.md) for guidelines.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/muin-company/cli-tools.git
cd cli-tools/packages/readme-gen

# Install dependencies
npm install

# Build
npm run build

# Test
npm test

# Run locally
node dist/cli.js --help
```

### Adding a New Template

See [docs/adding-templates.md](../../docs/adding-templates.md) for a guide on creating custom templates.

## License

MIT © [MUIN](https://muin.company)

## Related Projects

- [@muin/curl-to-code](../curl-to-code) - Convert curl to code in any language
- [@muin/json-to-types](../json-to-types) - Convert JSON to TypeScript/Zod/Python types
- [@muin/cron-explain](../cron-explain) - Understand and generate cron expressions
- [More MUIN tools](https://muin.company/tools)

## Support

- 🐛 [Report a bug](https://github.com/muin-company/cli-tools/issues/new?template=bug_report.md)
- 💡 [Request a feature](https://github.com/muin-company/cli-tools/issues/new?template=feature_request.md)
- 💬 [Join our Discord](https://discord.gg/muin)
- 🐦 [Follow us on Twitter](https://twitter.com/muin_company)
- 📧 [Email support](mailto:support@muin.company)

## Acknowledgments

Special thanks to:
- The [Inquirer.js](https://github.com/SBoudrias/Inquirer.js/) team for the interactive CLI framework
- [Shields.io](https://shields.io/) for badge generation
- All our [contributors](https://github.com/muin-company/cli-tools/graphs/contributors)

---

**Made with ❤️ by [MUIN](https://muin.company)** - Building AI-powered developer tools

[⬆ Back to top](#muinreadme-gen)
