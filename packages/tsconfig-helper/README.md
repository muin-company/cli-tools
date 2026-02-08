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

## Real-World Use Cases

### Use Case 1: Onboarding New Developers

**Scenario:** Junior developer joins team, clones repo, spends 2 hours debugging config issues.

**The Problem:**
```bash
$ npm start

Error: Cannot find module '@/components/Header'
Error: JSX element implicitly has type 'any'
Error: Module '"react"' has no exported member 'FC'
```

**Developer's frustration:**
- Googles "typescript cannot find module"
- Tries 5 different solutions from Stack Overflow
- Still broken
- Eventually gives up and asks senior dev

**The Solution with tsconfig-helper:**

```bash
# New developer runs
$ tsconfig-helper validate

⚠️  3 configuration issues found:

1. Missing "baseUrl" for path aliases
   Your imports use @/ but baseUrl is not set
   Fix: Add "baseUrl": "."

2. JSX configuration mismatch
   Using React 18 but jsx: "react" (old transform)
   Fix: Change to "jsx": "react-jsx"

3. Missing @types/react
   Install: npm install -D @types/react

# Auto-fix
$ tsconfig-helper validate --fix

✅ Fixed all issues
✅ npm start now works
```

**Before:** 2 hours of frustration  
**After:** 30 seconds to identify and fix  
**Time saved:** 119 minutes ⏱️

---

### Use Case 2: Upgrading TypeScript Safely

**Scenario:** Team wants to upgrade TypeScript 4.9 → 5.3 to use new features.

**The Problem:**
```bash
$ npm install -D typescript@5.3
$ npm run build

warning: 'importsNotUsedAsValues' is deprecated
warning: 'preserveValueImports' is deprecated
src/api/client.ts:45:12 - error TS2305: Module has no exported member
src/utils/types.ts:89:3 - error TS2344: Type does not satisfy constraint
... 147 more errors
```

**Team's dilemma:**
- Can't upgrade due to breaking changes
- Stays on old TypeScript version
- Misses out on new features, bug fixes, performance improvements

**The Solution with tsconfig-helper:**

```bash
# Before upgrading, analyze impact
$ tsconfig-helper migrate --target 5.3 --dry-run

📋 Migration Analysis Report

Breaking Changes:
  ⚠️  "importsNotUsedAsValues": "preserve"
     Removed in TS 5.0
     Replace with: "verbatimModuleSyntax": true

  ⚠️  "preserveValueImports": true
     Removed in TS 5.0
     Replace with: "verbatimModuleSyntax": true

New Features Available:
  ✨ "moduleResolution": "bundler"
     40% faster module resolution
  
  ✨ "allowImportingTsExtensions": true
     Import .ts files directly in Vite

Estimated impact: 2 config changes, ~30 minutes

# Apply migration
$ tsconfig-helper migrate --target 5.3 --backup

✅ Backed up: tsconfig.json.backup
✅ Updated tsconfig.json
✅ Migration complete

# Now upgrade
$ npm install -D typescript@5.3
$ npm run build

✅ Build successful
✅ 0 new errors
```

**Before:** 2 days fixing breaking changes  
**After:** 30 minutes guided migration  
**Time saved:** ~15 hours ⏱️

---

### Use Case 3: Enforcing Team Standards

**Scenario:** 5 developers, each with different tsconfig.json. Inconsistent type-checking causes bugs in production.

**The Problem:**
```
Developer A's config:
  "strict": false
  (catches nothing)

Developer B's config:
  "strict": true
  (catches everything)

Developer C's config:
  <uses default>
  (somewhere in between)

Result:
  → B's PR fails on C's machine
  → Null reference error in production (A's code)
  → Hours wasted in PR reviews
```

**The Solution with tsconfig-helper:**

```bash
# Create team standard config
$ tsconfig-helper generate --preset react --strictness recommended

# Add to .github/workflows/ci.yml
- name: Validate TypeScript Config
  run: |
    npx @muin/tsconfig-helper validate --strict
    npx @muin/tsconfig-helper strictness --min-level 3

# Any PR with weak config fails CI
✅ Enforces minimum strictness level
✅ Catches deprecated options
✅ Ensures consistent team standards
```

**In package.json:**
```json
{
  "scripts": {
    "lint:ts": "tsconfig-helper validate --strict",
    "precommit": "npm run lint:ts"
  }
}
```

**Result:**
- All developers use same standards
- Config issues caught before PR
- Fewer null errors in production

**Before:** ~2 hours/week debugging config mismatches  
**After:** ~10 minutes/week (automated checks)  
**Time saved:** ~100 hours/year per team ⏱️

---

### Use Case 4: Debugging Mysterious Type Errors

**Scenario:** Developer adds new feature, suddenly 200+ type errors appear.

**The Problem:**
```bash
$ git checkout feature/new-auth
$ npm run typecheck

Error: Property 'user' does not exist on type '{}'
Error: Argument of type 'string | undefined' is not assignable to 'string'
Error: Type 'null' is not assignable to type 'User'
... 197 more errors
```

**Developer's confusion:**
- "It was working yesterday!"
- Reverts changes, still broken
- Spends 3 hours debugging
- Discovers someone changed tsconfig.json

**The Solution with tsconfig-helper:**

```bash
# Compare configs
$ tsconfig-helper compare HEAD:tsconfig.json feature/new-auth:tsconfig.json

📊 Configuration Drift Detected

Changed options:
  strictNullChecks: false → true
  (Now requires null checks everywhere)

Impact:
  ⚠️  197 files need updates for null safety
  ⚠️  Estimated fix time: 4-6 hours

Recommendation:
  1. Revert strictNullChecks change
  2. Enable incrementally using migration tool
  3. Fix files gradually over 2-3 PRs

# Guided migration
$ tsconfig-helper strictness --upgrade --incremental

Step 1/3: Enable strictNullChecks in src/auth/ only
  Modified: tsconfig.json + include override
  Errors: 23 (manageable)

# Fix 23 errors, then:
$ tsconfig-helper strictness --upgrade --next

Step 2/3: Enable in src/api/
  Errors: 47
... and so on
```

**Before:** 6 hours debugging + fixing  
**After:** 30 minutes over 3 PRs (incremental)  
**Time saved:** 5+ hours ⏱️

---

### Use Case 5: Optimizing Build Performance

**Scenario:** TypeScript build takes 3 minutes, blocking deployments.

