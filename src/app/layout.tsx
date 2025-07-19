"use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Orbitron } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { SessionProvider } from "next-auth/react";

const orbitron = Orbitron({
  subsets: ["latin"],
  // weight: ["400", "700"], // customize as needed
  variable: "--font-orbitron",
});

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   title: "Spelling Game",
//   description: "A fun and interactive spelling game for all ages",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      // className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable}`}
      className={`${orbitron.variable}`}
    >
      <body className="flex flex-col justify-center items-center bg-[rgb(199,239,245)] min-h-screen text-primary antialiased">
        <SessionProvider>
          <header className="">
            <Header />
          </header>
          <main className="flex-1 mt-10 px-4 py-8 w-full max-w-4xl">
            {children}
          </main>
        </SessionProvider>
      </body>
    </html>
  );
}
