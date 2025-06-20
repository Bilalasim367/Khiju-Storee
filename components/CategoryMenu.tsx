// app/components/CategoryMenu.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import { categoryMenuList } from "@/lib/utils";
import Heading from "./Heading";
import CategoryItem from "./CategoryItem";

const CategoryMenu = () => {
  return (
    <section className="relative  bg-[#F9F6F1] overflow-hidden">
      <div className="relative z-10 max-w-screen-2xl mx-auto px-6 md:px-10">
        <Heading title="BROWSE CATEGORIES" />

        <div className="mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {categoryMenuList.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <CategoryItem href={item.href}>
                {/* Image */}
                <div className="w-full h-34 flex items-center justify-center mb-4 overflow-hidden rounded-xl">
                  <img
                    src={item.src}
                    alt={`Category ${item.title}`}
                    className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Title and Explore */}
                <h3 className="text-center text-[#1F1F1F] font-semibold text-lg group-hover:text-[#C0A882]">
                  {item.title}
                </h3>
                <p className="text-sm text-[#C0A882] mt-1 group-hover:underline">
                  Explore
                </p>
              </CategoryItem>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryMenu;
