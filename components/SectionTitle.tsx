import React from "react";

const SectionTitle = ({ title, path }: { title: string; path: string }) => {
  return (
    <div className="relative h-[220px] sm:h-[260px] flex flex-col justify-center items-center overflow-hidden">
      {/* Soft Background Gradient for Silk Feel */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F2ECE6] to-[#F9F6F1] z-[-2]" />

      {/* White Blur Overlay */}
      <div className="absolute inset-0 bg-white/50 backdrop-blur-md z-[-1]" />

      {/* Text Content */}
      <div className="relative text-center px-6 animate-fadeIn">
        <h1 className="text-4xl sm:text-5xl font-bold text-[#3B3A36] tracking-wide mb-2 drop-shadow-sm">
          <span className="bg-gradient-to-r from-[#B89D74] to-[#D9C7A1] bg-clip-text text-transparent">
            {title}
          </span>
        </h1>
        <p className="text-md sm:text-lg text-[#998F81] tracking-wide">
          {path}
        </p>
      </div>
    </div>
  );
};

export default SectionTitle;
