"use client";

import { useState } from "react";

export default function Home() {

  const [active, setActive] = useState("Chat");

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

        <p>
          {active} panel will load here.
        </p>

      </div>

    </main>
  );
                }
