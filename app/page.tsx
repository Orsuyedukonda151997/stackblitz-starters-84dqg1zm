"use client";

import { useState } from "react";

export default function Home(){

  const [apiKey,setApiKey] =
  useState("");

  const [provider,setProvider] =
  useState("gemini");

  const [model,setModel] =
  useState("gemini-2.5-flash");

  const [message,setMessage] =
  useState("");

  const [reply,setReply] =
  useState("");


  async function send(){

    setReply("Thinking...");

    const res =
      await fetch(
        "/api/chat",
        {
          method:"POST",

          headers:{
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


  return(

    <div style={{
      padding:"40px"
    }}>


      <h1>
        Multi-AI Workspace
      </h1>


      <h3>
        API Key
      </h3>

      <input
        value={apiKey}
        onChange={
          e=>setApiKey(
            e.target.value
          )
        }
        style={{
          width:"500px"
        }}
      />


      <h3>
        Provider
      </h3>

      <select
        value={provider}
        onChange={
          e=>setProvider(
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

        <option value="claude">
          Claude
        </option>

        <option value="groq">
          Groq
        </option>

      </select>


      <h3>
        Model name
      </h3>

      <input
        value={model}
        onChange={
          e=>setModel(
            e.target.value
          )
        }
        style={{
          width:"300px"
        }}
      />


      <h3>
        Message
      </h3>

      <input
        value={message}
        onChange={
          e=>setMessage(
            e.target.value
          )
        }
        style={{
          width:"500px"
        }}
      />


      <br/><br/>

      <button onClick={send}>
        Send
      </button>


      <h3>
        Reply
      </h3>

      <div>
        {reply}
      </div>


    </div>

  );

}
