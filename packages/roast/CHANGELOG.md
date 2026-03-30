# Changelog

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
