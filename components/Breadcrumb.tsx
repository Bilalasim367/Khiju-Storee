// *********************
// Role of the component: Displays current page location
// Theme: Khiju Store (Beige, Black, #FAF7F2)
// *********************

import Link from "next/link";
import React from "react";
import { FaHouse } from "react-icons/fa6";

const Breadcrumb = () => {
  return (
    <div className="text-base md:text-lg py-5 max-sm:text-sm bg-[#FAF7F2] px-4 rounded-md shadow-sm">
      <ul className="flex items-center gap-2 text-black">
        <li className="flex items-center gap-1">
          <Link href="/" className="flex items-center gap-1 hover:underline">
            <FaHouse className="text-lg" />
            <span className="font-medium">Home</span>
          </Link>
          <span className="mx-2 text-gray-400">/</span>
        </li>

        <li>
          <Link href="/shop" className="hover:underline text-gray-700">
            Shop
          </Link>
          <span className="mx-2 text-gray-400">/</span>
        </li>

        <li>
          <Link href="/shop" className="hover:underline text-gray-500">
            All Products
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Breadcrumb;
