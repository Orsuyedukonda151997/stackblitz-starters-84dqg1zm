"use client";

import { useState } from "react";

export default function Home() {

  const providerModels: any = {

    gemini: [
      "gemini-2.5-flash",
      "gemini-3-flash-preview",
      "gemini-3.1-pro-preview"
    ],

    openai: [
      "gpt-4o-mini",
      "gpt-4o",
      "gpt-3.5-turbo"
    ],

    groq: [
      "llama3-70b-8192",
      "llama3-8b-8192",
      "mixtral-8x7b-32768"
    ],

    openrouter: [
      "deepseek/deepseek-chat",
      "mistralai/mixtral-8x7b-instruct",
      "meta-llama/llama-3-70b-instruct"
    ],

    claude: [
      "claude-3-haiku-20240307",
      "claude-3-sonnet-20240229",
      "claude-3-5-sonnet-20241022"
    ]

  };


  const [apiKey, setApiKey] = useState("");

  const [provider, setProvider] = useState("gemini");

  const [model, setModel] =
    useState(providerModels.gemini[0]);

  const [message, setMessage] = useState("");

  const [reply, setReply] = useState("");



  function changeProvider(p: string) {

    setProvider(p);

    setModel(
      providerModels[p][0]
    );

  }



  async function send() {

    if (!apiKey) {
      setReply("Enter API key");
      return;
    }

    setReply("Thinking...");

    const res =
      await fetch(
        "/api/chat",
        {
          method: "POST",

          headers: {
            "Content-Type":
            "application/json"
          },

          body:
          JSON.stringify({

            apiKey,
            provider,
            model,
            message

          })

        }
      );

    const data =
      await res.json();

    setReply(data.text);

  }



  return (

    <div style={{
      display: "flex",
      height: "100vh"
    }}>



      {/* sidebar */}

      <div style={{
        width: "240px",
        background: "#ff6a00",
        color: "white",
        padding: "20px"
      }}>

        <h2>AI Workspace</h2>

        <p>Chat</p>
        <p>Models</p>
        <p>API Keys</p>

      </div>



      {/* main */}

      <div style={{
        flex: 1,
        padding: "40px",
        background: "#f4f4f4"
      }}>



        <h2>Setup</h2>


        API Key

        <br/>

        <input

          value={apiKey}

          onChange={

            e =>
            setApiKey(
              e.target.value
            )

          }

          style={{
            width: "500px",
            padding: "10px"
          }}

        />


        <br/><br/>


        Provider

        <br/>

        <select

          value={provider}

          onChange={

            e =>
            changeProvider(
              e.target.value
            )

          }

        >

          <option value="gemini">
            Gemini
          </option>

          <option value="openai">
            OpenAI
          </option>

          <option value="groq">
            Groq
          </option>

          <option value="openrouter">
            OpenRouter
          </option>

          <option value="claude">
            Claude
          </option>

        </select>



        <br/><br/>


        Model

        <br/>

        <select

          value={model}

          onChange={

            e =>
            setModel(
              e.target.value
            )

          }

        >

          {

            providerModels[provider]
            .map(

              (m: string) => (

                <option key={m} value={m}>

                  {m}

                </option>

              )

            )

          }

        </select>



        <br/><br/>


        Message

        <br/>

        <input

          value={message}

          onChange={

            e =>
            setMessage(
              e.target.value
            )

          }

          style={{
            width: "600px",
            padding: "10px"
          }}

        />


        <br/><br/>


        <button
          onClick={send}
        >
          Send
        </button>



        <br/><br/>


        <div style={{
          background: "white",
          padding: "20px",
          width: "600px",
          minHeight: "100px"
        }}>

          {reply}

        </div>



      </div>

    </div>

  );

}
