export async function POST(req) {
  try {
    const body = await req.json();
    const message = body.message;
    const apiKey = body.apiKey;

    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "Missing API key" }),
        { status: 400 }
      );
    }

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + apiKey,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: message }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    let text = "No response";

    if (data.candidates &&
        data.candidates[0] &&
        data.candidates[0].content &&
        data.candidates[0].content.parts &&
        data.candidates[0].content.parts[0]) {
      text = data.candidates[0].content.parts[0].text;
    }

    if (data.error) {
      text = data.error.message;
    }

    return new Response(
      JSON.stringify({ text }),
      { status: 200 }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Server error" }),
      { status: 500 }
    );
  }
        }
