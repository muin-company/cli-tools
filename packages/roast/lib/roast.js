import Anthropic from '@anthropic-ai/sdk';
import chalk from 'chalk';
import { readFileSync } from 'fs';
import { basename, extname } from 'path';

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

const MILD_ROAST_PROMPT = `You're a friendly senior developer reviewing code. Your job:

1. Point out real issues gently (bugs, anti-patterns, performance problems)
2. Be encouraging and constructive - focus on learning opportunities
3. Use light humor, keep it warm and supportive
4. Be specific - quote the actual code you're mentioning
5. End with genuine compliments and helpful tips

Style: Like a supportive mentor at code review. Constructive feedback with a smile.

Format your response with:
- 💡 for suggestions and improvements
- ✨ for compliments and good practices
- 🚨 for serious bugs (if any)
- 💪 for encouragement

Keep it under 400 words. Keep it positive.`;

const MEDIUM_ROAST_PROMPT = `You're a senior developer with a sharp wit reviewing code. Your job:

1. Point out real issues (bugs, anti-patterns, performance problems, security holes)
2. Be funny but not mean - roast the code, not the person
3. Use developer humor (not corporate AI cheerleader vibes)
4. Be specific - quote the actual code you're roasting
5. End with 1-2 genuine compliments or useful tips

Style: Like a sarcastic but helpful senior dev at code review. Think "Gordon Ramsay for code" but constructive.

Format your response with:
- 🔥 for roasts/issues
- 💡 for suggestions
- ✨ for compliments
- 🚨 for serious bugs

Keep it under 400 words. Make it shareable.`;

const HARSH_ROAST_PROMPT = `You're a brutally honest senior developer with zero patience for bad code. Your job:

1. Ruthlessly point out every issue (bugs, anti-patterns, performance disasters, security nightmares)
2. Be savage - this code needs to know what it did wrong
3. Use cutting developer humor (think "your code is so bad, it makes PHP look elegant")
4. Be specific - quote the crimes against programming
5. Maybe end with ONE backhanded compliment if you can find something

Style: Like Gordon Ramsay at his angriest, but for code. No mercy. Pure fire.

Format your response with:
- 🔥🔥🔥 for roasts (triple fire for triple pain)
- 💀 for code that should be deleted
- 🚨 for serious bugs
- 💡 for "how did you not know this?"

Keep it savage. Keep it under 400 words. No holding back.`;

const SERIOUS_PROMPT = `You're a senior developer conducting a professional code review. Analyze this code for:

1. Bugs and potential runtime errors
2. Security vulnerabilities
3. Performance issues
4. Code quality and maintainability
5. Best practices for the language/framework

Be thorough but concise. Format your response with:
- 🚨 Critical issues (security, bugs)
- ⚠️  Warnings (performance, code smell)
- 💡 Suggestions (improvements, best practices)
- ✅ Good practices observed

Keep it actionable and under 400 words.`;

export async function roastFile(filePath, options = {}) {
  // Read file
  const code = readFileSync(filePath, 'utf-8');
  const fileName = basename(filePath);
  const ext = extname(filePath);
  const language = LANGUAGE_MAP[ext] || 'code';

  // Check for API key
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error(
      'ANTHROPIC_API_KEY not found in environment.\n' +
      'Get your key at: https://console.anthropic.com/settings/keys\n' +
      'Then run: export ANTHROPIC_API_KEY="your-key-here"'
    );
  }

  // Display header (skip if JSON mode)
  if (!options.json) {
    console.log('');
    if (options.serious) {
      console.log(chalk.blue.bold('📋 Professional Code Review'));
      console.log(chalk.gray(`File: ${fileName} (${language})`));
    } else {
      const severity = options.severity || 'medium';
      const headers = {
        mild: chalk.yellow.bold('😊 CODE REVIEW (Be Nice Mode)'),
        medium: chalk.red.bold('🔥 CODE ROAST 🔥'),
        harsh: chalk.red.bold('💀 CODE EXECUTION 💀')
      };
      console.log(headers[severity]);
      console.log(chalk.gray(`Victim: ${fileName} (${language})`));
      if (severity === 'harsh') {
        console.log(chalk.red('⚠️  WARNING: Brutally honest mode enabled'));
      } else if (severity === 'mild') {
        console.log(chalk.green('✨ Friendly feedback mode'));
      }
    }
    console.log(chalk.gray('─'.repeat(50)));
    console.log('');
  }

  // Call Anthropic API
  const client = new Anthropic({ apiKey });
  
  let interval;
  if (!options.json) {
    const spinner = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
    let i = 0;
    interval = setInterval(() => {
      process.stdout.write(`\r${chalk.cyan(spinner[i++ % spinner.length])} Analyzing...`);
    }, 80);
  }

  try {
    let prompt;
    if (options.serious) {
      prompt = SERIOUS_PROMPT;
    } else {
      const severity = options.severity || 'medium';
      const prompts = {
        mild: MILD_ROAST_PROMPT,
        medium: MEDIUM_ROAST_PROMPT,
        harsh: HARSH_ROAST_PROMPT
      };
      prompt = prompts[severity];
    }
    
    const message = await client.messages.create({
      model: options.model,
      max_tokens: 2048,
      messages: [{
        role: 'user',
        content: `${prompt}\n\n\`\`\`${language}\n${code}\n\`\`\``
      }]
    });

    if (interval) {
      clearInterval(interval);
      process.stdout.write('\r' + ' '.repeat(20) + '\r');
    }

    const review = message.content[0].text;
    
    // JSON output mode
    if (options.json) {
      const { parseReviewToJSON } = await import('./json-parser.js');
      const metadata = {
        filePath,
        fileName,
        language,
        mode: options.serious ? 'serious' : 'roast',
        severity: options.serious ? null : (options.severity || 'medium'),
        model: options.model,
        code
      };
      const result = parseReviewToJSON(review, metadata);
      console.log(JSON.stringify(result, null, 2));
      return;
    }
    
    // Colorize output
    const colorized = review
      .replace(/🔥/g, chalk.red('🔥'))
      .replace(/💡/g, chalk.yellow('💡'))
      .replace(/✨/g, chalk.green('✨'))
      .replace(/🚨/g, chalk.red.bold('🚨'))
      .replace(/⚠️/g, chalk.yellow('⚠️'))
      .replace(/✅/g, chalk.green('✅'))
      .replace(/💀/g, chalk.red.bold('💀'))
      .replace(/💪/g, chalk.cyan('💪'));

    console.log(colorized);
    console.log('');
    console.log(chalk.gray('─'.repeat(50)));
    
    if (!options.serious) {
      console.log(chalk.gray.italic('Roasted with ❤️  by Claude'));
    }
    console.log('');

  } catch (error) {
    if (interval) {
      clearInterval(interval);
      process.stdout.write('\r' + ' '.repeat(20) + '\r');
    }
    throw error;
  }
}
