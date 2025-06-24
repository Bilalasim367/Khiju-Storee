'use client'
import React from 'react'
import { FaHeadphones } from 'react-icons/fa6'
import { FaRegEnvelope } from 'react-icons/fa6'

const HeaderTop = () => {
  return (
    <div className="h-10 text-white bg-black max-lg:px-5 max-lg:h-16 max-[573px]:px-0">
      <div className="flex justify-between h-full max-lg:flex-col max-lg:justify-center max-lg:items-center max-w-screen-2xl mx-auto px-12 max-[573px]:px-0">
        <ul className="flex justify-between h-full gap-x-5 max-[1000px]:text-sm max-[1000px]:gap-x-2">
          <li className="flex items-center gap-x-2 font-semibold">
            <FaHeadphones className="text-white" />
            <span>+92324 7277489</span>
          </li>
          <li className="flex items-center gap-x-2 font-semibold">
            <FaRegEnvelope className="text-white text-xl" />
            <span>masim407@gmail.com</span>
          </li>
        </ul>
        {/* Removed login/register/logout section completely */}
      </div>
    </div>
  )
}

export default HeaderTop
