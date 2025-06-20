// *********************
// Role of the component: Color chooser on single product page
// Theme: Khiju Store (Beige, Black, #FAF7F2)
// *********************

"use client";

import React, { useState } from "react";
import { FaCheck } from "react-icons/fa6";

// You can expand this array dynamically based on image analysis in future
const colorOptions = [
  { name: "Silver", colorCode: "#C0C0C0" },
  { name: "Charcoal", colorCode: "#3C3C3C" },
  { name: "Beige", colorCode: "#FAF7F2" },
];

const ColorInput = () => {
  const [selectedColor, setSelectedColor] = useState("Silver");

  return (
    <div className="flex flex-col gap-y-3 max-[500px]:items-center">
      <p className="text-xl text-black">
        Color: <span className="text-lg font-medium capitalize">{selectedColor}</span>
      </p>

      <div className="flex gap-x-3">
        {colorOptions.map((color) => (
          <div
            key={color.name}
            onClick={() => setSelectedColor(color.name)}
            className={`w-10 h-10 rounded-full cursor-pointer border-2 flex items-center justify-center transition-all duration-150 ${
              selectedColor === color.name
                ? "border-black scale-110"
                : "border-transparent"
            }`}
            style={{ backgroundColor: color.colorCode }}
          >
            {selectedColor === color.name && (
              <FaCheck className="text-black text-sm" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorInput;
