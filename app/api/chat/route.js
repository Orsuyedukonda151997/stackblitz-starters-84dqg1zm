export async function POST(req) {

  const body = await req.json()

  const apiKey = body.apiKey
  const message = body.message

  const response = await fetch(
    "https://api.openai.com/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: message
          }
        ]
      })
    }
  )

  const data = await response.json()

  return Response.json(data)

}
