export async function POST(req) {
  try {
    const body = await req.json();

    const message = body.message;
    const apiKey = body.apiKey;
    const model = body.model || "gemini-2.5-flash";

    if (!apiKey) {
      return new Response(
        JSON.stringify({ text: "Missing API key" }),
        { status: 400 }
      );
    }

    // REAL TIME CONTEXT
    const now = new Date();

    const context =
      "Current date: " +
      now.toLocaleDateString() +
      "\nCurrent time: " +
      now.toLocaleTimeString() +
      "\nTimezone: " +
      Intl.DateTimeFormat().resolvedOptions().timeZone +
      "\n\nYou are an accurate AI assistant. Never invent facts. If unsure, say you don't know.\n\nUser: " +
      message;

    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/" +
        model +
        ":generateContent?key=" +
        apiKey,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: context,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await res.json();

    let reply = "No response";

    if (
      data.candidates &&
      data.candidates.length > 0 &&
      data.candidates[0].content.parts.length > 0
    ) {
      reply = data.candidates[0].content.parts[0].text;
    }

    if (data.error) {
      reply = data.error.message;
    }

    return new Response(
      JSON.stringify({ text: reply }),
      { status: 200 }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ text: "Server error" }),
      { status: 500 }
    );
  }
}
