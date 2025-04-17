"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
const Header = () => {
  const router = useRouter();
  const handleClick = (path: string) => {
    router.push(path);
  };
  return (
    <header className="w-full flex flex-row justify-between items-center bg-[#D9D9D9] px-4">
      <div>
        <Image src="/React-icon.svg" alt="react Icon" width={64} height={64} />
      </div>

      <div className="flex flex-row justify-center items-center gap-4">
        <button
          className="cursor-pointer rounded p-4 hover:bg-black/5"
          onClick={() => handleClick("/dashboard")}
        >
          <Image
            src="/chart-line.svg"
            alt="chart-line Icon"
            width={64}
            height={64}
          />
        </button>
        <button
          className="cursor-pointer rounded p-4 hover:bg-black/5"
          onClick={() => handleClick("/calendar")}
        >
          <Image
            src="/calendar.svg"
            alt="calendar Icon"
            width={64}
            height={64}
          />
        </button>
        <button
          className="cursor-pointer rounded p-4 hover:bg-black/5"
          onClick={() => handleClick("/menber")}
        >
          <Image src="/users.svg" alt="users Icon" width={64} height={64} />
        </button>
      </div>

      <div>
        <button
          className="cursor-pointer rounded p-4 hover:bg-black/5"
          onClick={() => handleClick("/login")}
        >
          <Image src="/key.svg" alt="users Icon" width={64} height={64} />
        </button>
      </div>
    </header>
  );
};

export default Header;
