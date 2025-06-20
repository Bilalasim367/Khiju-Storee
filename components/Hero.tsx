'use client'
import React, { useRef, useEffect, useState } from 'react'

const Hero = () => {
  const textRef = useRef<HTMLDivElement>(null)
  const [textHeight, setTextHeight] = useState(0)

  useEffect(() => {
    if (textRef.current) {
      setTextHeight(textRef.current.offsetHeight)
    }
  }, [])

  return (
    <section
      className="relative w-full min-h-screen bg-cover bg-center bg-no-repeat px-6 sm:px-12 py-32"
      style={{
        backgroundImage: "url('/Banner-12.jpg')", // Make sure this matches your actual image path
      }}
    >
      {/* Overlay (deep brown tone) */}
      <div className="absolute inset-0 bg-[#2C1E11]/60 z-0" />

      <div className="relative z-10 max-w-screen-2xl mx-auto grid grid-cols-2 max-lg:grid-cols-1 items-center gap-20 max-md:gap-10">
        {/* LEFT TEXT */}
        <div
          ref={textRef}
          className="flex flex-col gap-6 max-lg:text-center max-lg:items-center"
        >
          <span className="uppercase text-sm tracking-widest text-gray-200">
            New Arrival
          </span>

          <h1 className="text-6xl font-extrabold text-white leading-tight max-xl:text-5xl max-md:text-4xl max-sm:text-3xl">
            Effortless Style,
            <br className="max-sm:hidden" />
            <span className="text-[#C0A882]"> Everyday Comfort</span>
          </h1>

          <p className="text-white text-lg max-w-xl">
            Discover our latest collection — designed with precision, made for
            modern living. Experience premium fabric, clean cuts, and timeless
            fashion.
          </p>

          <div className="flex gap-4 max-lg:flex-col max-lg:w-full mt-6">
            <button className="bg-[#C0A882] text-black px-8 py-3 rounded-full font-medium hover:bg-[#b89c74] transition-all">
              Shop Now
            </button>
            <button className="border border-white text-white px-8 py-3 rounded-full font-medium hover:bg-white hover:text-black transition-all">
              Explore
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
