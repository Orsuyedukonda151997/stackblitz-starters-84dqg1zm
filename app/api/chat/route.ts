export async function POST(req: Request) {

  try {

    const body = await req.json();

    const message  = body.message;
    const apiKey   = body.apiKey;
    const provider = body.provider;
    const model    = body.model;

    if (!apiKey)
      return Response.json(
        { error: "Missing API key" },
        { status: 400 }
      );

    if (!provider)
      return Response.json(
        { error: "Missing provider" },
        { status: 400 }
      );

    if (!model)
      return Response.json(
        { error: "Missing model" },
        { status: 400 }
      );


    const now =
      new Date().toISOString();


    let url = "";
    let headers: any = {
      "Content-Type":
      "application/json"
    };

    let bodyData: any = {};



    // GEMINI
    if (provider === "gemini") {

      url =
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

      bodyData = {

        contents: [
          {
            parts: [
              {
                text:
                `Current date/time: ${now}
User: ${message}`
              }
            ]
          }
        ]

      };

    }



    // OPENAI
    else if (provider === "openai") {

      url =
      "https://api.openai.com/v1/chat/completions";

      headers.Authorization =
      `Bearer ${apiKey}`;

      bodyData = {

        model,

        messages: [
          {
            role: "user",
            content: message
          }
        ]

      };

    }



    // GROQ
    else if (provider === "groq") {

      url =
      "https://api.groq.com/openai/v1/chat/completions";

      headers.Authorization =
      `Bearer ${apiKey}`;

      bodyData = {

        model,

        messages: [
          {
            role: "user",
            content: message
          }
        ]

      };

    }



    // CLAUDE
    else if (provider === "claude") {

      url =
      "https://api.anthropic.com/v1/messages";

      headers["x-api-key"] =
      apiKey;

      headers["anthropic-version"] =
      "2023-06-01";

      bodyData = {

        model,

        max_tokens: 1024,

        messages: [
          {
            role: "user",
            content: message
          }
        ]

      };

    }



    else {

      return Response.json(
        { error: "Unknown provider" },
        { status: 400 }
      );

    }



    const res =
    await fetch(
      url,
      {
        method: "POST",
        headers,
        body: JSON.stringify(bodyData)
      }
    );


    const data =
    await res.json();


    let text =
      "No response";


    if (provider === "gemini") {

      text =
      data?.candidates?.[0]
      ?.content?.parts?.[0]
      ?.text;

    }

    else if (provider === "claude") {

      text =
      data?.content?.[0]
      ?.text;

    }

    else {

      text =
      data?.choices?.[0]
      ?.message?.content;

    }


    return Response.json({
      text: text || "No response"
    });


  }
  catch {

    return Response.json(
      { error: "Server error" },
      { status: 500 }
    );

  }

}
