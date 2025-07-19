"use client";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="bg-red-100 px-1 py-1 border-1 border-red-400 rounded-full text-red-400 text-xs active:scale-[.98] transition cursor-pointer"
    >
      ログアウト
    </button>
  );
}
