import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "Fashion Lookbook — Studio Studies", description: "A self-authored editorial lookbook of silhouette, texture, and mood studies." };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
