"use client"

import { useState } from "react"
import { supabase } from "./supabase"

export default function Home() {

  const [apiKey, setApiKey] = useState("")
  const [provider, setProvider] = useState("google")
  const [prompt, setPrompt] = useState("")
  const [response, setResponse] = useState("")
  const [status, setStatus] = useState("")

  // SAVE API KEY TO SUPABASE
  async function saveKey() {

    if (!apiKey) {
      setStatus("Enter API key first")
      return
    }

    const { error } = await supabase
      .from("api_keys")
      .insert([
        {
          user_id: "desktop_user",
          api_key: apiKey,
          provider: provider
        }
      ])

    if (error) {
      console.log(error)
      setStatus("Error saving key")
    } else {
      setStatus("API key saved successfully")
      setApiKey("")
    }

  }

  // SEND PROMPT TO GEMINI BACKEND
  async function sendPrompt() {

    if (!apiKey) {
      setResponse("Enter API key first")
      return
    }

    const res = await fetch(
      "/api/chat",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          apiKey: apiKey,
          message: prompt
        })
      }
    )

    const data = await res.json()

    setResponse(data.reply)

  }

  return (

    <div style={{
      display: "flex",
      height: "100vh",
      fontFamily: "Arial"
    }}>

      {/* SIDEBAR */}
      <div style={{
        width: "250px",
        background: "#ff6a00",
        color: "#fff",
        padding: "20px"
      }}>

        <h2 style={{marginBottom:"30px"}}>
          AI Workspace
        </h2>

        <p>Chat</p>
        <p>API Keys</p>
        <p>Images</p>
        <p>Files</p>
        <p>Automations</p>

      </div>


      {/* MAIN PANEL */}
      <div style={{
        flex: 1,
        padding: "40px",
        background: "#ffffff",
        color: "#000"
      }}>

        {/* API KEY SECTION */}
        <h2 style={{color:"#ff6a00"}}>
          Add Gemini API Key
        </h2>

        <input
          type="text"
          placeholder="AIza..."
          value={apiKey}
          onChange={(e)=>setApiKey(e.target.value)}
          style={{
            padding: "12px",
            width: "350px",
            border: "2px solid #ff6a00",
            borderRadius: "6px"
          }}
        />

        <br/><br/>

        <select
          value={provider}
          onChange={(e)=>setProvider(e.target.value)}
          style={{
            padding: "12px",
            border: "2px solid #ff6a00",
            borderRadius: "6px"
          }}
        >

          <option value="google">
            Google Gemini
          </option>

        </select>

        <br/><br/>

        <button
          onClick={saveKey}
          style={{
            padding: "12px 25px",
            background: "#ff6a00",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight:"bold"
          }}
        >
          Save API Key
        </button>

        <p style={{color:"#ff6a00"}}>
          {status}
        </p>

        <hr style={{margin:"30px 0"}}/>

        {/* CHAT SECTION */}
        <h2 style={{color:"#ff6a00"}}>
          Gemini Chat
        </h2>

        <input
          type="text"
          placeholder="Ask something..."
          value={prompt}
          onChange={(e)=>setPrompt(e.target.value)}
          style={{
            padding: "12px",
            width: "400px",
            border: "2px solid #ff6a00",
            borderRadius: "6px"
          }}
        />

        <br/><br/>

        <button
          onClick={sendPrompt}
          style={{
            padding: "12px 25px",
            background: "#ff6a00",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          Send
        </button>

        <div style={{
          marginTop:"20px",
          padding:"15px",
          border:"1px solid #ff6a00",
          borderRadius:"6px",
          width:"500px",
          minHeight:"50px"
        }}>
          {response}
        </div>

      </div>

    </div>

  )

      }