**The Problem:**
```bash
$ npm run build

Type-checking... ⏳
(1 minute passes)
Still type-checking... ⏳
(2 minutes pass)
✅ Build complete (3m 14s)

Deployment time: 5 minutes total
(Too slow for CI/CD)
```

**The Analysis:**
```bash
$ tsconfig-helper analyze --performance

⚡ Performance Report

Current build time: 3m 14s (SLOW ⚠️)

Issues found:
  1. Checking 4,782 .d.ts files in node_modules
     Impact: -120s
     Fix: Enable skipLibCheck
  
  2. No incremental caching
     Impact: Rebuilding everything every time
     Fix: Enable incremental
  
  3. Including test files in build
     Impact: -45s
     Fix: Exclude **/*.test.ts
  
  4. Single large project (no parallelization)
     Impact: No concurrent type-checking
     Fix: Split into 3 projects with references

Potential improvement: 3m 14s → 38s (80% faster)
```

**Applying fixes:**
```bash
# Apply optimizations
$ tsconfig-helper optimize --apply

Updated tsconfig.json:
  + "skipLibCheck": true
  + "incremental": true
  + exclude: ["**/*.test.ts", "**/*.spec.ts"]

# Split into projects (for monorepo)
$ tsconfig-helper split --projects 3

Created:
  - tsconfig.shared.json
  - tsconfig.api.json
  - tsconfig.web.json
  - tsconfig.build.json (orchestrates all)

# New build time
$ npm run build

✅ Build complete (42s)

Improvement: 3m 14s → 42s (78% faster!)
```

**Result:**
- Faster CI/CD pipeline
- More deployments per day
- Happier developers

**Before:** 3m 14s per build  
**After:** 42s per build  
**Time saved:** 2m 32s × 50 builds/day = 2 hours/day ⏱️

---

### Use Case 6: Publishing NPM Library with Perfect Types

**Scenario:** Library author wants to publish package with excellent TypeScript support.

**The Problem:**
```bash
# Published library
$ npm publish

# User tries to use it
import { myFunction } from 'my-library'

❌ Could not find declaration file for 'my-library'
❌ No autocomplete
❌ No type safety
```

**User's reaction:**
- Frustrated with poor DX
- Looks for alternative library
- Leaves 1-star review: "No TypeScript support"

**The Solution with tsconfig-helper:**

```bash
# Generate perfect library config
$ tsconfig-helper generate --preset library

Created tsconfig.json with:
  ✅ declaration: true          (.d.ts files)
  ✅ declarationMap: true       (go-to-source in IDE)
  ✅ sourceMap: true            (debugging)
  ✅ outDir: ./dist
  ✅ rootDir: ./src
  ✅ Proper module format

# Validate before publish
$ tsconfig-helper validate --library-mode

Checking library configuration...
  ✅ Declaration files will be generated
  ✅ Package.json has correct "types" field
  ✅ "files" includes dist/
  ✅ .d.ts files will be tree-shakeable

# Build
$ npm run build

dist/
├── index.js
├── index.d.ts
├── index.d.ts.map
├── utils.js
├── utils.d.ts
└── utils.d.ts.map

# Publish
$ npm publish

# Users get perfect TypeScript experience
```

**User experience after:**
```typescript
import { myFunction } from 'my-library'
//       ^^^^^^^^^^
//       ✅ Full autocomplete
//       ✅ Type safety
//       ✅ Go-to-definition works
//       ✅ Inline documentation
```

**Before:** 60% of users complain about types  
**After:** 5-star reviews: "Best TypeScript DX"  
**Result:** 3x more downloads 📈

---

### Use Case 7: Monorepo TypeScript Setup

**Scenario:** Company has 12 packages in monorepo. Each has different tsconfig causing inconsistencies.

**The Problem:**
```
packages/
├── api/          (uses CommonJS)
├── web/          (uses ESNext)
├── mobile/       (uses ES5)
├── shared/       (uses random config)
├── utils/        (extends nothing)
... 7 more

Issues:
- Shared types not working
- Can't build all at once
- Changes require rebuilding everything
- No code sharing between packages
```

**The Solution with tsconfig-helper:**

```bash
# Generate monorepo structure
$ tsconfig-helper setup-monorepo --packages 12

Created:
  📄 tsconfig.base.json (shared options)
  📄 packages/shared/tsconfig.json (composite)
  📄 packages/api/tsconfig.json (references shared)
  📄 packages/web/tsconfig.json (references shared)
  ... and 9 more

# Validate structure
$ tsconfig-helper validate --monorepo

✅ All packages extend base config
✅ No circular dependencies
✅ Build order: shared → utils → api, web, mobile
✅ Project references configured

# Build all (parallel)
$ tsc --build

Building:
  [1/12] shared  ✅ (2.3s)
  [2/12] utils   ✅ (1.8s)
  [3/12] api     ✅ (3.1s)  ← parallel
  [4/12] web     ✅ (2.9s)  ← parallel
  [5/12] mobile  ✅ (3.4s)  ← parallel
  ...

Total: 8.2s (was 45s without references)
82% faster! ⚡
```

**Structure created:**
```json
// tsconfig.base.json
{
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}

// packages/shared/tsconfig.json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "composite": true,
    "declaration": true,
    "outDir": "./dist"
  }
}

// packages/api/tsconfig.json
{
  "extends": "../../tsconfig.base.json",
  "references": [
    { "path": "../shared" },
    { "path": "../utils" }
  ]
}
```

**Before:** 45s build, can't parallelize, rebuild all on change  
**After:** 8s parallel build, smart rebuilds  
**Time saved:** 37s × 100 builds/day = 1 hour/day ⏱️

---

### Use Case 8: Migrating from JavaScript to TypeScript

**Scenario:** Team decides to adopt TypeScript in existing 50k-line JavaScript codebase.

**The Problem:**
```bash
# Rename .js → .ts
$ mv src/index.js src/index.ts

# Try to compile
$ npx tsc

Error TS2300: Duplicate identifier 'Promise'
Error TS2304: Cannot find name 'require'
Error TS7006: Parameter 'x' implicitly has 'any' type
... 2,847 more errors
```

**Team's reaction:**
- "This is impossible"
- "Let's give up"
- OR "Let's fix all 2,847 errors" (6 months later, still not done)

**The Solution with tsconfig-helper:**

