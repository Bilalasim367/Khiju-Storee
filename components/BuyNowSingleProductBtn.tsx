"use client";

// *********************
// Role: Buy Now button — adds to cart and redirects to checkout
// Store: Khiju Store (Theme: Beige, Black, #FAF7F2)
// *********************

import { useProductStore } from "@/app/_zustand/store";
import React from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const BuyNowSingleProductBtn = ({
  product,
  quantityCount,
}: SingleProductBtnProps) => {
  const router = useRouter();
  const { addToCart, calculateTotals } = useProductStore();

  const handleBuyNow = () => {
    addToCart({
      id: product?.id.toString(),
      title: product?.title,
      price: product?.price,
      image: product?.mainImage,
      amount: quantityCount,
    });
    calculateTotals();
    toast.success("Product added to cart. Redirecting to checkout...");
    router.push("/checkout");
  };

  return (
    <button
      onClick={handleBuyNow}
      className="w-[200px] max-[500px]:w-full text-lg font-medium uppercase tracking-wide border border-black bg-black text-[#FAF7F2] py-2 px-6 rounded-md transition-all duration-300 hover:bg-[#FAF7F2] hover:text-black hover:shadow-md hover:scale-105"
    >
      Buy Now
    </button>
  );
};

export default BuyNowSingleProductBtn;
