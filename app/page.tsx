"use client";

import { useState } from "react";

export default function Home() {

  const [active, setActive] = useState("Chat");
  const [apiKey, setApiKey] = useState("");

  return (
    <main style={{ display: "flex", height: "100vh" }}>

      <div style={{
        width: "250px",
        background: "#111",
        color: "#fff",
        padding: "20px"
      }}>

        <h2>AI Workspace</h2>

        {["Chat","Images","Files","Automations","API Keys"].map(item => (
          <div
            key={item}
            onClick={() => setActive(item)}
            style={{
              padding: "8px",
              cursor: "pointer",
              background: active === item ? "#333" : "transparent"
            }}
          >
            {item}
          </div>
        ))}

      </div>

      <div style={{ flex: 1, padding: "20px" }}>

        <h1>{active}</h1>

        {active === "API Keys" && (
          <div>

            <p>Add your OpenAI API key:</p>

            <input
              type="text"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-..."
              style={{
                padding: "10px",
                width: "300px",
                marginTop: "10px"
              }}
            />

            <br />

            <button
              style={{
                marginTop: "10px",
                padding: "10px"
              }}
              onClick={() => alert("API Key saved (temporary)")}
            >
              Save Key
            </button>

          </div>
        )}

        {active !== "API Keys" && (
          <p>{active} panel will load here.</p>
        )}

      </div>

    </main>
  );
      }
