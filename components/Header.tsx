'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import HeaderTop from './HeaderTop'
import Image from 'next/image'
import SearchInput from './SearchInput'
import Link from 'next/link'
import { FaBell } from 'react-icons/fa6'
import CartElement from './CartElement'
import HeartElement from './HeartElement'

const Header = () => {
  const pathname = usePathname()

  return (
    <header className='bg-[#F5F5F5]'>
      <HeaderTop />

      {/* MAIN SITE HEADER (Not for admin pages) */}
      {!pathname.startsWith('/admin') && (
        <div className='h-32 bg-[#F5F5F5] flex items-center justify-between px-16 max-[1320px]:px-16 max-md:px-6 max-lg:flex-col max-lg:gap-y-7 max-lg:justify-center max-lg:h-60 max-w-screen-2xl mx-auto'>
          <Link href='/'>
            <img
              src='/khiju.png'
              width={300}
              height={300}
              alt='khiju store logo'
              className='relative right-5 max-[1023px]:w-56'
            />
          </Link>
          <SearchInput />
          <div className='flex gap-x-10 items-center'>
            {/* Wishlist Icon */}
            <HeartElement />
            {/* Cart Icon */}
            <CartElement />
          </div>
        </div>
      )}

      {/* ADMIN HEADER */}
      {pathname.startsWith('/admin') && (
        <div className='flex justify-between h-32 bg-white items-center px-16 max-[1320px]:px-10 max-w-screen-2xl mx-auto max-[400px]:px-5'>
          <Link href='/'>
            <Image
              src='/khiju.png'
              width={130}
              height={130}
              alt='khiju store logo'
              className='w-56 h-auto'
            />
          </Link>
          <div className='flex gap-x-5 items-center'>
            <FaBell className='text-xl' />
            <div className='dropdown dropdown-end'>
              <div tabIndex={0} role='button' className='w-10'>
                <Image
                  src='/randomuser.jpg'
                  alt='admin profile'
                  width={30}
                  height={30}
                  className='w-full h-full rounded-full'
                />
              </div>
              <ul
                tabIndex={0}
                className='dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52'
              >
                <li>
                  <Link href='/admin'>Dashboard</Link>
                </li>
                <li>
                  <a>Profile</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
