import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { buildResumeContext } from "./resume-data";
import { callGemini } from "./gemini.server";

const askAssistantValidator = z.object({
  message: z.string().min(1).max(4000, "Message too long (max 4000 chars)"),
  history: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        text: z.string(),
      })
    )
    .max(6, "History too long (max 6 messages)"),
});

export const askAssistant = createServerFn({ method: "POST" })
  .validator(askAssistantValidator)
  .handler(async ({ data }) => {
    const systemPrompt = `You are Subhan Shaikh's portfolio assistant. Answer only using the context below; be concise (2-4 sentences); if asked something not covered, say so and suggest emailing him directly (subhan.shaikh.me@gmail.com); never invent experience.

If the user's message reads like a job description (or asks whether he's a fit for a role), instead respond with a tailored 3-sentence pitch citing specific real projects/metrics from the context below — still no fabrication.

CONTEXT:
${buildResumeContext()}`;

    // Build conversation history for context (but don't send it to Gemini yet, just the latest message)
    let userPrompt = data.message;

    // Optionally include recent history as context in the prompt
    if (data.history.length > 0) {
      const historyText = data.history
        .slice(-4)
        .map((msg) => `${msg.role === "user" ? "User" : "Assistant"}: ${msg.text}`)
        .join("\n");
      userPrompt = `Previous conversation:\n${historyText}\n\nNew message: ${data.message}`;
    }

    const response = await callGemini(systemPrompt, userPrompt, 300);
    return response;
  });
