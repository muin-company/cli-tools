import { ReadmeContext } from '../types.js';

export function generateCliTemplate(ctx: ReadmeContext): string {
  const { metadata, authorName, repoUrl, npmPackageName } = ctx;
  const binName = metadata.bin ? Object.keys(metadata.bin)[0] : metadata.name;

  return `# ${metadata.name}

${metadata.description || 'A CLI tool'}

${generateBadges(ctx)}

## Installation

\`\`\`bash
npm install -g ${npmPackageName || metadata.name}
\`\`\`

Or use with npx:

\`\`\`bash
npx ${npmPackageName || metadata.name}
\`\`\`

## Usage

\`\`\`bash
${binName} [options]
\`\`\`

### Options

<!-- Add your CLI options here -->

\`\`\`
-h, --help     Show help
-v, --version  Show version
\`\`\`

## Examples

\`\`\`bash
# Example 1
${binName} --help

# Example 2
# Add your examples here
\`\`\`

## Features

- 🚀 Fast and efficient
- 📦 Easy to install
- 🎯 Simple to use
${metadata.keywords ? metadata.keywords.map(k => `- ✨ ${k}`).join('\n') : ''}

## Requirements

${metadata.engines?.node ? `- Node.js ${metadata.engines.node}` : '- Node.js >= 16.0.0'}

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
  const { metadata, npmPackageName, repoUrl } = ctx;
  const badges: string[] = [];

  if (npmPackageName) {
    badges.push(`![npm version](https://img.shields.io/npm/v/${npmPackageName}.svg)`);
    badges.push(`![npm downloads](https://img.shields.io/npm/dm/${npmPackageName}.svg)`);
  }

  if (metadata.license) {
    badges.push(`![license](https://img.shields.io/badge/license-${metadata.license}-blue.svg)`);
  }

  if (metadata.engines?.node) {
    const nodeVersion = metadata.engines.node.replace(/[^0-9.]/g, '');
    badges.push(`![node version](https://img.shields.io/badge/node-${encodeURIComponent(metadata.engines.node)}-green.svg)`);
  }

  return badges.length > 0 ? badges.join(' ') + '\n' : '';
}
