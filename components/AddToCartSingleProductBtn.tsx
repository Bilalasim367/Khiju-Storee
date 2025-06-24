"use client";

import React from "react";
import { useProductStore } from "@/app/_zustand/store";
import toast from "react-hot-toast";

const AddToCartSingleProductBtn = ({ product, quantityCount } : SingleProductBtnProps) => {
  const { addToCart, calculateTotals } = useProductStore();

  const handleAddToCart = () => {

    addToCart({
      id: product?.id.toString(),
      title: product?.title,
      price: product?.price,
      image: product?.mainImage,
      amount: quantityCount
    });
    calculateTotals();
    toast.success("Product added to the cart");
  };

  return (
    <button
      onClick={handleAddToCart}
      className="w-[200px] max-[500px]:w-full text-lg border border-black font-semibold bg-[#FAF7F2] text-black hover:bg-black hover:text-[#FAF7F2] transition-all duration-200 ease-in uppercase rounded-md py-2 shadow-sm"
    >
      Add to cart
    </button>
  );
};

export default AddToCartSingleProductBtn;