```bash
# Generate migration-friendly config
$ tsconfig-helper init --migration-mode

Created tsconfig.json for gradual migration:
  ✅ allowJs: true          (keep .js files)
  ✅ checkJs: false         (don't check .js yet)
  ✅ noImplicitAny: false   (allow any for now)
  ✅ strict: false          (enable later)

# Start with 0 errors
$ npx tsc --noEmit
✅ 0 errors (all .js files allowed)

# Migrate incrementally
$ tsconfig-helper migrate-files --count 5

Migrated 5 files:
  src/index.js → src/index.ts (12 fixes needed)
  src/utils.js → src/utils.ts (8 fixes needed)
  src/api.js → src/api.ts (23 fixes needed)
  ... 

Total errors: 43 (manageable)

# Fix those 43 errors, then repeat
$ tsconfig-helper migrate-files --count 5
... rinse and repeat

# After 50% migrated, increase strictness
$ tsconfig-helper strictness --upgrade --incremental

Enabled: noImplicitAny (for .ts files only)
New errors: 67 (in migrated files)

# Gradually increase strictness as you migrate
```

**Migration timeline:**
- Week 1: 10% migrated (50 files)
- Week 2: 25% migrated (125 files)
- Week 4: 50% migrated (250 files)
- Week 8: 100% migrated (500 files)

**Before:** Attempted "big bang" migration, failed  
**After:** Gradual migration, 8 weeks to 100% TypeScript  
**Outcome:** Success! Full type safety achieved ✅

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

**Details:**
- First build: same speed
- Subsequent builds: only type-check changed files
- Cache file: `.tsbuildinfo` (add to .gitignore)
- Best for: Projects with >100 files

**Benchmarks:**
```
Without incremental:
  First build:  18.3s
  Rebuild:      18.1s (no benefit)

With incremental:
  First build:  18.5s (+0.2s for cache creation)
  Rebuild:      3.2s (82% faster!)
```

### Tip 2: Skip library checking

```json
{
  "skipLibCheck": true
}
```

**Impact:** 30-50% faster type checking

**Details:**
- Skips type-checking .d.ts files in node_modules
- Trade-off: Won't catch type errors in dependencies
- Recommendation: Enable for app projects, disable for library authors

**Why it helps:**
```
Typical node_modules type checking:
  @types/react:     847 files
  @types/node:      1,234 files
  @types/jest:      89 files
  Total:            ~2,170 .d.ts files

With skipLibCheck: true → Skip all of these ✅
```

### Tip 3: Optimize includes/excludes

```json
{
  "include": ["src"],
  "exclude": ["node_modules", "dist", "**/*.spec.ts"]
}
```

**Impact:** Avoid checking unnecessary files

**Advanced optimization:**
```json
{
  "include": ["src/**/*.ts", "src/**/*.tsx"],
  "exclude": [
    "node_modules",
    "dist",
    "build",
    ".next",
    "coverage",
    "**/*.test.ts",
    "**/*.test.tsx",
    "**/*.spec.ts",
    "**/*.spec.tsx",
    "**/*.stories.ts",
    "**/*.stories.tsx",
    "**/__tests__/**",
    "**/__mocks__/**",
    "scripts/**",  // Build scripts
    "config/**"    // Config files
  ]
}
```

**Pro tip:** Create separate configs for different purposes:
- `tsconfig.json` - Type-check everything (IDE)
- `tsconfig.build.json` - Build only (excludes tests)
- `tsconfig.test.json` - Test files only

### Tip 4: Use project references (monorepos)

```json
{
  "references": [
    { "path": "../shared" },
    { "path": "../utils" }
  ]
}
```

**Impact:** Parallel type-checking, better caching

**Benefits:**
- **Parallel builds:** Multiple packages type-check simultaneously
- **Smart rebuilds:** Only rebuild changed packages
- **Better IDE:** Jump-to-definition goes to source, not .d.ts
- **Enforces architecture:** Prevents circular dependencies

**Setup:**
```bash
# 1. Enable composite in each package
# packages/shared/tsconfig.json
{
  "composite": true,
  "declaration": true
}

# 2. Reference in dependent packages
# packages/api/tsconfig.json
{
  "references": [
    { "path": "../shared" }
  ]
}

# 3. Build with --build
tsc --build
```

**Performance example:**
```
Before (single project):
  Type-check time: 45s (sequential)

After (project references):
  Type-check time: 18s (parallel)
  60% faster! ⚡
```

### Tip 5: Disable unused checks in development

```json
{
  "noUnusedLocals": false,      // Disable in development
  "noUnusedParameters": false,
  "noUnusedLabels": false
}
```

**Impact:** Faster development feedback

**Strategy:** Use two configs:
```json
// tsconfig.json (development - fast)
{
  "compilerOptions": {
    "noUnusedLocals": false
  }
}

// tsconfig.build.json (CI - strict)
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

**In package.json:**
```json
{
  "scripts": {
    "dev": "tsc --watch",
    "build": "tsc -p tsconfig.build.json",
    "ci": "tsc -p tsconfig.build.json --noEmit"
  }
}
```

### Tip 6: Optimize module resolution

```json
{
  "moduleResolution": "bundler"  // Faster than "node"
}
```

**Details:**
- `bundler`: Optimized for Vite/Webpack (fastest)
- `node16`/`nodenext`: Respects package.json "exports" (slower but accurate)
- `node`: Legacy, slowest

**Benchmark:**
```
moduleResolution: "node"      → 12.3s
moduleResolution: "node16"    → 11.8s
moduleResolution: "bundler"   → 9.4s  (24% faster)
```

### Tip 7: Limit type acquisition (VS Code)

```json
// .vscode/settings.json
{
  "typescript.disableAutomaticTypeAcquisition": true,
  "typescript.tsserver.maxTsServerMemory": 8192,
  "typescript.suggest.autoImports": true,
  "typescript.preferences.includePackageJsonAutoImports": "off"
}
```

**Impact:** Lower memory usage, faster IntelliSense

**Explanation:**
- Prevents VS Code from auto-downloading @types packages
- Increases TS server memory limit (default: 3GB)
- Disables auto-imports from package.json (can be slow)

### Tip 8: Use SWC or esbuild for transpilation

Instead of `tsc` for compilation:

```bash
# Install SWC
npm install -D @swc/core @swc/cli

# Use for transpilation (10-100x faster)
swc src -d dist

# Use tsc only for type-checking
tsc --noEmit
```

**Performance comparison:**
```
tsc (transpile + type-check):  18.3s
swc (transpile) + tsc --noEmit: 2.1s + 4.5s = 6.6s
→ 64% faster overall
```

**Or use esbuild:**
```bash
npm install -D esbuild

