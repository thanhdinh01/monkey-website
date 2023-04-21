import React from "react";

const Selected = () => {
  return (
    <div
      className="selected-option bg-[#E7ECF3] rounded flex items-center justify-between p-5 cursor-pointer"
      onClick={() => setShowDropdown(!showDropdown)}
    ></div>
  );
};

export default Selected;
