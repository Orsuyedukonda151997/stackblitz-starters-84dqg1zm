export async function POST(req) {

  try {

    const body = await req.json();

    const apiKey   = body.apiKey;
    const provider = body.provider;
    const model    = body.model;
    const message  = body.message;

    if (!apiKey)
      return new Response(
        JSON.stringify({
          text: "Missing API key"
        }),
        { status:400 }
      );


    const now =
      new Date().toLocaleString();

    const prompt =
      "Current date/time: " +
      now +
      "\nBe accurate.\nUser: " +
      message;


    let reply = "";


    // GEMINI
    if (provider === "gemini") {

      const res =
        await fetch(

        "https://generativelanguage.googleapis.com/v1beta/models/"
        + model +
        ":generateContent?key="
        + apiKey,

        {
          method:"POST",

          headers:{
            "Content-Type":
            "application/json"
          },

          body:
          JSON.stringify({

            contents:[
              {
                parts:[
                  {
                    text:prompt
                  }
                ]
              }
            ]

          })
        }
      );

      const data =
        await res.json();

      reply =
        data?.candidates?.[0]
        ?.content?.parts?.[0]
        ?.text;

    }



    // OPENAI
    if (provider === "openai") {

      const res =
        await fetch(

        "https://api.openai.com/v1/chat/completions",

        {
          method:"POST",

          headers:{
            "Content-Type":
            "application/json",

            "Authorization":
            "Bearer " + apiKey
          },

          body:
          JSON.stringify({

            model: model,

            messages:[
              {
                role:"user",
                content:prompt
              }
            ]

          })
        }
      );

      const data =
        await res.json();

      reply =
        data?.choices?.[0]
        ?.message?.content;

    }



    // CLAUDE
    if (provider === "claude") {

      const res =
        await fetch(

        "https://api.anthropic.com/v1/messages",

        {
          method:"POST",

          headers:{
            "Content-Type":
            "application/json",

            "x-api-key":
            apiKey,

            "anthropic-version":
            "2023-06-01"
          },

          body:
          JSON.stringify({

            model:model,

            max_tokens:1000,

            messages:[
              {
                role:"user",
                content:prompt
              }
            ]

          })
        }
      );

      const data =
        await res.json();

      reply =
        data?.content?.[0]?.text;

    }



    // GROQ
    if (provider === "groq") {

      const res =
        await fetch(

        "https://api.groq.com/openai/v1/chat/completions",

        {
          method:"POST",

          headers:{
            "Content-Type":
            "application/json",

            "Authorization":
            "Bearer " + apiKey
          },

          body:
          JSON.stringify({

            model:model,

            messages:[
              {
                role:"user",
                content:prompt
              }
            ]

          })
        }
      );

      const data =
        await res.json();

      reply =
        data?.choices?.[0]
        ?.message?.content;

    }


    if (!reply)
      reply = "No response";


    return new Response(
      JSON.stringify({
        text:reply
      }),
      { status:200 }
    );


  }
  catch {

    return new Response(
      JSON.stringify({
        text:"Server error"
      }),
      { status:500 }
    );

  }

}
