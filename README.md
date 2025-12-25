# LandingApp – Next.js 16.1 LINE Webhook

This project exposes a backend API endpoint for LINE Messaging API webhooks using Next.js 16.1.

## Getting started

1. Copy `.env.example` to `.env` and provide your credentials:
   - `LINE_CHANNEL_SECRET` (required) – from the LINE Developers Console.
   - `LINE_CHANNEL_ACCESS_TOKEN` (optional) – enable echo replies to inbound text messages.
2. Install dependencies and start the dev server:
   ```bash
   npm install
   npm run dev
   ```
3. Point your LINE webhook URL to `/api/line/webhook` on your deployment.

The endpoint validates the `x-line-signature` header with your channel secret and responds quickly with a JSON summary. When an access token is provided, it also replies to text messages with an echo message.
