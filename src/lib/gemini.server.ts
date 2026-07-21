export async function callGemini(systemPrompt: string, userPrompt: string, maxOutputTokens = 300): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  const model = process.env.GEMINI_MODEL || "gemini-2.0-flash";

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is not set");
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const payload = {
    system_instruction: {
      parts: { text: systemPrompt },
    },
    contents: [
      {
        role: "user",
        parts: { text: userPrompt },
      },
    ],
    generationConfig: {
      maxOutputTokens,
      temperature: 1,
    },
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Gemini API error (${response.status}): ${error}`);
  }

  const data = (await response.json()) as {
    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
  };

  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error("No text content in Gemini response");
  }

  return text;
}
