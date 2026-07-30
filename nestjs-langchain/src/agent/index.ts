import { createAgent, initChatModel, ReactAgent, tool } from 'langchain';
import * as z from 'zod';

const getWeather = tool((input) => `It's always sunny in ${input.city}!`, {
  name: 'get_weather',
  description: 'Get the weather for a given city',
  schema: z.object({
    city: z.string().describe('The city to get the weather for'),
  }),
});

export async function getAgent() {
  let agentInstance;
  if (agentInstance) return agentInstance;

  //
  const model = await initChatModel('kimi-for-coding', {
    modelProvider: 'kimi',
    temperature: 0.5,
    timeout: 300,
    maxTokens: 25000,
  });

  agentInstance = createAgent({
    model,
    tools: [getWeather],
  });

  await agentInstance.invoke({
    messages: [
      { role: 'user', content: "What's the weather in San Francisco?" },
    ],
  });

  return agentInstance;
}
