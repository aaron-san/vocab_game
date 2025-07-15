import Link from "next/link";
import React from "react";

type Props = {};

const Header = (props: Props) => {
  return (
    <div className="top-0 left-0 absolute mt-10 mb-20 px-4 py-2 w-full text-slate-700 text-4xl text-center">
      <Link href="/">VB ゲーム</Link>
    </div>
  );
};

export default Header;
