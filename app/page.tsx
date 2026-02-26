"use client"

import { useState } from "react"
import { supabase } from "./supabase"

export default function Home() {

  const [apiKey, setApiKey] = useState("")
  const [provider, setProvider] = useState("openai")
  const [status, setStatus] = useState("")

  async function saveKey() {

    if (!apiKey) {
      setStatus("Enter API key")
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
      setStatus("Error saving")
      console.log(error)
    } else {
      setStatus("Saved successfully")
      setApiKey("")
    }

  }

  return (

    <div style={{
      display:"flex",
      height:"100vh",
      background:"#111",
      color:"#fff"
    }}>

      <div style={{
        width:"250px",
        background:"#000",
        padding:"20px"
      }}>
        <h2>AI Workspace</h2>

        <p>API Keys</p>

      </div>

      <div style={{
        padding:"30px"
      }}>

        <h1>Add API Key</h1>

        <input
          style={{
            padding:"10px",
            width:"300px"
          }}
          placeholder="Enter API key"
          value={apiKey}
          onChange={(e)=>setApiKey(e.target.value)}
        />

        <br/><br/>

        <select
          value={provider}
          onChange={(e)=>setProvider(e.target.value)}
        >

          <option value="openai">
            OpenAI
          </option>

          <option value="anthropic">
            Claude
          </option>

          <option value="google">
            Gemini
          </option>

        </select>

        <br/><br/>

        <button
          onClick={saveKey}
          style={{
            padding:"10px 20px"
          }}
        >
          Save
        </button>

        <p>{status}</p>

      </div>

    </div>

  )
}
