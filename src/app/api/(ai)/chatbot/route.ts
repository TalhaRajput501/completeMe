import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";
import { ApiResponse } from "../../../../../types/ApiResponse";
import { SystemPrompt, tools } from "./chatbot";
import { createGroq } from "@ai-sdk/groq";
import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  isStepCount,
  ModelMessage,
  streamText,
  toUIMessageStream,
} from "ai";

export const messages: ModelMessage[] = [];

// make another tool that can search the products based on the user query and find a widget where you can show the product base on the search results with a button to add to cart
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages } = body;

    let api_key = process.env.GROQ_API_KEY;
    let baseURL = process.env.BASE_URL;
    let modelName = process.env.MODEL_NAME || "openai/gpt-oss-120b";
    if (!api_key || !baseURL) {
      throw new Error(
        "GROQ_API_KEY and BASE_URL are required in environment variables",
      );
    }

    let groq = createGroq({
      apiKey: api_key,
      baseURL: baseURL,
    });

    let model = groq(modelName);

    if (!messages) {
      throw new Error(" messages are required in the request ");
    }

    let result = streamText({
      model: model,
      instructions: SystemPrompt,
      messages: await convertToModelMessages(messages),
      stopWhen: isStepCount(5),
      tools: tools,
      maxRetries: 3,
      onError: ({ error }) => {
        console.error('streamText error:', error); 
      },
    });

    return createUIMessageStreamResponse({
      stream: toUIMessageStream({ stream: result.stream }),
    });
  } catch (error) {
    console.error("Error in POST /api/chatbot:", error);
    return NextResponse.json<ApiResponse>(
      {
        statusCode: 500,
        success: false,
        error: "Error processing the chatbot request",
      },
      { status: 500 },
    );
  }
}
