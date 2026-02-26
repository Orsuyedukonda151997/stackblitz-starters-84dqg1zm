export async function POST(req: Request) {

  try {

    const body = await req.json()

    const apiKey = body.apiKey
    const message = body.message

    if (!apiKey) {
      return Response.json({
        reply: "No API key"
      })
    }

    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + apiKey,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: message
                }
              ]
            }
          ]
        })
      }
    )

    const data = await res.json()

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text
      || "No response from Gemini"

    return Response.json({
      reply
    })

  }
  catch (e) {

    return Response.json({
      reply: "Server error"
    })

  }

      }
