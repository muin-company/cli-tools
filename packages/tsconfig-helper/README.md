# @muin/tsconfig-helper

[![npm version](https://img.shields.io/npm/v/@muin/tsconfig-helper.svg)](https://www.npmjs.com/package/@muin/tsconfig-helper)
[![npm downloads](https://img.shields.io/npm/dm/@muin/tsconfig-helper.svg)](https://www.npmjs.com/package/@muin/tsconfig-helper)
[![license](https://img.shields.io/npm/l/@muin/tsconfig-helper.svg)](https://github.com/muin-company/cli-tools/blob/main/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/muin-company/cli-tools/blob/main/CONTRIBUTING.md)

Validate, optimize, and understand your TypeScript configuration with intelligent recommendations.

## Features

- ✅ **Validation** - Catch invalid tsconfig.json options and conflicts
- 🎯 **Smart Recommendations** - Get suggestions based on your project type
- 📊 **Comparison** - Compare configs across projects or versions
- 🔍 **Explain** - Understand what each option does
- ⚡ **Optimization** - Find performance improvements
- 🎨 **Interactive Wizard** - Build perfect tsconfig step-by-step
- 📦 **Presets** - Use battle-tested configs (React, Node, Library, etc.)
- 🔄 **Migration** - Upgrade configs for new TypeScript versions
- 🚨 **Strictness Check** - Measure and improve type safety
- 🤖 **CI Integration** - Validate configs in your pipeline

## Installation

```bash
npm install -g @muin/tsconfig-helper
```

Or use directly with npx:

```bash
npx @muin/tsconfig-helper
```

## Quick Start

```bash
# Validate your tsconfig.json
tsconfig-helper validate

# Get recommendations for your project
tsconfig-helper recommend

# Interactive wizard
tsconfig-helper init --interactive

# Explain an option
tsconfig-helper explain strict
```

## Usage

### Interactive Mode (Recommended)

```bash
tsconfig-helper --interactive
```

The interactive mode provides:
1. Project type detection (React, Node, Library, etc.)
2. Strictness level selection (Loose, Recommended, Strict, Ultra-strict)
3. Feature selection (decorators, jsx, paths, etc.)
4. Validation with live feedback
5. Generate optimized tsconfig.json

### CLI Mode

```bash
# Validate existing config
tsconfig-helper validate

# Validate with warnings
tsconfig-helper validate --strict

# Get recommendations
tsconfig-helper recommend --project-type react

# Initialize new config
tsconfig-helper init --preset node

# Explain an option
tsconfig-helper explain module

# Compare two configs
tsconfig-helper compare tsconfig.json tsconfig.prod.json

# Check strictness level
tsconfig-helper strictness

# Migrate to newer version
tsconfig-helper migrate --target 5.3

# Generate from template
tsconfig-helper generate --template react-app
```

### Options

#### Global Options
- `-i, --interactive` - Launch interactive mode
- `-c, --config <file>` - Specify config file (default: `tsconfig.json`)
- `-q, --quiet` - Suppress non-error output
- `-v, --verbose` - Show detailed output
- `--no-color` - Disable colored output

#### Validation Options
- `--strict` - Enable strict validation (fail on warnings)
- `--fix` - Auto-fix common issues
- `--show-unused` - Show unused compiler options
- `--check-extends` - Validate extended configs

#### Recommendation Options
- `--project-type <type>` - Project type: `react`, `node`, `library`, `vue`, `next`, `express`
- `--strictness <level>` - Strictness: `loose`, `recommended`, `strict`, `ultra`
- `--features <list>` - Required features: `decorators`, `jsx`, `paths`, etc.

#### Comparison Options
- `--show-diff` - Show detailed differences
- `--ignore-defaults` - Ignore default values
- `--json` - Output as JSON

#### Init/Generate Options
- `--preset <name>` - Use preset: `react`, `node`, `library`, `next`, `vue`
- `--template <name>` - Use template (official or community)
- `--overwrite` - Overwrite existing tsconfig.json

## Examples

### Example 1: Validate tsconfig.json

**tsconfig.json:**
```json
{
  "compilerOptions": {
    "target": "ES5",
    "module": "CommonJS",
    "strict": true,
    "esModuleInterop": false,
    "skipLibCheck": false,
    "forceConsistentCasingInFileNames": true
  }
}
```

**Command:**
```bash
tsconfig-helper validate
```

**Output:**
```
🔍 Validating tsconfig.json

╭─────────────────────────────────────────────────────────────────╮
│  Validation Results                                             │
├─────────────────────────────────────────────────────────────────┤
│  Status: ⚠️  Warnings found (3)                                 │
│  Errors: 0                                                      │
│  Warnings: 3                                                    │
│  Suggestions: 5                                                 │
╰─────────────────────────────────────────────────────────────────╯

╭─────────────────────────────────────────────────────────────────╮
│  Warnings                                                       │
├─────────────────────────────────────────────────────────────────┤
│  ⚠️  Target "ES5" is very old (released 2009)                  │
│     Recommendation: Use "ES2020" or newer                       │
│     Impact: Missing modern features, larger output             │
│                                                                 │
│  ⚠️  "esModuleInterop" is disabled                             │
│     Problem: Makes importing CommonJS modules harder           │
│     Fix: Set to true (recommended for most projects)           │
│                                                                 │
│  ⚠️  "skipLibCheck" is disabled                                │
│     Problem: Slower type checking                              │
│     Recommendation: Enable for faster builds                   │
╰─────────────────────────────────────────────────────────────────╯

╭─────────────────────────────────────────────────────────────────╮
│  Suggestions                                                    │
├─────────────────────────────────────────────────────────────────┤
│  💡 Add "moduleResolution": "bundler" (for modern bundlers)    │
│  💡 Add "resolveJsonModule": true (import JSON files)          │
│  💡 Add "isolatedModules": true (better Babel compatibility)   │
│  💡 Add "noEmit": true (if using a bundler, no .js output)     │
│  💡 Consider adding "paths" for cleaner imports                │
╰─────────────────────────────────────────────────────────────────╯

╭─────────────────────────────────────────────────────────────────╮
│  Quick Fix                                                      │
├─────────────────────────────────────────────────────────────────┤
│  Run this to auto-fix common issues:                           │
│  $ tsconfig-helper validate --fix                              │
╰─────────────────────────────────────────────────────────────────╯

✅ Config is valid, but could be improved.
```

### Example 2: Get Recommendations

**Command:**
```bash
tsconfig-helper recommend --project-type react
```

**Output:**
```
🎯 TypeScript Config Recommendations

╭─────────────────────────────────────────────────────────────────╮
│  Project Analysis                                               │
├─────────────────────────────────────────────────────────────────┤
│  Project Type:    React Application                            │
│  TypeScript:      5.3.3                                         │
│  Dependencies:    react@18.2.0, react-dom@18.2.0               │
│  Build Tool:      Detected: Vite                                │
│  Package Type:    Application (not a library)                  │
╰─────────────────────────────────────────────────────────────────╯

╭─────────────────────────────────────────────────────────────────╮
│  Recommended Configuration                                      │
├─────────────────────────────────────────────────────────────────┤
│  {                                                              │
│    "compilerOptions": {                                         │
│      // Language & Environment                                 │
│      "target": "ES2020",                                        │
│      "lib": ["ES2020", "DOM", "DOM.Iterable"],                 │
│      "jsx": "react-jsx",                                        │
│                                                                 │
│      // Module Resolution                                      │
│      "module": "ESNext",                                        │
│      "moduleResolution": "bundler",                            │
│      "resolveJsonModule": true,                                │
│      "allowImportingTsExtensions": true,                       │
│                                                                 │
│      // Type Checking                                          │
│      "strict": true,                                            │
│      "noUnusedLocals": true,                                    │
│      "noUnusedParameters": true,                                │
│      "noFallthroughCasesInSwitch": true,                       │
│                                                                 │
│      // Emit                                                    │
│      "noEmit": true,  // Vite handles bundling                 │
│                                                                 │
│      // Interop                                                 │
│      "esModuleInterop": true,                                   │
│      "allowSyntheticDefaultImports": true,                     │
│      "forceConsistentCasingInFileNames": true,                 │
│                                                                 │
│      // Performance                                             │
│      "skipLibCheck": true,                                      │
│      "isolatedModules": true                                    │
│    },                                                           │
│    "include": ["src"],                                          │
│    "exclude": ["node_modules", "dist"]                         │
│  }                                                              │
╰─────────────────────────────────────────────────────────────────╯

╭─────────────────────────────────────────────────────────────────╮
│  Why These Options?                                             │
├─────────────────────────────────────────────────────────────────┤
│  ✅ target: ES2020                                             │
│     Modern browsers support ES2020. Smaller bundle size.       │
│                                                                 │
│  ✅ jsx: react-jsx                                             │
│     Use new JSX transform (React 17+, no import needed)        │
│                                                                 │
│  ✅ moduleResolution: bundler                                  │
│     Optimized for Vite/Webpack. Faster resolution.             │
│                                                                 │
│  ✅ strict: true                                               │
│     Catch more bugs at compile time. Recommended for React.    │
│                                                                 │
│  ✅ noEmit: true                                               │
│     Vite handles transpilation. TypeScript only type-checks.   │
│                                                                 │
│  ✅ isolatedModules: true                                      │
│     Required for Vite/esbuild. Each file treated separately.   │
╰─────────────────────────────────────────────────────────────────╯

╭─────────────────────────────────────────────────────────────────╮
│  Apply These Changes                                            │
├─────────────────────────────────────────────────────────────────┤
│  Save recommended config:                                       │
│  $ tsconfig-helper generate --preset react --overwrite          │
│                                                                 │
│  Or merge with existing:                                        │
│  $ tsconfig-helper recommend --apply --merge                    │
╰─────────────────────────────────────────────────────────────────╯
```

### Example 3: Compare Configurations

**Command:**
```bash
tsconfig-helper compare tsconfig.json tsconfig.prod.json --show-diff
```

**Output:**
```
📊 Config Comparison: tsconfig.json ↔ tsconfig.prod.json

╭─────────────────────────────────────────────────────────────────────────────╮
│  Differences                                                                │
├─────────────────────────────────────────────────────────────────────────────┤
│  Option                  │ tsconfig.json    │ tsconfig.prod.json  │ Impact │
│  ────────────────────────┼──────────────────┼─────────────────────┼────────│
│  sourceMap               │ true             │ false               │ 📦 Size│
│  declaration             │ false            │ true                │ 📚 DX  │
│  declarationMap          │ false            │ true                │ 🔍 Debug│
│  removeComments          │ false            │ true                │ 📦 Size│
│  noEmitOnError           │ false            │ true                │ 🚨 Safety│
│  importHelpers           │ false            │ true                │ 📦 Size│
╰─────────────────────────────────────────────────────────────────────────────╯

╭─────────────────────────────────────────────────────────────────╮
│  Analysis                                                       │
├─────────────────────────────────────────────────────────────────┤
│  Production config has appropriate optimizations:               │
│  ✅ Disabled sourcemaps (smaller bundle)                        │
│  ✅ Removed comments (smaller bundle)                           │
│  ✅ Enabled declarations (for consumers)                        │
│  ✅ importHelpers (dedupe helper code with tslib)              │
│  ✅ noEmitOnError (don't emit broken code)                      │
│                                                                 │
│  Development config is optimized for DX:                        │
│  ✅ Sourcemaps enabled (debugging)                              │
│  ✅ Faster builds (no declarations)                             │
╰─────────────────────────────────────────────────────────────────╯

Summary: Configs are appropriately different for their environments ✅
```

### Example 4: Explain Options

**Command:**
```bash
tsconfig-helper explain strict
```

**Output:**
```
📖 Option Explanation: "strict"

╭─────────────────────────────────────────────────────────────────╮
│  strict                                                         │
├─────────────────────────────────────────────────────────────────┤
│  Type:    boolean                                               │
│  Default: false                                                 │
│  Category: Type Checking                                        │
│  Since:    TypeScript 2.3                                       │
╰─────────────────────────────────────────────────────────────────╯

╭─────────────────────────────────────────────────────────────────╮
│  What it does                                                   │
├─────────────────────────────────────────────────────────────────┤
│  Enables a suite of strict type-checking options:              │
│                                                                 │
│  • strictNullChecks           (null/undefined handling)         │
│  • strictFunctionTypes        (function parameter checking)     │
│  • strictBindCallApply        (bind/call/apply checking)        │
│  • strictPropertyInitialization (class property init)           │
│  • noImplicitAny             (require explicit types)           │
│  • noImplicitThis            (this must have type)              │
│  • alwaysStrict              (emit "use strict")                │
│  • useUnknownInCatchVariables (catch errors as unknown)        │
╰─────────────────────────────────────────────────────────────────╯

╭─────────────────────────────────────────────────────────────────╮
│  Example: Without strict                                        │
├─────────────────────────────────────────────────────────────────┤
│  function greet(name) {  // ⚠️  Implicit 'any'                 │
│    return "Hello " + name.toUpperCase();                        │
│  }                                                              │
│                                                                 │
│  greet(null);  // ⚠️  Runtime error! (name is null)            │
│  // TypeError: Cannot read property 'toUpperCase' of null      │
╰─────────────────────────────────────────────────────────────────╯

╭─────────────────────────────────────────────────────────────────╮
│  Example: With strict                                           │
├─────────────────────────────────────────────────────────────────┤
│  function greet(name: string | null) {  // ✅ Explicit type    │
│    if (name === null) {                                         │
│      return "Hello stranger";                                   │
│    }                                                            │
│    return "Hello " + name.toUpperCase();                        │
│  }                                                              │
│                                                                 │
│  greet(null);  // ✅ Safe, handled explicitly                  │
╰─────────────────────────────────────────────────────────────────╯

╭─────────────────────────────────────────────────────────────────╮
│  When to use                                                    │
├─────────────────────────────────────────────────────────────────┤
│  ✅ New projects - Always use strict mode                      │
│  ✅ Migrating projects - Enable incrementally                  │
│  ⚠️  Legacy codebases - May require significant refactoring    │
╰─────────────────────────────────────────────────────────────────╯

╭─────────────────────────────────────────────────────────────────╮
│  Trade-offs                                                     │
├─────────────────────────────────────────────────────────────────┤
│  Pros:                                                          │
│  ✅ Catch more bugs at compile time                            │
│  ✅ Better IDE autocomplete                                    │
│  ✅ Safer refactoring                                          │
│  ✅ Forces explicit null handling                              │
│                                                                 │
│  Cons:                                                          │
│  ❌ More upfront typing work                                   │
│  ❌ Harder to port from JavaScript                             │
│  ❌ May slow down prototyping                                  │
╰─────────────────────────────────────────────────────────────────╯

Recommendation: ✅ Enable strict mode for all new projects

Related options: strictNullChecks, noImplicitAny, strictFunctionTypes
Learn more: https://www.typescriptlang.org/tsconfig#strict
```

### Example 5: Strictness Check

**Command:**
```bash
tsconfig-helper strictness
```

**Output:**
```
🎚️  TypeScript Strictness Analysis

╭─────────────────────────────────────────────────────────────────╮
│  Current Configuration                                          │
├─────────────────────────────────────────────────────────────────┤
│  Overall Strictness: ⭐⭐⭐☆☆ (3/5) - Moderate                  │
│                                                                 │
│  Category breakdown:                                            │
│  • Type Safety:        ⭐⭐⭐⭐☆ (4/5)                          │
│  • Null Safety:        ⭐⭐⭐⭐⭐ (5/5)                          │
│  • Code Quality:       ⭐⭐☆☆☆ (2/5)                            │
│  • Best Practices:     ⭐⭐⭐☆☆ (3/5)                           │
╰─────────────────────────────────────────────────────────────────╯

╭─────────────────────────────────────────────────────────────────╮
│  Enabled Strict Checks (6/12)                                  │
├─────────────────────────────────────────────────────────────────┤
│  ✅ strict                      Master switch for strictness   │
│  ✅ strictNullChecks            Null/undefined handling        │
│  ✅ noImplicitAny               Require explicit types         │
│  ✅ strictFunctionTypes         Function param checking        │
│  ✅ strictBindCallApply         Method binding checks          │
│  ✅ strictPropertyInitialization Class property init          │
╰─────────────────────────────────────────────────────────────────╯

╭─────────────────────────────────────────────────────────────────╮
│  Disabled Checks (6/12)                                         │
├─────────────────────────────────────────────────────────────────┤
│  ❌ noUnusedLocals               Catch unused variables        │
│  ❌ noUnusedParameters           Catch unused function params  │
│  ❌ noImplicitReturns            Require consistent returns    │
│  ❌ noFallthroughCasesInSwitch   Catch missing break           │
│  ❌ noUncheckedIndexedAccess     Safer array access            │
│  ❌ exactOptionalPropertyTypes   Strict optional handling      │
╰─────────────────────────────────────────────────────────────────╯

╭─────────────────────────────────────────────────────────────────╮
│  Recommendations to Increase Strictness                         │
├─────────────────────────────────────────────────────────────────┤
│  Add these for better type safety:                             │
│                                                                 │
│  1. noUnusedLocals: true                                        │
│     Benefit: Catch dead code                                    │
│     Effort: Low (auto-fixable in most cases)                    │
│                                                                 │
│  2. noUnusedParameters: true                                    │
│     Benefit: Clean up unused function parameters               │
│     Effort: Low (prefix with _ to ignore: _unused)             │
│                                                                 │
│  3. noFallthroughCasesInSwitch: true                           │
│     Benefit: Catch missing break in switch statements          │
│     Effort: Low (rare issue, easy to fix)                      │
│                                                                 │
│  4. noImplicitReturns: true                                     │
│     Benefit: Ensure functions always return                    │
│     Effort: Medium (may require code changes)                  │
│                                                                 │
│  5. noUncheckedIndexedAccess: true                             │
│     Benefit: Safer array/object access                         │
│     Effort: High (requires null checks on array access)        │
│                                                                 │
│  6. exactOptionalPropertyTypes: true                           │
│     Benefit: Stricter optional property handling               │
│     Effort: High (breaking change)                             │
╰─────────────────────────────────────────────────────────────────╯

╭─────────────────────────────────────────────────────────────────╮
│  Upgrade Path                                                   │
├─────────────────────────────────────────────────────────────────┤
│  Current:  Moderate (3/5 stars)                                │
│  Target:   Strict (5/5 stars)                                  │
│                                                                 │
│  Step 1: Add low-effort options (estimated: 1 hour)            │
│  $ tsconfig-helper strictness --upgrade --level medium          │
│                                                                 │
│  Step 2: Add medium-effort options (estimated: 1 day)          │
│  $ tsconfig-helper strictness --upgrade --level high            │
│                                                                 │
│  Step 3: Add high-effort options (estimated: 1 week)           │
│  $ tsconfig-helper strictness --upgrade --level ultra           │
╰─────────────────────────────────────────────────────────────────╯

Current: 3/5 ⭐⭐⭐☆☆ | Next: 4/5 ⭐⭐⭐⭐☆ (add 3 options)
```

### Example 6: Interactive Wizard

**Command:**
```bash
tsconfig-helper init --interactive
```

**Output:**
```
╭─────────────────────────────────────────────────────────────────╮
│  🔧 TypeScript Config Wizard                                    │
│  Let's create the perfect tsconfig for your project            │
╰─────────────────────────────────────────────────────────────────╯

? What type of project is this?
  ❯ React Application (Vite/CRA/Next.js)
    Node.js Backend (Express/NestJS/API)
    Library/Package (for npm)
    Vue.js Application
    React Native Mobile App
    Vanilla TypeScript
    Monorepo (multiple packages)

✅ Selected: React Application

? What's your target environment?
  ❯ Modern browsers (ES2020+)
    Legacy browsers (ES5 + polyfills)
    Node.js 18+
    Node.js 16+
    Mixed (browser + Node.js)

✅ Selected: Modern browsers

? How strict should type-checking be?
  ❯ 🟢 Recommended (strict + common checks)
    🟡 Moderate (strict only)
    🟠 Loose (minimal checks)
    🔴 Ultra-strict (all safety checks)

✅ Selected: Recommended

? Which features do you need? (Space to select)
  ◉ JSX support
  ◉ Import JSON files
  ◉ Decorators (experimental)
  ◯ Path aliases (@/components)
  ◉ Incremental compilation (faster builds)
  ◯ Project references (monorepo)

✅ Selected 4 features

? Build tool?
  ❯ Vite
    Webpack
    esbuild
    Parcel
    tsc (no bundler)

✅ Selected: Vite

╭─── Generated Configuration ─────────────────────────────────────╮
│  {                                                              │
│    "compilerOptions": {                                         │
│      "target": "ES2020",                                        │
│      "lib": ["ES2020", "DOM", "DOM.Iterable"],                 │
│      "module": "ESNext",                                        │
│      "jsx": "react-jsx",                                        │
│      "moduleResolution": "bundler",                            │
│      "resolveJsonModule": true,                                │
│      "experimentalDecorators": true,                           │
│      "strict": true,                                            │
│      "noUnusedLocals": true,                                    │
│      "noUnusedParameters": true,                                │
│      "noFallthroughCasesInSwitch": true,                       │
│      "noEmit": true,                                            │
│      "esModuleInterop": true,                                   │
│      "skipLibCheck": true,                                      │
│      "isolatedModules": true,                                   │
│      "incremental": true                                        │
│    },                                                           │
│    "include": ["src"],                                          │
│    "exclude": ["node_modules"]                                 │
│  }                                                              │
╰─────────────────────────────────────────────────────────────────╯

? Save this configuration?
  ❯ ✅ Yes, save to tsconfig.json
    📝 Yes, save to custom path
    👀 Show explanation for each option
    🔄 Start over with different options
    ❌ Cancel

✅ tsconfig.json created successfully!

╭─────────────────────────────────────────────────────────────────╮
│  Next Steps                                                     │
├─────────────────────────────────────────────────────────────────┤
│  1. Install TypeScript (if not already):                       │
│     $ npm install -D typescript                                 │
│                                                                 │
│  2. Try compiling:                                              │
│     $ npx tsc --noEmit                                          │
│                                                                 │
│  3. Add type checking to package.json:                         │
│     "scripts": {                                                │
│       "typecheck": "tsc --noEmit"                               │
│     }                                                           │
│                                                                 │
│  4. Validate your new config:                                  │
│     $ tsconfig-helper validate                                  │
╰─────────────────────────────────────────────────────────────────╯

Happy TypeScripting! 🎉
```

### Example 7: Migration to Newer Version

**Command:**
```bash
tsconfig-helper migrate --target 5.3
```

**Output:**
```
🔄 TypeScript Migration Assistant

╭─────────────────────────────────────────────────────────────────╮
│  Version Analysis                                               │
├─────────────────────────────────────────────────────────────────┤
│  Current TypeScript: 4.9.5                                      │
│  Target TypeScript:  5.3.3                                      │
│  Config Version:     Based on TS 4.7 options                   │
╰─────────────────────────────────────────────────────────────────╯

╭─────────────────────────────────────────────────────────────────╮
│  Breaking Changes                                               │
├─────────────────────────────────────────────────────────────────┤
│  ⚠️  "importsNotUsedAsValues" is deprecated (TS 5.0+)          │
│     Replace with: "verbatimModuleSyntax": true                  │
│                                                                 │
│  ⚠️  "preserveValueImports" is deprecated (TS 5.0+)            │
│     Replace with: "verbatimModuleSyntax": true                  │
╰─────────────────────────────────────────────────────────────────╯

╭─────────────────────────────────────────────────────────────────╮
│  New Features You Can Use                                       │
├─────────────────────────────────────────────────────────────────┤
│  ✨ "allowImportingTsExtensions": true (TS 5.0+)               │
│     Benefit: Import .ts/.tsx files directly (for bundlers)     │
│                                                                 │
│  ✨ "moduleResolution": "bundler" (TS 5.0+)                    │
│     Benefit: Optimized for modern bundlers (Vite/esbuild)      │
│     Replaces: "moduleResolution": "node"                        │
│                                                                 │
│  ✨ "customConditions" (TS 5.0+)                               │
│     Benefit: Support package.json "exports" conditions         │
│                                                                 │
│  ✨ "resolvePackageJsonExports": true (TS 5.0+)                │
│     Benefit: Better package.json "exports" support             │
╰─────────────────────────────────────────────────────────────────╯

╭─────────────────────────────────────────────────────────────────╮
│  Recommended Updates                                            │
├─────────────────────────────────────────────────────────────────┤
│  Before (TS 4.9):                  After (TS 5.3):              │
│  ────────────────────────────────  ──────────────────────────── │
│  "moduleResolution": "node"        "moduleResolution": "bundler"│
│  "importsNotUsedAsValues": "..."   "verbatimModuleSyntax": true │
│  "preserveValueImports": true      (removed)                    │
│                                    "allowImportingTsExtensions" │
╰─────────────────────────────────────────────────────────────────╯

╭─────────────────────────────────────────────────────────────────╮
│  Migration Preview                                              │
├─────────────────────────────────────────────────────────────────┤
│  Changes to tsconfig.json:                                      │
│                                                                 │
│  - "importsNotUsedAsValues": "preserve"                         │
│  - "preserveValueImports": true                                 │
│  - "moduleResolution": "node"                                   │
│  + "verbatimModuleSyntax": true                                 │
│  + "moduleResolution": "bundler"                                │
│  + "allowImportingTsExtensions": true                           │
│  + "resolvePackageJsonExports": true                            │
╰─────────────────────────────────────────────────────────────────╯

? Apply these changes?
  ❯ ✅ Yes, upgrade to TS 5.3 config
    💾 Yes, and backup current config
    👀 Show detailed explanations
    ❌ Cancel

✅ Migration complete!

╭─────────────────────────────────────────────────────────────────╮
│  Post-Migration Steps                                           │
├─────────────────────────────────────────────────────────────────┤
│  1. Update TypeScript:                                          │
│     $ npm install -D typescript@5.3                             │
│                                                                 │
│  2. Test your build:                                            │
│     $ npm run build                                             │
│                                                                 │
│  3. Fix any new errors:                                         │
│     $ npx tsc --noEmit                                          │
│                                                                 │
│  4. Update @types packages (if needed):                         │
│     $ npm update @types/node @types/react                       │
╰─────────────────────────────────────────────────────────────────╯

Backup saved: tsconfig.json.backup.20260208
```

### Example 8: Preset Templates

**Command:**
```bash
tsconfig-helper generate --preset library
```

**Output:**
```
📦 Generating library tsconfig.json

╭─────────────────────────────────────────────────────────────────╮
│  Library Configuration Template                                 │
├─────────────────────────────────────────────────────────────────┤
│  {                                                              │
│    "compilerOptions": {                                         │
│      /* Language & Environment */                              │
│      "target": "ES2020",                                        │
│      "lib": ["ES2020"],                                         │
│                                                                 │
│      /* Modules */                                              │
│      "module": "ESNext",                                        │
│      "moduleResolution": "bundler",                            │
│      "resolveJsonModule": true,                                │
│                                                                 │
│      /* Emit */                                                 │
│      "declaration": true,        // Generate .d.ts files       │
│      "declarationMap": true,     // For go-to-definition       │
│      "sourceMap": true,          // For debugging              │
│      "outDir": "./dist",                                        │
│      "removeComments": false,    // Keep JSDoc comments        │
│      "importHelpers": true,      // Use tslib helpers          │
│      "declarationDir": "./dist/types",                         │
│                                                                 │
│      /* Type Checking */                                        │
│      "strict": true,                                            │
│      "noUnusedLocals": true,                                    │
│      "noUnusedParameters": true,                                │
│      "noImplicitReturns": true,                                 │
│      "noFallthroughCasesInSwitch": true,                       │
│                                                                 │
│      /* Interop Constraints */                                  │
│      "esModuleInterop": true,                                   │
│      "forceConsistentCasingInFileNames": true,                 │
│      "skipLibCheck": true,                                      │
│      "isolatedModules": true                                    │
│    },                                                           │
│    "include": ["src"],                                          │
│    "exclude": ["node_modules", "dist", "**/*.spec.ts"]        │
│  }                                                              │
╰─────────────────────────────────────────────────────────────────╯

✅ tsconfig.json created

╭─────────────────────────────────────────────────────────────────╮
│  Library-Specific Recommendations                               │
├─────────────────────────────────────────────────────────────────┤
│  1. Add to package.json:                                        │
│     {                                                           │
│       "main": "./dist/index.js",                                │
│       "types": "./dist/types/index.d.ts",                       │
│       "files": ["dist"],                                        │
│       "scripts": {                                              │
│         "build": "tsc",                                         │
│         "prepublishOnly": "npm run build"                       │
│       }                                                         │
│     }                                                           │
│                                                                 │
│  2. Install tslib for smaller bundles:                         │
│     $ npm install tslib                                         │
│                                                                 │
│  3. Consider dual ESM/CJS build (for compatibility):           │
│     Use tools like: tsup, unbuild, or microbundle              │
│                                                                 │
│  4. Add API documentation:                                      │
│     $ npm install -D @microsoft/api-extractor                   │
╰─────────────────────────────────────────────────────────────────╯
```

### Example 9: CI/CD Validation

**.github/workflows/typescript.yml:**
```yaml
name: TypeScript Check

on: [pull_request]

jobs:
  typecheck:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3

      - name: Install dependencies
        run: npm ci

      - name: Validate tsconfig
        run: npx @muin/tsconfig-helper validate --strict

      - name: Type check
        run: npx tsc --noEmit

      - name: Check strictness level
        run: npx @muin/tsconfig-helper strictness --min-level 3
```

**Command:**
```bash
tsconfig-helper validate --strict
```

**Output (success):**
```
✅ TypeScript configuration is valid

All checks passed:
  ✅ No deprecated options
  ✅ No conflicting settings
  ✅ All paths resolve correctly
  ✅ Extended configs are valid

Safe to merge.
```

**Output (failure):**
```
❌ TypeScript configuration has errors

Issues found:
  • 2 deprecated options (will break in TS 6.0)
  • 1 conflicting setting (strict + noImplicitAny: false)
  • 1 unresolved path alias (@/utils)

Fix these issues before merging.
Command exited with code 1
```

## Supported TypeScript Versions

| Version | Support | Notes |
|---------|---------|-------|
| 5.3.x | ✅ Full | Latest features |
| 5.2.x | ✅ Full | All features supported |
| 5.1.x | ✅ Full | Stable |
| 5.0.x | ✅ Full | Major release |
| 4.9.x | ✅ Full | LTS |
| 4.7-4.8 | ⚠️ Partial | Some warnings |
| < 4.7 | ⚠️ Limited | Upgrade recommended |

## Common Use Cases

### 1. **Onboard New Developers**
Help team members set up TypeScript correctly:

```bash
# New developer clones repo
git clone ...
npm install

# Check what's wrong with their config
tsconfig-helper validate

# Get recommendations
tsconfig-helper recommend --project-type react

# Generate proper config
tsconfig-helper init --preset react
```

**Before:** 2 hours debugging "Cannot find module" errors  
**After:** 5 minutes with correct config

### 2. **Upgrade TypeScript Safely**
Migrate to newer TypeScript versions:

```bash
# Before upgrading
tsconfig-helper migrate --target 5.3 --dry-run

# Review changes
# Apply migration
tsconfig-helper migrate --target 5.3 --backup

# Update TypeScript
npm install -D typescript@5.3
```

**Catches:**
- Deprecated options
- Breaking changes
- New features you can use

### 3. **Enforce Team Standards**
Ensure consistent configs across team:

```bash
# In CI
tsconfig-helper validate --strict --min-strictness 4

# Fails if:
# - Config is too loose
# - Missing recommended options
# - Deprecated options used
```

### 4. **Debug Config Issues**
When TypeScript behaves unexpectedly:

```bash
# See exactly what's happening
tsconfig-helper validate --verbose

# Explains:
# - Which options are active
# - Where they come from (extends)
# - Conflicts between options
# - Why certain files are/aren't included
```

### 5. **Optimize Build Performance**
Find config options slowing your build:

```bash
tsconfig-helper recommend --optimize-for build-speed

# Suggests:
# - skipLibCheck: true (faster)
# - incremental: true (cache)
# - Disable unused checks
# - Split large projects
```

### 6. **Library Configuration**
Set up perfect config for npm packages:

```bash
tsconfig-helper generate --preset library

# Automatically configures:
# - Declaration files (.d.ts)
# - Source maps
# - Tree-shaking friendly output
# - Proper module format
```

### 7. **Monorepo Setup**
Configure TypeScript in monorepos:

```bash
# Root config
tsconfig-helper generate --preset monorepo-root

# Package configs
cd packages/api
tsconfig-helper generate --preset node --extends ../../tsconfig.base.json

cd ../web
tsconfig-helper generate --preset react --extends ../../tsconfig.base.json
```

## Why This Tool?

### The Problem

**Scenario 1: The Mysterious Type Errors**

Developer adds React to existing project...

```json
{
  "compilerOptions": {
    "target": "ES5",
    "jsx": "preserve"
  }
}
```

**What happens:**
```
Error: 'React' refers to a UMD global, but the current file is a module.
```

**3 hours later:** Still debugging config issues

**With tsconfig-helper:**
```bash
tsconfig-helper validate
⚠️  jsx: "preserve" conflicts with React setup
💡 Change to: "jsx": "react-jsx"
```

**Fixed in 30 seconds.**

---

**Scenario 2: The TypeScript Upgrade**

Team upgrades TypeScript 4.9 → 5.3

```bash
npm install -D typescript@5.3
npm run build
```

**Result:**
```
warning: 'importsNotUsedAsValues' is deprecated
warning: 'preserveValueImports' is deprecated
1,247 type errors
```

**Time to fix:** 2 days

**With tsconfig-helper:**
```bash
tsconfig-helper migrate --target 5.3
✅ Auto-migrated config
✅ Replaced deprecated options
✅ Added new features
```

**Time saved:** 1.5 days

### The Benefits

- ⏱️ **Save time** - No more Googling tsconfig options
- 🐛 **Fewer bugs** - Catch config issues before runtime
- 📚 **Learn** - Understand what each option does
- 🎯 **Optimize** - Get recommendations for your use case
- 👥 **Team alignment** - Consistent configs across team
- 🚀 **Best practices** - Battle-tested presets

## Common Gotchas & Troubleshooting

### Issue: "Property does not exist on type" despite being there

**Cause:** Wrong `moduleResolution` setting

**Solution:**
```bash
# Check module resolution
tsconfig-helper explain moduleResolution

# Fix:
{
  "moduleResolution": "bundler"  // or "node16" for Node.js
}
```

### Issue: Type-checking is slow

**Cause:** Checking all node_modules

**Solution:**
```bash
tsconfig-helper validate --check-performance

# Recommendations:
{
  "skipLibCheck": true,     // Don't check .d.ts files
  "incremental": true,      // Cache results
  "exclude": ["node_modules"]
}
```

### Issue: Import paths not resolving

**Cause:** Missing or wrong `paths` configuration

**Solution:**
```bash
# Validate paths
tsconfig-helper validate --check-paths

# Fix:
{
  "baseUrl": ".",
  "paths": {
    "@/*": ["src/*"]
  }
}

# Also update: vite.config.ts, jest.config.js, etc.
```

### Issue: "Cannot use JSX unless '--jsx' flag is provided"

**Cause:** Missing jsx setting

**Solution:**
```bash
tsconfig-helper recommend --project-type react

# Will suggest:
{
  "jsx": "react-jsx"  // or "react" for older React
}
```

### Issue: Strict mode breaks existing code

**Cause:** Enabling `strict` in legacy codebase

**Solution:**
```bash
# Incremental strictness
tsconfig-helper strictness --upgrade --level medium

# Or enable options one at a time:
{
  "strict": false,
  "strictNullChecks": true  // Start with this
  // Add more later
}
```

### Issue: Declaration files not generated

**Cause:** Missing declaration settings

**Solution:**
```bash
tsconfig-helper generate --preset library

# Will include:
{
  "declaration": true,
  "declarationMap": true,
  "emitDeclarationOnly": false
}
```

### Issue: Config works locally but fails in CI

**Cause:** Different TypeScript versions or missing files

**Solution:**
```bash
# Lock TypeScript version
npm install -D typescript@5.3.3  # Exact version

# Validate extends work
tsconfig-helper validate --check-extends

# Check includes/excludes
tsconfig-helper validate --verbose
```

### Issue: Monorepo project references not working

**Cause:** Circular dependencies or wrong composite setup

**Solution:**
```bash
# Validate project references
tsconfig-helper validate --check-references

# Fix:
{
  "composite": true,
  "references": [
    { "path": "../shared" }
  ]
}
```

### Issue: Options not taking effect

**Cause:** Being overridden by extended config

**Solution:**
```bash
# See effective config (after extends)
tsconfig-helper validate --show-effective

# Shows which options come from where
```

### Issue: Build output in wrong location

**Cause:** Incorrect `outDir` or `rootDir`

**Solution:**
```bash
# Explain output structure
tsconfig-helper explain outDir

# Fix:
{
  "outDir": "./dist",
  "rootDir": "./src"  // Preserves src structure
}
```

## Performance Tips

### Tip 1: Use incremental builds

```json
{
  "incremental": true,
  "tsBuildInfoFile": ".tsbuildinfo"
}
```

**Impact:** 2-5x faster rebuilds

### Tip 2: Skip library checking

```json
{
  "skipLibCheck": true
}
```

**Impact:** 30-50% faster type checking

### Tip 3: Optimize includes/excludes

```json
{
  "include": ["src"],
  "exclude": ["node_modules", "dist", "**/*.spec.ts"]
}
```

**Impact:** Avoid checking unnecessary files

### Tip 4: Use project references (monorepos)

```json
{
  "references": [
    { "path": "../shared" }
  ]
}
```

**Impact:** Parallel type-checking, better caching

### Tip 5: Disable unused checks

```json
{
  "noUnusedLocals": false,  // Disable in development
  "noUnusedParameters": false
}
```

**Impact:** Faster development feedback

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history.

## Roadmap

### v1.1.0 (Next)
- [ ] VS Code extension (inline validation)
- [ ] Auto-fix common issues (one-click fixes)
- [ ] Config diffing tool (compare any two configs)
- [ ] Performance profiler (find slow configs)

### v1.2.0
- [ ] AI-powered recommendations (learn from your codebase)
- [ ] Config analyzer (visualize option dependencies)
- [ ] Preset marketplace (share configs)
- [ ] Multi-project validation (monorepo awareness)

### v2.0.0
- [ ] Real-time config editor (GUI)
- [ ] Config versioning (track changes over time)
- [ ] Team config management (shared standards)
- [ ] Integration with tsc --showConfig
- [ ] Automated migration (any version to any version)

### Future Ideas
- [ ] Browser extension (validate in GitHub UI)
- [ ] Slack bot (review tsconfig in PRs)
- [ ] Config generator from code (infer from usage)
- [ ] Benchmark mode (measure type-check performance)
- [ ] Config linter (custom rules)

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](../../CONTRIBUTING.md) for guidelines.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/muin-company/cli-tools.git
cd cli-tools/packages/tsconfig-helper

# Install dependencies
npm install

# Build
npm run build

# Test
npm test

# Run locally
node dist/cli.js validate
```

## FAQ

**Q: Does this replace TypeScript's own config validation?**  
A: No, it enhances it. TypeScript validates syntax; we add recommendations and explanations.

**Q: Can I use this with JavaScript projects?**  
A: Yes! TypeScript supports JavaScript with `allowJs: true`. We can help configure that.

**Q: What's the difference between validate and recommend?**  
A: `validate` checks for errors. `recommend` suggests improvements based on your project.

**Q: Can this break my existing config?**  
A: No, we never modify your config without permission. Use `--dry-run` to preview changes.

**Q: Does this work with tsconfig extends?**  
A: Yes! We resolve and validate the entire inheritance chain.

**Q: Can I create custom presets?**  
A: Yes! Use `--save-preset` to save your config as a reusable template.

**Q: How do I share configs across team?**  
A: Create a shared npm package with base configs, then extend them.

**Q: What about path aliases (@/)?**  
A: We validate paths work and suggest bundler/test tool config updates.

**Q: Can this help with tsc errors?**  
A: Yes! Many tsc errors are config-related. Run `validate` first.

**Q: Is there a web UI?**  
A: Use `--interactive` for a TUI. Web GUI coming in v2.0.

## License

MIT © [MUIN](https://muin.company)

## Related Projects

- [@muin/bundlesize](../bundlesize) - Track JavaScript bundle sizes
- [@muin/envdiff](../envdiff) - Compare environment configurations
- [TSConfig Bases](https://github.com/tsconfig/bases) - Official base configs
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/) - Learn TypeScript
- [More MUIN tools](https://muin.company/tools)

## Support

- 🐛 [Report a bug](https://github.com/muin-company/cli-tools/issues/new?template=bug_report.md)
- 💡 [Request a feature](https://github.com/muin-company/cli-tools/issues/new?template=feature_request.md)
- 💬 [Join our Discord](https://discord.gg/muin)
- 🐦 [Follow us on Twitter](https://twitter.com/muin_company)

---

**Made with ❤️ by [MUIN](https://muin.company)** - Building AI-powered developer tools

[⬆ Back to top](#muin/tsconfig-helper)
