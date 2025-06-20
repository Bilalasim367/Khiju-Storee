// *********************
// Role of the component: Checkbox input component
// Theme: Khiju Store (Beige, Black, #FAF7F2)
// *********************

import React from "react";

interface CheckboxProps {
  text: string;
  stateValue: boolean;
  setStateValue: (value: boolean) => void;
}

const Checkbox = ({ text, stateValue, setStateValue }: CheckboxProps) => {
  return (
    <div className="flex items-center gap-2 cursor-pointer select-none py-2">
      <input
        type="checkbox"
        checked={stateValue}
        onChange={(e) => setStateValue(e.target.checked)}
        className="h-5 w-5 rounded-sm border border-black bg-[#FAF7F2] text-black checked:bg-black checked:border-black focus:ring-2 focus:ring-black transition duration-150"
      />
      <label className="text-base text-black">{text}</label>
    </div>
  );
};

export default Checkbox;
