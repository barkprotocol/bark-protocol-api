import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "BARK Protocol API",
  description: "The official API documentation for BARK, enabling seamless interaction with the BARK Protocol ecosystem.",
  author: "BARK Protocol Team",
  keywords: "BARK Protocol, API, blockchain, Solana, NFT staking, rewards",
  openGraph: {
    title: "BARK Protocol API",
    description: "The official API documentation for BARK Protocol.",
    url: "https://doc.barkprotocol.net",
    image: "/og-image.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "BARK Protocol API",
    description: "Explore the BARK Protocol API documentation.",
    image: "/og-image.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
