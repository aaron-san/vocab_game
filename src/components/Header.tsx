"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import LogoutButton from "./LogoutButton";
import { motion } from "framer-motion";
import SpellingGameLogo from "@/components/SpellingGameLogo";

type Props = {};

const Header = (props: Props) => {
  const { data: session, status } = useSession();

  // if (status === "loading") return <p>Loading...</p>;
  return (
    // <div className="top-0 left-0 z-max absolute flex justify-between bg-stone-100 shadow-lg mb-20 px-4 py-2 w-full font-orbitron text-slate-700 text-xl">
    <div className="top-0 left-0 z-max absolute flex justify-between bg-stone-800 shadow-lg mb-20 px-4 py-2 w-full font-orbitron text-stone-50 text-xl">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Link href="/">
          <div className="w-[200px] h-[30px]">
            <SpellingGameLogo className="" />
          </div>
        </Link>
      </motion.div>
      {session?.user?.name && (
        <div className="flex items-center gap-2 rounded text-xl">
          <div>ようこそ, {session.user.name}!</div>
          <LogoutButton />
        </div>
      )}
    </div>
  );
};

export default Header;
