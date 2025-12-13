import React from "react";
import { Link } from "react-router";
import { TbHexagonLetterA } from "react-icons/tb";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2 select-none">
      {/* icon */}
      <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-secondary/10 transition">
        <TbHexagonLetterA
          size={26}
          className="text-primary hover:scale-110 transition"
        />
      </div>

      {/* text */}
      <div className="leading-tight">
        <h1 className="text-xl md:text-2xl font-extrabold tracking-wide">
          Asset
          <span className="text-secondary">Verse</span>
        </h1>
        <p className="text-[10px] md:text-xs text-gray-500 tracking-widest uppercase">
          Asset Management
        </p>
      </div>
    </Link>
  );
};

export default Logo;
