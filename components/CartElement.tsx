"use client";

// *********************
// Role: Cart icon and quantity in the header (always visible)
// Store: Khiju Store
// *********************

import React from "react";
import { FaCartShopping } from "react-icons/fa6";
import { useProductStore } from "@/app/_zustand/store";
import { useRouter } from "next/navigation";

const CartElement = () => {
  const { allQuantity } = useProductStore();
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push("/cart");
  };

  return (
    <div className="relative cursor-pointer" onClick={handleClick}>
      <FaCartShopping className="text-2xl text-black" />
      <span className="block w-6 h-6 bg-black text-white rounded-full flex justify-center items-center absolute top-[-17px] right-[-22px]">
        {allQuantity}
      </span>
    </div>
  );
};

export default CartElement;
