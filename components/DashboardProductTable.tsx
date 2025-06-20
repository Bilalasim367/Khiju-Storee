"use client";

import { nanoid } from "nanoid";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import CustomButton from "./CustomButton";

const DashboardProductTable = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/products?mode=admin", {
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="w-full px-4 max-w-screen-2xl mx-auto">
      <h1 className="text-3xl font-semibold text-center mb-6 text-black">
        All Products ({products.length})
      </h1>

      <div className="flex justify-end mb-5">
      <Link href="/admin/products/new">
  <CustomButton
    buttonType="button"
    customWidth="w-[160px]"
    padding="px-6 py-3"
    textSize="text-base"
    text="Add New Product"
  />
</Link>

      </div>

      <div className="w-full max-w-full overflow-x-auto rounded-xl border border-[#EDEDED] bg-[#FAF7F2] shadow-sm">
        <table className="min-w-[700px] w-full table-auto">
          {/* Table Header */}
          <thead className="bg-black text-[#FAF7F2] sticky top-0 z-10 text-left">
            <tr>
              <th className="p-4">
                <input type="checkbox" className="accent-black h-4 w-4" />
              </th>
              <th className="p-4 font-semibold">Product</th>
              <th className="p-4 font-semibold">Stock</th>
              <th className="p-4 font-semibold">Price</th>
              <th className="p-4"></th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr
                  key={nanoid()}
                  className="border-b border-[#E0E0E0] hover:bg-[#f1eeeb] transition-colors duration-200"
                >
                  <td className="p-4">
                    <input type="checkbox" className="accent-black h-4 w-4" />
                  </td>

                  <td className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 overflow-hidden rounded-md border border-[#D6D6D6] bg-white">
                        <Image
                          src={
                            product?.mainImage
                              ? `/${product?.mainImage}`
                              : "/product_placeholder.jpg"
                          }
                          alt="Product"
                          width={48}
                          height={48}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-black">
                          {product?.title}
                        </p>
                        <p className="text-sm text-gray-500">
                          {product?.manufacturer}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="p-4">
                    {product?.inStock ? (
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
                        In Stock
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-700">
                        Out of Stock
                      </span>
                    )}
                  </td>

                  <td className="p-4 text-black font-medium">
                    ${product?.price}
                  </td>

                  <td className="p-4">
                    <Link
                      href={`/admin/products/${product.id}`}
                      className="text-sm text-black border border-black px-3 py-1 rounded-md hover:bg-black hover:text-[#FAF7F2] transition"
                    >
                      Details
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-6 text-center text-gray-500">
                  No products available
                </td>
              </tr>
            )}
          </tbody>

          {/* Table Footer */}
          <tfoot className="bg-[#EAEAEA] sticky bottom-0">
            <tr>
              <th className="p-4"></th>
              <th className="p-4">Product</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Price</th>
              <th className="p-4"></th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default DashboardProductTable;
