"use client";
import { SectionTitle, WishItem } from "@/components";
import React, { useEffect } from "react";
import { useWishlistStore } from "../_zustand/wishlistStore";
import { nanoid } from "nanoid";
import { useSession } from "next-auth/react";
import { FaRegHeart } from "react-icons/fa";

const WishlistPage = () => {
  const { data: session } = useSession();
  const { wishlist, setWishlist } = useWishlistStore();

  const getWishlistByUserId = async (id: string) => {
    const res = await fetch(`http://localhost:3001/api/wishlist/${id}`, {
      cache: "no-store",
    });
    const data = await res.json();

    const productArray = data.map((item: any) => ({
      id: item?.product?.id,
      title: item?.product?.title,
      price: item?.product?.price,
      image: item?.product?.mainImage,
      slug: item?.product?.slug,
      stockAvailabillity: item?.product?.inStock,
    }));

    setWishlist(productArray);
  };

  const getUserByEmail = async () => {
    if (session?.user?.email) {
      const res = await fetch(
        `http://localhost:3001/api/users/email/${session.user.email}`,
        { cache: "no-store" }
      );
      const user = await res.json();
      getWishlistByUserId(user?.id);
    }
  };

  useEffect(() => {
    getUserByEmail();
  }, [session?.user?.email]);

  return (
    <div className="bg-white min-h-screen">
      <SectionTitle title="Your Wishlist" path="Home | Wishlist" />

      {wishlist.length === 0 ? (
        <div className="text-center py-20 text-gray-600">
          <FaRegHeart className="mx-auto text-5xl mb-4 text-gray-400" />
          <h3 className="text-3xl font-semibold mb-2">No Items Found</h3>
          <p className="text-lg">Your wishlist is currently empty.</p>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="overflow-x-auto rounded-xl shadow-sm ring-1 ring-gray-200">
            <table className="min-w-full divide-y divide-gray-200 bg-white">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-4 px-4 text-left text-sm font-semibold text-gray-700">
                    #
                  </th>
                  <th className="py-4 px-4 text-left text-sm font-semibold text-gray-700">
                    Image
                  </th>
                  <th className="py-4 px-4 text-left text-sm font-semibold text-gray-700">
                    Name
                  </th>
                  <th className="py-4 px-4 text-left text-sm font-semibold text-gray-700">
                    Stock Status
                  </th>
                  <th className="py-4 px-4 text-left text-sm font-semibold text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {wishlist.map((item, index) => (
                  <WishItem
                    id={item.id}
                    title={item.title}
                    price={item.price}
                    image={item.image}
                    slug={item.slug}
                    stockAvailabillity={item.stockAvailabillity}
                    key={nanoid()}
                    index={index + 1}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
