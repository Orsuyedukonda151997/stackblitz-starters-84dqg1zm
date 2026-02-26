"use client"

import { useState } from "react"
import { supabase } from "./supabase"

export default function Home() {

  const [apiKey, setApiKey] = useState("")
  const [provider, setProvider] = useState("openai")
  const [status, setStatus] = useState("")

  async function saveKey() {

    if (!apiKey) {
      setStatus("Please enter an API key")
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

  return (

    <div style={{
      display: "flex",
      height: "100vh",
      fontFamily: "Arial"
    }}>

      {/* Sidebar */}
      <div style={{
        width: "250px",
        background: "#ff6a00",
        color: "#fff",
        padding: "20px"
      }}>

        <h2 style={{marginBottom:"30px"}}>
          AI Workspace
        </h2>

        <p style={{marginBottom:"10px"}}>API Keys</p>
        <p style={{marginBottom:"10px"}}>Images</p>
        <p style={{marginBottom:"10px"}}>Files</p>
        <p style={{marginBottom:"10px"}}>Automations</p>

      </div>


      {/* Main panel */}
      <div style={{
        flex: 1,
        padding: "40px",
        background: "#ffffff",
        color: "#000"
      }}>

        <h1 style={{
          color:"#ff6a00",
          marginBottom:"20px"
        }}>
          Add API Key
        </h1>

        <input
          type="text"
          placeholder="Enter API key"
          value={apiKey}
          onChange={(e)=>setApiKey(e.target.value)}
          style={{
            padding: "12px",
            width: "350px",
            border: "2px solid #ff6a00",
            borderRadius: "6px",
            marginBottom:"15px"
          }}
        />

        <br/>

        <select
          value={provider}
          onChange={(e)=>setProvider(e.target.value)}
          style={{
            padding: "12px",
            width:"200px",
            border: "2px solid #ff6a00",
            borderRadius: "6px",
            marginBottom:"20px"
          }}
        >

          <option value="openai">OpenAI</option>
          <option value="anthropic">Claude</option>
          <option value="google">Gemini</option>

        </select>

        <br/>

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

        <p style={{
          marginTop:"15px",
          color:"#ff6a00"
        }}>
          {status}
        </p>

      </div>

    </div>

  )

      }
