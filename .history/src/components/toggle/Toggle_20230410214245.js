import React, { useState } from "react";

const Toggle = () => {
  const [showToggle, setShowToggle] = useState(false);
  const handleToggle = () => {
    setShowToggle(!showToggle);
  };
  return (
    <div
      className={`w-10 h-4 cursor-pointer rounded-full bg-slate-200 p-1 ${
        showToggle ? " bg-[#2EBAC1]" : ""
      } transition-all`}
      onClick={handleToggle}
    >
      <span
        className={`inline-block h-3 w-3 rounded-full bg-[#2EBAC1] transition-all ${
          showToggle ? "translate-x-5 bg-white" : ""
        }`}
      ></span>
    </div>
  );
};

export default Toggle;
