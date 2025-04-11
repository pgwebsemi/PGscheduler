import React from "react";

const Header = () => {
  return (
    <div className="relative w-[1280px] h-[76.08px] bg-[#D9D9D9] flex items-center">
      {/* Reactロゴ */}
      <div className="relative h-[54.32px] w-[61px] ml-[2.03%]">
        <img
          src="/React-icon.svg"
          alt="React Logo"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Todayアイコン */}
      <div className="relative h-[54.32px] w-[61px] ml-[2.03%]">
        <img
          src="/today.svg"
          alt="Today Icon"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Gmail Groupsアイコン */}
      <div className="absolute w-[91px] h-[91px] left-[728px] top-[-8px]">
        <img
          src="/gmail_groups.svg"
          alt="Gmail Groups Icon"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

export default Header;
