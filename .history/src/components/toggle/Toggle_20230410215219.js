import React from "react";

const Toggle = ({ show, onClick }) => {
  return (
    <div
      className={`w-20 h-10 cursor-pointer rounded-full p-1 ${
        show ? " bg-[#2EBAC1]" : "bg-slate-200"
      } transition-all`}
      onClick={onClick}
    >
      <span
        className={`inline-block h-8 w-8 rounded-full transition-all ${
          show ? "translate-x-10 bg-white" : "bg-[#2EBAC1]"
        }`}
      ></span>
    </div>
  );
};

export default Toggle;
