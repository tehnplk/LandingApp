import { Client, validateSignature } from "@line/bot-sdk";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_MESSAGE_LENGTH = 500;

export async function POST(request) {
  const channelSecret = process.env.LINE_CHANNEL_SECRET;
  if (!channelSecret) {
    return NextResponse.json(
      { error: "LINE_CHANNEL_SECRET is not configured" },
      { status: 500 },
    );
  }

  const signature = request.headers.get("x-line-signature");
  const rawBody = await request.text();

  if (!validateSignature(rawBody, channelSecret, signature || "")) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let payload;
  try {
    payload = JSON.parse(rawBody);
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
  }

  const events = Array.isArray(payload.events) ? payload.events : [];
  const accessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN;
  let replied = 0;

  const client = accessToken
    ? new Client({ channelAccessToken: accessToken, channelSecret })
    : null;

  if (client) {
    const replyPromises = events.map(async (event) => {
      if (
        event?.type !== "message" ||
        event.message?.type !== "text" ||
        !event.replyToken
      ) {
        return false;
      }

      const rawText = typeof event.message.text === "string" ? event.message.text : "";
      const safeText =
        // Trim control chars and angle brackets before echoing text back to LINE.
        rawText
          .replace(/[\u0000-\u001F\u007F]/g, "")
          .replace(/[<>]/g, "")
          .slice(0, MAX_MESSAGE_LENGTH) || "(empty message)";

      try {
        await client.replyMessage(event.replyToken, {
          type: "text",
          text: `Received: ${safeText}`,
        });
        return true;
      } catch {
        return false;
      }
    });

    const results = await Promise.allSettled(replyPromises);
    replied = results.filter(
      (r) => r.status === "fulfilled" && r.value === true,
    ).length;
  }

  return NextResponse.json({
    received: events.length,
    replied,
    echoReplies: Boolean(accessToken),
  });
}

export function GET() {
  return NextResponse.json(
    { message: "Use POST to send LINE webhook events to this endpoint." },
    { status: 405 },
  );
}
