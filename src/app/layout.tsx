"use client";
// import type { Metadata } from "next";
import { Geist, Geist_Mono, Orbitron } from "next/font/google";
import "@/styles/globals.css";
import Header from "@/components/Header";
import { SessionProvider } from "next-auth/react";
import Link from "next/link";
// import { useSession } from "next-auth/react";
// import Spinner from "@/components/Spinner";

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
  // const { data: session, status } = useSession();
  return (
    <html
      lang="en"
      // className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable}`}
      className={`${orbitron.variable}`}
    >
      {/* <body className="flex flex-col bg-[rgb(199,239,245)] min-h-screen text-primary antialiased"> */}
      <body className="flex flex-col dark:bg-primary min-h-screen text-primary dark:text-accent antialiased">
        <SessionProvider>
          <header className="">
            <Header />
          </header>
          {/* {status === "loading" ? (
            <Spinner />
          ) : ( */}
          <main className="flex-1 mx-auto mt-10 p-4 w-full max-w-4xl">
            <div className="flex justify-center gap-4 mx-4 text-sm">
              <Link
                href="/gamemenu"
                className="text-blue-500 text-center hover:underline"
              >
                ゲームメニュー
              </Link>
              <Link
                href="/leaderboard"
                className="text-blue-500 text-center hover:underline"
              >
                リーダーボードを見る
              </Link>
            </div>
            {children}
          </main>
        </SessionProvider>
      </body>
    </html>
  );
}
