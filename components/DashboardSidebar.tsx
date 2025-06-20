"use client";
// *********************
// Role: Sidebar on admin dashboard page
// Theme: Khiju Store (Beige, Black, #FAF7F2)
// *********************

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MdDashboard,
  MdCategory,
} from "react-icons/md";
import {
  FaTable,
  FaRegUser,
  FaGear,
  FaBagShopping,
} from "react-icons/fa6";
import React from "react";

const links = [
  { href: "/admin", label: "Dashboard", icon: <MdDashboard /> },
  { href: "/admin/orders", label: "Orders", icon: <FaBagShopping /> },
  { href: "/admin/products", label: "Products", icon: <FaTable /> },
  { href: "/admin/categories", label: "Categories", icon: <MdCategory /> },
  { href: "/admin/users", label: "Users", icon: <FaRegUser /> },
  { href: "/admin/settings", label: "Settings", icon: <FaGear /> },
];

const DashboardSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="h-full xl:w-[320px] max-xl:w-full bg-[#FAF7F2] border-r border-[#e0dcd2] shadow-sm">
      {links.map(({ href, label, icon }) => {
        const isActive = pathname === href;
        return (
          <Link href={href} key={label}>
            <div
              className={`flex items-center gap-4 pl-6 py-5 text-lg font-medium transition-all duration-200 
              ${
                isActive
                  ? "bg-black text-[#FAF7F2] shadow-md"
                  : "text-black hover:bg-[#eae6dc]"
              }`}
            >
              <span className="text-xl">{icon}</span>
              <span>{label}</span>
            </div>
          </Link>
        );
      })}
    </aside>
  );
};

export default DashboardSidebar;
