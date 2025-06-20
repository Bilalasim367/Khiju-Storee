"use client";

import React from "react";

interface CustomButtonProps {
  text: string;
  buttonType: "submit" | "reset" | "button";
  customWidth?: string; // e.g., "w-full" or "w-auto"
  textSize?: string; // e.g., "text-base"
  background?: string;
  hoverBackground?: string;
  textColor?: string;
  padding?: string;
  className?: string;
  disabled?: boolean;
}

const CustomButton = ({
  text,
  buttonType,
  customWidth = "w-auto",
  textSize = "text-base",
  background = "bg-[#FAF7F2]",
  hoverBackground = "hover:bg-black",
  textColor = "text-black",
  padding,
  paddingX,
  paddingY,
  className = "",
  disabled = false,
}: CustomButtonProps & { paddingX?: number; paddingY?: number }) => {
  const finalPadding = padding
    ? padding
    : `px-${paddingX || 4} py-${paddingY || 2}`;

  return (
    <button
      type={buttonType}
      disabled={disabled}
      className={`
        uppercase
        ${customWidth}
        ${background}
        ${hoverBackground}
        ${textColor}
        ${finalPadding}
        ${textSize}
        border border-black
        rounded-2xl
        font-semibold
        shadow-md
        hover:text-[#FAF7F2]
        focus:outline-none focus:ring-2 focus:ring-black
        transition-all duration-200 ease-in-out
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {text}
    </button>
  );
};

export default CustomButton;
