"use client";

import { useState } from "react";

export default function Home() {

  const providers:any = {

    gemini: [
      "gemini-2.5-flash",
      "gemini-2.5-flash-lite",
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

    claude: [
      "claude-3-haiku-20240307",
      "claude-3-sonnet-20240229"
    ]

  };



  const [provider,setProvider] = useState("gemini");

  const [model,setModel] = useState(providers.gemini[0]);

  const [apiKey,setApiKey] = useState("");

  const [message,setMessage] = useState("");

  const [reply,setReply] = useState("");



  function changeProvider(p:any){

    setProvider(p);

    setModel(providers[p][0]);

  }



  async function send(){

    if(!apiKey){
      setReply("Enter API key first");
      return;
    }

    setReply("Thinking...");

    const res =
      await fetch("/api/chat",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          provider,
          model,
          apiKey,
          message
        })
      });

    const data = await res.json();

    setReply(data.text);

  }



  return(

    <div style={{
      display:"flex",
      height:"100vh",
      fontFamily:"Arial"
    }}>



      {/* sidebar */}

      <div style={{
        width:"240px",
        background:"#ff6a00",
        color:"white",
        padding:"20px"
      }}>

        <h2>AI Workspace</h2>

        <p>Chat</p>
        <p>API Keys</p>
        <p>Images</p>
        <p>Files</p>
        <p>Automation</p>

      </div>



      {/* main */}

      <div style={{
        flex:1,
        padding:"40px",
        background:"#f4f4f4"
      }}>



        <h2>API Setup</h2>


        {/* api key */}

        <input

          value={apiKey}

          onChange={e=>setApiKey(e.target.value)}

          placeholder="Paste API key"

          style={{
            width:"500px",
            padding:"10px",
            border:"2px solid orange"
          }}

        />


        <br/><br/>


        {/* provider */}

        <select

          value={provider}

          onChange={e=>changeProvider(e.target.value)}

          style={{
            padding:"10px",
            border:"2px solid orange"
          }}

        >

          <option value="gemini">Google Gemini</option>

          <option value="openai">OpenAI</option>

          <option value="groq">Groq</option>

          <option value="claude">Claude</option>

        </select>



        <br/><br/>


        {/* model */}

        <select

          value={model}

          onChange={e=>setModel(e.target.value)}

          style={{
            padding:"10px",
            border:"2px solid orange"
          }}

        >

          {

            providers[provider].map((m:any)=>(

              <option key={m} value={m}>

                {m}

              </option>

            ))

          }

        </select>



        <br/><br/>



        <h3>Chat</h3>


        <input

          value={message}

          onChange={e=>setMessage(e.target.value)}

          placeholder="Type message"

          style={{
            width:"600px",
            padding:"12px",
            border:"2px solid orange"
          }}

        />


        <br/><br/>


        <button

          onClick={send}

          style={{
            background:"#ff6a00",
            color:"white",
            padding:"12px 25px",
            border:"none",
            cursor:"pointer"
          }}

        >

          Send

        </button>


        <br/><br/>


        <div style={{
          background:"white",
          padding:"20px",
          border:"2px solid orange",
          width:"600px",
          minHeight:"120px"
        }}>

          {reply}

        </div>



      </div>


    </div>

  );

}
