import React from "react";
import { useDropdownContext } from "./dropdown-context";

const Option = ({ children, onClick }) => {
  const { setShow } = useDropdownContext();

  const handleClick = () => {
    onClick && onClick();
    setShow(false);
  };
  return (
    <p
      onClick={handleClick}
      className="px-5 py-4 hover:bg-gray-200 cursor-pointer font-light"
    >
      {children}
    </p>
  );
};

export default Option;
