import "./globals.css";

export const metadata = {
  title: "LandingApp | LINE Webhook with Next.js 16.1",
  description: "Next.js backend API endpoint for LINE webhook integration.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
