import { ChatDeepSeek } from '@langchain/deepseek';

// $env:DEEPSEEK_API_KEY="sk-fb75e07a55e242a085b61c9cdc6ee51a"
export const llm = new ChatDeepSeek({
  model: 'deepseek-v4-flash',
  temperature: 0,
  // other params...
});
