import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lumenfield AI Studio — Create with AI",
  description:
    "Generate stunning images, videos and audio with the best AI models — all in one studio.",
  openGraph: {
    title: "Lumenfield AI Studio",
    description: "Generate images, videos and audio with AI",
    siteName: "Lumenfield",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0f1113] text-white min-h-screen`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
