import crypto from "crypto";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const LINE_REPLY_ENDPOINT = "https://api.line.me/v2/bot/message/reply";
const MAX_MESSAGE_LENGTH = 500;

function verifySignature(secret, body, signature) {
  if (!signature) return false;
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(body);
  const digestBuffer = hmac.digest();
  const signatureBuffer = Buffer.from(signature, "base64");
  if (signatureBuffer.length !== digestBuffer.length) {
    return false;
  }
  return crypto.timingSafeEqual(digestBuffer, signatureBuffer);
}

async function sendTextReply(replyToken, text, accessToken) {
  const res = await fetch(LINE_REPLY_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      replyToken,
      messages: [{ type: "text", text }],
    }),
  });

  if (!res.ok) {
    console.warn(
      "[line-webhook] Reply failed",
      res.status,
      res.statusText,
    );
  }

  return res.ok;
}

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

  if (!verifySignature(channelSecret, rawBody, signature)) {
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

  if (accessToken) {
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
        rawText.replace(/\p{C}/gu, "").slice(0, MAX_MESSAGE_LENGTH) || "(empty message)";

      try {
        return await sendTextReply(
          event.replyToken,
          `Received: ${safeText}`,
          accessToken,
        );
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
