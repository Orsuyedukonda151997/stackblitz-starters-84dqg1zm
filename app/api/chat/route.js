export async function POST(req) {
  try {
    const body = await req.json();

    const apiKey = body.apiKey;
    const provider = body.provider;
    const model = body.model;
    const message = body.message;

    if (!apiKey) {
      return new Response(JSON.stringify({ error: "Missing API key" }), {
        status: 400,
      });
    }

    if (!message) {
      return new Response(JSON.stringify({ error: "Missing message" }), {
        status: 400,
      });
    }

    let url = "";
    let headers = {};
    let payload = {};

    const now = new Date().toISOString();

    // GEMINI
    if (provider === "gemini") {
      url =
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

      headers = {
        "Content-Type": "application/json",
      };

      payload = {
        contents: [
          {
            parts: [
              {
                text:
                  `Current date and time: ${now}.
Answer accurately. Do not invent facts.

User question: ${message}`,
              },
            ],
          },
        ],
      };
    }

    // OPENAI
    else if (provider === "openai") {
      url = "https://api.openai.com/v1/chat/completions";

      headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      };

      payload = {
        model: model,
        messages: [
          {
            role: "system",
            content:
              `Current date and time: ${now}. Answer accurately.`,
          },
          {
            role: "user",
            content: message,
          },
        ],
      };
    }

    // GROQ
    else if (provider === "groq") {
      url = "https://api.groq.com/openai/v1/chat/completions";

      headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      };

      payload = {
        model: model,
        messages: [
          {
            role: "system",
            content:
              `Current date and time: ${now}. Answer accurately.`,
          },
          {
            role: "user",
            content: message,
          },
        ],
      };
    }

    else {
      return new Response(
        JSON.stringify({ error: "Unknown provider" }),
        { status: 400 }
      );
    }

    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    let text = "No response";

    if (provider === "gemini") {
      text =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        data?.error?.message ||
        "No response";
    }

    if (provider === "openai" || provider === "groq") {
      text =
        data?.choices?.[0]?.message?.content ||
        data?.error?.message ||
        "No response";
    }

    return new Response(JSON.stringify({ text }), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error.message || "Server error",
      }),
      { status: 500 }
    );
  }
}
