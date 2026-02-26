export async function POST(req) {

  const body = await req.json()

  const apiKey = body.apiKey
  const message = body.message

  // GOOGLE GEMINI REQUEST
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
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
  )

  const data = await response.json()

  const reply =
    data?.candidates?.[0]?.content?.parts?.[0]?.text
    || "No response"

  return Response.json({
    reply: reply
  })

        }
