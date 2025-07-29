"use client";
// import alphabetImage from "../../public/images/alphabet1.png"; // static import
import Spinner from "@/components/Spinner";

// import Link from "next/link";
import { useSession } from "next-auth/react";
import LoginForm from "@/components/LoginForm";
import Image from "next/image";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex justify-center w-screen h-screen">
        <Spinner />
      </div>
    );
  }

  // 🔐 If not logged in, show only login
  if (!session?.user) {
    return <LoginForm />;
  }

  // Authenticated view
  return (
    <div className="mt-4 p-8 sm:p-20 pb-20 min-h-screen font-sans">
      {/* <main className="flex flex-col items-center sm:items-start gap-[32px] row-start-2"></main> */}
      {/* <Image
        src={alphabetImage}
        alt="Alphabet Graphic"
        width={1024 * 0.2}
        height={1536 * 0.2}
        // layout="intrinsic" // Maintains aspect ratio
        placeholder="blur"
        className="shadow rounded-xl"
      /> */}

      <footer className="flex flex-wrap justify-center items-center gap-[24px] row-start-3">
        {/* Footer content goes here */}
      </footer>
    </div>
  );
}
