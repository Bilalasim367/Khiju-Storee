"use client";

import {
  CustomButton,
  QuantityInput,
  QuantityInputCart,
  SectionTitle,
} from "@/components";
import Image from "next/image";
import React from "react";
import { FaCheck, FaClock, FaCircleQuestion, FaXmark } from "react-icons/fa6";
import { useProductStore } from "../_zustand/store";
import Link from "next/link";
import toast from "react-hot-toast";

const CartPage = () => {
  const { products, removeFromCart, calculateTotals, total } = useProductStore();

  const handleRemoveItem = (id: string) => {
    removeFromCart(id);
    calculateTotals();
    toast.success("Product removed from the cart");
  };

  return (
    <div className="bg-[#FAF7F2]">
      <SectionTitle title="Cart Page" path="Home | Cart" />
      <div className="bg-[#FAF7F2]">
        <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-[#251919] sm:text-4xl">
            Shopping Cart
          </h1>
          <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
            <section aria-labelledby="cart-heading" className="lg:col-span-7">
              <h2 id="cart-heading" className="sr-only">
                Items in your shopping cart
              </h2>
              <ul role="list" className="divide-y divide-[#EADBC8] border-b border-t border-[#EADBC8]">
                {products.map((product) => (
                  <li key={product.id} className="flex py-6 sm:py-10">
                    <div className="flex-shrink-0">
                      <Image
                        width={192}
                        height={192}
                        src={product?.image ? `/${product.image}` : "/product_placeholder.jpg"}
                        alt="product image"
                        className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                      <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                        <div>
                          <div className="flex justify-between">
                            <h3 className="text-sm">
                              <Link href={`#`} className="font-medium text-[#251919] hover:text-black">
                                {product.title}
                              </Link>
                            </h3>
                          </div>
                          <p className="mt-1 text-sm font-medium text-[#251919]">
                            ${product.price}
                          </p>
                        </div>

                        <div className="mt-4 sm:mt-0 sm:pr-9">
                          <QuantityInputCart product={product} />
                          <div className="absolute right-0 top-0">
                            <button
                              onClick={() => handleRemoveItem(product.id)}
                              type="button"
                              className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-700"
                            >
                              <span className="sr-only">Remove</span>
                              <FaXmark className="h-5 w-5" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>

                      <p className="mt-4 flex space-x-2 text-sm text-[#251919]">
                        <FaCheck className="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
                        <span>In stock</span>
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* Order summary */}
            <section
              aria-labelledby="summary-heading"
              className="mt-16 rounded-2xl bg-white border border-[#EADBC8] px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8 shadow-sm"
            >
              <h2 id="summary-heading" className="text-lg font-medium text-[#251919]">
                Order summary
              </h2>

              <dl className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-[#5D5A58]">Subtotal</dt>
                  <dd className="text-sm font-medium text-[#251919]">${total}</dd>
                </div>
                <div className="flex items-center justify-between border-t border-[#EADBC8] pt-4">
                  <dt className="flex items-center text-sm text-[#5D5A58]">
                    <span>Shipping estimate</span>
                    <a href="#" className="ml-2 flex-shrink-0 text-[#B0A9A4] hover:text-[#251919]">
                      <span className="sr-only">Learn more about how shipping is calculated</span>
                      <FaCircleQuestion className="h-5 w-5" aria-hidden="true" />
                    </a>
                  </dt>
                  <dd className="text-sm font-medium text-[#251919]">$5.00</dd>
                </div>
                <div className="flex items-center justify-between border-t border-[#EADBC8] pt-4">
                  <dt className="flex text-sm text-[#5D5A58]">
                    <span>Tax estimate</span>
                    <a href="#" className="ml-2 flex-shrink-0 text-[#B0A9A4] hover:text-[#251919]">
                      <span className="sr-only">Learn more about how tax is calculated</span>
                      <FaCircleQuestion className="h-5 w-5" aria-hidden="true" />
                    </a>
                  </dt>
                  <dd className="text-sm font-medium text-[#251919]">${total / 5}</dd>
                </div>
                <div className="flex items-center justify-between border-t border-[#EADBC8] pt-4">
                  <dt className="text-base font-bold text-[#251919]">Order total</dt>
                  <dd className="text-base font-bold text-[#251919]">
                    ${total === 0 ? 0 : Math.round(total + total / 5 + 5)}
                  </dd>
                </div>
              </dl>
              {products.length > 0 && (
                <div className="mt-6">
                  <Link
                    href="/checkout"
                    className="block text-center w-full uppercase bg-[#FAF7F2] px-4 py-3 text-base border border-[#251919] font-semibold text-[#251919] shadow hover:bg-[#251919] hover:text-[#FAF7F2] transition"
                  >
                    Checkout
                  </Link>
                </div>
              )}
            </section>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CartPage;