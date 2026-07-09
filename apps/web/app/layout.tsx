import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Echelon — One platform. One AI. Every opportunity.",
  description:
    "Echelon is the AI operating system for local commerce. Book services, find jobs, hire freelancers, discover events, reserve restaurants, and more — all through one intelligent search.",
  openGraph: {
    title: "Echelon — One platform. One AI. Every opportunity.",
    description:
      "The AI operating system for local commerce. One search for every local need.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
