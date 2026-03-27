# Changelog

## 0.0.1 (2026-03-27)

### 🎉 Initial Release

- Check if ports are in use with process details (command, PID, user)
- Multi-port support (comma-separated)
- `--kill` flag to terminate processes on specified ports
- `--watch` mode for continuous monitoring
- `--json` output for scripting and CI/CD integration
- Zero dependencies — uses Node.js built-ins and `lsof`
