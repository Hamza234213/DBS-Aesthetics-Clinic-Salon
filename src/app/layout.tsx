import type { Metadata } from "next";
import { Oswald, Playfair_Display, Patrick_Hand, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { siteMetadata } from "./metadata";

const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const patrick = Patrick_Hand({ subsets: ["latin"], weight: "400", variable: "--font-patrick" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = siteMetadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${oswald.variable} ${playfair.variable} ${patrick.variable} ${inter.variable}`}
    >
      <body className="min-h-screen bg-[#050505] text-[#f7f2e9] antialiased">
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
        </div>
      </body>
    </html>
  );
}