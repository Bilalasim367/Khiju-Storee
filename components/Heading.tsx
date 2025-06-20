import React from 'react'

const Heading = ({ title }: { title: string }) => {
  return (
    <h2 className="relative text-[#222] text-6xl max-xl:text-5xl max-md:text-4xl max-sm:text-3xl font-extrabold text-center mt-12 mb-8 tracking-tight">
      {title}
      <span className="hidden sm:block absolute left-1/2 transform -translate-x-1/2 bottom-[-10px] h-[4px] w-24 bg-yellow-500 rounded-full" />
    </h2>
  )
}

export default Heading