# Build
esbuild src/index.ts --bundle --outfile=dist/index.js

# Type-check separately
tsc --noEmit
```

### Tip 9: Configure watch mode smartly

```json
{
  "watchOptions": {
    "watchFile": "useFsEvents",
    "watchDirectory": "useFsEvents",
    "fallbackPolling": "dynamicPriority",
    "synchronousWatchDirectory": true,
    "excludeDirectories": ["**/node_modules", "**/.git"]
  }
}
```

**Impact:** Faster, more reliable watch mode

**Options explained:**
- `useFsEvents`: Use native OS file watching (fastest)
- `dynamicPriority`: Optimize polling for changed files
- `excludeDirectories`: Don't watch unnecessary folders

### Tip 10: Parallelize with multiple tsconfig files

```bash
# Instead of one large build
tsc

# Split into parallel builds
tsc -p tsconfig.app.json & \
tsc -p tsconfig.server.json & \
wait
```

**Use case:** Separate client/server or multiple apps in one repo

**Example setup:**
```
/
├── tsconfig.app.json    (browser code)
├── tsconfig.server.json (Node.js code)
└── tsconfig.json        (base, IDE)
```

### Tip 11: Profile and optimize hot paths

```bash
# Generate trace
tsc --generateTrace trace

# Analyze
npx @typescript/analyze-trace trace
```

**Output shows:**
```
Types taking longest to check:
  1. react-router (847ms)
  2. @types/node (623ms)
  3. styled-components (421ms)

Recommendation: Consider alternatives or update versions
```

### Tip 12: Cache node_modules types

```json
{
  "typeRoots": ["./node_modules/@types"],
  "types": [
    "node",
    "jest",
    "react"
    // Limit to only what you need
  ]
}
```

**Impact:** Faster by not scanning all @types packages

**Before:**
```
Scanning 127 @types packages...
```

**After:**
```
Using only: @types/node, @types/jest, @types/react
50% faster startup ⚡
```

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

## Advanced Examples

### Example 10: Path Aliases Validation

**tsconfig.json:**
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@utils/*": ["src/utils/*"],
      "@api": ["src/api/index.ts"]
    }
  }
}
```

**Command:**
```bash
tsconfig-helper validate --check-paths
```

**Output:**
```
🔍 Validating Path Aliases

╭─────────────────────────────────────────────────────────────────╮
│  Path Resolution Analysis                                       │
├─────────────────────────────────────────────────────────────────┤
│  Base URL: /Users/dev/my-project                                │
│  Aliases: 4 configured                                          │
│                                                                 │
│  ✅ @/* → src/* (127 files matched)                            │
│  ✅ @components/* → src/components/* (43 files)                │
│  ✅ @utils/* → src/utils/* (18 files)                          │
│  ✅ @api → src/api/index.ts (1 file)                           │
╰─────────────────────────────────────────────────────────────────╯

╭─────────────────────────────────────────────────────────────────╮
│  Tooling Configuration Needed                                   │
├─────────────────────────────────────────────────────────────────┤
│  ⚠️  Your bundler/test runner needs matching config            │
│                                                                 │
│  Vite (vite.config.ts):                                         │
│  import path from 'path'                                        │
│  export default {                                               │
│    resolve: {                                                   │
│      alias: {                                                   │
│        '@': path.resolve(__dirname, './src'),                   │
│        '@components': path.resolve(__dirname, './src/components'),│
│        '@utils': path.resolve(__dirname, './src/utils'),        │
│        '@api': path.resolve(__dirname, './src/api/index.ts')    │
│      }                                                          │
│    }                                                            │
│  }                                                              │
│                                                                 │
│  Jest (jest.config.js):                                         │
│  moduleNameMapper: {                                            │
│    '^@/(.*)$': '<rootDir>/src/$1',                              │
│    '^@components/(.*)$': '<rootDir>/src/components/$1',         │
│    '^@utils/(.*)$': '<rootDir>/src/utils/$1',                   │
│    '^@api$': '<rootDir>/src/api/index.ts'                       │
│  }                                                              │
│                                                                 │
│  Webpack (webpack.config.js):                                   │
│  resolve: {                                                     │
│    alias: {                                                     │
│      '@': path.resolve(__dirname, 'src/'),                      │
│      '@components': path.resolve(__dirname, 'src/components/'), │
│      '@utils': path.resolve(__dirname, 'src/utils/'),           │
│      '@api': path.resolve(__dirname, 'src/api/index.ts')        │
│    }                                                            │
│  }                                                              │
╰─────────────────────────────────────────────────────────────────╯

💡 Tip: Run `tsconfig-helper generate-aliases --output vite` to auto-generate configs
```

### Example 11: Monorepo Configuration

**Directory Structure:**
```
my-monorepo/
├── tsconfig.base.json
├── packages/
│   ├── api/
│   │   └── tsconfig.json
│   ├── web/
│   │   └── tsconfig.json
│   └── shared/
│       └── tsconfig.json
```

**Command:**
```bash
tsconfig-helper validate --check-references --recursive
```

**Output:**
```
🔍 Validating Monorepo TypeScript Configuration

╭─────────────────────────────────────────────────────────────────╮
│  Project Structure                                              │
├─────────────────────────────────────────────────────────────────┤
│  Root: /Users/dev/my-monorepo                                   │
│  Packages: 3 detected                                           │
│                                                                 │
│  📦 shared (library)                                            │
│     Config: packages/shared/tsconfig.json                       │
│     Extends: ../../tsconfig.base.json                           │
│     Composite: ✅ Yes                                          │
│     References: none                                            │
│                                                                 │
│  📦 api (Node.js backend)                                       │
│     Config: packages/api/tsconfig.json                          │
│     Extends: ../../tsconfig.base.json                           │
│     Composite: ✅ Yes                                          │
│     References: ../shared                                       │
│                                                                 │
│  📦 web (React frontend)                                        │
│     Config: packages/web/tsconfig.json                          │
│     Extends: ../../tsconfig.base.json                           │
│     Composite: ✅ Yes                                          │
│     References: ../shared                                       │
╰─────────────────────────────────────────────────────────────────╯

╭─────────────────────────────────────────────────────────────────╮
│  Reference Validation                                           │
├─────────────────────────────────────────────────────────────────┤
│  ✅ No circular dependencies detected                          │
│  ✅ All referenced projects have composite: true               │
│  ✅ Build order is valid: shared → api, web                    │
│  ⚠️  Warning: web and api both reference shared                │
│     Consider: Add api as reference in web if needed            │
╰─────────────────────────────────────────────────────────────────╯

╭─────────────────────────────────────────────────────────────────╮
│  Build Commands                                                 │
├─────────────────────────────────────────────────────────────────┤
│  Build all projects (in order):                                │
│  $ tsc --build                                                  │
│                                                                 │
│  Build specific project with dependencies:                     │
│  $ tsc --build packages/web                                     │
│                                                                 │
│  Clean all:                                                     │
│  $ tsc --build --clean                                          │
│                                                                 │
│  Watch mode:                                                    │
│  $ tsc --build --watch                                          │
╰─────────────────────────────────────────────────────────────────╯

✅ Monorepo configuration is valid
```

