// *********************
// Role: Themed slider component for Khiju Store
// Name: SimpleSlider.tsx
// Developer: Aleksandar Kuzmanovic & ChatGPT
// Version: 1.2 (Khiju Store theme)
// *********************

'use client'
import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Link from 'next/link'

function SimpleSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    pauseOnHover: false,
    cssEase: 'ease-in-out',
  }

  return (
    <div className='slider-container  max-w-screen-2xl mx-auto px-4 sm:px-10 mt-16'>
      <Slider {...settings}>
        {/* Slide 1 */}
        <div className='h-[500px] max-lg:h-[400px] max-md:h-[250px] max-sm:h-[200px] max-[400px]:h-[150px] relative rounded-2xl overflow-hidden'>
          <img
            src='/slider4.jpg'
            alt='Khiju Store Slider 1'
            className='w-full h-full object-cover'
          />
          <div className='absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center text-white px-4'>
            <p className='text-base sm:text-lg tracking-wide text-yellow-300 font-medium mb-2 underline underline-offset-4'>
              شاندار ہیڈفونز
            </p>
            <h2 className='text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg'>
              Rock Your Style
            </h2>
            <p className='text-sm sm:text-base max-w-xl mb-6 font-light'>
              Discover unmatched comfort and audio clarity – where tradition
              meets tech elegance.
            </p>
            <Link
              href='/shop'
              className='bg-[#faf6f0] text-black uppercase px-7 py-3 text-sm sm:text-base font-semibold tracking-wide rounded-full border-2  hover:bg-black hover:text-[#FCD34D] shadow-md hover:shadow-lg transition-all duration-300'
            >
              Shop Now
            </Link>
          </div>
        </div>

        {/* Slide 2 */}
        <div className='h-[500px] max-lg:h-[400px] max-md:h-[250px] max-sm:h-[200px] max-[400px]:h-[150px] relative rounded-2xl overflow-hidden'>
          <img
            src='/slider3.jpg'
            alt='Khiju Store Slider 2'
            className='w-full h-full object-cover'
          />
          <div className='absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center text-white px-4'>
            <p className='text-base sm:text-lg tracking-wide text-yellow-300 font-medium mb-2 underline underline-offset-4'>
              وائرلیس ایئربڈز
            </p>
            <h2 className='text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg'>
              Go Wireless, Stay Stylish
            </h2>
            <p className='text-sm sm:text-base max-w-xl mb-6 font-light'>
              Comfort and style, packed into every sound — just the Khiju way.
            </p>
            <Link
              href='/shop'
              className='bg-[#faf6f0] text-black uppercase px-7 py-3 text-sm sm:text-base font-semibold tracking-wide rounded-full border-2  hover:bg-black hover:text-[#FCD34D] shadow-md hover:shadow-lg transition-all duration-300'
            >
              Shop Now
            </Link>
          </div>
        </div>
      </Slider>
    </div>
  )
}

export default SimpleSlider
