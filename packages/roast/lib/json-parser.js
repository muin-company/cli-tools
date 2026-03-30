/**
 * JSON Output Parser for roast-cli
 * Converts AI review text to structured JSON format
 */

import { basename, extname } from 'path';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const LANGUAGE_MAP = {
  '.js': 'JavaScript',
  '.ts': 'TypeScript',
  '.jsx': 'React/JSX',
  '.tsx': 'React/TSX',
  '.py': 'Python',
  '.go': 'Go',
  '.rs': 'Rust',
  '.java': 'Java',
  '.c': 'C',
  '.cpp': 'C++',
  '.rb': 'Ruby',
  '.php': 'PHP',
  '.swift': 'Swift',
  '.kt': 'Kotlin',
  '.sh': 'Shell',
  '.sql': 'SQL',
  '.html': 'HTML',
  '.css': 'CSS',
};

/**
 * Parse AI review text to structured JSON
 * @param {string} reviewText - Raw AI review text with emoji
 * @param {Object} metadata - File/run metadata
 * @returns {Object} Structured JSON result
 */
export function parseReviewToJSON(reviewText, metadata = {}) {
  const {
    filePath,
    fileName,
    language,
    mode,
    severity,
    model,
    code
  } = metadata;

  const issues = parseIssues(reviewText, code);
  const summary = generateSummary(issues);

  return {
    version: getPackageVersion(),
    timestamp: new Date().toISOString(),
    file_path: filePath || fileName || 'stdin',
    file_name: fileName || 'stdin',
    language: language || 'Unknown',
    mode: mode || 'roast',
    severity: severity || null,
    model: model || 'claude-sonnet-4-5-20250929',
    summary,
    issues,
    raw_review: reviewText
  };
}

/**
 * Parse issues from review text
 * Detects emoji markers and extracts structured issues
 */
function parseIssues(text, code = '') {
  const issues = [];
  const lines = text.split('\n');
  
  let currentIssue = null;
  let issueCounter = 1;
  let inCodeBlock = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    
    // Handle code blocks
    if (trimmed.startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      if (inCodeBlock && currentIssue) {
        // Starting code block
        continue;
      }
      if (!inCodeBlock && currentIssue) {
        // Ending code block
        continue;
      }
    }

    if (inCodeBlock && currentIssue) {
      // Accumulate code snippet
      if (trimmed && !trimmed.startsWith('```')) {
        if (!currentIssue.code_snippet) {
          currentIssue.code_snippet = trimmed;
        } else {
          currentIssue.code_snippet += '\n' + trimmed;
        }
      }
      continue;
    }

    if (!trimmed) {
      // Empty line - might close current issue
      // But only if we're not about to see a code block or continuation
      continue;
    }

    // Skip headers like "🔥 CODE ROAST 🔥"
    if (trimmed.match(/^🔥+\s*CODE\s*(ROAST|REVIEW|EXECUTION)/i)) {
      continue;
    }

    // Detect issue type by emoji
    const issueType = detectIssueType(trimmed);
    
    // Check if this is a suggestion line (💡) following a main issue
    const isSuggestionLine = trimmed.startsWith('💡') && currentIssue && currentIssue.type !== 'suggestion';
    
    if (issueType && !isSuggestionLine) {
      // Save previous issue if exists
      if (currentIssue) {
        currentIssue.description = currentIssue.description.trim();
        issues.push(currentIssue);
      }

      // Create new issue
      currentIssue = {
        id: `issue-${issueCounter++}`,
        type: issueType.type,
        severity: issueType.severity,
        category: issueType.category,
        title: extractTitle(trimmed),
        description: '',
        code_snippet: null,
        line_number: null,
        line_range: null,
        suggestion: null
      };

      // Try to extract line number from title
      const lineInfo = extractLineNumber(trimmed);
      if (lineInfo) {
        currentIssue.line_number = lineInfo.line;
        currentIssue.line_range = lineInfo.range;
      }

      // Start description (without emoji and title line)
      const descStart = trimmed.replace(/^[🔥🚨⚠️💡✨✅💀💪]+\s*/, '').replace(/^\*\*[^*]+\*\*\s*/, '');
      if (descStart && descStart !== currentIssue.title) {
        currentIssue.description = descStart + ' ';
      }
    } else if (currentIssue) {
      // Accumulate description for current issue
      
      // Check for suggestion markers - attach to current issue, don't create new one
      if (isSuggestionLine) {
        if (!currentIssue.suggestion) {
          currentIssue.suggestion = trimmed.replace(/💡/g, '').trim();
        }
      } else {
        currentIssue.description += trimmed + ' ';
      }
    }
  }

  // Don't forget the last issue
  if (currentIssue) {
    currentIssue.description = currentIssue.description.trim();
    issues.push(currentIssue);
  }

  return issues;
}