### Example 12: Performance Optimization Report

**Command:**
```bash
tsconfig-helper analyze --performance
```

**Output:**
```
⚡ TypeScript Performance Analysis

╭─────────────────────────────────────────────────────────────────╮
│  Current Performance Metrics                                    │
├─────────────────────────────────────────────────────────────────┤
│  Files Checked:        1,247 files                              │
│  Type Check Time:      18.3s (slow ⚠️)                          │
│  Memory Usage:         512MB                                    │
│  Cache Hit Rate:       12% (poor ⚠️)                            │
╰─────────────────────────────────────────────────────────────────╯

╭─────────────────────────────────────────────────────────────────╮
│  Performance Issues Detected                                    │
├─────────────────────────────────────────────────────────────────┤
│  🐌 Slow Options (estimated impact)                            │
│                                                                 │
│  1. skipLibCheck: false                                         │
│     Impact: -40% type-check speed                               │
│     Fix: Enable skipLibCheck (saves ~7s)                        │
│     Files affected: 347 .d.ts files in node_modules             │
│                                                                 │
│  2. incremental: false                                          │
│     Impact: No caching between builds                           │
│     Fix: Enable incremental (saves ~10s on rebuilds)            │
│                                                                 │
│  3. Large include scope                                         │
│     Issue: Checking tests, stories, and config files            │
│     Fix: Exclude test files from main build                     │
│     Files saved: ~280 unnecessary files                         │
│                                                                 │
│  4. No project references                                       │
│     Issue: Checking all 1,247 files every time                  │
│     Fix: Split into projects (shared, app, etc.)                │
│                                                                 │
│  5. Complex type unions                                         │
│     Found: 43 types with 10+ union members                      │
│     Tip: Consider using discriminated unions                    │
╰─────────────────────────────────────────────────────────────────╯

╭─────────────────────────────────────────────────────────────────╮
│  Recommended Configuration Changes                              │
├─────────────────────────────────────────────────────────────────┤
│  {                                                              │
│    "compilerOptions": {                                         │
│      "skipLibCheck": true,       // +40% faster                 │
│      "incremental": true,        // +60% on rebuilds            │
│      "tsBuildInfoFile": ".tsbuildinfo"                          │
│    },                                                           │
│    "include": ["src"],            // -280 files                 │
│    "exclude": [                                                 │
│      "**/*.test.ts",                                            │
│      "**/*.spec.ts",                                            │
│      "**/*.stories.tsx",                                        │
│      "node_modules"                                             │
│    ]                                                            │
│  }                                                              │
╰─────────────────────────────────────────────────────────────────╯

╭─────────────────────────────────────────────────────────────────╮
│  Expected Improvements                                          │
├─────────────────────────────────────────────────────────────────┤
│  Before:       18.3s                                            │
│  After:        ~6.2s (66% faster ⚡)                            │
│                                                                 │
│  Rebuild time: ~1.8s (with incremental cache)                  │
│  Memory:       ~340MB (33% reduction)                           │
│  Files:        967 files (280 fewer)                            │
╰─────────────────────────────────────────────────────────────────╯

💡 Apply these optimizations:
$ tsconfig-helper optimize --apply
```

### Example 13: Security & Best Practices Audit

**Command:**
```bash
tsconfig-helper audit --security --best-practices
```

**Output:**
```
🔒 TypeScript Security & Best Practices Audit

╭─────────────────────────────────────────────────────────────────╮
│  Security Score: 7/10 (Good)                                    │
├─────────────────────────────────────────────────────────────────┤
│  Type Safety:          ⭐⭐⭐⭐⭐ (5/5)                          │
│  Null Safety:          ⭐⭐⭐⭐⭐ (5/5)                          │
│  Module Safety:        ⭐⭐⭐☆☆ (3/5)                            │
│  Build Safety:         ⭐⭐⭐⭐☆ (4/5)                           │
╰─────────────────────────────────────────────────────────────────╯

╭─────────────────────────────────────────────────────────────────╮
│  Security Recommendations                                       │
├─────────────────────────────────────────────────────────────────┤
│  ⚠️  Medium Priority                                           │
│                                                                 │
│  1. Enable noUncheckedIndexedAccess                             │
│     Risk: Array access can return undefined                     │
│     Example:                                                    │
│       const arr = [1, 2, 3]                                     │
│       arr[100].toString()  // ⚠️  Runtime error!               │
│                                                                 │
│     Fix: Add "noUncheckedIndexedAccess": true                   │
│       const item = arr[100]                                     │
│       if (item !== undefined) {                                 │
│         item.toString()  // ✅ Safe                            │
│       }                                                         │
│                                                                 │
│  2. Enable noPropertyAccessFromIndexSignature                   │
│     Risk: Typos in property names go undetected                 │
│     Example:                                                    │
│       const obj: { [key: string]: string } = { name: "John" }   │
│       obj.naem  // ⚠️  Returns undefined, no error             │
│                                                                 │
│     Fix: Add "noPropertyAccessFromIndexSignature": true         │
│       obj["naem"]  // Must use bracket notation                │
│                                                                 │
│  3. Review @ts-ignore usage                                     │
│     Found: 23 instances of @ts-ignore                           │
│     Risk: Bypassing type safety                                 │
│     Action: Review each, use @ts-expect-error instead           │
╰─────────────────────────────────────────────────────────────────╯

╭─────────────────────────────────────────────────────────────────╮
│  Best Practices Violations                                      │
├─────────────────────────────────────────────────────────────────┤
│  ⚠️  allowJs: true + checkJs: false                            │
│     Problem: JavaScript files not type-checked                  │
│     Recommendation: Enable checkJs for better safety            │
│                                                                 │
│  ⚠️  Missing lib declarations                                  │
│     Current: Using default libs                                 │
│     Better: Explicitly declare needed libs                      │
│     Example: "lib": ["ES2020", "DOM"]                           │
│                                                                 │
│  ✅ strictNullChecks enabled                                   │
│  ✅ noImplicitAny enabled                                      │
│  ✅ esModuleInterop enabled                                    │
│  ✅ forceConsistentCasingInFileNames enabled                   │
╰─────────────────────────────────────────────────────────────────╯

╭─────────────────────────────────────────────────────────────────╮
│  Code Quality Insights                                          │
├─────────────────────────────────────────────────────────────────┤
│  📊 Type Coverage: 94.7% (good)                                │
│     567 explicit any types found                                │
│     Target: <100 any types                                      │
│                                                                 │
│  📊 Unused Exports: 142 detected                               │
│     Enable: "noUnusedLocals": true                              │
│                                                                 │
│  📊 Dead Code: 38 unreachable code blocks                      │
│     Enable: "allowUnreachableCode": false                       │
╰─────────────────────────────────────────────────────────────────╯

To improve security score to 9/10:
$ tsconfig-helper audit --fix --security-level high
```

