"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [apiKey, setApiKey] = useState("");
  const [savedKey, setSavedKey] = useState("");
  const [model, setModel] = useState("gemini-2.5-flash");
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  // load saved key
  useEffect(() => {
    const key = localStorage.getItem("gemini_key");
    if (key) setSavedKey(key);
  }, []);

  function saveKey() {
    localStorage.setItem("gemini_key", apiKey);
    setSavedKey(apiKey);
    alert("API key saved");
  }

  async function sendMessage() {
    if (!savedKey) {
      setResponse("Enter API key first");
      return;
    }

    setResponse("Thinking...");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          apiKey: savedKey,
          model,
        }),
      });

      const data = await res.json();

      if (data.text) {
        setResponse(data.text);
      } else if (data.error) {
        setResponse(data.error);
      } else {
        setResponse("No response");
      }
    } catch {
      setResponse("Network error");
    }
  }

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Arial" }}>
      
      {/* Sidebar */}
      <div
        style={{
          width: "220px",
          background: "#ff6a00",
          color: "white",
          padding: "20px",
        }}
      >
        <h2>AI Workspace</h2>
        <p>Chat</p>
        <p>API Keys</p>
        <p>Images</p>
        <p>Files</p>
        <p>Automations</p>
      </div>

      {/* Main */}
      <div style={{ flex: 1, padding: "40px", background: "#f4f4f4" }}>
        
        <h2>Add Gemini API Key</h2>

        <input
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Paste API key"
          style={{
            padding: "10px",
            width: "400px",
            border: "2px solid #ff6a00",
            borderRadius: "6px",
          }}
        />

        <br /><br />

        <select
          value={model}
          onChange={(e) => setModel(e.target.value)}
          style={{
            padding: "10px",
            border: "2px solid #ff6a00",
            borderRadius: "6px",
          }}
        >
          <option value="gemini-2.5-flash">Gemini 2.5 Flash</option>
          <option value="gemini-2.5-flash-lite">Gemini Flash Lite</option>
          <option value="gemini-3-flash-preview">Gemini 3 Flash</option>
          <option value="gemini-3.1-pro-preview">Gemini 3.1 Pro</option>
        </select>

        <br /><br />

        <button
          onClick={saveKey}
          style={{
            padding: "10px 20px",
            background: "#ff6a00",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Save API Key
        </button>

        <hr style={{ margin: "30px 0" }} />

        <h2>Gemini Chat</h2>

        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type message"
          style={{
            padding: "10px",
            width: "400px",
            border: "2px solid #ff6a00",
            borderRadius: "6px",
          }}
        />

        <br /><br />

        <button
          onClick={sendMessage}
          style={{
            padding: "10px 20px",
            background: "#ff6a00",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Send
        </button>

        <br /><br />

        <div
          style={{
            padding: "15px",
            width: "500px",
            background: "white",
            border: "2px solid #ff6a00",
            borderRadius: "6px",
            minHeight: "60px",
          }}
        >
          {response}
        </div>

      </div>
    </div>
  );
}