/**
 * Detect issue type from emoji/keywords
 */
function detectIssueType(line) {
  // Critical bugs/security
  if (line.match(/🚨|critical/i)) {
    return {
      type: 'critical',
      severity: 'high',
      category: determineCriticalCategory(line)
    };
  }

  // Warnings (performance, code smell)
  if (line.match(/⚠️|warning/i)) {
    return {
      type: 'warning',
      severity: 'medium',
      category: determineWarningCategory(line)
    };
  }

  // Roast (harsh mode specific - triple fire or deadly)
  if (line.match(/🔥🔥🔥|💀/)) {
    return {
      type: 'deadly',
      severity: 'high',
      category: 'code_quality'
    };
  }

  // Regular roast
  if (line.match(/🔥/)) {
    return {
      type: 'roast',
      severity: 'medium',
      category: 'code_quality'
    };
  }

  // Suggestions
  if (line.match(/💡/)) {
    return {
      type: 'suggestion',
      severity: 'low',
      category: 'best_practice'
    };
  }

  // Compliments
  if (line.match(/✨|✅|💪/)) {
    return {
      type: 'compliment',
      severity: 'info',
      category: 'positive'
    };
  }

  return null;
}

/**
 * Determine critical issue category
 */
function determineCriticalCategory(line) {
  if (line.match(/security|vulnerability|exploit|injection|xss|csrf/i)) {
    return 'security';
  }
  if (line.match(/bug|error|crash|fail|exception/i)) {
    return 'bug';
  }
  if (line.match(/performance|slow|memory|leak/i)) {
    return 'performance';
  }
  return 'bug';
}

/**
 * Determine warning category
 */
function determineWarningCategory(line) {
  if (line.match(/performance|slow|inefficient/i)) {
    return 'performance';
  }
  if (line.match(/maintainability|complexity|nested/i)) {
    return 'maintainability';
  }
  if (line.match(/style|formatting|convention/i)) {
    return 'style';
  }
  return 'code_quality';
}

/**
 * Extract title from issue line (remove emoji and markdown)
 */
function extractTitle(line) {
  let title = line
    .replace(/[🔥🚨⚠️💡✨✅💀💪]/g, '')
    .replace(/\*\*/g, '')
    .replace(/^#+\s*/, '')
    .trim();

  // If title contains a colon, take the part before it
  const colonIndex = title.indexOf(':');
  if (colonIndex > 0 && colonIndex < 80) {
    title = title.substring(0, colonIndex);
  }

  return title.split('\n')[0].substring(0, 100); // Limit length
}

/**
 * Extract line number from text
 * Supports: "Line 42", "line 15-20", "lines 10-15", "L42", "on line 42"
 */
function extractLineNumber(text) {
  // Pattern: line(s) 42 or line(s) 42-50
  const match = text.match(/\blines?\s+(\d+)(?:\s*-\s*(\d+))?/i) || 
                text.match(/\bon\s+line\s+(\d+)/i) ||
                text.match(/\bL(\d+)(?:-L?(\d+))?/i);
  
  if (match) {
    const start = parseInt(match[1]);
    const end = match[2] ? parseInt(match[2]) : null;
    
    return {
      line: start,
      range: end ? { start, end } : null
    };
  }
  
  return null;
}

/**
 * Generate summary statistics
 */
function generateSummary(issues) {
  const summary = {
    total_issues: issues.length,
    critical_count: 0,
    warning_count: 0,
    suggestion_count: 0,
    compliment_count: 0,
    roast_count: 0,
    has_security_issues: false,
    has_performance_issues: false,
    has_bugs: false
  };

  for (const issue of issues) {
    switch (issue.type) {
      case 'critical':
        summary.critical_count++;
        if (issue.category === 'security') summary.has_security_issues = true;
        if (issue.category === 'bug') summary.has_bugs = true;
        break;
      case 'warning':
        summary.warning_count++;
        if (issue.category === 'performance') summary.has_performance_issues = true;
        break;
      case 'suggestion':
        summary.suggestion_count++;
        break;
      case 'compliment':
        summary.compliment_count++;
        break;
      case 'roast':
      case 'deadly':
        summary.roast_count++;
        break;
    }
  }

  return summary;
}

/**
 * Get package version
 */
function getPackageVersion() {
  try {
    const pkg = JSON.parse(readFileSync(join(__dirname, '../package.json'), 'utf-8'));
    return pkg.version;
  } catch {
    return '1.1.0';
  }
}

/**
 * Detect language from file extension
 */
export function detectLanguage(filepath) {
  const ext = extname(filepath).toLowerCase();
  return LANGUAGE_MAP[ext] || 'Unknown';
}
