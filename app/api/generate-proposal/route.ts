// app/api/generate-proposal/route.ts
import { openai } from "@ai-sdk/openai";
import { streamText, StreamingTextResponse } from "ai"; // Ensure StreamingTextResponse is imported
import { getProposalSystemPrompt } from "@/lib/prompts";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    // Console logs for debugging execution flow
    console.log("[API Route] /api/generate-proposal received POST request");
    console.log("[API Route] Prompt received:", prompt);

    if (!prompt || typeof prompt !== "string") {
      return new Response(JSON.stringify({ error: "Prompt is required and must be a string" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const systemPrompt = getProposalSystemPrompt();
    console.log("[API Route] Using system prompt.");

    const result = await streamText({
      model: openai("gpt-4o"), // Uses OPENAI_API_KEY from environment
      system: systemPrompt,
      prompt: `Here are the user's project details: ${prompt}`,
      // You can add other parameters here if needed, e.g., temperature, maxTokens
    });

    console.log("[API Route] streamText result obtained, attempting to stream response.");
    // CORRECTED LINE: Use StreamingTextResponse with result.toTextStream()
    return new StreamingTextResponse(result.toTextStream()); // THIS IS THE FIX

  } catch (error: any) {
    console.error("[API_ROUTE_ERROR] /api/generate-proposal:", error); // Server-side log
    let errorMessage = "An error occurred while generating the proposal.";
    let statusCode = 500;

    let errorDetails = error.message;

    // Enhanced error logging specific to OpenAI APIError and 429
    if (error.name === 'APIError') {
      if (error.status === 429) {
        errorMessage = "You've hit an OpenAI rate limit or exceeded your quota. Please check your OpenAI account usage.";
        statusCode = 429;
      } else if (error.status && error.status >= 400 && error.status < 500) {
        errorMessage = `OpenAI API Client Error (Status ${error.status}): ${error.message}`;
        statusCode = error.status;
      } else {
        errorMessage = `OpenAI API Server Error: ${error.message}`;
        statusCode = 500;
      }
      errorDetails = error.message; // Use error.message for APIError details
    } else if (error.response && error.response.data) { // Axios-like error structure
      errorDetails = error.response.data;
    } else if (error.cause) { // Node.js error cause
      errorDetails = error.cause;
    } else if (error.message) {
      errorDetails = error.message;
    }

    return new Response(JSON.stringify({ error: errorMessage, details: errorDetails }), {
      status: statusCode,
      headers: { "Content-Type": "application/json" },
    });
  }
}
