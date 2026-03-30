# Changelog

## [1.2.0] - 2026-03-30 (TBD)

### Added
- **JSON output mode** via `--json` flag for CI/CD integration
  - Structured issue parsing with emoji-based detection (🚨 🔥 ⚠️ 💡 ✨)
  - Line number extraction from review text
  - Machine-readable summary statistics (critical_count, warning_count, etc.)
  - Categorized issues (security, bug, performance, code_quality, etc.)
  - Code snippet extraction from review text
  - Full schema: version, timestamp, file metadata, issues array, raw review
- `parseReviewToJSON()` utility for converting AI reviews to structured data
- Support for both Anthropic Claude and OpenAI models
- Comprehensive JSON parser test suite

### Changed
- Updated `lib/roast.js` to support `--json` flag
- Added `lib/json-parser.js` with intelligent review parsing
- Enhanced README with JSON output examples and GitHub Actions integration guide
- CLI now suppresses spinner in JSON mode for clean output

### Technical Details
- Smart emoji detection for issue classification (critical/warning/roast/suggestion/compliment)
- Line number regex patterns: "Line 42", "Lines 10-15", "line 5"
- Code block extraction from markdown-style triple backticks
- Suggestion attachment to parent issues (💡 lines don't create separate issues)
- Header filtering (skips "🔥 CODE ROAST 🔥" banner lines)
- No breaking changes - text output remains default

## [1.1.0] - 2026-03-30

### Added
- **Multilingual output support** via `--output-lang` flag
  - Supported languages: English (en), Korean (ko), Japanese (ja), Spanish (es), French (fr), German (de)
  - Default: English (maintains backward compatibility)
  - AI maintains personality in all languages (Gordon Ramsay roasts in any tongue)
- Output language validation with helpful error messages
- Environment variable support for default language (future enhancement ready)

### Changed
- Updated CLI help text to include multilingual examples
- Enhanced README with multilingual usage section
- Bumped version to 1.1.0 (minor feature release)

### Technical Details
- Modified `buildPrompt()` to append language instruction to system prompt
- Added `LANG_NAMES` mapping for supported languages
- Updated both `roastFile()` and `roastStdin()` to pass `outputLang` option
- No breaking changes - fully backward compatible

## [1.0.3] - Previous release
