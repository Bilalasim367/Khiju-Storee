export const dynamic = 'force-dynamic'
export const revalidate = 0

import { Breadcrumb, Filters, Pagination, Products, SortBy } from '@/components'
import React from 'react'

// Improve readability of slug category like "smart-watches" -> "smart watches"
const improveCategoryText = (text: string): string => {
  return text.replace(/-/g, ' ')
}

const ShopPage = (slug: any) => {
  const categoryTitle =
    slug?.params?.slug && slug.params.slug[0]
      ? improveCategoryText(slug.params.slug[0])
      : 'All Products'

  return (
    <div className='bg-[#F9F6F1] text-[#1F1F1F] min-h-screen'>
      <div className='max-w-screen-2xl mx-auto px-6 md:px-10 py-10'>
        <Breadcrumb />

        <div className='grid grid-cols-[240px_1fr] gap-x-10 max-md:grid-cols-1 max-md:gap-y-8 mt-6'>
          {/* Sidebar Filters */}
          <div className='rounded-xl border border-[#EAE4DA] bg-white/60 backdrop-blur-sm shadow-sm p-4'>
            <Filters />
          </div>

          {/* Products Section */}
          <div className='flex flex-col'>
            {/* Heading & Sort */}
            <div className='flex justify-between items-center flex-wrap gap-y-4 mb-6'>
              <h2 className='text-2xl font-bold uppercase tracking-wide text-[#1F1F1F]'>
                {categoryTitle}
              </h2>
              <SortBy />
            </div>

            {/* Divider */}
            <div className='w-full h-px bg-[#E0DAD0] mb-6'></div>

            {/* Products */}
            <Products slug={slug} />

            {/* Pagination */}
            <div className='mt-10'>
              <Pagination />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShopPage
