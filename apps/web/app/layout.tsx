import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "Echelon — Local commerce OS", description: "AI-powered services marketplace for premium local commerce." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
