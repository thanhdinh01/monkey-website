import React, { useState } from "react";

const Toggle = () => {
  const [showToggle, setShowToggle] = useState(false);
  const handleToggle = () => {
    setShowToggle(!showToggle);
  };
  return (
    <div
      className="w-10 h-4 rounded-full bg-slate-200 p-1"
      onClick={handleToggle}
    >
      <span
        className={`h-3 w-3 rounded-full bg-white transition-all ${
          showToggle ? "translate-x-5" : ""
        }`}
      ></span>
    </div>
  );
};

export default Toggle;
