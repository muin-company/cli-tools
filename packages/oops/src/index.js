import OpenAI from 'openai';
import chalk from 'chalk';
import ora from 'ora';

const SYSTEM_PROMPT = `You are an expert developer assistant. When given an error message or stack trace, provide:
1. **What happened** — a plain-language explanation
2. **Why it happened** — common causes
3. **How to fix it** — actionable steps

Be concise and practical. Format with markdown.`;

const JSON_SYSTEM_PROMPT = `You are an expert developer assistant. When given an error message or stack trace, analyze it and provide:
1. **Explanation** — what went wrong in plain language
2. **Root cause** — why this error occurred
3. **Solution** — step-by-step fix instructions

Extract structured information:
- Error type (e.g., "ENOENT", "TypeError", "ReferenceError")
- File path (if present in stack trace)
- Line number (if present)
- Affected code snippet (if visible)

Be precise and actionable.`;

/**
 * Parse error message to extract structured context
 */
function parseErrorContext(errorMessage) {
  const context = {
    file: null,
    line: null,
    column: null,
    errorType: null,
    codeSnippet: null
  };

  // Extract error type (ENOENT, TypeError, etc.)
  const typeMatch = errorMessage.match(/^([A-Z][a-zA-Z]*(?:Error)?)[:\s]/);
  if (typeMatch) {
    context.errorType = typeMatch[1];
  }

  // Extract file path and line number from stack trace
  // Pattern 1: at file.js:42:10, (file.js:42:10), file.js:42:10
  let stackMatch = errorMessage.match(/(?:at\s+)?(?:\()?([^()\s:]+\.(?:js|ts|jsx|tsx|py|go|rs|java|c|cpp)):(\d+)(?::(\d+))?/);
  
  // Pattern 2: Require stack: - /path/to/file.js (no line number)
  if (!stackMatch) {
    stackMatch = errorMessage.match(/^-\s+([^:\s]+\.(?:js|ts|jsx|tsx|py|go|rs|java|c|cpp))$/m);
    if (stackMatch) {
      context.file = stackMatch[1];
    }
  } else {
    context.file = stackMatch[1];
    context.line = parseInt(stackMatch[2]);
    if (stackMatch[3]) {
      context.column = parseInt(stackMatch[3]);
    }
  }

  // Try to extract code snippet (lines starting with | or > or indented)
  const snippetMatch = errorMessage.match(/(?:^|\n)((?:[>\|]\s*.*\n?)+)/m);
  if (snippetMatch) {
    context.codeSnippet = snippetMatch[1].trim();
  }

  return context;
}

/**
 * Parse AI response for JSON output
 * Extracts explanation, solution, and root cause from markdown text
 */
function parseExplanationToJSON(explanation, errorMessage, context) {
  const result = {
    error: errorMessage,
    errorType: context.errorType || 'Unknown',
    explanation: '',
    solution: '',
    rootCause: '',
    context: {
      file: context.file,
      line: context.line || 0,
      column: context.column,
      codeSnippet: context.codeSnippet
    },
    timestamp: new Date().toISOString()
  };

  // Split by markdown headers
  const sections = {
    explanation: /(?:What happened|Explanation)[:\s]*/i,
    rootCause: /(?:Why it happened|Root cause|Cause)[:\s]*/i,
    solution: /(?:How to fix|Solution|Fix)[:\s]*/i
  };

  const lines = explanation.split('\n');
  let currentSection = 'explanation';
  let buffer = [];

  for (const line of lines) {
    const trimmed = line.trim();
    
    // Check for section headers
    if (trimmed.match(sections.explanation)) {
      if (buffer.length > 0) result[currentSection] = buffer.join('\n').trim();
      currentSection = 'explanation';
      buffer = [];
      continue;
    } else if (trimmed.match(sections.rootCause)) {
      if (buffer.length > 0) result[currentSection] = buffer.join('\n').trim();
      currentSection = 'rootCause';
      buffer = [];
      continue;
    } else if (trimmed.match(sections.solution)) {
      if (buffer.length > 0) result[currentSection] = buffer.join('\n').trim();
      currentSection = 'solution';
      buffer = [];
      continue;
    }

    // Skip markdown headers and empty lines at start
    if (trimmed && !trimmed.startsWith('#')) {
      buffer.push(line);
    } else if (buffer.length > 0) {
      buffer.push(line); // Preserve empty lines within sections
    }
  }

  // Don't forget the last section
  if (buffer.length > 0) {
    result[currentSection] = buffer.join('\n').trim();
  }

  // Fallback: if parsing failed, put everything in explanation
  if (!result.explanation && !result.solution && !result.rootCause) {
    result.explanation = explanation.trim();
    result.solution = 'See explanation above for fix suggestions.';
    result.rootCause = 'Unable to parse root cause from AI response.';
  }

  return result;
}

export async function explainError(errorMessage, flags = {}) {
  const { json: jsonOutput, lang = 'en', model = 'gpt-4o-mini', verbose } = flags;

  const openai = new OpenAI();
  const spinner = jsonOutput ? null : ora('Analyzing error...').start();

  const langInstruction = lang !== 'en' ? `\nRespond in language: ${lang}` : '';
  const verboseInstruction = verbose ? '\nProvide a detailed, in-depth analysis.' : '';

  // Use different system prompt for JSON mode
  const systemPrompt = jsonOutput ? JSON_SYSTEM_PROMPT : SYSTEM_PROMPT;

  try {
    const response = await openai.chat.completions.create({
      model: process.env.OOPS_MODEL || model,
      messages: [
        { role: 'system', content: systemPrompt + langInstruction + verboseInstruction },
        { role: 'user', content: errorMessage },
      ],
      temperature: 0.3,
    });

    const explanation = response.choices[0]?.message?.content || 'No explanation available.';

    if (spinner) spinner.stop();

    if (jsonOutput) {
      // Extract context from error message
      const context = parseErrorContext(errorMessage);
      
      // Parse explanation into structured JSON
      const result = parseExplanationToJSON(explanation, errorMessage, context);
      
      // Add metadata
      result.model = process.env.OOPS_MODEL || model;
      result.version = '1.1.0'; // Updated version
      
      console.log(JSON.stringify(result, null, 2));
    } else {
      console.log(`\n${chalk.red.bold('Error:')} ${errorMessage}\n`);
      console.log(explanation);
      console.log();
    }
  } catch (err) {
    if (spinner) spinner.fail('Failed to analyze error');
    
    // JSON error output
    if (jsonOutput) {
      console.log(JSON.stringify({
        error: errorMessage,
        errorType: 'APIError',
        explanation: 'Failed to analyze error',
        solution: 'Check your OpenAI API key and network connection',
        rootCause: err.message,
        context: { file: null, line: 0 },
        timestamp: new Date().toISOString(),
        success: false
      }, null, 2));
    }
    
    throw err;
  }
}
