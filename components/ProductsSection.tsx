'use client'

import React, { useEffect, useState } from 'react'
import ProductItem from './ProductItem'
import Heading from './Heading'
import { motion } from 'framer-motion'

const ProductsSection = () => {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/products')
        const data = await res.json()
        setProducts(data)
      } catch (error) {
        console.error('Failed to fetch products:', error)
      }
    }

    fetchProducts()
  }, [])

  return (
    <section className="relative py-24 px-6 sm:px-12 overflow-hidden bg-[#FCF8F3]">
      {/* 🌟 Subtle Background Tint */}
      <div className="absolute inset-0 bg-[#FFF9F2]/40 backdrop-blur-sm z-0" />

      {/* 🛍️ Content */}
      <div className="relative z-10 max-w-screen-2xl mx-auto text-center">
        {/* Elegant Heading */}
        <div className="mb-14">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#2D2A2A]">
            FEATURED PRODUCTS
          </h2>
          <div className="w-24 h-1 mx-auto mt-4 bg-yellow-500 rounded-full" />
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product: Product, index: number) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className=" rounded-2xl hover:shadow-2xl transition-all duration-300  p-4"
            >
              <ProductItem product={product} color="black" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductsSection
