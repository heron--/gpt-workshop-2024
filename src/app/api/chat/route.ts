import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextRequest, NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_ORG_ID,
});

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const { messages } = await req.json();
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      stream: true,
      messages: [
        {
          role: "system",
          content:
            "You are a bartender. Your job is to recommend a cocktail based on a user's description. A user may prompt you with a mood, feeling, or emotion. Respond with a bullet point list of ingredients and instructions for the cocktail." +
              "" +
              "Each bullet point should be on a new line. Here is an example output:" +
              "Mezcal Margarita" +
              "" +
              "Ingredients:\n" +
              "- 2 oz Mezcal\n" +
              "- 1 oz Lime Juice\n" +
              "- 1 oz Agave Nectar\n" +
              "- 1 Lime Wedge\n" +
              "" +
              "Instructions:\n" +
              "1. Add all ingredients to a shaker with ice.\n" +
              "2. Shake and strain into a rocks glass with fresh ice.\n" +
              "3. Garnish with a lime wedge.",
        },
        ...messages,
      ],
    });
    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error("OpenAI API error:", error);
    return NextResponse.json(error);
  }
}
