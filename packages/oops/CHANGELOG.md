# Changelog

## [1.1.0] - 2026-03-31

### Added
- **JSON Output Mode** — CI/CD-ready structured output with `--json` flag
  - Automatic error context extraction (file, line, error type)
  - Structured fields: `error`, `explanation`, `solution`, `rootCause`, `context`
  - Graceful degradation when parsing fails
  - Compatible with GitHub Actions, Jenkins, GitLab CI
- Improved error parsing for common error types (ENOENT, TypeError, etc.)
- Stack trace parsing to extract file paths and line numbers
- Timestamped output for logging and tracking

### Changed
- JSON output now includes full structured metadata (roast v1.2.0 strategy)
- Enhanced system prompt for JSON mode to ensure structured responses

### Fixed
- JSON mode now handles API errors gracefully with structured error output

## [0.0.1] - 2026-03-27

### Added
- Initial release
- AI-powered error message explanation via OpenAI API
- `--file` flag to read errors from log files
- `--stack` flag for full stack trace analysis
- `--json` flag for machine-readable output
- `--lang` flag for multi-language explanations
- `--model` flag to select AI model
- `--verbose` flag for detailed analysis
