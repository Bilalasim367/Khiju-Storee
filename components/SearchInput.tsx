"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SearchInput = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const router = useRouter();

  const searchProducts = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    router.push(`/search?search=${searchInput}`);
    setSearchInput("");
  };

  return (
    <form
      onSubmit={searchProducts}
      className="w-full max-w-3xl mx-auto flex items-center rounded-full overflow-hidden shadow-lg transition-all duration-300 bg-[#f9f5ef]"
    >
      <input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Search your favorite products..."
        className="flex-1 px-7 py-5 text-lg  placeholder-gray-600 bg-transparent  font-light tracking-wide"
      />
      <button
        type="submit"
        className="px-8 py-5 bg-black text-[#f9f5ef] text-lg font-semibold uppercase tracking-wider  transition-all duration-300"
      >
        Search
      </button>
    </form>
  );
};

export default SearchInput;
