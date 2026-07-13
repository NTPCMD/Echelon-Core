import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { clerkEnabled } from "../lib/clerk";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://echelonapp.net"),
  title: "Echelon — One platform. One AI. Every opportunity.",
  description:
    "Echelon is the AI operating system for local commerce. Book services, find jobs, hire freelancers, discover events, book stays, and more — all through one intelligent search.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Echelon — One platform. One AI. Every opportunity.",
    description:
      "The AI operating system for local commerce. One search for every local need.",
    url: "https://echelonapp.net",
    siteName: "Echelon",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body>
        {clerkEnabled ? (
          <ClerkProvider
            proxyUrl="/__clerk"
            signInUrl="/auth/login"
            signUpUrl="/auth/register"
            signInFallbackRedirectUrl="/auth/continue?mode=consumer&returnTo=%2Fdashboard"
            signUpFallbackRedirectUrl="/auth/continue?mode=consumer&returnTo=%2Fwelcome"
          >
            {children}
          </ClerkProvider>
        ) : (
          children
        )}
      </body>
    </html>
  );
}
