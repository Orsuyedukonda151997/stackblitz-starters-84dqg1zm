"use client"

import { useState } from "react"
import { supabase } from "./supabase"

export default function Home() {

  const [apiKey,setApiKey] = useState("")
  const [provider,setProvider] = useState("openai")
  const [prompt,setPrompt] = useState("")
  const [response,setResponse] = useState("")
  const [status,setStatus] = useState("")

  async function saveKey(){

    const { error } = await supabase
      .from("api_keys")
      .insert([
        {
          user_id:"desktop_user",
          api_key:apiKey,
          provider:provider
        }
      ])

    if(error){
      setStatus("Error saving key")
    }else{
      setStatus("Key saved")
    }

  }

  async function sendPrompt(){

    const res = await fetch(
      "/api/chat",
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          apiKey:apiKey,
          message:prompt
        })
      }
    )

    const data = await res.json()

    if(data.choices){
      setResponse(
        data.choices[0].message.content
      )
    }else{
      setResponse("Error")
    }

  }

  return (

    <div style={{
      display:"flex",
      height:"100vh"
    }}>

      <div style={{
        width:"250px",
        background:"#ff6a00",
        color:"#fff",
        padding:"20px"
      }}>
        <h2>AI Workspace</h2>
      </div>

      <div style={{
        padding:"30px",
        flex:1,
        background:"#fff"
      }}>

        <h2>API Key</h2>

        <input
          value={apiKey}
          onChange={(e)=>setApiKey(e.target.value)}
          placeholder="Enter API key"
          style={{padding:"10px",width:"300px"}}
        />

        <br/><br/>

        <button onClick={saveKey}>
          Save Key
        </button>

        <p>{status}</p>

        <hr/>

        <h2>Chat</h2>

        <input
          value={prompt}
          onChange={(e)=>setPrompt(e.target.value)}
          placeholder="Ask something"
          style={{padding:"10px",width:"400px"}}
        />

        <br/><br/>

        <button onClick={sendPrompt}>
          Send
        </button>

        <p>
          {response}
        </p>

      </div>

    </div>

  )

          }
