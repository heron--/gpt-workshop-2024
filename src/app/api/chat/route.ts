import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { NextRequest, NextResponse } from 'next/server';
import { getPersonas } from '@/app/utils/promptUtils';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_ORG_ID,
});

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  const { messages } = await req.json();
  const company = messages[messages.length - 1].content;

  try {
    const persona1 = await getPersonas();
    const persona2 = await getPersonas();
    const persona3 = await getPersonas();

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      stream: true,
      messages: [
        {
          role: 'system',
          content:
            'You are a product recommender. You will pick one product from the company and create a sales pitch for each persona. The sales pitch is geared towards a text message and limit to 160 characters. Return the product name, product description, price separated with each separated by two line breaks. Then return persona used and sales pitch for each persona.',
        },
        {
          role: 'user',
          content: `Company = ${company}. Persona = ${persona1}, ${persona2}, ${persona3}`,
        },
      ],
    });
    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error('OpenAI API error:', error);
    return NextResponse.json(error);
  }
}