### Example 14: Dependency Analysis

**Command:**
```bash
tsconfig-helper analyze --dependencies
```

**Output:**
```
📦 TypeScript Dependency Analysis

╭─────────────────────────────────────────────────────────────────╮
│  Type Dependencies                                              │
├─────────────────────────────────────────────────────────────────┤
│  @types packages: 34 installed                                  │
│  Total size:      127MB                                         │
╰─────────────────────────────────────────────────────────────────╯

╭─────────────────────────────────────────────────────────────────╮
│  Unused @types Packages                                         │
├─────────────────────────────────────────────────────────────────┤
│  ⚠️  These @types packages are installed but never used:       │
│                                                                 │
│  • @types/lodash          (23MB)                                │
│  • @types/jquery          (8MB)                                 │
│  • @types/moment          (2MB)                                 │
│  • @types/webpack         (12MB)                                │
│                                                                 │
│  Total waste: 45MB                                              │
│                                                                 │
│  Remove with:                                                   │
│  $ npm uninstall @types/lodash @types/jquery @types/moment \    │
│                  @types/webpack                                 │
╰─────────────────────────────────────────────────────────────────╯

╭─────────────────────────────────────────────────────────────────╮
│  Missing @types Packages                                        │
├─────────────────────────────────────────────────────────────────┤
│  ⚠️  These packages need type definitions:                     │
│                                                                 │
│  • react-query (using any)                                      │
│    Fix: npm install -D @types/react-query                       │
│                                                                 │
│  • custom-library (no types available)                          │
│    Fix: Create src/@types/custom-library/index.d.ts             │
╰─────────────────────────────────────────────────────────────────╯

╭─────────────────────────────────────────────────────────────────╮
│  Version Mismatches                                             │
├─────────────────────────────────────────────────────────────────┤
│  ⚠️  react@18.2.0 but @types/react@17.0.43                     │
│     Recommendation: npm install -D @types/react@18              │
│                                                                 │
│  ✅ @types/node matches Node.js version                        │
╰─────────────────────────────────────────────────────────────────╯
```

## Extended Troubleshooting Guide

### Issue 11: Module resolution fails after npm install

**Symptom:**
```
Cannot find module '@myorg/shared' or its corresponding type declarations.
```

**Diagnosis:**
```bash
tsconfig-helper validate --check-modules
```

**Possible causes:**
1. Package not in dependencies
2. Wrong moduleResolution strategy
3. Missing paths configuration
4. Workspace not linked (monorepos)

**Solutions:**

**For npm packages:**
```json
{
  "moduleResolution": "node16",  // or "bundler"
  "resolvePackageJsonExports": true
}
```

**For workspaces:**
```bash
# Ensure packages are linked
npm install

# Or for pnpm
pnpm install

# Verify with
tsconfig-helper validate --check-workspaces
```

**For path aliases:**
```json
{
  "baseUrl": ".",
  "paths": {
    "@myorg/*": ["packages/*/src"]
  }
}
```

### Issue 12: JSX syntax not recognized

**Symptom:**
```
Cannot use JSX unless the '--jsx' flag is provided.
```

**Diagnosis:**
```bash
tsconfig-helper explain jsx
```

**Solution depends on React version:**

**React 18+ (new transform):**
```json
{
  "jsx": "react-jsx",
  "jsxImportSource": "react"
}
```

**React 17 or older:**
```json
{
  "jsx": "react"
}
```

**Preact:**
```json
{
  "jsx": "react-jsx",
  "jsxImportSource": "preact"
}

```

**Solid.js:**
```json
{
  "jsx": "preserve",
  "jsxImportSource": "solid-js"
}
```

**Debugging:**
```bash
# Check what JSX transform your React supports
npm list react

# Validate JSX config
tsconfig-helper validate --check-jsx
```

### Issue 13: Decorators not working

**Symptom:**
```
Experimental support for decorators is a feature that is subject to change in a future release.
```

**Solution:**

**Legacy decorators (most common):**
```json
{
  "experimentalDecorators": true,
  "emitDecoratorMetadata": true  // For TypeORM, NestJS, etc.
}
```

**TC39 decorators (TypeScript 5.0+):**
```json
{
  "experimentalDecorators": false  // Use standard decorators
}
```

**Framework-specific:**

**NestJS:**
```json
{
  "experimentalDecorators": true,
  "emitDecoratorMetadata": true,
  "target": "ES2021"  // Required for NestJS
}
```

**TypeORM:**
```json
{
  "experimentalDecorators": true,
  "emitDecoratorMetadata": true,
  "strictPropertyInitialization": false  // For entity fields
}
```

### Issue 14: Slow IDE performance

**Symptom:**
- IntelliSense takes 5+ seconds
- File changes trigger long re-checks
- High CPU usage in tsserver

**Diagnosis:**
```bash
tsconfig-helper analyze --performance --ide
```

**Common fixes:**

**1. Exclude unnecessary directories:**
```json
{
  "exclude": [
    "node_modules",
    "dist",
    "build",
    ".next",
    ".git",
    "coverage",
    "**/*.spec.ts",  // Check separately
    "**/*.test.ts"
  ]
}
```

