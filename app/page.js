function Pill({ children }) {
  return <span className="badge">{children}</span>;
}

export default function Home() {
  return (
    <main>
      <Pill>LINE Webhook · Next.js 16.1</Pill>
      <h1 style={{ fontSize: "2.6rem", margin: "16px 0 12px", letterSpacing: "-0.02em" }}>
        Backend API ready for LINE Messaging webhook
      </h1>
      <p style={{ color: "#cbd5e1", fontSize: "1.05rem", lineHeight: 1.6, maxWidth: 760 }}>
        Use the <code style={{ fontWeight: 700 }}>/api/line/webhook</code> endpoint to receive and validate LINE events with
        signature verification. Configure your channel secret and, if desired, an access token for auto-replies.
      </p>

      <section className="card section">
        <h2 style={{ margin: 0, fontSize: "1.3rem" }}>Quick start</h2>
        <ul className="list">
          <li>1. Set <code>LINE_CHANNEL_SECRET</code> (required) and <code>LINE_CHANNEL_ACCESS_TOKEN</code> (optional).</li>
          <li>2. Deploy or expose this app and point the LINE Developer webhook to <code>/api/line/webhook</code>.</li>
          <li>3. Send a message to your bot to see validated events and optional echo replies.</li>
        </ul>
        <div className="actions">
          <a
            className="btn primary"
            href="https://developers.line.biz/en/docs/messaging-api/receiving-messages/"
            target="_blank"
            rel="noreferrer"
          >
            LINE webhook guide
          </a>
          <a
            className="btn secondary"
            href="https://developers.line.biz/en/docs/messaging-api/getting-started/"
            target="_blank"
            rel="noreferrer"
          >
            Create a channel
          </a>
        </div>
      </section>
    </main>
  );
}
