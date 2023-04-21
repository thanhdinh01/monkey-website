import React from "react";
import { useDropdownContext } from "./dropdown-context";

const Option = ({ children, ...props }) => {
  const { setShow } = useDropdownContext();
  return (
    <p
      {...props}
      className="px-5 py-4 hover:bg-gray-200 cursor-pointer font-light"
    >
      {children}
    </p>
  );
};

export default Option;
