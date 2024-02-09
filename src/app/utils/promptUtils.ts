import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_ORG_ID,
});

export const getProducts = async () => {
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [
      {
        role: 'system',
        content:
          'List me a random set of products from a list of companies. Give me at least 10 products. List at least 1 from each company. Response should be a comman separated list.',
      },
      {
        role: 'user',
        content: 'Companies = Omaha Steak, Shien, Fashion Nova.',
      },
    ],
  });
  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
};

export const getPersonas = async () => {
  const products = await getProducts();
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [
      {
        role: 'system',
        content:
          'You will describe the personality and interests of customer based on their purchase history. Response should be a comma separate list of feature.',
      },
      {
        role: 'user',
        content: `Purchase history: ${products}`,
      },
    ],
  });
  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
};
