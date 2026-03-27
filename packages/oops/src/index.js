import OpenAI from 'openai';
import chalk from 'chalk';
import ora from 'ora';

const SYSTEM_PROMPT = `You are an expert developer assistant. When given an error message or stack trace, provide:
1. **What happened** — a plain-language explanation
2. **Why it happened** — common causes
3. **How to fix it** — actionable steps

Be concise and practical. Format with markdown.`;

export async function explainError(errorMessage, flags = {}) {
  const { json: jsonOutput, lang = 'en', model = 'gpt-4o-mini', verbose } = flags;

  const openai = new OpenAI();
  const spinner = jsonOutput ? null : ora('Analyzing error...').start();

  const langInstruction = lang !== 'en' ? `\nRespond in language: ${lang}` : '';
  const verboseInstruction = verbose ? '\nProvide a detailed, in-depth analysis.' : '';

  try {
    const response = await openai.chat.completions.create({
      model: process.env.OOPS_MODEL || model,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT + langInstruction + verboseInstruction },
        { role: 'user', content: errorMessage },
      ],
      temperature: 0.3,
    });

    const explanation = response.choices[0]?.message?.content || 'No explanation available.';

    if (spinner) spinner.stop();

    if (jsonOutput) {
      console.log(JSON.stringify({ error: errorMessage, explanation, model }, null, 2));
    } else {
      console.log(`\n${chalk.red.bold('Error:')} ${errorMessage}\n`);
      console.log(explanation);
      console.log();
    }
  } catch (err) {
    if (spinner) spinner.fail('Failed to analyze error');
    throw err;
  }
}
