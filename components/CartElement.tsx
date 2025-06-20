"use client";

// *********************
// Role of the component: Cart icon and quantity displayed in the header
// Updated: Hides icon if user is not logged in
// *********************

import React from "react";
import { FaCartShopping } from "react-icons/fa6";
import { useProductStore } from "@/app/_zustand/store";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const CartElement = () => {
  const { allQuantity } = useProductStore();
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push("/cart");
  };

  // Don't render if not logged in or session is loading
  if (status !== "authenticated") return null;

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
