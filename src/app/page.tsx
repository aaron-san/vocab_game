import Header from "@/components/Header";
import PlayButton from "@/components/PlayButton";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function Home() {
  return (
    <div className="justify-items-center items-center gap-16 grid grid-rows-[20px_1fr_20px] p-8 sm:p-20 pb-20 min-h-screen font-sans">
      <header className="row-start-1">
        <Header />
      </header>
      <main className="flex flex-col items-center sm:items-start gap-[32px] row-start-2">
        <PlayButton />
      </main>
      <footer className="flex flex-wrap justify-center items-center gap-[24px] row-start-3">
        {" "}
      </footer>
    </div>
  );
}
