"use client";

import { CustomButton, DashboardSidebar } from "@/components";
import { nanoid } from "nanoid";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { formatCategoryName } from "../../../../utils/categoryFormating";

const DashboardCategory = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  return (
    <div className="bg-white flex justify-start max-w-screen-2xl mx-auto min-h-screen max-xl:flex-col max-xl:gap-y-4">
      <DashboardSidebar />

      <div className="w-full px-4 xl:px-8 py-6">
        <h1 className="text-3xl font-semibold text-center mb-6 text-black">All Categories</h1>

        <div className="flex justify-end mb-5">
          <Link href="/admin/categories/new">
            <CustomButton
              buttonType="button"
              customWidth="160px"
              paddingX={10}
              paddingY={5}
              textSize="base"
              text="Add New Category"
            />
          </Link>
        </div>

        <div className="overflow-x-auto bg-[#FAF7F2] rounded-xl shadow-sm border border-[#E7E2D7]">
          <table className="min-w-full text-left table-auto">
            {/* Head */}
            <thead className="bg-black text-[#FAF7F2] text-base">
              <tr>
                <th className="p-4">
                  <input type="checkbox" className="accent-black h-4 w-4" />
                </th>
                <th className="p-4 font-medium">Name</th>
                <th className="p-4"></th>
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {categories.length > 0 ? (
                categories.map((category: Category) => (
                  <tr
                    key={nanoid()}
                    className="border-b border-[#E0E0E0] hover:bg-[#f1eeeb] transition"
                  >
                    <td className="p-4">
                      <input type="checkbox" className="accent-black h-4 w-4" />
                    </td>
                    <td className="p-4 text-black font-medium">
                      {formatCategoryName(category?.name)}
                    </td>
                    <td className="p-4 text-right">
                      <Link
                        href={`/admin/categories/${category?.id}`}
                        className="text-sm text-black border border-black px-3 py-1 rounded-md hover:bg-black hover:text-[#FAF7F2] transition"
                      >
                        Details
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="p-6 text-center text-gray-500">
                    No categories available
                  </td>
                </tr>
              )}
            </tbody>

            {/* Footer */}
            <tfoot className="bg-[#EAEAEA] text-black">
              <tr>
                <th className="p-4"></th>
                <th className="p-4">Name</th>
                <th className="p-4"></th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardCategory;
