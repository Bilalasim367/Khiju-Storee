"use client";
import { useWishlistStore } from "@/app/_zustand/wishlistStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaHeartCrack } from "react-icons/fa6";
import { useSession } from "next-auth/react";

interface WishItemProps extends ProductInWishlist {
  index: number;
}

const WishItem = ({
  id,
  title,
  price,
  image,
  slug,
  stockAvailabillity,
  index,
}: WishItemProps) => {
  const { data: session } = useSession();
  const { removeFromWishlist } = useWishlistStore();
  const router = useRouter();
  const [userId, setUserId] = useState<string>();

  const openProduct = () => router.push(`/product/${slug}`);

  const getUserByEmail = async () => {
    if (session?.user?.email) {
      const res = await fetch(`http://localhost:3001/api/users/email/${session.user.email}`, {
        cache: "no-store",
      });
      const user = await res.json();
      setUserId(user?.id);
    }
  };

  const deleteItemFromWishlist = async () => {
    if (!userId) return toast.error("Login required to remove wishlist items");

    const res = await fetch(`http://localhost:3001/api/wishlist/${userId}/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      removeFromWishlist(id);
      toast.success("Item removed from your wishlist");
    } else {
      toast.error("Failed to remove item");
    }
  };

  useEffect(() => {
    getUserByEmail();
  }, [session?.user?.email]);

  return (
    <tr className="hover:bg-gray-50 transition duration-150 ease-in-out">
      <td className="text-sm text-gray-700 px-4 py-3 text-center">{index}</td>

      <td className="px-4 py-3">
        <div className="w-16 h-16 mx-auto cursor-pointer" onClick={openProduct}>
          <Image
            src={`/${image}`}
            alt={title}
            width={64}
            height={64}
            className="rounded-lg object-cover"
          />
        </div>
      </td>

      <td className="text-sm text-gray-800 px-4 py-3 font-medium cursor-pointer hover:underline" onClick={openProduct}>
        {title}
      </td>

      <td className="text-sm text-gray-600 px-4 py-3 text-center">
        {stockAvailabillity ? (
          <span className="text-green-500 font-semibold">In Stock</span>
        ) : (
          <span className="text-red-500 font-semibold">Out of Stock</span>
        )}
      </td>

      <td className="px-4 py-3 text-center">
        <button
          className="inline-flex items-center gap-2 px-3 py-1.5 text-sm rounded-md bg-red-500 text-white hover:bg-red-600 transition"
          onClick={deleteItemFromWishlist}
        >
          <FaHeartCrack className="text-lg" />
          <span className="hidden sm:inline">Remove</span>
        </button>
      </td>
    </tr>
  );
};

export default WishItem;
