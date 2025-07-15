import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import Link from "next/link";

type Props = {};

const PlayButton = (props: Props) => {
  return (
    <div className="bg-emerald-200 hover:bg-emerald-300 shadow px-4 py-2 text-2xl transition-colors cursor-pointer">
      <Link href="game-menu" className="flex items-center gap-2 text-slate-800">
        <span className="mb-1 text-3xl">Play!</span>
        {/* <FaArrowRight className="my-2" /> */}
      </Link>
    </div>
  );
};

export default PlayButton;
