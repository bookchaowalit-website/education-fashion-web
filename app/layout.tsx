import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

// The font variable sits on <html>: the Reader shell tokens live on :root and read it from there.
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

const description = "A self-authored editorial lookbook of silhouette, texture, and mood studies.";

export const metadata: Metadata = {
  metadataBase: new URL("https://fashion.bookchaowalit.com"),
  title: "Fashion Lookbook — Studio Studies",
  description,
  alternates: { canonical: "/" },
  openGraph: { type: "website", url: "/", siteName: "Fashion Lookbook", title: "Fashion Lookbook — Studio Studies", description },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={geistSans.variable}>
      <body>{children}</body>
    </html>
  );
}
