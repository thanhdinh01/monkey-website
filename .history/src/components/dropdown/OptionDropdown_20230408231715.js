import React from "react";

const OptionDropdown = ({ Children }) => {
  console.log(Children);
  return (
    <p className="px-5 py-4 hover:bg-gray-200 cursor-pointer font-light">
      {Children}
    </p>
  );
};

export default OptionDropdown;
