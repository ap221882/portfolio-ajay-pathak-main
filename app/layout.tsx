import "./globals.css";

import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "next-themes";
import { Geist, Geist_Mono } from "next/font/google";

import ThreeDBackground from "@/components/ui/ThreeDBg";

import { Footer } from "./footer";
import { Header } from "./header";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: "Ajay Pathak - centers div for paycheck",
  description:
    "Ajay is a frontend engineer with years of experience in building scalable frontend projects",
};

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geist.variable} ${geistMono.variable} bg-white tracking-tight antialiased dark:bg-zinc-950`}
      >
        <div style={{ width: "100vw", height: "100%", position: "relative" }}>
          <ThemeProvider
            enableSystem={true}
            attribute="class"
            storageKey="theme"
            defaultTheme="system"
          >
            <ThreeDBackground />
            <div className="flex min-h-screen w-full flex-col font-[family-name:var(--font-inter-tight)]">
              <div className="relative mx-auto w-full max-w-screen-sm flex-1 px-4 pt-20">
                <Header />
                {children}
                <Footer />
              </div>
            </div>
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
