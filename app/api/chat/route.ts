import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";

export const runtime = "edge";

type IncomingMessage = {
  role: "user" | "assistant" | "system";
  content?: string;
  parts?: { type: string; text?: string }[];
};

interface RequestBody {
  messages: IncomingMessage[];
}

export async function POST(req: Request) {
  try {
    const body: RequestBody = await req.json();

    // ✅ Normalize messages from `useChat`
    const normalizedMessages = (body.messages || []).map((msg) => ({
      role: msg.role,
      content:
        typeof msg.content === "string"
          ? msg.content
          : msg.parts?.map((p) => p.text || "").join("") || "",
    }));

    const result = await streamText({
      model: openai("gpt-4o-mini"), // or gpt-3.5-turbo if available
      messages: normalizedMessages,
    });

    return result.toDataStreamResponse();
  } catch (err) {
    console.error("API Route Error:", err);
    return new Response(
      JSON.stringify({ error: (err as Error).message || "Unknown error" }),
      { status: 500 }
    );
  }
}
