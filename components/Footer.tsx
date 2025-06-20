import { navigation } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#F9F6F1] text-[#1F1F1F]" aria-labelledby="footer-heading">
      <div>
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        <div className="mx-auto max-w-screen-2xl px-6 lg:px-8 pt-20 pb-14">
          <div className="xl:grid xl:grid-cols-3 xl:gap-16">
            {/* Logo */}
            <div className="flex justify-center xl:justify-start">
              <Image
                src="/Khiju.png"
                alt="Khiju Store logo"
                width={200}
                height={200}
                className="object-contain"
              />
            </div>

            {/* Navigation */}
            <div className="mt-12 grid grid-cols-2 gap-10 xl:col-span-2 xl:mt-0 md:grid-cols-4">
              {/* SALE */}
              <div>
                <h3 className="text-base font-semibold text-[#C0A882] tracking-wide">
                  Sale
                </h3>
                <ul className="mt-5 space-y-3">
                  {navigation.sale.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm text-[#1F1F1F] hover:text-[#C0A882] transition-all"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* ABOUT */}
              <div>
                <h3 className="text-base font-semibold text-[#C0A882] tracking-wide">
                  About Us
                </h3>
                <ul className="mt-5 space-y-3">
                  {navigation.about.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm text-[#1F1F1F] hover:text-[#C0A882] transition-all"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* BUYING */}
              <div>
                <h3 className="text-base font-semibold text-[#C0A882] tracking-wide">
                  Buying
                </h3>
                <ul className="mt-5 space-y-3">
                  {navigation.buy.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm text-[#1F1F1F] hover:text-[#C0A882] transition-all"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* SUPPORT */}
              <div>
                <h3 className="text-base font-semibold text-[#C0A882] tracking-wide">
                  Support
                </h3>
                <ul className="mt-5 space-y-3">
                  {navigation.help.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm text-[#1F1F1F] hover:text-[#C0A882] transition-all"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom note */}
          <div className="mt-12 border-t border-[#E5DED1] pt-8 text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Khiju Store. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
