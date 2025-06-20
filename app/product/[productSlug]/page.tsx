
import {
  StockAvailabillity,
  UrgencyText,
  SingleProductRating,
  ProductTabs,
  SingleProductDynamicFields,
  AddToWishlistBtn,
} from "@/components";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";
import {
  FaSquareFacebook,
  FaSquarePinterest,
  FaSquareXTwitter,
} from "react-icons/fa6";

interface ImageItem {
  imageID: string;
  productID: string;
  image: string;
}

const SingleProductPage = async ({ params }: SingleProductPageProps) => {
  const data = await fetch(
    `http://localhost:3001/api/slugs/${params.productSlug}`
  );
  const product = await data.json();

  const imagesData = await fetch(
    `http://localhost:3001/api/images/${product.id}`
  );
  const images = await imagesData.json();

  if (!product || product.error) {
    notFound();
  }

  return (
    <div className="bg-[#F9F6F1] py-12 text-[#1F1F1F]">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-10">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Side - Product Images */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <Image
                src={product?.mainImage ? `/${product?.mainImage}` : "/product_placeholder.jpg"}
                width={600}
                height={600}
                alt="Main product image"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-wrap gap-4 mt-6 justify-center">
              {images?.map((imageItem: ImageItem) => (
                <Image
                  key={imageItem.imageID}
                  src={`/${imageItem.image}`}
                  width={100}
                  height={100}
                  alt="Product thumbnail"
                  className="rounded-lg border border-[#DDD5C7] hover:scale-105 transition-transform duration-200"
                />
              ))}
            </div>
          </div>

          {/* Right Side - Details */}
          <div className="flex-1 flex flex-col gap-6">
            <div>
              <SingleProductRating rating={product?.rating} />

              <h1 className="text-3xl md:text-4xl font-bold mt-3">
                {product?.title}
              </h1>

              <p className="text-2xl font-semibold text-[#C0A882] mt-2">
                ${product?.price}
              </p>

              <StockAvailabillity stock={94} inStock={product?.inStock} />
            </div>

            <SingleProductDynamicFields product={product} />

            <div className="flex flex-col gap-4 mt-4">
              <AddToWishlistBtn product={product} slug={params.productSlug} />

              <div className="text-sm text-gray-700">
                <span className="font-medium">SKU:</span>
                <span className="ml-2">abccd-18</span>
              </div>

              {/* Social Share */}
              <div className="flex items-center gap-3 text-lg text-gray-700">
                <span className="font-medium">Share:</span>
                <div className="flex gap-2 text-2xl text-gray-600">
                  <FaSquareFacebook className="hover:text-blue-600 transition-colors" />
                  <FaSquareXTwitter className="hover:text-black transition-colors" />
                  <FaSquarePinterest className="hover:text-red-600 transition-colors" />
                </div>
              </div>

              {/* Payment Icons */}
              <div className="flex flex-wrap gap-3 mt-4">
                {["visa", "mastercard", "ae", "paypal", "dinersclub", "discover"].map((icon) => (
                  <Image
                    key={icon}
                    src={`/${icon}.svg`}
                    width={50}
                    height={50}
                    alt={`${icon} icon`}
                    className="w-auto h-auto opacity-80 hover:opacity-100"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs (Description, Reviews, etc.) */}
        <div className="mt-20">
          <ProductTabs product={product} />
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;
