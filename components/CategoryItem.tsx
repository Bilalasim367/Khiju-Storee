// app/components/CategoryItem.tsx
import Link from 'next/link';
import React, { type ReactNode } from 'react';

interface CategoryItemProps {
  children: ReactNode;
  href: string;
}

const CategoryItem = ({ children, href }: CategoryItemProps) => {
  return (
    <Link href={href} className="group focus:outline-none focus:ring-2 focus:ring-black rounded-2xl">
      <div className="flex flex-col items-center justify-start p-4 bg-[#FAF7F2] rounded-2xl border border-[#E7E2D7] shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 cursor-pointer group">
        {children}
      </div>
    </Link>
  );
};

export default CategoryItem;
