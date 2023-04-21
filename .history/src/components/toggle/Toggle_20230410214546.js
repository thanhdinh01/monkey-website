import React, { useState } from "react";

const Toggle = () => {
  const [showToggle, setShowToggle] = useState(false);
  const handleToggle = () => {
    setShowToggle(!showToggle);
  };
  return (
    <div
      className={`w-20 h-10 cursor-pointer rounded-full p-1 ${
        showToggle ? " bg-[#2EBAC1]" : "bg-slate-200"
      } transition-all`}
      onClick={handleToggle}
    >
      <span
        className={`inline-block h-8 w-8 rounded-full transition-all ${
          showToggle ? "translate-x-10 bg-white" : "bg-[#2EBAC1]"
        }`}
      ></span>
    </div>
  );
};

export default Toggle;
