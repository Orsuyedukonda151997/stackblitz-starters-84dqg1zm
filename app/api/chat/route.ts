export async function POST(req: Request) {

  try {

    const { apiKey, message } = await req.json()

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: message }]
            }
          ]
        })
      }
    )

    const data = await res.json()

    if (data.error) {
      return Response.json({
        reply: data.error.message
      })
    }

    return Response.json({
      reply:
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response"
    })

  } catch {

    return Response.json({
      reply: "Server error"
    })

  }

    }
