import React from "react";

const Option = ({ children }) => {
  return (
    <p className="px-5 py-4 hover:bg-gray-200 cursor-pointer font-light">
      {children}
    </p>
  );
};

export default Option;
