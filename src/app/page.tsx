"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import LoginForm from "@/components/LoginForm";

export default function Home() {
  const { data: session, status } = useSession();

  // ⏳ Wait for session to load
  if (status === "loading") return null;

  // 🔐 If not logged in, show only login
  if (!session?.user) {
    return <LoginForm />;
  }

  // ✅ Authenticated view
  return (
    <div className="justify-items-center gap-16 grid grid-rows-[20px_1fr_20px] mt-4 p-8 sm:p-20 pb-20 min-h-screen font-sans">
      <main className="flex flex-col items-center sm:items-start gap-[32px] row-start-2"></main>

      <footer className="flex flex-wrap justify-center items-center gap-[24px] row-start-3">
        {/* Footer content goes here */}
      </footer>
    </div>
  );
}
