"use client";

import { useState } from "react";

export default function Home() {
  const [apiKey, setApiKey] = useState("");
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");

  async function sendMessage() {
    if (!apiKey) {
      setReply("Enter API key first");
      return;
    }

    setReply("Thinking...");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: message,
          apiKey: apiKey,
        }),
      });

      const data = await res.json();

      setReply(data.text || data.error || "No reply");
    } catch (err) {
      setReply("Error connecting to server");
    }
  }

  return (
    <main style={{ padding: 20 }}>

      <h2>Add Gemini API Key</h2>

      <input
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        placeholder="Paste Gemini API key"
        style={{
          width: "100%",
          padding: 10,
          border: "2px solid orange",
          marginBottom: 10,
        }}
      />

      <h2>Gemini Chat</h2>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type message"
        style={{
          width: "100%",
          padding: 10,
          border: "2px solid orange",
          marginBottom: 10,
        }}
      />

      <button
        onClick={sendMessage}
        style={{
          background: "orange",
          color: "white",
          padding: "10px 20px",
          border: "none",
        }}
      >
        Send
      </button>

      <div
        style={{
          marginTop: 20,
          padding: 10,
          border: "2px solid orange",
        }}
      >
        {reply}
      </div>

    </main>
  );
}
