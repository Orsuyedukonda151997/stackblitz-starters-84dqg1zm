export async function POST(req) {
  try {
    const body = await req.json();
    const message = body.message;
    const apiKey = body.apiKey;
    const model = body.model || "gemini-2.5-flash";

    if (!apiKey) {
      return new Response(JSON.stringify({ error: "Missing API key" }), {
        status: 400,
      });
    }

    // Real-time context
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const systemPrompt = `
You are an accurate AI assistant inside a desktop AI workspace.

Rules:
• Always use the provided current date/time as truth.
• Current date: ${date}
• Current time: ${time}
• Timezone: ${timezone}

• If user asks about date/time, use this exact value.
• Do NOT invent fake dates.
• Answer clearly and accurately.
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text:
                    systemPrompt +
                    "\n\nUser message:\n" +
                    message,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    let text = "No response";

    if (data.candidates?.length > 0) {
      text =
        data.candidates[0]?.content?.parts?.[0]?.text ||
        "Empty reply";
    }

    if (data.error) {
      text = data.error.message;
    }

    return new Response(JSON.stringify({ text }), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Server error" }),
      { status: 500 }
    );
  }
}
