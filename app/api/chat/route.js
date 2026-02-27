export async function POST(req: Request) {

  try {

    const body = await req.json();

    const apiKey   = body.apiKey;
    const provider = body.provider;
    const model    = body.model;
    const message  = body.message;

    if (!apiKey || !provider || !model || !message) {

      return new Response(
        JSON.stringify({
          text: "Missing required fields"
        }),
        { status: 400 }
      );

    }


    const now =
      new Date().toISOString();


    let url = "";

    let headers: any = {
      "Content-Type":
      "application/json"
    };

    let requestBody: any = {};



    // GEMINI
    if (provider === "gemini") {

      url =
      "https://generativelanguage.googleapis.com/v1beta/models/"
      + model +
      ":generateContent?key="
      + apiKey;


      requestBody = {

        contents: [

          {

            parts: [

              {

                text:
                "Current date/time: "
                + now +
                "\nUser: "
                + message

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


      headers["Authorization"] =
      "Bearer " + apiKey;


      requestBody = {

        model: model,

        messages: [

          {

            role: "system",

            content:
            "Current date/time: "
            + now

          },

          {

            role: "user",

            content:
            message

          }

        ]

      };

    }



    // GROQ
    else if (provider === "groq") {

      url =
      "https://api.groq.com/openai/v1/chat/completions";


      headers["Authorization"] =
      "Bearer " + apiKey;


      requestBody = {

        model: model,

        messages: [

          {

            role: "user",

            content:
            message

          }

        ]

      };

    }



    // OPENROUTER
    else if (provider === "openrouter") {

      url =
      "https://openrouter.ai/api/v1/chat/completions";


      headers["Authorization"] =
      "Bearer " + apiKey;


      headers["HTTP-Referer"] =
      "https://your-vercel-app.vercel.app";


      requestBody = {

        model: model,

        messages: [

          {

            role: "user",

            content:
            message

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


      requestBody = {

        model: model,

        max_tokens: 1024,

        messages: [

          {

            role: "user",

            content:
            "Current date/time: "
            + now +
            "\nUser: "
            + message

          }

        ]

      };

    }



    else {

      return new Response(

        JSON.stringify({

          text:
          "Unknown provider"

        }),

        { status: 400 }

      );

    }



    const response =
    await fetch(
      url,
      {

        method: "POST",

        headers,

        body:
        JSON.stringify(
          requestBody
        )

      }
    );



    const data =
    await response.json();



    let text =
    "No response";



    if (provider === "gemini") {

      text =
      data?.candidates?.[0]
      ?.content?.parts?.[0]
      ?.text
      ||
      data?.error?.message
      ||
      "No response";

    }



    else if (provider === "claude") {

      text =
      data?.content?.[0]
      ?.text
      ||
      data?.error?.message
      ||
      "No response";

    }



    else {

      text =
      data?.choices?.[0]
      ?.message?.content
      ||
      data?.error?.message
      ||
      "No response";

    }



    return new Response(

      JSON.stringify({

        text: text

      }),

      { status: 200 }

    );



  }
  catch (error) {

    return new Response(

      JSON.stringify({

        text:
        "Server error"

      }),

      { status: 500 }

    );

  }

}
