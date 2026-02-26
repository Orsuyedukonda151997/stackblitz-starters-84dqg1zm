export default function Home() {
  return (
    <main style={{ display: "flex", height: "100vh" }}>
      <div style={{ width: "250px", backgroundColor: "#111", color: "#fff", padding: "20px" }}>
        <h2>AI Workspace</h2>
        <p>Chat</p>
        <p>Images</p>
        <p>Files</p>
        <p>Automations</p>
        <p>API Keys</p>
      </div>

      <div style={{ flex: 1, padding: "20px" }}>
        <h1>Desktop AI Platform</h1>
        <p>System ready.</p>
      </div>
    </main>
  );
}
