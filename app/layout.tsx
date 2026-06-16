import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const siteTitle = "Lumenfield AI Studio";
const siteDescription =
  "Lumenfield AI Studio is an AI creative studio for generating cinematic images, videos, ads, and visual content.";

export const metadata: Metadata = {
  applicationName: siteTitle,
  title: siteTitle,
  description: siteDescription,
  keywords: ["Lumenfield AI Studio", "Lumenfield", "AI studio", "image generation", "video generation", "AI marketing"],
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    siteName: siteTitle,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
  creator: siteTitle,
  publisher: siteTitle,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = (
    <html lang="en">
      <body className="bg-black text-white antialiased">{children}</body>
    </html>
  );

  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (!publishableKey) {
    return content;
  }

  return <ClerkProvider publishableKey={publishableKey}>{content}</ClerkProvider>;
}
