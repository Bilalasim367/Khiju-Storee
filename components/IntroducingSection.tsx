'use client'
import Link from 'next/link'
import React from 'react'

const Introduction = () => {
  return (
    <section className="relative bg-[#F9F5EF] overflow-hidden py-32 px-6 sm:px-12 text-[#2C1E11] 
">
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        <h2 className="text-4xl sm:text-6xl font-extrabold leading-tight tracking-tight">
          Your Fashion,
          <br className="hidden sm:inline" />
          <span className="text-[#C0A882]"> Your Identity</span>
        </h2>

        <p className="text-lg sm:text-xl font-medium text-[#4B3D2E] mt-6 leading-relaxed max-w-3xl">
          Discover the essence of modern style with our curated collections.
          <br />
          Effortless elegance, season after season.
        </p>

        <div className="mt-10 flex justify-center gap-4 flex-wrap">
          <Link href='/shop'>  <button className="bg-[#C0A882] text-black px-7 py-3 rounded-full font-semibold hover:bg-[#b89c74] transition-all duration-200 shadow-sm">
            Start Shopping
          </button></Link>
        
          <button className="border border-[#2C1E11] text-[#2C1E11] px-7 py-3 rounded-full font-semibold hover:bg-[#2C1E11] hover:text-white transition-all duration-200">
            Learn More
          </button>
        </div>
      </div>
    </section>
  )
}

export default Introduction
