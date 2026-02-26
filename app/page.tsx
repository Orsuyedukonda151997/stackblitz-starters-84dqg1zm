"use client";

import { useState } from "react";
import { supabase } from "./supabase";

export default function Home() {

  const [active, setActive] = useState("Chat");
  const [apiKey, setApiKey] = useState("");

  async function saveApiKey() {

    if (!apiKey) {
      alert("Enter API key first");
      return;
    }

    const { error } = await supabase
      .from("api_keys")
      .insert([
        {
          user_id: "demo-user",
          api_key: apiKey
        }
      ]);

    if (error) {
      alert("Error saving key");
      console.log(error);
    } else {
      alert("API key saved successfully");
      setApiKey("");
    }

  }

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

            <p>Enter your API key:</p>

            <input
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-..."
              style={{
                padding: "10px",
                width: "300px"
              }}
            />

            <br />

            <button
              onClick={saveApiKey}
              style={{
                marginTop: "10px",
                padding: "10px",
                cursor: "pointer"
              }}
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
