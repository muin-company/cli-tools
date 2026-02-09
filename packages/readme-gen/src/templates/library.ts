import { ReadmeContext } from '../types.js';

export function generateLibraryTemplate(ctx: ReadmeContext): string {
  const { metadata, authorName, repoUrl, npmPackageName } = ctx;

  return `# ${metadata.name}

${metadata.description || 'A JavaScript/TypeScript library'}

${generateBadges(ctx)}

## Installation

\`\`\`bash
npm install ${npmPackageName || metadata.name}
\`\`\`

Or with yarn:

\`\`\`bash
yarn add ${npmPackageName || metadata.name}
\`\`\`

## Usage

\`\`\`javascript
// CommonJS
const ${getCamelCaseName(metadata.name)} = require('${npmPackageName || metadata.name}');

// ES Modules
import ${getCamelCaseName(metadata.name)} from '${npmPackageName || metadata.name}';

// Example usage
// Add your usage examples here
\`\`\`

## API

### Main Functions

<!-- Document your main functions here -->

#### \`functionName(param1, param2)\`

Description of the function.

**Parameters:**
- \`param1\` (Type): Description
- \`param2\` (Type): Description

**Returns:** Description of return value

**Example:**
\`\`\`javascript
// Add example
\`\`\`

## Features

- 🚀 Fast and lightweight
- 📦 Zero dependencies
- 🎯 TypeScript support
- ✨ Easy to use
${metadata.keywords ? metadata.keywords.map(k => `- 📝 ${k}`).join('\n') : ''}

## Requirements

${metadata.engines?.node ? `- Node.js ${metadata.engines.node}` : '- Node.js >= 16.0.0'}

## Examples

### Basic Example

\`\`\`javascript
// Add a basic example here
\`\`\`

### Advanced Example

\`\`\`javascript
// Add an advanced example here
\`\`\`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

${repoUrl ? `1. Fork the repository (${repoUrl})` : '1. Fork the repository'}
2. Create your feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add some amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

## License

${metadata.license || 'MIT'} © ${authorName}

## Support

${metadata.bugs ? `- 🐛 Issues: ${typeof metadata.bugs === 'string' ? metadata.bugs : metadata.bugs.url}` : ''}
${repoUrl ? `- 📖 Repository: ${repoUrl}` : ''}
${metadata.homepage ? `- 🏠 Homepage: ${metadata.homepage}` : ''}
`;
}

function generateBadges(ctx: ReadmeContext): string {
  const { metadata, npmPackageName } = ctx;
  const badges: string[] = [];

  if (npmPackageName) {
    badges.push(`![npm version](https://img.shields.io/npm/v/${npmPackageName}.svg)`);
    badges.push(`![npm downloads](https://img.shields.io/npm/dm/${npmPackageName}.svg)`);
  }

  if (metadata.license) {
    badges.push(`![license](https://img.shields.io/badge/license-${metadata.license}-blue.svg)`);
  }

  if (metadata.engines?.node) {
    badges.push(`![node version](https://img.shields.io/badge/node-${encodeURIComponent(metadata.engines.node)}-green.svg)`);
  }

  return badges.length > 0 ? badges.join(' ') + '\n' : '';
}

function getCamelCaseName(name: string): string {
  // Convert package name to camelCase for import example
  return name
    .replace(/^@[\w-]+\//, '') // Remove scope
    .replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
    .replace(/^./, str => str.toLowerCase());
}
