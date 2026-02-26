import { NextResponse } from "next/server"

export async function POST(req: Request) {

  try {

    const body = await req.json()

    const apiKey = body.apiKey
    const message = body.message

    const response = await fetch(
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

    const data = await response.json()

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text
      || "No response"

    return NextResponse.json({
      reply: reply
    })

  }
  catch {

    return NextResponse.json({
      reply: "Error connecting to Gemini"
    })

  }

      }
