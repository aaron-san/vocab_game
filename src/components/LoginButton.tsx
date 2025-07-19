"use client";
import { usePathname } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";

export default function LoginButton() {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  if (status === "loading") return null; // Wait for hydration
  // Don’t show button on login page or if user is signed in
  if (pathname === "/auth/signin" || session?.user) return null;

  return (
    <Link
      href="/auth/signin"
      className="bg-accent hover:bg-brandGreen px-2 py-1 border-2 border-teal-700 rounded-full font-bold text-teal-700 text-base active:scale-[0.98] transition cursor-pointer"
    >
      ログイン
    </Link>
  );
}
