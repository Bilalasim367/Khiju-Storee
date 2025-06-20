"use client";

import { DashboardSidebar } from "@/components";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { convertCategoryNameToURLFriendly } from "../../../../../utils/categoryFormating";

const DashboardNewCategoryPage = () => {
  const [categoryInput, setCategoryInput] = useState({
    name: "",
  });

  const addNewCategory = () => {
    if (categoryInput.name.trim().length > 0) {
      const requestOptions = {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: convertCategoryNameToURLFriendly(categoryInput.name),
        }),
      };

      fetch(`http://localhost:3001/api/categories`, requestOptions)
        .then((response) => {
          if (response.status === 201) {
            return response.json();
          } else {
            throw Error("There was an error while creating category");
          }
        })
        .then(() => {
          toast.success("Category added successfully");
          setCategoryInput({ name: "" });
        })
        .catch(() => {
          toast.error("There was an error while creating category");
        });
    } else {
      toast.error("Please enter a category name");
    }
  };

  return (
    <div className="bg-[#FAF7F2] flex justify-start max-w-screen-2xl mx-auto min-h-screen max-xl:flex-col max-xl:gap-y-6">
      <DashboardSidebar />

      <div className="flex flex-col gap-y-8 w-full px-6 py-10 xl:pl-10">
        <h1 className="text-4xl font-bold text-black mb-2">Add New Category</h1>

        <div className="bg-white shadow-md border border-[#E7E2D7] rounded-2xl p-8 max-w-lg w-full">
          <label className="block mb-5">
            <span className="block text-lg font-medium text-black mb-2">
              Category Name
            </span>
            <input
              type="text"
              value={categoryInput.name}
              onChange={(e) =>
                setCategoryInput({ ...categoryInput, name: e.target.value })
              }
              placeholder="Enter category name"
              className="w-full px-4 py-3 border border-[#D6D6D6] rounded-xl focus:outline-none focus:ring-2 focus:ring-black text-black bg-[#FAF7F2] placeholder-gray-400"
            />
          </label>

          <button
            onClick={addNewCategory}
            className="mt-4 w-full bg-black text-[#FAF7F2] py-3 text-lg font-semibold rounded-xl hover:bg-[#333] transition"
          >
            Create Category
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardNewCategoryPage;
