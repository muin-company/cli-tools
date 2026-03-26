# Setup Guide

## Quick Start

1. **Install dependencies**
   ```bash
   cd ~/muin/projects/roast
   npm install
   ```

2. **Set up API key**
   ```bash
   export ANTHROPIC_API_KEY="your-key-here"
   ```
   
   Get your key at: https://console.anthropic.com/settings/keys

3. **Test it out**
   ```bash
   # Try the bubble sort example
   node bin/roast.js examples/bubble-sort.js
   
   # Try serious mode
   node bin/roast.js --serious examples/sql-injection.py
   
   # Try the bad React code
   node bin/roast.js examples/bad-react.jsx
   ```

4. **Install globally (optional)**
   ```bash
   npm link
   # Now you can use `roast` anywhere
   roast examples/bubble-sort.js
   ```

## Development

### Project Structure
```
roast/
├── bin/roast.js          # CLI entry point
├── lib/roast.js          # Core logic
├── examples/             # Test files
│   ├── bubble-sort.js
│   ├── bad-react.jsx
│   └── sql-injection.py
├── docs/
│   └── style-guide.md    # Output guidelines
├── package.json
└── README.md
```

### Testing

Run the CLI on different files:
```bash
node bin/roast.js examples/bubble-sort.js
node bin/roast.js examples/bad-react.jsx --serious
node bin/roast.js examples/sql-injection.py
```

### Making Changes

1. Edit `lib/roast.js` for core logic
2. Edit `bin/roast.js` for CLI options
3. Update prompts in `ROAST_PROMPT` or `SERIOUS_PROMPT`
4. Test with examples before committing

## Publishing to npm

1. **Create npm account** (if needed)
   ```bash
   npm login
   ```

2. **Update version**
   ```bash
   npm version patch  # 0.1.0 → 0.1.1
   npm version minor  # 0.1.0 → 0.2.0
   npm version major  # 0.1.0 → 1.0.0
   ```

3. **Publish**
   ```bash
   npm publish --access public
   ```

4. **Test installation**
   ```bash
   npm install -g @muin/roast
   roast --version
   ```

## Tips

- Keep prompts under 500 tokens for speed
- Test with various languages
- Screenshots for README examples
- Update style guide as you refine the tone

## Next Steps

- [ ] Git repo initialization
- [ ] Push to GitHub
- [ ] Create demo GIF/video
- [ ] Tweet about it
- [ ] Publish to npm
