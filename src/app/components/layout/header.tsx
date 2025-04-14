"use client";
import React from "react";
import { useRouter } from "next/navigation";
const Header = () => {
  const router = useRouter();

  const handleClick = (path: string) => {
    router.push(path); // 飛びたいページのパス
  };
  return (
    <header className="w-full flex justify-center bg-gray-100">
      <div className="text-red-500">test</div>
      <div className="flex flex-row justify-center items-center gap-4 bg-[#D9D9D9] w-[600px] h-[100px]">
        <div className="cursor-pointer border rounded p-4 shadow hover:shadow-lg">
          <img src="/React-icon.svg" className="w-16 h-16 bg-[#ACACAC]" />
        </div>
        <div className="cursor-pointer border rounded p-4 shadow hover:shadow-lg">
          <img src="/.svg" className="w-16 h-16" />
        </div>
        <div className="cursor-pointer border rounded p-4 shadow hover:shadow-lg">
          <img src="/React-icon.svg" className="w-16 h-16" />
        </div>
      </div>
    </header>
  );
};

export default Header;
