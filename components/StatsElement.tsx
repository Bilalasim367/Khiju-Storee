"use client";

import React from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa6";

interface StatsElementProps {
  title: string;
  value: string;
  changePercent: number;
  isPositive: boolean;
}

const StatsElement = ({
  title,
  value,
  changePercent,
  isPositive,
}: StatsElementProps) => {
  return (
    <div className="w-80 h-32 bg-[#FAF7F2] text-black flex flex-col justify-center items-start gap-1 rounded-xl border border-[#E7E2D7] px-6 py-4 shadow-sm hover:shadow-md transition-all duration-300 max-md:w-full">
      <h4 className="text-md font-medium text-gray-600">{title}</h4>
      <p className="text-3xl font-bold">{value}</p>
      <p
        className={`flex gap-x-1 items-center text-sm font-medium ${
          isPositive ? "text-green-600" : "text-red-500"
        }`}
      >
        {isPositive ? <FaArrowUp /> : <FaArrowDown />}
        {Math.abs(changePercent)}% Since last month
      </p>
    </div>
  );
};

export default StatsElement;
