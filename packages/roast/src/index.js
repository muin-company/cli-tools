import { readFileSync } from 'node:fs';
import { basename, extname } from 'node:path';
import { execSync } from 'node:child_process';

const PERSONAS = {
  mild: `You're a friendly but honest code reviewer. Point out issues with gentle humor. 
Be constructive but sprinkle in light jokes. Use emoji sparingly.`,
  medium: `You're a sarcastic senior developer doing a code review. You've seen too much bad code 
and it shows. Mix genuine advice with witty remarks. Be funny but educational.`,
  brutal: `You're Gordon Ramsay reviewing code instead of food. Be absolutely savage but accurate. 
Use cooking metaphors. Call bad code "raw", terrible patterns "bloody disgusting", 
good code "finally, some good f***ing code". Rate the code out of 10 at the end.
Be theatrical, dramatic, and hilarious — but every roast must contain real, actionable feedback.`
};

const LANG_MAP = {
  '.js': 'JavaScript', '.jsx': 'JavaScript (React)',
  '.ts': 'TypeScript', '.tsx': 'TypeScript (React)',
  '.py': 'Python', '.go': 'Go', '.rs': 'Rust',
  '.rb': 'Ruby', '.java': 'Java', '.cpp': 'C++',
  '.c': 'C', '.cs': 'C#', '.php': 'PHP',
  '.swift': 'Swift', '.kt': 'Kotlin',
  '.sh': 'Shell', '.bash': 'Bash',
};

function detectLanguage(filename) {
  const ext = extname(filename).toLowerCase();
  return LANG_MAP[ext] || 'Unknown';
}

function buildPrompt(code, options = {}) {
  const { level = 'brutal', lang = 'Unknown', filename = 'stdin', isDiff = false } = options;
  const persona = PERSONAS[level] || PERSONAS.brutal;
  const context = isDiff ? 'a git diff' : `a ${lang} file called "${filename}"`;

  return [
    { role: 'system', content: persona },
    {
      role: 'user',
      content: `Review ${context}. Roast it.\n\n\`\`\`${lang.toLowerCase()}\n${code}\n\`\`\``
    }
  ];
}

async function callAI(messages, model) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error(
      'Missing OPENAI_API_KEY. Set it:\n  export OPENAI_API_KEY=sk-...\n\nGet one at https://platform.openai.com/api-keys'
    );
  }

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ model, messages, temperature: 0.9, max_tokens: 1500 }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`OpenAI API error (${res.status}): ${body}`);
  }

  const data = await res.json();
  return data.choices[0].message.content;
}

async function printRoast(text, flags) {
  if (flags.json) {
    console.log(JSON.stringify({ roast: text }));
    return;
  }

  // Dynamic import for ESM chalk/ora
  const [{ default: chalk }, { default: ora }] = await Promise.all([
    import('chalk'),
    import('ora'),
  ]);

  const divider = chalk.dim('─'.repeat(60));
  console.log();
  console.log(divider);
  console.log(chalk.bold.red('  🔥 ROAST REPORT'));
  console.log(divider);
  console.log();
  console.log(text);
  console.log();
  console.log(divider);
}

export async function roastFile(filepath, flags = {}) {
  const code = readFileSync(filepath, 'utf-8');
  const lang = flags.lang || detectLanguage(filepath);
  const filename = basename(filepath);

  const [{ default: ora }] = await Promise.all([import('ora')]);
  const spinner = ora(`Roasting ${filename}...`).start();

  const messages = buildPrompt(code, { level: flags.level, lang, filename });
  const result = await callAI(messages, flags.model);
  spinner.stop();

  await printRoast(result, flags);
}

export async function roastStdin(flags = {}) {
  let code = '';
  for await (const chunk of process.stdin) {
    code += chunk;
  }

  if (!code.trim()) {
    throw new Error('No input received. Pipe some code or pass a filename.');
  }

  const [{ default: ora }] = await Promise.all([import('ora')]);
  const spinner = ora('Roasting...').start();

  const isDiff = flags.diff;
  const lang = flags.lang || (isDiff ? 'diff' : 'Unknown');
  const messages = buildPrompt(code, { level: flags.level, lang, isDiff });
  const result = await callAI(messages, flags.model);
  spinner.stop();

  await printRoast(result, flags);
}
