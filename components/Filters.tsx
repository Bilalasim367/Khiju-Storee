// *********************
// Role of the component: Filters on shop page
// Name of the component: Filters.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <Filters />
// Input parameters: no input parameters
// Output: stock, rating and price filter
// *********************

"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useSortStore } from "@/app/_zustand/sortStore";
import { usePaginationStore } from "@/app/_zustand/paginationStore";

interface InputCategory {
  inStock: { text: string; isChecked: boolean };
  outOfStock: { text: string; isChecked: boolean };
  priceFilter: { text: string; value: number };
  ratingFilter: { text: string; value: number };
}

const Filters = () => {
  const pathname = usePathname();
  const { replace } = useRouter();
  const { page } = usePaginationStore();
  const { sortBy } = useSortStore();

  const [inputCategory, setInputCategory] = useState<InputCategory>({
    inStock: { text: "instock", isChecked: true },
    outOfStock: { text: "outofstock", isChecked: true },
    priceFilter: { text: "price", value: 3000 },
    ratingFilter: { text: "rating", value: 0 },
  });

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("outOfStock", inputCategory.outOfStock.isChecked.toString());
    params.set("inStock", inputCategory.inStock.isChecked.toString());
    params.set("rating", inputCategory.ratingFilter.value.toString());
    params.set("price", inputCategory.priceFilter.value.toString());
    params.set("sort", sortBy);
    params.set("page", page.toString());
    replace(`${pathname}?${params}`);
  }, [inputCategory, sortBy, page]);

  return (
    <div className="p-5 border border-[#e4e4e4] rounded-lg shadow-sm bg-[#FAF7F2] text-black">
      <h3 className="text-2xl font-semibold mb-4">Filters</h3>
      <div className="mb-6">
        <h4 className="text-lg font-medium mb-2">Availability</h4>
        {["inStock", "outOfStock"].map((key) => {
          const typedKey = key as "inStock" | "outOfStock";
          const isChecked = inputCategory[typedKey].isChecked;

          return (
            <label key={key} className="flex items-center gap-2 mb-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                className="checkbox checkbox-primary"
                checked={isChecked}
                onChange={() =>
                  setInputCategory((prev) => ({
                    ...prev,
                    [typedKey]: {
                      ...prev[typedKey],
                      isChecked: !prev[typedKey].isChecked,
                    },
                  }))
                }
              />
              <span>{key === "inStock" ? "In Stock" : "Out of Stock"}</span>
            </label>
          );
        })}
      </div>

      <div className="mb-6">
        <h4 className="text-lg font-medium mb-2">Max Price</h4>
        <input
          type="range"
          min={0}
          max={3000}
          step={10}
          value={inputCategory.priceFilter.value}
          className="range range-accent"
          onChange={(e) =>
            setInputCategory({
              ...inputCategory,
              priceFilter: {
                text: "price",
                value: Number(e.target.value),
              },
            })
          }
        />
        <p className="mt-1 text-sm">Up to: <strong>${inputCategory.priceFilter.value}</strong></p>
      </div>

      <div>
        <h4 className="text-lg font-medium mb-2">Minimum Rating</h4>
        <input
          type="range"
          min={0}
          max={5}
          step={1}
          value={inputCategory.ratingFilter.value}
          className="range range-info"
          onChange={(e) =>
            setInputCategory({
              ...inputCategory,
              ratingFilter: {
                text: "rating",
                value: Number(e.target.value),
              },
            })
          }
        />
        <div className="w-full flex justify-between text-xs px-1">
          {[0, 1, 2, 3, 4, 5].map((r) => (
            <span key={r}>{r}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filters;
