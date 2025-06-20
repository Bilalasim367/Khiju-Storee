import { ProductItem, SectionTitle } from "@/components";
import React from "react";

interface Props {
  searchParams: { search: string };
}

const SearchPage = async ({ searchParams: { search } }: Props) => {
  const data = await fetch(
    `http://localhost:3001/api/search?query=${search || ""}`
  );

  const products = await data.json();

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-black">
      <SectionTitle title="Search Page" path="Home | Search" />

      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
        {search && (
          <h3 className="text-3xl md:text-4xl text-center font-bold py-10">
            🔍 Showing results for <span className="text-black">{search}</span>
          </h3>
        )}

        <div className="grid grid-cols-4 justify-items-center gap-x-6 gap-y-10 max-[1300px]:grid-cols-3 max-lg:grid-cols-2 max-[500px]:grid-cols-1">
          {products.length > 0 ? (
            products.map((product: Product) => (
              <ProductItem key={product.id} product={product} color="black" />
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <h3 className="text-2xl sm:text-3xl font-semibold">
                😔 No products found for
              </h3>
              <p className="text-gray-600 mt-2 text-lg">
                Try a different keyword or check back later.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
