"use client";

import { useState, useEffect } from "react";

export default function Home() {

  const [apiKey, setApiKey] = useState("");
  const [savedKey, setSavedKey] = useState("");
  const [model, setModel] = useState("gemini-2.5-flash");
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");

  useEffect(() => {
    const key = localStorage.getItem("gemini_key");
    if (key) setSavedKey(key);
  }, []);

  function saveKey() {
    localStorage.setItem("gemini_key", apiKey);
    setSavedKey(apiKey);
    alert("Key saved");
  }

  async function sendMessage() {

    if (!savedKey) {
      setReply("Enter API key first");
      return;
    }

    setReply("Thinking...");

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: message,
        apiKey: savedKey,
        model: model
      })
    });

    const data = await res.json();

    setReply(data.text);
  }

  return (

    <div style={{display:"flex",height:"100vh"}}>

      {/* Sidebar */}

      <div style={{
        width:"220px",
        background:"#ff6a00",
        color:"white",
        padding:"20px"
      }}>

        <h2>AI Workspace</h2>

        <p>Chat</p>
        <p>API Keys</p>
        <p>Images</p>
        <p>Files</p>
        <p>Automations</p>

      </div>


      {/* Main */}

      <div style={{
        flex:1,
        padding:"40px",
        background:"#f4f4f4"
      }}>

        <h2>Add Gemini API Key</h2>

        <input
          value={apiKey}
          onChange={(e)=>setApiKey(e.target.value)}
          placeholder="Paste API key"
          style={{
            padding:"10px",
            width:"400px",
            border:"2px solid orange"
          }}
        />

        <br/><br/>

        <button
          onClick={saveKey}
          style={{
            padding:"10px",
            background:"orange",
            color:"white",
            border:"none"
          }}
        >
          Save Key
        </button>

        <br/><br/>

        <select
          value={model}
          onChange={(e)=>setModel(e.target.value)}
          style={{
            padding:"10px",
            border:"2px solid orange"
          }}
        >

          <option value="gemini-2.5-flash">
            Gemini 2.5 Flash
          </option>

          <option value="gemini-2.5-flash-lite">
            Gemini Flash Lite
          </option>

          <option value="gemini-3-flash-preview">
            Gemini 3 Flash
          </option>

          <option value="gemini-3.1-pro-preview">
            Gemini 3.1 Pro
          </option>

        </select>


        <hr style={{margin:"30px 0"}}/>


        <h2>Chat</h2>

        <input
          value={message}
          onChange={(e)=>setMessage(e.target.value)}
          placeholder="Type message"
          style={{
            padding:"10px",
            width:"400px",
            border:"2px solid orange"
          }}
        />

        <br/><br/>

        <button
          onClick={sendMessage}
          style={{
            padding:"10px",
            background:"orange",
            color:"white",
            border:"none"
          }}
        >
          Send
        </button>


        <div style={{
          marginTop:"20px",
          padding:"15px",
          background:"white",
          border:"2px solid orange",
          width:"500px"
        }}>

          {reply}

        </div>

      </div>

    </div>

  );
        }
