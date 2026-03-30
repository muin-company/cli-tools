/**
 * JSON Output Parser for roast-cli
 * Converts AI review text to structured JSON format
 */

import { basename, extname } from 'node:path';
import { readFileSync } from 'node:fs';

const LANGUAGE_MAP = {
  '.js': 'JavaScript', '.jsx': 'JavaScript (React)',
  '.ts': 'TypeScript', '.tsx': 'TypeScript (React)',
  '.py': 'Python', '.go': 'Go', '.rs': 'Rust',
  '.rb': 'Ruby', '.java': 'Java', '.cpp': 'C++',
  '.c': 'C', '.cs': 'C#', '.php': 'PHP',
  '.swift': 'Swift', '.kt': 'Kotlin',
  '.sh': 'Shell', '.bash': 'Bash',
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
    model: model || 'gpt-4o-mini',
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

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) {
      // Empty line - close current issue if exists
      if (currentIssue) {
        currentIssue.description = currentIssue.description.trim();
        issues.push(currentIssue);
        currentIssue = null;
      }
      continue;
    }

    // Detect issue type by emoji
    const issueType = detectIssueType(line);
    
    if (issueType) {
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
        title: extractTitle(line),
        description: '',
        code_snippet: null,
        line_number: null,
        line_range: null,
        suggestion: null
      };

      // Try to extract line number from title
      const lineInfo = extractLineNumber(line);
      if (lineInfo) {
        currentIssue.line_number = lineInfo.line;
        currentIssue.line_range = lineInfo.range;
      }
    } else if (currentIssue) {
      // Accumulate description for current issue
      
      // Check if this is a code snippet (starts with backticks or indentation)
      if (line.startsWith('```') || line.startsWith('    ') || line.startsWith('\t')) {
        // Extract code snippet
        let snippet = line.replace(/^```[a-z]*/, '').replace(/```$/, '').trim();
        if (snippet && !currentIssue.code_snippet) {
          currentIssue.code_snippet = snippet;
        }
      } else {
        // Regular description text
        currentIssue.description += line + ' ';
      }

      // Check for suggestion markers
      if (line.match(/💡|suggestion|fix|instead|should|try|consider/i)) {
        currentIssue.suggestion = line.replace(/💡/g, '').trim();
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
  if (line.match(/🚨|critical|security|vulnerability|exploit|injection/i)) {
    return {
      type: 'critical',
      severity: 'high',
      category: determineCriticalCategory(line)
    };
  }

  // Warnings (performance, code smell)
  if (line.match(/⚠️|warning|performance|slow|inefficient|smell/i)) {
    return {
      type: 'warning',
      severity: 'medium',
      category: 'performance'
    };
  }

  // Roast (harsh mode specific)
  if (line.match(/🔥🔥🔥|💀|raw|disgusting|disaster|nightmare/i)) {
    return {
      type: 'roast',
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
  if (line.match(/💡|suggestion|improve|refactor|consider/i)) {
    return {
      type: 'suggestion',
      severity: 'low',
      category: 'best_practice'
    };
  }

  // Compliments
  if (line.match(/✨|✅|good|nice|well done|clean|excellent/i)) {
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
 * Extract title from issue line (remove emoji and markdown)
 */
function extractTitle(line) {
  return line
    .replace(/[🔥🚨⚠️💡✨✅💀💪]/g, '')
    .replace(/\*\*/g, '')
    .replace(/^#+\s*/, '')
    .trim()
    .split('\n')[0]
    .substring(0, 100); // Limit length
}

/**
 * Extract line number from text
 * Supports: "Line 42", "line 15-20", "lines 10-15", "L42"
 */
function extractLineNumber(text) {
  // Pattern: line(s) 42 or line(s) 42-50
  const match = text.match(/\blines?\s+(\d+)(?:-(\d+))?/i) || 
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
    const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf-8'));
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
