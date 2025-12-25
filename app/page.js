export default function Home() {
  return (
    <main>
      <div className="hero">
        <span className="badge">LINE Webhook · Next.js 16.1</span>
        <h1>
          Connect your LINE Bot <br />
          to the modern web
        </h1>
        <p>
          A production-ready backend API for LINE Messaging webhooks. 
          Secure, scalable, and ready for your next AI agent or chatbot.
        </p>
        <div className="actions">
          <a
            className="btn primary"
            href="https://developers.line.biz/en/docs/messaging-api/receiving-messages/"
            target="_blank"
            rel="noreferrer"
          >
            View Documentation
          </a>
          <a
            className="btn secondary"
            href="https://developers.line.biz/en/docs/messaging-api/getting-started/"
            target="_blank"
            rel="noreferrer"
          >
            Create Channel
          </a>
        </div>
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700 }}>Quick Start Guide</h2>
          <code>/api/line/webhook</code>
        </div>
        
        <div className="grid">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Configure</h3>
            <p>
              Set <code>LINE_CHANNEL_SECRET</code> and <code>LINE_CHANNEL_ACCESS_TOKEN</code> in your environment variables.
            </p>
          </div>
          
          <div className="step">
            <div className="step-number">2</div>
            <h3>Deploy</h3>
            <p>
              Expose your application and point the LINE Developer webhook URL to your endpoint.
            </p>
          </div>
          
          <div className="step">
            <div className="step-number">3</div>
            <h3>Interact</h3>
            <p>
              Send a message to your bot. The API will validate the signature and echo back your text.
            </p>
          </div>
        </div>
      </div>

      <footer style={{ marginTop: '80px', textAlign: 'center', color: '#64748b', fontSize: '0.875rem' }}>
        Built with Next.js and LINE Bot SDK
      </footer>
    </main>
  );
}

