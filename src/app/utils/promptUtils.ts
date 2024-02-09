import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_ORG_ID,
});

export const getProducts = async (company: string) => {
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: false,
    messages: [
      {
        role: 'system',
        content: `List me a random set of products for a company from a random set of 3 categories. Give me at least 10 products per category. Please respond with just the products and the category`,
      },
      {
        role: 'user',
        content: `Company name: ${company}`,
      },
    ],
  });

  return response.choices[0].message.content;
};

export const getPersonas = async (company: string) => {
  const products = await getProducts(company);
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: false,
    messages: [
      {
        role: 'system',
        content:
          'Return a three personas based on the product listings separated by categories. Only return the name of the persona. ',
      },
      {
        role: 'user',
        content: `Purchase history: ${products}`,
      },
    ],
  });

  return response.choices[0].message.content;
};
