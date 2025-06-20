'use client'

import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import ProductItemRating from './ProductItemRating'

const ProductItem = ({
  product,
  color,
}: {
  product: Product
  color: string
}) => {
  return (
    <div className="group relative bg-white w-full p-4 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col items-center gap-y-4">
      {/* Image with zoom on hover */}
      <Link href={`/product/${product.slug}`} className="overflow-hidden rounded-lg">
        <Image
          src={
            product.mainImage
              ? `/${product.mainImage}`
              : '/product_placeholder.jpg'
          }
          width={300}
          height={300}
          className="w-full h-[300px] object-cover group-hover:scale-105 transition-transform duration-300"
          alt={product?.title}
        />
      </Link>

      {/* Title */}
      <Link
        href={`/product/${product.slug}`}
        className={`text-lg font-semibold mt-2 uppercase transition-colors duration-200 ${
          color === 'black' ? 'text-black' : 'text-white'
        }`}
      >
        {product.title}
      </Link>

      {/* Price */}
      <p
        className={`text-md font-semibold ${
          color === 'black' ? 'text-black' : 'text-white'
        }`}
      >
        ${product.price}
      </p>

      {/* Rating */}
      <ProductItemRating productRating={product?.rating} />

      {/* View Product button */}
      <Link
        href={`/product/${product?.slug}`}
        className="w-full text-center uppercase bg-black text-white py-2 rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors duration-300"
      >
        View Product
      </Link>

      {/* Optional: Add to Cart on hover */}
      {/* 
      <button className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black text-white px-4 py-2 text-sm rounded-full flex items-center gap-2 hover:bg-gray-800">
        Add to Cart
      </button> 
      */}
    </div>
  )
}

export default ProductItem
  