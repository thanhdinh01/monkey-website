import React, { useState } from "react";

const Toggle = () => {
  const [showToggle, setShowToggle] = useState(false);
  const handleToggle = () => {
    setShowToggle(!showToggle);
  };
  return (
    <div
      className={`w-20 h-10 cursor-pointer rounded-full bg-slate-200 p-1 ${
        showToggle ? " bg-[#2EBAC1]" : ""
      } transition-all`}
      onClick={handleToggle}
    >
      <span
        className={`inline-block h-6 w-6 rounded-full bg-[#2EBAC1] transition-all ${
          showToggle ? "translate-x-5 bg-white" : ""
        }`}
      ></span>
    </div>
  );
};

export default Toggle;