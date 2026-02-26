"use client"

import { useState } from "react"
import { supabase } from "./supabase"

export default function Home() {

  const [apiKey, setApiKey] = useState("")
  const [message, setMessage] = useState("")
  const [response, setResponse] = useState("")

  async function saveKey() {

    if (!apiKey) {
      alert("Enter API key")
      return
    }

    await supabase
      .from("api_keys")
      .insert({
        provider: "gemini",
        api_key: apiKey,
        user_id: "default"
      })

    alert("Saved")
  }

  async function sendMessage() {

    if (!apiKey) {
      setResponse("Enter API key first")
      return
    }

    setResponse("Thinking...")

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        apiKey: apiKey,
        message: message
      })
    })

    const data = await res.json()

    setResponse(data.reply)
  }

  return (

    <div style={{display:"flex"}}>

      {/* sidebar */}
      <div style={{
        width:"220px",
        background:"#ff6a00",
        color:"white",
        padding:"20px",
        height:"100vh"
      }}>
        <h3>AI Workspace</h3>
        <div>Chat</div>
        <div>API Keys</div>
        <div>Images</div>
        <div>Files</div>
        <div>Automations</div>
      </div>


      {/* main */}
      <div style={{padding:"30px"}}>

        <h2>Add Gemini API Key</h2>

        <input
          value={apiKey}
          onChange={(e)=>setApiKey(e.target.value)}
          style={{
            padding:"10px",
            border:"2px solid orange",
            width:"300px"
          }}
        />

        <br/><br/>

        <button
          onClick={saveKey}
          style={{
            background:"#ff6a00",
            color:"white",
            padding:"10px"
          }}
        >
          Save API Key
        </button>


        <hr style={{margin:"30px 0"}}/>


        <h2>Gemini Chat</h2>

        <input
          value={message}
          onChange={(e)=>setMessage(e.target.value)}
          style={{
            padding:"10px",
            border:"2px solid orange",
            width:"400px"
          }}
        />

        <br/><br/>

        <button
          onClick={sendMessage}
          style={{
            background:"#ff6a00",
            color:"white",
            padding:"10px"
          }}
        >
          Send
        </button>

        <div style={{
          marginTop:"20px",
          padding:"15px",
          border:"1px solid orange",
          width:"400px"
        }}>
          {response}
        </div>

      </div>

    </div>

  )
          }