**2. Use skipLibCheck:**
```json
{
  "skipLibCheck": true  // Major IDE performance boost
}
```

**3. Limit type acquisition (VS Code):**
```json
// .vscode/settings.json
{
  "typescript.disableAutomaticTypeAcquisition": true,
  "typescript.tsserver.maxTsServerMemory": 4096
}
```

**4. Split large projects:**
```json
// Use project references
{
  "references": [
    { "path": "./packages/shared" },
    { "path": "./packages/app" }
  ]
}
```

**5. Disable unused features:**
```json
{
  "disableSizeLimit": false,
  "disableSourceOfProjectReferenceRedirect": false
}
```

### Issue 15: Build works but IDE shows errors

**Symptom:**
- `tsc` compiles successfully
- VS Code shows red squiggles
- Types seem incorrect

**Diagnosis:**
```bash
# Check effective config
tsconfig-helper validate --show-effective

# Compare with IDE config
tsconfig-helper compare tsconfig.json .vscode/tsconfig.json
```

**Common causes:**

**1. VS Code using wrong tsconfig:**
```bash
# Check which config VS Code uses
# Open Command Palette (Cmd+Shift+P)
# > TypeScript: Open TS Server Log

# Force VS Code to use workspace TypeScript
# .vscode/settings.json
{
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true
}
```

**2. Multiple tsconfig files:**
```bash
# List all tsconfigs
find . -name "tsconfig*.json"

# Validate each
tsconfig-helper validate --all
```

**3. Cached types:**
```bash
# Clear VS Code TypeScript cache
# Command Palette > TypeScript: Restart TS Server

# Or delete cache manually
rm -rf ~/.vscode/extensions/.typescript-cache
```

**4. Mismatched TypeScript versions:**
```bash
# Check versions
npx tsc --version        # CLI version
# vs VS Code version (bottom right of .ts file)

# Force same version
npm install -D typescript@5.3.3
```

### Issue 16: Tests fail with module errors

**Symptom:**
```
Jest encountered an unexpected token
Cannot use import statement outside a module
```

**Diagnosis:**
```bash
tsconfig-helper generate-test-config --framework jest
```

**Solution:**

**Create tsconfig.test.json:**
```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "module": "CommonJS",  // Jest needs CJS
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "jsx": "react"  // Not react-jsx for Jest
  },
  "include": [
    "src/**/*.test.ts",
    "src/**/*.spec.ts",
    "test/**/*"
  ]
}
```

**Update jest.config.js:**
```js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.test.json'  // Use test config
    }
  },
  // Match tsconfig paths
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  }
}
```

**Or use Vitest (better TS support):**
```bash
npm install -D vitest

# vite.config.ts handles TypeScript automatically
```

### Issue 17: Source maps not working

**Symptom:**
- Can't debug TypeScript source in Chrome DevTools
- Breakpoints don't hit
- Stack traces show .js files

**Solution:**

**For development:**
```json
{
  "sourceMap": true,
  "inlineSources": true,  // Embed source in map
  "declarationMap": true  // For library authors
}
```

**For production (smaller bundles):**
```json
{
  "sourceMap": false,  // Don't ship maps
  "inlineSourceMap": false
}
```

**Debugging in VS Code:**
```json
// .vscode/launch.json
{
  "type": "node",
  "request": "launch",
  "name": "Debug TypeScript",
  "program": "${workspaceFolder}/src/index.ts",
  "preLaunchTask": "tsc: build - tsconfig.json",
  "sourceMaps": true,
  "outFiles": ["${workspaceFolder}/dist/**/*.js"]
}
```

### Issue 18: Circular dependency warnings

**Symptom:**
```
Warning: Circular dependency detected:
  src/a.ts -> src/b.ts -> src/a.ts
```

**Diagnosis:**
```bash
tsconfig-helper analyze --circular-deps
```

**Output:**
```
🔄 Circular Dependency Analysis

Found 3 circular dependency chains:

1. services/auth.ts ↔ services/user.ts
   auth imports: getUserById
   user imports: checkAuth

2. components/Header.tsx ↔ components/Nav.tsx
   Header imports: Nav
   Nav imports: Header

3. utils/validation.ts ↔ utils/format.ts ↔ utils/validation.ts
   (3-file cycle)

Recommendations:
- Extract shared types to separate files
- Use dependency injection
- Create interface/implementation split
```

**Solutions:**

**1. Extract shared types:**
```typescript
// types/user.ts
export interface User { id: string }

// services/auth.ts
import { User } from '../types/user'

// services/user.ts
import { User } from '../types/user'
```

**2. Use dependency injection:**
```typescript
// Before (circular)
import { UserService } from './user'
export class AuthService {
  validateUser() {
    return UserService.getById()
  }
}

// After (injected)
export class AuthService {
  constructor(private userService: UserService) {}
  validateUser() {
    return this.userService.getById()
  }
}
```

**3. Lazy imports:**
```typescript
// Instead of top-level import
async function getUser() {
  const { UserService } = await import('./user')
  return UserService.getById()
}
```

### Issue 19: TypeScript version conflicts in monorepo

**Symptom:**
```
Different packages using different TypeScript versions
Inconsistent type checking results
```

**Diagnosis:**
```bash
tsconfig-helper check-versions --recursive
```

**Output:**
```
📦 TypeScript Version Audit

Packages using different versions:
  packages/api:    typescript@5.3.3
  packages/web:    typescript@5.2.2
  packages/shared: typescript@5.3.3

Root: typescript@5.3.3 (devDependencies)

⚠️  Version mismatch detected!
```

**Solution:**

**Option 1: Hoist to root (recommended):**
```json
// Root package.json
{
  "devDependencies": {
    "typescript": "5.3.3"
  }
}

// Remove from all child packages
```

**Option 2: Use exact versions:**
```json
// Each package.json
{
  "devDependencies": {
    "typescript": "5.3.3"  // No ^ or ~
  }
}
```

**For npm workspaces:**
```bash
npm install -D -w typescript@5.3.3
```

**For pnpm:**
```yaml
# pnpm-workspace.yaml
packages:
  - 'packages/*'

# .npmrc
shamefully-hoist=true  # Share dependencies
```

### Issue 20: Import errors after moving files

**Symptom:**
```
Cannot find module '../old/path/component'
```

**Solution:**

