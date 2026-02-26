export default function Home() {
    return (
        <main style={{ display: "flex", height: "100vh", fontFamily: "Arial" }}>
              
                    {/* Sidebar */}
                          <aside
                                  style={{
                                            width: "260px",
                                                      background: "#0f172a",
                                                                color: "white",
                                                                          padding: "20px"
                                                                                  }}
                                                                                        >
                                                                                                <h2 style={{ marginBottom: "20px" }}>AI Workspace</h2>

                                                                                                        <div style={{ marginBottom: "10px" }}>💬 Chat</div>
                                                                                                                <div style={{ marginBottom: "10px" }}>🎨 Images</div>
                                                                                                                        <div style={{ marginBottom: "10px" }}>📁 Files</div>
                                                                                                                                <div style={{ marginBottom: "10px" }}>⚙ Automations</div>
                                                                                                                                        <div style={{ marginBottom: "10px" }}>🔑 API Keys</div>
                                                                                                                                                <div style={{ marginBottom: "10px" }}>⚙ Settings</div>
                                                                                                                                                      </aside>

                                                                                                                                                            {/* Main panel */}
                                                                                                                                                                  <section style={{ flex: 1, padding: "30px", background: "#f1f5f9" }}>
                                                                                                                                                                          <h1>Welcome to your Desktop AI Platform</h1>

                                                                                                                                                                                  <p style={{ marginTop: "10px" }}>
                                                                                                                                                                                            Connect your API keys and start using AI tools.
                                                                                                                                                                                                    </p>

                                                                                                                                                                                                            <div
                                                                                                                                                                                                                      style={{
                                                                                                                                                                                                                                  marginTop: "20px",
                                                                                                                                                                                                                                              padding: "20px",
                                                                                                                                                                                                                                                          background: "white",
                                                                                                                                                                                                                                                                      borderRadius: "8px"
                                                                                                                                                                                                                                                                                }}
                                                                                                                                                                                                                                                                                        >
                                                                                                                                                                                                                                                                                                  Workspace panel ready.
                                                                                                                                                                                                                                                                                                          </div>

                                                                                                                                                                                                                                                                                                                </section>

                                                                                                                                                                                                                                                                                                                    </main>
                                                                                                                                                                                                                                                                                                                      );
                                                                                                                                                                                                                                                                                                                      }
}