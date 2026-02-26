export async function POST(req) {
  try {
    const body = await req.json();
    const message = body.message;
    const apiKey = body.apiKey;

    if (!apiKey || !message) {
      return new Response(
        JSON.stringify({ text: "Missing API key or message" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // IMPORTANT: API key must be appended like this
    const url =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" +
      apiKey;

    const geminiRes = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: message }
            ],
          },
        ],
      }),
    });

    const data = await geminiRes.json();

    console.log("Gemini response:", data);

    let reply = "No response from Gemini";

    if (
      data.candidates &&
      data.candidates.length > 0 &&
      data.candidates[0].content &&
      data.candidates[0].content.parts &&
      data.candidates[0].content.parts.length > 0
    ) {
      reply = data.candidates[0].content.parts[0].text;
    }

    if (data.error) {
      reply = data.error.message;
    }

    return new Response(
      JSON.stringify({ text: reply }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );

  } catch (err) {
    console.log(err);

    return new Response(
      JSON.stringify({ text: "Server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