**Auto-fix imports:**
```bash
# VS Code can auto-update imports
# 1. Move file in VS Code sidebar (drag & drop)
# 2. Or use F2 to rename/move

# Or use tsconfig-helper
tsconfig-helper fix-imports --moved src/components/old → src/components/new
```

**Find broken imports:**
```bash
tsconfig-helper validate --check-imports

# Output:
# ❌ 23 broken imports found:
#   src/pages/Home.tsx:5 - cannot resolve './components/Header'
#   src/utils/api.ts:12 - cannot resolve '@/services/old-auth'
```

**Bulk update imports:**
```bash
# Using sed (macOS/Linux)
find src -name "*.ts" -exec sed -i '' 's|@/old/path|@/new/path|g' {} +

# Or with tsconfig-helper
tsconfig-helper refactor --rename-import "@/old/path" "@/new/path"
```

## FAQ

### General

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

### Configuration

**Q: Should I use "strict": true for new projects?**  
A: **Yes, always.** Strict mode catches bugs early and improves code quality. For existing projects, enable incrementally using `tsconfig-helper strictness --upgrade`.

**Q: What's the difference between "module": "ESNext" vs "CommonJS"?**  
A: 
- `ESNext`: Modern ES modules (import/export). Use with bundlers (Vite, Webpack).
- `CommonJS`: Node.js require/module.exports. Use for Node.js <16 or Jest.
- `Node16`/`NodeNext`: Hybrid - respects package.json "type" field.

**Q: When should I use "moduleResolution": "bundler"?**  
A: When using Vite, esbuild, or similar modern bundlers. It's optimized for build tools and enables features like importing .ts extensions.

**Q: Do I need skipLibCheck?**  
A: **Recommended for most projects.** Checking .d.ts files in node_modules is slow and rarely finds issues. Disable only if you're authoring type definitions.

**Q: What's the impact of noEmit: true?**  
A: TypeScript won't generate .js files - only type-check. Use when your bundler (Vite/Webpack) handles transpilation. For libraries, set to `false` and specify `outDir`.

**Q: How do I handle multiple tsconfig files?**  
A: Common pattern:
```
tsconfig.json          (base config, type-check all)
tsconfig.build.json    (extends base, only src/, emits)
tsconfig.test.json     (extends base, test files, CommonJS for Jest)
```

**Q: Should I commit tsconfig.tsbuildinfo?**  
A: **No.** Add to .gitignore. It's a local cache file for incremental builds.

### Troubleshooting

**Q: Why do I see "Cannot find module" in VS Code but tsc works?**  
A: VS Code might be using a different tsconfig or TypeScript version. Check:
1. Which tsconfig VS Code uses (bottom right of .ts file)
2. TypeScript version (should match package.json)
3. Try restarting TS server: Cmd+Shift+P → "TypeScript: Restart TS Server"

**Q: My path aliases work in tsc but not Jest/Vite**  
A: TypeScript's `paths` are for type-checking only. You must configure each tool separately:
- Jest: `moduleNameMapper` in jest.config.js
- Vite: `resolve.alias` in vite.config.ts
- Webpack: `resolve.alias` in webpack.config.js

Use `tsconfig-helper validate --check-paths` to generate matching configs.

**Q: How do I fix "Module '"x"' has no exported member 'Y'"?**  
A: Common causes:
1. Typo in import name
2. Missing @types package: `npm install -D @types/x`
3. Incorrect module resolution: try changing `moduleResolution`
4. The package doesn't export that member (check docs)

**Q: What does "Could not find declaration file for module" mean?**  
A: The package has no TypeScript types. Solutions:
1. Install @types: `npm install -D @types/package-name`
2. If no @types exist, create `src/@types/package-name.d.ts`:
   ```typescript
   declare module 'package-name' {
     const content: any
     export default content
   }
   ```
3. For better types, contribute to DefinitelyTyped

### Performance

**Q: Type-checking is slow (>10s). How to optimize?**  
A: Run `tsconfig-helper analyze --performance`. Common fixes:
1. Enable `skipLibCheck: true`
2. Enable `incremental: true`
3. Narrow `include` scope (exclude tests, stories, configs)
4. Use project references for large codebases
5. Disable unused strict checks in development

**Q: Should I use project references?**  
A: **Yes** for monorepos or projects >50k lines. Benefits:
- Parallel type-checking
- Faster rebuilds (only changed projects)
- Better separation of concerns
- Required for `--build` mode

**Q: Does tsconfig affect runtime performance?**  
A: No - tsconfig is for compile time only. However:
- `target` affects output size (ES2020 is smaller than ES5)
- `importHelpers` reduces bundle size (needs tslib)
- Your bundler determines runtime performance

### Monorepos

**Q: How do I structure tsconfig in a monorepo?**  
A: Recommended structure:
```
tsconfig.base.json       (shared options)
packages/
  shared/
    tsconfig.json        (extends base, composite: true)
  api/
    tsconfig.json        (extends base, references shared)
  web/
    tsconfig.json        (extends base, references shared)
```

Use `tsconfig-helper generate --preset monorepo-root` to scaffold.

**Q: What's the difference between "extends" and "references"?**  
A:
- `extends`: Inherit compiler options from another config
- `references`: Declare dependencies between projects (for `--build` mode)

You often use both:
```json
{
  "extends": "../../tsconfig.base.json",
  "references": [{ "path": "../shared" }]
}
```

### Migration

**Q: How do I migrate from JavaScript to TypeScript?**  
A: Incremental approach:
```json
{
  "allowJs": true,          // Allow .js files
  "checkJs": false,         // Don't check .js yet
  "noImplicitAny": false,   // Relaxed for migration
  "strict": false           // Enable later
}
```

Then:
1. Rename .js → .ts one file at a time
2. Fix type errors
3. Once all .ts, gradually enable strict options
4. Use `tsconfig-helper strictness --upgrade --level medium`

**Q: How do I upgrade to TypeScript 5.x from 4.x?**  
A: Run `tsconfig-helper migrate --target 5.3`. It will:
- Replace deprecated options (`importsNotUsedAsValues` → `verbatimModuleSyntax`)
- Suggest new features (`moduleResolution: "bundler"`)
- Warn about breaking changes
- Generate a migration report

**Q: Can I use TypeScript 5 features with target: "ES5"?**  
A: **Yes** - TypeScript syntax (types, interfaces) is erased at compile time. Only runtime features depend on `target`. However, `target: "ES5"` generates larger, slower code. Use ES2020+ if possible.

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
